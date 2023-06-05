'use client';

import { twMerge } from 'tailwind-merge';
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx';
interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

const Header = function ({ children, className }: HeaderProps) {
  return (
    <>
      <div
        className={twMerge(
          `h-fit bg-gradient-to-b
        from-emerald-800 p-6 `,
          className
        )}
      >
        <div className="w-full mb-4 flex items-center justify-between">
          <div className="hidden md:flex gap-x-2 items-center">
            <button
              className="rounded-full bg-black
 flex items-center justify-center
 hover:opacity-75 transition"
            >
              <RxCaretLeft className="text-white" size={35} />
            </button>
            <button
              className="rounded-full bg-black
 flex items-center justify-center
 hover:opacity-75 transition"
            >
              <RxCaretRight className="text-white" size={35} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
