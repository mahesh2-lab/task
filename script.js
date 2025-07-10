
// Show active tab
function showTab(tabName) {
  const tabs = document.querySelectorAll('.tab');
  tabs.forEach(tab => tab.classList.remove('active'));

  if (tabName === 'form') {
    document.querySelector('.tab:first-child').classList.add('active');
    document.getElementById('form-container').style.display = 'block';
    document.getElementById('display-container').style.display = 'none';
  } else {
    document.querySelector('.tab:last-child').classList.add('active');
    document.getElementById('form-container').style.display = 'none';
    document.getElementById('display-container').style.display = 'block';
  }
}

// Calculate totals
function calculateTotals() {
  const propertyTax = parseFloat(document.getElementById('propertyTax').value) || 0;
  const lightTax = parseFloat(document.getElementById('lightTax').value) || 0;
  const cleaningTax = parseFloat(document.getElementById('cleaningTax').value) || 0;
  const waterTax = parseFloat(document.getElementById('waterTax').value) || 0;
  const totalAnnual = propertyTax + lightTax + cleaningTax + waterTax;
  document.getElementById('totalAnnual').value = totalAnnual.toFixed(2);

  const appealPropertyTax = parseFloat(document.getElementById('appealPropertyTax').value) || 0;
  const appealLightTax = parseFloat(document.getElementById('appealLightTax').value) || 0;
  const appealCleaningTax = parseFloat(document.getElementById('appealCleaningTax').value) || 0;
  const appealWaterTax = parseFloat(document.getElementById('appealWaterTax').value) || 0;
  const totalAppeal = appealPropertyTax + appealLightTax + appealCleaningTax + appealWaterTax;
  document.getElementById('totalAppeal').value = totalAppeal.toFixed(2);
}

// Attach event listeners for tax fields
const taxFields = [
  'propertyTax', 'lightTax', 'cleaningTax', 'waterTax',
  'appealPropertyTax', 'appealLightTax', 'appealCleaningTax', 'appealWaterTax'
];

taxFields.forEach(field => {
  document.getElementById(field).addEventListener('input', calculateTotals);
});

// Submit form
function submitForm() {



  // Get all input values
  const formData = {};
  const inputIds = [
    'gramPanchayat', 'village', 'janpadPanchayat', 'district', 'serial', 'address',
    'memberId', 'assetNumber', 'ownerName', 'consumerName', 'assetDetails',
    'constructionYear', 'areaPerSqFt', 'landValue', 'buildingValue', 'constructionValue',
    'depreciationRate', 'intendedUse', 'afterDepreciationValue', 'taxableValue',
    'propertyTax', 'lightTax', 'cleaningTax', 'waterTax', 'totalAnnual',
    'appealPropertyTax', 'appealLightTax', 'appealCleaningTax', 'appealWaterTax', 'totalAppeal',
    'remarks', 'toilet', 'chaturmasi', 'east', 'west', 'north', 'south'
  ];

  inputIds.forEach(id => {
    formData[id] = document.getElementById(id).value;
  });

  // Update display with form data
  inputIds.forEach(id => {
    const displayElement = document.getElementById(`display-${id}`);
    if (displayElement) {
      displayElement.textContent = formData[id];
    }
  });

  // Show the display tab
  showTab('display');
}

// Download as PDF
function downloadPDF() {
  const element = document.getElementById('printdata');
  
  // Hide the PDF button during capture
  const pdfBtn = document.querySelector('.pdf-btn');
  const originalBtnDisplay = pdfBtn.style.display;
  pdfBtn.style.display = 'none';
  
  // Apply temporary styling to ensure content fits on one page
  const originalStyle = element.style.cssText;
  
  // Apply specific print styles
  element.style.width = '100%';
  element.style.maxWidth = '1100px';
  element.style.margin = '0';
  element.style.padding = '0';
  
  // Set temporary styles on the table to ensure it fits properly
  const table = document.getElementById('taxTable');
  const originalTableStyle = table.style.cssText;
  table.style.width = '100%';
  table.style.tableLayout = 'fixed';
  table.style.fontSize = '11px';
  
  // Apply more specific positioning styles
  element.style.position = 'relative';
  element.style.top = '-20px'; // Move content up
  
  html2pdf().set({
        margin: [0, 0, 20, 0], // [top, right, bottom, left] - add 20px bottom margin
        filename: 'property_tax_document.pdf',
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { 
          scale: 1.5,
          useCORS: true,
          logging: false,
          letterRendering: true,
          y: -10 // Shift the capture area up by 10px
        },
        jsPDF: { 
          unit: 'mm', 
          format: 'a4', 
          orientation: 'landscape',
          compress: true
        }
    }).from(element).save().then(() => {
      // Restore original styles after PDF generation
      element.style.cssText = originalStyle;
      element.style.position = ''; // Explicitly reset position
      element.style.top = ''; // Explicitly reset top
      table.style.cssText = originalTableStyle;
      pdfBtn.style.display = originalBtnDisplay;
    });
}

// Initialize page
document.addEventListener('DOMContentLoaded', function () {
  showTab('form');
  calculateTotals();
});
