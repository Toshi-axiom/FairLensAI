import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface AssistantContextType {
  isOpen: boolean;
  openAssistant: () => void;
  closeAssistant: () => void;
  toggleAssistant: () => void;
}

const AssistantContext = createContext<AssistantContextType | undefined>(undefined);

export const AssistantProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AssistantContext.Provider 
      value={{ 
        isOpen, 
        openAssistant: () => setIsOpen(true), 
        closeAssistant: () => setIsOpen(false),
        toggleAssistant: () => setIsOpen(prev => !prev)
      }}
    >
      {children}
    </AssistantContext.Provider>
  );
};

export const useAssistant = () => {
  const context = useContext(AssistantContext);
  if (context === undefined) {
    throw new Error('useAssistant must be used within an AssistantProvider');
  }
  return context;
};
