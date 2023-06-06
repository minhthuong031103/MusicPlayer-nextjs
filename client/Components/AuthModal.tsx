'use client';

import {
  useSessionContext,
  useSupabaseClient,
} from '@supabase/auth-helpers-react';
import Modal from './Modal';
import { useRouter } from 'next/navigation';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import useAuthModal from '@/hooks/useAuthModal';
import { useEffect } from 'react';
const AuthModal = function () {
  const { onClose, isOpen } = useAuthModal();
  const onChange = function (open: boolean) {
    if (!open) {
      onClose();
    }
  };
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const { session } = useSessionContext();
  useEffect(
    function () {
      if (session) {
        router.refresh();
        onClose();
      }
    },
    [session, router, onClose]
  );

  return (
    <Modal
      description="Login to your account"
      isOpen={isOpen}
      onChange={onChange}
      title="Welcome back"
    >
      <Auth
        theme="dark"
        magicLink
        providers={['github', 'google']}
        supabaseClient={supabaseClient}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: { colors: { brand: '#404040', brandAccent: '#22c55e' } },
          },
        }}
      />
    </Modal>
  );
};

export default AuthModal;
