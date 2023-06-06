import Sidebar from '@/Components/Sidebar';
import './globals.css';
import { Figtree } from 'next/font/google';
import SupabaseProvider from '@/providers/SupabaseProvider';

const font = Figtree({ subsets: ['latin'] });

export const metadata = {
  title: 'Thuong Player',
  description: 'Music App by Thuong',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <SupabaseProvider>
          <Sidebar>{children}</Sidebar>
        </SupabaseProvider>
      </body>
    </html>
  );
}
