
import React, { useState } from 'react';
import { FormStep, RegistrationData, SoldierInfo, VisitorInfo } from './types';
import { MilitaryLogo, RANKS, RELATIONSHIPS, RULES_CONTENT } from './constants';
import StepIndicator from './components/StepIndicator';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<FormStep>(FormStep.Rules);
  const [regId, setRegId] = useState('');
  const [data, setData] = useState<RegistrationData>({
    agreedToRules: false,
    soldier: {
      fullName: '',
      dob: '',
      rank: RANKS[0],
      position: 'Học viên',
      homeTown: '',
    },
    visitor: {
      fullName: '',
      dob: '',
      idNumber: '',
      address: '',
      relationship: RELATIONSHIPS[0],
      visitorCount: 1,
      visitTime: '08:00',
    },
  });

  const nextStep = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentStep(prev => prev + 1);
  };
  const prevStep = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentStep(prev => prev - 1);
  };

  const handleSoldierChange = (field: keyof SoldierInfo, value: string) => {
    setData(prev => ({
      ...prev,
      soldier: { ...prev.soldier, [field]: value }
    }));
  };

  const handleVisitorChange = (field: keyof VisitorInfo, value: string | number) => {
    setData(prev => ({
      ...prev,
      visitor: { ...prev.visitor, [field]: value }
    }));
  };

  const handleSubmit = () => {
    // Tạo một mã đăng ký ngẫu nhiên để quản lý
    const randomId = 'TD4-' + Math.random().toString(36).substr(2, 6).toUpperCase();
    setRegId(randomId);
    console.log('Registration Submitted:', { ...data, regId: randomId });
    setCurrentStep(FormStep.Success);
  };

  return (
    <div className="min-h-screen bg-slate-100 py-6 md:py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
        
        {/* Header Section */}
        <div className="relative bg-gradient-to-br from-red-800 to-red-950 text-white py-10 text-center px-6 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>
          </div>
          
          <MilitaryLogo />
          
          <div className="relative z-10">
            <h2 className="text-3xl font-black tracking-[0.2em] uppercase mb-1 drop-shadow-md">Trường Quân Sự</h2>
            <h1 className="text-xl font-medium tracking-[0.3em] uppercase opacity-90">Tiểu Đoàn 4</h1>
            <div className="mt-4 flex justify-center items-center gap-2">
              <div className="h-[2px] w-12 bg-yellow-500"></div>
              <div className="w-2 h-2 rotate-45 bg-yellow-500"></div>
              <div className="h-[2px] w-12 bg-yellow-500"></div>
            </div>
          </div>
        </div>

        <div className="p-6 md:p-10">
          {currentStep !== FormStep.Success && <StepIndicator currentStep={currentStep} />}

          {/* PAGE 1: RULES */}
          {currentStep === FormStep.Rules && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-slate-800 uppercase tracking-tight">Quy định thăm thân</h3>
                <p className="text-slate-500 text-sm mt-1">Vui lòng đọc kỹ trước khi đăng ký</p>
              </div>
              
              <div className="bg-slate-50 rounded-2xl p-6 space-y-4 border border-slate-200 shadow-inner">
                {RULES_CONTENT.map((rule, idx) => (
                  <div key={idx} className="flex gap-4 text-sm text-slate-700 leading-relaxed items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-red-700 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-md">
                      {idx + 1}
                    </span>
                    <p className="pt-0.5">{rule}</p>
                  </div>
                ))}
              </div>

              <label className="flex items-center gap-4 p-5 bg-red-50/50 rounded-2xl cursor-pointer hover:bg-red-50 transition-all border-2 border-transparent hover:border-red-200">
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    className="peer h-6 w-6 cursor-pointer appearance-none rounded-md border border-slate-300 bg-white checked:bg-red-700 checked:border-red-700 transition-all"
                    checked={data.agreedToRules}
                    onChange={(e) => setData({ ...data, agreedToRules: e.target.checked })}
                  />
                  <svg className="absolute h-4 w-4 text-white opacity-0 peer-checked:opacity-100 top-1 left-1 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <span className="text-sm font-bold text-slate-800">
                  Tôi đã đọc, hiểu và cam kết thực hiện đúng các quy định trên.
                </span>
              </label>

              <button
                disabled={!data.agreedToRules}
                onClick={nextStep}
                className={`w-full py-4 rounded-2xl font-bold text-lg shadow-xl transition-all transform active:scale-95 ${
                  data.agreedToRules 
                    ? 'bg-red-700 hover:bg-red-800 text-white cursor-pointer shadow-red-200' 
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                }`}
              >
                TIẾP THEO
              </button>
            </div>
          )}

          {/* PAGE 2: SOLDIER INFO */}
          {currentStep === FormStep.SoldierInfo && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-slate-800 uppercase tracking-tight">Thông tin Quân nhân</h3>
                <p className="text-slate-500 text-sm mt-1">Điền thông tin học viên cần gặp</p>
              </div>
              
              <div className="grid gap-5">
                <div className="group">
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">Họ và tên</label>
                  <input
                    type="text"
                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-2 border-slate-100 focus:border-red-500 focus:bg-white outline-none transition-all text-slate-800 font-medium"
                    placeholder="Ví dụ: Nguyễn Văn A"
                    value={data.soldier.fullName}
                    onChange={(e) => handleSoldierChange('fullName', e.target.value)}
                  />
                </div>

                <div className="group">
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">Ngày tháng năm sinh</label>
                  <input
                    type="date"
                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-2 border-slate-100 focus:border-red-500 focus:bg-white outline-none transition-all text-slate-800 font-medium"
                    value={data.soldier.dob}
                    onChange={(e) => handleSoldierChange('dob', e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">Cấp bậc</label>
                    <select
                      className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-2 border-slate-100 focus:border-red-500 focus:bg-white outline-none transition-all text-slate-800 font-medium appearance-none"
                      value={data.soldier.rank}
                      onChange={(e) => handleSoldierChange('rank', e.target.value)}
                    >
                      {RANKS.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">Chức vụ</label>
                    <input
                      type="text"
                      disabled
                      className="w-full px-5 py-4 rounded-2xl bg-slate-100 border-2 border-slate-100 text-slate-400 font-bold"
                      value={data.soldier.position}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">Trú quán</label>
                  <textarea
                    rows={3}
                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-2 border-slate-100 focus:border-red-500 focus:bg-white outline-none transition-all text-slate-800 font-medium resize-none"
                    placeholder="Địa chỉ thường trú..."
                    value={data.soldier.homeTown}
                    onChange={(e) => handleSoldierChange('homeTown', e.target.value)}
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button onClick={prevStep} className="flex-1 py-4 border-2 border-slate-200 rounded-2xl font-bold text-slate-500 hover:bg-slate-50 transition-all">
                  QUAY LẠI
                </button>
                <button
                  onClick={nextStep}
                  disabled={!data.soldier.fullName || !data.soldier.dob || !data.soldier.homeTown}
                  className="flex-1 py-4 bg-red-700 hover:bg-red-800 text-white rounded-2xl font-bold shadow-xl disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none transition-all active:scale-95"
                >
                  TIẾP THEO
                </button>
              </div>
            </div>
          )}

          {/* PAGE 3: VISITOR INFO */}
          {currentStep === FormStep.VisitorInfo && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-slate-800 uppercase tracking-tight">Thông tin Thân nhân</h3>
                <p className="text-slate-500 text-sm mt-1">Thông tin người đại diện đăng ký gặp</p>
              </div>
              
              <div className="grid gap-5">
                <div>
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">Họ và tên</label>
                  <input
                    type="text"
                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-2 border-slate-100 focus:border-red-500 focus:bg-white outline-none transition-all text-slate-800 font-medium"
                    placeholder="Họ tên người đi thăm"
                    value={data.visitor.fullName}
                    onChange={(e) => handleVisitorChange('fullName', e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">Ngày sinh</label>
                    <input
                      type="date"
                      className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-2 border-slate-100 focus:border-red-500 focus:bg-white outline-none transition-all text-slate-800 font-medium"
                      value={data.visitor.dob}
                      onChange={(e) => handleVisitorChange('dob', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">Số CCCD</label>
                    <input
                      type="text"
                      maxLength={12}
                      className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-2 border-slate-100 focus:border-red-500 focus:bg-white outline-none transition-all text-slate-800 font-medium"
                      placeholder="12 chữ số"
                      value={data.visitor.idNumber}
                      onChange={(e) => handleVisitorChange('idNumber', e.target.value.replace(/\D/g, ''))}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">Nơi ở hiện nay</label>
                  <input
                    type="text"
                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-2 border-slate-100 focus:border-red-500 focus:bg-white outline-none transition-all text-slate-800 font-medium"
                    placeholder="Địa chỉ thường trú/tạm trú"
                    value={data.visitor.address}
                    onChange={(e) => handleVisitorChange('address', e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">Mối quan hệ</label>
                    <select
                      className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-2 border-slate-100 focus:border-red-500 focus:bg-white outline-none transition-all text-slate-800 font-medium"
                      value={data.visitor.relationship}
                      onChange={(e) => handleVisitorChange('relationship', e.target.value)}
                    >
                      {RELATIONSHIPS.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">Số lượng người</label>
                    <input
                      type="number"
                      min={1}
                      max={10}
                      className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-2 border-slate-100 focus:border-red-500 focus:bg-white outline-none transition-all text-slate-800 font-medium"
                      value={data.visitor.visitorCount}
                      onChange={(e) => handleVisitorChange('visitorCount', parseInt(e.target.value) || 1)}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">Thời gian đăng ký gặp (7:00 - 16:30)</label>
                  <input
                    type="time"
                    min="07:00"
                    max="16:30"
                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-2 border-slate-100 focus:border-red-500 focus:bg-white outline-none transition-all text-slate-800 font-medium"
                    value={data.visitor.visitTime}
                    onChange={(e) => handleVisitorChange('visitTime', e.target.value)}
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button onClick={prevStep} className="flex-1 py-4 border-2 border-slate-200 rounded-2xl font-bold text-slate-500 hover:bg-slate-50 transition-all">
                  QUAY LẠI
                </button>
                <button
                  onClick={nextStep}
                  disabled={!data.visitor.fullName || !data.visitor.idNumber || !data.visitor.address}
                  className="flex-1 py-4 bg-red-700 hover:bg-red-800 text-white rounded-2xl font-bold shadow-xl disabled:bg-slate-200 disabled:text-slate-400 transition-all active:scale-95"
                >
                  XÁC NHẬN
                </button>
              </div>
            </div>
          )}

          {/* PAGE 4: REVIEW */}
          {currentStep === FormStep.Review && (
            <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-slate-800 uppercase tracking-tight">Xác nhận thông tin</h3>
                <p className="text-slate-500 text-sm mt-1">Vui lòng kiểm tra kỹ trước khi gửi</p>
              </div>
              
              <div className="grid gap-6">
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 relative">
                  <div className="absolute top-4 right-6 text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Học viên</div>
                  <h4 className="font-black text-red-800 mb-4 uppercase text-xs tracking-widest flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-800"></span>
                    Thông tin Quân nhân
                  </h4>
                  <div className="grid grid-cols-2 gap-y-3 text-sm">
                    <span className="text-slate-500">Họ tên:</span>
                    <span className="font-bold text-slate-800">{data.soldier.fullName}</span>
                    <span className="text-slate-500">Ngày sinh:</span>
                    <span className="font-bold text-slate-800">{data.soldier.dob}</span>
                    <span className="text-slate-500">Cấp bậc:</span>
                    <span className="font-bold text-slate-800">{data.soldier.rank}</span>
                    <span className="text-slate-500">Trú quán:</span>
                    <span className="font-bold text-slate-800">{data.soldier.homeTown}</span>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 relative">
                  <div className="absolute top-4 right-6 text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Đăng ký</div>
                  <h4 className="font-black text-red-800 mb-4 uppercase text-xs tracking-widest flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-800"></span>
                    Thông tin Thân nhân
                  </h4>
                  <div className="grid grid-cols-2 gap-y-3 text-sm">
                    <span className="text-slate-500">Họ tên:</span>
                    <span className="font-bold text-slate-800">{data.visitor.fullName}</span>
                    <span className="text-slate-500">Số CCCD:</span>
                    <span className="font-bold text-slate-800 tracking-wider">{data.visitor.idNumber}</span>
                    <span className="text-slate-500">Quan hệ:</span>
                    <span className="font-bold text-slate-800">{data.visitor.relationship}</span>
                    <span className="text-slate-500">Số người:</span>
                    <span className="font-bold text-slate-800">{data.visitor.visitorCount} người</span>
                    <span className="text-slate-500">Thời gian:</span>
                    <span className="font-bold text-red-700 bg-red-50 px-2 rounded">{data.visitor.visitTime} (Chủ nhật)</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button onClick={prevStep} className="flex-1 py-4 border-2 border-slate-200 rounded-2xl font-bold text-slate-500 hover:bg-slate-50 transition-all">
                  SỬA LẠI
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-[2] py-4 bg-red-700 hover:bg-red-800 text-white rounded-2xl font-bold shadow-xl shadow-red-100 transition-all active:scale-95 text-lg"
                >
                  GỬI ĐĂNG KÝ
                </button>
              </div>
            </div>
          )}

          {/* PAGE 5: SUCCESS */}
          {currentStep === FormStep.Success && (
            <div className="text-center py-8 space-y-8 animate-in fade-in zoom-in-90 duration-700">
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-green-100 rounded-full scale-150 animate-ping opacity-20"></div>
                <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto relative z-10 shadow-inner">
                  <svg className="w-14 h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-3xl font-black text-slate-800 tracking-tight">Đăng ký thành công!</h3>
                <div className="flex items-center justify-center gap-2 text-red-700 font-black text-lg bg-red-50 py-2 px-4 rounded-full w-fit mx-auto border border-red-100">
                  <span className="text-xs text-red-500 uppercase tracking-widest">Mã số:</span>
                  {regId}
                </div>
                <p className="text-slate-500 max-w-sm mx-auto pt-2">
                  Hệ thống đã ghi nhận thông tin đăng ký của <strong>{data.visitor.fullName}</strong>.
                </p>
              </div>

              <div className="bg-white p-6 rounded-3xl border-2 border-slate-100 text-left shadow-lg space-y-4">
                 <div className="flex justify-between items-center border-b pb-3 border-slate-100">
                    <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">Phiếu thăm gặp</span>
                    <span className="text-red-700 font-bold text-xs uppercase tracking-widest">Tiểu đoàn 4</span>
                 </div>
                 <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="text-slate-500">Học viên:</div>
                    <div className="font-bold text-slate-800 text-right">{data.soldier.fullName}</div>
                    <div className="text-slate-500">Thân nhân:</div>
                    <div className="font-bold text-slate-800 text-right">{data.visitor.fullName}</div>
                    <div className="text-slate-500">Giờ hẹn:</div>
                    <div className="font-bold text-red-700 text-right">{data.visitor.visitTime} Chủ nhật</div>
                 </div>
              </div>

              <div className="bg-yellow-50 p-6 rounded-3xl text-sm text-yellow-900 border-2 border-yellow-100 text-left space-y-4 shadow-sm">
                <div className="flex items-center gap-2 font-black uppercase text-xs tracking-widest text-yellow-700">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
                  Lưu ý quan trọng
                </div>
                <ul className="space-y-3">
                  <li className="flex gap-3">
                    <span className="text-yellow-500 font-bold">•</span>
                    <p>Vui lòng đến cổng Tiểu đoàn 4 đúng khung giờ hẹn.</p>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-yellow-500 font-bold">•</span>
                    <p>Mang theo <strong>CCCD bản gốc</strong> để đối chiếu mã số <strong>{regId}</strong>.</p>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-yellow-500 font-bold">•</span>
                    <p className="font-bold">Vui lòng CHỤP ẢNH MÀN HÌNH trang này để trình diện.</p>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  onClick={() => window.print()}
                  className="w-full py-4 bg-red-700 text-white rounded-2xl font-bold hover:bg-red-800 transition-all shadow-xl shadow-red-100 flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  CHỤP ẢNH / LƯU PHIẾU
                </button>
                <button
                  onClick={() => window.location.reload()}
                  className="w-full py-4 bg-slate-100 text-slate-500 rounded-2xl font-bold hover:bg-slate-200 transition-all"
                >
                  QUAY LẠI TRANG CHỦ
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="max-w-xl mx-auto text-center mt-10 space-y-2">
        <p className="text-slate-500 font-bold text-xs uppercase tracking-[0.2em]">
          © 2024 TRƯỜNG QUÂN SỰ - TIỂU ĐOÀN 4
        </p>
        <p className="text-slate-400 text-[10px] uppercase tracking-widest">
          Hệ thống đăng ký thăm gặp nội bộ • Quân khu 4
        </p>
      </div>
    </div>
  );
};

export default App;
