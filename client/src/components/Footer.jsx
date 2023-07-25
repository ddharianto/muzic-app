import React from 'react';
import { Link } from 'react-router-dom';

import { BiCopyright } from 'react-icons/bi';
import { footer } from '../assets';

const Footer = () => {
  return (
    <div className="flex flex-col-reverse justify-center items-center select-none">
      <span className="flex justify-center items-center text-sm my-5 text-black">
        <BiCopyright className="mr-1" />{' '}
        {`${new Date().getFullYear()} Muzic app. All Rights Reserved.`}
      </span>
      {/* divider */}
      <div className="flex-grow border-t w-[72%] border-black/70 mx-4"></div>
      <div className="flex w-full flex-row justify-around my-10">
        {footer.map((el) => (
          <div
            key={el.title}
            className=" flex flex-col justify-start items-start"
          >
            <span className="mb-1 text-lg font-bold tracking-wide text-black/70">
              {el.title}
            </span>
            {el.links.map((link, i) => {
              return link?.icon !== undefined ? (
                <Link key={i} to={link.to}>
                  <link.icon className="w-8 h-8 text-primary hover:text-secondary-400" />
                </Link>
              ) : (
                <Link key={i} to={link.to}>
                  <span className="hover:underline font-light text-sm text-black">
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
