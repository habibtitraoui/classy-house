import { getYalidineShippingFees } from './yalidine-fees.mjs';

export default async function handler(req, res) {
  const url = new URL(req.url ?? '', 'http://localhost');
  const result = await getYalidineShippingFees({
    toWilayaId: url.searchParams.get('toWilayaId'),
    communeName: url.searchParams.get('commune'),
    fromWilayaId: url.searchParams.get('fromWilayaId'),
  });

  res.status(result.status).json(result.body);
}
