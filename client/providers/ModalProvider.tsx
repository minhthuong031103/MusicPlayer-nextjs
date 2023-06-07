'use client';

import AuthModal from '@/Components/AuthModal';
import Modal from '@/Components/Modal';
import UploadModal from '@/Components/UploadModal';
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
