import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";

interface MenuItem {
  title: string;
  icon: React.ReactNode;
  links: { name: string; path: string }[];
}

interface AccardionMenuProps {
  menus: MenuItem[];
}

function AccardionMenu({ menus }: AccardionMenuProps) {
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState<string | null>(null);


  const isLinkActive = (path: string) => location.pathname === path;

  const isMenuActive = (menuItem: MenuItem) => {
    return menuItem.links.some((link) => location.pathname === link.path);
  };


  useEffect(() => {
    const activeMenu = menus.find((menuItem) => isMenuActive(menuItem));
    if (activeMenu) {
      setOpenMenu(activeMenu.title);
    }
  }, [location.pathname]);

  const toggleMenu = (menuTitle: string) => {
    setOpenMenu((prev) => (prev === menuTitle ? null : menuTitle));
  };

  return (
    <div>
      {menus?.map((menuItem) => {
        const menuActive = isMenuActive(menuItem);
        const menuOpen = openMenu === menuItem.title;

        return (
          <div key={menuItem.title} className="mb-2">
            <button
              onClick={() => toggleMenu(menuItem.title)}
              className={`${
                menuActive || menuOpen
                  ? "bg-[#243C7B] text-white"
                  : "bg-white text-[#787486]"
              } flex items-center justify-between w-full p-5 rounded-lg hover:bg-[#243C7B] hover:text-white transition-colors`}
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-3">
                  {menuItem.icon}
                  <span className="text-sm font-lato font-medium">
                    {menuItem.title}
                  </span>
                </div>
                {menuItem.links.length > 0 && (
                  <div className={menuOpen ? "" : "rotate-180"}>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.28 10.5333C13.1533 10.5333 13.0267 10.4867 12.9267 10.3867L8.58001 6.04C8.26001 5.72 7.74001 5.72 7.42001 6.04L3.07335 10.3867C2.88001 10.58 2.56001 10.58 2.36668 10.3867C2.17335 10.1933 2.17335 9.87333 2.36668 9.68L6.71335 5.33333C7.42001 4.62666 8.57335 4.62666 9.28668 5.33333L13.6333 9.68C13.8267 9.87333 13.8267 10.1933 13.6333 10.3867C13.5333 10.48 13.4067 10.5333 13.28 10.5333Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </button>
            {menuOpen && menuItem.links.length > 0 && (
              <div className="p-5 mt-2 space-y-1 bg-white rounded-xl border border-[#F7F7F7]">
                {menuItem.links.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`block px-4 py-2 rounded transition-colors ${
                      isLinkActive(link.path)
                        ? "bg-[#E0E7FA] text-[#243C7B] font-medium"
                        : "text-[#787486] hover:text-[#243C7B] hover:bg-[#F5F7FA]"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default AccardionMenu;
