import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import { HiOutlineMenuAlt4 } from 'react-icons/hi';
import { IoClose, IoClipboard } from 'react-icons/io5';
import { toast } from 'react-hot-toast';

import Logo from './logo';
import { navbarData } from '../../services/data';
import { useState } from 'react';
import { useCredentialContext } from '../../context/useCredentialContext';
import Button from './button';

const Navbar = () => {
  const { pathname } = useLocation();
  const { webConnect } = useCredentialContext();
  const [showMobileNav, setShowMobileNav] = useState(false);

  const copyDID = () => {
    if (!navigator.clipboard) return alert('Platform does not support copying');
    navigator.clipboard.writeText(webConnect.myDid);
  };

  return (
    <nav className="">
      <div className="max-w-[75rem] mx-auto px-5">
        <div className="flex items-center justify-between h-[8rem]">
          <div className="hidden md:block">
            <Logo size={1.5} />
          </div>
          <div className="block md:hidden">
            <Logo iconOnly size={1.5} />
          </div>

          <ul className="hidden md:flex gap-8 items-center justify-center">
            {navbarData.map((item) => (
              <li
                key={item.id}
                className={classNames('text-lg', {
                  'hover:text-black': true,
                  'text-gray-600': pathname != item.path,
                  'text-primary-100': pathname === item.path,
                })}
              >
                <Link to={item.path}>{item.label}</Link>
              </li>
            ))}
            <Button
              variant="fill"
              size="md"
              onClick={() => {
                copyDID();
                toast.success('DID Copied');
              }}
              colorScheme="primary"
              rightIcon={<IoClipboard />}
            >
              Copy your DID
            </Button>
            {/* <button
              title={`copy: ${webConnect.myDid.substring(0, 15)}`}
              className="w-fit px-4 py-1 hover:opacity-80 active:opacity-100 transition-opacity"
              onClick={copyDID}
            >
              Copy my DID
            </button> */}
          </ul>

          <span
            className="flex md:hidden text-4xl cursor-pointer"
            onClick={() => setShowMobileNav(true)}
          >
            <HiOutlineMenuAlt4 />
          </span>

          {showMobileNav && (
            <ul className="z-10 flex flex-col md:hidden fixed top-0 left-0 w-full h-full bg-primary-100 items-center justify-center gap-5">
              <span
                className="fixed top-10 right-10 text-white cursor-pointer text-4xl"
                onClick={() => setShowMobileNav(false)}
              >
                <IoClose />
              </span>

              {navbarData.map((item) => (
                <li
                  key={item.id}
                  className={classNames('text-3xl', {
                    'hover:text-white': true,
                    'text-primary-200': pathname != item.path,
                    'text-white': pathname === item.path,
                  })}
                >
                  <Link to={item.path}>{item.label}</Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
