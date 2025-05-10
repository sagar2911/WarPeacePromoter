import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path: string) => {
    return location === path;
  };

  return (
    <header className="bg-primary text-white shadow-md">
      <div className="container mx-auto px-4">
        <nav className="flex flex-wrap items-center justify-between py-3">
          <div className="flex items-center flex-shrink-0 mr-6">
            <Link href="/">
              <span className="font-heading font-bold text-xl tracking-tight cursor-pointer">
                War Impact Tracker
              </span>
            </Link>
          </div>

          <div className="block lg:hidden">
            <button
              onClick={toggleMenu}
              className="flex items-center px-3 py-2 border rounded text-secondary border-secondary hover:text-white hover:border-white"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>

          <div
            className={`w-full ${
              isMenuOpen ? "block" : "hidden"
            } flex-grow lg:flex lg:items-center lg:w-auto`}
          >
            <div className="text-sm lg:flex-grow">
              <Link href="/">
                <a
                  className={`block mt-4 lg:inline-block lg:mt-0 text-secondary hover:text-white mr-6 ${
                    isActive("/")
                      ? "font-semibold border-b-2 border-secondary"
                      : ""
                  }`}
                >
                  Live War Dashboard
                </a>
              </Link>
              <Link href="/simulation">
                <a
                  className={`block mt-4 lg:inline-block lg:mt-0 text-secondary hover:text-white mr-6 ${
                    isActive("/simulation")
                      ? "font-semibold border-b-2 border-secondary"
                      : ""
                  }`}
                >
                  War Simulation Tool
                </a>
              </Link>
              <Link href="/past-conflicts">
                <a
                  className={`block mt-4 lg:inline-block lg:mt-0 text-secondary hover:text-white mr-6 ${
                    isActive("/past-conflicts")
                      ? "font-semibold border-b-2 border-secondary"
                      : ""
                  }`}
                >
                  Past Conflicts Statistics
                </a>
              </Link>
              <Link href="/about">
                <a
                  className={`block mt-4 lg:inline-block lg:mt-0 text-secondary hover:text-white ${
                    isActive("/about")
                      ? "font-semibold border-b-2 border-secondary"
                      : ""
                  }`}
                >
                  About & Data Sources
                </a>
              </Link>
            </div>
            <div>
              <Link href="/about#sources">
                <a className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-primary hover:bg-white mt-4 lg:mt-0">
                  Sources
                </a>
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
