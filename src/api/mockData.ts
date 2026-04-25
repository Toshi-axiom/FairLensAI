export const dashboardData = {
  biasData: [
    { name: 'Model V1', score: 65 },
    { name: 'Model V2', score: 72 },
    { name: 'Model V3', score: 85 },
    { name: 'Model V4', score: 88 },
    { name: 'Model V5', score: 94 },
  ],
  demographicData: [
    { group: 'Segment A', pass: 85, fail: 15 },
    { group: 'Segment B', pass: 42, fail: 58 },
    { group: 'Segment C', pass: 78, fail: 22 },
    { group: 'Segment D', pass: 88, fail: 12 },
  ],
  stats: {
    activeDatasets: 14,
    anomaliesDetect: 3,
    globalFairness: 94,
    protectedOrgs: 8
  }
};

export const analysisData = {
  findings: [
    {
      id: 1,
      title: 'Gender Imbalance in "Applicant_Income"',
      description: "Model assigns 15% lower scores to female applicants holding identical financial metrics. Feature 'zip_code' acts as a proxy.",
      type: "PROXY_VARIABLE",
      tag: "Disparate Impact",
      color: "violet"
    },
    {
      id: 2,
      title: 'Underrepresentation in Training Data',
      description: "Demographic group 'Native American' constitutes only 0.4% of the dataset, leading to high variance in prediction accuracy.",
      type: "SAMPLING_BIAS",
      tag: null,
      color: "blue"
    }
  ]
};

export const datasetsData = {
  connectedSources: [
    { id: '1', name: 'Production_User_Data', type: 'PostgreSQL', status: 'Syncing', color: 'text-neon-cyan' },
    { id: '2', name: 'Historical_Loans_2023', type: 'AWS S3 CSV', status: 'Ready', color: 'text-emerald-400' },
  ],
  dataDictionary: {
    '1': [
      { field: 'user_id', type: 'String', meaning: 'Unique identifier v4', flag: false },
      { field: 'age', type: 'Numeric', meaning: 'Age of applicant in years', flag: true },
      { field: 'marital_status', type: 'Categorical', meaning: 'Self-reported status', flag: true },
    ],
    '2': [
      { field: 'applicant_income', type: 'Numeric', meaning: 'Annual income in USD', flag: true },
      { field: 'zip_code', type: 'Categorical', meaning: 'Geographic location', flag: true },
      { field: 'credit_score', type: 'Numeric', meaning: 'FICO score', flag: false },
      { field: 'loan_status', type: 'Boolean', meaning: 'Target variable', flag: false },
    ]
  }
};

export const assistantData = {
  initialMessages: [
    { role: 'assistant', text: "I've detected a significant disparate impact related to gender in the latest model based on the zip_code feature. Would you like me to suggest re-weighing strategies?" },
    { role: 'user', text: "Show me the proxy variables." },
    { role: 'assistant', text: "The primary proxy variable is zip_code. Because historical redlining affects geographic distribution, using zip code introduces indirect bias. I recommend dropping this column or applying a fairness-aware adversarial debiasing technique." }
  ]
};

export const welcomeData = {
  stats: [
    { label: 'Models Monitored', value: '10M+', color: 'text-neon-cyan', shadow: 'drop-shadow-[0_0_20px_rgba(34,211,238,0.5)]' },
    { label: 'Biases Mitigated', value: '8.4B', color: 'text-neon-violet', shadow: 'drop-shadow-[0_0_20px_rgba(139,92,246,0.5)]' },
    { label: 'Uptime', value: '99.9%', color: 'text-neon-blue', shadow: 'drop-shadow-[0_0_20px_rgba(59,130,246,0.5)]' },
    { label: 'Enterprise Teams', value: '400+', color: 'text-emerald-400', shadow: 'drop-shadow-[0_0_20px_rgba(52,211,153,0.5)]' },
  ]
};
