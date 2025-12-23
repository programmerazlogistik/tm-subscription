"use client";

import ConfirmationModal from "@/components/Modal/ConfirmationModal";
import { useNavigationGuard } from "@/providers/NavigationGuardProvider";

const NavigationWarningModal = () => {
  const { showWarningModal, confirmNavigation, cancelNavigation } = useNavigationGuard();

  return (
    <ConfirmationModal
      isOpen={showWarningModal}
      setIsOpen={cancelNavigation}
      title={{ text: "Warning" }}
      description={{
        text: "Apakah kamu yakin ingin berpindah halaman? Data yang telah diisi tidak akan disimpan",
      }}
      cancel={{ text: "Batal", onClick: cancelNavigation }}
      confirm={{ text: "Ya", onClick: confirmNavigation }}
    />
  );
};

export default NavigationWarningModal;