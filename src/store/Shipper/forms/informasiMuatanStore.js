import { create } from "zustand";

import { toast } from "@/lib/toast";
import { zustandDevtools } from "@/lib/utils";

const defaultInformasiMuatan = {
  namaMuatan: {
    label: "",
    value: null,
  },
  beratMuatan: {
    berat: "",
    unit: "kg",
  },
  dimensiMuatan: {
    panjang: "",
    lebar: "",
    tinggi: "",
    unit: "m",
  },
};

const defaultFormValues = {
  cargoTypeId: null,
  cargoCategoryId: null,
  isHalalLogistics: false,
  informasiMuatan: [defaultInformasiMuatan],
};

export const useInformasiMuatanStore = create(
  zustandDevtools(
    (set, get) => ({
      formValues: defaultFormValues,
      formErrors: {},
      setField: (field, value) =>
        set((state) => ({
          formValues: { ...state.formValues, [field]: value },
          formErrors: { ...state.formErrors, [field]: undefined },
        })),
      setError: (field, error) =>
        set((state) => ({
          formErrors: { ...state.formErrors, [field]: error },
        })),
      addInformasiMuatan: () =>
        set((state) => ({
          formValues: {
            ...state.formValues,
            informasiMuatan: [
              ...state.formValues.informasiMuatan,
              defaultInformasiMuatan,
            ],
          },
        })),
      removeInformasiMuatan: (index) =>
        set((state) => {
          const newInformasiMuatan = [...state.formValues.informasiMuatan];
          newInformasiMuatan.splice(index, 1);
          return {
            formValues: {
              ...state.formValues,
              informasiMuatan: newInformasiMuatan,
            },
          };
        }),
      updateInformasiMuatan: (index, field, value) =>
        set((state) => {
          const newInformasiMuatan = [...state.formValues.informasiMuatan];
          newInformasiMuatan[index] = {
            ...newInformasiMuatan[index],
            [field]: value,
          };
          return {
            formValues: {
              ...state.formValues,
              informasiMuatan: newInformasiMuatan,
            },
          };
        }),
      updateBeratMuatan: (index, field, value) =>
        set((state) => {
          const newInformasiMuatan = [...state.formValues.informasiMuatan];
          newInformasiMuatan[index] = {
            ...newInformasiMuatan[index],
            beratMuatan: {
              ...newInformasiMuatan[index].beratMuatan,
              [field]: value,
            },
          };
          return {
            formValues: {
              ...state.formValues,
              informasiMuatan: newInformasiMuatan,
            },
          };
        }),
      updateDimensiMuatan: (index, field, value) =>
        set((state) => {
          const newInformasiMuatan = [...state.formValues.informasiMuatan];
          newInformasiMuatan[index] = {
            ...newInformasiMuatan[index],
            dimensiMuatan: {
              ...newInformasiMuatan[index].dimensiMuatan,
              [field]: value,
            },
          };
          return {
            formValues: {
              ...state.formValues,
              informasiMuatan: newInformasiMuatan,
            },
          };
        }),
      reset: (defaultValues) =>
        set({
          formValues: defaultValues || defaultFormValues,
          formErrors: {},
        }),
      validateForm: (t) => {
        const { cargoTypeId, cargoCategoryId, informasiMuatan } =
          get().formValues;
        const newErrors = {};

        if (!cargoTypeId) {
          // 25. 18 - Web - LB - 0312
          newErrors.cargoTypeId = t("InformasiMuatanScreen.cargoTypeRequired");
        }
        if (!cargoCategoryId) {
          // 25. 18 - Web - LB - 0313
          newErrors.cargoCategoryId = t(
            "InformasiMuatanScreen.cargoCategoryRequired"
          );
        }

        if (!cargoCategoryId && !cargoTypeId) {
          toast.error(t("InformasiMuatanScreen.emptyFieldValidation"));
        }

        if (cargoTypeId && cargoCategoryId) {
          // 25. 18 - Web - LB - 0315
          let showToastError = false;

          informasiMuatan.forEach((muatan, index) => {
            if (!muatan.namaMuatan.value) {
              newErrors[`informasiMuatan.${index}.namaMuatan`] = t(
                "InformasiMuatanScreen.cargoNameRequired"
              );
            }
            if (!muatan.beratMuatan.berat) {
              newErrors[`informasiMuatan.${index}.beratMuatan.berat`] =
                // 25. 18 - Web - LB - 0169
                t("InformasiMuatanScreen.cargoWeightRequired");
            }
            // 25. 18 - Web - LB - 0315
            if (!muatan.namaMuatan.value && !muatan.beratMuatan.berat) {
              showToastError = true;
            }
          });
          // 25. 18 - Web - LB - 0315
          if (showToastError) {
            toast.error(t("InformasiMuatanScreen.emptyFieldValidation"));
          }
        }

        set({ formErrors: newErrors });
        return Object.keys(newErrors).length === 0;
      },
    }),
    {
      name: "informasi-muatan-store",
    }
  )
);
