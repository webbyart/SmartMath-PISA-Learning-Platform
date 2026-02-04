
import React, { useState } from 'react';
import { GraduationCap, User, UserCheck, ShieldCheck, ArrowRight } from 'lucide-react';
import { User as UserType } from '../types';

interface AuthProps {
  onLogin: (user: UserType) => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [role, setRole] = useState<'student' | 'teacher'>('student');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onLogin({
        id: Math.random().toString(36).substr(2, 9),
        name: name,
        role: role
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-blue-200">
            <GraduationCap className="text-white w-12 h-12" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">SmartMath Platform</h1>
          <p className="text-slate-500">พัฒนาความฉลาดรู้ทางคณิตศาสตร์ด้วยพลัง AI</p>
        </div>

        <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-700 ml-1">เลือกสถานะผู้ใช้งาน</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setRole('student')}
                  className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${
                    role === 'student' ? 'border-blue-500 bg-blue-50 text-blue-700 ring-4 ring-blue-50' : 'border-slate-100 text-slate-400'
                  }`}
                >
                  <User size={24} />
                  <span className="font-bold text-sm">นักเรียน</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRole('teacher')}
                  className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${
                    role === 'teacher' ? 'border-blue-500 bg-blue-50 text-blue-700 ring-4 ring-blue-50' : 'border-slate-100 text-slate-400'
                  }`}
                >
                  <ShieldCheck size={24} />
                  <span className="font-bold text-sm">คุณครู</span>
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-700 ml-1">ชื่อของคุณ</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="กรอกชื่อ-นามสกุล"
                required
                className="w-full p-4 rounded-2xl border-2 border-slate-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none transition-all text-slate-700"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-900/30 flex items-center justify-center gap-2"
            >
              เริ่มต้นใช้งาน
              <ArrowRight size={20} />
            </button>
          </form>
        </div>

        <div className="mt-8 text-center text-xs text-slate-400 px-10">
          * แพลตฟอร์มนี้จำลองสถานการณ์ตามแนวคิด PISA 2022 และใช้เทคโนโลยี Generative AI เพื่อการเรียนรู้รายบุคคล
        </div>
      </div>
    </div>
  );
};

export default Auth;
