import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import { HiOutlineMenuAlt4 } from 'react-icons/hi';
import { IoClose } from 'react-icons/io5';

import Logo from './logo';
import { navbarData } from '../../services/data';
import { useState } from 'react';

const Navbar = () => {
  const { pathname } = useLocation();
  const [showMobileNav, setShowMobileNav] = useState(false);

  return (
    <nav className="">
      <div className="max-w-[75rem] mx-auto px-5">
        <div className="flex items-center justify-between h-[8rem]">
          <Logo size={1.5} />

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
          </ul>

          <span
            className="flex md:hidden text-4xl cursor-pointer"
            onClick={() => setShowMobileNav(true)}
          >
            <HiOutlineMenuAlt4 />
          </span>

          {showMobileNav && (
            <ul className="flex flex-col md:hidden fixed top-0 left-0 w-full h-full bg-primary-100 items-center justify-center gap-5">
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
