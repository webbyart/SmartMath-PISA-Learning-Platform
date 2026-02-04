
import React from 'react';
import { CheckCircle2, AlertCircle, HelpCircle, Lightbulb, GraduationCap } from 'lucide-react';
import { ScaffoldingLevel, Feedback } from '../types';
import { AnalysisResult } from '../services/geminiService';

interface FeedbackCardProps {
  feedback: AnalysisResult;
}

const FeedbackCard: React.FC<FeedbackCardProps> = ({ feedback }) => {
  const getConfig = () => {
    switch (feedback.level) {
      case ScaffoldingLevel.CONFIRMATIVE:
        return {
          icon: <CheckCircle2 className="text-green-500" size={24} />,
          title: 'คำตอบถูกต้อง',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          titleColor: 'text-green-800',
          tag: 'การช่วยเหลือ: ต่ำ',
          tagColor: 'bg-green-100 text-green-700'
        };
      case ScaffoldingLevel.GUIDED:
        return {
          icon: <Lightbulb className="text-yellow-500" size={24} />,
          title: 'คำตอบยังไม่ถูกต้อง',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
          titleColor: 'text-yellow-800',
          tag: 'การช่วยเหลือ: ชี้นำ (Guided)',
          tagColor: 'bg-yellow-100 text-yellow-700'
        };
      case ScaffoldingLevel.STEP_BY_STEP:
        return {
          icon: <HelpCircle className="text-orange-500" size={24} />,
          title: 'ลองพิจารณาทีละขั้น',
          bgColor: 'bg-orange-50',
          borderColor: 'border-orange-200',
          titleColor: 'text-orange-800',
          tag: 'การช่วยเหลือ: ปานกลาง (Steps)',
          tagColor: 'bg-orange-100 text-orange-700'
        };
      case ScaffoldingLevel.COGNITIVE:
        return {
          icon: <GraduationCap className="text-blue-500" size={24} />,
          title: 'โครงสร้างความคิดใหม่',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          titleColor: 'text-blue-800',
          tag: 'การช่วยเหลือ: สูง (Support)',
          tagColor: 'bg-blue-100 text-blue-700'
        };
      default:
        return {
          icon: <AlertCircle className="text-slate-500" size={24} />,
          title: 'ผลการวิเคราะห์',
          bgColor: 'bg-slate-50',
          borderColor: 'border-slate-200',
          titleColor: 'text-slate-800',
          tag: 'ระบบวิเคราะห์',
          tagColor: 'bg-slate-200 text-slate-700'
        };
    }
  };

  const config = getConfig();

  return (
    <div className={`${config.bgColor} border-2 ${config.borderColor} rounded-2xl p-5 animate-slideUp`}>
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
            {config.icon}
            <h4 className={`font-bold ${config.titleColor}`}>{config.title}</h4>
        </div>
        <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-tighter ${config.tagColor}`}>
            {config.tag}
        </span>
      </div>
      <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
        {feedback.message}
      </div>
    </div>
  );
};

export default FeedbackCard;
