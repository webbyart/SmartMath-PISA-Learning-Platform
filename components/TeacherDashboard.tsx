
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
// Added BarChart2 to the lucide-react imports
import { Users, AlertTriangle, CheckCircle, TrendingUp, Clock, Search, Eye, ChevronLeft, Calendar, BrainCircuit, MessageSquare, BarChart2 } from 'lucide-react';
import { ScaffoldingLevel } from '../types';

// Mock expanded data for students
const MOCK_STUDENTS = [
  { 
    id: 's1', 
    name: 'เด็กชาย สมคิด มุ่งมั่น', 
    currentStation: '1', 
    fails: 8, 
    lastLevel: ScaffoldingLevel.COGNITIVE, 
    status: 'Stuck',
    completion: 25,
    history: [
      { problem: 'สถานีที่ 1', choice: 'รถยนต์ A', reasoning: 'เพราะราคาถูกที่สุดในตารางคือ 600,000 บาท', level: ScaffoldingLevel.GUIDED, time: '10:05' },
      { problem: 'สถานีที่ 1', choice: 'รถยนต์ B', reasoning: 'ลองเปลี่ยนมาดูคันที่ประหยัดน้ำมันขึ้นมาหน่อย', level: ScaffoldingLevel.STEP_BY_STEP, time: '10:12' },
      { problem: 'สถานีที่ 1', choice: 'รถยนต์ A', reasoning: 'ยังคิดว่า A คุ้มสุดเพราะประหยัดเงินต้นได้เยอะ', level: ScaffoldingLevel.COGNITIVE, time: '10:20' },
    ]
  },
  { 
    id: 's2', 
    name: 'เด็กหญิง รุ่งอรุณ แจ่มใส', 
    currentStation: '2', 
    fails: 5, 
    lastLevel: ScaffoldingLevel.STEP_BY_STEP, 
    status: 'Slow',
    completion: 50,
    history: [
      { problem: 'สถานีที่ 1', choice: 'รถยนต์ D', reasoning: 'คำนวณแล้วราคาซื้อ 550,000 + ค่าน้ำมัน (20,000/10)*40 = 630,000 ซึ่งน้อยที่สุด', level: ScaffoldingLevel.CONFIRMATIVE, time: '09:15' },
      { problem: 'สถานีที่ 2', choice: '5 ปี', reasoning: '150,000 หาร 30,000', level: ScaffoldingLevel.GUIDED, time: '09:30' },
    ]
  },
  { 
    id: 's3', 
    name: 'เด็กชาย ภาณุ รักเรียน', 
    currentStation: '4', 
    fails: 1, 
    lastLevel: ScaffoldingLevel.GUIDED, 
    status: 'Normal',
    completion: 75,
    history: [
      { problem: 'สถานีที่ 1', choice: 'รถยนต์ D', reasoning: 'คิดค่าใช้จ่ายรวมปีแรก รถ D ถูกสุดที่ 630,000', level: ScaffoldingLevel.CONFIRMATIVE, time: '08:45' },
      { problem: 'สถานีที่ 2', choice: '7 ปี', reasoning: 'ประหยัด 1,800 ต่อเดือน ปีละ 21,600 คืนทุนที่ประมาณ 6.9 ปี', level: ScaffoldingLevel.CONFIRMATIVE, time: '09:00' },
    ]
  },
  { 
    id: 's4', 
    name: 'เด็กหญิง เมษา พารวย', 
    currentStation: '1', 
    fails: 0, 
    lastLevel: ScaffoldingLevel.CONFIRMATIVE, 
    status: 'Normal',
    completion: 10,
    history: []
  },
  { 
    id: 's5', 
    name: 'เด็กชาย ก้องเกียรติ สุขใจ', 
    currentStation: '3', 
    fails: 2, 
    lastLevel: ScaffoldingLevel.GUIDED, 
    status: 'Normal',
    completion: 60,
    history: []
  }
];

const MOCK_STATS = {
  completionRate: [
    { name: 'สถานี 1', value: 85 },
    { name: 'สถานี 2', value: 62 },
    { name: 'สถานี 3', value: 45 },
    { name: 'สถานี 4', value: 30 },
  ],
  scaffoldingUsage: [
    { name: 'Confirmative', value: 40, color: '#22c55e' },
    { name: 'Guided', value: 25, color: '#eab308' },
    { name: 'Step-by-Step', value: 20, color: '#f97316' },
    { name: 'Cognitive', value: 15, color: '#3b82f6' },
  ]
};

const TeacherDashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);

  const filteredStudents = MOCK_STUDENTS.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedStudent = MOCK_STUDENTS.find(s => s.id === selectedStudentId);

  if (selectedStudentId && selectedStudent) {
    return (
      <div className="space-y-6 animate-fadeIn">
        <button 
          onClick={() => setSelectedStudentId(null)}
          className="flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors font-medium mb-4"
        >
          <ChevronLeft size={20} />
          กลับไปหน้าภาพรวม
        </button>

        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-2xl font-bold backdrop-blur-md">
                  {selectedStudent.name[0]}
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{selectedStudent.name}</h2>
                  <p className="text-blue-100 flex items-center gap-2 mt-1">
                    <Clock size={14} /> เข้าเรียนล่าสุด: วันนี้, 10:20 น.
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-blue-100 mb-1 uppercase tracking-widest font-bold">ความก้าวหน้า</div>
                <div className="text-3xl font-black">{selectedStudent.completion}%</div>
              </div>
            </div>
          </div>

          <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                  {/* Fixed: BarChart2 is now correctly imported from lucide-react */}
                  <BarChart2 size={18} className="text-blue-600" />
                  สรุปผลการเรียน
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-500">สถานีปัจจุบัน</span>
                    <span className="font-bold text-slate-800">สถานีที่ {selectedStudent.currentStation}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-500">จำนวนที่ตอบผิดรวม</span>
                    <span className="font-bold text-red-500">{selectedStudent.fails} ครั้ง</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-500">ระดับ AI ล่าสุด</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-lg text-[10px] font-bold uppercase">
                      {selectedStudent.lastLevel}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <AlertTriangle size={18} className="text-orange-600" />
                  การวิเคราะห์พฤติกรรม
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {selectedStudent.fails > 5 
                    ? 'ผู้เรียนมีแนวโน้มสับสนในการตีความโจทย์เชิงปริมาณ ควรเน้นการฝึกทักษะการตั้งสมการเบื้องต้น' 
                    : 'ผู้เรียนมีความเข้าใจในตรรกะคณิตศาสตร์ได้ดี สามารถประยุกต์ใช้ข้อมูลจากตารางได้ถูกต้องแม่นยำ'}
                </p>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <BrainCircuit size={20} className="text-purple-600" />
                ประวัติการโต้ตอบกับ AI (Scaffolding History)
              </h3>
              
              <div className="space-y-4">
                {selectedStudent.history.length === 0 ? (
                  <div className="p-12 text-center bg-slate-50 rounded-3xl border border-dashed border-slate-200 text-slate-400">
                    ยังไม่มีประวัติการส่งคำตอบ
                  </div>
                ) : (
                  selectedStudent.history.map((log, idx) => (
                    <div key={idx} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">{log.problem}</span>
                          <span className="text-[10px] text-slate-400 font-medium">{log.time} น.</span>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase ${
                          log.level === ScaffoldingLevel.CONFIRMATIVE ? 'bg-green-100 text-green-700' :
                          log.level === ScaffoldingLevel.COGNITIVE ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {log.level}
                        </span>
                      </div>
                      <div className="space-y-3">
                        <div className="flex gap-2">
                          <CheckCircle size={14} className="text-slate-400 shrink-0 mt-1" />
                          <p className="text-sm font-bold text-slate-700">เลือก: <span className="text-blue-600">{log.choice}</span></p>
                        </div>
                        <div className="flex gap-2 bg-slate-50 p-3 rounded-xl">
                          <MessageSquare size={14} className="text-slate-400 shrink-0 mt-1" />
                          <p className="text-sm text-slate-600 italic">"{log.reasoning}"</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={<Users className="text-blue-600" />} label="ผู้เรียนทั้งหมด" value="48 คน" delta="+3 สัปดาห์นี้" />
        <StatCard icon={<CheckCircle className="text-green-600" />} label="อัตราตอบถูก (เฉลี่ย)" value="74%" delta="+5%" />
        <StatCard icon={<AlertTriangle className="text-orange-600" />} label="จุดผิดพลาดบ่อย" value="การคำนวณร้อยละ" />
        <StatCard icon={<Clock className="text-purple-600" />} label="เวลาเฉลี่ย/สถานี" value="12 นาที" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <TrendingUp size={20} className="text-blue-600" />
                อัตราการสำเร็จแต่ละสถานี
            </h3>
            <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={MOCK_STATS.completionRate}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} />
                        <YAxis axisLine={false} tickLine={false} />
                        <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                        <Bar dataKey="value" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <BrainCircuit size={20} className="text-purple-600" />
                สถิติการใช้ AI Scaffolding
            </h3>
            <div className="h-64 w-full flex items-center">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={MOCK_STATS.scaffoldingUsage}
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {MOCK_STATS.scaffoldingUsage.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
                <div className="space-y-2 pr-8">
                    {MOCK_STATS.scaffoldingUsage.map((item) => (
                        <div key={item.name} className="flex items-center gap-2 text-xs">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                            <span className="text-slate-500">{item.name}</span>
                            <span className="font-bold">{item.value}%</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h3 className="text-lg font-bold text-slate-800">จัดการรายชื่อผู้เรียน</h3>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="ค้นหาชื่อผู้เรียน..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-4 py-3 bg-slate-50 rounded-2xl border-none focus:ring-4 focus:ring-blue-100 outline-none w-full md:w-80 text-sm transition-all"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
            <table className="w-full text-sm">
                <thead>
                    <tr className="bg-slate-50 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                        <th className="text-left py-4 px-6">ผู้เรียน</th>
                        <th className="text-left py-4 px-6">สถานี</th>
                        <th className="text-left py-4 px-6">ความก้าวหน้า</th>
                        <th className="text-left py-4 px-6">ผิดพลาด</th>
                        <th className="text-left py-4 px-6">AI ระดับล่าสุด</th>
                        <th className="text-left py-4 px-6">การจัดการ</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                    {filteredStudents.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-12 text-center text-slate-400 italic">
                          ไม่พบข้อมูลผู้เรียนที่ค้นหา
                        </td>
                      </tr>
                    ) : (
                      filteredStudents.map((student) => (
                        <tr key={student.id} className="hover:bg-slate-50 transition-colors group">
                            <td className="py-4 px-6">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs uppercase">
                                    {student.name[0]}
                                  </div>
                                  <span className="font-bold text-slate-700">{student.name}</span>
                                </div>
                            </td>
                            <td className="py-4 px-6 text-slate-500 font-medium">สถานี {student.currentStation}</td>
                            <td className="py-4 px-6">
                              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-blue-500 h-full" style={{ width: `${student.completion}%` }}></div>
                              </div>
                            </td>
                            <td className="py-4 px-6 text-red-500 font-bold">{student.fails} ครั้ง</td>
                            <td className="py-4 px-6">
                                <span className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase ${
                                    student.lastLevel === ScaffoldingLevel.COGNITIVE ? 'bg-blue-100 text-blue-600' : 
                                    student.lastLevel === ScaffoldingLevel.CONFIRMATIVE ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'
                                }`}>
                                    {student.lastLevel}
                                </span>
                            </td>
                            <td className="py-4 px-6">
                                <button 
                                  onClick={() => setSelectedStudentId(student.id)}
                                  className="p-2 bg-slate-100 text-slate-600 hover:bg-blue-600 hover:text-white rounded-xl transition-all"
                                  title="ดูรายละเอียด"
                                >
                                    <Eye size={18} />
                                </button>
                            </td>
                        </tr>
                      ))
                    )}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  delta?: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value, delta }) => (
  <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
    <div className="p-3 bg-slate-50 rounded-2xl">{icon}</div>
    <div>
      <div className="text-xs text-slate-500 font-medium">{label}</div>
      <div className="text-xl font-bold text-slate-800">{value}</div>
      {delta && <div className="text-[10px] text-green-500 font-bold mt-1">{delta}</div>}
    </div>
  </div>
);

export default TeacherDashboard;
