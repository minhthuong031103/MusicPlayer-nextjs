'use client';

import { Database } from '@/types_db.ts';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useState } from 'react';
interface SupabaseProviderProps {
  children: React.ReactNode;
}

const SupabaseProvider = function ({ children }: SupabaseProviderProps) {
  const [supabaseClient] = useState(function () {
    createClientComponentClient<Database>();
  });

  return (
    <SessionContextProvider supabaseClient={supabaseClient}>
      {children}
    </SessionContextProvider>
  );
};
export default SupabaseProvider;
