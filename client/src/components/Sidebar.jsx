import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { HiOutlineMenu } from 'react-icons/hi';
import { RiCloseLine } from 'react-icons/ri';
import { BsDisc, BsMusicNoteList, BsMusicNote } from 'react-icons/bs';
import { FaShoppingCart } from 'react-icons/fa';

import { record_logo } from '../assets';

const links = [
  { name: 'Discover', to: '/', icon: BsDisc },
  { name: 'Top Charts', to: '/top-charts', icon: BsMusicNote },
  { name: 'My Playlist', to: '/around-you', icon: BsMusicNoteList },
  { name: 'Shop', to: '/around-you', icon: FaShoppingCart, mobile: true },
  { name: 'Profile', to: '/around-you', mobile: true },
  { name: 'Login', to: '/around-you', mobile: true },
  { name: 'Logout', to: '/around-you', mobile: true },
];

const NavLinks = ({ login, mobile, handleClick }) => (
  <div>
    {links.map((item) => {
      return (
        item.mobile === mobile && (
          <NavLink
            key={item.name}
            to={item.to}
            className="flex flex-row justify-start items-center my-6 ml-4 md:text-sm text-lg font-medium text-gray-400 hover:text-cyan-400"
            onClick={() => handleClick && handleClick()}
          >
            {item.icon && <item.icon className="w-6 h-6 mr-2" />}
            {item.name}
          </NavLink>
        )
      );
    })}
  </div>
);

const Sidebar = ({ login, setLogin }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <div className="md:flex hidden flex-col  w-[350px] py-10 px-4 bg-[#191624]">
        <img
          src={record_logo}
          alt="logo"
          className="w-full h-24 object-contain"
        />
        <div className="lg:hidden flex justify-center font-mono text-3xl  tracking-widest font-bold text-cyan-500">
          LOGO
        </div>

        <NavLinks login={login} />
      </div>

      {/* Mobile sidebar */}
      <div className="absolute md:hidden block top-6 right-3">
        {!mobileMenuOpen ? (
          <HiOutlineMenu
            className="w-6 h-6 mr-2 text-white"
            onClick={() => setMobileMenuOpen(true)}
          />
        ) : (
          <RiCloseLine
            className="w-6 h-6 mr-2 text-white"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </div>

      <div
        className={`absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-white/10 to-[#483D8B] backdrop-blur-lg z-10 p-6 md:hidden smooth-transition ${
          mobileMenuOpen ? 'left-0' : '-left-full'
        }`}
      >
        <img
          src={record_logo}
          alt="logo"
          className="w-full h-24 object-contain"
        />
        <div className="md:hidden flex justify-center font-mono text-3xl  tracking-widest font-bold text-cyan-500">
          LOGO
        </div>
        <NavLinks
          login={login}
          mobile={true}
          handleClick={() => setMobileMenuOpen(false)}
        />
      </div>
      {/* Mobile sidebar ends*/}
    </>
  );
};

export default Sidebar;
