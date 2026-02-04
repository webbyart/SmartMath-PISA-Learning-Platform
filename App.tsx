
import React, { useState, useEffect } from 'react';
import { Layout, BookOpen, BarChart2, GraduationCap, LogIn, User as UserIcon } from 'lucide-react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import LearningStation from './components/LearningStation';
import TeacherDashboard from './components/TeacherDashboard';
import Auth from './components/Auth';
import { User, UserProgress } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<'learning' | 'dashboard'>('learning');
  const [progress, setProgress] = useState<UserProgress>({
    userId: '',
    completedStations: [],
    attempts: {},
    history: []
  });

  useEffect(() => {
    // Load progress from local storage if needed
    const savedUser = localStorage.getItem('smartmath_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  if (!user) {
    return <Auth onLogin={(u) => {
      setUser(u);
      localStorage.setItem('smartmath_user', JSON.stringify(u));
    }} />;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        userRole={user.role} 
        userName={user.name}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={user} onLogout={() => {
            setUser(null);
            localStorage.removeItem('smartmath_user');
        }} />
        
        <main className="flex-1 overflow-y-auto p-6 bg-slate-50">
          <div className="max-w-6xl mx-auto">
            {activeTab === 'learning' ? (
              <LearningStation 
                user={user} 
                onProgressUpdate={(newEntry) => {
                  setProgress(prev => ({
                    ...prev,
                    history: [...prev.history, newEntry]
                  }));
                }}
              />
            ) : (
              <TeacherDashboard />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
