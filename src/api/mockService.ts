import { dashboardData, analysisData, datasetsData, assistantData, welcomeData } from './mockData';

// Helper to simulate network latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockApi = {
  getDashboardData: async () => {
    await delay(1200); // Simulate realistic 1.2s API load
    return dashboardData;
  },
  
  getAnalysisFindings: async () => {
    await delay(1500); 
    return analysisData;
  },
  
  getDatasetsData: async () => {
    await delay(800);
    return datasetsData;
  },

  getAssistantMessages: async () => {
    await delay(500);
    return assistantData;
  },

  getWelcomeStats: async () => {
    await delay(600);
    return welcomeData;
  }
};
