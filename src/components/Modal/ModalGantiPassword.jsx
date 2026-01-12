"use client";

import { useState } from "react";

import { InfoTooltip } from "@muatmuat/ui/Tooltip";

import Button from "../Button/Button";
import { FormContainer, FormLabel } from "../Form/Form";
import Input from "../Form/Input";
import IconComponent from "../IconComponent/IconComponent";
import { Modal, ModalContent, ModalHeader } from "./Modal";

// CSS styles for asterisk password
const passwordStyles = `
  .password-asterisk input[type="password"] {
    font-family: 'Courier New', monospace !important;
    -webkit-text-security: disc;
    text-security: disc;
  }
  
  .password-asterisk input[type="password"]::-webkit-textfield-decoration-container {
    display: none;
  }
  
  .password-asterisk input[type="password"] {
    font-size: 18px !important;
    letter-spacing: 2px;
  }
  
  .password-asterisk input[type="password"]::-ms-reveal {
    display: none;
  }
`;

const ModalGantiPassword = ({
  open,
  onOpenChange,
  onSubmit,
  isLoading = false,
}) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});

  // Function to clear specific error when user starts typing
  const clearError = (fieldName) => {
    if (errors[fieldName]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    }
  };

  // Function to reset all form data and state
  const resetForm = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setErrors({});
    setShowCurrent(false);
    setShowNew(false);
    setShowConfirm(false);
  };

  // Function to reset form and errors when modal closes
  const handleModalChange = (isOpen) => {
    if (!isOpen) {
      resetForm();
    }
    onOpenChange(isOpen);
  };

  const validate = () => {
    const err = {};

    // Current password validation
    if (!currentPassword) {
      err.currentPassword = "Password Lama wajib diisi";
    }

    // New password validation
    if (!newPassword) {
      err.newPassword = "Password Baru wajib diisi";
    } else if (newPassword.length < 8) {
      err.newPassword = "Password minimal 8 karakter";
    } else {
      const hasUpperCase = /[A-Z]/.test(newPassword);
      const hasLowerCase = /[a-z]/.test(newPassword);
      const hasNumbers = /\d/.test(newPassword);

      if (!hasUpperCase || !hasLowerCase || !hasNumbers) {
        err.newPassword =
          "Password harus terdapat huruf besar, kecil dan angka";
      }
    }

    // Confirm password validation
    if (!confirmPassword) {
      err.confirmPassword = "Ulangi Password wajib diisi";
    } else if (confirmPassword !== newPassword) {
      err.confirmPassword = "Password tidak sama";
    }

    // Check if new password is same as current password
    if (newPassword && currentPassword && newPassword === currentPassword) {
      err.newPassword = "Password Baru tidak dapat sama dengan password lama";
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onSubmit?.({ currentPassword, newPassword, confirmPassword });
      // Optionally reset form after successful submission
      // resetForm();
    }
  };

  return (
    <Modal open={open} onOpenChange={handleModalChange}>
      <ModalContent
        size="small"
        type="muattrans"
        className="h-[446px] w-[695px]"
      >
        <ModalHeader />
        <div className="flex flex-col items-center gap-6 px-8 py-6">
          <h3 className="text-center text-lg font-bold text-neutral-900">
            Ubah Password
          </h3>

          <FormContainer className="w-full md:!gap-4">
            <FormLabel className={"!font-semibold !text-neutral-900"}>
              Password Lama
            </FormLabel>
            <div className="relative h-[40px]">
              <Input
                type={showCurrent ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => {
                  setCurrentPassword(e.target.value);
                  clearError("currentPassword");
                }}
                placeholder="Masukkan Password Lama"
                name="currentPassword"
                errorMessage={errors.currentPassword}
                disabled={isLoading}
                icon={{
                  left: "/icons/lock-orange.svg",
                  right: (
                    <button
                      type="button"
                      onClick={() => setShowCurrent((v) => !v)}
                      className="flex items-center"
                      disabled={isLoading}
                    >
                      <IconComponent
                        src={
                          showCurrent ? "/icons/eye.svg" : "/icons/eye-off.svg"
                        }
                        height={24}
                        width={24}
                      />
                    </button>
                  ),
                }}
                appearance={{
                  containerClassName:
                    "rounded-[6px] border bg-white px-3 py-2 w-[440px] h-[40px]",
                  inputClassName: `text-base ${!showCurrent ? "password-asterisk" : ""}`,
                  iconClassName: "!w-6 !h-6",
                }}
              />
            </div>

            <FormLabel className={"mt-9 !font-semibold !text-neutral-900"}>
              Password Baru
            </FormLabel>
            <div className="relative h-[86px]">
              <div className="col-span-full flex justify-end pb-2 pr-6 pt-3 text-xs font-medium text-primary-700">
                <a href="#" className="hover:text-primary-800">
                  Lupa Password?
                </a>
              </div>
              <div className="flex items-start">
                <div className="flex-1">
                  <Input
                    type={showNew ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                      clearError("newPassword");
                    }}
                    placeholder="Masukkan Password Baru"
                    name="newPassword"
                    errorMessage={errors.newPassword}
                    disabled={isLoading}
                    icon={{
                      left: "/icons/lock-orange.svg",
                      right: (
                        <button
                          type="button"
                          onClick={() => setShowNew((v) => !v)}
                          className="flex items-center"
                          disabled={isLoading}
                          aria-label={
                            showNew
                              ? "Sembunyikan password"
                              : "Tampilkan password"
                          }
                        >
                          <IconComponent
                            src={
                              showNew ? "/icons/eye.svg" : "/icons/eye-off.svg"
                            }
                            height={24}
                            width={24}
                          />
                        </button>
                      ),
                    }}
                    appearance={{
                      containerClassName:
                        "rounded-[6px] border bg-white px-3 py-2 w-[440px] h-[40px]",
                      inputClassName: `text-base ${!showNew ? "password-asterisk" : ""}`,
                      iconClassName: "!w-6 !h-6",
                    }}
                  />
                </div>

                {/* Tooltip info di kanan input - aligned with input field */}
                <div className="ml-2 flex h-[40px] w-auto items-center justify-center">
                  <InfoTooltip
                    className="max-w-[260px]"
                    side="right"
                    align="center"
                    sideOffset={8}
                    trigger={
                      <button type="button" aria-label="Info kriteria password">
                        <IconComponent
                          src="/icons/infoBold.svg"
                          height={18}
                          width={18}
                          className="font-semibold text-[#176CF7]"
                        />
                      </button>
                    }
                  >
                    <div className="text-xs">
                      <ul className="space-y-1 text-sm text-neutral-900">
                        <li className="flex items-start gap-2">
                          <span className="mt-1 h-1 w-1 flex-shrink-0 rounded-full bg-neutral-900 text-sm"></span>
                          <span>Password minimal 8 karakter</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-1 h-1 w-1 flex-shrink-0 rounded-full bg-neutral-900 text-sm"></span>
                          <span>Terdapat min. 1 huruf besar</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-1 h-1 w-1 flex-shrink-0 rounded-full bg-neutral-900 text-sm"></span>
                          <span>Terdapat min. 1 huruf kecil</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-1 h-1 w-1 flex-shrink-0 rounded-full bg-neutral-900 text-sm"></span>
                          <span>Terdapat angka</span>
                        </li>
                      </ul>
                    </div>
                  </InfoTooltip>
                </div>
              </div>
            </div>

            <FormLabel className={"!font-semibold !text-neutral-900"}>
              Konfirmasi Password Baru
            </FormLabel>
            <div className="relative h-[52px]">
              <Input
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  clearError("confirmPassword");
                }}
                placeholder="Ulangi Password Baru"
                name="confirmPassword"
                errorMessage={errors.confirmPassword}
                disabled={isLoading}
                icon={{
                  left: "/icons/lock-orange.svg",
                  right: (
                    <button
                      type="button"
                      onClick={() => setShowConfirm((v) => !v)}
                      className="flex items-center"
                      disabled={isLoading}
                    >
                      <IconComponent
                        src={
                          showConfirm ? "/icons/eye.svg" : "/icons/eye-off.svg"
                        }
                        height={24}
                        width={24}
                      />
                    </button>
                  ),
                }}
                appearance={{
                  containerClassName:
                    "rounded-[6px] border bg-white px-3 py-2 w-[440px] h-[40px]",
                  inputClassName: `text-base ${!showConfirm ? "password-asterisk" : ""}`,
                  iconClassName: "!w-6 !h-6",
                }}
              />
            </div>
          </FormContainer>
        </div>
        <div className="mt-2 flex justify-center">
          <Button
            onClick={handleSubmit}
            variant="muattrans-primary"
            disabled={isLoading}
            className="!h-8 !w-auto rounded-full bg-muat-trans-primary-400 text-base font-[600px] text-muat-trans-secondary-900 hover:bg-muat-trans-primary-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? "Mengubah..." : "Ubah Password"}
          </Button>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default ModalGantiPassword;
