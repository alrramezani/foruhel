"use client";
import { HiOutlineDocument } from "react-icons/hi";
import Drawer from "@/app/dash/components/drawer";
import { useState } from "react";
const today = () => {
  const now = new Date();
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long", // Full name of the day (e.g., Monday)
    day: "numeric", // Numeric day of the month (e.g., 7)
    month: "long", // Full month name (e.g., August)
    year: "numeric", // Full year (e.g., 2024)
  }).format(now);
};

export default function DashPage() {
  const [drawerStatus, setDrawerStatus] = useState(false);
  const toggleDrawer = () => {
    setDrawerStatus(!drawerStatus);
  };
  return (
    <>
      <div className="container mx-auto px-4 md:px-16">
        <header className="pt-4 md:pt-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl md:text-4xl">Hi, Alireza</h1>
              <span className="text-[10px] opacity-60">{today()}</span>
            </div>
            <HiOutlineDocument
              className="text-2xl cursor-pointer"
              onClick={toggleDrawer}
            />
          </div>
        </header>
        <main></main>
      </div>
      <Drawer isOpen={drawerStatus} toggle={toggleDrawer}>child</Drawer>
    </>
  );
}
