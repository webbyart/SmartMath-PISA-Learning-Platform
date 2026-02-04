
import React, { useState, useEffect } from 'react';
import { Send, RotateCcw, ChevronRight, BrainCircuit, CheckCircle2, AlertCircle, FileText } from 'lucide-react';
import { MOCK_PROBLEMS } from '../constants';
import { ScaffoldingLevel, User } from '../types';
import { analyzeResponse, AnalysisResult } from '../services/geminiService';
import FeedbackCard from './FeedbackCard';

interface LearningStationProps {
  user: User;
  onProgressUpdate: (entry: any) => void;
}

const LearningStation: React.FC<LearningStationProps> = ({ user, onProgressUpdate }) => {
  const [currentProblemIdx, setCurrentProblemIdx] = useState(0);
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  const [reasoning, setReasoning] = useState('');
  const [feedback, setFeedback] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const problem = MOCK_PROBLEMS[currentProblemIdx];

  const handleSubmit = async () => {
    // For multiple choice, both must be present. For written, only reasoning.
    const isWritten = problem.type === 'written';
    if (!isWritten && !selectedChoiceId) return;
    if (!reasoning.trim()) return;

    setIsAnalyzing(true);
    try {
      const selectedChoiceLabel = !isWritten 
        ? problem.choices?.find(c => c.id === selectedChoiceId)?.label || '' 
        : null;

      const result = await analyzeResponse(
        problem.context,
        problem.question,
        selectedChoiceLabel,
        reasoning,
        attempts + 1
      );
      
      setFeedback(result);
      setAttempts(prev => prev + 1);
      
      onProgressUpdate({
        problemId: problem.id,
        choiceId: selectedChoiceId,
        reasoning,
        feedbackLevel: result.level,
        timestamp: Date.now()
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleNext = () => {
    if (currentProblemIdx < MOCK_PROBLEMS.length - 1) {
      setCurrentProblemIdx(prev => prev + 1);
      resetState();
    }
  };

  const resetState = () => {
    setSelectedChoiceId(null);
    setReasoning('');
    setFeedback(null);
    setAttempts(0);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fadeIn pb-12">
      {/* Left Column: Problem & Choices */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-blue-600 p-6 text-white flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold">{problem.title}</h2>
              <p className="text-blue-100 text-sm mt-1">
                {problem.type === 'multiple-choice' ? 'แบบเลือกตอบ + เหตุผล' : 'แบบข้อเขียน (Open Response)'}
              </p>
            </div>
            <div className="bg-blue-500/50 px-4 py-2 rounded-xl backdrop-blur-sm font-medium">
              สถานี {currentProblemIdx + 1}/{MOCK_PROBLEMS.length}
            </div>
          </div>

          <div className="p-8 space-y-6">
            <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed">
              <p className="whitespace-pre-wrap">{problem.context}</p>
            </div>

            {problem.dataPoints?.cars && (
                <div className="overflow-x-auto rounded-xl border border-slate-200">
                    <table className="min-w-full divide-y divide-slate-200">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase">รุ่นรถ</th>
                                <th className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase">ราคาซื้อ (บาท)</th>
                                <th className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase">อัตราน้ำมัน (กม./ลิตร)</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-slate-200 text-sm">
                            {problem.dataPoints.cars.map((car: any, i: number) => (
                                <tr key={i}>
                                    <td className="px-4 py-3 font-medium text-slate-900">{car.model}</td>
                                    <td className="px-4 py-3 text-slate-600">{car.price.toLocaleString()}</td>
                                    <td className="px-4 py-3 text-slate-600">{car.efficiency}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-xl">
              <h3 className="font-bold text-blue-900 mb-1 flex items-center gap-2">
                {problem.type === 'written' ? <FileText size={18} /> : null}
                คำถาม:
              </h3>
              <p className="text-blue-800">{problem.question}</p>
            </div>

            {problem.type === 'multiple-choice' && problem.choices && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {problem.choices.map((choice) => (
                  <button
                    key={choice.id}
                    onClick={() => !feedback?.isCorrect && setSelectedChoiceId(choice.id)}
                    className={`p-4 rounded-2xl border-2 text-left transition-all ${
                      selectedChoiceId === choice.id
                        ? 'border-blue-500 bg-blue-50 ring-4 ring-blue-100'
                        : 'border-slate-100 hover:border-slate-300 bg-slate-50'
                    } ${feedback?.isCorrect ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className={`font-bold ${selectedChoiceId === choice.id ? 'text-blue-700' : 'text-slate-700'}`}>
                          {choice.label}
                      </span>
                      {selectedChoiceId === choice.id && <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white"><CheckCircle2 size={12} /></div>}
                    </div>
                    <div className="text-xs text-slate-500">{choice.details}</div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <BrainCircuit className="text-purple-600" />
                {problem.type === 'multiple-choice' ? 'อธิบายเหตุผลประกอบการตัดสินใจ' : 'เขียนคำตอบและวิธีคำนวณของคุณ'}
            </h3>
            <textarea
                value={reasoning}
                onChange={(e) => !feedback?.isCorrect && setReasoning(e.target.value)}
                placeholder={problem.type === 'multiple-choice' 
                    ? "อธิบายวิธีคิดของคุณที่นี่... (เช่น ข้อมูลที่ใช้, วิธีคำนวณ, หรือข้อสรุป)" 
                    : "แสดงขั้นตอนการคำนวณและคำตอบสุดท้ายของคุณอย่างละเอียด..."}
                className="w-full h-40 p-4 rounded-2xl border-2 border-slate-100 focus:border-purple-300 focus:ring-4 focus:ring-purple-50 outline-none transition-all text-slate-700 resize-none font-medium"
                disabled={feedback?.isCorrect}
            />
            <div className="mt-4 flex justify-between items-center">
                <p className="text-xs text-slate-400">AI จะประเมินจากตรรกะและการประมวลผลข้อมูลของคุณ</p>
                <button
                    onClick={handleSubmit}
                    disabled={(!selectedChoiceId && problem.type === 'multiple-choice') || !reasoning.trim() || isAnalyzing || feedback?.isCorrect}
                    className="flex items-center gap-2 px-8 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-slate-300 text-white font-bold rounded-2xl transition-all shadow-lg shadow-purple-900/20"
                >
                    {isAnalyzing ? (
                        <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            กำลังตรวจคำตอบ...
                        </>
                    ) : (
                        <>
                            <Send size={20} />
                            ส่งคำตอบ
                        </>
                    )}
                </button>
            </div>
        </div>
      </div>

      {/* Right Column: AI Feedback & Adaptive Assistant */}
      <div className="space-y-6">
        <div className="bg-slate-900 rounded-3xl p-6 text-white h-fit sticky top-6 shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-500 p-2 rounded-xl">
              <BrainCircuit size={24} />
            </div>
            <div>
              <h3 className="font-bold leading-tight">AI Scaffolding Engine</h3>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest">Adaptive Support v2.6</p>
            </div>
          </div>

          <div className="space-y-4">
            {!feedback ? (
              <div className="bg-slate-800/50 rounded-2xl p-8 text-center border border-dashed border-slate-700">
                <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                   <AlertCircle className="text-slate-500" size={32} />
                </div>
                <p className="text-slate-400 text-sm">พิมพ์วิธีคิดของคุณและส่งคำตอบเพื่อให้ AI วิเคราะห์ความฉลาดรู้</p>
              </div>
            ) : (
              <FeedbackCard feedback={feedback} />
            )}

            {feedback?.isCorrect && (
                <button 
                  onClick={handleNext}
                  className="w-full py-4 bg-green-600 hover:bg-green-700 text-white rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-green-900/40"
                >
                    {currentProblemIdx < MOCK_PROBLEMS.length - 1 ? 'ไปสถานีถัดไป' : 'จบการเรียนรู้ (ดูผลสรุป)'}
                    <ChevronRight size={20} />
                </button>
            )}

            {feedback && !feedback.isCorrect && (
                 <div className="p-4 bg-slate-800 rounded-2xl border border-slate-700">
                    <div className="flex items-center gap-2 text-yellow-500 text-xs font-bold mb-2 uppercase">
                        <RotateCcw size={14} />
                        ไกด์ไลน์สำหรับการคิด
                    </div>
                    <ul className="text-sm text-slate-300 space-y-2">
                        <li>• อ่านสิ่งที่ AI แนะนำในกล่องสีด้านบน</li>
                        <li>• ลองแยกตัวเลขออกมาคำนวณทีละส่วน</li>
                        <li>• อธิบายให้ชัดเจนว่าตัวเลขนั้นมาจากไหน</li>
                    </ul>
                 </div>
            )}
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800">
             <div className="flex justify-between items-center text-xs text-slate-500 mb-2">
                <span>จำนวนครั้งที่พยายาม</span>
                <span className="font-bold text-slate-300">{attempts} ครั้ง</span>
             </div>
             <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                    <div 
                        key={s} 
                        className={`flex-1 h-1.5 rounded-full ${s <= attempts ? 'bg-orange-500' : 'bg-slate-800'}`}
                    ></div>
                ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningStation;
