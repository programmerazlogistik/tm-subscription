import { create } from "zustand";
import { persist } from "zustand/middleware";

// Import the dynamic period options to get default values
import { generateDynamicPeriodOptions } from "@/lib/utils/generateDynamicPeriodOptions";

// Get the default option (first one - "Bulan Ini (Default)")
const getDefaultPeriodOption = () => {
  const options = generateDynamicPeriodOptions();
  return options[0]; // "Bulan Ini (Default)"
};

export const useDateAnalyticsStore = create(
  persist(
    (set) => {
      const defaultOption = getDefaultPeriodOption();

      return {
        // Use dynamic defaults from generateDynamicPeriodOptions
        period: defaultOption.name, // "Bulan Ini (Default)"
        label: defaultOption.name, // Display label
        startDate: defaultOption.startDate, // First day of current month
        endDate: defaultOption.endDate, // Today

        /**
         * Sets the selected period option in the store.
         * @param {object} option - The selected option object.
         * @param {string} option.name - The display label (e.g., 'Hari Ini (Default)', '2025-08-01 s/d 2025-08-31').
         * @param {string} option.value - The unique identifier (e.g., 'hari_ini', UUID for history).
         * @param {string} option.startDate - The start date in 'YYYY-MM-DD' format.
         * @param {string} option.endDate - The end date in 'YYYY-MM-DD' format.
         */
        setPeriodOption: (option) => {
          console.log("🏪 CS DateAnalyticsStore - Setting period option:", {
            option,
            previousState: {
              period: useDateAnalyticsStore.getState().period,
              startDate: useDateAnalyticsStore.getState().startDate,
              endDate: useDateAnalyticsStore.getState().endDate,
            },
            timestamp: new Date().toISOString(),
          });

          set({
            period: option.name, // Store the display name as the key for CS
            label: option.name, // Store the display label
            startDate: option.startDate,
            endDate: option.endDate,
          });

          console.log(
            "✅ CS DateAnalyticsStore - Period option set successfully:",
            {
              newState: {
                period: option.name,
                label: option.name,
                startDate: option.startDate,
                endDate: option.endDate,
              },
              timestamp: new Date().toISOString(),
            }
          );
        },

        /**
         * Backward compatibility method to set period by value only.
         * @param {string} periodValue - The period value to set.
         */
        setPeriod: (periodValue) => {
          console.log(
            "🔄 CS DateAnalyticsStore - Setting period (legacy method):",
            {
              periodValue,
              timestamp: new Date().toISOString(),
            }
          );

          set((state) => ({
            ...state,
            period: periodValue,
          }));
        },
      };
    },
    {
      name: "date-analytics-storage",
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
