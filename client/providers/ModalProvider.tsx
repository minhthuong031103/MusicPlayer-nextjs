'use client';

import Modal from '@/Components/Modal';
import { useEffect, useState } from 'react';

const ModalProvider = function () {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(function () {
    setIsMounted(true);
  }, []);
  //we know that we is on client side
  if (!isMounted) return null;

  return <Modal />;
};
export default ModalProvider;
