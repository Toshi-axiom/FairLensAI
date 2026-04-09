import React, { useState, useEffect } from 'react';
import * as JoyrideModule from 'react-joyride';
import type { Step } from 'react-joyride';

const Joyride = (JoyrideModule as any).default || (JoyrideModule as any).Joyride || JoyrideModule;
const STATUS = JoyrideModule.STATUS;
import { useTheme } from '../contexts/ThemeContext';

export const TourProvider = () => {
  const { theme } = useTheme();
  const [run, setRun] = useState(false);

  useEffect(() => {
    const hasRun = localStorage.getItem('fairlens-tour-completed');
    if (!hasRun) {
      setTimeout(() => setRun(true), 1000);
    }
  }, []);

  const steps: Step[] = [
    {
      target: '.tour-step-1',
      content: 'Welcome to FairLens AI! This main view provides a high-level overview of system fairness.',
      placement: 'center',
      disableBeacon: true,
    } as any,
    {
      target: '.tour-step-2',
      content: 'Critical Anomalies instantly alert you to demographic groups experiencing disparate impact.',
      placement: 'bottom',
    },
    {
      target: '.tour-step-3',
      content: 'Navigate here to upload datasets or open the AI analysis engine for deeper explanations.',
      placement: 'right',
    }
  ];

  const handleJoyrideCallback = (data: any) => {
    const { status } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];
    
    if (finishedStatuses.includes(status)) {
      setRun(false);
      localStorage.setItem('fairlens-tour-completed', 'true');
    }
  };

  return (
    <Joyride
      steps={steps}
      run={run}
      continuous
      scrollToFirstStep
      showProgress
      showSkipButton
      callback={handleJoyrideCallback}
      styles={{
        options: {
          arrowColor: 'rgba(30, 41, 59, 1)',
          backgroundColor: 'rgba(30, 41, 59, 1)',
          overlayColor: 'rgba(0, 0, 0, 0.7)',
          primaryColor: 'var(--neon-cyan)',
          textColor: '#F8FAFC',
          zIndex: 10000,
        },
        tooltip: {
          background: 'rgba(15, 23, 42, 0.95)',
          color: '#F8FAFC',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 0 30px rgba(0, 0, 0, 0.8), 0 0 10px rgba(34, 211, 238, 0.2)',
          borderRadius: '16px',
          padding: '24px',
        },
        tooltipContainer: {
          textAlign: 'left' as const,
          fontFamily: '"Exo 2", sans-serif',
          color: '#F8FAFC',
        },
        tooltipContent: {
          color: '#e2e8f0',
          padding: '10px 0',
        },
        tooltipTitle: {
          color: '#ffffff',
          fontWeight: 'bold',
        },
        buttonNext: {
          fontFamily: '"Chakra Petch", sans-serif',
          fontWeight: 600,
          borderRadius: '8px',
          backgroundColor: 'var(--neon-primary, #0891B2)',
          padding: '8px 16px',
        },
        buttonBack: {
          color: '#94A3B8',
          marginRight: '10px',
        },
        buttonSkip: {
          color: '#64748B',
          fontSize: '12px',
        }
      } as any}
    />
  );
};
