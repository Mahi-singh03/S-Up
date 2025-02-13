import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import lgLogo from "../assets/FINAL lg LOGO.svg";
import smLogo from "../assets/fINAL sm logo.svg";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState({});
  
  const secondaryMenuItems = ["Home", "Courses", "Register", "About", "Gallery", "Login", "Logout"];
  const dropdowns = [
    { name: "Exam", options: ["Exam Instruction", "Exam Result", "Exam"] },
    { name: "Verification", options: ["Verify Student", "Verify Staff"] },
    { name: "Resources", options: ["Syllabus", "Study Material"] },
    { name: "Job", options: ["Career Guidance", "Job Apply"] },
  ];

  const handleDropdownClick = (name) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const handleMobileDropdown = (name) => {
    setMobileDropdownOpen((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo section */}
        <div className="flex-shrink-0">
          <img src={lgLogo} alt="Large Logo" className="hidden lg:block object-cover w-auto h-12" />
          <img src={smLogo} alt="Small Logo" className="block lg:hidden object-cover w-auto h-12" />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex space-x-6 items-center">
          {dropdowns.map((dropdown) => (
            <div
              key={dropdown.name}
              className="relative group"
              onMouseEnter={() => setActiveDropdown(dropdown.name)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center text-gray-700 hover:text-blue-400 transition">
                {dropdown.name} <ChevronDown size={16} className="ml-1 transition-transform" />
              </button>
              <AnimatePresence>
                {activeDropdown === dropdown.name && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute left-0 mt-2 w-48 bg-white shadow-md rounded-lg overflow-hidden"
                  >
                    {dropdown.options.map((option) => (
                      <a key={option} href={`#${option.toLowerCase().replace(/ /g, "-")}`} className="block px-4 py-2 hover:bg-gray-100 transition">
                        {option}
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
          <button className="text-gray-700 hover:text-blue-400 transition">
            <User size={28} />
          </button>
        </div>

        {/* Mobile Menu Button - Visible on md and smaller */}
        <div className="lg:hidden flex items-center space-x-4">
          <button className="text-gray-700 hover:text-blue-400 transition">
            <User size={28} />
          </button>
          <button className="text-gray-700 focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Secondary Navbar */}
      <div className="hidden lg:flex bg-gray-100 p-2 justify-center shadow-md">
        {secondaryMenuItems.map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`} className="mx-4 text-gray-700 hover:text-blue-400 transition">
            {item}
          </a>
        ))}
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="lg:hidden fixed top-0 left-0 w-3/4 h-full bg-white shadow-lg flex flex-col items-center pt-20"
          >
            <button className="absolute top-5 right-5 text-gray-700" onClick={() => setIsOpen(false)}>
              <X size={28} />
            </button>
            {dropdowns.map((dropdown) => (
              <div key={dropdown.name} className="w-full text-center">
                <button className="w-full py-2 text-lg font-semibold text-gray-700 hover:text-blue-400 bg-gray-200 border-b" onClick={() => handleMobileDropdown(dropdown.name)}>
                  {dropdown.name} <ChevronDown size={16} className={`ml-1 transform ${mobileDropdownOpen[dropdown.name] ? "rotate-180" : "rotate-0"} transition`} />
                </button>
                <AnimatePresence>
                  {mobileDropdownOpen[dropdown.name] && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden bg-gray-100">
                      {dropdown.options.map((option) => (
                        <a key={option} href={`#${option.toLowerCase().replace(/ /g, "-")}`} className="block px-4 py-2 hover:bg-gray-200 transition">
                          {option}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
            {secondaryMenuItems.map((item) => (
              <motion.a key={item} href={`#${item.toLowerCase()}`} className="block py-4 text-lg text-gray-700 hover:text-blue-400 transition" onClick={() => setIsOpen(false)}>
                {item}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
