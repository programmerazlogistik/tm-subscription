"use client";

import { useEffect, useState } from "react";

import IconComponent from "@/components/IconComponent/IconComponent";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
} from "@/components/Modal/Modal";

import { useTranslation } from "@/hooks/use-translation";

import { toast } from "@/lib/toast";
import { formatPhoneNumber } from "@/lib/utils/phoneFormatter";

/**
 * HubungiModal Component - A reusable modal for displaying contact information
 *
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Whether the modal is open
 * @param {Function} props.onClose - Function to close the modal
 * @param {boolean} [props.showInitialChoice=true] - If true, shows the Transporter/Driver selection. If false, shows the contact options screen directly.
 * @param {Object} [props.fleet] - Object containing fleet information with contact details.
 */

const HubungiModal = ({ isOpen, onClose, showInitialChoice = true, fleet }) => {
  const { t } = useTranslation();
  const [modalView, setModalView] = useState("initial"); // 'initial', 'details'
  const [showCopySuccess, setShowCopySuccess] = useState(false);

  // Ensure modalView resets to 'initial' when modal is closed
  const handleModalOpenChange = (open) => {
    if (!open) {
      setModalView("initial");
      if (typeof onClose === "function") onClose();
    }
  };

  // Fallback: if parent toggles isOpen to false, reset modalView as well
  useEffect(() => {
    if (!isOpen) setModalView("initial");
  }, [isOpen]);

  if (!isOpen || !fleet) return null;

  // Prepare contact data from fleet object
  const prepareContactData = () => {
    const contacts = {
      pics: [],
      emergencyContact: null,
      companyContact: null,
    };

    // PIC contacts from transporter
    if (fleet.transporter) {
      // PIC 1
      if (fleet.transporter.picName || fleet.transporter.picPhone) {
        contacts.pics.push({
          name: fleet.transporter.picName || "-",
          position: fleet.transporter.picPosition || "-",
          phoneNumber: fleet.transporter.picPhone || "-",
          Level: 1,
        });
      }

      // PIC 2
      if (fleet.transporter.picName2 || fleet.transporter.picPhone2) {
        contacts.pics.push({
          name: fleet.transporter.picName2 || "-",
          position: fleet.transporter.picPosition2 || "-",
          phoneNumber: fleet.transporter.picPhone2 || "-",
          Level: 2,
        });
      }

      // PIC 3
      if (fleet.transporter.picName3 || fleet.transporter.picPhone3) {
        contacts.pics.push({
          name: fleet.transporter.picName3 || "-",
          position: fleet.transporter.picPosition3 || "-",
          phoneNumber: fleet.transporter.picPhone3 || "-",
          Level: 3,
        });
      }

      // Company contact
      if (fleet.transporter.companyPhone) {
        contacts.companyContact = fleet.transporter.companyPhone;
      }
    }

    // Emergency contact from driver
    if (fleet.driver) {
      contacts.emergencyContact = {
        name: fleet.driver.fullName || "-",
        position: "Driver",
        phoneNumber: fleet.driver.phoneNumber || "-",
      };
    }

    return contacts;
  };

  const contacts = prepareContactData();

  const handleCopyPhone = (phoneNumber) => {
    if (phoneNumber && phoneNumber !== "-") {
      navigator.clipboard
        .writeText(phoneNumber)
        .then(() => {
          setShowCopySuccess(true);
          setTimeout(() => setShowCopySuccess(false), 3000);
        })
        .catch(() => {
          toast.error(
            t("HubungiModal.copyError", {}, "Gagal menyalin nomor telepon")
          );
        });
    }
  };

  // View: Contact Details
  if (modalView === "details") {
    return (
      <Modal
        open={isOpen}
        onOpenChange={handleModalOpenChange}
        withCloseButton={true}
        closeOnOutsideClick={true}
      >
        <ModalContent
          type="muattrans"
          size="medium"
          className="overflow-hidden p-0"
        >
          <ModalHeader />

          <div className="flex max-h-[479px] min-h-[439px] w-[386px] flex-col items-center gap-6 bg-white py-9">
            {/* --- Modal Title --- */}
            <ModalTitle className="w-full text-center text-sm font-bold leading-[17px] text-black">
              {t(
                "HubungiModal.contactTitle",
                {},
                "No Telepon/WhatsApp Yang Bisa Dihubungi"
              )}
            </ModalTitle>

            {/* --- Contacts List --- */}
            <div className="flex w-full flex-col gap-4 px-12">
              {/* PIC contacts */}
              {contacts.pics.map((contact, index) => (
                <div
                  key={index}
                  className="flex max-w-[286px] flex-row items-start gap-x-6"
                >
                  {/* Label Column */}
                  <div className="w-[78px] flex-shrink-0 text-sm font-semibold leading-[17px] text-black">
                    PIC {index + 1}
                  </div>

                  {/* Details Column */}
                  <div className="flex min-w-0 flex-1 flex-col items-start gap-1">
                    <div className="line-clamp-1 w-full max-w-[182px] text-sm font-medium leading-[17px] text-black">
                      {contact.name || t("HubungiModal.emptyName", {}, "-")}
                    </div>

                    <div className="w-full truncate text-xs font-medium leading-[14px] text-gray-500">
                      {contact.position || t("HubungiModal.emptyRole", {}, "-")}
                    </div>

                    {/* Phone & Copy Button */}
                    <div className="relative flex w-full flex-grow flex-row items-center justify-between gap-2 pt-1">
                      <div
                        className={`text-nowrap text-sm font-medium leading-none ${
                          contact.phoneNumber && contact.phoneNumber !== "-"
                            ? "cursor-pointer text-primary-700 underline"
                            : "text-primary-700"
                        }`}
                      >
                        {formatPhoneNumber(contact.phoneNumber) ||
                          t("HubungiModal.emptyPhone", {}, "-")}
                      </div>

                      {contact.phoneNumber && contact.phoneNumber !== "-" && (
                        <button
                          onClick={() => handleCopyPhone(contact.phoneNumber)}
                          className="absolute right-0 flex flex-shrink-0 cursor-pointer items-start gap-2.5 rounded-full border border-primary-700 bg-white px-2 py-1 transition-colors hover:bg-blue-50"
                        >
                          <span className="text-xs font-medium leading-[14px] text-primary-700">
                            {t("HubungiModal.copy", {}, "Salin")}
                          </span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* Company Contact */}
              {contacts.companyContact && (
                <div className="flex max-w-[286px] flex-row items-center gap-x-6">
                  {/* Label Column */}
                  <div className="w-[78px] flex-shrink-0 text-sm font-semibold leading-[17px] text-black">
                    No Telepon Perusahaan
                  </div>

                  {/* Details Column */}
                  <div className="flex min-w-0 flex-1 flex-col items-start gap-1">
                    {/* Phone & Copy Button */}
                    <div className="relative flex w-full flex-row items-center justify-between gap-2 pt-1">
                      <div
                        className={`text-nowrap text-sm font-medium leading-none ${
                          contacts.companyContact &&
                          contacts.companyContact !== "-"
                            ? "cursor-pointer text-primary-700 underline"
                            : "text-primary-700"
                        }`}
                      >
                        {formatPhoneNumber(contacts.companyContact) ||
                          t("HubungiModal.emptyPhone", {}, "-")}
                      </div>

                      {contacts.companyContact &&
                        contacts.companyContact !== "-" && (
                          <button
                            onClick={() =>
                              handleCopyPhone(contacts.companyContact)
                            }
                            className="absolute right-0 flex flex-shrink-0 cursor-pointer items-start gap-2.5 rounded-full border border-primary-700 bg-white px-2 py-1 transition-colors hover:bg-blue-50"
                          >
                            <span className="text-xs font-medium leading-[14px] text-primary-700">
                              {t("HubungiModal.copy", {}, "Salin")}
                            </span>
                          </button>
                        )}
                    </div>
                  </div>
                </div>
              )}

              {/* Emergency Contact (Driver) */}
              {contacts.emergencyContact && (
                <div className="flex max-w-[286px] flex-row items-start gap-x-6">
                  {/* Label Column */}
                  <div className="w-[78px] flex-shrink-0 text-sm font-semibold leading-[17px] text-black">
                    No. Darurat
                  </div>

                  {/* Details Column */}
                  <div className="flex min-w-0 flex-1 flex-col items-start gap-1">
                    <div className="w-full truncate text-sm font-medium leading-[17px] text-black">
                      {contacts.emergencyContact.name ||
                        t("HubungiModal.emptyName", {}, "-")}
                    </div>

                    <div className="w-full truncate text-xs font-medium leading-[14px] text-gray-500">
                      {contacts.emergencyContact.position ||
                        t("HubungiModal.emptyRole", {}, "-")}
                    </div>

                    {/* Phone & Copy Button */}
                    <div className="relative flex w-full flex-row items-center justify-between gap-2 pt-1">
                      <div
                        className={`text-nowrap text-sm font-medium leading-none ${
                          contacts.emergencyContact.phoneNumber &&
                          contacts.emergencyContact.phoneNumber !== "-"
                            ? "cursor-pointer text-primary-700 underline"
                            : "text-primary-700"
                        }`}
                      >
                        {formatPhoneNumber(
                          contacts.emergencyContact.phoneNumber
                        ) || t("HubungiModal.emptyPhone", {}, "-")}
                      </div>

                      {contacts.emergencyContact.phoneNumber &&
                        contacts.emergencyContact.phoneNumber !== "-" && (
                          <button
                            onClick={() =>
                              handleCopyPhone(
                                contacts.emergencyContact.phoneNumber
                              )
                            }
                            className="absolute right-0 flex flex-shrink-0 cursor-pointer items-start gap-2.5 rounded-full border border-primary-700 bg-white px-2 py-1 transition-colors hover:bg-blue-50"
                          >
                            <span className="text-xs font-medium leading-[14px] text-primary-700">
                              {t("HubungiModal.copy", {}, "Salin")}
                            </span>
                          </button>
                        )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* --- Copy Success Notification --- */}
            {showCopySuccess && (
              <div className="mb-2 flex w-full flex-row items-center justify-center gap-1 rounded-md px-6">
                <span className="flex h-6 w-[286px] items-center justify-center rounded-md bg-[#E2F2FF] text-center text-xs font-semibold leading-tight text-primary-700">
                  {t(
                    "HubungiModal.copySuccess",
                    {},
                    "No. Telepon/Whatsapp berhasil disalin"
                  )}
                </span>
              </div>
            )}
          </div>
        </ModalContent>
      </Modal>
    );
  }

  // Initial view with contact options
  return (
    <Modal
      open={isOpen}
      onOpenChange={handleModalOpenChange}
      withCloseButton={true}
      closeOnOutsideClick={true}
    >
      <ModalContent
        type="muattrans"
        size="medium"
        className="flex flex-col items-start overflow-hidden rounded-xl p-0 shadow-[0px_4px_11px_rgba(65,65,65,0.25)]"
      >
        <ModalHeader className="w-full" />
        <div className="flex w-[386px] flex-col items-center justify-center gap-6 bg-white px-6 py-9">
          <div className="flex flex-col items-center gap-2">
            <ModalTitle className="text-center text-sm font-bold text-[#1B1B1B]">
              {t(
                "HubungiModal.contactViaTitle",
                {},
                "Anda Ingin Menghubungi Via"
              )}
            </ModalTitle>
            <p className="text-center text-xs font-semibold text-gray-500">
              {t(
                "HubungiModal.contactViaDesc",
                {},
                "Anda dapat memilih menghubungi melalui pilihan berikut"
              )}
            </p>
          </div>
          <div className="flex flex-col items-start gap-4">
            <button
              onClick={() => {
                setModalView("details");
              }}
              className="box-border flex w-full flex-row items-center justify-between gap-3 rounded-md border border-gray-200 bg-white px-6 py-4 transition-colors"
            >
              <div className="h-6 w-6">
                <IconComponent
                  src="/icons/call-blue.svg"
                  className="text-blue-700"
                  width={24}
                  height={24}
                  alt="Phone Icon"
                />
              </div>
              <div className="flex flex-col items-start gap-1">
                <div className="text-sm font-semibold leading-[17px] text-primary-700">
                  {t("HubungiModal.phoneOrWA", {}, "No. Telepon / WhatsApp")}
                </div>
                <div className="text-xs font-medium leading-[14px] text-gray-500">
                  {t(
                    "HubungiModal.phoneOrWADesc",
                    {},
                    "Anda langsung terhubung dengan Whatsapp"
                  )}
                </div>
              </div>
            </button>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default HubungiModal;
