import Why from './why';
import Goal from './goal';
import Header from './header';
import Testimonials from './testimonial';
import Navbar from '../../components/common/navbar';
import Footer from '../../components/common/footer';
import Team from './team';

const LandingPage = () => {
  return (
    <main>
      <Navbar />
      <Header />
      <Why />
      <Goal />
      <Team />
      <Testimonials />
      <Footer />
    </main>
  );
};

export default LandingPage;
