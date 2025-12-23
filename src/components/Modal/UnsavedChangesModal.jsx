"use client";

import Button from "@/components/Button/Button";

import { Modal, ModalContent } from "./Modal";

/**
 * UnsavedChangesModal Component
 *
 * A warning modal that appears when user tries to leave a page with unsaved changes.
 * Simple design with title, message, and action buttons.
 *
 * @param {boolean} isOpen - Whether the modal is currently open
 * @param {Function} onClose - Function to close the modal
 * @param {Function} onConfirm - Function called when user confirms to stay (Batal)
 * @param {Function} onCancel - Function called when user confirms to leave (Ya)
 * @param {string} title - Modal title (default: "Warning")
 * @param {string} message - Warning message (default warning text)
 * @param {string} confirmText - Confirm button text (default: "Batal")
 * @param {string} cancelText - Cancel button text (default: "Ya")
 */
export default function UnsavedChangesModal({
  isOpen,
  onClose,
  onConfirm,
  onCancel,
  title = "Warning",
  message = "Apakah kamu yakin ingin berpindah halaman? Data yang telah diisi tidak akan disimpan",
  confirmText = "Batal",
  cancelText = "Ya",
}) {
  const handleConfirm = () => {
    onConfirm?.();
  };

  const handleCancel = () => {
    onCancel?.();
  };

  return (
    <Modal open={isOpen} onOpenChange={onClose}>
      <ModalContent
        withCloseButton={true}
        closeOnOutsideClick={false}
        className="h-[203px] w-[411px] rounded-xl bg-white p-0 shadow-[0px_4px_11px_rgba(65,65,65,0.25)]"
        appearance={{
          backgroudClassname: "",
          closeButtonClassname: "w-5 h-5 bg-white shadow-sm text-[#176CF7]",
        }}
      >
        {/* Header - Hidden as per design */}
        <div className="hidden h-[70px] w-full"></div>

        {/* Main content */}
        <div className="flex h-full w-full flex-col items-center justify-center gap-6 px-6 py-9">
          {/* Title with close button space */}
          <div className="flex h-[17px] w-full flex-row items-start justify-end gap-2 pl-2.5">
            <h3 className="flex-grow text-center text-sm font-bold leading-[17px] text-[#1B1B1B]">
              {title}
            </h3>
            {/* Close button icon space - handled by ModalContent */}
            <div className="h-2 w-2 bg-[#176CF7]"></div>
          </div>

          {/* Message */}
          <div className="flex h-[34px] w-full items-center justify-center">
            <p className="text-center text-sm font-medium leading-[17px] text-black">
              {message}
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex h-8 w-[232px] flex-row items-start gap-2">
            <button
              onClick={handleConfirm}
              className="flex h-8 w-28 min-w-28 items-center justify-center gap-1 rounded-3xl border-0 bg-[#176CF7] px-6 py-3"
            >
              <span className="text-sm font-semibold leading-[120%] text-white">
                {confirmText}
              </span>
            </button>

            <button
              onClick={handleCancel}
              className="flex h-8 w-28 min-w-28 items-center justify-center gap-1 rounded-3xl border border-[#176CF7] bg-white px-6 py-3"
            >
              <span className="text-sm font-semibold leading-[120%] text-[#176CF7]">
                {cancelText}
              </span>
            </button>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
}
