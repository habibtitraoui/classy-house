import galleryMain from './assets/gallery-1.jpg';
import galleryDetail from './assets/gallery-2.jpg';
import galleryInterior from './assets/gallery-3.jpg';
import productImage from './assets/product.webp';

export const product = {
  brand: 'BBF',
  title: 'cocote 4 litre BBF',
  category: 'طنجرة ضغط',
  price: 5300,
  priceLabel: '5,300 د.ج',
  image: productImage,
};

export const gallery = [
  { id: 'main', src: galleryMain, alt: 'كوكوط BBF 4 لتر على طاولة عرض في Classy House' },
  { id: 'detail', src: galleryDetail, alt: 'تفاصيل غطاء ومقابض كوكوط BBF' },
  { id: 'kitchen', src: galleryInterior, alt: 'داخل كوكوط BBF من الألمنيوم' },
];

export const heroBadges = ['صناعة جزائرية', 'ألمنيوم عالي الجودة', 'توصيل سريع'];

export const features = [
  'صناعة جزائرية',
  'ألمنيوم عالي الجودة',
  'سهل التنظيف',
  'مناسب للاستعمال اليومي',
  'طبخ أسرع',
  'آمن للاستعمال',
];

export const specs = [
  'النوع: كوكوط ضغط',
  'المادة: ألمنيوم',
  'السعة: 4 لتر',
  'التصميم: جوانب قصيرة',
  'مناسبة للطبخ اليومي',
  'سهلة التنظيف والاستعمال',
];

export const shippingOptions = {
  home: { label: 'التوصيل إلى المنزل', price: 800 },
  office: { label: 'التوصيل إلى المكتب', price: 400 },
} as const;
