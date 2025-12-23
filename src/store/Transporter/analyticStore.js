import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAnalyticsStore = create(
  persist(
    (set) => ({
      // 'period' now stores the unique identifier from the option's 'name' property
      period: "Bulan Ini (Default)",
      // A new 'label' state to store the user-facing display text from the option's 'value'
      label: "Dalam Bulan Ini",
      startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
        .toISOString()
        .split("T")[0], // First day of current month
      endDate: new Date().toISOString().split("T")[0], // Today

      /**
       * Sets the selected period option in the store.
       * @param {object} option - The selected option object.
       * @param {string} option.name - The unique identifier for the period (e.g., 'Bulan Ini (Default)').
       * @param {string} option.value - The display label (e.g., 'Dalam Bulan Ini').
       * @param {string} option.startDate - The start date in 'YYYY-MM-DD' format.
       * @param {string} option.endDate - The end date in 'YYYY-MM-DD' format.
       */
      setPeriodOption: (option) => {
        // Known default values from generateDynamicPeriodOptions
        const defaultValues = [
          "Dalam Bulan Ini",
          "Dalam Hari Ini",
          "Dalam 1 Minggu Terakhir",
          "Dalam 30 Hari Terakhir",
          "Dalam 1 Tahun Terakhir",
        ];

        let label;
        if (defaultValues.includes(option.value)) {
          label = `Dalam ${option.value.replace(/^Dalam /, "")}`;
        } else if (option.startDate && option.endDate) {
          // Format dates to '1 Jan 2024' style
          const formatHumanDate = (dateStr) => {
            const date = new Date(dateStr);
            return date.toLocaleDateString("id-ID", {
              day: "numeric",
              month: "short",
              year: "numeric",
            });
          };
          label = `Dalam Periode ${formatHumanDate(option.startDate)} – ${formatHumanDate(option.endDate)}`;
        } else {
          label = `Dalam Periode ${option.value}`;
        }

        set({
          period: option.name,
          label,
          startDate: option.startDate,
          endDate: option.endDate,
        });
      },
    }),
    {
      name: "analytics-storage",
      // Ensure all relevant state properties are persisted
      partialize: (state) => ({
        period: state.period,
        label: state.label,
        startDate: state.startDate,
        endDate: state.endDate,
      }),
    }
  )
);
