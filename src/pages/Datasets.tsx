import React, { useState, useRef } from 'react';
import { GlassCard } from '../components/GlassCard';
import { UploadCloud, FileText, CheckCircle, Database, AlertTriangle } from 'lucide-react';
import { NeonButton } from '../components/NeonButton';

export const Datasets = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0].name);
    }
  };

  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h2 className="text-3xl font-display font-bold text-primary mb-2 tracking-wide text-glow">Dataset Integration</h2>
        <p className="text-tertiary font-light">Upload datasets or connect databases for bias scanning.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Upload Zone */}
          <div 
            className={`relative rounded-xl border-2 border-dashed transition-all duration-300 p-12 text-center flex flex-col items-center justify-center min-h-[300px] ${
              isDragging 
                ? 'border-neon-cyan bg-neon-cyan/5 shadow-[0_0_30px_rgba(34,211,238,0.2)]' 
                : 'border-border bg-dark-800/50 hover:bg-dark-800 hover:border-border'
            }`}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => { e.preventDefault(); setIsDragging(false); }}
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              onChange={handleFileChange}
              accept=".csv,.json,.parquet"
            />
            <div className="mb-6 p-4 rounded-full bg-dark-900 shadow-inner border border-border">
              <UploadCloud size={48} className={`transition-colors ${isDragging ? 'text-neon-cyan' : 'text-tertiary'}`} />
            </div>
            <h3 className="text-xl font-display font-semibold mb-2">
              {selectedFile ? `Ready: ${selectedFile}` : 'Drag & Drop Dataset'}
            </h3>
            <p className="text-tertiary mb-6 text-sm">Supports CSV, JSON, and Parquet files (Max 500MB)</p>
            <NeonButton 
              variant="cyan" 
              label={selectedFile ? "Upload Ready" : "Browse Files"} 
              onClick={() => fileInputRef.current?.click()} 
            />
          </div>

          {/* Database Connections */}
          <GlassCard>
            <h3 className="text-lg font-display font-semibold mb-6 flex items-center gap-2">
              <Database size={20} className="text-neon-violet" /> Connected Sources
            </h3>
            <div className="space-y-4">
              {[
                { name: 'Production_User_Data', type: 'PostgreSQL', status: 'Syncing', color: 'text-neon-cyan' },
                { name: 'Historical_Loans_2023', type: 'AWS S3 CSV', status: 'Ready', color: 'text-emerald-400' },
              ].map((db, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-dark-800 border border-border hover:border-border transition-colors">
                  <div className="flex items-center gap-4">
                    <FileText className="text-tertiary" />
                    <div>
                      <p className="font-medium text-primary">{db.name}</p>
                      <p className="text-xs text-tertiary uppercase tracking-wider">{db.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-tertiary">{db.status}</span>
                    <CheckCircle size={16} className={db.color} />
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Data Dictionary Sidebar */}
        <div className="lg:col-span-1">
          <GlassCard className="h-full">
            <h3 className="text-lg font-display font-semibold mb-6">Data Dictionary</h3>
            <p className="text-sm text-tertiary mb-6">Select a dataset to view its implied schema and column analysis.</p>
            
            <div className="space-y-3">
              {[
                { field: 'applicant_income', type: 'Numeric', meaning: 'Annual income in USD', flag: true },
                { field: 'zip_code', type: 'Categorical', meaning: 'Geographic location', flag: true },
                { field: 'credit_score', type: 'Numeric', meaning: 'FICO score', flag: false },
                { field: 'loan_status', type: 'Boolean', meaning: 'Target variable', flag: false },
              ].map((field, i) => (
                <div key={i} className={`p-3 rounded-lg border text-sm ${field.flag ? 'bg-neon-violet/10 border-neon-violet/30' : 'bg-dark-800 border-border'}`}>
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-mono text-primary">{field.field}</span>
                    <span className="text-xs text-tertiary">{field.type}</span>
                  </div>
                  <p className="text-tertiary text-xs">{field.meaning}</p>
                  {field.flag && (
                    <div className="mt-2 text-xs text-neon-violet flex items-center gap-1">
                      <AlertTriangle size={12} /> High bias risk indicator
                    </div>
                  )}
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};
