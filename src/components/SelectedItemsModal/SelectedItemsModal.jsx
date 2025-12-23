import PropTypes from "prop-types";

import { Modal, ModalContent, ModalTitle } from "../Modal/Modal";

const SelectedItemsModal = ({ isOpen, onClose, items, title = "Lainnya" }) => {
  return (
    <Modal
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <ModalContent className="w-[471px] p-6 !pr-3">
        <div className="flex flex-shrink-0 items-center justify-between border-b pb-3">
          <ModalTitle className="text-left text-xs !font-semibold text-[#1B1B1B]">
            {title}
          </ModalTitle>
        </div>
        <div className="mt-4 max-h-[136px] space-y-4 overflow-y-auto">
          {items.map((item) => (
            <div
              key={item.value}
              className="text-xs font-medium text-[#1B1B1B]"
            >
              {item.label}
            </div>
          ))}
        </div>
      </ModalContent>
    </Modal>
  );
};

SelectedItemsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  title: PropTypes.string,
};

export default SelectedItemsModal;
