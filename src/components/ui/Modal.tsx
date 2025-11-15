import { createPortal } from 'react-dom';
import { useEffect, type ReactNode } from 'react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
}

export const Modal = ({ open, onClose, title, description, children, footer }: ModalProps) => {
  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4 py-8">
      <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            {title && <h3 className="text-xl font-semibold text-cp365-textMain">{title}</h3>}
            {description && <p className="mt-1 text-sm text-cp365-textMuted">{description}</p>}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-cp365-textMuted transition hover:text-cp365-textMain"
            aria-label="Close modal"
          >
            ×
          </button>
        </div>
        <div className="mt-4 text-sm text-cp365-textMain">{children}</div>
        {footer && <div className="mt-6 flex flex-wrap justify-end gap-3">{footer}</div>}
      </div>
    </div>,
    document.body,
  );
};
