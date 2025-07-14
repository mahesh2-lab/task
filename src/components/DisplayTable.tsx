import React from 'react';
import { FormData } from '../types/FormData';

interface DisplayTableProps {
  data: FormData;
}

export const DisplayTable: React.FC<DisplayTableProps> = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <div className="flex justify-between mb-6 p-4 bg-gray-50 rounded-lg border">
        <div className="space-y-2">
          <div><strong>ग्राम पंचायत:</strong> {data.gramPanchayat || '-'}</div>
          <div><strong>गाव/मोहल्ला:</strong> {data.village || '-'}</div>
        </div>
        <div className="space-y-2">
          <div><strong>जनपद पंचायत:</strong> {data.janpadPanchayat || '-'}</div>
          <div><strong>जिला:</strong> {data.district || '-'}</div>
        </div>
      </div>

      <table className="w-full border-collapse border border-gray-300 text-sm">
        <thead>
          <tr>
            <td colSpan={9} className="text-center bg-gray-300 border border-gray-400 p-2"></td>
            <td colSpan={3} className="text-center bg-gray-300 border border-gray-400 p-2 font-semibold">
              गाइड लाइन की कीमत
            </td>
            <td colSpan={2} className="bg-gray-300 border border-gray-400 p-2"></td>
          </tr>
          <tr className="bg-gray-200">
            <th className="border border-gray-400 p-2">अ. क्र</th>
            <th className="border border-gray-400 p-2">पता</th>
            <th className="border border-gray-400 p-2">समग्र सदस्य आयडी</th>
            <th className="border border-gray-400 p-2">परिसंपत्ति क्रमांक</th>
            <th className="border border-gray-400 p-2">मालिक का नाम</th>
            <th className="border border-gray-400 p-2">उपभोक्ता का नाम</th>
            <th className="border border-gray-400 p-2">परिसंपत्ति का विवरण</th>
            <th className="border border-gray-400 p-2">भवन निर्माण साल</th>
            <th className="border border-gray-400 p-2">वर्ग फिट प्रतिवर्ग</th>
            <th className="border border-gray-400 p-2">भूमि</th>
            <th className="border border-gray-400 p-2">इमारत</th>
            <th className="border border-gray-400 p-2">निर्माण</th>
            <th className="border border-gray-400 p-2">मूल्य ह्रास के प्रतिशत</th>
            <th className="border border-gray-400 p-2">निर्माण इरादा उपयोग</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td rowSpan={4} className="border border-gray-400 p-2 text-center">{data.serial || '1'}</td>
            <td rowSpan={4} className="border border-gray-400 p-2 text-center">{data.address || '-'}</td>
            <td rowSpan={4} className="border border-gray-400 p-2 text-center">{data.memberId || '-'}</td>
            <td rowSpan={4} className="border border-gray-400 p-2 text-center">{data.assetNumber || '-'}</td>
            <td className="border border-gray-400 p-2 text-left">{data.ownerName || '-'}</td>
            <td className="border border-gray-400 p-2 text-left">{data.consumerName || '-'}</td>
            <td className="border border-gray-400 p-2 text-left">{data.assetDetails || '-'}</td>
            <td className="border border-gray-400 p-2 text-center">{data.constructionYear || '-'}</td>
            <td className="border border-gray-400 p-2 text-center">{data.areaPerSqFt || '-'}</td>
            <td className="border border-gray-400 p-2 text-center">{data.landValue || '-'}</td>
            <td className="border border-gray-400 p-2 text-center">{data.buildingValue || '-'}</td>
            <td className="border border-gray-400 p-2 text-center">{data.constructionValue || '-'}</td>
            <td rowSpan={4} className="border border-gray-400 p-2 text-center">{data.depreciationRate || '-'}</td>
            <td rowSpan={4} className="border border-gray-400 p-2 text-center">{data.intendedUse || '-'}</td>
          </tr>
          {[...Array(3)].map((_, index) => (
            <tr key={index}>
              <td className="border border-gray-400 p-2"></td>
              <td className="border border-gray-400 p-2"></td>
              <td className="border border-gray-400 p-2"></td>
              <td className="border border-gray-400 p-2"></td>
              <td className="border border-gray-400 p-2"></td>
              <td className="border border-gray-400 p-2"></td>
              <td className="border border-gray-400 p-2"></td>
              <td className="border border-gray-400 p-2"></td>
              <td className="border border-gray-400 p-2"></td>
            </tr>
          ))}
        </tbody>
      </table>

      <table className="w-full border-collapse border border-gray-300 text-sm mt-4">
        <thead>
          <tr>
            <td colSpan={2} className="text-center bg-gray-300 border border-gray-400 p-2"></td>
            <td colSpan={5} className="text-center bg-gray-300 border border-gray-400 p-2 font-semibold">
              वार्षिक संपत्ती कर भुगतान राशि (रुपये)
            </td>
            <td colSpan={5} className="text-center bg-gray-300 border border-gray-400 p-2 font-semibold">
              अपील निर्णय या परिवर्तन (रुपये)
            </td>
            <td colSpan={2} className="text-center bg-gray-300 border border-gray-400 p-2"></td>
          </tr>
          <tr className="bg-gray-200">
            <th className="border border-gray-400 p-2">मूल्य ह्रास के बाद की किमत</th>
            <th className="border border-gray-400 p-2">कर की मूल्य (रोकड़)</th>
            <th className="border border-gray-400 p-2">संपत्ती कर</th>
            <th className="border border-gray-400 p-2">प्रकाश कर</th>
            <th className="border border-gray-400 p-2">सफाई कर</th>
            <th className="border border-gray-400 p-2">जल कर</th>
            <th className="border border-gray-400 p-2">कुल</th>
            <th className="border border-gray-400 p-2">संपत्ती कर</th>
            <th className="border border-gray-400 p-2">प्रकाश कर</th>
            <th className="border border-gray-400 p-2">सफाई कर</th>
            <th className="border border-gray-400 p-2">जल कर</th>
            <th className="border border-gray-400 p-2">कुल</th>
            <th colSpan={2} className="border border-gray-400 p-2">बाद में विकास या कमी के मामले में आदेश प्रसंग में टिप्पणी</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-400 p-2 text-center">{data.afterDepreciationValue || '-'}</td>
            <td className="border border-gray-400 p-2 text-center">{data.taxableValue || '-'}</td>
            <td className="border border-gray-400 p-2 text-center">{data.propertyTax || '-'}</td>
            <td className="border border-gray-400 p-2 text-center">{data.lightTax || '-'}</td>
            <td className="border border-gray-400 p-2 text-center">{data.cleaningTax || '-'}</td>
            <td className="border border-gray-400 p-2 text-center">{data.waterTax || '-'}</td>
            <td className="border border-gray-400 p-2 text-center">{data.totalAnnual || '-'}</td>
            <td className="border border-gray-400 p-2 text-center">{data.appealPropertyTax || '-'}</td>
            <td className="border border-gray-400 p-2 text-center">{data.appealLightTax || '-'}</td>
            <td className="border border-gray-400 p-2 text-center">{data.appealCleaningTax || '-'}</td>
            <td className="border border-gray-400 p-2 text-center">{data.appealWaterTax || '-'}</td>
            <td className="border border-gray-400 p-2 text-center">{data.totalAppeal || '-'}</td>
            <td colSpan={2} className="border border-gray-400 p-2 text-left">{data.remarks || '-'}</td>
          </tr>
          <tr>
            {[...Array(14)].map((_, index) => (
              <td key={index} className="border border-gray-400 p-2"></td>
            ))}
          </tr>
        </tbody>
      </table>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg border space-y-2">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
          <span><strong>शौचालय:</strong> {data.toilet || '-'}</span>
          <span><strong>चतुर्मासी:</strong> {data.chaturmasi || '-'}</span>
          <span><strong>पूर्व:</strong> {data.east || '-'}</span>
          <span><strong>पश्चिम:</strong> {data.west || '-'}</span>
          <span><strong>उत्तर:</strong> {data.north || '-'}</span>
          <span><strong>दक्षिण:</strong> {data.south || '-'}</span>
        </div>
      </div>
    </div>
  );
};