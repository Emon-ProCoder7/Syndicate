import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, Zap, Users, MessageSquare, LayoutDashboard, Briefcase, Settings } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const App = () => {
    const mainRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline();

        tl.from('.sidebar', {
            x: -100,
            opacity: 0,
            duration: 1.2,
            ease: 'expo.out'
        })
            .from('.header-content', {
                y: -30,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out'
            }, '-=0.8')
            .from('.stat-card', {
                opacity: 0,
                y: 20,
                stagger: 0.1,
                duration: 0.6,
                ease: 'power2.out'
            }, '-=0.4')
            .from('.deal-card', {
                opacity: 0,
                y: 50,
                stagger: 0.15,
                duration: 0.8,
                ease: 'power3.out'
            }, '-=0.2');
    }, []);

    return (
        <div ref={mainRef} className="flex min-h-screen bg-[#0C0C0C] font-['Space_Grotesk'] text-white">
            {/* Sidebar */}
            <aside className="sidebar fixed left-0 top-0 h-full w-64 bg-[#080808] border-r border-[#2f2f2f] flex flex-col p-6 z-50">
                <div className="flex items-center gap-3 mb-12">
                    <div className="w-8 h-8 bg-[#00FF88] neon-glow"></div>
                    <h1 className="ui-mono font-bold text-lg tracking-widest text-[#00FF88]">SYNDICATE</h1>
                </div>

                <nav className="flex flex-col gap-2 flex-grow">
                    <NavItem active icon={<LayoutDashboard size={18} />} label="OVERVIEW" />
                    <NavItem icon={<Briefcase size={18} />} label="DEAL FLOW" />
                    <NavItem icon={<MessageSquare size={18} />} label="INBOX" />
                </nav>

                <div className="mt-auto pt-6 border-t border-[#2f2f2f]">
                    <NavItem icon={<Settings size={18} />} label="SETTINGS" />
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-grow ml-64 p-10">
                <header className="header-content mb-12 flex justify-between items-end">
                    <div>
                        <div className="ui-mono text-[#8a8a8a] text-[11px] mb-2 tracking-[2px]">WELCOME BACK, MARCUS</div>
                        <h2 className="text-4xl font-bold tracking-tighter">Your Command Center</h2>
                    </div>
                    <button className="btn-primary">CREATE NEW DEAL</button>
                </header>

                {/* Stats Row */}
                <section className="grid grid-cols-4 gap-6 mb-12">
                    <StatCard label="TOTAL COMMIT" value="$42.5M" delta="+12%" />
                    <StatCard label="MATCHING PILLARS" value="8/12" delta="ACTIVE" />
                    <StatCard label="NEW MESSAGES" value="03" delta="URGENT" />
                    <StatCard label="COMPATIBILITY" value="94%" delta="AVG" />
                </section>

                {/* Deal Flow */}
                <section>
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="ui-mono text-[#8a8a8a] text-xs tracking-widest uppercase">// HOT MATCHES</h3>
                        <div className="text-[11px] text-[#8a8a8a]">6 ACTIVE DEALS PINNED</div>
                    </div>

                    <div className="grid grid-cols-3 gap-6">
                        <DealCard
                            name="Finly AI"
                            sector="Fintech"
                            stage="Seed"
                            score="94"
                            reason="3 EXITS IN FINTECH"
                            tagline="Autonomous finance for everyone."
                        />
                        <DealCard
                            name="Nexus Quantum"
                            sector="Infrastructure"
                            stage="Series A"
                            score="88"
                            reason="PREVIOUS EXIT IN INFRA"
                            tagline="Democratizing quantum sims."
                        />
                        <DealCard
                            name="BioSynthetix"
                            sector="Healthtech"
                            stage="Series A"
                            score="91"
                            reason="AI-NATIVE R&D"
                            tagline="Generative protein design."
                        />
                    </div>
                </section>

                {/* Story Section (Scrollytelling) */}
                <section className="mt-40 story-section pb-40">
                    <div className="text-center mb-24">
                        <h3 className="ui-mono text-[#8a8a8a] text-xs tracking-[4px] mb-8">// THE INTELLIGENCE JOURNEY</h3>
                    </div>

                    <StoryStep num="01" title="Signal Extraction" desc="Mapping thousands of data points across public filings and news benchmarks." />
                    <StoryStep num="02" title="Contextual Mapping" desc="Mapping founder patterns against your specific investment thesis and mission." />
                    <StoryStep num="03" title="High-Confidence Matching" desc="Ensuring only matches exceeding 85% compatibility reach your inbox." />
                </section>
            </main>
        </div>
    );
};

const NavItem = ({ icon, label, active }) => (
    <div className={`flex items-center gap-4 p-3 cursor-pointer transition-all ${active ? 'bg-[#00FF8810] text-[#00FF88] border-r-2 border-[#00FF88]' : 'text-[#8a8a8a] hover:text-white'}`}>
        {icon}
        <span className="ui-mono text-[11px] font-bold tracking-widest">{label}</span>
    </div>
);

const StatCard = ({ label, value, delta }) => (
    <div className="stat-card glass-panel p-6 border border-[#2f2f2f]">
        <div className="ui-mono text-[10px] text-[#8a8a8a] mb-4 tracking-widest uppercase">{label}</div>
        <div className="text-3xl font-bold mb-1">{value}</div>
        <div className={`ui-mono text-[10px] ${delta === '+12%' || delta === 'ACTIVE' || delta === 'URGENT' ? 'text-[#00FF88]' : 'text-[#8a8a8a]'}`}>{delta}</div>
    </div>
);

const DealCard = ({ name, sector, stage, score, reason, tagline }) => {
    const cardRef = useRef(null);

    const onMouseMove = (e) => {
        const card = cardRef.current;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const xPercent = (x / rect.width - 0.5) * 20;
        const yPercent = (y / rect.height - 0.5) * -20;

        gsap.to(card, {
            rotateY: xPercent,
            rotateX: yPercent,
            duration: 0.4,
            ease: 'power2.out',
            transformPerspective: 1000
        });
    };

    const onMouseLeave = () => {
        gsap.to(cardRef.current, {
            rotateY: 0,
            rotateX: 0,
            duration: 0.6,
            ease: 'elastic.out(1, 0.3)'
        });
    };

    return (
        <div
            ref={cardRef}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            className="deal-card card-deal"
        >
            <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 bg-[#1A1A1A] border border-[#2f2f2f]"></div>
                <div className="ui-mono text-[#00FF88] text-[12px] font-bold">[{score}%]</div>
            </div>
            <div>
                <h4 className="text-xl font-bold tracking-tight mb-1">{name}</h4>
                <p className="text-[#8a8a8a] text-sm leading-relaxed mb-4">{tagline}</p>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
                <div className="px-2 py-1 bg-[#1A1A1A] border border-[#2f2f2f] ui-mono text-[9px] text-[#8a8a8a]">{sector}</div>
                <div className="px-2 py-1 bg-[#1A1A1A] border border-[#2f2f2f] ui-mono text-[9px] text-[#8a8a8a]">{stage}</div>
            </div>

            <div className="mt-auto pt-4 border-t border-[#2f2f2f] flex items-center gap-2">
                <Zap size={12} className="text-[#FF8800]" />
                <span className="ui-mono text-[9px] text-[#FF8800] font-bold">{reason}</span>
            </div>
        </div>
    );
};

const StoryStep = ({ num, title, desc }) => {
    const stepRef = useRef(null);

    useEffect(() => {
        gsap.from(stepRef.current, {
            scrollTrigger: {
                trigger: stepRef.current,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 40,
            duration: 1,
            ease: 'power3.out'
        });
    }, []);

    return (
        <div ref={stepRef} className="max-w-4xl mx-auto mb-32 flex gap-12 items-center">
            <div className="text-7xl font-bold text-[#1A1A1A] tracking-tighter">{num}</div>
            <div>
                <h4 className="text-3xl font-bold mb-4 tracking-tight">{title}</h4>
                <p className="text-[#8a8a8a] text-lg leading-relaxed">{desc}</p>
            </div>
        </div>
    );
};

export default App;
