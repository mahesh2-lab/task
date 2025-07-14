export interface FormData {
  // General Information
  state: string;
  gramPanchayat: string;
  village: string;
  janpadPanchayat: string;
  district: string;

  // Property Details
  serial: string;
  address: string;
  memberId: string;
  assetNumber: string;
  ownerName: string;
  consumerName: string;
  assetDetails: string;
  constructionYear: number | string;

  // Valuation Details
  areaPerSqFt: number | string;
  landValue: number | string;
  buildingValue: number | string;
  constructionValue: number | string;
  depreciationRate: number | string;
  intendedUse: string;
  afterDepreciationValue: number | string;
  taxableValue: number | string;

  // Tax Details
  propertyTax: number | string;
  lightTax: number | string;
  cleaningTax: number | string;
  waterTax: number | string;
  totalAnnual: number | string;
  appealPropertyTax: number | string;
  appealLightTax: number | string;
  appealCleaningTax: number | string;
  appealWaterTax: number | string;
  totalAppeal: number | string;

  // Additional Information
  remarks: string;
  toilet: string;
  chaturmasi: string;
  east: string;
  west: string;
  north: string;
  south: string;
}
