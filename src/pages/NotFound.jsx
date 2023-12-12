import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/button';

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const returnTimer = setTimeout(() => {
      navigate(-1);
    }, 5000);
    return () => clearTimeout(returnTimer);
  }, [navigate]);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center  font-mono gap-5 text-4xl">
      <h1 className="font-bold text-6xl">Not Found</h1>

      <span className="text-lg text-gray-500 max-w-[40ch] text-center">
        The page you're tring to visit is under development, or can't be found.
      </span>

      <div className="mt-5">
        <Button
          onClick={() => navigate('/')}
          variant="fill"
          colorScheme="primary"
          size="md"
        >
          Go back home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
