
import React, { useState } from 'react';
import { FormStep, RegistrationData, SoldierInfo, VisitorInfo } from './types.ts';
import { MilitaryLogo, RANKS, RELATIONSHIPS, RULES_CONTENT } from './constants.tsx';
import StepIndicator from './components/StepIndicator.tsx';

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
      squad: '',
      platoon: '',
      company: '',
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
    const randomId = 'TD4-' + Math.random().toString(36).slice(2, 8).toUpperCase();
    setRegId(randomId);
    setCurrentStep(FormStep.Success);
  };

  const formatUnit = (soldier: SoldierInfo) => {
    return `Tiểu đội ${soldier.squad}, Trung đội ${soldier.platoon}, Đại đội ${soldier.company}`;
  };

  return (
    <div className="min-h-screen bg-red-950 py-6 md:py-12 px-4 relative selection:bg-yellow-500 selection:text-red-900 overflow-x-hidden">
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")' }}></div>
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.4)_100%)] pointer-events-none"></div>
      
      <div className="max-w-2xl mx-auto bg-white rounded-[2.5rem] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden border border-red-900/30 relative z-10 transition-all duration-500">
        
        {/* Header Section */}
        <div className="relative bg-gradient-to-br from-red-700 via-red-800 to-red-950 text-white py-12 text-center px-6 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '30px 30px'}}></div>
          </div>
          
          <MilitaryLogo />
          
          <div className="relative z-10">
            <h2 className="text-2xl md:text-4xl font-black tracking-[0.1em] md:tracking-[0.2em] uppercase mb-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] leading-tight">Trường Quân Sự</h2>
            <h1 className="text-xl md:text-3xl font-bold tracking-[0.2em] md:tracking-[0.3em] uppercase opacity-90 text-yellow-400 leading-tight">Tiểu Đoàn 4</h1>
            <div className="mt-6 flex justify-center items-center gap-4">
              <div className="h-[2px] w-16 bg-gradient-to-r from-transparent to-yellow-500/50"></div>
              <div className="w-3 h-3 rotate-45 border-2 border-yellow-500"></div>
              <div className="h-[2px] w-16 bg-gradient-to-l from-transparent to-yellow-500/50"></div>
            </div>
          </div>
        </div>

        <div className="p-6 md:p-10 bg-white">
          {currentStep !== FormStep.Success && <StepIndicator currentStep={currentStep} />}

          {/* PAGE 1: RULES */}
          {currentStep === FormStep.Rules && (
            <div className="space-y-8 animate-fade-in">
              <div className="text-center">
                <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Quy định thăm thân</h3>
                <p className="text-slate-500 text-sm mt-1 font-medium">Đảm bảo an toàn và kỷ luật quân đội</p>
              </div>
              
              <div className="bg-red-50/40 rounded-3xl p-7 space-y-5 border border-red-100 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]">
                {RULES_CONTENT.map((rule, idx) => (
                  <div key={idx} className="flex gap-5 text-sm text-slate-700 leading-relaxed items-start group">
                    <span className="flex-shrink-0 w-7 h-7 bg-red-800 text-white rounded-xl flex items-center justify-center text-xs font-black shadow-lg shadow-red-200 group-hover:scale-110 transition-transform">
                      {idx + 1}
                    </span>
                    <p className="pt-0.5 font-semibold text-slate-800 text-justify">{rule}</p>
                  </div>
                ))}
              </div>

              <label className="flex items-center gap-5 p-6 bg-red-50/50 rounded-3xl cursor-pointer hover:bg-red-100/50 transition-all border-2 border-transparent hover:border-red-200 group active:scale-[0.99]">
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    className="peer h-7 w-7 cursor-pointer appearance-none rounded-lg border-2 border-slate-300 bg-white checked:bg-red-800 checked:border-red-800 transition-all shadow-sm"
                    checked={data.agreedToRules}
                    onChange={(e) => setData({ ...data, agreedToRules: e.target.checked })}
                  />
                  <svg className="absolute h-5 w-5 text-white opacity-0 peer-checked:opacity-100 top-1 left-1 pointer-events-none transition-all duration-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <span className="text-sm font-black text-slate-800 group-hover:text-red-900 transition-colors uppercase tracking-tight text-justify">
                  Tôi cam kết thực hiện đúng các quy định trên.
                </span>
              </label>

              <button
                disabled={!data.agreedToRules}
                onClick={nextStep}
                className={`w-full py-5 rounded-2xl font-black text-lg shadow-2xl transition-all transform active:scale-[0.97] tracking-widest uppercase ${
                  data.agreedToRules 
                    ? 'bg-red-800 hover:bg-red-900 text-white cursor-pointer shadow-red-200' 
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                }`}
              >
                TIẾP THEO
              </button>
            </div>
          )}

          {/* PAGE 2: SOLDIER INFO */}
          {currentStep === FormStep.SoldierInfo && (
            <div className="space-y-8 animate-fade-in">
              <div className="text-center">
                <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Thông tin Quân nhân</h3>
                <p className="text-slate-500 text-sm mt-1 font-medium">Thông tin học viên Tiểu đoàn 4 cần thăm gặp</p>
              </div>
              
              <div className="grid gap-6">
                <div className="space-y-2">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Họ và tên học viên</label>
                  <input
                    type="text"
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-slate-100 focus:border-red-700 focus:bg-white outline-none transition-all text-slate-800 font-bold placeholder:font-medium"
                    placeholder="VÍ DỤ: NGUYỄN VĂN A"
                    value={data.soldier.fullName}
                    onChange={(e) => handleSoldierChange('fullName', e.target.value.toUpperCase())}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Ngày sinh</label>
                    <input
                      type="date"
                      className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-slate-100 focus:border-red-700 focus:bg-white outline-none transition-all text-slate-800 font-bold"
                      value={data.soldier.dob}
                      onChange={(e) => handleSoldierChange('dob', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Cấp bậc</label>
                    <select
                      className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-slate-100 focus:border-red-700 focus:bg-white outline-none transition-all text-slate-800 font-bold cursor-pointer appearance-none"
                      value={data.soldier.rank}
                      onChange={(e) => handleSoldierChange('rank', e.target.value)}
                    >
                      {RANKS.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>
                </div>

                {/* Ô NHẬP ĐƠN VỊ CHI TIẾT - CĂN GIỮA VÀ CHỮ TO */}
                <div className="space-y-4">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1 text-center">Đơn vị công tác/học tập</label>
                  <div className="grid grid-cols-3 gap-4 items-start">
                    <div className="flex flex-col items-center gap-2">
                      <input
                        type="number"
                        className="w-full px-2 py-5 rounded-2xl bg-slate-50 border-2 border-slate-100 focus:border-red-700 focus:bg-white outline-none transition-all text-slate-800 font-black text-center text-3xl md:text-4xl shadow-sm"
                        placeholder="Số"
                        value={data.soldier.squad}
                        onChange={(e) => handleSoldierChange('squad', e.target.value)}
                      />
                      <span className="text-[11px] md:text-xs font-black text-slate-600 uppercase tracking-widest text-center">Tiểu đội</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <input
                        type="number"
                        className="w-full px-2 py-5 rounded-2xl bg-slate-50 border-2 border-slate-100 focus:border-red-700 focus:bg-white outline-none transition-all text-slate-800 font-black text-center text-3xl md:text-4xl shadow-sm"
                        placeholder="Số"
                        value={data.soldier.platoon}
                        onChange={(e) => handleSoldierChange('platoon', e.target.value)}
                      />
                      <span className="text-[11px] md:text-xs font-black text-slate-600 uppercase tracking-widest text-center">Trung đội</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <input
                        type="number"
                        className="w-full px-2 py-5 rounded-2xl bg-slate-50 border-2 border-slate-100 focus:border-red-700 focus:bg-white outline-none transition-all text-slate-800 font-black text-center text-3xl md:text-4xl shadow-sm"
                        placeholder="Số"
                        value={data.soldier.company}
                        onChange={(e) => handleSoldierChange('company', e.target.value)}
                      />
                      <span className="text-[11px] md:text-xs font-black text-slate-600 uppercase tracking-widest text-center">Đại đội</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Quê quán (Trú quán)</label>
                  <textarea
                    rows={2}
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-slate-100 focus:border-red-700 focus:bg-white outline-none transition-all text-slate-800 font-bold resize-none placeholder:font-medium"
                    placeholder="Địa chỉ thường trú..."
                    value={data.soldier.homeTown}
                    onChange={(e) => handleSoldierChange('homeTown', e.target.value)}
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button onClick={prevStep} className="flex-1 py-4 border-2 border-slate-200 rounded-2xl font-black text-slate-500 hover:bg-slate-50 transition-all uppercase text-sm tracking-widest">
                  QUAY LẠI
                </button>
                <button
                  onClick={nextStep}
                  disabled={!data.soldier.fullName || !data.soldier.dob || !data.soldier.squad || !data.soldier.platoon || !data.soldier.company || !data.soldier.homeTown}
                  className="flex-1 py-4 bg-red-800 hover:bg-red-900 text-white rounded-2xl font-black shadow-2xl disabled:bg-slate-200 disabled:text-slate-400 transition-all active:scale-[0.97] uppercase text-sm tracking-widest"
                >
                  TIẾP THEO
                </button>
              </div>
            </div>
          )}

          {/* PAGE 3: VISITOR INFO */}
          {currentStep === FormStep.VisitorInfo && (
            <div className="space-y-8 animate-fade-in">
              <div className="text-center">
                <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Thông tin Thân nhân</h3>
                <p className="text-slate-500 text-sm mt-1 font-medium">Thông tin người đại diện đăng ký thăm gặp</p>
              </div>
              
              <div className="grid gap-5">
                <div className="space-y-2">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Họ tên người đăng ký</label>
                  <input
                    type="text"
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-slate-100 focus:border-red-700 focus:bg-white outline-none transition-all text-slate-800 font-bold"
                    placeholder="HỌ TÊN NGƯỜI THÂN"
                    value={data.visitor.fullName}
                    onChange={(e) => handleVisitorChange('fullName', e.target.value.toUpperCase())}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Số CCCD</label>
                    <input
                      type="text"
                      maxLength={12}
                      className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-slate-100 focus:border-red-700 focus:bg-white outline-none transition-all text-slate-800 font-bold tracking-widest"
                      placeholder="12 CHỮ SỐ"
                      value={data.visitor.idNumber}
                      onChange={(e) => handleVisitorChange('idNumber', e.target.value.replace(/\D/g, ''))}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Mối quan hệ</label>
                    <select
                      className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-slate-100 focus:border-red-700 focus:bg-white outline-none transition-all text-slate-800 font-bold cursor-pointer appearance-none"
                      value={data.visitor.relationship}
                      onChange={(e) => handleVisitorChange('relationship', e.target.value)}
                    >
                      {RELATIONSHIPS.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Số người thăm</label>
                    <input
                      type="number"
                      min={1}
                      max={10}
                      className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-slate-100 focus:border-red-700 focus:bg-white outline-none transition-all text-slate-800 font-bold"
                      value={data.visitor.visitorCount}
                      onChange={(e) => handleVisitorChange('visitorCount', parseInt(e.target.value) || 1)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Giờ hẹn gặp</label>
                    <input
                      type="time"
                      min="07:00"
                      max="16:30"
                      className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-slate-100 focus:border-red-700 focus:bg-white outline-none transition-all text-slate-800 font-bold"
                      value={data.visitor.visitTime}
                      onChange={(e) => handleVisitorChange('visitTime', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button onClick={prevStep} className="flex-1 py-4 border-2 border-slate-200 rounded-2xl font-black text-slate-500 hover:bg-slate-50 transition-all uppercase text-sm tracking-widest">
                  QUAY LẠI
                </button>
                <button
                  onClick={nextStep}
                  disabled={!data.visitor.fullName || !data.visitor.idNumber}
                  className="flex-1 py-4 bg-red-800 hover:bg-red-900 text-white rounded-2xl font-black shadow-2xl disabled:bg-slate-200 disabled:text-slate-400 transition-all active:scale-[0.97] uppercase text-sm tracking-widest"
                >
                  XÁC NHẬN
                </button>
              </div>
            </div>
          )}

          {/* PAGE 4: REVIEW */}
          {currentStep === FormStep.Review && (
            <div className="space-y-8 animate-fade-in">
              <div className="text-center">
                <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Kiểm tra thông tin</h3>
                <p className="text-slate-500 text-sm mt-1 font-medium">Vui lòng rà soát kỹ trước khi gửi đăng ký</p>
              </div>
              
              <div className="grid gap-6">
                <div className="bg-slate-50/80 rounded-[2rem] p-7 border-2 border-slate-100 relative group transition-all hover:border-red-200 shadow-sm">
                  <div className="absolute top-5 right-7 text-[9px] font-black text-slate-300 uppercase tracking-[0.3em]">Mục 01</div>
                  <h4 className="font-black text-red-900 mb-5 uppercase text-xs tracking-widest flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-800 animate-pulse"></span>
                    Thông tin Quân nhân
                  </h4>
                  <div className="grid grid-cols-2 gap-y-4 text-sm font-medium items-center">
                    <span className="text-slate-400 italic text-left">Họ tên:</span>
                    <span className="font-bold text-slate-900 text-right">{data.soldier.fullName}</span>
                    <span className="text-slate-400 italic text-left">Cấp bậc:</span>
                    <span className="font-bold text-slate-900 text-right">{data.soldier.rank}</span>
                    <span className="text-slate-400 italic text-left">Đơn vị:</span>
                    <span className="font-bold text-slate-900 text-right">{formatUnit(data.soldier)}</span>
                    <span className="text-slate-400 italic text-left">Ngày sinh:</span>
                    <span className="font-bold text-slate-900 text-right">{data.soldier.dob}</span>
                  </div>
                </div>

                <div className="bg-slate-50/80 rounded-[2rem] p-7 border-2 border-slate-100 relative group transition-all hover:border-red-200 shadow-sm">
                  <div className="absolute top-5 right-7 text-[9px] font-black text-slate-300 uppercase tracking-[0.3em]">Mục 02</div>
                  <h4 className="font-black text-red-900 mb-5 uppercase text-xs tracking-widest flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-800 animate-pulse"></span>
                    Thông tin Đăng ký
                  </h4>
                  <div className="grid grid-cols-2 gap-y-4 text-sm font-medium items-center">
                    <span className="text-slate-400 italic text-left">Thân nhân:</span>
                    <span className="font-bold text-slate-900 text-right">{data.visitor.fullName}</span>
                    <span className="text-slate-400 italic text-left">CCCD:</span>
                    <span className="font-bold text-slate-900 text-right tracking-widest">{data.visitor.idNumber}</span>
                    <span className="text-slate-400 italic text-left">Thời gian:</span>
                    <span className="font-black text-red-800 bg-red-100/50 px-3 py-1 rounded-full text-right">{data.visitor.visitTime} (Chủ nhật)</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button onClick={prevStep} className="flex-1 py-4 border-2 border-slate-200 rounded-2xl font-black text-slate-500 hover:bg-slate-50 transition-all uppercase text-sm tracking-widest">
                  SỬA LẠI
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-[2] py-4 bg-red-800 hover:bg-red-900 text-white rounded-2xl font-black shadow-2xl shadow-red-200 transition-all active:scale-[0.97] text-lg uppercase tracking-widest"
                >
                  GỬI ĐĂNG KÝ
                </button>
              </div>
            </div>
          )}

          {/* PAGE 5: SUCCESS */}
          {currentStep === FormStep.Success && (
            <div className="text-center py-6 space-y-8 animate-fade-in">
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-green-100 rounded-full scale-[2] animate-ping opacity-20"></div>
                <div className="w-28 h-28 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto relative z-10 shadow-[inset_0_2px_10px_rgba(0,0,0,0.1)]">
                  <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              
              <div className="space-y-3">
                <h3 className="text-4xl font-black text-slate-900 tracking-tight uppercase">Thành công!</h3>
                <div className="flex items-center justify-center gap-3 text-red-800 font-black text-2xl bg-red-50 py-4 px-8 rounded-3xl w-fit mx-auto border-4 border-red-100 shadow-xl shadow-red-50">
                  <span className="text-[10px] text-red-500 uppercase tracking-[0.3em] font-black">PHIẾU SỐ:</span>
                  {regId}
                </div>
                <p className="text-slate-500 max-w-sm mx-auto pt-2 leading-relaxed font-bold italic">
                  Gia đình vui lòng chụp lại màn hình mã số này.
                </p>
              </div>

              <div className="bg-white p-8 rounded-[2.5rem] border-4 border-slate-100 text-left shadow-2xl space-y-5 relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-bl-full -mr-10 -mt-10 opacity-50 group-hover:scale-110 transition-transform duration-700"></div>
                 <div className="flex justify-between items-center border-b-4 pb-4 border-slate-50 relative z-10">
                    <span className="text-slate-400 text-[9px] font-black uppercase tracking-[0.3em]">Xác nhận thăm gặp</span>
                    <span className="text-red-900 font-black text-xs uppercase tracking-widest bg-red-50 px-3 py-1 rounded-lg">Tiểu đoàn 4</span>
                 </div>
                 <div className="grid grid-cols-2 gap-y-5 text-base relative z-10 items-center">
                    <div className="text-slate-400 font-bold uppercase text-[10px] tracking-widest text-left">Tên học viên:</div>
                    <div className="font-black text-slate-900 text-right">{data.soldier.fullName}</div>
                    <div className="text-slate-400 font-bold uppercase text-[10px] tracking-widest text-left">Đơn vị:</div>
                    <div className="font-black text-slate-900 text-right">{formatUnit(data.soldier)}</div>
                    <div className="text-slate-400 font-bold uppercase text-[10px] tracking-widest text-left">Người đăng ký:</div>
                    <div className="font-black text-slate-900 text-right">{data.visitor.fullName}</div>
                    <div className="text-slate-400 font-bold uppercase text-[10px] tracking-widest text-left">Hẹn gặp lúc:</div>
                    <div className="font-black text-red-800 text-right text-lg">{data.visitor.visitTime} (CHỦ NHẬT)</div>
                 </div>
                 <div className="pt-4 text-center border-t-2 border-slate-50">
                    <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.4em]">Hệ thống đăng ký Trường Quân sự</p>
                 </div>
              </div>

              <div className="bg-amber-50 p-7 rounded-[2rem] text-sm text-amber-900 border-2 border-amber-200/50 text-left space-y-4 shadow-sm">
                <div className="flex items-center gap-3 font-black uppercase text-[10px] tracking-widest text-amber-700">
                  <div className="w-5 h-5 bg-amber-200 rounded-full flex items-center justify-center text-xs">!</div>
                  Lưu ý quan trọng
                </div>
                <ul className="space-y-3 font-bold text-amber-800/80">
                  <li className="flex gap-4 items-start">
                    <span className="text-amber-500 font-black flex-shrink-0">•</span>
                    <p className="text-justify">Có mặt tại cổng gác Tiểu đoàn 4 trước giờ hẹn.</p>
                  </li>
                  <li className="flex gap-4 items-start">
                    <span className="text-amber-500 font-black flex-shrink-0">•</span>
                    <p className="text-justify">Mang theo <strong>CCCD bản gốc</strong> để đối chiếu.</p>
                  </li>
                  <li className="flex gap-4 bg-white/50 p-3 rounded-xl border border-amber-200 items-start">
                    <span className="text-red-600 font-black animate-pulse flex-shrink-0">!</span>
                    <p className="font-black text-red-900 uppercase text-xs leading-relaxed text-justify">Vui lòng CHỤP ẢNH MÀN HÌNH phiếu này ngay.</p>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col gap-4 pt-4">
                <button
                  onClick={() => window.print()}
                  className="w-full py-5 bg-red-800 text-white rounded-3xl font-black hover:bg-red-900 transition-all shadow-2xl shadow-red-200 flex items-center justify-center gap-4 uppercase tracking-[0.15em] active:scale-95"
                >
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  Lưu phiếu / Chụp ảnh
                </button>
                <button
                  onClick={() => window.location.reload()}
                  className="w-full py-4 text-slate-400 rounded-2xl font-black hover:text-slate-600 transition-all text-xs uppercase tracking-widest"
                >
                  Quay lại trang chủ
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="max-w-xl mx-auto text-center mt-9 space-y-3 relative z-8 pb-10">
        <p className="text-red-100/60 font-black text-[10px] uppercase tracking-[0.4em] drop-shadow-sm">
        </p>
      </div>
    </div>
  );
};

export default App;
