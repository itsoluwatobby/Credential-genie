import { useNavigate } from 'react-router-dom';
import illustration from '../../assets/hero-illustration.png';
import Button from '../../components/common/button';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="py-10 pb-20">
      <div className="max-w-[75rem] mx-auto px-5">
        <div className="overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-5 items-center justify-center">
          <article className="flex flex-col gap-3 items-start justify-center">
            <h1 className="text-3xl md:text-5xl leading-tight md:leading-tight text-left">
              <span className="font-bold">
                Unlock Your Digital Identity with
              </span>{' '}
              <span className="text-primary-100 font-bold">
                Verifiable&nbsp;Credentials
              </span>
            </h1>

            <p className="max-w-[40ch] text-left text-lg text-gray-500">
              Welcome to a new era of secure and streamlined identity
              verification.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-10 md:w-auto w-full">
              <Button
                onClick={() => navigate('/create')}
                variant="fill"
                size="md"
                colorScheme="primary"
              >
                Create a Verifiable Credential
              </Button>

              <Button
                onClick={() => navigate('/verify')}
                variant="outline"
                size="md"
                colorScheme="dark"
              >
                Verify a Credential
              </Button>
            </div>
          </article>

          <figure className="flex md:hidden items-center justify-center">
            <div className="w-[15rem]">
              <img className="w-full" src={illustration} />
            </div>
          </figure>

          <figure className="hidden md:flex items-center justify-center">
            <div className="w-[25rem]">
              <img className="w-full" src={illustration} />
            </div>
          </figure>
        </div>
      </div>
    </header>
  );
};

export default Header;
