import React, { ReactNode } from "react";
import { LuArrowRightToLine } from "react-icons/lu";

type DrawerProps = {
  isOpen: boolean;
  toggle?: () => void;
  children: ReactNode;
};

const Drawer: React.FC<DrawerProps> = ({ isOpen, toggle, children }) => {
  return (
    <>
      {isOpen && (
        <div
          onClick={toggle}
          className="fixed inset-0 bg-black bg-opacity-50"
          role="presentation"
        ></div>
      )}

      <div
        className={`fixed top-0 right-0 h-full w-1/2 bg-inherit shadow-lg transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        data-testid="drawer"
      >
        <div className="p-4">
          <div className="flex mb-4">
            <LuArrowRightToLine
              className="text-lg cursor-pointer"
              onClick={toggle}
              role="close_button"
            />
          </div>
          {isOpen && children}
        </div>
      </div>
    </>
  );
};
export default Drawer;
