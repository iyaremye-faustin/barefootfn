import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Menu, Transition } from '@headlessui/react';
import BreadCrumb from './BreadCrumb';
import profile from '../../assets/images/profile.png';
import { changePage } from '../../redux/views/pages';
import NotificationPane from '../NotificationPane';

const user = {
  name: '',
  email: '',
  imageUrl: profile,
};

const userNavigation = [
  { name: 'Your Profile', href: 'profile' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function DashboardHeader() {
  const [page, setPage] = useState('dashboard');
  const dispatch = useDispatch();
  const [openPane, setOpenPane] = useState(false);
  return (
    <>
      <div className="flex p-8 bg-white shadow-inner md:justify-between">
        <BreadCrumb />
        <div className="flex items-center px-8 ">
          <div data-testid="notification-pane">
            <NotificationPane />
          </div>
          {/* Profile dropdown */}
          <Menu as="div" className="relative ml-3">
            <div>
              <Menu.Button
                data-testid="profile"
                className="flex items-center max-w-xs text-sm bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              >
                <span className="sr-only">Open user menu</span>
                <img className="w-8 h-8 rounded-full" src={user.imageUrl} alt="" />
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {userNavigation.map((item) => (
                  <Menu.Item key={item.name}>
                    {({ active }) => (
                      <a
                        href="/dashboard/profile"
                        onFocus={() => setPage('profile')}
                        onClick={() => dispatch(changePage(page))}
                        data-testid="user-profile"
                        className={classNames(
                          active ? 'bg-gray-100' : '',
                          'block px-4 py-2 text-sm text-gray-700'
                        )}
                      >
                        {item.name}
                      </a>
                    )}
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </>
  );
}
