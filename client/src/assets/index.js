import loader from './loader.svg';
import logo from './logo.svg';
import record_blue from './record_blue.png';
import record_gold from './record_gold.png';
import record_korea from './record_korea.png';
import record_pink from './record_pink.png';
import record_red from './record_red.png';
import record_yellow from './record_yellow.png';
import record_logo from './record_logo.svg';
import apple_music from './apple_music.png';
import user from './user.png';
import data from './data.json';
import worldwideChart from './worldwide_chart.json';
import countryCharts from './indonesia_chart.json';
import song_details from './song_details.json';

import { BiLogoInstagram, BiLogoTwitter, BiLogoFacebook } from 'react-icons/bi';
import { BsDisc, BsMusicNoteList, BsMusicNote } from 'react-icons/bs';
import { FaShoppingCart } from 'react-icons/fa';

export const links = [
  { name: 'Discover', to: '/', icon: BsDisc },
  { name: 'Top Charts', to: '/top-charts', icon: BsMusicNote },
  { name: 'My Playlist', to: '/my-playlist', icon: BsMusicNoteList },
  { name: 'Shop', to: '/shop', icon: FaShoppingCart, mobile: true },
  { name: 'Profile', to: '/profile', mobile: true, isLogin: true },
  { name: 'Login', to: '/login', mobile: true, isLogin: false },
  { name: 'Register', to: '/register', mobile: true, isLogin: false },
  { name: 'Logout', mobile: true, isLogin: true },
];

export const footer = [
  {
    title: 'Company',
    links: [
      {
        title: 'About Us',
        to: '#',
      },
      {
        title: 'Shop',
        to: '#',
      },
      {
        title: 'Careers',
        to: '#',
      },
      {
        title: 'Support',
        to: '#',
      },
      {
        title: 'Feedback',
        to: '#',
      },
    ],
  },
  {
    title: 'Legal',
    links: [
      {
        title: 'Terms',
        to: '#',
      },
      {
        title: 'Privacy Policy',
        to: '#',
      },
      {
        title: 'Cookies',
        to: '#',
      },
      {
        title: 'Accessibility',
        to: '#',
      },
    ],
  },
  {
    title: 'Follow Us',
    links: [
      {
        to: '#',
        icon: BiLogoInstagram,
      },
      {
        to: '#',
        icon: BiLogoTwitter,
      },
      {
        to: '#',
        icon: BiLogoFacebook,
      },
    ],
  },
];

export {
  song_details,
  data,
  worldwideChart,
  countryCharts,
  logo,
  loader,
  record_blue,
  record_gold,
  record_korea,
  record_pink,
  record_red,
  record_yellow,
  record_logo,
  user,
  apple_music,
};
