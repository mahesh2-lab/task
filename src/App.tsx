import React, { useState } from "react";
import { FileText, Eye, Download, Printer, Database } from "lucide-react";
import { Header } from "./components/Header";
import { FormSection } from "./components/FormSection";
import { FormField } from "./components/FormField";
import { PrintableDocument } from "./components/PrintableDocument";
import { useFormData } from "./hooks/useFormData";
import { generatePDF } from "./utils/pdfGenerator";
import {
  savePropertyTaxData,
  getPropertyTaxRecords,
  PropertyTaxRecord,
} from "./lib/supabase";

function App() {
  const [activeTab, setActiveTab] = useState<"form" | "display" | "records">(
    "form"
  );
  const { formData, updateField, resetForm } = useFormData();
  const [savedRecords, setSavedRecords] = useState<PropertyTaxRecord[]>([]);
  const [loadingRecords, setLoadingRecords] = useState(false);

  const intendedUseOptions = [
    { value: "आवासीय", label: "आवासीय" },
    { value: "वाणिज्यिक", label: "वाणिज्यिक" },
    { value: "औद्योगिक", label: "औद्योगिक" },
    { value: "कृषि", label: "कृषि" },
  ];

  const toiletOptions = [
    { value: "हाँ", label: "हाँ" },
    { value: "नहीं", label: "नहीं" },
  ];

  const validateForm = () => {
    const requiredFields = [
      "gramPanchayat",
      "village",
      "ownerName",
      "consumerName",
    ] as const;

    const missingFields = requiredFields.filter(
      (field) => !formData[field] || String(formData[field]).trim() === ""
    );

    if (missingFields.length > 0) {
      alert(`कृपया निम्नलिखित आवश्यक फील्ड भरें: ${missingFields.join(", ")}`);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Save to database first
      await saveToDatabase();
      // Then switch to display tab
      setActiveTab("display");
    }
  };

  const downloadPDF = async () => {
    try {
      // Show the PrintableDocument temporarily for PDF generation
      const printableElement = document.getElementById("printable-document");
      if (printableElement) {
        const parentElement = printableElement.parentElement;
        if (parentElement) {
          parentElement.style.display = "block";
          parentElement.style.position = "absolute";
          parentElement.style.top = "0";
          parentElement.style.left = "0";
          parentElement.style.zIndex = "-1000";
        }
      }

      await generatePDF("printable-document", `property-tax-document.pdf`);

      // Hide the PrintableDocument again
      if (printableElement) {
        const parentElement = printableElement.parentElement;
        if (parentElement) {
          parentElement.style.display = "none";
          parentElement.style.position = "";
          parentElement.style.top = "";
          parentElement.style.left = "";
          parentElement.style.zIndex = "";
        }
      }
    } catch (error) {
      console.error("Error downloading PDF:", error);
      alert("PDF डाउनलोड करने में त्रुटि हुई। कृपया पुनः प्रयास करें।");
    }
  };

  const printDocument = () => {
    // Open PrintableDocument in a new window for printing
    const printWindow = window.open("", "_blank");
    const printableElement = document.getElementById("printable-document");

    if (printWindow && printableElement) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Property Tax Document</title>
          <style>
            body { margin: 0; padding: 0; }
            @media print {
              body { margin: 0; }
            }
          </style>
        </head>
        <body>
          ${printableElement.outerHTML}
        </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
    }
  };

  const saveToDatabase = async () => {
    try {
      const result = await savePropertyTaxData(formData);

      if (result.success) {
        alert("डेटा सफलतापूर्वक सेव हो गया!");
      } else {
        alert(`डेटा सेव करने में त्रुटि: ${result.error}`);
      }
    } catch (error) {
      console.error("Error saving to database:", error);
      alert("डेटा सेव करने में त्रुटि हुई। कृपया पुनः प्रयास करें।");
    }
  };

  const loadSavedRecords = async () => {
    setLoadingRecords(true);
    try {
      const result = await getPropertyTaxRecords();
      if (result.success && result.data) {
        setSavedRecords(result.data);
      } else {
        alert(`रिकॉर्ड लोड करने में त्रुटि: ${result.error}`);
      }
    } catch (error) {
      console.error("Error loading records:", error);
      alert("रिकॉर्ड लोड करने में त्रुटि हुई।");
    } finally {
      setLoadingRecords(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        <Header
          title="ग्राम पंचायत संपत्ती कर फॉर्म"
          subtitle="मध्य प्रदेश ग्राम पंचायत अनिवार्य कर तथा फीस (शर्त तथा अपवाद) धारा 77 नियम 1996"
          description="सन 2020-2021 से 2024-2025 तक के लिए प्रतिवर्ष भूमि एवं भवनों का कर मूल्यांकन अभिलेख"
        />

        {/* Navigation Tabs */}
        <div className="flex bg-slate-600">
          <button
            onClick={() => setActiveTab("form")}
            className={`flex-1 px-6 py-4 font-medium transition-colors duration-200 flex items-center justify-center gap-2 ${
              activeTab === "form"
                ? "bg-teal-500 text-white"
                : "text-slate-200 hover:bg-slate-500"
            }`}
          >
            <FileText className="w-5 h-5" />
            फॉर्म भरें
          </button>
          <button
            onClick={() => setActiveTab("display")}
            className={`flex-1 px-6 py-4 font-medium transition-colors duration-200 flex items-center justify-center gap-2 ${
              activeTab === "display"
                ? "bg-teal-500 text-white"
                : "text-slate-200 hover:bg-slate-500"
            }`}
          >
            <Eye className="w-5 h-5" />
            डेटा देखें
          </button>
          <button
            onClick={() => {
              setActiveTab("records");
              loadSavedRecords();
            }}
            className={`flex-1 px-6 py-4 font-medium transition-colors duration-200 flex items-center justify-center gap-2 ${
              activeTab === "records"
                ? "bg-teal-500 text-white"
                : "text-slate-200 hover:bg-slate-500"
            }`}
          >
            <Database className="w-5 h-5" />
            सेव्ड रिकॉर्ड
          </button>
        </div>

        {/* Form Section */}
        {activeTab === "form" && (
          <div className="p-8 bg-gray-50">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* General Information */}
              <FormSection title="सामान्य जानकारी">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <FormField
                    label="राज्य"
                    value={formData.state}
                    onChange={(value) => updateField("state", value)}
                    required
                  />
                  <FormField
                    label="जिला"
                    value={formData.district}
                    onChange={(value) => updateField("district", value)}
                    required
                  />
                  <FormField
                    label="जनपद पंचायत"
                    value={formData.janpadPanchayat}
                    onChange={(value) => updateField("janpadPanchayat", value)}
                    required
                  />
                  <FormField
                    label="ग्राम पंचायत"
                    value={formData.gramPanchayat}
                    onChange={(value) => updateField("gramPanchayat", value)}
                    required
                  />
                  <FormField
                    label="गाव/मोहल्ला"
                    value={formData.village}
                    onChange={(value) => updateField("village", value)}
                    required
                  />
                </div>
              </FormSection>

              {/* Property Details */}
              <FormSection title="संपत्ति विवरण">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <FormField
                    label="अ. क्र (स्वचालित)"
                    value={formData.serial}
                    onChange={(value) => updateField("serial", value)}
                    readonly
                  />
                  <FormField
                    label="पता"
                    value={formData.address}
                    onChange={(value) => updateField("address", value)}
                    required
                  />
                  <FormField
                    label="समग्र सदस्य आयडी"
                    value={formData.memberId}
                    onChange={(value) => updateField("memberId", value)}
                    required
                  />
                  <FormField
                    label="परिसंपत्ति क्रमांक"
                    value={formData.assetNumber}
                    onChange={(value) => updateField("assetNumber", value)}
                    required
                  />
                  <FormField
                    label="मालिक का नाम"
                    value={formData.ownerName}
                    onChange={(value) => updateField("ownerName", value)}
                    required
                  />
                  <FormField
                    label="उपभोक्ता का नाम"
                    value={formData.consumerName}
                    onChange={(value) => updateField("consumerName", value)}
                    required
                  />
                  <FormField
                    label="परिसंपत्ति का विवरण"
                    type="textarea"
                    value={formData.assetDetails}
                    onChange={(value) => updateField("assetDetails", value)}
                    required
                    rows={2}
                    className="md:col-span-2 lg:col-span-3"
                  />
                  <FormField
                    label="भवन निर्माण साल"
                    type="number"
                    value={formData.constructionYear}
                    onChange={(value) => updateField("constructionYear", value)}
                    min={1900}
                    max={2025}
                    required
                  />
                </div>
              </FormSection>

              {/* Valuation Details */}
              <FormSection title="मूल्यांकन विवरण">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <FormField
                    label="वर्ग फिट प्रतिवर्ग"
                    type="number"
                    value={formData.areaPerSqFt}
                    onChange={(value) => updateField("areaPerSqFt", value)}
                    required
                  />
                  <FormField
                    label="भूमि (गाइड लाइन की कीमत)"
                    type="number"
                    value={formData.landValue}
                    onChange={(value) => updateField("landValue", value)}
                    required
                  />
                  <FormField
                    label="इमारत (गाइड लाइन की कीमत)"
                    type="number"
                    value={formData.buildingValue}
                    onChange={(value) => updateField("buildingValue", value)}
                    required
                  />
                  <FormField
                    label="निर्माण (गाइड लाइन की कीमत)"
                    type="number"
                    value={formData.constructionValue}
                    onChange={(value) =>
                      updateField("constructionValue", value)
                    }
                    required
                  />
                  <FormField
                    label="मूल्य ह्रास के प्रतिशत"
                    type="number"
                    value={formData.depreciationRate}
                    onChange={(value) => updateField("depreciationRate", value)}
                    min={0}
                    max={100}
                    required
                  />
                  <FormField
                    label="निर्माण इरादा उपयोग"
                    type="select"
                    value={formData.intendedUse}
                    onChange={(value) => updateField("intendedUse", value)}
                    options={intendedUseOptions}
                    required
                  />
                  <FormField
                    label="मूल्य ह्रास के बाद की किमत"
                    type="number"
                    value={formData.afterDepreciationValue}
                    onChange={(value) =>
                      updateField("afterDepreciationValue", value)
                    }
                    required
                  />
                  <FormField
                    label="कर की मूल्य (रोकड़)"
                    type="number"
                    value={formData.taxableValue}
                    onChange={(value) => updateField("taxableValue", value)}
                    required
                  />
                </div>
              </FormSection>

              {/* Tax Details */}
              <FormSection title="कर विवरण">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold text-lg mb-4 text-slate-700">
                      वार्षिक कर
                    </h4>
                    <div className="space-y-4">
                      <FormField
                        label="संपत्ती कर (वार्षिक)"
                        type="number"
                        value={formData.propertyTax}
                        onChange={(value) => updateField("propertyTax", value)}
                        required
                      />
                      <FormField
                        label="प्रकाश कर (वार्षिक)"
                        type="number"
                        value={formData.lightTax}
                        onChange={(value) => updateField("lightTax", value)}
                        required
                      />
                      <FormField
                        label="सफाई कर (वार्षिक)"
                        type="number"
                        value={formData.cleaningTax}
                        onChange={(value) => updateField("cleaningTax", value)}
                        required
                      />
                      <FormField
                        label="जल कर (वार्षिक)"
                        type="number"
                        value={formData.waterTax}
                        onChange={(value) => updateField("waterTax", value)}
                        required
                      />
                      <FormField
                        label="कुल (वार्षिक)"
                        type="number"
                        value={formData.totalAnnual}
                        onChange={(value) => updateField("totalAnnual", value)}
                        readonly
                      />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-4 text-slate-700">
                      अपील कर
                    </h4>
                    <div className="space-y-4">
                      <FormField
                        label="संपत्ती कर (अपील)"
                        type="number"
                        value={formData.appealPropertyTax}
                        onChange={(value) =>
                          updateField("appealPropertyTax", value)
                        }
                        required
                      />
                      <FormField
                        label="प्रकाश कर (अपील)"
                        type="number"
                        value={formData.appealLightTax}
                        onChange={(value) =>
                          updateField("appealLightTax", value)
                        }
                        required
                      />
                      <FormField
                        label="सफाई कर (अपील)"
                        type="number"
                        value={formData.appealCleaningTax}
                        onChange={(value) =>
                          updateField("appealCleaningTax", value)
                        }
                        required
                      />
                      <FormField
                        label="जल कर (अपील)"
                        type="number"
                        value={formData.appealWaterTax}
                        onChange={(value) =>
                          updateField("appealWaterTax", value)
                        }
                        required
                      />
                      <FormField
                        label="कुल (अपील)"
                        type="number"
                        value={formData.totalAppeal}
                        onChange={(value) => updateField("totalAppeal", value)}
                        readonly
                      />
                    </div>
                  </div>
                </div>
              </FormSection>

              {/* Additional Information */}
              <FormSection title="अतिरिक्त जानकारी">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <FormField
                    label="बाद में विकास या कमी के मामले में आदेश प्रसंग में टिप्पणी"
                    type="textarea"
                    value={formData.remarks}
                    onChange={(value) => updateField("remarks", value)}
                    rows={3}
                    className="md:col-span-2 lg:col-span-3"
                  />
                  <FormField
                    label="शौचालय"
                    type="select"
                    value={formData.toilet}
                    onChange={(value) => updateField("toilet", value)}
                    options={toiletOptions}
                  />
                  <FormField
                    label="चतुर्मासी"
                    value={formData.chaturmasi}
                    onChange={(value) => updateField("chaturmasi", value)}
                  />
                  <FormField
                    label="पूर्व"
                    value={formData.east}
                    onChange={(value) => updateField("east", value)}
                  />
                  <FormField
                    label="पश्चिम"
                    value={formData.west}
                    onChange={(value) => updateField("west", value)}
                  />
                  <FormField
                    label="उत्तर"
                    value={formData.north}
                    onChange={(value) => updateField("north", value)}
                  />
                  <FormField
                    label="दक्षिण"
                    value={formData.south}
                    onChange={(value) => updateField("south", value)}
                  />
                </div>
              </FormSection>

              {/* Form Actions */}
              <div className="flex justify-center gap-4 pt-6">
                <button
                  type="submit"
                  className="px-8 py-3 bg-teal-500 text-white font-medium rounded-lg hover:bg-teal-600 transition-colors duration-200 flex items-center gap-2"
                >
                  <FileText className="w-5 h-5" />
                  सबमिट करें
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-8 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors duration-200"
                >
                  रीसेट करें
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Display Section */}
        {activeTab === "display" && (
          <div className="p-8">
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-bold text-slate-800 mb-2">
                ग्राम पंचायत संपत्ती कर प्रबंधन प्रणाली
              </h2>
              <h3 className="text-lg font-medium text-slate-600 mb-1">
                मध्य प्रदेश ग्राम पंचायत अनिवार्य कर तथा फीस (शर्त तथा अपवाद)
                धारा 77 नियम 1996
              </h3>
              <h5 className="text-base text-slate-500">
                सन 2020-2021 से 2024-2025 तक के लिए प्रतिवर्ष भूमि एवं भवनों का
                कर मूल्यांकन अभिलेख
              </h5>
            </div>

            {/* Show PrintableDocument for preview */}
            <div className="bg-white rounded-lg shadow-lg p-4 mb-8">
              <PrintableDocument data={formData} />
            </div>

            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={downloadPDF}
                className="px-8 py-3 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-colors duration-200 flex items-center gap-2"
              >
                <Download className="w-5 h-5" />
                PDF डाउनलोड करें
              </button>
              <button
                onClick={printDocument}
                className="px-8 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center gap-2"
              >
                <Printer className="w-5 h-5" />
                प्रिंट करें
              </button>
            </div>
          </div>
        )}

        {/* Records Section */}
        {activeTab === "records" && (
          <div className="p-8">
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-bold text-slate-800 mb-2">
                सेव्ड रिकॉर्ड
              </h2>
              <p className="text-slate-600">
                डेटाबेस में सेव किए गए सभी प्रॉपर्टी टैक्स रिकॉर्ड
              </p>
            </div>

            {loadingRecords ? (
              <div className="text-center py-8">
                <p className="text-slate-600">रिकॉर्ड लोड हो रहे हैं...</p>
              </div>
            ) : savedRecords.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-slate-600">कोई रिकॉर्ड नहीं मिला</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-2 text-left">
                        ID
                      </th>
                      <th className="border border-gray-300 px-4 py-2 text-left">
                        मालिक का नाम
                      </th>
                      <th className="border border-gray-300 px-4 py-2 text-left">
                        ग्राम पंचायत
                      </th>
                      <th className="border border-gray-300 px-4 py-2 text-left">
                        गांव
                      </th>
                      <th className="border border-gray-300 px-4 py-2 text-left">
                        कुल वार्षिक कर
                      </th>
                      <th className="border border-gray-300 px-4 py-2 text-left">
                        बनाया गया
                      </th>
                      <th className="border border-gray-300 px-4 py-2 text-left">
                        एक्शन
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {savedRecords.map((record) => (
                      <tr key={record.id} className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-4 py-2">
                          {record.id}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {record.owner_name}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {record.village_panchayat}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {record.locality}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          ₹{record.total_tax_annual?.toLocaleString("hi-IN")}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {record.id
                            ? new Date().toLocaleDateString("hi-IN")
                            : ""}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          <button
                            onClick={() => {
                              // Load this record into the form
                              const transformedData = {
                                state: record.state,
                                gramPanchayat: record.village_panchayat,
                                village: record.locality,
                                janpadPanchayat: record.janpad_panchayat,
                                district: record.district,
                                serial: record.auto_serial_no,
                                address: record.address,
                                memberId: record.samagra_id,
                                assetNumber: record.property_number,
                                ownerName: record.owner_name,
                                consumerName: record.consumer_name,
                                assetDetails: record.property_description,
                                constructionYear:
                                  record.building_year?.toString() || "",
                                areaPerSqFt: record.area_sqft?.toString() || "",
                                landValue:
                                  record.land_guideline_price?.toString() || "",
                                buildingValue:
                                  record.building_guideline_price?.toString() ||
                                  "",
                                constructionValue:
                                  record.construction_guideline_price?.toString() ||
                                  "",
                                depreciationRate:
                                  record.depreciation_percent?.toString() || "",
                                intendedUse: record.intended_use,
                                afterDepreciationValue:
                                  record.post_depreciation_value?.toString() ||
                                  "",
                                taxableValue:
                                  record.tax_cash_value?.toString() || "",
                                propertyTax:
                                  record.property_tax_annual?.toString() || "",
                                lightTax:
                                  record.lighting_tax_annual?.toString() || "",
                                cleaningTax:
                                  record.cleaning_tax_annual?.toString() || "",
                                waterTax:
                                  record.water_tax_annual?.toString() || "",
                                totalAnnual:
                                  record.total_tax_annual?.toString() || "",
                                appealPropertyTax:
                                  record.property_tax_appeal?.toString() || "",
                                appealLightTax:
                                  record.lighting_tax_appeal?.toString() || "",
                                appealCleaningTax:
                                  record.cleaning_tax_appeal?.toString() || "",
                                appealWaterTax:
                                  record.water_tax_appeal?.toString() || "",
                                totalAppeal:
                                  record.total_tax_appeal?.toString() || "",
                                remarks: record.remarks_on_change || "",
                                toilet: record.has_toilet ? "हाँ" : "नहीं",
                                chaturmasi: record.chaturmasi || "",
                                east: record.boundary_east || "",
                                west: record.boundary_west || "",
                                north: record.boundary_north || "",
                                south: record.boundary_south || "",
                              };

                              // Set all form fields
                              Object.entries(transformedData).forEach(
                                ([key, value]) => {
                                  updateField(
                                    key as keyof typeof transformedData,
                                    value
                                  );
                                }
                              );

                              setActiveTab("display");
                            }}
                            className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                          >
                            देखें
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className="flex justify-center mt-8">
              <button
                onClick={loadSavedRecords}
                className="px-6 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors duration-200"
                disabled={loadingRecords}
              >
                {loadingRecords ? "लोड हो रहा है..." : "रिफ्रेश करें"}
              </button>
            </div>
          </div>
        )}

        {/* Hidden Printable Document for PDF generation */}
        <div style={{ display: "none" }}>
          <PrintableDocument data={formData} />
        </div>
      </div>
    </div>
  );
}

export default App;
