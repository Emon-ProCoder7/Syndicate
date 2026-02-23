import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronRight, Zap, Network, Search, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const App = () => {
    const [entered, setEntered] = useState(false);
    const containerRef = useRef(null);
    const radarNodesRef = useRef([]);

    useEffect(() => {
        if (!entered) return;

        const ctx = gsap.context(() => {
            // 1. Z-AXIS HERO ENTRANCE
            gsap.from('.hero-deal-card', {
                z: -1000,
                opacity: 0,
                scale: 0.5,
                stagger: 0.2,
                duration: 1.5,
                ease: 'expo.out',
                delay: 0.5
            });

            // 2. RADAR ROTATION & SYNC
            gsap.to('.radar-rotator', {
                rotate: 360,
                duration: 40,
                repeat: -1,
                ease: 'none'
            });

            // Update radar nodes based on scroll
            ScrollTrigger.create({
                trigger: '.profiles-scroller',
                start: 'top top',
                end: 'bottom bottom',
                onUpdate: (self) => {
                    radarNodesRef.current.forEach((node, i) => {
                        gsap.to(node, {
                            x: Math.sin(self.progress * 10 + i) * 100,
                            y: Math.cos(self.progress * 10 + i) * 100,
                            duration: 1,
                            ease: 'power2.out'
                        });
                    });
                }
            });

            // 3. CONVERGENCE (15-40%)
            const convergeTL = gsap.timeline({
                scrollTrigger: {
                    trigger: '.matching-section',
                    start: 'top 30%',
                    end: 'bottom 20%',
                    scrub: 1,
                }
            });

            convergeTL
                .to('.line-left', { width: '50%', ease: 'none' }, 0)
                .to('.line-right', { width: '50%', ease: 'none' }, 0);

            // 4. MASONRY GRID STAGGER (3-column flip-up)
            gsap.from('.masonry-card', {
                scrollTrigger: {
                    trigger: '.deal-grid-section',
                    start: 'top 70%',
                },
                rotateX: -90,
                opacity: 0,
                y: 100,
                stagger: 0.1,
                duration: 1,
                ease: 'power4.out',
                transformOrigin: 'top center'
            });

            // 5. UNROLL AI SUMMARIES
            const boxes = gsap.utils.toArray('.unfold-box');
            boxes.forEach(box => {
                gsap.from(box.querySelectorAll('.summary-bullet'), {
                    scrollTrigger: {
                        trigger: box,
                        start: 'top 60%',
                    },
                    x: -40,
                    opacity: 0,
                    stagger: 0.15,
                    duration: 0.8,
                    ease: 'expo.out'
                });
            });

        }, containerRef);

        return () => ctx.revert();
    }, [entered]);

    const handleEnter = () => {
        const tl = gsap.timeline({ onComplete: () => setEntered(true) });
        tl.to('.entry-logo', { scale: 20, opacity: 0, duration: 1.2, ease: 'expo.inOut' })
            .to('.entry-overlay', { opacity: 0, visibility: 'hidden', duration: 0.8 }, '-=0.4');
    };

    return (
        <div ref={containerRef} className="bg-[#050505] text-white overflow-hidden">

            {/* 1. ENTRY SEQUENCE */}
            {!entered && (
                <div className="fixed inset-0 z-[1000] bg-[#050505] flex flex-col items-center justify-center entry-overlay">
                    <h1 className="text-[12rem] font-black tracking-tighter entry-logo select-none">SYNDICATE</h1>
                    <button onClick={handleEnter} className="mt-12 group flex flex-col items-center gap-6 cursor-pointer">
                        <span className="mono text-[10px] tracking-[4px] opacity-40 group-hover:opacity-100 transition-opacity">PRESS_TO_ENTER</span>
                        <div className="w-px h-16 bg-white/10 group-hover:h-24 transition-all duration-700"></div>
                    </button>
                </div>
            )}

            {/* FIXED NAVIGATION */}
            <nav className="fixed top-8 left-0 w-full px-12 flex justify-between items-start z-[500] pointer-events-none">
                <div className="flex flex-col gap-1 pointer-events-auto">
                    <div className="mono text-[9px] text-[#00FF88]">// MARKET_SECTOR: FINTECH</div>
                    <div className="text-xs font-bold tracking-widest opacity-40">SYNDICATE.HQ / US_ALPHA</div>
                </div>
                <div className="flex flex-col items-end gap-1 pointer-events-auto">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#00FF88] animate-pulse"></div>
                        <div className="mono text-[9px]">LIVE_TICKER: NEW MATCH IN CALIFORNIA (94%)</div>
                    </div>
                    <div className="text-[10px] mono opacity-30 uppercase">JUNE_FUNDING_PROTOTYPE_V1.0</div>
                </div>
            </nav>

            <div className="fixed bottom-8 left-12 z-[500] pointer-events-auto">
                <div className="flex items-center gap-4 px-5 py-3 glass-panel border border-white/5">
                    <div className="w-2 h-2 rounded-full bg-[#00FF88]"></div>
                    <span className="mono text-[9px] tracking-widest">SYNDICATE_INTELLIGENCE: ON</span>
                </div>
            </div>

            {/* 2. MATCHING ENGINE (SPLIT SCREEN) */}
            <div className="flex flex-col">
                {/* HERO DEPTH VIEW */}
                <section className="h-screen relative flex items-center justify-center perspective-[1000px]">
                    <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] select-none text-[25vw] font-black">SYNDICATE</div>
                    <div className="grid grid-cols-3 gap-12 max-w-6xl w-full px-12 relative z-10">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="hero-deal-card h-[400px] border border-white/5 bg-white/[0.02] backdrop-blur-3xl flex flex-col p-8 group hover:border-[#00FF88/30]">
                                <div className="flex justify-between mb-auto">
                                    <div className="w-10 h-10 bg-white/5"></div>
                                    <div className="mono text-[#00FF88] text-[10px]">[98.%]</div>
                                </div>
                                <h3 className="text-3xl font-bold tracking-tighter mb-2">Alpha Stream</h3>
                                <p className="text-xs text-white/40 mb-6 uppercase tracking-wider">Series A / New York</p>
                                <div className="mt-auto h-px w-full bg-white/10 group-hover:bg-[#00FF88/30] transition-colors"></div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* SPLIT ENGINE SECTION */}
                <div className="engine-container flex w-full relative">
                    {/* LEFT: RADAR MAP (FIXED) */}
                    <div className="w-1/2 h-screen sticky top-0 bg-[#050505] flex items-center justify-center overflow-hidden border-r border-white/5">
                        <div className="radar-rotator relative w-[400px] h-[400px] flex items-center justify-center">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="absolute border border-white/5 rounded-full" style={{ width: `${i * 25}%`, height: `${i * 25}%` }}></div>
                            ))}
                            {[1, 2, 3, 4, 5].map(i => (
                                <div
                                    key={i}
                                    ref={el => radarNodesRef.current[i] = el}
                                    className="absolute w-2 h-2 bg-[#00FF88] rounded-full blur-[2px]"
                                ></div>
                            ))}
                        </div>
                        <div className="absolute bottom-16 left-16 max-w-[200px]">
                            <div className="mono text-[#00FF88] mb-2 text-[10px]">// STATUS_RADAR</div>
                            <p className="text-[9px] leading-relaxed opacity-40 uppercase">Optimizing node distribution based on thesis alignment score...</p>
                        </div>
                    </div>

                    {/* RIGHT: PROFILES (SCROLLER) */}
                    <div className="w-1/2 profiles-scroller">
                        <div className="matching-section min-h-screen py-[20vh] px-20">
                            <div className="convergence-line border-t border-[#00FF88] line-left"></div>
                            <div className="convergence-line border-t border-[#00FF88] line-right"></div>

                            <h2 className="text-6xl font-black tracking-tighter mb-12 leading-[0.9]">Intelligent Matching for High-Signal Theses.</h2>
                            <div className="space-y-32">
                                <ProfileDetail name="Finly AI" score="94" tagline="Autonomous finance reconciliation at scale." />
                                <ProfileDetail name="Nexus Quantum" score="88" tagline="Democratizing quantum infrastructure." />
                                <ProfileDetail name="BioSynthetix" score="91" tagline="AI-native rare disease protein design." />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. DEAL FLOW GRID (MASONRY) */}
                <section className="deal-grid-section py-40 px-12 bg-[#0A0A0A]">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex justify-between items-end mb-16 border-b border-white/5 pb-8">
                            <div>
                                <h3 className="text-5xl font-black tracking-tighter italic">The Network Expansion.</h3>
                                <p className="mono text-[10px] mt-2 opacity-40 uppercase">// 50 STATES / 12,000 FOUNDERS / 1 SYNDICATE</p>
                            </div>
                            <div className="mono text-[#00FF88]">MAPPABLE_DEAL_FLOW: 1,482</div>
                        </div>

                        <div className="grid grid-cols-3 gap-8">
                            {[1, 2, 3, 4, 5, 6].map(i => (
                                <GridCard key={i} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* FOOTER NETWORK */}
                <section className="h-screen flex flex-col items-center justify-center text-center px-12 border-t border-white/5">
                    <Network size={80} className="text-[#00FF88] mb-12 animate-pulse" />
                    <h4 className="text-[12vw] font-black tracking-tighter leading-none mb-8">EXPAND.</h4>
                    <p className="mono max-w-lg mx-auto text-xs opacity-40 leading-relaxed uppercase">
                        You are now part of the most high-motion funding ecosystem ever built. Syndicate enables liquidity where others see friction.
                    </p>
                </section>
            </div>
        </div>
    );
};

const ProfileDetail = ({ name, score, tagline }) => (
    <div className="unfold-box group">
        <div className="flex justify-between items-end mb-4">
            <h4 className="text-4xl font-bold tracking-tighter">{name}</h4>
            <div className="mono text-[#00FF88]">[ {score}% ]</div>
        </div>
        <p className="text-xl text-white/40 mb-8 max-w-md">{tagline}</p>
        <div className="p-8 border border-white/5 bg-white/[0.02] flex flex-col gap-4">
            <li className="summary-bullet flex gap-4 text-xs mono opacity-60">
                <ChevronRight size={14} className="text-[#00FF88]" /> PROPRIETARY_LLM_ARCHITECTURE
            </li>
            <li className="summary-bullet flex gap-4 text-xs mono opacity-60">
                <ChevronRight size={14} className="text-[#00FF88]" /> $3.2M_REVENUE_RUN_RATE
            </li>
            <li className="summary-bullet flex gap-4 text-xs mono opacity-60">
                <ChevronRight size={14} className="text-[#00FF88]" /> PREVIOUS_EXIT_FINTECH_NYC
            </li>
        </div>
    </div>
);

const GridCard = () => {
    const cardRef = useRef(null);

    const onMouseMove = (e) => {
        const rect = cardRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20;
        gsap.to(cardRef.current, { rotateX: y, rotateY: x, duration: 0.4 });
    };

    return (
        <div
            ref={cardRef}
            onMouseMove={onMouseMove}
            onMouseLeave={() => gsap.to(cardRef.current, { rotateX: 0, rotateY: 0, duration: 0.6 })}
            className="masonry-card h-[450px] border border-white/5 bg-[#080808] p-8 flex flex-col hover:border-[#00FF88]/40 transition-colors cursor-pointer perspective-[1000px]"
        >
            <div className="flex justify-between mb-8">
                <div className="w-12 h-12 bg-white/5 rounded-full"></div>
                <ArrowUpRight size={20} className="text-white/20 group-hover:text-[#00FF88]" />
            </div>
            <div className="mt-auto">
                <div className="mono text-[9px] text-[#00FF88] mb-2">// SERIES_B / AUSTIN</div>
                <h5 className="text-2xl font-bold tracking-tighter mb-4">Solaris Energy</h5>
                <p className="text-xs text-white/40 leading-relaxed uppercase">Building the core infrastructure for next-gen perovskite solar manufacturing.</p>
            </div>
        </div>
    );
};

export default App;
