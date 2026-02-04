
import React from 'react';
import { BookOpen, BarChart2, Award, Trophy, Info } from 'lucide-react';

interface SidebarProps {
  activeTab: 'learning' | 'dashboard';
  setActiveTab: (tab: 'learning' | 'dashboard') => void;
  userRole: 'student' | 'teacher';
  userName: string;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, userRole, userName }) => {
  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col shrink-0">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-xl">S</div>
          <div>
            <div className="font-bold text-lg leading-tight">SmartMath</div>
            <div className="text-[10px] text-slate-400 uppercase tracking-widest">Adaptive Learning</div>
          </div>
        </div>

        <nav className="space-y-2">
          <button
            onClick={() => setActiveTab('learning')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeTab === 'learning' ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <BookOpen size={20} />
            <span className="font-medium">สถานีการเรียนรู้</span>
          </button>
          
          {userRole === 'teacher' && (
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === 'dashboard' ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <BarChart2 size={20} />
              <span className="font-medium">แผงควบคุมครู</span>
            </button>
          )}

          <div className="pt-6 pb-2 px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">ความก้าวหน้า</div>
          
          <div className="px-4 py-2">
             <div className="flex justify-between text-xs mb-1">
                <span>ความฉลาดรู้</span>
                <span>45%</span>
             </div>
             <div className="w-full bg-slate-800 rounded-full h-1.5">
                <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '45%' }}></div>
             </div>
          </div>
        </nav>
      </div>

      <div className="mt-auto p-6 space-y-4">
        <div className="bg-slate-800 rounded-2xl p-4 flex items-center gap-3">
          <div className="bg-yellow-500/20 text-yellow-500 p-2 rounded-lg">
            <Trophy size={18} />
          </div>
          <div>
            <div className="text-xs text-slate-400">เหรียญตรา</div>
            <div className="text-sm font-bold">2/10 แบดจ์</div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
