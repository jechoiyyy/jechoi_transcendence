import React, { useEffect }  from 'react';
import { useNavigate } from "react-router-dom";

import { navigationRef } from "@utils/navigation";

const Background = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        navigationRef.navigate = navigate;
    }, [navigate]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden flex flex-col">
            <div 
                className="absolute inset-0 opacity-50"
                style={{
                    backgroundImage: `
                        radial-gradient(2px 2px at 20% 30%, white, transparent),
                        radial-gradient(2px 2px at 60% 70%, white, transparent),
                        radial-gradient(1px 1px at 50% 50%, white, transparent),
                        radial-gradient(1px 1px at 80% 10%, white, transparent),
                        radial-gradient(2px 2px at 90% 60%, white, transparent),
                        radial-gradient(1px 1px at 33% 80%, white, transparent),
                        radial-gradient(1px 1px at 15% 90%, white, transparent)
                    `,
                    backgroundSize: '200% 200%',
                    animation: 'twinkle 3s ease-in-out infinite'
                }}
            />
            <div 
                className="absolute inset-0 opacity-20"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)
                    `,
                    backgroundSize: '100px 100px',
                    maskImage: 'radial-gradient(ellipse at center, black 0%, transparent 70%)'
                }}
            />
            <div 
                className="absolute inset-0"
                style={{
                    background: 'radial-gradient(circle at center, rgba(139, 92, 246, 0.15) 0%, transparent 60%)'
                }}
            />
            <div className="absolute inset-0 opacity-30">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-purple-300 rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
                            animationDelay: `${Math.random() * 2}s`,
                            opacity: Math.random() * 0.7
                        }}
                    />
                ))}
            </div>
            
            <style>{`
                @keyframes twinkle {
                    0%, 100% { opacity: 0.5; }
                    50% { opacity: 1; }
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                }
            `}</style>
            
            <div className="relative flex-1 flex flex-col">
                {children}
            </div>
        </div>
    );
}

export default Background;