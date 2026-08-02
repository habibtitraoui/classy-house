import { shippingOptions } from '../data';
import type { ShippingType } from '../types/order';

export type ShippingPrices = Record<ShippingType, number>;

type ShippingFeesResponse = Partial<ShippingPrices> & {
  message?: string;
};

export const fallbackShippingPrices: ShippingPrices = {
  home: shippingOptions.home.price,
  office: shippingOptions.office.price,
};

export async function getShippingPrices(
  wilayaCode: string,
  commune: string,
  fromWilayaId = '30',
): Promise<ShippingPrices> {
  const params = new URLSearchParams({
    toWilayaId: String(Number.parseInt(wilayaCode, 10)),
    commune,
    fromWilayaId: fromWilayaId || '30',
  });

  const response = await fetch(`/api/shipping-fees?${params.toString()}`);
  const data = (await response.json()) as ShippingFeesResponse;

  if (!response.ok) {
    throw new Error(data.message ?? 'Unable to load shipping fees.');
  }

  return {
    home: typeof data.home === 'number' ? data.home : fallbackShippingPrices.home,
    office: typeof data.office === 'number' ? data.office : fallbackShippingPrices.office,
  };
}
