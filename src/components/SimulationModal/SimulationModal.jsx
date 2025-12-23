"use client";

import { useEffect, useState } from "react";

import PropTypes from "prop-types";

import { useGetRouteList } from "@/services/masterpricing/masterrute/getRouteList";
import { useGetCarrierTypeCalculation } from "@/services/masterpricing/setting-formula-pricing/getCarrierTypeCalculation";
import { useGetTruckTypeCalculation } from "@/services/masterpricing/setting-formula-pricing/getTruckTypeCalculation";
import { fetcherVariableValuesCalculation } from "@/services/masterpricing/setting-formula-pricing/getVariableValuesCalculation";

import Button from "@/components/Button/Button";
import IconComponent from "@/components/IconComponent/IconComponent";
import { Modal, ModalContent, ModalTitle } from "@/components/Modal/Modal";
import Select from "@/components/Select";

import Input from "../Form/Input";
import { getJarakMinimum } from "./utils";

/**
 * SimulationModal - Modal for inputting simulation data for 4PL formula
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether modal is open
 * @param {function} props.onClose - Function to close modal
 * @param {function} props.onCalculate - Function called when "Hitung Harga" is clicked
 * @param {Array} props.formula - The formula to calculate (with variable IDs)
 * @param {Array} props.variables - Dynamic variables from backend
 */
const SimulationModal = ({
  isOpen,
  onClose,
  onCalculate,
  formula = [],
  variables = [],
  formulaId = " ", // Added formulaId prop
  formulaName = "",
}) => {
  const [formData, setFormData] = useState({
    jarak: "",
    rute: "",
    jenisTruk: "",
    jenisCarrier: "",
    tonase: 2.5,
  });

  const [isCalculating, setIsCalculating] = useState(false);
  const [calculationResults, setCalculationResults] = useState(null);
  const [variableValues, setVariableValues] = useState(null);
  const [variablesByType, setVariablesByType] = useState(null);
  const [basePriceData, setBasePriceData] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  const {
    data: ruteOptions,
    mutate: refetchRouteList,
    isLoading: isLoadingRoutes,
    error: routeError,
  } = useGetRouteList();

  // Hook to get truck types based on selected route and formula
  const {
    data: truckTypeData,
    isLoading: isLoadingTruckTypes,
    error: truckTypeError,
    mutate: refetchTruckTypes,
  } = useGetTruckTypeCalculation(formulaId, formData.rute);

  // Hook to get carrier types based on selected truck type
  const {
    data: carrierTypeData,
    isLoading: isLoadingCarrierTypes,
    error: carrierTypeError,
    mutate: refetchCarrierTypes,
  } = useGetCarrierTypeCalculation(formData.jenisTruk);

  const [routeOptions, setRouteOptions] = useState([]);
  const [truckOptions, setTruckOptions] = useState([]);
  const [carrierOptions, setCarrierOptions] = useState([]);

  useEffect(() => {
    if (ruteOptions?.data) {
      setRouteOptions(
        ruteOptions.data.Data.map((rute) => ({
          id: rute.id,
          alias: rute.alias,
          value: rute.id,
          label: rute.alias,
        }))
      );
      // console.log("routeOptions", ruteOptions);
    }
  }, [ruteOptions]);

  // Update truck options when truck type data changes
  useEffect(() => {
    if (truckTypeData?.Data) {
      setTruckOptions(
        truckTypeData.Data.map((truck) => ({
          value: truck.truckTypeId,
          label: truck.truckTypeName,
        }))
      );
    } else {
      // Fallback to default truck options when no data
      setTruckOptions([
        { value: "pickup", label: "Pickup" },
        { value: "cdd", label: "CDD" },
        { value: "cde", label: "CDE" },
        { value: "truck", label: "Truck" },
        { value: "tronton", label: "Tronton" },
        { value: "trailer", label: "Trailer" },
      ]);
    }
  }, [truckTypeData]);

  // Update carrier options when carrier type data changes
  useEffect(() => {
    if (carrierTypeData?.Data) {
      setCarrierOptions(
        carrierTypeData.Data.map((carrier) => ({
          value: carrier.carrierId,
          label: carrier.carrierName,
          maxWeightTon: carrier.maxWeightTon,
        }))
      );
    } else {
      // Fallback to default carrier options when no data
      setCarrierOptions([
        { value: "bak-terbuka", label: "Bak Terbuka" },
        { value: "engkel", label: "Engkel Box" },
        { value: "cdd-box", label: "CDD Box" },
        { value: "cde-box", label: "CDE Box" },
        { value: "truck-box", label: "Truck Box" },
        { value: "container", label: "Container" },
        { value: "tanki", label: "Tanki" },
      ]);
    }
  }, [carrierTypeData]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
      // Reset jenisTruk when rute changes to force reselection
      ...(field === "rute" && { jenisTruk: "", jenisCarrier: "" }),
      // Reset jenisCarrier when jenisTruk changes to force reselection
      ...(field === "jenisTruk" && { jenisCarrier: "" }),
    }));

    // Clear validation error for this field when user starts typing
    if (validationErrors[field]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  // API call to fetch variable values using the service
  const fetchVariableValues = async (rute, jenisTruk) => {
    try {
      // Build query string for the API call
      const queryParams = new URLSearchParams();
      if (jenisTruk) queryParams.append("truckTypeId", jenisTruk);
      if (formulaId) queryParams.append("formulaId", formulaId);
      if (rute) queryParams.append("routePricingId", rute);

      const queryString = queryParams.toString();
      const url = `v1/bo/pricing/setting/formula-pricing/calculation/variable-values${queryString ? `?${queryString}` : ""}`;

      // Call the API using our service fetcher
      const response = await fetcherVariableValuesCalculation(url, {
        arg: null,
      });

      // Transform the API response to match the expected structure
      const transformedResponse = {
        jarakMinimum: response.Data?.truckType?.minDistance || 100,
        basePrice: response.Data?.basePrice || [],
        truckType: response.Data?.truckType || null,
      };

      return transformedResponse;
    } catch (error) {
      console.error("Error fetching variable values:", error);

      // Return fallback data in case of error
      return {
        jarakMinimum: 100,
        basePrice: [
          {
            typePricingId: "fallback-1",
            typePricingName: "Fallback High",
            variables: {
              enam: { id: "1", value: 6000, isFromShipper: false },
              jarak: { id: "2", value: null, isFromShipper: true },
              PL: { id: "3", value: 1500, isFromShipper: false },
              tonase: { id: "4", value: null, isFromShipper: true },
            },
          },
          {
            typePricingId: "fallback-2",
            typePricingName: "Fallback Low",
            variables: {
              enam: { id: "1", value: 4000, isFromShipper: false },
              jarak: { id: "2", value: null, isFromShipper: true },
              PL: { id: "3", value: 800, isFromShipper: false },
              tonase: { id: "4", value: null, isFromShipper: true },
            },
          },
        ],
        truckType: null,
      };
    }
  };

  // Calculate formula result for each pricing type
  const calculateFormula = (
    basePriceData,
    formula,
    finalJarak,
    finalTonase
  ) => {
    console.log("=== calculateFormula START ===");
    console.log("Formula:", formula);
    console.log("Final Jarak:", finalJarak);
    console.log("Final Tonase:", finalTonase);
    console.log("Base Price Data:", basePriceData);

    if (!formula || formula.length === 0) {
      console.warn("No formula provided, using fallback calculation");
      return { results: getFallbackCalculation({}), variablesByType: {} };
    }

    const results = {};
    const variablesByType = {};

    try {
      // Calculate for each pricing type
      basePriceData.forEach((priceType) => {
        // Create variable values for this pricing type
        const variableValues = {};
        Object.entries(priceType.variables).forEach(([varName, varData]) => {
          if (varData.isFromShipper) {
            // Use form data for shipper variables
            if (varName === "jarak" || varName.toLowerCase() === "jarak") {
              variableValues[varData.id] = finalJarak;
            } else if (
              varName === "tonase" ||
              varName.toLowerCase() === "tonase"
            ) {
              variableValues[varData.id] = finalTonase;
            }
          } else {
            // Use backend value for non-shipper variables
            variableValues[varData.id] = varData.value;
          }
        });
        // console.log("Complete variableValues map:", variableValues);

        // Convert the formula array to a mathematical expression
        const formulaExpression = convertFormulaToExpression(
          formula,
          variableValues
        );

        // Evaluate the formula
        let calculatedResult;
        try {
          calculatedResult = evaluateFormula(formulaExpression);
        } catch (evalError) {
          console.error(
            `Failed to evaluate formula for ${priceType.typePricingName}:`,
            evalError
          );
          throw evalError; // Re-throw to be caught by outer catch
        }

        if (!isNaN(calculatedResult)) {
          // Use the actual pricing type ID and name from API
          const resultKey = priceType.typePricingId;
          results[resultKey] = {
            name: priceType.typePricingName,
            value: calculatedResult,
          };

          // Store the variable values for this pricing type with readable names
          const readableVariables = {};
          Object.entries(priceType.variables).forEach(([varName, varData]) => {
            if (varData.isFromShipper) {
              if (varName === "jarak" || varName.toLowerCase() === "jarak") {
                readableVariables[varName] = finalJarak;
              } else if (
                varName === "tonase" ||
                varName.toLowerCase() === "tonase"
              ) {
                readableVariables[varName] = finalTonase;
              }
            } else {
              readableVariables[varName] = varData.value;
            }
          });
          variablesByType[resultKey] = readableVariables;
        }
      });

      return { results, variablesByType };
    } catch (error) {
      return { results: getFallbackCalculation({}), variablesByType: {} };
    }
  };

  // Convert formula array to mathematical expression string
  const convertFormulaToExpression = (formula, variableValues) => {
    let expression = formula
      .map((item, index) => {
        // Check if the item is a variable ID that exists in our variableValues
        if (Object.prototype.hasOwnProperty.call(variableValues, item)) {
          const value = variableValues[item];
          if (value === null || value === undefined) {
            return 0;
          }

          return value;
        }

        // Map operator symbols to JavaScript operators (for display operators in formula)
        const operatorMap = {
          "×": "*",
          "÷": "/",
          "^": "**", // JavaScript exponentiation operator
        };

        // Return mapped operator or the item as-is (for basic operators and numbers)
        const mapped = operatorMap[item] || item;
        if (mapped !== item) {
          console.log(`Operator ${item} mapped to ${mapped}`);
        }
        console.log(`Item ${index}: "${item}" -> "${mapped}"`);
        return mapped;
      })
      .join(" ");

    console.log("Expression before balancing:", expression);

    // Check for balanced parentheses
    const openCount = (expression.match(/\(/g) || []).length;
    const closeCount = (expression.match(/\)/g) || []).length;
    console.log(`Parentheses check: ${openCount} open, ${closeCount} close`);

    if (openCount !== closeCount) {
      const missing = openCount - closeCount;
      console.warn(
        `UNBALANCED PARENTHESES! Missing ${missing} closing parentheses - auto-fixing`
      );

      // Auto-fix by adding missing closing parentheses at the end
      if (missing > 0) {
        expression = `${expression} ${")".repeat(missing)}`;
        console.log("Fixed expression:", expression);
      } else if (missing < 0) {
        // Too many closing parentheses - this is a more serious error
        console.error(
          "TOO MANY closing parentheses! Formula from backend is malformed"
        );
      }
    }

    console.log("Final expression:", expression);
    console.log("=== End convertFormulaToExpression ===");
    return expression;
  };

  // Safe formula evaluation using Function constructor
  const evaluateFormula = (expression) => {
    // Basic safety check - allow numbers (including decimals), basic operators, parentheses, and exponentiation (**)
    // Pattern breakdown: \d (digits), \. (decimal point), \s (whitespace), +\-*/() (operators and parens)
    const safePattern = /^[\d.\s+\-*/()]+$/;

    if (!safePattern.test(expression)) {
      console.error("Formula validation failed:", expression);
      console.error("Expression contains unsafe or unexpected characters");
      throw new Error("Formula contains unsafe characters");
    }

    try {
      // Use Function constructor for safer evaluation than eval
      const func = new Function(`return ${expression}`);
      const result = func();

      if (!isFinite(result)) {
        console.error(
          "Formula evaluation resulted in non-finite value:",
          result
        );
        throw new Error("Formula evaluation resulted in infinite or NaN value");
      }

      return result;
    } catch (error) {
      console.error("Error evaluating formula:", expression, error);
      throw error;
    }
  };

  // Fallback calculation when formula evaluation fails
  const getFallbackCalculation = (variableValues) => {
    const basePrice = 800000;
    const jarakMultiplier = variableValues.jarak || 0;
    const tonaseMultiplier = variableValues.tonase || 1;
    const calculatedBase =
      basePrice + jarakMultiplier * 1000 + tonaseMultiplier * 50000;

    return {
      "fallback-1": {
        name: "Fallback Low",
        value: Math.round(calculatedBase),
      },
      "fallback-2": {
        name: "Fallback Medium",
        value: Math.round(calculatedBase),
      },
      "fallback-3": {
        name: "Fallback High",
        value: Math.round(calculatedBase * 1.25),
      },
    };
  };

  const handleCalculate = async () => {
    // Reset previous validation errors
    setValidationErrors({});

    // Validate required fields
    const errors = {};

    if (!formData.jarak || formData.jarak.trim() === "") {
      errors.jarak = "Jarak wajib diisi";
    }

    if (!formData.rute) {
      errors.rute = "Rute wajib diisi";
    }

    if (!formData.jenisTruk) {
      errors.jenisTruk = "Jenis Truk wajib diisi";
    }

    if (!formData.jenisCarrier) {
      errors.jenisCarrier = "Jenis Carrier wajib diisi";
    }

    if (!formData.tonase || parseFloat(formData.tonase) <= 0) {
      errors.tonase = "Tonase wajib diisi";
    }

    // Check if routes are still loading
    if (isLoadingRoutes) {
      errors.rute = "Menunggu data rute dimuat...";
    }

    // Check if there was an error loading routes
    if (routeError) {
      errors.rute = "Gagal memuat data rute. Silakan refresh halaman.";
    }

    // Check if truck types are still loading
    if (isLoadingTruckTypes && formData.rute) {
      errors.jenisTruk = "Menunggu data jenis truk dimuat...";
    }

    // Check if there was an error loading truck types
    if (truckTypeError) {
      errors.jenisTruk = "Gagal memuat jenis truk. Silakan refresh halaman.";
    }

    // Check if carrier types are still loading
    if (isLoadingCarrierTypes && formData.jenisTruk) {
      errors.jenisCarrier = "Menunggu data jenis carrier dimuat...";
    }

    // Check if there was an error loading carrier types
    if (carrierTypeError) {
      errors.jenisCarrier =
        "Gagal memuat jenis carrier. Silakan refresh halaman.";
    }

    // If there are validation errors, set them and return
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setIsCalculating(true);

    try {
      // Step 1: Fetch variable values from API
      const apiResponse = await fetchVariableValues(
        formData.rute,
        formData.jenisTruk
      );

      // Step 2: Apply jarak minimum logic
      const finalJarak = getJarakMinimum(
        formData.jarak,
        apiResponse.jarakMinimum
      );

      // Step 3: Get final tonase
      const finalTonase = parseFloat(formData.tonase);

      // Step 4: Calculate using formula with base price data
      const { results, variablesByType } = calculateFormula(
        apiResponse.basePrice,
        formula,
        finalJarak,
        finalTonase
      );

      console.log("results", results);
      console.log("variablesByType", variablesByType);

      // Step 5: Create variable values for display (using first pricing type as reference)
      const displayVariables = {};
      if (apiResponse.basePrice && apiResponse.basePrice.length > 0) {
        const firstPriceType = apiResponse.basePrice[0];
        Object.entries(firstPriceType.variables).forEach(
          ([varName, varData]) => {
            if (varData.isFromShipper) {
              if (varName === "jarak") {
                displayVariables[varName] = finalJarak;
              } else if (varName === "tonase") {
                displayVariables[varName] = finalTonase;
              }
            } else {
              displayVariables[varName] = varData.value;
            }
          }
        );
      }

      setVariableValues(displayVariables);
      setVariablesByType(variablesByType);
      console.log("results final", results);
      setCalculationResults(results);
      setBasePriceData(apiResponse.basePrice);

      // Call parent callback if provided
      onCalculate?.(formData, formula, results);
    } catch (error) {
      alert("Error during calculation");
    } finally {
      setIsCalculating(false);
    }
  };

  const handleReset = () => {
    setCalculationResults(null);
    setVariableValues(null);
    setVariablesByType(null);
    setBasePriceData(null);
    setFormData({
      jarak: "",
      rute: "",
      jenisTruk: "",
      jenisCarrier: "",
      tonase: 2.5,
    });
  };

  const handleClose = () => {
    // Clear all form data and calculation results when modal closes
    setCalculationResults(null);
    setVariableValues(null);
    setVariablesByType(null);
    setBasePriceData(null);
    setValidationErrors({});
    setFormData({
      jarak: "",
      rute: "",
      jenisTruk: "",
      jenisCarrier: "",
      tonase: 2.5,
    });
    setIsCalculating(false);

    // Call the original onClose callback
    onClose();
  };
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  // Helper function to convert formula with IDs to display formula with variable names
  const convertFormulaToDisplayString = (formula, variables) => {
    return formula
      .map((item) => {
        // Check if the item is a variable ID
        const variable = variables.find((v) => v.id === item);
        if (variable) {
          return variable.variableName;
        }
        // Return the item as-is for operators and numbers
        return item;
      })
      .join(" ");
  };

  // Refetch route list when modal opens
  useEffect(() => {
    if (isOpen) {
      refetchRouteList();
    }
  }, [isOpen, refetchRouteList]);

  useEffect(() => {
    console.log("formula", formula);
  }, [formula]);
  if (!isOpen) return null;

  // Get the label for selected options
  const getSelectedLabel = (options, value) => {
    const selected = options.find((option) => option.value === value);
    return selected ? selected.label : value;
  };

  return (
    <Modal open={isOpen} onOpenChange={handleClose}>
      <ModalContent
        size="medium"
        type="muattrans"
        className={`max-h-[600px] w-full max-w-[500px] overflow-y-auto`}
        withCloseButton={true}
        closeOnOutsideClick={true}
        appearance={{
          closeButtonClassname: "size-3 text-black",
        }}
      >
        {/* Modal Content */}
        <div className={`flex w-full flex-col items-center gap-5 px-2 py-8`}>
          {/* Title */}
          <div className="flex flex-col items-center justify-center">
            <ModalTitle>Masukkan Data Simulasi Rumus {formulaName}</ModalTitle>
          </div>

          {/* Form Fields */}
          <div className="flex w-full flex-col gap-[10px] px-5">
            {/* Jarak Field */}
            <div className="flex items-center gap-[25px]">
              <label className="w-[140px] text-base font-semibold leading-[19px] text-[#1B1B1B]">
                Jarak*
              </label>
              <div className="flex-1">
                <Input
                  placeholder="Masukkan Nilai Jarak"
                  value={formData.jarak}
                  onChange={(e) => handleInputChange("jarak", e.target.value)}
                  className={`w-full ${validationErrors.jarak ? "border-[#F71717]" : ""}`}
                  errorMessage={
                    validationErrors.jarak && validationErrors.jarak
                  }
                  appearance={{
                    containerClassName: `${validationErrors.jarak ? "border-[#F71717]" : ""}`,
                    errorMessageClassName:
                      "font-medium -mt-1 text-sm text-[#F71717]",
                  }}
                />
                {/* {validationErrors.jarak && (
                  <div className="mt-1 text-sm font-medium text-[#F71717]">
                    {validationErrors.jarak}
                  </div>
                )} */}
              </div>
            </div>

            {/* Rute Field */}
            <div className="flex items-center gap-[25px]">
              <label className="w-[140px] text-base font-semibold leading-[19px] text-[#1B1B1B]">
                Rute*
              </label>
              <div className="flex-1">
                <Select.Root
                  value={formData.rute}
                  onValueChange={(value) => handleInputChange("rute", value)}
                  disabled={isLoadingRoutes || !!routeError}
                >
                  <Select.Trigger
                    placeholder={
                      isLoadingRoutes
                        ? "Memuat rute..."
                        : routeError
                          ? "Error memuat rute"
                          : "Pilih Rute"
                    }
                    className={validationErrors.rute ? "border-[#F71717]" : ""}
                  >
                    <Select.Value
                      placeholder={
                        isLoadingRoutes
                          ? "Memuat rute..."
                          : routeError
                            ? "Error memuat rute"
                            : "Pilih Rute"
                      }
                    >
                      {formData.rute
                        ? routeOptions.find(
                            (option) => option.id === formData.rute
                          )?.alias || formData.rute
                        : null}
                    </Select.Value>
                  </Select.Trigger>
                  <Select.Content searchable>
                    {routeOptions && routeOptions.length > 0 ? (
                      routeOptions.map((rute) => (
                        <Select.Item
                          key={rute.id}
                          value={rute.id}
                          textValue={rute.alias}
                          className="px-3 py-3"
                        >
                          <span className="truncate text-xs font-medium text-neutral-900">
                            {rute.alias}
                          </span>
                        </Select.Item>
                      ))
                    ) : (
                      <Select.Empty>No routes available.</Select.Empty>
                    )}
                  </Select.Content>
                </Select.Root>
                {validationErrors.rute && (
                  <div className="mt-1 text-sm font-medium text-[#F71717]">
                    {validationErrors.rute}
                  </div>
                )}
                {routeError && (
                  <div className="mt-1 text-sm font-medium text-[#F71717]">
                    Gagal memuat data rute. Silakan coba lagi.
                  </div>
                )}
              </div>
            </div>

            {/* Jenis Truk Field */}
            <div className="flex items-center gap-[25px]">
              <label className="w-[140px] text-base font-semibold leading-[19px] text-[#1B1B1B]">
                Jenis Truk*
              </label>
              <div className="flex-1">
                <Select.Root
                  value={formData.jenisTruk}
                  onValueChange={(value) =>
                    handleInputChange("jenisTruk", value)
                  }
                  disabled={!formData.rute || isLoadingTruckTypes}
                >
                  <Select.Trigger
                    placeholder={
                      !formData.rute
                        ? "Pilih rute terlebih dahulu"
                        : isLoadingTruckTypes
                          ? "Memuat jenis truk..."
                          : truckTypeError
                            ? "Error memuat jenis truk"
                            : "Pilih Jenis Truk"
                    }
                    className={
                      validationErrors.jenisTruk ? "border-[#F71717]" : ""
                    }
                  >
                    <Select.Value
                      placeholder={
                        !formData.rute
                          ? "Pilih rute terlebih dahulu"
                          : isLoadingTruckTypes
                            ? "Memuat jenis truk..."
                            : truckTypeError
                              ? "Error memuat jenis truk"
                              : "Pilih Jenis Truk"
                      }
                    >
                      {formData.jenisTruk
                        ? truckOptions.find(
                            (option) => option.value === formData.jenisTruk
                          )?.label || formData.jenisTruk
                        : null}
                    </Select.Value>
                  </Select.Trigger>
                  <Select.Content searchable>
                    {truckOptions && truckOptions.length > 0 ? (
                      truckOptions.map((truck) => (
                        <Select.Item
                          key={truck.value}
                          value={truck.value}
                          textValue={truck.label}
                          className="px-3 py-3"
                        >
                          <span className="truncate text-xs font-medium text-neutral-900">
                            {truck.label}
                          </span>
                        </Select.Item>
                      ))
                    ) : (
                      <Select.Empty>
                        {!formData.rute
                          ? "Pilih rute terlebih dahulu"
                          : "Tidak ada jenis truk tersedia"}
                      </Select.Empty>
                    )}
                  </Select.Content>
                </Select.Root>
                {validationErrors.jenisTruk && (
                  <div className="mt-1 text-sm font-medium text-[#F71717]">
                    {validationErrors.jenisTruk}
                  </div>
                )}
                {truckTypeError && (
                  <div className="mt-1 text-sm font-medium text-[#F71717]">
                    Gagal memuat jenis truk. Silakan coba lagi.
                  </div>
                )}
              </div>
            </div>

            {/* Jenis Carrier Field */}
            <div className="flex items-center gap-[25px]">
              <label className="w-[140px] text-base font-semibold leading-[19px] text-[#1B1B1B]">
                Jenis Carrier*
              </label>
              <div className="flex-1">
                <Select.Root
                  value={formData.jenisCarrier}
                  onValueChange={(value) => {
                    handleInputChange("jenisCarrier", value);
                    handleInputChange(
                      "tonase",
                      carrierOptions.find((option) => option.value === value)
                        ?.maxWeightTon
                    );
                  }}
                  disabled={!formData.jenisTruk || isLoadingCarrierTypes}
                >
                  <Select.Trigger
                    placeholder={
                      !formData.jenisTruk
                        ? "Pilih jenis truk terlebih dahulu"
                        : isLoadingCarrierTypes
                          ? "Memuat jenis carrier..."
                          : carrierTypeError
                            ? "Error memuat jenis carrier"
                            : "Pilih Jenis Carrier"
                    }
                    className={
                      validationErrors.jenisCarrier ? "border-[#F71717]" : ""
                    }
                  >
                    <Select.Value
                      placeholder={
                        !formData.jenisTruk
                          ? "Pilih jenis truk terlebih dahulu"
                          : isLoadingCarrierTypes
                            ? "Memuat jenis carrier..."
                            : carrierTypeError
                              ? "Error memuat jenis carrier"
                              : "Pilih Jenis Carrier"
                      }
                    >
                      {formData.jenisCarrier
                        ? carrierOptions.find(
                            (option) => option.value === formData.jenisCarrier
                          )?.label || formData.jenisCarrier
                        : null}
                    </Select.Value>
                  </Select.Trigger>
                  <Select.Content searchable>
                    {carrierOptions && carrierOptions.length > 0 ? (
                      carrierOptions.map((carrier) => (
                        <Select.Item
                          key={carrier.value}
                          value={carrier.value}
                          textValue={carrier.label}
                          className="px-3 py-3"
                        >
                          <span className="truncate text-xs font-medium text-neutral-900">
                            {carrier.label}
                          </span>
                        </Select.Item>
                      ))
                    ) : (
                      <Select.Empty>
                        {!formData.jenisTruk
                          ? "Pilih jenis truk terlebih dahulu"
                          : "Tidak ada jenis carrier tersedia"}
                      </Select.Empty>
                    )}
                  </Select.Content>
                </Select.Root>
                {validationErrors.jenisCarrier && (
                  <div className="mt-1 text-sm font-medium text-[#F71717]">
                    {validationErrors.jenisCarrier}
                  </div>
                )}
                {carrierTypeError && (
                  <div className="mt-1 text-sm font-medium text-[#F71717]">
                    Gagal memuat jenis carrier. Silakan coba lagi.
                  </div>
                )}
              </div>
            </div>

            {/* Tonase Field */}
            <div className="flex items-center gap-[25px]">
              <label className="w-[140px] text-base font-semibold leading-[19px] text-[#1B1B1B]">
                Tonase*
              </label>
              <div className="flex flex-1 items-center gap-[10px]">
                <div className="flex-1">
                  <Input
                    type="number"
                    value={formData.tonase}
                    onChange={(e) =>
                      handleInputChange("tonase", e.target.value)
                    }
                    className={`w-full ${validationErrors.tonase ? "border-[#F71717]" : ""}`}
                    disabled
                  />
                  {validationErrors.tonase && (
                    <div className="mt-1 text-sm font-medium text-[#F71717]">
                      {validationErrors.tonase}
                    </div>
                  )}
                </div>
                <span className="text-sm font-medium leading-[17px] text-[#1B1B1B]">
                  Ton
                </span>
              </div>
            </div>
          </div>

          {/* Calculate Button */}
          <div className="flex gap-3">
            <Button
              variant="muatparts-primary"
              onClick={handleCalculate}
              disabled={
                isCalculating ||
                isLoadingRoutes ||
                isLoadingTruckTypes ||
                isLoadingCarrierTypes
              }
              className="w-[135px] rounded-[20px] px-6 py-2"
            >
              {isCalculating
                ? "Menghitung..."
                : isLoadingRoutes
                  ? "Memuat..."
                  : isLoadingTruckTypes && formData.rute
                    ? "Memuat..."
                    : isLoadingCarrierTypes && formData.jenisTruk
                      ? "Memuat..."
                      : calculationResults
                        ? "Hitung Ulang"
                        : "Hitung Harga"}
            </Button>
          </div>

          {/* Results Section */}
          {calculationResults && (
            <div className="flex w-full flex-col gap-[15px] px-5">
              <div className="flex flex-col gap-2">
                <h3 className="text-base font-bold leading-[19px] text-[#1B1B1B]">
                  Hasil Perhitungan Harga
                </h3>

                {/* Show the formula that was used */}
                {formula && formula.length > 0 && (
                  <div className="rounded bg-gray-50 p-2">
                    <p className="mb-1 text-xs text-gray-600">
                      Formula yang digunakan:
                    </p>
                    <p className="font-mono text-sm text-gray-800">
                      {convertFormulaToDisplayString(formula, variables)}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-4">
                {/* Dynamic Pricing Types based on API response */}
                {calculationResults &&
                  Object.entries(calculationResults).map(
                    ([typePricingId, resultData], index) => {
                      // Get background colors based on index
                      const bgColors = [
                        {
                          bg: "bg-green-50",
                          text: "text-green-600",
                          textSecondary: "text-green-800",
                        },
                        {
                          bg: "bg-yellow-50",
                          text: "text-yellow-600",
                          textSecondary: "text-yellow-800",
                        },
                        {
                          bg: "bg-red-50",
                          text: "text-red-600",
                          textSecondary: "text-red-800",
                        },
                        {
                          bg: "bg-purple-50",
                          text: "text-purple-600",
                          textSecondary: "text-purple-800",
                        },
                        {
                          bg: "bg-blue-50",
                          text: "text-blue-600",
                          textSecondary: "text-blue-800",
                        },
                        {
                          bg: "bg-indigo-50",
                          text: "text-indigo-600",
                          textSecondary: "text-indigo-800",
                        },
                      ];

                      const colorScheme = bgColors[index % bgColors.length];

                      return (
                        <div
                          key={typePricingId}
                          className="flex flex-col gap-2"
                        >
                          <div className="flex items-start gap-3">
                            <span className="min-w-[120px] text-base font-semibold leading-[19px] text-[#1B1B1B]">
                              {resultData.name}
                            </span>
                            <span className="text-base font-semibold leading-[19px] text-[#1B1B1B]">
                              : {formatCurrency(resultData.value)}
                            </span>
                          </div>
                          {variablesByType?.[typePricingId] && (
                            <div
                              className={`ml-[145px] rounded ${colorScheme.bg} p-2`}
                            >
                              <p className={`mb-1 text-xs ${colorScheme.text}`}>
                                Nilai variabel:
                              </p>
                              <div
                                className={`grid grid-cols-2 gap-1 text-xs ${colorScheme.textSecondary}`}
                              >
                                {Object.entries(
                                  variablesByType[typePricingId]
                                ).map(([key, value]) => (
                                  <span key={key}>
                                    {key}: {value || 0}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    }
                  )}
              </div>
            </div>
          )}
        </div>
      </ModalContent>
    </Modal>
  );
};

SimulationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onCalculate: PropTypes.func,
  formula: PropTypes.array,
  formulaId: PropTypes.string,
  variables: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      variableName: PropTypes.string.isRequired,
      description: PropTypes.string,
    })
  ),
};

export default SimulationModal;
