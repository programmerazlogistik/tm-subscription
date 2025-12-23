"use client";

import { Modal, ModalContent } from "./Modal";

/**
 * SuccessModal Component
 *
 * A simple success notification modal that shows a confirmation message
 * when an action has been completed successfully. Based on the design specs
 * with specific dimensions and styling.
 */
export default function SuccessModal({
  isOpen,
  onClose,
  title = "Pemberitahuan",
  message = "Data berhasil disimpan.",
  autoCloseDelay = 2000,
}) {
  // Auto-close functionality
  if (isOpen && autoCloseDelay > 0) {
    setTimeout(() => {
      onClose();
    }, autoCloseDelay);
  }

  return (
    <Modal open={isOpen} onOpenChange={onClose}>
      <ModalContent
        withCloseButton={true}
        closeOnOutsideClick={true}
        className="h-[130px] w-[385px] rounded-xl bg-white p-0 shadow-[0px_4px_11px_rgba(65,65,65,0.25)]"
        appearance={{
          backgroudClassname: "",
          closeButtonClassname: "w-5 h-5 bg-white shadow-sm",
        }}
      >
        {/* Main content container */}
        <div className="flex h-full w-full flex-col items-center justify-center gap-6 px-6 py-9">
          {/* Content wrapper */}
          <div className="flex w-full flex-col items-center justify-center gap-6">
            {/* Title */}
            <div className="w-full">
              <h3 className="text-center text-sm font-bold leading-[17px] text-[#1B1B1B]">
                {title}
              </h3>
            </div>

            {/* Message */}
            <div className="w-full">
              <p className="text-center text-sm font-medium leading-[17px] text-[#1B1B1B]">
                {message}
              </p>
            </div>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
}
