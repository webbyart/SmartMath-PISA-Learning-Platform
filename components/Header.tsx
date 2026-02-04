
import React from 'react';
import { LogOut, GraduationCap, Settings } from 'lucide-react';
import { User } from '../types';

interface HeaderProps {
  user: User;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  return (
    <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-6 shrink-0 z-10">
      <div className="flex items-center gap-2">
        <GraduationCap className="text-blue-600 w-8 h-8" />
        <h1 className="text-xl font-bold text-slate-800">SmartMath Platform</h1>
        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium ml-2">PISA 2022 Mode</span>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex flex-col items-end">
          <span className="text-sm font-semibold text-slate-700">{user.name}</span>
          <span className="text-xs text-slate-500 capitalize">{user.role}</span>
        </div>
        <button 
          onClick={onLogout}
          className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-600"
          title="ออกจากระบบ"
        >
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
};

export default Header;
