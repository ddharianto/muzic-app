import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';

import { AUTH, LOGOUT } from '../redux/features/authSlice';

import { FiSearch, FiArrowUpRight, FiLogOut } from 'react-icons/fi';
import { FaShoppingCart } from 'react-icons/fa';
import { BsMusicNoteList } from 'react-icons/bs';

const Topbar = () => {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLogin, name, picture } = useSelector((state) => state.auth);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);
  const [dropdownMenuOpen, setDropdownMenuOpen] = useState(true);

  useEffect(() => {
    const pageClickEvent = (e) => {
      // If the active element exists and is clicked outside of
      if (
        dropdownRef.current !== null &&
        !dropdownRef.current.contains(e.target)
      ) {
        setDropdownMenuOpen((prev) => !prev);
      }
    };

    // If the item is active (ie open) then listen for clicks
    if (!dropdownMenuOpen) {
      window.addEventListener('click', pageClickEvent);
    }

    return () => {
      window.removeEventListener('click', pageClickEvent);
    };
  }, [dropdownMenuOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // navigate(`/search/${searchTerm}`);
  };

  const handleSuccess = async (res) => {
    // const credential = res.credential;
    // const clientId = res.clientId;
    const decoded_data = jwt_decode(res.credential);

    try {
      dispatch(AUTH(decoded_data));
    } catch (error) {
      console.log(error);
    }
  };

  const handleError = () =>
    alert('Google Sign In was unsuccessful. Try again later');

  return (
    <div className="flex flex-row items-center justify-between h-16 w-full bg-secondary-200/90 shadow-lg rounded-b-md">
      <div className="hidden lg:flex ml-3 font-mono text-3xl tracking-widest font-bold text-white">
        MUZYK
      </div>

      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        className="p-1 text-white"
      >
        <div className="flex flex-row justify-start items-center">
          <FiSearch aria-hidden="true" className="w-5 h-5 mr-2" />
          <input
            name="search-field"
            autoComplete="off"
            id="search-field"
            className=" flex-1 xl:w-[350px] bg-secondary-400/30 rounded-full border-none outline-none text-base placeholder:text-gray-300 text-white p-3"
            placeholder="Find your song"
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </form>

      {isLogin ? (
        <div
          className="hidden md:flex mr-3 max-w-[180px] flex-row items-center justify-between bg-white border-white rounded-full border-4 cursor-pointer hover:ring-2 ring-secondary-400"
          ref={dropdownRef}
          onClick={() => setDropdownMenuOpen((prev) => !prev)}
        >
          <div className="truncate mx-2 font-bold font-mono ">{name}</div>
          <div className="relative h-10 w-10 cursor-pointer">
            <img
              src={picture}
              alt={name}
              className="h-10 w-10 ring-blue-700/30 rounded-full bg-cover bg-center"
            />
            <div
              className={`absolute ${
                dropdownMenuOpen === true && 'hidden'
              } right-0 z-10 mt-5 w-48 origin-top-right rounded-md bg-white py-1`}
            >
              <Link
                to={'/around-you'}
                className="flex flex-row gap-1 items-center px-4 py-2 font-medium tracking-wider text-sm text-black hover:bg-secondary-200/30"
              >
                <FaShoppingCart /> Shop <FiArrowUpRight className="mb-2" />
              </Link>
              <Link
                to={'/around-you'}
                className="flex flex-row gap-1 items-center px-4 py-2 font-medium tracking-wider text-sm text-black hover:bg-secondary-200/30"
              >
                <BsMusicNoteList /> My Playlist
              </Link>
              {/* divider */}
              <div className="flex-grow border-t border-gray-400 mx-4 my-3"></div>
              <Link
                to={'/around-you'}
                className="flex flex-row gap-1 items-center px-4 py-2 font-medium tracking-wider text-sm text-black hover:bg-secondary-200/30"
              >
                Profile
              </Link>
              <Link
                to={'/'}
                className="flex flex-row gap-1 items-center px-4 py-2 font-medium tracking-wider text-sm text-red-500 hover:bg-secondary-200/30"
                onClick={() => dispatch(LOGOUT())}
              >
                <FiLogOut className="rotate-180" /> Log out
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="hidden md:flex mr-3 cursor-pointer">
          <GoogleLogin
            onSuccess={(credentialResponse) =>
              handleSuccess(credentialResponse)
            }
            onError={() => handleError()}
            useOneTap
          />
        </div>
      )}
    </div>
  );
};

export default Topbar;
