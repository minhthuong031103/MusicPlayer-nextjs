'use client';

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = function ({ children }) {
  return <div>{children}</div>;
};
export default Sidebar;
