
import React from 'react';

// URL logo từ người dùng cung cấp
// Lưu ý: Để ảnh hiện lên, nên dùng link ảnh trực tiếp. 
export const LOGO_URL: string = "https://photos.app.goo.gl/KEACz4Zj5SrbNQMq9"; 

export const RANKS = [
  'Binh nhì',
  'Binh nhất',
  'Hạ sĩ',
  'Trung sĩ',
  'Thượng sĩ'
];

export const RELATIONSHIPS = [
  'Bố',
  'Mẹ',
  'Vợ',
  'Chồng',
  'Anh/Chị/Em',
  'Ông/Bà',
  'Bạn bè',
  'Khác'
];

export const MilitaryLogo = () => {
  const [error, setError] = React.useState(false);

  return (
    <div className="relative w-28 h-28 mx-auto drop-shadow-2xl flex items-center justify-center bg-white rounded-full p-1 border-4 border-yellow-500 overflow-hidden mb-4">
      {!error ? (
        <img 
          src={LOGO_URL} 
          alt="Logo đơn vị" 
          className="max-w-full max-h-full object-contain"
          onError={() => setError(true)}
        />
      ) : (
        <div className="w-full h-full bg-red-700 flex flex-col items-center justify-center text-white border-2 border-yellow-400">
          <span className="text-3xl font-black">QS</span>
          <span className="text-[10px] font-bold uppercase tracking-tighter">Quân khu 4</span>
        </div>
      )}
    </div>
  );
};

export const RULES_CONTENT = [
  "Thân nhân khi đến thăm phải mang theo Căn cước công dân hoặc giấy tờ tùy thân có ảnh hợp lệ để làm thủ tục tại cổng.",
  "Chấp hành nghiêm chỉnh nội quy của đơn vị và sự hướng dẫn của lực lượng trực ban, bảo vệ.",
  "Tuyệt đối không mang theo chất cấm, chất dễ cháy nổ, vũ khí, rượu bia vào khu vực quân sự.",
  "Trang phục thăm gặp phải gọn gàng, lịch sự, văn minh (không mặc đồ quá ngắn hoặc hở hang).",
  "Thời gian thăm gặp: Duy nhất Chủ nhật hàng tuần, từ 07h00 đến 16h30.",
  "Giữ gìn vệ sinh chung, không vứt rác bừa bãi tại khu vực nhà khách và khuôn viên đơn vị."
];
