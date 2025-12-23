// store/MasterVoucher/addVoucherStore.js
import { create } from "zustand";

import { zustandDevtools } from "@/lib/utils";

const defaultValues = {
  tanggalPembuatan: "", // readonly
  kodeVoucher: "",
  syaratDanKetentuan: "",
  caraPemakaian: "",
  jenisPotongan: "Rp x", // "Rp x" or "x %"
  nominal: "",
  maksimalPotonganRp: "", // "" means "Tidak Ada"
  minimalTransaksiRp: "", // "" means "Tidak Ada"
  periodeAwal: "",
  periodeAkhir: "",
  userWhatsApp: [], // array of user numbers
  kuotaVoucher: "",
  kuotaPerUser: "",
  metodeInstansiTujuanPembayaran: [], // array of payment methods
  status: "Aktif", // "Aktif" or "Tidak Aktif"
  // Route Promo
  lokasiMuat: [],
  lokasiBongkar: [],
  berlakuRuteSebaliknya: false,
};

export const useAddVoucherStore = create(
  zustandDevtools(
    (set, get) => ({
      formValues: defaultValues,
      formErrors: {},
      actions: {
        setField: (field, value) =>
          set((state) => ({
            formValues: { ...state.formValues, [field]: value },
            formErrors: { ...state.formErrors, [field]: undefined },
          })),

        // NEW ACTION: to populate form for edit/detail page
        setFormValues: (data) =>
          set({
            formValues: { ...defaultValues, ...data },
            formErrors: {}, // Clear errors when setting new values
          }),

        setError: (field, error) =>
          set((state) => ({
            formErrors: { ...state.formErrors, [field]: error },
          })),

        // ... (actions lainnya seperti addLokasiMuat, removeLokasiMuat, etc. tetap sama) ...
        addLokasiMuat: (lokasi) =>
          set((state) => ({
            formValues: {
              ...state.formValues,
              lokasiMuat: Array.isArray(lokasi)
                ? lokasi
                : [...state.formValues.lokasiMuat, lokasi],
            },
          })),

        removeLokasiMuat: (index) =>
          set((state) => ({
            formValues: {
              ...state.formValues,
              lokasiMuat: state.formValues.lokasiMuat.filter(
                (_, i) => i !== index
              ),
            },
          })),

        addLokasiBongkar: (lokasi) =>
          set((state) => ({
            formValues: {
              ...state.formValues,
              lokasiBongkar: Array.isArray(lokasi)
                ? lokasi
                : [...state.formValues.lokasiBongkar, lokasi],
            },
          })),

        removeLokasiBongkar: (index) =>
          set((state) => ({
            formValues: {
              ...state.formValues,
              lokasiBongkar: state.formValues.lokasiBongkar.filter(
                (_, i) => i !== index
              ),
            },
          })),

        addUserWhatsApp: (user) =>
          set((state) => ({
            formValues: {
              ...state.formValues,
              userWhatsApp: [...state.formValues.userWhatsApp, user],
            },
          })),

        removeUserWhatsApp: (index) =>
          set((state) => ({
            formValues: {
              ...state.formValues,
              userWhatsApp: state.formValues.userWhatsApp.filter(
                (_, i) => i !== index
              ),
            },
          })),

        addMetodePembayaran: (metode) =>
          set((state) => ({
            formValues: {
              ...state.formValues,
              metodeInstansiTujuanPembayaran: [
                ...state.formValues.metodeInstansiTujuanPembayaran,
                metode,
              ],
            },
          })),

        removeMetodePembayaran: (index) =>
          set((state) => ({
            formValues: {
              ...state.formValues,
              metodeInstansiTujuanPembayaran:
                state.formValues.metodeInstansiTujuanPembayaran.filter(
                  (_, i) => i !== index
                ),
            },
          })),

        validateForm: (mode = 'add') => {
          const { formValues } = get();
          const errors = {};

          // Required field validations
          if (!formValues.kodeVoucher) {
            errors.kodeVoucher = "Kode voucher wajib diisi";
          }
          if (!formValues.syaratDanKetentuan) {
            errors.syaratDanKetentuan = "Syarat dan ketentuan wajib diisi";
          }
          if (!formValues.caraPemakaian) {
            errors.caraPemakaian = "Cara pemakaian wajib diisi";
          }
          if (!formValues.nominal) {
            errors.nominal = "Nominal wajib diisi";
          } else if (
            formValues.jenisPotongan === "x %" &&
            Number(formValues.nominal) > 100
          ) {
            errors.nominal = "Nominal tidak boleh melebihi 100";
          }

          // FIX: Correct validation logic
          if (
            formValues.jenisPotongan === "x %" &&
            formValues.maksimalPotonganRp !== "" &&
            !parseInt(formValues.maksimalPotonganRp) > 0
          ) {
            errors.maksimalPotonganRp = "Maksimal potongan wajib diisi";
          }

          // FIX: Correct validation logic
          if (
            formValues.minimalTransaksiRp !== "" &&
            !parseInt(formValues.minimalTransaksiRp) > 0
          ) {
            errors.minimalTransaksiRp = "Minimal transaksi wajib diisi";
          }

          if (!formValues.periodeAwal) {
            errors.periodeAwal = "Periode awal wajib diisi";
          } else if (mode !== 'edit') {
            // Check if periodeAwal is before current date (only for add mode)
            const startDate = new Date(formValues.periodeAwal);
            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0); // Set to start of day for comparison
            if (startDate < currentDate) {
              errors.periodeAwal = "Periode Awal tidak boleh lebih kecil daripada tanggal sekarang";
            }
          }
          if (!formValues.periodeAkhir) {
            errors.periodeAkhir = "Periode akhir wajib diisi";
          }
          if (formValues.periodeAwal && formValues.periodeAkhir) {
            const startDate = new Date(formValues.periodeAwal);
            const endDate = new Date(formValues.periodeAkhir);
            if (endDate < startDate) {
              errors.periodeAkhir =
                "Periode Akhir tidak boleh lebih kecil daripada Periode Awal";
            }
          }
          if (formValues.userWhatsApp.length === 0) {
            errors.userWhatsApp = "User WhatsApp wajib diisi";
          }
          if (!formValues.kuotaVoucher) {
            errors.kuotaVoucher = "Kuota voucher wajib diisi";
          }
          if (!formValues.kuotaPerUser) {
            errors.kuotaPerUser = "Kuota per user wajib diisi";
          } else if (
            parseInt(formValues.kuotaPerUser) >
            parseInt(formValues.kuotaVoucher)
          ) {
            errors.kuotaPerUser =
              "Kuota per user tidak boleh lebih besar dari kuota voucher";
          }
          if (formValues.metodeInstansiTujuanPembayaran.length === 0) {
            errors.metodeInstansiTujuanPembayaran =
              "Metode & instansi tujuan pembayaran wajib diisi";
          }
          if (!formValues.lokasiMuat || formValues.lokasiMuat.length === 0) {
            errors.lokasiMuat = "Lokasi muat wajib diisi";
          }
          if (
            !formValues.lokasiBongkar ||
            formValues.lokasiBongkar.length === 0
          ) {
            errors.lokasiBongkar = "Lokasi bongkar wajib diisi";
          }

          set({ formErrors: errors });
          return Object.keys(errors).length === 0;
        },

        reset: () =>
          set({
            formValues: {
              ...defaultValues,
              tanggalPembuatan: new Date()
                .toLocaleString("id-ID", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })
                .replace(",", ""),
            },
            formErrors: {},
          }),
      },
    }),
    {
      name: "add-voucher-store",
    }
  )
);

// Helper hooks (tetap sama)
export const useAddVoucherActions = () => {
  const actions = useAddVoucherStore((state) => state.actions);
  return actions;
};

export const useAddVoucherFormValues = () => {
  const formValues = useAddVoucherStore((state) => state.formValues);
  return formValues;
};

export const useAddVoucherFormErrors = () => {
  const formErrors = useAddVoucherStore((state) => state.formErrors);
  return formErrors;
};
