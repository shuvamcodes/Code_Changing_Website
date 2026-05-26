import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, Terminal, Share2, History, Code2, Cpu, 
  ArrowRight, Activity, Globe, Heart, Layers, Eye, 
  Database, Zap, Flame, Compass, ChevronRight
} from 'lucide-react';

// ==========================================
// MOCK REGISTRY DATA FOR EXPERIENTIAL HUBS
// ==========================================

const ARCHAEOLOGY_VAULT = [
  {
    id: "apollo11",
    name: "Apollo 11 AGC (1969)",
    desc: "The assembly sequence that managed the lunar module ignition logic.",
    originalLang: "AGC Assembly",
    targetLang: "Go / TypeScript",
    snippet: "# PINBALL_GAME_BUTTONS_AND_LIGHTS.agc\nTC    BANKCALL\nCADR  EXAMINE\nTC    TCF\nSB    BANKCOUNT\nTS    Q\nINDEX Q\nCAF   0\nTC    PREREAD"
  },
  {
    id: "doom1993",
    name: "Doom Render Loop (1993)",
    desc: "John Carmack's revolutionary BSP tree surface rendering constraint solver.",
    originalLang: "ANSI C",
    targetLang: "Rust / C++20",
    snippet: "void R_DrawPlanes (void) {\n  visplane_t* pl;\n  int light;\n  for (pl = visplanes; pl < lastvisplane; pl++) {\n    if (pl->minx > pl->maxx) continue;\n    R_DrawPlane(pl);\n  }\n}"
  },
  {
    id: "y2kcobol",
    name: "Banking Core (1978)",
    desc: "A classic interest processing matrix handling double-digit year fields.",
    originalLang: "COBOL",
    targetLang: "Python (FastAPI)",
    snippet: "IDENTIFICATION DIVISION.\nPROGRAM-ID. INTEREST-CALC.\nPROCEDURE DIVISION.\nCOMPUTE WS-INTEREST = (PRINCIPLE * RATE * DAYS) / 365.\nIF WS-YEAR-FIELD LESS THAN 00\n   ADD 1900 TO WS-YEAR-FIELD.\nDISPLAY WS-INTEREST."
  }
];

const SHOWCASE_WALL = [
  {
    id: 1,
    title: "Concurrent Token Buffer Splitter",
    author: "Alpha_Dev",
    metric: "O(N²) ➔ O(N)",
    saved: "84%",
    likes: 42,
    tags: ["Go", "Concurrency"]
  },
  {
    id: 2,
    title: "Recursive JSON Flattening Routine",
    author: "ByteCommander",
    metric: "O(N) Space ➔ O(1)",
    saved: "Clean Stack",
    likes: 29,
    tags: ["Rust", "Memory"]
  },
  {
    id: 3,
    title: "Redundant Matrix Intersection Filter",
    author: "Shuvam_Core",
    metric: "O(2^N) ➔ O(N log N)",
    saved: "93% Speedup",
    likes: 108,
    tags: ["C++20", "LeetCode"]
  }
];

const INITIAL_STREAM = [
  { id: 1, msg: "Anonymously translated 45 lines of C++ to Rust", stat: "Optimized by 40%", time: "Just now", geo: "Berlin" },
  { id: 2, msg: "System Core processed LeetCode Routine #204", stat: "O(N²) ➔ O(1)", time: "1m ago", geo: "Mumbai" },
  { id: 3, msg: "Apollo 11 Assembly Vault snapshot extracted", stat: "Converted to TypeScript", time: "3m ago", geo: "San Francisco" },
  { id: 4, msg: "User snapshot mounted to Public Gallery Matrix", stat: "Token Shift Success", time: "5m ago", geo: "Tokyo" }
];

export default function Home() {
  const navigate = useNavigate();

  // --- State Core for Experiential Hubs ---
  const [nodeInput, setNodeInput] = useState('Python');
  const [nodeOutput, setNodeOutput] = useState('JavaScript');
  const [canvasPulse, setCanvasPulse] = useState(false);
  const [liveStream, setLiveStream] = useState(INITIAL_STREAM);
  const [vaultSelected, setVaultSelected] = useState(ARCHAEOLOGY_VAULT[0]);
  const [galleryLikes, setGalleryLikes] = useState({});

  // 1. Dynamic Interactive Live Feed Simulator
  useEffect(() => {
    const locations = ["London", "Seoul", "Austin", "Paris", "Bengaluru", "Sydney"];
    const operations = [
      { m: "Refactored legacy loop architecture", s: "O(N³) ➔ O(N log N)" },
      { m: "Shifted functional map pipeline", s: "Memory overhead reduced 60%" },
      { m: "Compiled complex pointer references", s: "Rust memory-safe output mapping" }
    ];

    const streamInterval = setInterval(() => {
      const randOp = operations[Math.floor(Math.random() * operations.length)];
      const randLoc = locations[Math.floor(Math.random() * locations.length)];
      
      const newLog = {
        id: Date.now(),
        msg: randOp.m,
        stat: randOp.s,
        time: "Just now",
        geo: randLoc
      };

      setLiveStream(prev => [newLog, ...prev.slice(0, 4)]);
    }, 4500);

    return () => clearInterval(streamInterval);
  }, []);

  // 2. Interactive Wire-Beam Trigger
  const triggerMatrixMorph = () => {
    if (canvasPulse) return;
    setCanvasPulse(true);
    setTimeout(() => setCanvasPulse(false), 1200);
  };

  const handleLikeGallery = (id) => {
    setGalleryLikes(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  return (
    <div className="min-h-screen bg-[#030303] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-950 via-[#050507] to-[#010102] text-neutral-200 font-sans antialiased selection:bg-emerald-500/20 selection:text-emerald-300 overflow-x-hidden">
      
      {/* BACKGROUND GLOBAL DECORATIVE MATRIX LINES */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] z-0" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 relative z-10">
        
        {/* HEADER NAVBAR */}
        <header className="flex justify-between items-center bg-neutral-900/40 backdrop-blur-md p-4 border border-neutral-800/80 rounded-2xl mb-12 shadow-xl">
          <div className="flex items-center gap-3 select-none">
            <div className="relative w-8 h-8 flex items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/10">
              <Cpu size={16} className="text-black" />
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] uppercase tracking-[0.25em] text-neutral-500 font-mono font-black">SYSTEM LABS</span>
              <span className="font-mono text-sm font-black tracking-wide text-neutral-100">SHUVAM'S CODES</span>
            </div>
          </div>
          
          <button 
            type="button"
            onClick={() => navigate('/converter')}
            className="flex items-center gap-2 px-4 py-1.5 bg-neutral-950 hover:bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-all rounded-xl font-mono text-xs font-bold text-neutral-300 hover:text-white cursor-pointer shadow-md"
          >
            <span>LAUNCH CORE WORKSPACE</span>
            <ArrowRight size={13} className="text-emerald-400" />
          </button>
        </header>

        {/* HERO TYPOGRAPHY */}
        <div className="text-center max-w-3xl mx-auto mb-16 mt-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-emerald-500/5 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-[0.15em] rounded-full mb-4 shadow-sm font-mono animate-pulse">
            <Zap size={10} fill="currentColor" /> SYSTEM PRODUCTION HUB READY
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-6 leading-[1.1]">
            Automated Code Morphing & 
            <span className="block mt-1 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-300 drop-shadow-[0_4px_12px_rgba(52,211,153,0.15)] font-mono">
              Syntax Shift Engine
            </span>
          </h1>
          <p className="text-sm md:text-base text-neutral-400 font-normal leading-relaxed max-w-2xl mx-auto">
            Break syntax limitations. Optimize runtime complexity arrays, flatten deeply nested procedural algorithms, and port archaic scripts into highly performant modern target trees instantly.
          </p>
        </div>

        {/* ========================================================
            EXPERIENTIAL MATRIX: THE LANDING BENTO GRID SYSTEM
           ======================================================== */}
        <div className="grid lg:grid-cols-12 gap-6 items-stretch mb-12">
          
          {/* 1. THE CODE MORPHING CANVAS (NODE GRAPH) - 7 COLS */}
          <section className="lg:col-span-7 bg-neutral-900/30 border border-neutral-800 rounded-2xl p-5 shadow-2xl flex flex-col justify-between relative group hover:border-neutral-700 transition-all">
            <div className="absolute top-4 right-4 flex items-center gap-1.5 font-mono text-[9px] font-black text-neutral-600 uppercase tracking-widest bg-neutral-950 border border-neutral-800 px-2 py-0.5 rounded-md">
              <Layers size={10} /> VISUAL CANVAS PIPELINE
            </div>

            <div className="mb-6">
              <h3 className="font-mono text-xs font-black tracking-wider text-neutral-400 uppercase flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>01 / PIPELINE FLOW GRAPH
              </h3>
              <p className="text-xs text-neutral-500 mt-1">Configure node vectors and trigger pipeline particle flow previews.</p>
            </div>

            {/* VISUAL COMPONENT CANVAS WORKSPACE */}
            <div className="bg-neutral-950/90 border border-neutral-800 rounded-xl p-6 min-h-[190px] flex items-center justify-between relative overflow-hidden shadow-inner">
              
              {/* Dynamic Wire Animation Flow Beam */}
              <div className="absolute left-[30%] right-[30%] top-1/2 -translate-y-1/2 h-[2px] bg-neutral-800 z-0">
                <div className={`h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 rounded-full transition-all duration-1000 ${canvasPulse ? 'w-full opacity-100 shadow-[0_0_12px_#34d399]' : 'w-0 opacity-0'}`} />
              </div>

              {/* Source Node Vector */}
              <div className="w-28 bg-neutral-900 border border-neutral-700 p-3 rounded-xl flex flex-col items-center gap-2 z-10 shadow-xl">
                <span className="text-[9px] font-mono font-bold text-neutral-500 tracking-wider">SOURCE NODE</span>
                <select 
                  value={nodeInput} 
                  onChange={(e) => setNodeInput(e.target.value)}
                  className="w-full bg-neutral-950 text-xs font-mono font-bold py-1 px-1.5 rounded border border-neutral-800 outline-none text-emerald-400 cursor-pointer"
                >
                  <option value="Python">Python</option>
                  <option value="Java">Java</option>
                  <option value="C++">C++</option>
                  <option value="COBOL">COBOL</option>
                </select>
              </div>

              {/* Central Multiplier Beam Trigger */}
              <button 
                type="button"
                onClick={triggerMatrixMorph}
                className={`w-12 h-12 rounded-full bg-neutral-900 border transition-all duration-300 z-10 flex items-center justify-center cursor-pointer group active:scale-90 ${canvasPulse ? 'border-emerald-400 text-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.3)] bg-emerald-950/20' : 'border-neutral-700 text-neutral-400 hover:border-neutral-500 hover:text-white'}`}
              >
                <Sparkles size={16} className={canvasPulse ? 'animate-spin' : 'group-hover:scale-110'} />
              </button>

              {/* Target Node Vector */}
              <div className="w-28 bg-neutral-900 border border-neutral-700 p-3 rounded-xl flex flex-col items-center gap-2 z-10 shadow-xl">
                <span className="text-[9px] font-mono font-bold text-neutral-500 tracking-wider">TARGET TREE</span>
                <select 
                  value={nodeOutput} 
                  onChange={(e) => setNodeOutput(e.target.value)}
                  className="w-full bg-neutral-950 text-xs font-mono font-bold py-1 px-1.5 rounded border border-neutral-800 outline-none text-cyan-400 cursor-pointer"
                >
                  <option value="JavaScript">JavaScript</option>
                  <option value="Rust">Rust</option>
                  <option value="Go">Go</option>
                  <option value="TypeScript">TypeScript</option>
                </select>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-neutral-800/60 pt-4">
              <div className="text-[11px] font-mono text-neutral-500">
                Status: {canvasPulse ? <span className="text-emerald-400 font-bold animate-pulse">TRANSMITTING TRANSFORM VECTORS...</span> : 'Stream pipeline channel idling'}
              </div>
              <button 
                type="button"
                onClick={() => navigate(`/converter?mode=standard`)} 
                className="text-xs font-mono font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer transition-colors"
              >
                Mount canvas to editor <ChevronRight size={14} />
              </button>
            </div>
          </section>

          {/* 2. GLOBAL ACTIVITY STREAM (SOCIAL PROOF) - 5 COLS */}
          <section className="lg:col-span-5 bg-neutral-900/30 border border-neutral-800 rounded-2xl p-5 shadow-2xl flex flex-col justify-between hover:border-neutral-700 transition-all">
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-mono text-xs font-black tracking-wider text-neutral-400 uppercase flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>02 / ENGINE ACTIVITY MARQUEE
                </h3>
                <div className="flex items-center gap-1 px-2 py-0.5 bg-neutral-950 border border-neutral-800 rounded text-[9px] font-mono font-bold text-neutral-400">
                  <Activity size={10} className="text-rose-500 animate-pulse" /> LIVE STREAM
                </div>
              </div>

              {/* Ticking Feed Window */}
              <div className="space-y-2.5 max-h-[200px] overflow-hidden relative">
                {liveStream.map((log) => (
                  <div key={log.id} className="flex items-start justify-between gap-3 p-2 bg-neutral-950/60 border border-neutral-900 rounded-xl transition-all duration-500 hover:bg-neutral-950">
                    <div className="min-w-0 flex-1">
                      <div className="text-[11px] text-neutral-300 tracking-wide font-medium truncate font-mono">{log.msg}</div>
                      <div className="flex items-center gap-2 mt-1 font-mono text-[9px] text-neutral-500 font-bold">
                        <span className="text-emerald-400">{log.stat}</span>
                        <span>•</span>
                        <span className="flex items-center gap-0.5"><Globe size={8} /> {log.geo}</span>
                      </div>
                    </div>
                    <span className="text-[9px] font-mono font-medium text-neutral-600 shrink-0 mt-0.5">{log.time}</span>
                  </div>
                ))}
                {/* Visual fade edge inside log feed container mask */}
                <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-[#050507] to-transparent pointer-events-none" />
              </div>
            </div>

            <div className="text-[10px] font-mono text-neutral-600 mt-2 text-center select-none tracking-wide font-medium">
              Distributed Global Matrix Processing Nodes Connected: <span className="text-neutral-400">8,419 Core Clusters</span>
            </div>
          </section>

          {/* 3. CODE ARCHAEOLOGY VAULT - 6 COLS */}
          <section className="lg:col-span-6 bg-neutral-900/30 border border-neutral-800 rounded-2xl p-5 shadow-2xl flex flex-col justify-between hover:border-neutral-700 transition-all">
            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-mono text-xs font-black tracking-wider text-neutral-400 uppercase flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>03 / ANCIENT ARCHAEOLOGY VAULT
                </h3>
                <span className="font-mono text-[9px] text-neutral-500 tracking-widest uppercase">HISTORICAL REFACTOR</span>
              </div>
              <p className="text-xs text-neutral-500 mb-4">Feed classic source structures from computing history directly through modern compiler mappings.</p>

              <div className="grid grid-cols-3 gap-2 mb-4">
                {ARCHAEOLOGY_VAULT.map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setVaultSelected(v)}
                    className={`p-2.5 rounded-xl border font-mono text-left transition-all duration-200 cursor-pointer ${vaultSelected.id === v.id ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-400 font-bold' : 'bg-neutral-950 border-neutral-800 hover:border-neutral-700 text-neutral-400'}`}
                  >
                    <div className="text-[10px] tracking-wide truncate">{v.name.split(' ')[0]}</div>
                    <div className="text-[8px] font-bold text-neutral-500 tracking-wider mt-0.5 uppercase truncate">{v.originalLang}</div>
                  </button>
                ))}
              </div>

              {/* Live Preview Monitor Slot */}
              <div className="bg-neutral-950 border border-neutral-800 p-4 rounded-xl font-mono text-[11px] leading-relaxed relative overflow-hidden group/vault min-h-[135px]">
                <div className="absolute top-2 right-2 flex items-center gap-1.5 bg-neutral-900 border border-neutral-800 px-2 py-0.5 rounded text-[8px] font-bold text-neutral-400 select-none">
                  <Database size={9} /> MATRIX MAP: {vaultSelected.originalLang} ➔ {vaultSelected.targetLang}
                </div>
                <div className="text-neutral-500 text-[10px] mb-1 font-bold tracking-wide uppercase select-none">{vaultSelected.name}</div>
                <pre className="text-neutral-300 text-left overflow-x-auto select-all custom-scrollbar">{vaultSelected.snippet}</pre>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate(`/converter?mode=standard`)}
              className="w-full mt-4 bg-neutral-950 hover:bg-neutral-900 border border-neutral-800 hover:border-neutral-700 py-2.5 rounded-xl text-xs font-mono font-black uppercase tracking-wider text-neutral-300 hover:text-white transition active:scale-[0.99] cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Compass size={13} className="text-cyan-400" /> Mount Target Archaeology Routine
            </button>
          </section>

          {/* 4. PUBLIC PORTFOLIO GALLERY GALLERY - 6 COLS */}
          <section className="lg:col-span-6 bg-neutral-900/30 border border-neutral-800 rounded-2xl p-5 shadow-2xl flex flex-col justify-between hover:border-neutral-700 transition-all">
            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-mono text-xs font-black tracking-wider text-neutral-400 uppercase flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>04 / COMMITTED MATRIX SHOWCASE
                </h3>
                <span className="font-mono text-[9px] text-neutral-500 tracking-widest uppercase">PORTFOLIO DECK</span>
              </div>
              <p className="text-xs text-neutral-500 mb-4">Inspect structural code snapshots optimized and shared by public developer sessions globally.</p>

              <div className="space-y-2.5">
                {SHOWCASE_WALL.map((item) => (
                  <div key={item.id} className="bg-neutral-950 border border-neutral-900 hover:border-neutral-800 p-3 rounded-xl flex items-center justify-between gap-4 group/card transition-all">
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold text-neutral-200 group-hover/card:text-emerald-400 font-mono transition-colors truncate">{item.title}</div>
                      <div className="flex items-center gap-2 mt-1 font-mono text-[9px] text-neutral-500 font-bold uppercase tracking-wider">
                        <span>by {item.author}</span>
                        <span>•</span>
                        {item.tags.map(t => <span key={t} className="px-1.5 py-0.5 bg-neutral-900 border border-neutral-800 text-neutral-400 rounded">{t}</span>)}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <div className="text-right font-mono">
                        <div className="text-[10px] font-black text-emerald-400 tracking-wide">{item.metric}</div>
                        <div className="text-[8px] font-medium text-neutral-500 uppercase tracking-widest">{item.saved}</div>
                      </div>
                      <button 
                        type="button"
                        onClick={() => handleLikeGallery(item.id)}
                        className="px-2.5 py-1 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-400 hover:text-rose-400 rounded-lg flex items-center gap-1 transition font-mono text-[10px] font-black tracking-wide cursor-pointer active:scale-90"
                      >
                        <Heart size={10} className={(galleryLikes[item.id] || 0) > 0 ? "fill-rose-500 text-rose-500" : ""} />
                        <span>{item.likes + (galleryLikes[item.id] || 0)}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 flex gap-3 border-t border-neutral-800/60 pt-4">
              <button 
                type="button"
                onClick={() => navigate('/converter')}
                className="flex-1 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-black font-mono font-black uppercase text-[11px] tracking-wider rounded-xl transition active:scale-[0.99] cursor-pointer shadow-lg hover:from-emerald-400 hover:to-emerald-500 flex items-center justify-center gap-1"
              >
                <Share2 size={12} /> Share Snapshot to Wall
              </button>
            </div>
          </section>

        </div>

        {/* WORKSPACE DIRECT NAVIGATION CTA CALLOUT */}
        <div className="mt-12 bg-gradient-to-br from-neutral-900/80 to-neutral-950 border border-neutral-800 p-8 rounded-3xl text-center shadow-2xl relative overflow-hidden">
          <div className="absolute -right-16 -bottom-16 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-16 -top-16 w-48 h-48 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
          
          <h2 className="text-2xl font-black font-mono tracking-tight text-white mb-2">READY TO TEST HIGH-PERFORMANCE REFACTORING?</h2>
          <p className="text-neutral-400 text-xs max-w-xl mx-auto mb-6 leading-relaxed">
            Jump directly into the workspace terminal registry, evaluate micro-level Big-O code metrics, and run safe logic assertions through the automated sandbox environment wrapper.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              type="button" 
              onClick={() => navigate('/converter?mode=standard')} 
              className="px-6 py-2.5 bg-neutral-100 hover:bg-white text-neutral-950 text-xs font-mono font-black uppercase tracking-wider rounded-xl transition shadow-lg active:scale-95 cursor-pointer flex items-center gap-1.5"
            >
              <Terminal size={14} /> Standard Compiler Core
            </button>
            <button 
              type="button" 
              onClick={() => navigate('/converter?mode=leetcode')} 
              className="px-6 py-2.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 text-amber-400 text-xs font-mono font-black uppercase tracking-wider rounded-xl transition shadow-md active:scale-95 cursor-pointer flex items-center gap-1.5"
            >
              <Code2 size={14} /> LeetCode Syntax Optimization
            </button>
          </div>
        </div>

        {/* FOOTER */}
        <footer className="mt-16 border-t border-neutral-900 pt-6 text-center text-xs font-mono text-neutral-600 tracking-wide font-medium">
          &copy; 2026 Shuvam's Codes Matrix Engine Inc. All processing channels operational.
        </footer>

      </div>

      {/* COMPACT CUSTOM INLINE STYLES */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; height: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #262626; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #10b981; }
      `}</style>
    </div>
  );
}