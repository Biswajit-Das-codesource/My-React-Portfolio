/* eslint-disable no-unused-vars */
// src/components/Navbar.jsx
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-scroll";
// import useScrollspy from '../hooks/useScrollspy'; // --- REMOVED

// AnimatedText for mobile menu
const AnimatedText = ({ text, className }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}
    className={className}
    data-text={text}
  >
    {text}
  </motion.div>
);

export default function Navbar({ isLoading }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [shouldAnimateNav, setShouldAnimateNav] = useState(false);

  const gsap = window.gsap;

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => setShouldAnimateNav(true), 100);
      return () => clearTimeout(timer);
    } else {
      setShouldAnimateNav(false);
    }
  }, [isLoading]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = ["home", "about", "skills", "projects", "contact"];

  const menuItemsWithIcons = [
    {
      name: "home",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
    },
    {
      name: "about",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
    },
    {
      name: "skills",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
          />
        </svg>
      ),
    },
    {
      name: "projects",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z"
          />
        </svg>
      ),
    },
    {
      name: "contact",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
    },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  const navItemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.08,
        duration: 0.5,
        type: "spring",
        stiffness: 80,
      },
    }),
  };

  return (
    <>
      {/* Top Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-black/40 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <AnimatedText
              text="Mohan Portfolio"
              className="font-hamiltone h-15 w-56 text-center tracking-wide flex items-center justify-center font-extrabold text-2xl hover:tracking-wider transition-all cursor-pointer bg-gradient-to-r from-purple-300 to-yellow-500 bg-clip-text text-transparent"
            />

            {/* Desktop Menu using React Scroll Link */}
            <div
              className={`hidden md:flex space-x-9 items-center text-md font-bold transition-all duration-500 ${
                isScrolled ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}
            >
              {menuItems.map((section, index) => (
                <motion.div
                  key={section}
                  custom={index}
                  variants={navItemVariants}
                  initial="hidden"
                  animate={shouldAnimateNav ? "visible" : "hidden"}
                  whileHover={{ y: -4 }}
                  className="relative group"
                >
                  <Link
                    to={section}
                    smooth={true}
                    offset={-150}
                    duration={500}
                    className="cursor-pointer capitalize relative text-white transition-all duration-300 group-hover:text-yellow-400"
                  >
                    {section}
                    <span className="absolute left-1/2 -bottom-1 w-4/5 h-[2.5px] bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full transform -translate-x-1/2 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Hire Me Button */}
            {isScrolled && (
              <a
                href="https://mail.google.com/mail/?view=cm&to=mohankumardalei2001@gmail.com"
                className="hidden cursor-pointer md:inline-flex fixed top-4 right-32 z-50 bg-yellow-950 text-yellow-400 border border-yellow-400 border-b-4 font-medium overflow-hidden px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group items-center justify-center text-center"
                style={{ minWidth: "130px", letterSpacing: "0.03em" }}
                role="button"
                target="__blank"
              >
                <span className="bg-yellow-400 shadow-yellow-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
                Hire Me
              </a>
            )}

            {/* Hamburger */}
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleMenu}
                className="flex flex-col space-y-1.5 cursor-pointer z-50 focus:outline-none"
                aria-label="Toggle menu"
              >
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 8 : 0 }}
                  className="block h-0.5 w-6 bg-white origin-center"
                />
                <motion.span
                  animate={{ opacity: isOpen ? 0 : 1 }}
                  className="block h-0.5 w-6 bg-white"
                />
                <motion.span
                  animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -8 : 0 }}
                  className="block h-0.5 w-6 bg-white origin-center"
                />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu using React Scroll Link */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-black/40 backdrop-blur-md overflow-hidden"
            >
              <div className="flex flex-col px-4 py-4 space-y-3">
                {menuItems.map((section, index) => (
                  <motion.div
                    key={section}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Link
                      to={section}
                      smooth={true}
                      duration={800}
                      offset={-100}
                      onClick={() => setIsOpen(false)}
                      className="block text-white text-base font-medium hover:text-yellow-500 capitalize transition-colors cursor-pointer"
                    >
                      <AnimatedText text={section} className="capitalize" />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Vertical Floating Sidebar using React Scroll Link */}
      <AnimatePresence>
        {isScrolled && (
          <motion.div
            className="hidden md:flex flex-col items-center fixed top-1/2 right-4 -translate-y-1/2 z-50 p-2 rounded-full bg-gradient-to-br from-[#1a090d]/60 to-[#2a1a1f]/60 backdrop-blur-md border border-yellow-900/40 shadow-xl"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ type: "spring", stiffness: 80, damping: 18 }}
          >
            <div className="flex flex-col items-center space-y-2">
              {menuItemsWithIcons.map((item) => (
                <div key={item.name} className="relative group">
                  <Link
                    to={item.name}
                    smooth={true}
                    duration={500}
                    offset={-150}
                    className="flex items-center justify-center w-12 h-12 rounded-full cursor-pointer transition-all duration-300 text-gray-300 hover:bg-white/10 hover:text-yellow-400"
                  >
                    {item.icon}
                  </Link>
                  <div className="absolute top-1/2 right-full -translate-y-1/2 mr-4 px-3 py-1 bg-gray-800 text-white text-sm rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                    <span className="capitalize">{item.name}</span>
                    <div
                      className="absolute top-1/2 left-full -translate-y-1/2 w-2 h-2 bg-gray-800"
                      style={{ clipPath: "polygon(0 50%, 100% 0, 100% 100%)" }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
