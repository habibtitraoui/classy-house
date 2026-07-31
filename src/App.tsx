import { BackToTop } from './components/BackToTop';
import { Description } from './components/Description';
import { Features } from './components/Features';
import { FloatingWhatsapp } from './components/FloatingWhatsapp';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { OrderForm } from './components/OrderForm';
import { StickyBuyButton } from './components/StickyBuyButton';
import { WhyBuy } from './components/WhyBuy';
import { product } from './data';

function App() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    brand: { '@type': 'Brand', name: product.brand },
    category: product.category,
    image: [product.image],
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'DZD',
      availability: 'https://schema.org/InStock',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: '27',
    },
  };

  return (
    <>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
      <Header />
      <main>
        <Hero />
        <Features />
        <Description />
        <WhyBuy />
        <OrderForm />
      </main>
      <Footer />
      <FloatingWhatsapp />
      <BackToTop />
      <StickyBuyButton />
    </>
  );
}

export default App;
