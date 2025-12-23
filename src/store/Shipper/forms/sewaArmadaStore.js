// store/SewaArmada.js
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { zustandDevtools } from "@/lib/utils";

export const defaultValues = {
  loadTimeStart: null,
  loadTimeEnd: null,
  showRangeOption: false,
  lokasiMuat: [null],
  lokasiBongkar: [null],
  cargoTypeId: null,
  cargoCategoryId: null,
  isHalalLogistics: false,
  informasiMuatan: [],
  cargoPhotos: [null, null, null, null],
  cargoDescription: "",
  carrierId: null,
  truckTypeId: null,
  tempTrucks: null,
  minTruckCount: 1,
  truckCount: 1,
  distance: 0,
  distanceUnit: "",
  estimatedTime: 0,

  useAsuransi: true,
  // Sementara, nanti diganti additionalServices
  kirimBuktiFisik: false,
  bantuanTambahan: false,
  additionalServices: [],
  tempShippingOptions: [],
  deliveryOrderNumbers: [],
  businessEntity: {
    isBusinessEntity: false,
    name: "",
    taxId: "",
  },
  voucherId: null,
  paymentMethodId: null,
  // To detect whether the user has updated the order or not
  hasUpdatedForm: false,
};

export const useSewaArmadaStore = create(
  zustandDevtools(
    persist(
      (set, get) => ({
        formId: "",
        orderType: "",
        formValues: defaultValues,
        formErrors: {},
        isUpdateOrderSuccess: false,
        originalOrderData: null, // Menyimpan data original order untuk perbandingan

        actions: {
          setFormId: (formId) => set({ formId }),
          setOrderType: (orderType) => set({ orderType }),
          setUpdateOrderSuccess: (isUpdateOrderSuccess) =>
            set({ isUpdateOrderSuccess }),
          setOriginalOrderData: (originalOrderData) =>
            set({ originalOrderData }),
          setField: (field, value) =>
            set((state) => ({
              formValues: { ...state.formValues, [field]: value },
              formErrors: { ...state.formErrors, [field]: undefined },
            })),
          setError: (field, error) =>
            set((state) => ({
              formErrors: { ...state.formErrors, [field]: error },
            })),
          setCargoPhotos: (index, value) =>
            set((state) => {
              let updated = [...state.formValues.cargoPhotos];
              if (value === null) {
                updated[index] = null;
                updated = updated
                  .filter((item) => item !== null)
                  .concat(
                    new Array(state.formValues.cargoPhotos.length).fill(null)
                  )
                  .slice(0, state.formValues.cargoPhotos.length);
              } else {
                const emptyIndex = updated.findIndex(
                  (item, i) => item === null && i < index
                );
                if (emptyIndex !== -1) {
                  updated[emptyIndex] = value;
                } else {
                  updated[index] = value;
                }
              }
              return {
                formValues: { ...state.formValues, cargoPhotos: updated },
              };
            }),
          addLokasi: (field, value) =>
            set((state) => ({
              formValues: {
                ...state.formValues,
                [field]: [...state.formValues[field], value],
              },
            })),
          updateLokasi: (field, index, newValue) => {
            set((state) => ({
              formValues: {
                ...state.formValues,
                [field]: state.formValues[field].map((item, i) =>
                  i === index ? newValue : item
                ),
              },
            }));
          },
          removeLokasi: (field, index) =>
            set((state) => ({
              formValues: {
                ...state.formValues,
                ...(state.formValues[field].length === 1
                  ? { [field]: [null] }
                  : {
                      [field]: state.formValues[field].filter(
                        (_, i) => i !== index
                      ),
                    }),
              },
            })),
          reset: () =>
            set({
              formValues: defaultValues,
              formErrors: {},
              formId: "",
              orderType: "",
              originalOrderData: null,
            }),
          // VALIDASI BUAT YG DESKTOP KARENA JADI SATU HALAMAN
          validateForm: (settingsTime, t) => {
            const {
              loadTimeStart,
              loadTimeEnd,
              showRangeOption,
              cargoTypeId,
              cargoCategoryId,
              cargoPhotos,
              cargoDescription,
              lokasiMuat,
              lokasiBongkar,
            } = get().formValues;

            const newErrors = {};
            const isValidcargoPhotos = cargoPhotos.some(
              (item) => item !== null
            );
            if (!loadTimeStart) {
              newErrors.loadTimeStart = t(
                "SewaArmadaStore.messageErrorLoadTimeRequired",
                {},
                "Tanggal & waktu muat wajib diisi"
              );
            }
            if (loadTimeStart && showRangeOption) {
              const start = new Date(loadTimeStart);
              const end = new Date(loadTimeEnd);
              const diffMs = end - start;
              const diffHours = diffMs / (1000 * 60 * 60);
              const eightHoursMs =
                settingsTime.loadingTime.maxRangeHours * 60 * 60 * 1000;
              if (!loadTimeEnd) {
                newErrors.loadTimeEnd = t(
                  "SewaArmadaStore.messageErrorLoadTimeRequired",
                  {},
                  "Tanggal & waktu muat wajib diisi"
                );
              } else if (diffHours < settingsTime.loadingTime.minRangeHours) {
                newErrors.loadTimeEnd = t(
                  "SewaArmadaStore.messageErrorMinTimeRange",
                  { minHours: settingsTime.loadingTime.minRangeHours },
                  `Rentang waktu minimal ${settingsTime.loadingTime.minRangeHours} jam`
                );
              } else if (diffMs > eightHoursMs) {
                newErrors.loadTimeEnd = t(
                  "SewaArmadaStore.messageErrorMaxTimeRange",
                  { maxHours: settingsTime.loadingTime.maxRangeHours },
                  `Rentang waktu maksimal ${settingsTime.loadingTime.maxRangeHours} jam`
                );
              }
            }
            if (!cargoTypeId) {
              newErrors.cargoTypeId = t(
                "SewaArmadaStore.messageErrorCargoTypeRequired",
                {},
                "Tipe muatan harus diisi"
              );
            }
            if (!cargoCategoryId) {
              newErrors.cargoCategoryId = t(
                "SewaArmadaStore.messageErrorCargoCategoryRequired",
                {},
                "Jenis muatan harus diisi"
              );
            }
            if (!isValidcargoPhotos) {
              newErrors.cargoPhotos = t(
                "SewaArmadaStore.messageErrorCargoPhotosRequired",
                {},
                "Muatan harus memiliki minimal 1 foto"
              );
            }
            if (!cargoDescription) {
              newErrors.cargoDescription = t(
                "SewaArmadaStore.messageErrorCargoDescriptionRequired",
                {},
                "Deskripsi muatan wajib diisi"
              );
            } else if (cargoDescription.length < 3) {
              newErrors.cargoDescription = t(
                "SewaArmadaStore.messageErrorCargoDescriptionMinLength",
                {},
                "Deskripsi Muatan minimal 3 karakter"
              );
            }

            if (!lokasiMuat.some((item) => Boolean(item))) {
              newErrors.lokasiMuat = t(
                "SewaArmadaStore.messageErrorLokasiMuatRequired",
                {},
                "Lokasi Muat wajib diisi"
              );
            }

            if (!lokasiBongkar.some((item) => Boolean(item))) {
              newErrors.lokasiBongkar = t(
                "SewaArmadaStore.messageErrorLokasiBongkarRequired",
                {},
                "Lokasi Bongkar wajib diisi"
              );
            }

            set({ formErrors: newErrors });
            return Object.keys(newErrors).length === 0;
          },
          // VALIDASI BUAT YG RESPONSIVE KARENA FORM UTAMANYA ADA 2 HALAMAN
          validateSecondForm: (t) => {
            const {
              cargoDescription,
              cargoPhotos,
              businessEntity,
              paymentMethodId,
            } = get().formValues;
            const newErrors = {};

            // Validate uploaded images (at least one required)
            const hasUploadedImage = cargoPhotos.some(
              (image) => image !== null
            );
            if (!hasUploadedImage) {
              newErrors.cargoPhotos = t(
                "SewaArmadaStore.messageErrorOrderPhotosRequired",
                {},
                "Pesanan harus memiliki minimal 1 foto"
              );
            }

            // Validate description
            if (!cargoDescription.trim()) {
              newErrors.cargoDescription = t(
                "SewaArmadaStore.messageErrorCargoDescriptionRequired",
                {},
                "Deskripsi muatan wajib diisi"
              );
            } else if (cargoDescription.trim().length < 3) {
              newErrors.cargoDescription = t(
                "SewaArmadaStore.messageErrorCargoDescriptionMinLength",
                {},
                "Deskripsi muatan minimal 3 karakter"
              );
            }

            if (businessEntity.isBusinessEntity) {
              const businessEntityErrors = {};

              if (!businessEntity.name.trim()) {
                businessEntityErrors.name = t(
                  "SewaArmadaStore.messageErrorBusinessNameRequired",
                  {},
                  "Nama badan usaha/perusahaan wajib diisi"
                );
              } else if (businessEntity.name.trim().length < 3) {
                businessEntityErrors.name = t(
                  "SewaArmadaStore.messageErrorBusinessNameMinLength",
                  {},
                  "Nama badan usaha/perusahaan minimal 3 karakter"
                );
              } else if (/[^a-zA-Z\s]/.test(businessEntity.name)) {
                businessEntityErrors.name = t(
                  "SewaArmadaStore.messageErrorBusinessNameInvalid",
                  {},
                  "Nama badan usaha/perusahaan tidak valid"
                );
              }

              if (!businessEntity.taxId.trim()) {
                businessEntityErrors.taxId = t(
                  "SewaArmadaStore.messageErrorTaxIdRequired",
                  {},
                  "Nomor NPWP wajib diisi"
                );
              } else if (businessEntity.taxId.trim().length < 15) {
                businessEntityErrors.taxId = t(
                  "SewaArmadaStore.messageErrorTaxIdMinLength",
                  {},
                  "Nomor NPWP minimal 15 digit"
                );
              } else if (businessEntity.taxId.trim().length > 16) {
                businessEntityErrors.taxId = t(
                  "SewaArmadaStore.messageErrorTaxIdMaxLength",
                  {},
                  "Nomor NPWP maksimal 16 digit"
                );
              }

              // Only add businessEntity to newErrors if there are actual errors
              if (Object.keys(businessEntityErrors).length > 0) {
                newErrors.businessEntity = businessEntityErrors;
              }
            }

            if (!paymentMethodId) {
              newErrors.paymentMethodId = t(
                "SewaArmadaStore.messageErrorPaymentMethodRequired",
                {},
                "Metode pembayaran wajib diisi"
              );
            }

            set({ formErrors: newErrors });
            return Object.keys(newErrors).length === 0;
          },
        },
      }),
      {
        name: "t-sewa-armada",
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
          formId: state.formId,
          orderType: state.orderType,
          formValues: state.formValues,
          formErrors: state.formErrors,
          originalOrderData: state.originalOrderData,
        }),
      }
    ),
    {
      name: "sewa-armada-store",
    }
  )
);

export const useSewaArmadaActions = () => {
  const {
    setFormId,
    setOrderType,
    setUpdateOrderSuccess,
    setOriginalOrderData,
    setField,
    setError,
    setCargoPhotos,
    addLokasi,
    updateLokasi,
    removeLokasi,
    reset,
    validateForm,
    validateSecondForm,
  } = useSewaArmadaStore((state) => state.actions);

  return {
    setFormId,
    setOrderType,
    setUpdateOrderSuccess,
    setOriginalOrderData,
    setField,
    setError,
    setCargoPhotos,
    addLokasi,
    updateLokasi,
    removeLokasi,
    reset,
    validateForm,
    validateSecondForm,
  };
};
