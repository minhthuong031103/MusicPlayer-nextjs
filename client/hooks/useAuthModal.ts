import { create } from 'zustand';

interface AuthModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useAuthModal = create<AuthModalStore>(function (set) {
  return {
    isOpen: false,
    onOpen: function () {
      set({ isOpen: true });
    },
    onClose: function () {
      set({ isOpen: false });
    },
  };
});
export default useAuthModal;
