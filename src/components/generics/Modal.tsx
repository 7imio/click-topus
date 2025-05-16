import { X } from 'lucide-react';
import { FC, ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-200 bg-black/30 flex items-center justify-center">
      <div className="bg-green-900/90 p-6 rounded-2xl shadow-lg w-full max-w-4xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-2xl hover:text-red-500 duration-150"
        >
          <X />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
