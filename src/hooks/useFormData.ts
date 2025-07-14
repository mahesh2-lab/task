import { useState, useEffect } from "react";
import { FormData } from "../types/FormData";

const initialFormData: FormData = {
  state: "",
  gramPanchayat: "",
  village: "",
  janpadPanchayat: "",
  district: "",
  serial: "1",
  address: "",
  memberId: "",
  assetNumber: "",
  ownerName: "",
  consumerName: "",
  assetDetails: "",
  constructionYear: "",
  areaPerSqFt: "",
  landValue: "",
  buildingValue: "",
  constructionValue: "",
  depreciationRate: "",
  intendedUse: "",
  afterDepreciationValue: "",
  taxableValue: "",
  propertyTax: "",
  lightTax: "",
  cleaningTax: "",
  waterTax: "",
  totalAnnual: "",
  appealPropertyTax: "",
  appealLightTax: "",
  appealCleaningTax: "",
  appealWaterTax: "",
  totalAppeal: "",
  remarks: "",
  toilet: "हाँ",
  chaturmasi: "",
  east: "",
  west: "",
  north: "",
  south: "",
};

export const useFormData = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const updateField = (field: keyof FormData, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const resetForm = () => {
    setFormData(initialFormData);
  };

  // Auto-calculate totals
  useEffect(() => {
    const propertyTax = Number(formData.propertyTax) || 0;
    const lightTax = Number(formData.lightTax) || 0;
    const cleaningTax = Number(formData.cleaningTax) || 0;
    const waterTax = Number(formData.waterTax) || 0;

    const totalAnnual = propertyTax + lightTax + cleaningTax + waterTax;

    setFormData((prev) => ({
      ...prev,
      totalAnnual: totalAnnual.toString(),
    }));
  }, [
    formData.propertyTax,
    formData.lightTax,
    formData.cleaningTax,
    formData.waterTax,
  ]);

  useEffect(() => {
    const appealPropertyTax = Number(formData.appealPropertyTax) || 0;
    const appealLightTax = Number(formData.appealLightTax) || 0;
    const appealCleaningTax = Number(formData.appealCleaningTax) || 0;
    const appealWaterTax = Number(formData.appealWaterTax) || 0;

    const totalAppeal =
      appealPropertyTax + appealLightTax + appealCleaningTax + appealWaterTax;

    setFormData((prev) => ({
      ...prev,
      totalAppeal: totalAppeal.toString(),
    }));
  }, [
    formData.appealPropertyTax,
    formData.appealLightTax,
    formData.appealCleaningTax,
    formData.appealWaterTax,
  ]);

  // Auto-calculate depreciated value
  useEffect(() => {
    const landValue = Number(formData.landValue) || 0;
    const buildingValue = Number(formData.buildingValue) || 0;
    const constructionValue = Number(formData.constructionValue) || 0;
    const areaPerSqFt = Number(formData.areaPerSqFt) || 1;
    const depreciationRate = Number(formData.depreciationRate) || 0;

    const totalValue =
      (landValue + buildingValue + constructionValue) * areaPerSqFt;
    const depreciatedValue = totalValue * (1 - depreciationRate / 100);

    setFormData((prev) => ({
      ...prev,
      afterDepreciationValue: Math.round(depreciatedValue).toString(),
    }));
  }, [
    formData.landValue,
    formData.buildingValue,
    formData.constructionValue,
    formData.areaPerSqFt,
    formData.depreciationRate,
  ]);

  // Auto-calculate property tax based on taxable value
  useEffect(() => {
    const taxableValue = Number(formData.taxableValue) || 0;
    const afterDepreciationValue = Number(formData.afterDepreciationValue) || 0;

    if (taxableValue && afterDepreciationValue) {
      const calculatedPropertyTax = Math.round(
        afterDepreciationValue * (taxableValue / 100)
      );

      setFormData((prev) => ({
        ...prev,
        propertyTax: calculatedPropertyTax.toString(),
      }));
    }
  }, [formData.taxableValue, formData.afterDepreciationValue]);

  return {
    formData,
    updateField,
    resetForm,
  };
};
