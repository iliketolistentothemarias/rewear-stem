import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function Splash() {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/onboarding');
        }, 3500);
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden z-[60] bg-eco-bg/20 backdrop-blur-3xl">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="flex flex-col items-center relative z-10"
            >
                {/* Animated Logo Container */}
                <div className="relative mb-6">
                    <div className="absolute inset-0 bg-eco-green/30 blur-2xl rounded-full animate-pulse"></div>
                    <h1 className="text-7xl font-black tracking-tighter text-eco-dark relative z-10 drop-shadow-sm">
                        ReWear
                    </h1>
                </div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="text-eco-text text-xl font-medium tracking-widest uppercase"
                >
                    Wear it again.
                </motion.p>
            </motion.div>

            {/* Transition Overlay */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3, duration: 0.5 }}
                className="absolute inset-0 bg-black z-50"
            />
        </div>
    );
}
