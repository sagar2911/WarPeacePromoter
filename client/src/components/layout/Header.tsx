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
                Cost of War Tracker
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
                <span
                  className={`block mt-4 lg:inline-block lg:mt-0 text-secondary hover:text-white mr-6 cursor-pointer ${
                    isActive("/")
                      ? "font-semibold border-b-2 border-secondary"
                      : ""
                  }`}
                >
                  Lives Lost Dashboard
                </span>
              </Link>
              <Link href="/simulation">
                <span
                  className={`block mt-4 lg:inline-block lg:mt-0 text-secondary hover:text-white mr-6 cursor-pointer ${
                    isActive("/simulation")
                      ? "font-semibold border-b-2 border-secondary"
                      : ""
                  }`}
                >
                  Escalation Simulator
                </span>
              </Link>
              <Link href="/past-conflicts">
                <span
                  className={`block mt-4 lg:inline-block lg:mt-0 text-secondary hover:text-white mr-6 cursor-pointer ${
                    isActive("/past-conflicts")
                      ? "font-semibold border-b-2 border-secondary"
                      : ""
                  }`}
                >
                  Forgotten Victims
                </span>
              </Link>
              <Link href="/about">
                <span
                  className={`block mt-4 lg:inline-block lg:mt-0 text-secondary hover:text-white cursor-pointer ${
                    isActive("/about")
                      ? "font-semibold border-b-2 border-secondary"
                      : ""
                  }`}
                >
                  About & Data Sources
                </span>
              </Link>
            </div>
            <div>
              <Link href="/about#sources">
                <span className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-danger bg-danger hover:bg-danger/80 hover:border-danger/80 mt-4 lg:mt-0 cursor-pointer">
                  Stop The Violence
                </span>
              </Link>
            </div>
          </div>
        </nav>
      </div>
      <div className="bg-danger text-center text-white text-sm py-1">
        <p>Every number represents a human life. War has no winners, only victims.</p>
      </div>
    </header>
  );
};

export default Header;
