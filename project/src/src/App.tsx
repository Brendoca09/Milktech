import Header from './components/Header';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import PartnersMarquee from './components/PartnersMarquee';
import Benefits from './components/Benefits';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import CTA from './components/CTA';
import Footer from './components/Footer';

function App() {
  // Simple routing based on URL path
  const currentPath = window.location.pathname;
  
  if (currentPath === '/blog') {
    return (
      <AuthProvider>
        <BlogProvider>
          <div className="min-h-screen bg-white">
            <BlogList />
          </div>
        </BlogProvider>
      </AuthProvider>
    );
  }
  
  if (currentPath === '/admin') {
    return (
      <AuthProvider>
        <BlogProvider>
          <BlogApp />
        </BlogProvider>
      </AuthProvider>
    );
  }

  return (
    <AuthProvider>
      <BlogProvider>
        <div className="min-h-screen bg-white">
          <Header />
          <Hero />
          <HowItWorks />
          <PartnersMarquee />
          <Benefits />
          <Pricing />
          <Testimonials />
          <CTA />
          <Footer />
        </div>
      </BlogProvider>
    </AuthProvider>
  );
}