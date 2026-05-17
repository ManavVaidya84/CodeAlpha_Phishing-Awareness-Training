import { motion } from "motion/react";
import { Shield, AlertTriangle, Mail, MousePointer2, CheckCircle2, XCircle, Info, ArrowRight } from "lucide-react";
import { useState } from "react";

// --- Types ---
type Module = "overview" | "identification" | "social" | "practices" | "quiz";

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

// --- Data ---
const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "You receive an email from 'Account-Security@amozon-verify.com' claiming your account is locked. What is the first red flag?",
    options: [
      "The sender's email address is misspelled",
      "The email uses a professional tone",
      "The email has a 'Verify Now' button",
      "The email was sent on a weekend"
    ],
    correctIndex: 0,
    explanation: "Attackers often use look-alike domains (typosquatting) like 'amozon' instead of 'amazon' to trick users."
  },
  {
    id: 2,
    question: "What should you do before clicking a link in a suspicious email?",
    options: [
      "Click it to see where it goes",
      "Hover your mouse over the link to see the actual destination URL",
      "Forward it to a friend to ask for their opinion",
      "Reply to the sender and ask if it's real"
    ],
    correctIndex: 1,
    explanation: "Hovering over a link reveals the destination URL at the bottom of your browser or in a tooltip, allowing you to check if it matches the legitimate site."
  },
  {
    id: 3,
    question: "Social engineering relies primarily on which factor?",
    options: [
      "Technical vulnerabilities in software",
      "High-speed internet connections",
      "Human psychology and manipulation of trust",
      "Advanced encryption algorithms"
    ],
    correctIndex: 2,
    explanation: "Social engineering targets the 'human element' by using fear, urgency, or curiosity to bypass security controls."
  }
];

export default function App() {
  const [activeModule, setActiveModule] = useState<Module>("overview");
  const [quizStep, setQuizStep] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  const handleQuizAnswer = (index: number) => {
    if (index === QUIZ_QUESTIONS[quizStep].correctIndex) {
      setScore(score + 1);
    }
    setShowExplanation(true);
  };

  const nextQuizStep = () => {
    if (quizStep < QUIZ_QUESTIONS.length - 1) {
      setQuizStep(quizStep + 1);
      setShowExplanation(false);
    } else {
      setIsQuizFinished(true);
    }
  };

  const resetQuiz = () => {
    setQuizStep(0);
    setScore(0);
    setShowExplanation(false);
    setIsQuizFinished(false);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#e0e0e0] font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Header */}
      <header className="border-b border-white/10 bg-[#050505]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-10 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-sm flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold tracking-[0.2em] uppercase">CyberGuard</span>
          </div>
          <nav className="hidden md:flex gap-8">
            {(["overview", "identification", "social", "practices", "quiz"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setActiveModule(m)}
                className={`text-[10px] uppercase tracking-[0.2em] font-semibold transition-colors hover:text-white ${activeModule === m ? "text-indigo-400" : "text-white/40"}`}
              >
                {m}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          {activeModule === "overview" && (
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className="inline-block px-3 py-1 border border-indigo-500/50 rounded-full">
                  <span className="text-[10px] text-indigo-400 font-mono uppercase tracking-widest">Campaign Phase 04: Social Engineering</span>
                </div>
                <h1 className="text-7xl md:text-8xl font-serif leading-[0.9] italic text-white tracking-tight">
                  The <span className="text-indigo-500">silent</span> <br />
                  threat in your inbox.
                </h1>
                <p className="text-white/50 text-lg max-w-md font-light leading-relaxed">
                  91% of cyber attacks start with a phishing email. Learn to decode the tactics used by modern adversaries before they decode your data.
                </p>
                <div className="flex gap-4">
                  <button 
                    onClick={() => setActiveModule("identification")}
                    className="px-10 py-5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase tracking-tighter text-sm transition-all flex items-center gap-3 group"
                  >
                    Start Training <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
                
                {/* Stats Bar */}
                <div className="pt-12 grid grid-cols-2 gap-8 border-t border-white/5">
                  <div>
                    <div className="text-[10px] text-indigo-400 uppercase tracking-widest mb-1 font-bold">Threat Velocity</div>
                    <div className="text-3xl font-serif italic text-white leading-none">14m Avg.</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-indigo-400 uppercase tracking-widest mb-1 font-bold">Risk Level</div>
                    <div className="text-3xl font-serif italic text-rose-500 leading-none underline underline-offset-4">Critical</div>
                  </div>
                </div>
              </div>
              <div className="relative flex justify-center items-center aspect-square bg-[#0a0a0a] rounded-3xl border border-white/5 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent"></div>
                <div className="relative z-10 w-64 h-64 border border-indigo-500/30 rounded-full flex items-center justify-center">
                  <div className="w-48 h-48 border border-indigo-500/50 rounded-full flex items-center justify-center">
                    <div className="w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl"></div>
                    <Shield className="w-16 h-16 text-indigo-500/40" />
                  </div>
                </div>
                <div className="absolute bottom-8 left-8 right-8 bg-black/40 backdrop-blur-md p-4 border border-white/10 flex justify-between items-center">
                  <div className="space-y-1">
                    <div className="text-[10px] uppercase text-white/40 tracking-wider font-mono">Active Scans</div>
                    <div className="text-sm font-mono text-white/80">PROTECT_V4.SYS</div>
                  </div>
                  <div className="text-indigo-400 text-[10px] font-mono uppercase animate-pulse">Monitoring Live</div>
                </div>
              </div>
            </div>
          )}

          {activeModule === "identification" && (
            <div className="space-y-16">
              <div className="max-w-2xl">
                <div className="text-xs font-bold text-indigo-400 uppercase tracking-[0.2em] mb-4">Module 01</div>
                <h2 className="text-5xl font-serif italic mb-6">Anatomy of a Scam</h2>
                <p className="text-white/50 text-lg font-light leading-relaxed">Modern phishing attempts follow predictable patterns. Identifying these "red flags" is your first cryptographic shield.</p>
              </div>

              <div className="grid md:grid-cols-3 gap-0 border border-white/10 bg-white/5 divide-x divide-white/10">
                {[
                  { icon: Mail, title: "Sender Spoofing", text: "Emails from domains that slightly mismatch the company they claim to be (e.g., 'amaz0n' instead of 'amazon')." },
                  { icon: MousePointer2, title: "Link Masking", text: "Interactive elements that appear legitimate but route to malicious external nodes." },
                  { icon: Info, title: "Data Harvesting", text: "Inquiries for authentication tokens or PII that legitimate entities never request via cleartext." }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-10 hover:bg-indigo-600/5 transition-colors group"
                  >
                    <item.icon className="w-10 h-10 text-indigo-500 mb-8" />
                    <h3 className="text-xl font-bold mb-4 tracking-tight uppercase">{item.title}</h3>
                    <p className="text-white/40 text-sm leading-relaxed font-light">{item.text}</p>
                  </motion.div>
                ))}
              </div>

              {/* Simulation 1: Sender Spoofing */}
              <div className="grid lg:grid-cols-2 gap-12">
                <div className="p-10 border border-white/10 bg-[#0a0a0a] rounded-3xl relative overflow-hidden h-full">
                  <h3 className="text-xl font-serif italic mb-8 flex items-center gap-3 text-white">
                    <span className="text-indigo-400 font-mono text-[10px] not-italic uppercase tracking-[0.3em] border border-indigo-400/30 px-2 py-1">SIM_01</span>
                    Sender Authenticity Check
                  </h3>
                  
                  <div className="space-y-6">
                    <div className="p-5 bg-white/5 rounded-lg border border-white/5 space-y-4">
                      <div className="flex justify-between items-center text-[10px] uppercase tracking-widest text-white/30 border-b border-white/5 pb-3">
                        <span>Incoming Transmission</span>
                        <span className="text-indigo-400">Scan Pending</span>
                      </div>
                      
                      <div className="space-y-3">
                         <div className="flex gap-3">
                           <span className="text-white/20 font-mono text-[10px] w-12 uppercase">From:</span>
                           <div className="flex-1 font-mono text-xs">
                             <span className="text-white">Microsoft Security</span>
                             <span className="text-white/40 ml-2">&lt;no-reply@</span>
                             <motion.span 
                                animate={{ color: ["#fff", "#f43f5e", "#fff"] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="text-white font-bold bg-rose-500/10 px-1"
                              >mircosoft</motion.span>
                             <span className="text-white/40">-support.net&gt;</span>
                           </div>
                         </div>
                         <div className="flex gap-3">
                           <span className="text-white/20 font-mono text-[10px] w-12 uppercase">Subject:</span>
                           <span className="text-xs text-white/80 font-mono italic underline decoration-rose-500/50">URGENT: Suspicious activity on your account</span>
                         </div>
                      </div>
                    </div>

                    <div className="p-6 bg-indigo-600/5 border border-indigo-500/20 rounded-xl">
                      <p className="text-xs text-white/50 leading-relaxed font-light italic">
                        <strong className="text-indigo-400 uppercase tracking-widest block mb-2 not-italic">Anomaly Detected</strong>
                        The sender domain uses <span className="text-white font-medium italic">Typosquatting</span>. 
                        "Mircosoft" is a common misspelling designed to exploit fast-reading users. Always inspect the domain character-by-character.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Simulation 2: Link Masking */}
                <div className="p-10 border border-white/10 bg-[#0a0a0a] rounded-3xl relative overflow-hidden h-full">
                  <h3 className="text-xl font-serif italic mb-8 flex items-center gap-3 text-white">
                    <span className="text-indigo-400 font-mono text-[10px] not-italic uppercase tracking-[0.3em] border border-indigo-400/30 px-2 py-1">SIM_02</span>
                    The Hyperlink "Hover Test"
                  </h3>
                  
                  <div className="space-y-8">
                    <div className="flex flex-col items-center justify-center py-12 relative group">
                      <p className="text-xs text-white/40 mb-6 uppercase tracking-widest">Interactive Interaction</p>
                      
                      <motion.div 
                        whileHover={{ scale: 1.05 }}
                        className="px-12 py-6 bg-indigo-600 cursor-pointer text-white font-bold tracking-widest text-[10px] uppercase shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] transition-all"
                      >
                        Verify My Identity Now
                      </motion.div>

                      {/* Simulated Browser Status Bar */}
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        whileHover={{ opacity: 1, y: 0 }}
                        className="absolute bottom-0 left-0 right-0 bg-[#050505] border border-white/10 px-4 py-2 flex items-center gap-2"
                      >
                        <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></div>
                        <code className="text-[10px] text-rose-400 font-mono">https://secure-login-v4.net-checks.com/harvest/id.php?token=...</code>
                      </motion.div>
                    </div>

                    <div className="p-6 border-l-2 border-rose-500 bg-rose-500/5">
                      <p className="text-[10px] uppercase font-bold text-rose-400 mb-2 tracking-[0.2em]">Protocol Violation</p>
                      <p className="text-xs text-white/50 leading-relaxed font-light">
                        Never trust the label on a button. Hovering reveals the true destination. If the URL doesn't exactly match the official provider (e.g., <span className="font-mono text-indigo-400">microsoft.com</span>), it is a malicious trap.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeModule === "social" && (
            <div className="space-y-16">
               <div className="max-w-2xl">
                <div className="text-xs font-bold text-indigo-400 uppercase tracking-[0.2em] mb-4">Module 02</div>
                <h2 className="text-5xl font-serif italic mb-6">Cognitive Engineering</h2>
                <p className="text-white/50 text-lg font-light leading-relaxed">Attackers don't always hack code; they hack humans. By exploiting trust and urgency, they bypass the most sophisticated firewalls.</p>
              </div>

              <div className="grid gap-0 border-t border-white/10">
                {[
                  { label: "XI-01", title: "THE URGENCY VULNERABILITY", detail: "Fear of loss triggers an override of logical protocols. Messages like \"Immediate action required\" induce panic-driven compliance." },
                  { label: "XI-02", title: "AUTHORITY SPOOFING", detail: "Assuming the identity of senior leadership or tech support to exploit the human tendency to follow hierarchy." },
                  { label: "XI-03", title: "SOCIAL RECONNAISSANCE", detail: "Using publicly available metadata to craft highly personalized lures that build artificial rapport." }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-12 py-10 border-b border-white/10 hover:bg-white/5 transition-colors group px-8"
                  >
                    <span className="text-xs font-mono font-bold text-white/20 group-hover:text-indigo-400 transition-colors mt-2">{item.label}</span>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-serif italic text-white tracking-tight">{item.title}</h3>
                      <p className="text-white/40 max-w-2xl text-sm font-light leading-relaxed">{item.detail}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeModule === "practices" && (
            <div className="space-y-16">
               <div className="max-w-2xl">
                <div className="text-xs font-bold text-indigo-400 uppercase tracking-[0.2em] mb-4">Module 03</div>
                <h2 className="text-5xl font-serif italic mb-6">Defense Protocols</h2>
                <p className="text-white/50 text-lg font-light leading-relaxed">Technology is a layer, but strategy is the core. Implement these operational standards to secure your digital perimeter.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-6">
                   <h3 className="text-white/20 uppercase tracking-[0.2em] text-[10px] font-bold mb-6">Standard Operating Procedures</h3>
                   {[
                    "Zero trust for unverified MFA requests.",
                    "Manual URL entry for all sensitive domains.",
                    "Vault-based credential management.",
                    "Mandatory Multi-Factor authentication.",
                    "Passive reporting of all suspected anomalies."
                   ].map((text, i) => (
                     <div key={i} className="flex gap-4 items-center p-6 bg-white/5 border border-white/5 rounded-sm">
                        <CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0" />
                        <p className="text-sm font-light tracking-tight">{text}</p>
                     </div>
                   ))}
                </div>
                <div className="bg-indigo-600/5 p-12 border border-indigo-500/10 rounded-3xl self-start space-y-8">
                   <div className="space-y-4">
                     <h3 className="text-2xl font-serif italic text-white flex items-center gap-3">
                       <Shield className="w-8 h-8 text-indigo-500" /> Human Firewall
                     </h3>
                     <p className="text-white/50 text-sm leading-relaxed font-light">
                       In an organizational context, your detection is a threat broadcast for the entire network. Reporting a single phish can neutralize an entire campaign.
                     </p>
                   </div>
                   <div className="p-6 bg-black/40 border border-white/10 rounded-xl flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-indigo-600/20 flex items-center justify-center rounded-lg">
                          <Mail className="text-indigo-400 w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white">SUBMIT_THREAT_REPORT</p>
                          <p className="text-[10px] text-white/30 uppercase tracking-widest">Active Response Module</p>
                        </div>
                      </div>
                      <ArrowRight className="text-indigo-400 animate-pulse" />
                   </div>
                </div>
              </div>
            </div>
          )}

          {activeModule === "quiz" && (
            <div className="max-w-4xl mx-auto py-10">
               {!isQuizFinished ? (
                 <div className="space-y-12">
                    <div className="flex justify-between items-end border-b border-white/10 pb-10">
                      <div>
                        <span className="text-indigo-400 text-[10px] font-bold uppercase tracking-[0.3em] block mb-4">Assessment Module</span>
                        <h2 className="text-5xl font-serif italic tracking-tight">Challenge Protocol</h2>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] text-white/30 uppercase tracking-widest mb-1">Score Registry</div>
                        <div className="text-indigo-500 font-mono text-3xl font-bold">{score} / {QUIZ_QUESTIONS.length}</div>
                      </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden p-12">
                      <div className="flex justify-between items-center mb-10">
                        <span className="text-[10px] text-white/40 uppercase tracking-[0.2em]">Entry {quizStep + 1}</span>
                        <div className="w-48 h-1 bg-white/10 rounded-full">
                          <motion.div 
                            className="h-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                            initial={{ width: 0 }}
                            animate={{ width: `${((quizStep + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                          />
                        </div>
                      </div>

                      <p className="text-3xl font-serif italic text-white mb-12 leading-relaxed max-w-3xl">
                        {QUIZ_QUESTIONS[quizStep].question}
                      </p>

                      <div className="grid gap-4">
                        {QUIZ_QUESTIONS[quizStep].options.map((option, idx) => {
                          const isCorrect = idx === QUIZ_QUESTIONS[quizStep].correctIndex;
                          return (
                            <button
                              key={idx}
                              disabled={showExplanation}
                              onClick={() => handleQuizAnswer(idx)}
                              className={`w-full text-left p-6 rounded-sm border transition-all flex items-center justify-between group 
                                ${showExplanation 
                                  ? (isCorrect ? "border-indigo-500 bg-indigo-500/10" : "border-white/10 bg-white/5 opacity-30")
                                  : "border-white/10 bg-[#050505] hover:border-indigo-500 hover:bg-white/5"
                                }`}
                            >
                              <span className="text-sm font-medium tracking-tight">{option}</span>
                              {showExplanation && isCorrect && <CheckCircle2 className="w-5 h-5 text-indigo-400" />}
                            </button>
                          );
                        })}
                      </div>

                      {showExplanation && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-12 p-8 bg-[#0a0a0a] border border-white/10 rounded-2xl flex gap-8 items-start"
                        >
                          <Info className="w-8 h-8 text-indigo-400 shrink-0 mt-1" />
                          <div className="space-y-6">
                             <p className="text-sm text-white/50 leading-relaxed font-light italic">
                               {QUIZ_QUESTIONS[quizStep].explanation}
                             </p>
                             <button 
                              onClick={nextQuizStep}
                              className="px-10 py-4 bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-indigo-400 hover:text-white transition-all"
                             >
                               {quizStep < QUIZ_QUESTIONS.length - 1 ? "Initialize Next Stage" : "Finalize Assessment"}
                             </button>
                          </div>
                        </motion.div>
                      )}
                    </div>
                 </div>
               ) : (
                 <div className="text-center py-20 space-y-10">
                    <div className="relative inline-block">
                      <div className="w-24 h-24 border border-indigo-500/30 rounded-full flex items-center justify-center animate-spin-slow">
                        <div className="w-2 h-2 bg-indigo-500 rounded-full absolute top-0"></div>
                      </div>
                      <CheckCircle2 className="w-10 h-10 text-indigo-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                    </div>
                    <div>
                      <h2 className="text-7xl font-serif italic mb-4 tracking-tighter">Mission Success</h2>
                      <p className="text-white/40 text-lg font-light tracking-[0.1em] uppercase">
                        AWARENESS_COEFFICIENT: <span className="text-indigo-400 font-mono font-bold">{(score / QUIZ_QUESTIONS.length * 100).toFixed(1)}%</span>
                      </p>
                    </div>
                    <div className="flex justify-center gap-6 pt-4">
                       <button 
                        onClick={resetQuiz}
                        className="px-10 py-5 bg-indigo-600 text-white font-bold uppercase tracking-widest text-[10px] hover:bg-indigo-700 transition-all"
                       >
                         Restart Simulation
                       </button>
                       <button 
                         onClick={() => setActiveModule("overview")}
                         className="px-10 py-5 border border-white/20 text-white font-bold uppercase tracking-widest text-[10px] hover:border-white transition-all"
                       >
                         Terminal Exit
                       </button>
                    </div>
                 </div>
               )}
            </div>
          )}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-16 mt-24">
        <div className="max-w-7xl mx-auto px-10 flex flex-col md:flex-row justify-between gap-12">
          <div className="space-y-6">
             <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-indigo-600 rounded-sm flex items-center justify-center">
                <Shield className="w-3 h-3 text-white" />
              </div>
              <span className="text-sm font-bold tracking-[0.2em] uppercase">CyberGuard</span>
            </div>
            <p className="text-white/30 text-xs max-w-xs leading-relaxed font-light">
              Phase 04 Cybersecurity Awareness / Protocol ID: 899-XJ. Built to neutralize the human element in cyber warfare.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-20">
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-indigo-400 mb-6">Directory</h4>
              <ul className="space-y-3 text-[10px] text-white/40 font-bold uppercase tracking-widest">
                <li><button onClick={() => setActiveModule("identification")} className="hover:text-white transition-colors">Identification</button></li>
                <li><button onClick={() => setActiveModule("social")} className="hover:text-white transition-colors">Social Engineering</button></li>
                <li><button onClick={() => setActiveModule("practices")} className="hover:text-white transition-colors">Best Practices</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/60 mb-6">Security</h4>
              <ul className="space-y-3 text-[10px] text-white/40 font-bold uppercase tracking-widest">
                <li><a href="#" className="hover:text-white transition-colors">Report Breach</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Defense Terms</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">System Status</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-10 mt-16 pt-10 border-t border-white/5 text-[10px] font-mono text-white/20 uppercase tracking-[0.4em] flex justify-between items-center">
          <span>&copy; 2026 DIGITAL_DEFENSE_CORP // ASIA_SE_01</span>
          <div className="flex gap-4 items-center">
            <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse"></div>
            <span>Encrypted Node Connection</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
