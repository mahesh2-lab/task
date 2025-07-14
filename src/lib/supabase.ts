import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://tvlcpldeiyvojryaxegn.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2bGNwbGRlaXl2b2pyeWF4ZWduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE2MDYzOTQsImV4cCI6MjA2NzE4MjM5NH0.kjVovSEuBrVpmWC4QKc6f5MIr1LhwEI3KlD7mCRiQ20";

export const supabase = createClient(supabaseUrl, supabaseKey);

// Database types for property tax data
export interface PropertyTaxRecord {
  id?: number;
  created_at?: string;
  updated_at?: string;

  // General Information
  state: string;
  village_panchayat: string;
  locality: string;
  janpad_panchayat: string;
  district: string;

  // Property Details
  auto_serial_no: string;
  address: string;
  samagra_id: string;
  property_number: string;
  owner_name: string;
  consumer_name: string;
  property_description: string;
  building_year: number;

  // Valuation Details
  area_sqft: number;
  land_guideline_price: number;
  building_guideline_price: number;
  construction_guideline_price: number;
  depreciation_percent: number;
  intended_use: string;
  post_depreciation_value: number;
  tax_cash_value: number;

  // Tax Details
  property_tax_annual: number;
  lighting_tax_annual: number;
  cleaning_tax_annual: number;
  water_tax_annual: number;
  total_tax_annual: number;
  property_tax_appeal: number;
  lighting_tax_appeal: number;
  cleaning_tax_appeal: number;
  water_tax_appeal: number;
  total_tax_appeal: number;

  // Additional Information
  remarks_on_change?: string;
  has_toilet: boolean;
  chaturmasi?: string;
  boundary_east?: string;
  boundary_west?: string;
  boundary_north?: string;
  boundary_south?: string;
}

// Function to save property tax data to database
export const savePropertyTaxData = async (
  formData: any
): Promise<{ success: boolean; error?: string; data?: PropertyTaxRecord }> => {
  try {
    // Transform form data to match database schema
    const dbRecord: Omit<
      PropertyTaxRecord,
      "id" | "created_at" | "updated_at"
    > = {
      state: formData.state || "",
      village_panchayat: formData.gramPanchayat || "",
      locality: formData.village || "",
      janpad_panchayat: formData.janpadPanchayat || "",
      district: formData.district || "",
      auto_serial_no: formData.serial || "1",
      address: formData.address || "",
      samagra_id: formData.memberId || "",
      property_number: formData.assetNumber || "",
      owner_name: formData.ownerName || "",
      consumer_name: formData.consumerName || "",
      property_description: formData.assetDetails || "",
      building_year: Number(formData.constructionYear) || 0,
      area_sqft: Number(formData.areaPerSqFt) || 0,
      land_guideline_price: Number(formData.landValue) || 0,
      building_guideline_price: Number(formData.buildingValue) || 0,
      construction_guideline_price: Number(formData.constructionValue) || 0,
      depreciation_percent: Number(formData.depreciationRate) || 0,
      intended_use: formData.intendedUse || "",
      post_depreciation_value: Number(formData.afterDepreciationValue) || 0,
      tax_cash_value: Number(formData.taxableValue) || 0,
      property_tax_annual: Number(formData.propertyTax) || 0,
      lighting_tax_annual: Number(formData.lightTax) || 0,
      cleaning_tax_annual: Number(formData.cleaningTax) || 0,
      water_tax_annual: Number(formData.waterTax) || 0,
      total_tax_annual: Number(formData.totalAnnual) || 0,
      property_tax_appeal: Number(formData.appealPropertyTax) || 0,
      lighting_tax_appeal: Number(formData.appealLightTax) || 0,
      cleaning_tax_appeal: Number(formData.appealCleaningTax) || 0,
      water_tax_appeal: Number(formData.appealWaterTax) || 0,
      total_tax_appeal: Number(formData.totalAppeal) || 0,
      remarks_on_change: formData.remarks || "",
      has_toilet: formData.toilet === "हाँ",
      chaturmasi: formData.chaturmasi || "",
      boundary_east: formData.east || "",
      boundary_west: formData.west || "",
      boundary_north: formData.north || "",
      boundary_south: formData.south || "",
    };

    const { data, error } = await supabase
      .from("gram")
      .insert([dbRecord])
      .select()
      .single();

    if (error) {
      console.error("Database error:", error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Unexpected error:", error);
    return { success: false, error: "An unexpected error occurred" };
  }
};

// Function to get all property tax records
export const getPropertyTaxRecords = async (): Promise<{
  success: boolean;
  data?: PropertyTaxRecord[];
  error?: string;
}> => {
  try {
    const { data, error } = await supabase
      .from("gram")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.error("Database error:", error);
      return { success: false, error: error.message };
    }

    return { success: true, data: data || [] };
  } catch (error) {
    console.error("Unexpected error:", error);
    return { success: false, error: "An unexpected error occurred" };
  }
};

// Function to get a single property tax record by ID
export const getPropertyTaxRecord = async (
  id: number
): Promise<{ success: boolean; data?: PropertyTaxRecord; error?: string }> => {
  try {
    const { data, error } = await supabase
      .from("gram")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Database error:", error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Unexpected error:", error);
    return { success: false, error: "An unexpected error occurred" };
  }
};

// Function to update a property tax record
export const updatePropertyTaxRecord = async (
  id: number,
  formData: any
): Promise<{ success: boolean; data?: PropertyTaxRecord; error?: string }> => {
  try {
    // Transform form data to match database schema (same as in savePropertyTaxData)
    const dbRecord = {
      state: formData.state || "",
      village_panchayat: formData.gramPanchayat || "",
      locality: formData.village || "",
      janpad_panchayat: formData.janpadPanchayat || "",
      district: formData.district || "",
      auto_serial_no: formData.serial || "1",
      address: formData.address || "",
      samagra_id: formData.memberId || "",
      property_number: formData.assetNumber || "",
      owner_name: formData.ownerName || "",
      consumer_name: formData.consumerName || "",
      property_description: formData.assetDetails || "",
      building_year: Number(formData.constructionYear) || 0,
      area_sqft: Number(formData.areaPerSqFt) || 0,
      land_guideline_price: Number(formData.landValue) || 0,
      building_guideline_price: Number(formData.buildingValue) || 0,
      construction_guideline_price: Number(formData.constructionValue) || 0,
      depreciation_percent: Number(formData.depreciationRate) || 0,
      intended_use: formData.intendedUse || "",
      post_depreciation_value: Number(formData.afterDepreciationValue) || 0,
      tax_cash_value: Number(formData.taxableValue) || 0,
      property_tax_annual: Number(formData.propertyTax) || 0,
      lighting_tax_annual: Number(formData.lightTax) || 0,
      cleaning_tax_annual: Number(formData.cleaningTax) || 0,
      water_tax_annual: Number(formData.waterTax) || 0,
      total_tax_annual: Number(formData.totalAnnual) || 0,
      property_tax_appeal: Number(formData.appealPropertyTax) || 0,
      lighting_tax_appeal: Number(formData.appealLightTax) || 0,
      cleaning_tax_appeal: Number(formData.appealCleaningTax) || 0,
      water_tax_appeal: Number(formData.appealWaterTax) || 0,
      total_tax_appeal: Number(formData.totalAppeal) || 0,
      remarks_on_change: formData.remarks || "",
      has_toilet: formData.toilet === "हाँ",
      chaturmasi: formData.chaturmasi || "",
      boundary_east: formData.east || "",
      boundary_west: formData.west || "",
      boundary_north: formData.north || "",
      boundary_south: formData.south || "",
    };

    const { data, error } = await supabase
      .from("gram")
      .update(dbRecord)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Database error:", error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Unexpected error:", error);
    return { success: false, error: "An unexpected error occurred" };
  }
};

// Function to delete a property tax record
export const deletePropertyTaxRecord = async (
  id: number
): Promise<{ success: boolean; error?: string }> => {
  try {
    const { error } = await supabase.from("gram").delete().eq("id", id);

    if (error) {
      console.error("Database error:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error("Unexpected error:", error);
    return { success: false, error: "An unexpected error occurred" };
  }
};
