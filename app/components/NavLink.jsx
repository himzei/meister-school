"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

export function NavLink({ children, url, FlyoutContent }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuContent, setMenuContent] = useState(null);
  return (
    <div className="relative group h-full px-4">
      <div
        onMouseEnter={() => {
          setMenuOpen(true);
          setMenuContent(FlyoutContent);
        }}
        onMouseLeave={() => {
          setMenuOpen(false);
        }}
        className="relative py-2 px-1 w-full h-full "
      >
        <Link href={url}>{children}</Link>
        <span className="absolute bottom-0 left-0 right-0 h-1 origin-left scale-x-0 group-hover:scale-x-100 rounded-full bg-primary transition-transform duration-300 ease-out" />
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            onMouseEnter={() => setMenuOpen(true)}
            onMouseLeave={() => setMenuOpen(false)}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute left-0 right-0 flex px-2 bg-white shadow-md z-10 top-[100px] "
          >
            <div className="absolute -top-10 left-0 right-0 h-10 bg-transparent z-30" />
            {menuContent && (
              <div className="flex flex-col gap-y-1 w-full py-2">
                {menuContent.map((item, i) => (
                  <Link
                    href={item?.url}
                    className="hover:bg-primary hover:text-white duration-300 cursor-pointer px-2 py-2"
                    key={i}
                  >
                    {item?.title}
                  </Link>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
