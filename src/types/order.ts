export type ShippingType = 'home' | 'office';

export type OrderPayload = {
  name: string;
  phone: string;
  wilaya: string;
  commune: string;
  address: string;
  quantity: number;
  shippingType: ShippingType;
  shippingPrice: number;
  product: string;
  price: number;
  total: number;
  date: string;
};
