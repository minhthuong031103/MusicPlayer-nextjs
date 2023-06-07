import Link from 'next/link';
import { IconType } from 'react-icons';
import { twMerge } from 'tailwind-merge';

interface SidebarItemProps {
  icon: IconType;
  label: string;
  active?: boolean;
  href: string;
}

const SidebarItem = function ({
  icon: Icon,
  label,
  active,
  href,
}: SidebarItemProps) {
  return (
    <Link
      href={href}
      className={twMerge(
        `flex flex-row h-auto w-full
        items-center gap-x-4 text-md font-medium cursor-pointer hover:text-white
        transition text-neutral-400 py-1`,
        active && 'text-white'
      )}
    >
      <Icon size={26}></Icon>

      <p className="truncate w-100">{label}</p>
    </Link>
  );
};

export default SidebarItem;
