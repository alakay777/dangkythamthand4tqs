
import React from 'react';

// URL logo mới do người dùng cung cấp
export const LOGO_URL: string = "https://scontent.fhan5-7.fna.fbcdn.net/v/t39.30808-6/557952595_1136300445232379_4568003237823162771_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=vkb7Jz_tNqsQ7kNvwFFkS49&_nc_oc=Adnb21TV53rtlcxyOy3Oitu2nAmTqgqo_zbbweSSXaS9cGsMa7SR0y0hcxEw0p78OIxMHtpd9j-RTY-J9QvsS41i&_nc_zt=23&_nc_ht=scontent.fhan5-7.fna&_nc_gid=wjaATuh06_KsV-dFIlg2EQ&oh=00_Afry2N7ON7M_RUaQOzYi8PftXctUZlurQpQe4kl9elNuZw&oe=6970EB46"; 

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
    <div className="relative w-24 h-24 md:w-28 md:h-28 mx-auto drop-shadow-2xl flex items-center justify-center bg-white rounded-full p-1 border-4 border-yellow-500 overflow-hidden mb-4 shadow-[0_0_20px_rgba(234,179,8,0.3)]">
      {!error ? (
        <img 
          src={LOGO_URL} 
          alt="Logo đơn vị" 
          className="max-w-full max-h-full object-contain"
          onError={() => setError(true)}
        />
      ) : (
        <div className="w-full h-full bg-red-700 flex flex-col items-center justify-center text-white border-2 border-yellow-400">
          <span className="text-2xl md:text-3xl font-black leading-none">QS</span>
          <span className="text-[9px] md:text-[10px] font-black uppercase tracking-tighter mt-1">Quân khu 4</span>
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
  "Thời gian thăm gặp: Chủ nhật hàng tuần, từ 07h00 đến 16h30.",
  "Giữ gìn vệ sinh chung, không vứt rác bừa bãi tại khu vực nhà khách và khuôn viên đơn vị."
];
