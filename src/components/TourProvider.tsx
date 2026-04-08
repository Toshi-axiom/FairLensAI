import React, { useState, useEffect } from 'react';
import { Joyride, STATUS } from 'react-joyride';
import type { Step, CallBackProps } from 'react-joyride';
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
    },
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

  const handleJoyrideCallback = (data: CallBackProps) => {
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
          arrowColor: theme === 'dark' ? '#1E293B' : '#FFFFFF',
          backgroundColor: theme === 'dark' ? '#1E293B' : '#FFFFFF',
          overlayColor: 'rgba(0, 0, 0, 0.6)',
          primaryColor: '#3B82F6',
          textColor: theme === 'dark' ? '#F8FAFC' : '#0F172A',
          zIndex: 10000,
        },
        tooltipContainer: {
          textAlign: 'left',
          fontFamily: '"Exo 2", sans-serif',
        },
        buttonNext: {
          fontFamily: '"Chakra Petch", sans-serif',
          fontWeight: 600,
          borderRadius: 8,
        },
        buttonBack: {
          color: theme === 'dark' ? '#94A3B8' : '#475569',
        }
      }}
    />
  );
};
