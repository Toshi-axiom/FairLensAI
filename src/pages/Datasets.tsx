import React, { useState, useRef } from 'react';
import { GlassCard } from '../components/GlassCard';
import { UploadCloud, FileText, CheckCircle, Database, AlertTriangle, Link as LinkIcon } from 'lucide-react';
import { NeonButton } from '../components/NeonButton';
import { useMockApi } from '../hooks/useMockApi';
import { mockApi } from '../api/mockService';

export const Datasets = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [selectedSourceId, setSelectedSourceId] = useState<string | null>(null);
  const [uploadMode, setUploadMode] = useState<'local' | 'online'>('local');
  const [onlineUrl, setOnlineUrl] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { data, isLoading } = useMockApi(mockApi.getDatasetsData);

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
          {/* Upload and Connect Options */}
          <div className="flex flex-col gap-4">
            <div className="flex bg-dark-800/80 border border-border p-1 rounded-lg w-max shadow-inner backdrop-blur-sm mx-auto lg:mx-0">
              <button 
                className={`px-6 py-2 rounded-md font-medium text-sm transition-all duration-300 ${uploadMode === 'local' ? 'bg-dark-700 text-white shadow-md' : 'text-tertiary hover:text-white'}`}
                onClick={() => setUploadMode('local')}
              >
                Local Upload
              </button>
              <button 
                className={`px-6 py-2 rounded-md font-medium text-sm transition-all duration-300 ${uploadMode === 'online' ? 'bg-dark-700 text-white shadow-md' : 'text-tertiary hover:text-white'}`}
                onClick={() => setUploadMode('online')}
              >
                Online URL
              </button>
            </div>

            {/* Content Zone */}
            <div 
              className={`relative rounded-xl border-2 transition-all duration-300 p-8 sm:p-12 text-center flex flex-col items-center justify-center min-h-[300px] sm:min-h-[340px] overflow-hidden ${
                uploadMode === 'local' && isDragging 
                  ? 'border-neon-cyan bg-neon-cyan/5 shadow-[0_0_30px_rgba(34,211,238,0.2)] dashed' 
                  : uploadMode === 'local' 
                    ? 'border-dashed border-border bg-dark-800/50 hover:bg-dark-800 hover:border-border'
                    : 'border-solid border-border bg-dark-800/50'
              }`}
              onDragOver={(e) => { e.preventDefault(); if (uploadMode === 'local') setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => { e.preventDefault(); setIsDragging(false); }}
            >
              {uploadMode === 'local' ? (
                <div className="flex flex-col items-center w-full max-w-md mx-auto animate-in fade-in zoom-in-95 duration-300">
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    onChange={handleFileChange}
                    accept=".csv,.json,.parquet"
                  />
                  <div className="mb-6 p-5 rounded-full bg-dark-900 shadow-inner border border-border shrink-0">
                    <UploadCloud size={48} className={`transition-colors ${isDragging ? 'text-neon-cyan' : 'text-tertiary'}`} />
                  </div>
                  <h3 className="text-xl font-display font-semibold mb-2">
                    {selectedFile ? `Ready: ${selectedFile}` : 'Drag & Drop Dataset'}
                  </h3>
                  <p className="text-tertiary mb-8 text-sm">Supports CSV, JSON, and Parquet files (Max 500MB)</p>
                  <div className="-mt-2 w-full flex justify-center">
                    <NeonButton 
                      variant="cyan" 
                      label={selectedFile ? "Upload Ready" : "Browse Files"} 
                      onClick={() => fileInputRef.current?.click()} 
                    />
                  </div>
                </div>
              ) : (
                <div className="w-full max-w-md flex flex-col items-center w-full mx-auto animate-in fade-in zoom-in-95 duration-300">
                  <div className="mb-6 p-5 rounded-full bg-dark-900 shadow-inner border border-border shrink-0">
                    <LinkIcon size={48} className="text-neon-violet" />
                  </div>
                  <h3 className="text-xl font-display font-semibold mb-2">
                    Connect Remote Dataset
                  </h3>
                  <p className="text-tertiary mb-8 text-sm text-center">
                    Enter a direct URL for large datasets stored in S3, GCS, Azure or via HTTP.
                  </p>
                  <div className="w-full flex flex-col gap-4">
                    <input 
                      type="text" 
                      placeholder="e.g., s3://my-bucket/dataset.parquet"
                      className="w-full px-4 py-3 rounded-lg bg-dark-900 border border-border text-white placeholder-tertiary/50 focus:outline-none focus:border-neon-violet focus:ring-1 focus:ring-neon-violet transition-colors font-mono text-sm"
                      value={onlineUrl}
                      onChange={(e) => setOnlineUrl(e.target.value)}
                    />
                    <div className="w-full flex justify-center">
                      <NeonButton 
                        variant="violet" 
                        label="Connect Dataset" 
                        onClick={() => {
                          if (onlineUrl) {
                            setSelectedFile(onlineUrl.split('/').pop() || 'Remote Dataset');
                            setUploadMode('local');
                          }
                        }} 
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Database Connections */}
          <GlassCard>
            <h3 className="text-lg font-display font-semibold mb-6 flex items-center gap-2">
              <Database size={20} className="text-neon-violet" /> Connected Sources
            </h3>
            <div className="space-y-4">
              {isLoading ? (
                <div className="flex justify-center p-4"><div className="animate-spin h-6 w-6 border-b-2 border-neon-violet rounded-full"></div></div>
              ) : (
                data?.connectedSources.map((db, i) => (
                  <div 
                    key={i} 
                    onClick={() => setSelectedSourceId(db.id)}
                    className={`flex items-center justify-between p-4 rounded-lg bg-dark-800 border cursor-pointer transition-all ${selectedSourceId === db.id ? 'border-neon-violet shadow-[0_0_15px_rgba(139,92,246,0.15)] ring-1 ring-neon-violet/50' : 'border-border hover:border-border/80'}`}
                  >
                    <div className="flex items-center gap-4">
                      <FileText className={`transition-colors ${selectedSourceId === db.id ? 'text-neon-violet' : 'text-tertiary'}`} />
                      <div>
                        <p className={`font-medium transition-colors ${selectedSourceId === db.id ? 'text-white' : 'text-primary'}`}>{db.name}</p>
                        <p className="text-xs text-tertiary uppercase tracking-wider">{db.type}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-tertiary">{db.status}</span>
                      <CheckCircle size={16} className={db.color} />
                    </div>
                  </div>
                ))
              )}
            </div>
          </GlassCard>
        </div>

        {/* Data Dictionary Sidebar */}
        <div className="lg:col-span-1">
          <GlassCard className="h-full">
            <h3 className="text-lg font-display font-semibold mb-6">Data Dictionary</h3>
            <p className="text-sm text-tertiary mb-6">Select a dataset to view its implied schema and column analysis.</p>
            
            <div className="space-y-3">
              {isLoading ? (
                <div className="flex justify-center p-4"><div className="animate-spin h-6 w-6 border-b-2 border-neon-cyan rounded-full"></div></div>
              ) : !selectedSourceId ? (
                <div className="p-8 text-center text-tertiary border border-dashed border-border rounded-xl">
                  <FileText className="mx-auto mb-3 opacity-50" size={32} />
                  <p>No dataset selected.</p>
                  <p className="text-xs mt-1 opacity-70">Click a connected source to view.</p>
                </div>
              ) : data?.dataDictionary[selectedSourceId as keyof typeof data.dataDictionary] ? (
                data.dataDictionary[selectedSourceId as keyof typeof data.dataDictionary].map((field, i) => (
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
                ))
              ) : null}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};
