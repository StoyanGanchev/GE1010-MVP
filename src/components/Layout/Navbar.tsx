import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '@/assets/logo.svg';

export interface NavItem {
  label: string;
  to: string;
}

interface NavbarProps {
  items: NavItem[];
}

const activeClasses = 'text-brand-dark font-semibold';
const homeActiveClasses = 'bg-rose-500 text-white font-semibold shadow';
const baseClasses =
  'block rounded px-3 py-2 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand';
const homeBaseClasses =
  'block rounded px-3 py-2 text-sm font-semibold text-rose-600 transition hover:bg-rose-50 hover:text-rose-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500';
export const Navbar = ({ items }: NavbarProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-gradient-to-r from-white via-accent-light/60 to-white backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <NavLink
          to="/"
          className="flex items-center gap-2"
          onClick={closeMenu}
        >
          <img src={logo} alt="EduAI Future Lab" className="h-8 w-8" />
          <span className="font-display text-base font-semibold text-slate-800 lg:text-lg">
            EduAI Future Lab
          </span>
        </NavLink>

        <button
          type="button"
          onClick={toggleMenu}
          className="inline-flex items-center rounded-md p-2 text-slate-600 transition hover:bg-slate-100 hover:text-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand md:hidden"
          aria-expanded={isOpen}
          aria-controls="primary-navigation"
        >
          <span className="sr-only">Toggle navigation</span>
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6h16.5M3.75 12h16.5M3.75 18h16.5" />
            )}
          </svg>
        </button>

        <div className="hidden items-center gap-1 md:flex">
          {items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                item.to === '/'
                  ? `${homeBaseClasses} ${isActive ? homeActiveClasses : ''}`
                  : `${baseClasses} ${
                      isActive
                        ? activeClasses
                        : 'text-slate-600 hover:bg-slate-100 hover:text-brand-dark'
                    }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>

      {isOpen ? (
        <div id="primary-navigation" className="border-t border-slate-200 bg-white md:hidden">
          <div className="space-y-1 px-4 py-3 sm:px-6">
            {items.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={closeMenu}
                className={({ isActive }) =>
                  item.to === '/'
                    ? `${homeBaseClasses} ${isActive ? homeActiveClasses : ''}`
                    : `${baseClasses} ${
                        isActive
                          ? activeClasses
                          : 'text-slate-600 hover:bg-slate-100 hover:text-brand-dark'
                      }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
};
