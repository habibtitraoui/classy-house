import type { OrderPayload } from '../types/order';

type OrderResponse = {
  success?: boolean;
  message?: string;
};

type SheetOrderPayload = {
  name: string;
  phone: string;
  wilaya: string;
  commune: string;
  address: string;
  quantity: number;
  shipping: string;
  total: number;
  product: string;
};

export async function createOrder(order: SheetOrderPayload) {
  const endpoint = import.meta.env.VITE_ORDER_API as string | undefined;

  if (!endpoint) {
    await new Promise((resolve) => window.setTimeout(resolve, 650));
    return { success: true, message: 'Demo order accepted locally.' };
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    body: JSON.stringify(order),
  });

  return (await response.json()) as OrderResponse;
}

export async function submitOrder(payload: OrderPayload) {
  return createOrder({
    name: payload.name,
    phone: payload.phone,
    wilaya: payload.wilaya,
    commune: payload.commune,
    address: payload.address,
    quantity: payload.quantity,
    shipping: payload.shippingType === 'home' ? 'Home' : 'Office',
    total: payload.total,
    product: payload.product,
  });
}
