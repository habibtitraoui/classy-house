import fs from 'node:fs';
import path from 'node:path';

const YALIDINE_BASE_URL = 'https://api.yalidine.app/v1';

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;

  const lines = fs.readFileSync(filePath, 'utf8').split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const separatorIndex = trimmed.indexOf('=');
    if (separatorIndex === -1) continue;

    const key = trimmed.slice(0, separatorIndex).trim();
    let value = trimmed.slice(separatorIndex + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    process.env[key] = value;
  }
}

export function loadLocalEnv(root = process.cwd()) {
  loadEnvFile(path.join(root, '.env'));
  loadEnvFile(path.join(root, '.env.local'));
}

function normalize(value) {
  return String(value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '');
}

function buildCommuneAliases(value) {
  const normalized = String(value ?? '').trim();
  if (!normalized) return [];

  const base = normalize(normalized);
  const aliases = new Set([base]);

  const withoutArticle = normalized.replace(/^(ال|ل)/u, '').trim();
  if (withoutArticle) aliases.add(normalize(withoutArticle));

  const compact = normalized.replace(/\s+/g, '');
  if (compact) aliases.add(normalize(compact));

  return [...aliases];
}

function getNumber(value) {
  return typeof value === 'number' && Number.isFinite(value) ? value : null;
}

function getLowestFee(communes, field) {
  const prices = communes.map((commune) => getNumber(commune[field])).filter((price) => price !== null);
  return prices.length > 0 ? Math.min(...prices) : null;
}

function selectCommuneFees(perCommune, communeName) {
  const communes = Object.values(perCommune ?? {});
  if (communes.length === 0) return null;

  const wantedAliases = buildCommuneAliases(communeName);
  const exactMatch = wantedAliases.length
    ? communes.find((commune) => {
        const candidateAliases = buildCommuneAliases(commune.commune_name ?? commune.name);
        return candidateAliases.some((alias) => wantedAliases.includes(alias));
      })
    : null;

  const source = exactMatch ?? {};
  const home = getNumber(source.express_home) ?? getLowestFee(communes, 'express_home');
  const office = getNumber(source.express_desk) ?? getLowestFee(communes, 'express_desk');

  if (home === null && office === null) return null;

  return {
    home,
    office,
    matchedCommune: exactMatch?.commune_name ?? exactMatch?.name ?? null,
    usedFallback: !exactMatch,
  };
}

export async function getYalidineShippingFees({ toWilayaId, communeName, fromWilayaId }) {
  loadLocalEnv();

  const apiId = process.env.YALIDINE_API_ID;
  const apiToken = process.env.YALIDINE_API_TOKEN;
  const originWilayaId = fromWilayaId || process.env.YALIDINE_FROM_WILAYA_ID || '30';

  if (!apiId || !apiToken) {
    return { status: 500, body: { message: 'Yalidine API credentials are not configured.' } };
  }

  const destinationWilayaId = Number.parseInt(String(toWilayaId), 10);
  const senderWilayaId = Number.parseInt(String(originWilayaId), 10);

  if (!Number.isInteger(destinationWilayaId) || !Number.isInteger(senderWilayaId)) {
    return { status: 400, body: { message: 'Invalid wilaya id.' } };
  }

  const params = new URLSearchParams({
    from_wilaya_id: String(senderWilayaId),
    to_wilaya_id: String(destinationWilayaId),
  });

  const response = await fetch(`${YALIDINE_BASE_URL}/fees/?${params.toString()}`, {
    headers: {
      'X-API-ID': apiId,
      'X-API-TOKEN': apiToken,
    },
  });

  const data = await response.json().catch(() => null);

  if (!response.ok || !data) {
    return {
      status: response.status || 502,
      body: { message: 'Unable to load Yalidine shipping fees.' },
    };
  }

  const fees = selectCommuneFees(data.per_commune, communeName);
  if (!fees) {
    return { status: 404, body: { message: 'No Yalidine shipping fees found for this wilaya.' } };
  }

  return {
    status: 200,
    body: {
      home: fees.home,
      office: fees.office,
      fromWilayaName: data.from_wilaya_name,
      toWilayaName: data.to_wilaya_name,
      matchedCommune: fees.matchedCommune,
      usedFallback: fees.usedFallback,
    },
  };
}

export async function handleShippingFeesRequest(req, res) {
  const url = new URL(req.url ?? '', 'http://localhost');
  const result = await getYalidineShippingFees({
    toWilayaId: url.searchParams.get('toWilayaId'),
    communeName: url.searchParams.get('commune'),
    fromWilayaId: url.searchParams.get('fromWilayaId'),
  });

  res.statusCode = result.status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(result.body));
}
