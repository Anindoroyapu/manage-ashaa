import React from "react";

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <header className="sticky top-0 z-40 flex w-full bg-white dark:bg-gray-800 shadow-sm">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSidebarOpen(!sidebarOpen);
            }}
            className="z-50 block rounded-lg border border-gray-300 bg-white px-3 py-2 shadow-sm dark:border-gray-600 dark:bg-gray-700 lg:hidden"
          >
            <span className="relative block h-5.5 w-5.5 cursor-pointer">
              <span className="du-block absolute right-0 h-full w-full">
                <span
                  className={`relative top-0 left-0 my-1 block h-0.5 w-full rounded-sm bg-black dark:bg-white transition-all duration-200 ease-in-out ${
                    sidebarOpen ? "top-2 rotate-45" : ""
                  }`}
                ></span>
                <span
                  className={`relative top-0 left-0 my-1 block h-0.5 w-full rounded-sm bg-black dark:bg-white transition-all duration-200 ease-in-out ${
                    sidebarOpen ? "opacity-0" : ""
                  }`}
                ></span>
                <span
                  className={`relative top-0 left-0 my-1 block h-0.5 w-full rounded-sm bg-black dark:bg-white transition-all duration-200 ease-in-out ${
                    sidebarOpen ? "-top-2 -rotate-45" : ""
                  }`}
                ></span>
              </span>
            </span>
          </button>
          <h1 className="text-xl font-semibold">Asha LensCraft</h1>
        </div>

        <div className="hidden lg:block">
          {/* Can add search bar or other elements here */}
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <span className="font-medium">Welcome, Anindo</span>
            {/* Placeholder for user dropdown */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
