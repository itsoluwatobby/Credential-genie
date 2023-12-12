export const navbarData = [
  {
    id: 1,
    path: '/',
    label: 'Home',
  },
  // {
  //   id: 2,
  //   path: '/about',
  //   label: 'About',
  // },
  {
    id: 3,
    path: '/create',
    label: 'Create',
  },
  {
    id: 4,
    path: '/verify',
    label: 'Verify',
  },
];

import whyImageOne from '../assets/why-1.png';
import whyImageTwo from '../assets/why-2.png';
import whyImageThree from '../assets/why-3.png';

export const whyData = [
  {
    id: 1,
    title: 'Security at its Core',
    description:
      'Our cutting-edge verifiable credential technology ensures that your personal information remains private and secure. No more compromising on security for the sake of convenience. Your data is yours and yours alone.',
    image: whyImageOne,
  },
  {
    id: 2,
    title: 'Effortless Verification',
    description: `With our verifiable credentials, you have the power to share your information seamlessly and instantly. Whether it's for job applications, financial transactions, or online services, verification has never been this easy.`,
    image: whyImageTwo,
  },
  {
    id: 3,
    title: 'Global Certification',
    description:
      'Our verifiable credentials are internationally certified, providing you with a digital identity that knows no borders. Wherever you go, your credentials can travel with you, opening up a world of possibilities.',
    image: whyImageThree,
  },
];

import testimonialsImageOne from '../assets/avatar-one.png';
import testimonialsImageTwo from '../assets/avatar-two.png';

export const testimonialsData = [
  {
    id: 1,
    avatar: testimonialsImageOne,
    name: 'David O.',
    comment:
      'Implementing verifiable credentials from Credential Genie has transformed the way we onboard new clients. The process is seamless, secure, and has significantly reduced the time it takes to verify identities. Trust in our platform has never been higher',
  },
  {
    id: 2,
    avatar: testimonialsImageTwo,
    name: 'Tola O.',
    comment:
      'Searching for jobs became a breeze with verifiable credentials. I could easily showcase my qualifications and work history with just a few clicks. Credential Genie gave me the confidence that my credentials were authentic and trustworthy.',
  },
];

import israelAvatar from '../assets/israel.png';
import tobiAvatar from '../assets/tobi.png';
import temitopeAvatar from '../assets/temitope.jpg';
import seyiAvatar from '../assets/seyi.png';

export const teamData = [
  {
    id: 1,
    name: 'Mogbojuri Israel',
    initial: 'MI',
    avatar: israelAvatar,
    email: 'israeljuri0@gmail.com',
    position: 'Frontend Developer',
  },
  {
    id: 2,
    initial: 'OA',
    name: 'Oluwaseyi Akeredolu',
    avatar: seyiAvatar,
    email: 'temitayorakeredolu20@gmail.com',
    position: 'UI/UX Designer',
  },
  {
    id: 3,
    name: 'Temitope Victoria',
    initial: 'TV',

    email: 'themitokpe@gmail.com',
    avatar: temitopeAvatar,
    position: 'Technical Writer',
  },
  {
    id: 4,
    name: 'Oluwatobi Akinola',
    initial: 'OA',

    email: 'itsoluwatobby@gmail.com',
    avatar: tobiAvatar,
    position: 'Backend Developer',
  },
];
