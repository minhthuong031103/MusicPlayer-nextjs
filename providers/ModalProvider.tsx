'use client';

import AuthModal from '@/components/AuthModal';

import UploadModal from '@/components/UploadModal';
import { useEffect, useState } from 'react';

const ModalProvider = function () {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(function () {
    setIsMounted(true);
  }, []);
  //we know that we is on client side
  if (!isMounted) return null;

  return (
    <>
      <AuthModal></AuthModal>
      <UploadModal></UploadModal>
    </>
  );
};
export default ModalProvider;
