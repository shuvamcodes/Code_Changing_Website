import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Terminal, Code2, Palette, Plus, Check, Trash2, Edit3 } from 'lucide-react';

const INITIAL_THEMES = [
  {
    id: "gold",
    name: "Golden Shift",
    textGradient: "from-amber-400 via-yellow-200 to-amber-300",
    bgMeshLeft: "from-amber-500/20 to-yellow-500/5",
    logoText: "from-amber-400 to-yellow-400",
    swatch: ["#fbbf24", "#fef08a"],
    isImmutable: true
  },
  {
    id: "cyan",
    name: "Cyan Matrix",
    textGradient: "from-blue-400 via-cyan-200 to-indigo-400",
    bgMeshLeft: "from-blue-500/20 to-cyan-500/5",
    logoText: "from-blue-400 to-cyan-400",
    swatch: ["#60a5fa", "#22d3ee"],
    isImmutable: true
  },
  {
    id: "violet",
    name: "Neon Violet",
    textGradient: "from-purple-400 via-pink-200 to-fuchsia-400",
    bgMeshLeft: "from-purple-500/20 to-pink-500/5",
    logoText: "from-purple-400 to-pink-400",
    swatch: ["#a855f7", "#f472b6"],
    isImmutable: true
  }
];

export default function Landing() {
  const navigate = useNavigate();
  const [themes, setThemes] = useState(INITIAL_THEMES);
  const [activeTheme, setActiveTheme] = useState(themes[0]);
  const [paletteOpen, setPaletteOpen] = useState(false);
  
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newName, setNewName] = useState("");
  const [newColor, setNewColor] = useState("#fbbf24");

  const handleAddTheme = () => {
    if (!newName.trim()) return;
    const newEntry = {
      id: Date.now().toString(),
      name: newName,
      textGradient: `from-[${newColor}] via-neutral-100 to-white`,
      bgMeshLeft: `from-[${newColor}]/25 to-transparent`,
      logoText: `from-[${newColor}] to-white`,
      swatch: [newColor, "#ffffff"],
      isCustom: true,
      customColor: newColor
    };
    setThemes([...themes, newEntry]);
    setActiveTheme(newEntry);
    setNewName("");
    setIsAdding(false);
  };

  const handleSaveRename = (id) => {
    if (!newName.trim()) return;
    const updated = themes.map(t => t.id === id ? { ...t, name: newName } : t);
    setThemes(updated);
    if (activeTheme.id === id) {
      setActiveTheme({ ...activeTheme, name: newName });
    }
    setEditingId(null);
    setNewName("");
  };

  const handleDeleteTheme = (id, event) => {
    event.stopPropagation();
    const filtered = themes.filter(t => t.id !== id);
    setThemes(filtered);
    if (activeTheme.id === id) {
      setActiveTheme(filtered[0] || INITIAL_THEMES[0]);
    }
  };

  return (
    <div className="min-h-screen bg-[#030303] text-neutral-100 font-sans antialiased relative overflow-hidden flex flex-col justify-between p-6 md:p-12 selection:bg-amber-500/30 selection:text-amber-100">
      
      {/* BACKGROUND GRID */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_80%,transparent_100%)] pointer-events-none" />
      
      <div 
        className="absolute top-[-10%] left-[15%] w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none mix-blend-screen transition-all duration-1000"
        style={{ background: activeTheme.isCustom ? `radial-gradient(circle, ${activeTheme.customColor}25 0%, transparent 70%)` : undefined }}
      />
      {!activeTheme.isCustom && (
        <div className={`absolute top-[-10%] left-[15%] w-[600px] h-[600px] bg-gradient-to-br ${activeTheme.bgMeshLeft} rounded-full blur-[140px] pointer-events-none mix-blend-screen transition-all duration-700`} />
      )}

      {/* BRAND NAVBAR */}
      <header className="max-w-5xl w-full mx-auto flex justify-between items-center z-50">
        <div onClick={() => navigate('/')} className="flex items-center gap-3.5 cursor-pointer group select-none">
          <div className="relative w-9 h-9 flex items-center justify-center transform group-hover:scale-105 transition-all duration-300">
            <div className="absolute inset-0 bg-amber-500/20 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute top-0.5 left-0.5 w-5 h-5 border-2 border-t-amber-400 border-l-amber-500 border-b-transparent border-r-transparent rounded-lg transform rotate-45 transition-transform duration-500 group-hover:rotate-[135deg]" />
            <div className="absolute w-4 h-4 bg-gradient-to-br from-amber-500 via-amber-600 to-yellow-500 rounded-md shadow-md shadow-amber-500/20 border border-white/10 z-10" />
            <div className="absolute bottom-0.5 right-0.5 w-5 h-5 border-2 border-b-amber-400 border-r-amber-500 border-t-transparent border-l-transparent rounded-lg transform rotate-45 transition-transform duration-500 group-hover:rotate-[135deg]" />
          </div>

          <div className="flex flex-col justify-center leading-none">
            <div className="flex items-center tracking-wider font-mono uppercase text-xs text-neutral-400 font-black tracking-[0.25em] transition-colors">SYSTEM CORE</div>
            <div className="flex items-center font-black text-lg tracking-[0.04em] mt-0.5">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-neutral-100 to-neutral-300 font-mono font-light uppercase tracking-[0.1em]">SHUVAM</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-300 font-mono font-black uppercase tracking-[0.05em] ml-1">MORPH</span>
            </div>
          </div>
        </div>

        {/* THEMATIC CONFIG POPUP */}
        <div className="flex items-center gap-3 relative">
          <div className="flex items-center gap-2 px-2.5 py-1.5 bg-neutral-900 border border-neutral-700 rounded-2xl backdrop-blur-md shadow-xl shadow-black/40">
            <div className="flex -space-x-1 pl-0.5">
              {activeTheme.swatch.map((c, i) => (
                  <div key={i} className="w-3 h-3 rounded-full border border-black/60 shadow-md" style={{ background: c }} />
              ))}
            </div>
            <button onClick={() => setPaletteOpen(!paletteOpen)} className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-white hover:text-neutral-200 px-1 rounded-lg uppercase font-black cursor-pointer">
              <Palette size={12} className="text-neutral-400" />
              {activeTheme.name}
            </button>
          </div>

          {paletteOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => { setPaletteOpen(false); setEditingId(null); setIsAdding(false); }} />
              <div className="absolute right-0 top-12 w-64 bg-neutral-900 border border-neutral-700 p-3 rounded-2xl shadow-2xl z-50">
                <div className="text-[9px] text-neutral-400 uppercase tracking-[0.2em] font-black mb-3 pb-2 border-b border-neutral-800">Matrix Config</div>
                <div className="space-y-1 mb-4 max-h-52 overflow-y-auto">
                  {themes.map((t) => (
                    <div
                      key={t.id}
                      onClick={() => { if(editingId !== t.id) { setActiveTheme(t); setPaletteOpen(false); } }}
                      className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl border ${activeTheme.id === t.id ? 'bg-neutral-800 border-neutral-600' : 'hover:bg-neutral-800/50 border-transparent'} cursor-pointer group`}
                    >
                      <div className="flex items-center gap-2.5 flex-1 min-w-0 mr-2">
                        <div className="flex -space-x-1 shrink-0">
                          {t.swatch.map((c, i) => <div key={i} className="w-2.5 h-2.5 rounded-full border border-black/40" style={{ background: c }} />)}
                        </div>
                        {editingId === t.id ? (
                          <input 
                            className="w-full bg-black border border-neutral-600 text-[11px] font-mono rounded px-1 py-0.5 text-white outline-none"
                            value={newName}
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) => setNewName(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSaveRename(t.id)}
                            autoFocus
                          />
                        ) : (
                          <span className={`text-[11px] font-mono truncate ${activeTheme.id === t.id ? 'text-white font-bold' : 'text-neutral-400'}`}>{t.name}</span>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                        {editingId === t.id ? (
                          <button onClick={() => handleSaveRename(t.id)} className="text-emerald-400"><Check size={12} /></button>
                        ) : (
                          <>
                            {!t.isImmutable && (
                              <>
                                <button onClick={() => { setEditingId(t.id); setNewName(t.name); }} className="text-neutral-400 hover:text-white opacity-0 group-hover:opacity-100"><Edit3 size={11} /></button>
                                <button onClick={(e) => handleDeleteTheme(t.id, e)} className="text-neutral-400 hover:text-red-400 opacity-0 group-hover:opacity-100"><Trash2 size={11} /></button>
                              </>
                            )}
                            {activeTheme.id === t.id && <Check size={12} className="text-blue-400" />}
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                {!isAdding ? (
                  <button onClick={() => setIsAdding(true)} className="w-full py-2 border border-dashed border-neutral-600 rounded-xl text-[10px] text-neutral-300 hover:text-white bg-neutral-950 font-mono uppercase font-black cursor-pointer">
                    + Forge Template
                  </button>
                ) : (
                  <div className="p-2 bg-neutral-950 rounded-xl border border-neutral-700">
                    <input placeholder="Label..." className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-2 py-1 text-[10px] text-white font-mono mb-2" value={newName} onChange={(e) => setNewName(e.target.value)} />
                    <div className="flex gap-2">
                      <input type="color" className="w-8 h-6 bg-transparent cursor-pointer" value={newColor} onChange={(e) => setNewColor(e.target.value)} />
                      <button onClick={handleAddTheme} className="flex-1 bg-neutral-800 text-white text-[9px] py-1 rounded font-black uppercase">Generate</button>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </header>

      {/* HERO SECTION */}
      <main className="max-w-5xl w-full mx-auto my-auto py-12 z-10 text-center flex flex-col items-center">
        <div className={`text-[10px] font-mono tracking-[0.25em] bg-clip-text text-transparent bg-gradient-to-r ${activeTheme.textGradient} uppercase bg-neutral-900 border border-neutral-600 px-4 py-1.5 rounded-full mb-8 font-black`}>
          Intelligence Layer Live
        </div>

        <h1 className="text-5xl md:text-8xl font-black tracking-tight mb-6 text-white leading-[1.05]">
          Transforms code <br />
          <span className={`bg-clip-text text-transparent bg-gradient-to-r ${activeTheme.textGradient}`} style={activeTheme.isCustom ? { backgroundImage: `linear-gradient(to right, ${activeTheme.customColor}, #fff)` } : {}}>
            instantly.
          </span>
        </h1>
        
        <p className="text-xs md:text-sm text-neutral-300 font-mono max-w-sm mb-14 font-medium">
          Reshape system script structures and map multi-language syntax paths seamlessly.
        </p>

        {/* BENTO GRID WITH SEAMLESS INITIAL NEON GREEN BORDERS */}
        <div className="grid md:grid-cols-2 gap-6 w-full max-w-3xl text-left">
          
          {/* CARD 1: SYNTAX SHIFT */}
          <div 
            onClick={() => navigate('/converter?mode=standard')} 
            className="group relative p-8 h-64 bg-[#121214] border-2 border-green-500/30 rounded-2xl cursor-pointer overflow-hidden transition-all duration-300 transform hover:-translate-y-2 hover:border-amber-500/50 hover:bg-[#151518] active:scale-[0.99] shadow-2xl flex flex-col justify-between"
          >
            {/* AUTONOMOUS INFINITE LOOPING CODE CANVAS */}
            <div className="absolute inset-0 select-none pointer-events-none live-matrix-stream" />
            
            {/* SMOOTH TOP/BOTTOM GRADIENT BLEND */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#121214]/5 via-transparent to-[#121214]/95 pointer-events-none z-10" />
            
            {/* HOVER GLOW EFFECT */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-500/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0" />
            
            {/* UI Content Elements */}
            <div className="flex justify-between items-center relative z-20">
              <div className="p-3.5 bg-[#17171a] rounded-xl border border-green-500/20 text-neutral-400 group-hover:text-amber-400 group-hover:border-amber-500/30 group-hover:scale-105 transform transition-all duration-300 shadow-md">
                <Terminal size={20} />
              </div>
              <div className="w-9 h-9 rounded-full bg-[#17171a] border border-green-500/20 flex items-center justify-center transition-all duration-300 group-hover:bg-amber-400 group-hover:border-amber-300 group-hover:shadow-[0_0_20px_rgba(245,158,11,0.6)]">
                <ArrowRight size={16} className="text-neutral-300 group-hover:text-black transform transition-transform duration-300 group-hover:translate-x-0.5" />
              </div>
            </div>
            
            <div className="relative z-20">
              <h3 className="text-lg font-black text-white group-hover:text-amber-200 transition-colors mb-2">
                Syntax Matrix Shift
              </h3>
              <p className="text-xs text-neutral-400 font-mono group-hover:text-neutral-200 transition-colors leading-relaxed">
                Cross-compile structural logic scripts cleanly between specified runtime targets.
              </p>
            </div>
          </div>

          {/* CARD 2: LEETCODE OPTIMIZE */}
          <div 
            onClick={() => navigate('/converter?mode=leetcode')} 
            className="group relative p-8 h-64 bg-[#121214] border-2 border-green-500/30 rounded-2xl cursor-pointer overflow-hidden transition-all duration-300 transform hover:-translate-y-2 hover:border-amber-500/50 hover:bg-[#151518] active:scale-[0.99] shadow-2xl flex flex-col justify-between"
          >
            {/* AUTONOMOUS INFINITE LOOPING CODE CANVAS */}
            <div className="absolute inset-0 select-none pointer-events-none live-matrix-stream" />
            
            {/* SMOOTH TOP/BOTTOM GRADIENT BLEND */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#121214]/5 via-transparent to-[#121214]/95 pointer-events-none z-10" />
            
            {/* HOVER GLOW EFFECT */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-500/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0" />
            
            {/* UI Content Elements */}
            <div className="flex justify-between items-center relative z-20">
              <div className="p-3.5 bg-[#17171a] rounded-xl border border-green-500/20 text-neutral-400 group-hover:text-amber-400 group-hover:border-amber-500/30 group-hover:scale-105 transform transition-all duration-300 shadow-md">
                <Code2 size={20} />
              </div>
              <div className="w-9 h-9 rounded-full bg-[#17171a] border border-green-500/20 flex items-center justify-center transition-all duration-300 group-hover:bg-amber-400 group-hover:border-amber-300 group-hover:shadow-[0_0_20px_rgba(245,158,11,0.6)]">
                <ArrowRight size={16} className="text-neutral-300 group-hover:text-black transform transition-transform duration-300 group-hover:translate-x-0.5" />
              </div>
            </div>
            
            <div className="relative z-20">
              <h3 className="text-lg font-black text-white group-hover:text-amber-200 transition-colors mb-2">
                LeetCode Optimize
              </h3>
              <p className="text-xs text-neutral-400 font-mono group-hover:text-neutral-200 transition-colors leading-relaxed">
                Refactor complex algorithmic solutions to maximize total runtime performance.
              </p>
            </div>
          </div>

        </div>
      </main>

      <footer className="max-w-5xl w-full mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-neutral-800 pt-6 text-[10px] font-mono text-neutral-400 font-bold">
        <div className="flex items-center gap-4">
          <span className="text-white bg-neutral-900 border border-neutral-700 px-2 py-0.5 rounded">QWEN_2.5_ENGINE</span>
          <span>ISOLATED_SANDBOX_ACTIVE</span>
        </div>
        <div>&copy; {new Date().getFullYear()} SHUVAM MORPH LLC.</div>
      </footer>

      {/* MATRIX AND HIGHLIGHT ANIMATION RENDERING ENGINE */}
      <style>{`
        /* 1. SEAMLESS GAPLESS MATRIX CORE */
        .live-matrix-stream::before {
          content: "01001101 01011001 01010011 01010100 01000101 01001101 [REFRACTING_CORE_NODES] function compile_matrix(payload) { return payload.split('').map(c => String.fromCharCode(c.charCodeAt(0) ^ 42)).join(''); } async function initializeSandbox() { const runtime = await CoreEngine.boot(); while(runtime.status === 'ISOLATED') { await runtime.computeShift(); } } 01101111 11000011 01010101 00110011 11110000 10101010 01001101 01011001 01010011 01010100 01000101 01001101 [REFRACTING_CORE_NODES] function compile_matrix(payload) { return payload.split('').map(c => String.fromCharCode(c.charCodeAt(0) ^ 42)).join(''); } async function initializeSandbox() { const runtime = await CoreEngine.boot(); while(runtime.status === 'ISOLATED') { await runtime.computeShift(); } } 01101111 11000011 01010101 00110011 11110000 10101010";
          font-family: monospace;
          font-size: 10px;
          line-height: 14px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          word-break: break-all;
          position: absolute;
          width: 100%;
          height: 300%; 
          top: 0;
          left: 0;
          padding: 16px;
          display: block;
          z-index: 0;
          
          /* Distinct initial layout visibility color stream */
          color: rgba(34, 197, 94, 0.22); /* Light glowing green matrix color by default */
          
          animation: matrixGaplessScroll 28s linear infinite;
          transition: color 0.3s ease-in-out;
        }

        @keyframes matrixGaplessScroll {
          0% { transform: translateY(0); }
          100% { transform: translateY(-33.3333%); }
        }

        /* 2. HOVER ACTION STATES */
        .group:hover .live-matrix-stream::before {
          color: rgba(251, 191, 36, 0.35); /* Swaps green streams into amber highlights on mouse enter */
          animation-duration: 6s;
        }
      `}</style>
    </div>
  );
}