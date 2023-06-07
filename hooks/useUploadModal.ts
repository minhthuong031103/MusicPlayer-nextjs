import { create } from 'zustand';

interface UploadModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useUploadModal = create<UploadModalStore>(function (set) {
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
export default useUploadModal;
