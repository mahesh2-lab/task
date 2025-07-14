import React from "react";
import { FormData } from "../types/FormData";

interface PrintableDocumentProps {
  data: FormData;
}

export const PrintableDocument: React.FC<PrintableDocumentProps> = ({
  data,
}) => {
  const containerStyle: React.CSSProperties = {
    fontFamily: "Arial, sans-serif",
    margin: 0,
    padding: "20px",
    backgroundColor: "#f5f5f5",
  };

  const documentStyle: React.CSSProperties = {
    backgroundColor: "white",
    maxWidth: "1300px",
    margin: "0 auto",
    padding: "20px",
    border: "1px solid #ddd",
  };

  const headerTextStyle: React.CSSProperties = {
    textAlign: "center",
    fontSize: "12px",
    marginBottom: "10px",
    lineHeight: 1.4,
  };

  const titleStyle: React.CSSProperties = {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "14px",
    margin: "15px 0",
    textDecoration: "underline",
  };

  const subtitleStyle: React.CSSProperties = {
    textAlign: "center",
    fontSize: "12px",
    marginBottom: "15px",
  };

  const infoRowStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    margin: "5px 0",
    fontSize: "12px",
  };

  const mainTableStyle: React.CSSProperties = {
    width: "100%",
    borderCollapse: "collapse",
    margin: "15px 0",
    fontSize: "11px",
  };

  const bottomTableStyle: React.CSSProperties = {
    width: "100%",
    borderCollapse: "collapse",
    margin: "15px 0",
    fontSize: "11px",
  };

  const thTdStyle: React.CSSProperties = {
    border: "1px solid black",
    padding: "4px",
    textAlign: "center",
    verticalAlign: "middle",
  };

  const thStyle: React.CSSProperties = {
    ...thTdStyle,
    backgroundColor: "#f0f0f0",
    fontWeight: "bold",
  };

  const footerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "30px",
    fontSize: "12px",
  };

  const signatureSectionStyle: React.CSSProperties = {
    textAlign: "right",
    fontWeight: "bold",
  };

  // Helper function to format numbers with commas
  const formatNumber = (value: string | number) => {
    if (!value) return "";
    const num = Number(value);
    return num.toLocaleString("hi-IN");
  };

  return (
    <div style={containerStyle}>
      <div id="printable-document" style={documentStyle}>
        <div style={headerTextStyle}>
          सूचना :- ये प्रिंट आपत्ती एवं सुधार करणे हेतू दिया जा रहा है जो
          सुधारणा करांनी हो तो ग्राम पंचायत मे १५ दिन के अंदर बदलाव कराने के
          लिये ग्राम पंचायत से आवेदन के साथ संपर्क करे!
        </div>

        <div style={titleStyle}>
          ग्राम पंचायत संपत्ती कर माँग पत्रक (असेसमेंट लिस्ट)
        </div>

        <div style={subtitleStyle}>
          {data.state} ग्राम पंचायत अनिवार्य कर तथा फीस (शर्त तथा अपवाद) धारा 77
          नियम 1996
        </div>

        <div style={infoRowStyle}>
          <p>
            <span>ग्राम पंचायत:</span>
            <span>{data.gramPanchayat || "रानी पिपरिया"}</span>
          </p>
          <p>
            <span>जनपद पंचायत :</span>
            <span>{data.janpadPanchayat || "सोहागपुर"}</span>
          </p>
        </div>

        <div style={infoRowStyle}>
          <p>
            <span>गाव/मोहल्ला :</span>
            <span>{data.village || "व्यवसायिक प्रयोजन"}</span>
          </p>

          <p>
            सन 2020-2021 से 2024-2025 तक के लिए प्रतिवर्ष भूमी एवं भवनो का कर
            मुल्यांकन अभिलेख (असेसमेंट लिस्ट)
          </p>

          <p>
            जिला : <span>{data.district || "शहडोल"}</span>
          </p>
        </div>

        <table style={mainTableStyle}>
          <thead>
            <tr>
              <th style={{ ...thStyle, width: "40px" }} rowSpan={2}>
                अ.क्र.
              </th>
              <th style={{ ...thStyle, width: "40px" }} rowSpan={2}>
                पता
              </th>
              <th style={{ ...thStyle, width: "40px" }} rowSpan={2}>
                समग्र सदस्य आईडी
              </th>
              <th style={{ ...thStyle, width: "40px" }} rowSpan={2}>
                परीसंपत्ती क्रमांक
              </th>
              <th style={{ ...thStyle, width: "100px" }} rowSpan={2}>
                मालिक का नाम
              </th>
              <th style={{ ...thStyle, width: "100px" }} rowSpan={2}>
                उपभोक्ता का नाम
              </th>
              <th style={{ ...thStyle, width: "100px" }} rowSpan={2}>
                परीसंपत्ती का विवरण
              </th>
              <th style={{ ...thStyle, width: "40px" }} rowSpan={2}>
                भवन निर्माण साल
              </th>
              <th style={{ ...thStyle, width: "40px" }} rowSpan={2}>
                वर्ग फिट प्रतिवर्ग
              </th>
              <th style={{ ...thStyle, width: "40px" }} colSpan={3}>
                गाईड लाईन कि किमत
              </th>
              <th style={{ ...thStyle, width: "40px" }} rowSpan={2}>
                मूल्य हास के प्रतिशत
              </th>
              <th style={{ ...thStyle, width: "40px" }} rowSpan={2}>
                निर्माण इरादा उपयोग
              </th>
            </tr>
            <tr>
              <th style={thStyle}>भूमी</th>
              <th style={thStyle}>इमारत</th>
              <th style={thStyle}>निर्माण</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={thTdStyle}>1</td>
              <td style={thTdStyle}>2</td>
              <td style={thTdStyle}>3</td>
              <td style={thTdStyle}>4</td>
              <td style={thTdStyle}>5</td>
              <td style={thTdStyle}>6</td>
              <td style={thTdStyle}>7</td>
              <td style={thTdStyle}>8</td>
              <td style={thTdStyle}>9</td>
              <td style={thTdStyle}>10</td>
              <td style={thTdStyle}>11</td>
              <td style={thTdStyle}>12</td>
              <td style={thTdStyle}>13</td>
              <td style={thTdStyle}>14</td>
            </tr>
            <tr style={{ height: "150px" }}>
              <td style={thTdStyle}>1</td>
              <td style={thTdStyle}>{data.address || ""}</td>
              <td style={thTdStyle}>{data.memberId || ""}</td>
              <td style={thTdStyle}>{data.assetNumber || "1"}</td>
              <td style={thTdStyle}>
                {data.ownerName || "श्री नन्हू महाराज लॉजिस्टिक"}
              </td>
              <td style={thTdStyle}>
                {data.consumerName || "श्रीमती रजनी रावत"}
                <br />
                {data.consumerName ? "" : "पत्नी नरेन्द्र रावत"}
              </td>
              <td style={thTdStyle}>
                {data.assetDetails || "खुली जगह व नजदीक प्रकार 1"}
              </td>
              <td style={thTdStyle}>{data.constructionYear || "2021"}</td>
              <td style={thTdStyle}>
                {data.areaPerSqFt ? `${data.areaPerSqFt} x 01` : "5018 x 01"}
              </td>
              <td style={thTdStyle}>
                {formatNumber(data.landValue) || "1000"}
              </td>
              <td style={thTdStyle}></td>
              <td style={thTdStyle}>
                {data.constructionValue
                  ? `${formatNumber(data.constructionValue)} - (${Math.floor(
                      Number(data.constructionValue) / 10
                    )} x 01)`
                  : "11400 - (1100 x 01)"}
              </td>
              <td style={thTdStyle}>{data.depreciationRate || "95"}</td>
              <td style={thTdStyle}>{data.intendedUse || "1"}</td>
            </tr>
            <tr>
              <td style={thTdStyle}></td>
              <td style={thTdStyle}></td>
              <td style={thTdStyle}></td>
              <td style={thTdStyle}></td>
              <td style={thTdStyle}></td>
              <td style={thTdStyle}></td>
              <td style={thTdStyle}></td>
              <td style={thTdStyle}></td>
              <td style={thTdStyle}></td>
              <td style={thTdStyle}>
                {data.landValue && data.areaPerSqFt
                  ? (
                      Number(data.landValue) * Number(data.areaPerSqFt)
                    ).toLocaleString("hi-IN")
                  : "3918000"}
              </td>
              <td style={thTdStyle}>0</td>
              <td style={thTdStyle}>
                {data.constructionValue && data.areaPerSqFt
                  ? (
                      Number(data.constructionValue) * Number(data.areaPerSqFt)
                    ).toLocaleString("hi-IN")
                  : "12540000"}
              </td>
              <td style={thTdStyle}></td>
              <td style={thTdStyle}></td>
            </tr>
          </tbody>
        </table>

        <table style={bottomTableStyle}>
          <thead>
            <tr>
              <th style={thStyle} rowSpan={2}>
                मूल्य :हास के बाद कि किमत
              </th>
              <th style={thStyle} rowSpan={2}>
                कर की मूल्य (रोकड)
              </th>
              <th style={thStyle} colSpan={5}>
                वार्षिक सम्पत्ति कर भुगतान राशि (रुपये)
              </th>
              <th style={thStyle} colSpan={5}>
                अपील निर्णय वा परिवर्तन (रुपये)
              </th>
              <th style={thStyle} rowSpan={2}>
                बाद मे विकास या कमी के मामले में आदेश पसंग मे टिप्पणी
              </th>
            </tr>
            <tr>
              <th style={thStyle}>संपत्ति कर</th>
              <th style={thStyle}>प्रकाश कर</th>
              <th style={thStyle}>सफाई कर</th>
              <th style={thStyle}>जल कर</th>
              <th style={thStyle}>कुल</th>
              <th style={thStyle}>संपत्ति कर</th>
              <th style={thStyle}>प्रकाश कर</th>
              <th style={thStyle}>सफाई कर</th>
              <th style={thStyle}>जल कर</th>
              <th style={thStyle}>कुल</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={thTdStyle}>15</td>
              <td style={thTdStyle}>16</td>
              <td style={thTdStyle}>17</td>
              <td style={thTdStyle}>18</td>
              <td style={thTdStyle}>19</td>
              <td style={thTdStyle}>20</td>
              <td style={thTdStyle}>21</td>
              <td style={thTdStyle}>22</td>
              <td style={thTdStyle}>23</td>
              <td style={thTdStyle}>24</td>
              <td style={thTdStyle}>25</td>
              <td style={thTdStyle}>26</td>
              <td style={thTdStyle}>27</td>
            </tr>
            <tr style={{ height: "150px" }}>
              <td style={thTdStyle}>
                {formatNumber(data.afterDepreciationValue) || "3,918,000"}
              </td>
              <td style={thTdStyle}>{data.taxableValue || "2"}</td>
              <td style={thTdStyle}>
                {formatNumber(data.propertyTax) || "7836"}
              </td>
              <td style={thTdStyle}>{formatNumber(data.lightTax) || "0"}</td>
              <td style={thTdStyle}>
                {formatNumber(data.cleaningTax) || "240"}
              </td>
              <td style={thTdStyle}>{formatNumber(data.waterTax) || "240"}</td>
              <td style={thTdStyle}>
                {formatNumber(data.totalAnnual) || "240"}
              </td>
              <td style={thTdStyle}>
                {formatNumber(data.appealPropertyTax) || "240"}
              </td>
              <td style={thTdStyle}>
                {formatNumber(data.appealLightTax) || "240"}
              </td>
              <td style={thTdStyle}>
                {formatNumber(data.appealCleaningTax) || "240"}
              </td>
              <td style={thTdStyle}>
                {formatNumber(data.appealWaterTax) || "240"}
              </td>
              <td style={thTdStyle}>
                {formatNumber(data.totalAppeal) || "240"}
              </td>
              <td style={thTdStyle}>{data.remarks || "240"}</td>
            </tr>
            <tr>
              <td style={thTdStyle}>16931000</td>
              <td style={thTdStyle}></td>
              <td style={thTdStyle}>33862</td>
              <td style={thTdStyle}>0</td>
              <td style={thTdStyle}>240</td>
              <td style={thTdStyle}>0</td>
              <td style={thTdStyle}>34102</td>
              <td style={thTdStyle}></td>
              <td style={thTdStyle}></td>
              <td style={thTdStyle}></td>
              <td style={thTdStyle}></td>
              <td style={thTdStyle}></td>
              <td style={thTdStyle}></td>
            </tr>
          </tbody>
        </table>

        <div style={footerStyle}>
          <p>
            <span>शौचालय: </span>
            <span>{data.toilet || ""}</span>
          </p>
          <p>
            <span>चतुर्सिमा: </span>
            <span>{data.chaturmasi || ""}</span>
          </p>
          <p>
            <span>पूर्व : </span>
            <span>{data.east || ""}</span>
          </p>
          <p>
            <span>पश्चिम : </span>
            <span>{data.west || ""}</span>
          </p>
          <p>
            <span>उत्तर : </span>
            <span>{data.north || ""}</span>
          </p>
          <p>
            <span>दक्षिण : </span>
            <span>{data.south || ""}</span>
          </p>
        </div>

        <div style={footerStyle}>
          <div>
            <p>दिनांक : {new Date().toLocaleDateString("hi-IN")}</p>
          </div>
          <div>
            <p>ग्राम पंचायत का शील</p>
          </div>
          <div style={signatureSectionStyle}>
            <p>
              <strong>सरपंच /सचिव</strong>
            </p>
            <p>
              <strong>ग्राम पंचायत</strong> कर निर्धारण
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
