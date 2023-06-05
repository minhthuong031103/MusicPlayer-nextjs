import { twMerge } from 'tailwind-merge';

interface BoxProps {
  children: React.ReactNode;
  className?: string;
}
const Box = function ({ children, className }: BoxProps) {
  return (
    <div
      className={twMerge(
        `bg-neutral-900 rounded-lg
        h-fit w-full`,
        className
      )}
    >
      {children}
    </div>
  );
};
export default Box;
