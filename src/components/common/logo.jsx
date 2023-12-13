import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';

const Logo = ({ iconOnly }) => {
  return (
    <Link
      to="/"
      className={
        'flex font-sans gap-2 items-center justify-start uppercase text-xl'
      }
    >
      <div className="w-[3rem] h-[3rem]">
        <img className="w-full h-full object-contain" src={logo} />
      </div>
      {!iconOnly && (
        <div className="flex item-center justify-center font-bold">
          <span className="text-primary-100">Credential</span>
          <span className="text-black">Genie</span>
        </div>
      )}
    </Link>
  );
};

export default Logo;
