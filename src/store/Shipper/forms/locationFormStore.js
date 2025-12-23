import { create } from "zustand";

import { zustandDevtools } from "@/lib/utils";

import { useSewaArmadaStore } from "./sewaArmadaStore";

/**
 * @typedef {Object} NameValuePair
 * @property {string} name - The name of the district.
 * @property {string | number | null} value - The value/id of the district.
 */

/**
 * @typedef {Object} Coordinates
 * @property {number} latitude - The latitude coordinate.
 * @property {number} longitude - The longitude coordinate.
 */

/**
 * @typedef {Object} SelectedAddress
 * @property {NameValuePair} location
 * @property {NameValuePair} district
 * @property {NameValuePair} city
 * @property {NameValuePair} province
 * @property {NameValuePair[]} kecamatanList
 * @property {NameValuePair[]} postalCodeList
 * @property {NameValuePair} postalCode
 * @property {Coordinates} coordinates
 */

/**
 * @typedef {Object} LocationFormValues
 * @property {string} namaLokasi
 * @property {SelectedAddress|null} dataLokasi
 * @property {string} detailLokasi
 * @property {string} namaPIC
 * @property {string} noHPPIC
 * @property {boolean} isPrimaryLocation
 */

/**
 * @typedef {Object} LocationFormStoreState
 * @property {LocationFormValues} formValues
 * @property {Object} formErrors
 * @property {(field: keyof LocationFormValues, value: any) => void} setField
 * @property {(formErrors: Object) => void} setErrors
 * @property {() => void} reset
 * @property {() => boolean} validateForm
 */

/** @type {LocationFormValues} */
const defaultValues = {
  namaLokasi: "",
  dataLokasi: null,
  detailLokasi: "",
  namaPIC: "",
  noHPPIC: "",
  isMainAddress: false,
};

/**
 * Zustand store for the location form.
 * @type {import('zustand').UseBoundStore<import('zustand').StoreApi<LocationFormStoreState>>}
 */
export const useLocationFormStore = create(
  zustandDevtools(
    (set, get) => ({
      formValues: defaultValues,
      formErrors: {},
      lastValidLocation: null,
      setLastValidLocation: (lastValidLocation) => set({ lastValidLocation }),
      setField: (field, value) =>
        set((state) => ({
          formValues: { ...state.formValues, [field]: value },
        })),
      setLocationPartial: (partialLocation) =>
        set((state) => ({
          formValues: {
            ...state.formValues,
            dataLokasi: {
              ...state.formValues.dataLokasi,
              ...partialLocation,
            },
          },
        })),
      setErrors: (formErrors) =>
        set(() => ({
          formErrors,
        })),
      reset: (newValues) =>
        set({
          formValues: newValues ? newValues : defaultValues,
          formErrors: {},
        }),
      validateLokasiBongkarMuat: (formMode, index, isMobile, t) => {
        const { formValues } = get();
        const allSelectedLocations =
          useSewaArmadaStore.getState().formValues[
            formMode === "muat" ? "lokasiMuat" : "lokasiBongkar"
          ];

        const validateLocation = () => {
          if (!formValues.dataLokasi?.location)
            return formMode === "muat"
              ? t(
                  "LocationFormStore.messageErrorPickupLocationRequired",
                  {},
                  "Lokasi Muat wajib diisi"
                )
              : t(
                  "LocationFormStore.messageErrorDropoffLocationRequired",
                  {},
                  "Lokasi Bongkar wajib diisi"
                );

          const foundLocationIndex = allSelectedLocations.findIndex(
            (item) =>
              item?.dataLokasi?.location?.name ===
              formValues?.dataLokasi?.location?.name
          );

          if (foundLocationIndex !== -1 && foundLocationIndex !== index)
            return formMode === "muat"
              ? t(
                  "LocationFormStore.messageErrorPickupLocationDuplicate",
                  { index: index + 1, duplicateIndex: foundLocationIndex + 1 },
                  `Lokasi Muat ${index + 1} tidak boleh sama dengan Lokasi Muat ${foundLocationIndex + 1}`
                )
              : t(
                  "LocationFormStore.messageErrorDropoffLocationDuplicate",
                  { index: index + 1, duplicateIndex: foundLocationIndex + 1 },
                  `Lokasi Bongkar ${index + 1} tidak boleh sama dengan Lokasi Bongkar ${foundLocationIndex + 1}`
                );
        };

        const errors = {
          dataLokasi: validateLocation(),
          namaPIC: validateNamaPIC(formValues.namaPIC, formMode, isMobile, t),
          noHPPIC: validateNoHPPIC(formValues.noHPPIC, formMode, isMobile, t),
        };

        set({ formErrors: errors });
        // return validateForm is valid if all errors are undefined
        return Object.values(errors).every((error) => error === undefined);
      },
      validateSimpanLokasi: (t) => {
        const { formValues } = get();

        const errors = {
          namaLokasi: validateNamaLokasi(formValues.namaLokasi, t),
          detailLokasi: validateDetailLokasi(formValues.detailLokasi, t),
          namaPIC: validateNamaPIC(formValues.namaPIC, undefined, undefined, t),
          noHPPIC: validateNoHPPIC(formValues.noHPPIC, undefined, undefined, t),
        };

        set({ formErrors: errors });
        // return validateForm is valid if all errors are undefined
        return Object.values(errors).every((error) => error === undefined);
      },
      validateLokasiOnSelect: (formMode, index, selectedAddress, t) => {
        const allSelectedLocations =
          useSewaArmadaStore.getState().formValues[
            formMode === "muat" ? "lokasiMuat" : "lokasiBongkar"
          ];

        const foundLocationIndex = allSelectedLocations.findIndex(
          (item) => item?.dataLokasi?.location?.name === selectedAddress
        );

        if (foundLocationIndex !== -1 && foundLocationIndex !== index)
          return formMode === "muat"
            ? t(
                "LocationFormStore.messageErrorPickupLocationDuplicate",
                { index: index + 1, duplicateIndex: foundLocationIndex + 1 },
                `Lokasi Muat ${index + 1} tidak boleh sama dengan Lokasi Muat ${foundLocationIndex + 1}`
              )
            : t(
                "LocationFormStore.messageErrorDropoffLocationDuplicate",
                { index: index + 1, duplicateIndex: foundLocationIndex + 1 },
                `Lokasi bongkar ${index + 1} tidak boleh sama dengan Lokasi bongkar ${foundLocationIndex + 1}`
              );
      },
      validateLayananTambahan: (t) => {
        const { formValues } = get();

        const errors = {
          dataLokasi: validateDataLokasi(formValues.dataLokasi, t),
          detailLokasi: validateDetailLokasi(formValues.detailLokasi, t),
        };

        set({ formErrors: errors });
        // return validateForm is valid if all errors are undefined
        if (!formValues.namaPIC) {
          errors.namaPIC = t(
            "LocationFormStore.messageErrorRecipientNameRequired",
            {},
            "Nama Penerima wajib diisi"
          );
        } else if (formValues.namaPIC.length < 3) {
          errors.namaPIC = t(
            "LocationFormStore.messageErrorRecipientNameMinLength",
            {},
            "Nama Penerima minimal 3 karakter"
          );
        } else if (!/^[a-zA-Z' ]+$/.test(formValues.namaPIC)) {
          errors.namaPIC = t(
            "LocationFormStore.messageErrorRecipientNameInvalid",
            {},
            "Penulisan Nama Penerima tidak valid"
          );
        }

        if (!formValues.noHPPIC) {
          errors.noHPPIC = t(
            "LocationFormStore.messageErrorRecipientPhoneRequired",
            {},
            "Nomor Handphone Penerima wajib diisi"
          );
        } else if (formValues.noHPPIC.length < 8) {
          errors.noHPPIC = t(
            "LocationFormStore.messageErrorRecipientPhoneMinLength",
            {},
            "No. HP penerima minimal 8 digit"
          );
        } else if (/[^0-9]/.test(formValues.noHPPIC)) {
          errors.noHPPIC = t(
            "LocationFormStore.messageErrorRecipientPhoneInvalid",
            {},
            "No. HP penerima tidak valid"
          );
        } else if (
          formValues.noHPPIC
            .split("")
            ?.every((char) => char === formValues.noHPPIC[0])
        ) {
          errors.noHPPIC = t(
            "LocationFormStore.messageErrorRecipientPhoneWrongFormat",
            {},
            "Format No. HP Penerima salah"
          );
        } else if (
          // Deteksi pola berurutan (1234567890, 0987654321)
          /0123456789|1234567890|0987654321|9876543210/.test(
            formValues.noHPPIC
          ) ||
          // Deteksi pola berulang berlebihan (1111111111, 2222222222, dll)
          /^(\d)\1{7,}$/.test(formValues.noHPPIC) ||
          // Deteksi pola berulang 2 digit (1212121212, 1231231231)
          /^(\d{2})\1{3,}$/.test(formValues.noHPPIC) ||
          // Deteksi pola berulang 3 digit (1231231231)
          /^(\d{3})\1{2,}$/.test(formValues.noHPPIC) ||
          // Deteksi pola berulang 4 digit (1234123412)
          /^(\d{4})\1{1,}$/.test(formValues.noHPPIC) ||
          // Deteksi digit yang sama berurutan lebih dari 4 kali
          /(\d)\1{4,}/.test(formValues.noHPPIC)
        ) {
          errors.noHPPIC = t(
            "LocationFormStore.messageErrorRecipientPhoneWrongFormat",
            {},
            "Format No. HP Penerima salah"
          );
        } else if (
          !formValues.noHPPIC.startsWith("0") &&
          !formValues.noHPPIC.startsWith("62")
        ) {
          errors.noHPPIC = t(
            "LocationFormStore.messageErrorRecipientPhoneWrongFormat",
            {},
            "Format No. HP Penerima salah"
          );
        }

        if (!formValues.dataLokasi?.location?.name) {
          errors.dataLokasi = t(
            "LocationFormStore.messageErrorDestinationAddressRequired",
            {},
            "Alamat Tujuan wajib diisi"
          );
        }

        if (!formValues.detailLokasi) {
          errors.detailLokasi = t(
            "LocationFormStore.messageErrorDestinationDetailRequired",
            {},
            "Detail alamat tujuan wajib diisi"
          );
        } else if (formValues.detailLokasi.length < 3) {
          errors.detailLokasi = t(
            "LocationFormStore.messageErrorDestinationDetailMinLength",
            {},
            "Detail Alamat Tujuan minimal 3 karakter"
          );
        }

        // Kecamatan wajib diisi
        if (!formValues.dataLokasi?.district?.value) {
          errors.district = t(
            "LocationFormStore.messageErrorDistrictRequired",
            {},
            "Kecamatan wajib diisi"
          );
        }

        // Kode Pos wajib diisi
        if (!formValues.dataLokasi?.postalCode?.value) {
          errors.postalCode = t(
            "LocationFormStore.messageErrorPostalCodeRequired",
            {},
            "Kode Pos wajib diisi"
          );
        }

        return Object.values(errors).every((error) => error === undefined);
      },
    }),
    {
      name: "location-form-store",
    }
  )
);

const validateNamaLokasi = (namaLokasi, t) => {
  if (!namaLokasi)
    return t(
      "LocationFormStore.messageErrorLocationNameRequired",
      {},
      "Nama Lokasi wajib diisi"
    );
  if (namaLokasi.length < 3)
    return t(
      "LocationFormStore.messageErrorLocationNameMinLength",
      {},
      "Nama Lokasi minimal 3 karakter"
    );
};

const validateDataLokasi = (dataLokasi, t) => {
  if (!dataLokasi?.location?.name)
    return t(
      "LocationFormStore.messageErrorLocationRequired",
      {},
      "Lokasi wajib diisi"
    );
};

const validateDetailLokasi = (detailLokasi, t) => {
  if (!detailLokasi)
    return t(
      "LocationFormStore.messageErrorLocationDetailRequired",
      {},
      "Detail Lokasi wajib diisi"
    );
  if (detailLokasi.length < 3)
    return t(
      "LocationFormStore.messageErrorLocationDetailMinLength",
      {},
      "Detail Lokasi minimal 3 karakter"
    );
};

const validateNamaPIC = (namaPIC, formMode = "muat", isMobile = false, t) => {
  if (isMobile) {
    if (!namaPIC)
      return t(
        "LocationFormStore.messageErrorPicNameRequired",
        { formMode: formMode === "muat" ? "muat" : "bongkar" },
        `Nama PIC lokasi ${formMode === "muat" ? "muat" : "bongkar"} wajib diisi`
      );
    if (namaPIC.length < 3)
      return t(
        "LocationFormStore.messageErrorPicNameMinLength",
        { formMode: formMode === "muat" ? "muat" : "bongkar" },
        `Nama PIC lokasi ${formMode === "muat" ? "muat" : "bongkar"} minimal 3 karakter`
      );
    // validate it name only alphabet and "'"
    if (!/^[a-zA-Z' ]+$/.test(namaPIC))
      return t(
        "LocationFormStore.messageErrorPicNameInvalid",
        { formMode: formMode === "muat" ? "muat" : "bongkar" },
        `Penulisan Nama PIC lokasi ${formMode === "muat" ? "muat" : "bongkar"} tidak valid`
      );
  } else {
    if (!namaPIC)
      return t(
        "LocationFormStore.messageErrorPicNameRequired",
        {},
        "Nama PIC wajib diisi"
      );
    if (namaPIC.length < 3)
      return t(
        "LocationFormStore.messageErrorPicNameMinLength",
        {},
        "Nama PIC minimal 3 karakter"
      );
    // validate it name only alphabet and "'"
    if (!/^[a-zA-Z' ]+$/.test(namaPIC))
      return t(
        "LocationFormStore.messageErrorPicNameInvalid",
        {},
        "Penulisan Nama PIC tidak valid"
      );
  }
};

const validateNoHPPIC = (noHPPIC, formMode = "muat", isMobile = false, t) => {
  const wrongFormat =
    noHPPIC.split("")?.every((char) => char === noHPPIC[0]) ||
    (!noHPPIC.startsWith("0") && !noHPPIC.startsWith("62"));

  if (isMobile) {
    if (!noHPPIC)
      return t(
        "LocationFormStore.messageErrorPicPhoneRequired",
        { formMode: formMode === "muat" ? "muat" : "bongkar" },
        `No. HP PIC lokasi ${formMode === "muat" ? "muat" : "bongkar"} wajib diisi`
      );
    if (!/^[0-9]+$/.test(noHPPIC))
      return t(
        "LocationFormStore.messageErrorPicPhoneInvalid",
        { formMode: formMode === "muat" ? "muat" : "bongkar" },
        `No. HP PIC lokasi ${formMode === "muat" ? "muat" : "bongkar"} tidak valid`
      );
    if (noHPPIC.length < 8)
      return t(
        "LocationFormStore.messageErrorPicPhoneMinLength",
        { formMode: formMode === "muat" ? "muat" : "bongkar" },
        `No. HP PIC lokasi ${formMode === "muat" ? "muat" : "bongkar"} minimal 8 digit`
      );
    if (wrongFormat)
      return t(
        "LocationFormStore.messageErrorPicPhoneWrongFormat",
        { formMode: formMode === "muat" ? "muat" : "bongkar" },
        `Format No. HP PIC lokasi ${formMode === "muat" ? "muat" : "bongkar"} salah`
      );
  } else {
    if (!noHPPIC)
      return t(
        "LocationFormStore.messageErrorPicPhoneRequired",
        {},
        "No. HP PIC wajib diisi"
      );
    if (!/^[0-9]+$/.test(noHPPIC))
      return t(
        "LocationFormStore.messageErrorPicPhoneInvalid",
        {},
        "No. HP PIC tidak valid"
      );
    if (noHPPIC.length < 8)
      return t(
        "LocationFormStore.messageErrorPicPhoneMinLength",
        {},
        "No. HP PIC minimal 8 digit"
      );
    if (wrongFormat)
      return t(
        "LocationFormStore.messageErrorPicPhoneWrongFormat",
        {},
        "Format No. HP PIC salah"
      );
  }
};
