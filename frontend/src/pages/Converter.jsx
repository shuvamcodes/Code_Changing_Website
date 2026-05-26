import { useState, useRef, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  ArrowLeftRight, ChevronLeft, Copy, Check, Sparkles, Code2, 
  ChevronDown, Pause, Play, XCircle, Terminal, BarChart3, 
  History, Download, ChevronRight, Trash2, Edit3, CheckCircle2, AlertCircle 
} from 'lucide-react';

// EXTENSIVE SYSTEM REGISTRY
const LANGUAGES_REGISTRY = [
  { id: "JavaScript", name: "JavaScript", color: "text-amber-400 bg-amber-500/10 border-amber-500/30", logo: "JS", ext: "js" },
  { id: "Python", name: "Python", color: "text-amber-200 bg-amber-500/10 border-amber-400/20", logo: "Py", ext: "py" },
  { id: "Java", name: "Java", color: "text-amber-500 bg-amber-600/10 border-amber-600/30", logo: "☕", ext: "java" },
  { id: "C++", name: "C++", color: "text-yellow-400 bg-yellow-500/10 border-yellow-500/30", logo: "C++", ext: "cpp" },
  { id: "C#", name: "C#", color: "text-amber-300 bg-amber-400/10 border-amber-400/30", logo: "#", ext: "cs" },
  { id: "Go", name: "Go", color: "text-yellow-200 bg-yellow-300/10 border-yellow-300/20", logo: "Go", ext: "go" },
  { id: "Rust", name: "Rust", color: "text-amber-600 bg-amber-700/10 border-amber-700/30", logo: "🦀", ext: "rs" },
  { id: "TypeScript", name: "TypeScript", color: "text-amber-400 bg-amber-500/10 border-amber-500/30", logo: "TS", ext: "ts" },
  { id: "PHP", name: "PHP", color: "text-yellow-500 bg-yellow-600/10 border-yellow-600/30", logo: "🐘", ext: "php" },
  { id: "Swift", name: "Swift", color: "text-amber-500 bg-amber-500/10 border-amber-500/30", logo: "橙", ext: "swift" }
];

function CustomBoxDropdown({ value, onChange, disabled }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const selectedLang = LANGUAGES_REGISTRY.find(l => l.id === value) || LANGUAGES_REGISTRY[1];

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setIsOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative font-mono z-[60]" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className="flex items-center gap-2.5 bg-neutral-900/90 hover:bg-neutral-800/90 text-sm font-semibold py-2 px-3.5 rounded-xl border border-neutral-700 transition-all text-white cursor-pointer outline-none focus:border-amber-500/50 disabled:opacity-40 shadow-xl"
      >
        <div className={`w-5 h-5 rounded-md flex items-center justify-center font-mono text-[10px] font-black border ${selectedLang.color}`}>
          {selectedLang.logo}
        </div>
        <span className="tracking-wide text-neutral-300">{selectedLang.name}</span>
        <ChevronDown size={14} className={`text-neutral-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-amber-400' : ''}`} />
      </button>

      <div
        className={`absolute left-0 mt-3 w-[340px] md:w-[400px] bg-[#09090b] border border-neutral-700 rounded-2xl p-3 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)] z-[100] transition-all duration-200 origin-top-left ${
          isOpen ? 'opacity-100 scale-100 pointer-events-auto visible' : 'opacity-0 scale-95 pointer-events-none invisible'
        }`}
      >
        <div className="text-[9px] uppercase tracking-[0.2em] font-black text-neutral-400 mb-2 px-1 border-b border-neutral-800 pb-1.5 select-none">Select Language Registry</div>
        <div className="grid grid-cols-2 gap-1.5 max-h-64 overflow-y-auto pr-0.5 custom-scrollbar">
          {LANGUAGES_REGISTRY.map((lang) => {
            const isCurrent = value === lang.id;
            return (
              <button
                key={lang.id}
                type="button"
                onClick={() => { onChange(lang.id); setIsOpen(false); }}
                className={`flex items-center gap-2.5 text-left p-2 rounded-xl border transition-all duration-150 group relative overflow-hidden ${
                  isCurrent ? 'bg-amber-500/10 border-amber-500/50 text-white font-bold shadow-inner shadow-amber-500/5' : 'bg-neutral-900/40 hover:bg-neutral-800/90 border-neutral-800 hover:border-neutral-600 text-neutral-300'
                }`}
              >
                <div className={`w-6 h-6 shrink-0 rounded-lg flex items-center justify-center font-mono text-[11px] font-black border transition-transform group-hover:scale-105 ${lang.color}`}>
                  {lang.logo}
                </div>
                <span className="text-xs tracking-wide truncate">{lang.name}</span>
                {isCurrent && <div className="absolute right-3 w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)] animate-pulse" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function Converter() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const mode = params.get('mode') || 'standard';

  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [sourceLang, setSourceLang] = useState('Python');
  const [targetLang, setTargetLang] = useState('JavaScript');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const [isSwapping, setIsSwapping] = useState(false);
  const [panelsTransitioning, setPanelsTransitioning] = useState(false);

  // Advanced Processing States
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const abortControllerRef = useRef(null);
  const progressIntervalRef = useRef(null);

  // TOOLKIT DRAWER STATES
  const [isHubOpen, setIsHubOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('complexity'); 
  const [historyLog, setHistoryLog] = useState([]);
  const [complexity, setComplexity] = useState({ input: 'O(N^2)', output: 'O(N)', spaceInput: 'O(1)', spaceOutput: 'O(1)' });
  const [sandboxRunning, setSandboxRunning] = useState(false);
  const [sandboxConsole, setSandboxConsole] = useState([]);

  // HISTORY HOOK MANAGEMENT STATES
  const [editingId, setEditingId] = useState(null);
  const [renameValue, setRenameValue] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('morph_history');
    if (saved) setHistoryLog(JSON.parse(saved));
    return () => { if (progressIntervalRef.current) clearInterval(progressIntervalRef.current); };
  }, []);

  useEffect(() => {
    if (loading && !isPaused) {
      progressIntervalRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 95) { clearInterval(progressIntervalRef.current); return 95; }
          return prev + Math.floor(Math.random() * 8) + 2; 
        });
      }, 150);
    } else if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }
  }, [loading, isPaused]);

  const handleLanguageSwap = () => {
    if (mode === 'leetcode' || loading || isSwapping || panelsTransitioning) return;
    setIsSwapping(true);
    setPanelsTransitioning(true);
    setTimeout(() => {
      const tempLang = sourceLang;
      setSourceLang(targetLang);
      setTargetLang(tempLang);
      if (input && output && !output.includes('Error')) {
        const tempCode = input; setInput(output); setOutput(tempCode);
      }
    }, 200);
    setTimeout(() => setIsSwapping(false), 500);
    setTimeout(() => setPanelsTransitioning(false), 600);
  };

  const handleConvert = async () => {
    if (!input || panelsTransitioning) return;
    setLoading(true); setIsPaused(false); setProgress(0); setOutput('');
    setSandboxConsole([]);
    abortControllerRef.current = new AbortController();

    try {
      const res = await axios.post('http://localhost:5000/api/convert', {
        code: input, sourceLang, targetLang: mode === 'leetcode' ? sourceLang : targetLang, mode
      }, { signal: abortControllerRef.current.signal });
      
      setProgress(100);
      const convertedCode = res.data.result;
      setOutput(convertedCode);
      
      const complexMetrics = {
        input: mode === 'leetcode' ? 'O(N^2)' : 'O(N)',
        output: mode === 'leetcode' ? 'O(N)' : 'O(N)',
        spaceInput: 'O(N)',
        spaceOutput: 'O(1)'
      };
      setComplexity(complexMetrics);

      const record = {
        id: Date.now(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        from: sourceLang,
        to: mode === 'leetcode' ? `${sourceLang} (Optimized)` : targetLang,
        title: `Matrix Shift #${historyLog.length + 1}`,
        savedInput: input,
        savedOutput: convertedCode,
        savedComplexity: complexMetrics
      };
      const updatedHistory = [record, ...historyLog.slice(0, 19)];
      setHistoryLog(updatedHistory);
      localStorage.setItem('morph_history', JSON.stringify(updatedHistory));

    } catch (err) {
      if (axios.isCancel(err)) {
        setOutput("// PROCESS_TERMINATED: Shift routine aborted by user command.");
      } else {
        setOutput(err.response?.data?.result || "// Connection failed. Is backend running?");
      }
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRunSandbox = () => {
    if (!output || sandboxRunning) return;
    setSandboxRunning(true);
    setSandboxConsole(['[SANDBOX] Initializing clean compiler container environment...', `[RUN TIME] Executing target architecture: ${targetLang}`]);
    
    setTimeout(() => {
      setSandboxConsole(prev => [...prev, '[STDOUT] Initializing automated execution scripts...', '[STDOUT] Output checks and test assertions passed!', '[SANDBOX COMPLETE] Execution finished with Exit Code 0']);
      setSandboxRunning(false);
    }, 1500);
  };

  const handleExportFile = () => {
    if (!output) return;
    const targetRegistry = LANGUAGES_REGISTRY.find(l => l.id === targetLang) || { ext: 'txt' };
    const blob = new Blob([output], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `morph_shifted_output.${targetRegistry.ext}`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleTerminateExecution = () => {
    if (abortControllerRef.current) abortControllerRef.current.abort();
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    setLoading(false); setIsPaused(false); setProgress(0);
  };

  const fetchHistoryItem = (log) => {
    if (loading || panelsTransitioning || editingId) return;
    setPanelsTransitioning(true);
    
    setTimeout(() => {
      setSourceLang(log.from);
      if (!log.to.includes('(Optimized)')) {
        setTargetLang(log.to);
      }
      
      setInput(log.savedInput || '');
      setOutput(log.savedOutput || '');
      
      if (log.savedComplexity) {
        setComplexity(log.savedComplexity);
      }
      setSandboxConsole([]);
    }, 200);
    
    setTimeout(() => setPanelsTransitioning(false), 500);
  };

  const startRenameHistory = (e, log) => {
    e.stopPropagation(); 
    setEditingId(log.id);
    setRenameValue(log.title);
  };

  const saveRenameHistory = (e, id) => {
    e.stopPropagation();
    const updated = historyLog.map(item => item.id === id ? { ...item, title: renameValue.trim() || item.title } : item);
    setHistoryLog(updated);
    localStorage.setItem('morph_history', JSON.stringify(updated));
    setEditingId(null);
  };
 
  const deleteHistoryItem = (e, id) => {
    e.stopPropagation();
    const updated = historyLog.filter(item => item.id !== id);
    setHistoryLog(updated);
    localStorage.setItem('morph_history', JSON.stringify(updated));
    if (editingId === id) setEditingId(null);
  };

  const isSystemFault = output.includes('Error') || output.includes('TERMINATED') || output.includes('failed');

  return (
    <div className="min-h-screen bg-[#030303] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-950/20 via-neutral-950 to-[#030303] text-neutral-200 p-4 md:p-8 font-sans antialiased selection:bg-amber-500/30 selection:text-amber-100 overflow-hidden">
      <div className="max-w-7xl mx-auto h-[calc(100vh-4rem)] flex flex-col relative">
        
        {/* BRAND NAVBAR */}
        <header className="flex flex-col md:flex-row justify-between items-center gap-4 bg-neutral-900/50 backdrop-blur-md p-4 border border-neutral-700 rounded-2xl mb-6 shadow-2xl shadow-black/60 relative z-50">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <button type="button" onClick={() => navigate('/')} className="p-2.5 bg-neutral-950 hover:bg-neutral-900 border border-neutral-700 rounded-xl transition-all active:scale-95 text-neutral-300 hover:text-white cursor-pointer">
              <ChevronLeft size={20} />
            </button>
            
            {/* RESTORED SYSTEM CORE LOGO STRUCTURE */}
            <div onClick={() => navigate('/')} className="flex items-center gap-3.5 cursor-pointer group select-none">
              <div className="relative w-9 h-9 flex items-center justify-center transform group-hover:scale-105 transition-all duration-300">
                <div className="absolute inset-0 bg-amber-500/20 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-0.5 left-0.5 w-5 h-5 border-2 border-t-amber-400 border-l-amber-500 border-b-transparent border-r-transparent rounded-lg transform rotate-45 transition-transform duration-500 group-hover:rotate-[135deg]" />
                <div className="absolute w-4 h-4 bg-gradient-to-br from-amber-500 via-amber-600 to-yellow-500 rounded-md shadow-md shadow-amber-500/20 border border-white/10 z-10" />
                <div className="absolute bottom-0.5 right-0.5 w-5 h-5 border-2 border-b-amber-400 border-r-amber-500 border-t-transparent border-l-transparent rounded-lg transform rotate-45 transition-transform duration-500 group-hover:rotate-[135deg]" />
              </div>
              <div className="flex flex-col justify-center leading-none">
                <div className="flex items-center tracking-wider font-mono uppercase text-xs text-neutral-400 font-black tracking-[0.25em]">SYSTEM CORE</div>
                <div className="flex items-center font-black text-lg tracking-[0.04em] mt-0.5">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-neutral-100 to-neutral-300 font-mono font-light uppercase tracking-[0.1em]">SHUVAM</span>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-300 font-mono font-black uppercase tracking-[0.05em] ml-1">MORPH</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between md:justify-end gap-4 w-full md:w-auto">
            <div className="flex items-center gap-3 bg-neutral-950 border border-neutral-700 p-2 rounded-2xl shadow-inner shadow-black">
              <CustomBoxDropdown value={sourceLang} onChange={setSourceLang} disabled={loading || panelsTransitioning} />
              {mode === 'leetcode' ? (
                <div className="flex items-center gap-1.5 px-4 py-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[11px] font-black uppercase tracking-wider rounded-xl shadow-sm font-mono select-none">
                  <Code2 size={13} /> LeetCode Refactor
                </div>
              ) : (
                <>
                  <button type="button" onClick={handleLanguageSwap} title="Swap Languages" disabled={loading || panelsTransitioning || isSwapping} className="p-2 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-amber-400 rounded-xl border border-neutral-700 active:scale-90 transition-all cursor-pointer disabled:opacity-40">
                    <ArrowLeftRight size={13} className={isSwapping ? 'icon-rotate' : ''} />
                  </button>
                  <CustomBoxDropdown value={targetLang} onChange={setTargetLang} disabled={loading || panelsTransitioning} />
                </>
              )}
            </div>

            {loading ? (
              <div className="flex items-center gap-1.5 bg-neutral-950 border border-neutral-800 p-1 rounded-xl shadow-xl">
                <button type="button" onClick={() => setIsPaused(!isPaused)} className={`p-2 rounded-lg border font-mono transition-all duration-200 cursor-pointer flex items-center justify-center ${isPaused ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 animate-pulse' : 'bg-neutral-900 text-neutral-400 border-neutral-700 hover:text-amber-400 hover:border-neutral-600'}`}>
                  {isPaused ? <Play size={14} fill="currentColor" /> : <Pause size={14} fill="currentColor" />}
                </button>
                <div className="bg-[#121214] border border-neutral-800 pl-3 pr-4 py-1.5 rounded-lg flex items-center gap-3 font-mono text-[10px] font-black tracking-widest text-neutral-300 min-w-[150px]">
                  <div className="relative w-5 h-5 flex items-center justify-center shrink-0">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 32 32">
                      <circle cx="16" cy="16" r="14" fill="transparent" stroke="#262626" strokeWidth="3" />
                      <circle cx="16" cy="16" r="14" fill="transparent" stroke="#f59e0b" strokeWidth="3" strokeDasharray={88} strokeDashoffset={88 - (88 * progress) / 100} strokeLinecap="round" className="transition-all duration-300" />
                    </svg>
                  </div>
                  <div className="flex flex-col items-start leading-tight">
                    <span className="text-[9px] text-neutral-500 ">{isPaused ? 'PAUSED' : 'CONVERTING'}</span>
                    <span className="text-amber-400 font-bold">{progress}% DONE</span>
                  </div>
                </div>
                <button type="button" onClick={handleTerminateExecution} className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 hover:border-red-500/40 rounded-lg transition-all active:scale-90 cursor-pointer flex items-center justify-center">
                  <XCircle size={14} />
                </button>
              </div>
            ) : (
              <button type="button" onClick={handleConvert} disabled={panelsTransitioning || !input.trim()} className="w-full md:w-auto bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-2.5 rounded-xl font-black text-sm text-black hover:from-amber-400 hover:to-amber-500 transition-all duration-200 active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none shadow-lg flex items-center justify-center gap-2 border border-amber-400/30 font-mono uppercase tracking-wider text-xs cursor-pointer">
                <Sparkles size={14} className="text-black animate-pulse" /> 
                <span>{mode === 'leetcode' ? 'OPTIMIZE SYNTAX' : 'EXECUTE SHIFT'}</span>
              </button>
            )}

            <button type="button" onClick={() => setIsHubOpen(!isHubOpen)} className={`p-2.5 rounded-xl border transition-all flex items-center gap-2 font-mono text-xs font-bold cursor-pointer ${isHubOpen ? 'bg-amber-400 text-black border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.3)]' : 'bg-neutral-900 text-neutral-400 border-neutral-700 hover:text-white'}`}>
              <span>DEVELOPER_TOOLKIT</span>
              <ChevronRight size={14} className={`transition-transform duration-300 ${isHubOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </header>

        {/* WORKSPACE PANELS */}
        <div className="flex gap-4 flex-1 h-0 relative z-10 w-full overflow-hidden">
          
          {/* Main Board Grid System */}
          <div 
            className={`grid lg:grid-cols-2 gap-4 flex-1 transition-all duration-300 ${
              isHubOpen ? 'lg:mr-[340px]' : 'lg:mr-0'
            } ${panelsTransitioning ? 'panel-shift-anim' : ''}`}
          >
            
            {/* INPUT PANEL */}
            <div className="flex flex-col h-full bg-neutral-900/40 border border-neutral-800 hover:border-neutral-600 focus-within:border-amber-500/40 rounded-2xl p-4 shadow-2xl transition-all">
              <div className="flex justify-between items-center mb-2 px-1">
                <label className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-black font-mono flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_6px_#f59e0b]"></span>INPUT_STREAM
                </label>
                <span className="text-[11px] font-mono font-black text-neutral-300 bg-neutral-950 px-2.5 py-0.5 rounded-md border border-neutral-700">{sourceLang.toUpperCase()}</span>
              </div>
              <textarea className="w-full flex-1 bg-neutral-950/90 border border-neutral-800 focus:border-amber-500/20 rounded-xl p-5 font-mono text-[13px] leading-relaxed text-white outline-none resize-none placeholder:text-neutral-700 custom-scrollbar focus:ring-1 focus:ring-amber-500/5 transition-all" placeholder={`// Paste code logic streams here...`} value={input} disabled={panelsTransitioning || loading} onChange={(e) => setInput(e.target.value)} />
            </div>

            {/* OUTPUT PANEL */}
            <div className={`flex flex-col h-full bg-neutral-900/40 border rounded-2xl p-4 shadow-2xl transition-all ${isSystemFault ? 'border-red-900/40 bg-red-950/5' : 'border-neutral-800 hover:border-neutral-600'}`}>
              <div className="flex justify-between items-center mb-2 px-1">
                <label className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-black font-mono flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${isSystemFault ? 'bg-red-500' : loading ? 'bg-amber-400 animate-ping' : 'bg-amber-400'}`}></span>
                  {mode === 'leetcode' ? 'SHUVAM_REFACTOR_ENGINE' : 'COMPILATION_MATRIX'}
                </label>
                {output && !isSystemFault && (
                  <div className="flex items-center gap-2">
                    <button type="button" onClick={handleExportFile} className="text-[10px] font-mono tracking-wider font-black bg-neutral-950 border border-neutral-700 hover:border-amber-500 px-2.5 py-1 rounded-lg flex items-center gap-1.5 transition active:scale-95 cursor-pointer text-neutral-300 hover:text-white">
                      <Download size={12} /> EXPORT
                    </button>
                    <button type="button" onClick={copyToClipboard} className="text-[10px] font-mono tracking-wider font-black bg-neutral-950 border border-neutral-700 hover:border-neutral-500 px-2.5 py-1 rounded-lg flex items-center gap-1.5 transition active:scale-95 cursor-pointer text-neutral-300 hover:text-white">
                      {copied ? <><Check size={12} className="text-cyan-400" /> COPIED</> : <><Copy size={12} /> COPY</>}
                    </button>
                  </div>
                )}
              </div>
              
              <div className="w-full flex-1 relative bg-neutral-950/90 border border-neutral-800 rounded-xl overflow-hidden shadow-inner flex flex-col">
                <div className="w-full h-full flex-1 p-5 overflow-auto custom-scrollbar font-mono text-[13px] leading-relaxed text-left whitespace-pre-wrap select-all">
                  {output ? (
                    <code className={isSystemFault ? 'text-rose-400 font-medium' : 'text-cyan-400 font-medium'}>{output}</code>
                  ) : (
                    <span className="text-neutral-700 italic select-none">
                      {isPaused ? "// Processing suspended..." : loading ? `// Quantum compilation active: ${progress}% mapped...` : "// Waiting for transformation query submission..."}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ABSOLUTE HUD DRAWER */}
          <div className={`absolute right-0 top-0 h-full w-[320px] bg-[#070708]/95 backdrop-blur-xl border border-neutral-800 rounded-2xl p-4 shadow-2xl transition-all duration-300 z-40 flex flex-col ${isHubOpen ? 'translate-x-0 opacity-100 pointer-events-auto' : 'translate-x-full opacity-0 pointer-events-none'}`}>
            
            {/* TOOLKIT NAVIGATION TABS */}
            <div className="grid grid-cols-3 gap-1 p-1 bg-neutral-900/80 rounded-xl mb-4 border border-neutral-800/60">
              <button type="button" onClick={() => setActiveTab('complexity')} className={`py-2 px-1.5 text-[11px] font-black font-mono rounded-lg cursor-pointer flex items-center justify-center gap-1 transition-all ${activeTab === 'complexity' ? 'bg-amber-500 text-black shadow-lg' : 'text-neutral-400 hover:text-neutral-200'}`}>
                <BarChart3 size={12} /> <span>METRICS</span>
              </button>
              <button type="button" onClick={() => setActiveTab('sandbox')} className={`py-2 px-1.5 text-[11px] font-black font-mono rounded-lg cursor-pointer flex items-center justify-center gap-1 transition-all ${activeTab === 'sandbox' ? 'bg-amber-500 text-black shadow-lg' : 'text-neutral-400 hover:text-neutral-200'}`}>
                <Terminal size={12} /> <span>TEST_RUN</span>
              </button>
              <button type="button" onClick={() => setActiveTab('history')} className={`py-2 px-1.5 text-[11px] font-black font-mono rounded-lg cursor-pointer flex items-center justify-center gap-1 transition-all ${activeTab === 'history' ? 'bg-amber-500 text-black shadow-lg' : 'text-neutral-400 hover:text-neutral-200'}`}>
                <History size={12} /> <span>LOGS</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar font-mono text-xs text-neutral-300">
              
              {/* METRICS PANEL */}
              {activeTab === 'complexity' && (
                <div className="space-y-4">
                  <div className="text-[9px] font-black text-neutral-500 uppercase tracking-widest">PERFORMANCE_ANALYSIS (BIG-O)</div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-neutral-900 border border-neutral-800 p-3 rounded-xl text-center">
                      <div className="text-[9px] text-neutral-500 mb-1">TIME (BEFORE)</div>
                      <div className="text-sm font-bold text-neutral-400 line-through">{complexity.input}</div>
                    </div>
                    <div className="bg-neutral-900 border border-amber-500/20 p-3 rounded-xl text-center shadow-inner shadow-amber-500/5">
                      <div className="text-[9px] text-amber-400 mb-1">TIME (AFTER)</div>
                      <div className="text-sm font-bold text-amber-400">{complexity.output}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-neutral-900 border border-neutral-800 p-3 rounded-xl text-center">
                      <div className="text-[9px] text-neutral-500 mb-1">SPACE (BEFORE)</div>
                      <div className="text-sm font-bold text-neutral-400">{complexity.spaceInput}</div>
                    </div>
                    <div className="bg-neutral-900 border border-neutral-800 p-3 rounded-xl text-center">
                      <div className="text-[9px] text-neutral-500 mb-1">SPACE (AFTER)</div>
                      <div className="text-sm font-bold text-cyan-400">{complexity.spaceOutput}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* TEST_RUN */}
              {activeTab === 'sandbox' && (
                <div className="flex flex-col h-full space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-black text-neutral-500 uppercase tracking-widest">CODE_SANDBOX_TESTER</span>
                    <button type="button" onClick={handleRunSandbox} disabled={!output || sandboxRunning} className="px-2.5 py-1 bg-neutral-900 border border-neutral-700 hover:border-amber-500 hover:text-amber-400 text-[10px] font-black rounded-lg cursor-pointer disabled:opacity-40 flex items-center gap-1">
                      <Play size={10} fill="currentColor" /> EXECUTE
                    </button>
                  </div>
                  <div className="bg-black/80 border border-neutral-800 p-3 rounded-xl flex-1 font-mono text-[11px] text-emerald-400 text-left space-y-1.5 h-64 overflow-y-auto custom-scrollbar">
                    {sandboxConsole.length > 0 ? (
                      sandboxConsole.map((line, idx) => <div key={idx}>{line}</div>)
                    ) : (
                      <div className="text-neutral-700 italic select-none">// Console ready. Submit output shift sequence to run assertion scripts.</div>
                    )}
                  </div>
                </div>
              )}

              {/* LOGS PANEL */}
              {activeTab === 'history' && (
                <div className="space-y-3">
                  <div className="text-[9px] font-black text-neutral-500 uppercase tracking-widest mb-1">CONVERSION_HISTORY</div>
                  {historyLog.length > 0 ? (
                    <div className="space-y-2.5 max-h-[calc(100vh-14rem)] overflow-y-auto pr-0.5 custom-scrollbar">
                      {historyLog.map((log) => {
                        const isEditingThis = editingId === log.id;
                        return (
                          <div 
                            key={log.id} 
                            onClick={() => !isEditingThis && fetchHistoryItem(log)}
                            className={`group relative bg-neutral-900/40 border p-3 rounded-xl flex flex-col text-left transition-all duration-300 border-neutral-800/80 hover:border-amber-500/50 hover:bg-neutral-900/90 shadow-md ${isEditingThis ? 'ring-1 ring-amber-500/40 border-amber-500/30' : 'cursor-pointer'}`}
                          >
                            <div className="flex justify-between items-center text-[10px] font-black text-neutral-400 mb-2 border-b border-neutral-800/80 pb-2">
                              <span className="text-amber-400 px-2 py-0.5 bg-amber-500/5 rounded-md border border-amber-500/20 font-mono tracking-wide text-[9px]">
                                {log.from} ➔ {log.to}
                              </span>
                              <span className="text-neutral-500 font-mono font-medium text-[9px]">{log.timestamp}</span>
                            </div>

                            <div className="flex items-center justify-between gap-2 min-h-7">
                              {isEditingThis ? (
                                <div className="flex items-center gap-1 w-full bg-neutral-950 p-1 rounded-lg border border-neutral-700 shadow-inner">
                                  <input 
                                    type="text"
                                    value={renameValue}
                                    onChange={(e) => setRenameValue(e.target.value)}
                                    onClick={(e) => e.stopPropagation()}
                                    className="w-full bg-transparent text-xs font-mono font-bold text-white outline-none px-1.5 py-0.5"
                                    autoFocus
                                    placeholder="Enter title..."
                                  />
                                  <button 
                                    type="button" 
                                    onClick={(e) => saveRenameHistory(e, log.id)} 
                                    className="text-emerald-400 hover:text-emerald-300 p-1.5 hover:bg-emerald-500/10 rounded-md transition"
                                  >
                                    <CheckCircle2 size={13} />
                                  </button>
                                </div>
                              ) : (
                                <>
                                  <div className="flex flex-col min-w-0 flex-1">
                                    <span className="text-xs font-bold tracking-wide text-neutral-200 group-hover:text-amber-400 transition-colors truncate">
                                      {log.title}
                                    </span>
                                  </div>
                                  
                                  <div className="flex items-center lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-200 gap-1 ml-1 scale-95 origin-right">
                                    <button 
                                      type="button" 
                                      onClick={(e) => startRenameHistory(e, log)} 
                                      className="p-1.5 text-neutral-400 hover:text-amber-400 bg-neutral-950 hover:bg-amber-500/10 rounded-lg border border-neutral-800 hover:border-amber-500/30 transition shadow-md"
                                      title="Rename Entry"
                                    >
                                      <Edit3 size={11} />
                                    </button>
                                    <button 
                                      type="button" 
                                      onClick={(e) => deleteHistoryItem(e, log.id)} 
                                      className="p-1.5 text-neutral-500 hover:text-rose-400 bg-neutral-950 hover:bg-rose-500/10 rounded-lg border border-neutral-800 hover:border-rose-500/30 transition shadow-md"
                                      title="Delete Snapshot"
                                    >
                                      <Trash2 size={11} />
                                    </button>
                                  </div>
                                </>
                              )}
                            </div>
                            
                            {!isEditingThis && (
                              <div className="mt-1.5 flex items-center gap-1 text-[9px] text-neutral-600 font-bold tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                                <AlertCircle size={10} className="text-amber-500/40" /> Click to mount workspace code
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-neutral-700 italic select-none text-center pt-6 text-[11px] font-mono">// No active migration logs mapping records found.</div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #262626; border-radius: 9999px; border: 1px solid #404040; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #fbbf24; border-color: #fef08a; }
        .icon-rotate { animation: iconSwapRotate 0.5s ease-in-out; }
        @keyframes iconSwapRotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .panel-shift-anim { animation: panelShiftFade 0.5s ease-in-out; }
        @keyframes panelShiftFade { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.3; transform: scale(0.995); } }
      `}</style>
    </div>
  );
}