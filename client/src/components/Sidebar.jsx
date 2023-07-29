import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { LOGOUT } from '../redux/features/authSlice';
import { HiOutlineMenu } from 'react-icons/hi';
import { RiCloseLine } from 'react-icons/ri';
import { FiArrowUpRight } from 'react-icons/fi';

import { record_logo, links } from '../assets';

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isLogin } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(LOGOUT());
    setMobileMenuOpen(false);
    navigate('/');
  };

  const handleClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <div className="md:flex hidden flex-col min-w-[350px] py-10 px-4 bg-[#191624]">
        <img
          src={record_logo}
          alt="logo"
          className="w-full h-24 object-contain"
        />
        <div className="lg:hidden flex justify-center mt-4 font-mono text-3xl tracking-widest font-bold text-secondary-200">
          MUZYK
        </div>
        <div className="lg:mt-8">
          {links.map((item) => {
            return (
              !item.mobile && (
                <NavLinks
                  key={item.name}
                  item={item}
                  handleClick={handleClick}
                />
              )
            );
          })}
        </div>
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
        className={`absolute top-0 h-screen w-2/3 bg-primary/70 backdrop-blur-lg z-10 p-6 md:hidden smooth-transition ${
          mobileMenuOpen ? 'left-0' : '-left-full'
        }`}
      >
        <img
          src={record_logo}
          alt="logo"
          className="w-full h-24 object-contain"
        />
        <div className="md:hidden flex justify-center mt-4 font-mono text-3xl tracking-widest font-bold text-secondary-200">
          MUZYK
        </div>
        <div className="mt-8">
          {links.map((item) => {
            return (
              item.icon && (
                <NavLinks
                  key={item.name}
                  item={item}
                  handleClick={handleClick}
                />
              )
            );
          })}
          {/* divider */}
          <div className="flex-grow border-t border-gray-400 mx-4 my-3"></div>
          {links.map((item) => {
            return (
              item.mobile &&
              !item.icon &&
              item.isLogin === isLogin && (
                <NavLinks
                  key={item.name}
                  item={item}
                  handleClick={
                    item.name === 'Logout' ? handleLogout : handleClick
                  }
                />
              )
            );
          })}
        </div>
      </div>
      {/* Mobile sidebar ends*/}
    </>
  );
};

const NavLinks = ({ item, handleClick }) => {
  return item.name === 'Logout' ? (
    <p
      onClick={() => handleClick && handleClick()}
      className="flex flex-row justify-start items-center my-4 ml-4 md:text-sm text-lg font-medium text-white hover:text-secondary-400 cursor-pointer"
    >
      {item.name}
    </p>
  ) : (
    <NavLink
      key={item?.name}
      to={item?.to}
      className="flex flex-row justify-start items-center my-4 ml-4 md:text-sm text-lg font-medium text-white hover:text-secondary-400"
      onClick={() => handleClick && handleClick()}
    >
      {item.icon && <item.icon className="w-6 h-6 mr-2" />}
      {item.name}
      {item.name === 'Shop' && <FiArrowUpRight className="mr-2 mb-2" />}
    </NavLink>
  );
};

export default Sidebar;
