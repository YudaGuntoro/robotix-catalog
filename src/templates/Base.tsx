import { Meta } from '../layout/Meta';
import { AppConfig } from '../utils/AppConfig';
import { FloatingWhatsApp } from './FloatingWhatsApp';
import { Footer } from './Footer';
import { Hero } from './Hero';
import { MapLocation } from './MapLocation';
import { OurServices } from './OurServices';
import { ProductList } from './ProductList';

const Base = () => (
  <div className="text-gray-600 antialiased">
    <Meta title={AppConfig.title} description={AppConfig.description} />
    <Hero />
    <OurServices />
    <ProductList />
    <MapLocation />
    <Footer />
    <FloatingWhatsApp />
  </div>
);

export { Base };
