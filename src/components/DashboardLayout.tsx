import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { TourProvider } from './TourProvider';
import { AssistantProvider } from '../contexts/AssistantContext';
import { GlobalAssistant } from './GlobalAssistant';

export const DashboardLayout = () => {
  return (
    <AssistantProvider>
      <div className="flex bg-dark-900 overflow-hidden relative text-primary antialiased h-screen w-screen transition-colors duration-500">
        <TourProvider />
        {/* Background ambient glow - shifting and pulsating */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-neon-blue/20 rounded-full blur-[120px] pointer-events-none z-0 animate-blob" style={{ animationDelay: '0s' }} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-neon-violet/10 rounded-full blur-[120px] pointer-events-none z-0 animate-blob" style={{ animationDelay: '2s', animationDirection: 'reverse' }} />

        <Sidebar />
        
        <div className="flex-1 flex flex-col min-w-0 z-10 relative h-full">
          <TopBar />
          <main className="flex-1 overflow-y-auto overflow-x-hidden p-6 md:p-8">
            <div className="w-full max-w-7xl mx-auto pb-20 fade-in">
              <Outlet />
            </div>
          </main>
        </div>

        <GlobalAssistant />
      </div>
    </AssistantProvider>
  );
};
