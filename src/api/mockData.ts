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
    { name: 'Production_User_Data', type: 'PostgreSQL', status: 'Syncing', color: 'text-neon-cyan' },
    { name: 'Historical_Loans_2023', type: 'AWS S3 CSV', status: 'Ready', color: 'text-emerald-400' },
  ],
  dataDictionary: [
    { field: 'applicant_income', type: 'Numeric', meaning: 'Annual income in USD', flag: true },
    { field: 'zip_code', type: 'Categorical', meaning: 'Geographic location', flag: true },
    { field: 'credit_score', type: 'Numeric', meaning: 'FICO score', flag: false },
    { field: 'loan_status', type: 'Boolean', meaning: 'Target variable', flag: false },
  ]
};
