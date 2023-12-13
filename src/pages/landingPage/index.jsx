import Why from './why';
import Goal from './goal';
import Header from './header';
import Testimonials from './testimonial';
import Navbar from '../../components/common/navbar';
import Footer from '../../components/common/footer';
import Team from './team';
import usePageTitle from '../../hooks/usePageTitle';
import Demo from './demo';

const LandingPage = () => {
  usePageTitle(
    'Credential Genie — Revolutionary potential of verifiable credentials'
  );

  return (
    <main>
      <Navbar />
      <Header />
      <Why />
      <Goal />
      <Testimonials />
      <Demo />
      <Team />
      <Footer />
    </main>
  );
};

export default LandingPage;
