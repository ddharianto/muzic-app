import React from 'react';
import { Link } from 'react-router-dom';

import { BiCopyright } from 'react-icons/bi';
import { footer } from '../assets';

const Footer = () => {
  return (
    <div className="flex flex-col-reverse justify-center items-center">
      <span className="flex justify-center items-center text-sm my-5 text-gray-500">
        <BiCopyright className="mr-1" />{' '}
        {`${new Date().getFullYear()} Muzic app. All Rights Reserved.`}
      </span>
      {/* divider */}
      <div className="flex-grow border-t w-[72%] border-gray-500 mx-4"></div>
      <div className="flex w-full flex-row justify-around my-10">
        {footer.map((el) => (
          <div
            key={el.title}
            className=" flex flex-col justify-start items-start"
          >
            <span className="mb-1 text-lg font-semibold tracking-wide text-gray-500">
              {el.title}
            </span>
            {el.links.map((link, i) => {
              return link?.icon !== undefined ? (
                <Link key={i} to={link.to}>
                  <link.icon className="w-8 h-8 hover:text-cyan-500" />
                </Link>
              ) : (
                <Link key={i} to={link.to}>
                  <span className="hover:underline font-light text-sm">
                    {link?.title}
                  </span>
                </Link>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Footer;
