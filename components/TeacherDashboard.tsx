
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Users, AlertTriangle, CheckCircle, TrendingUp, Clock } from 'lucide-react';

const MOCK_DATA = {
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
  ],
  errorTrends: [
    { day: 'จันทร์', errors: 12 },
    { day: 'อังคาร', errors: 19 },
    { day: 'พุธ', errors: 15 },
    { day: 'พฤหัสบดี', errors: 8 },
    { day: 'ศุกร์', errors: 5 },
  ]
};

const TeacherDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
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
                    <BarChart data={MOCK_DATA.completionRate}>
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
                <TrendingUp size={20} className="text-purple-600" />
                สถิติการใช้ AI Scaffolding
            </h3>
            <div className="h-64 w-full flex items-center">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={MOCK_DATA.scaffoldingUsage}
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {MOCK_DATA.scaffoldingUsage.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
                <div className="space-y-2 pr-8">
                    {MOCK_DATA.scaffoldingUsage.map((item) => (
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

      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
         <h3 className="text-lg font-bold mb-6">รายชื่อผู้เรียนที่ต้องการความช่วยเหลือเร่งด่วน</h3>
         <div className="overflow-x-auto">
            <table className="w-full text-sm">
                <thead>
                    <tr className="border-b border-slate-100 text-slate-400 font-medium">
                        <th className="text-left py-3 px-4">ผู้เรียน</th>
                        <th className="text-left py-3 px-4">สถานีปัจจุบัน</th>
                        <th className="text-left py-3 px-4">จำนวนครั้งที่ผิด</th>
                        <th className="text-left py-3 px-4">ระดับ Scaffolding</th>
                        <th className="text-left py-3 px-4">สถานะ</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                    {[
                        { name: 'เด็กชาย สมคิด', station: '1', fails: 8, level: 'Cognitive', status: 'Stuck' },
                        { name: 'เด็กหญิง รุ่งอรุณ', station: '2', fails: 5, level: 'Step-by-Step', status: 'Slow' },
                        { name: 'เด็กชาย ภาณุ', station: '4', fails: 1, level: 'Guided', status: 'Normal' },
                    ].map((row, i) => (
                        <tr key={i} className="hover:bg-slate-50 transition-colors">
                            <td className="py-4 px-4 font-bold text-slate-700">{row.name}</td>
                            <td className="py-4 px-4 text-slate-500">สถานี {row.station}</td>
                            <td className="py-4 px-4 text-red-500 font-medium">{row.fails} ครั้ง</td>
                            <td className="py-4 px-4">
                                <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                                    row.level === 'Cognitive' ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'
                                }`}>
                                    {row.level}
                                </span>
                            </td>
                            <td className="py-4 px-4">
                                <div className="flex items-center gap-1">
                                    <div className={`w-2 h-2 rounded-full ${row.status === 'Stuck' ? 'bg-red-500' : 'bg-yellow-500'}`}></div>
                                    <span className="text-xs">{row.status}</span>
                                </div>
                            </td>
                        </tr>
                    ))}
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
  <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-start gap-4">
    <div className="p-3 bg-slate-50 rounded-2xl">{icon}</div>
    <div>
      <div className="text-xs text-slate-500 font-medium">{label}</div>
      <div className="text-xl font-bold text-slate-800">{value}</div>
      {delta && <div className="text-[10px] text-green-500 font-bold mt-1">{delta}</div>}
    </div>
  </div>
);

export default TeacherDashboard;
