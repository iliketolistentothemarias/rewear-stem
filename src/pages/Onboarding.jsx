import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MapPin, ShoppingBag, CreditCard, Recycle, Heart, ChevronDown } from 'lucide-react';
import AuthModal from '../components/AuthModal';

const slides = [
    {
        id: 'location',
        type: 'location',
        title: "Find Your Eco-Community",
        desc: "We need your location to show you nearby buyers, sellers, and donation centers.",
        color: "bg-eco-dark"
    },
    {
        id: 'sell',
        title: "Sell Your Clothes",
        desc: "Give your closet a second life and earn cash.",
        icon: ShoppingBag,
        color: "bg-eco-brown"
    },
    {
        id: 'buy',
        title: "Shop Sustainably",
        desc: "Find unique, pre-loved pieces at great prices.",
        icon: CreditCard,
        color: "bg-eco-green"
    },
    {
        id: 'repurpose',
        title: "Repurpose",
        desc: "Learn how to upcycle your old threads into something new.",
        icon: Recycle,
        color: "bg-orange-700"
    },
    {
        id: 'donate',
        title: "Donate & Earn Credits",
        desc: "Help the community and earn rewards for your generosity.",
        icon: Heart,
        color: "bg-emerald-600"
    }
];

export default function Onboarding() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showAuth, setShowAuth] = useState(false);
    const navigate = useNavigate();

    const nextSlide = () => {
        if (currentIndex < slides.length - 1) {
            setCurrentIndex(prev => prev + 1);
        }
    };

    const handleGetStarted = () => {
        setShowAuth(true);
    };

    return (
        <div className="fixed inset-0 overflow-hidden bg-black text-white">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ y: "100%", opacity: 0.5 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: "-100%", opacity: 0.5 }}
                    transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                    className={`absolute inset-0 flex flex-col items-center justify-center p-8 text-center ${slides[currentIndex].color}`}
                >
                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="flex-1 flex flex-col items-center justify-center space-y-8 max-w-sm relative z-10"
                    >
                        {slides[currentIndex].type === 'location' ? (
                            <div className="flex flex-col items-center space-y-6">
                                <div className="p-8 bg-white/20 rounded-full backdrop-blur-xl border border-white/30 shadow-2xl">
                                    <MapPin size={64} className="text-white drop-shadow-md" />
                                </div>
                                <h2 className="text-4xl font-black tracking-tight">{slides[currentIndex].title}</h2>
                                <p className="text-xl opacity-90 font-medium leading-relaxed">{slides[currentIndex].desc}</p>
                                <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    onClick={nextSlide}
                                    className="px-10 py-4 bg-white text-black font-bold rounded-full shadow-xl hover:scale-105 transition-transform"
                                >
                                    Enable Location
                                </motion.button>
                                <button onClick={nextSlide} className="text-sm underline opacity-70 hover:opacity-100">
                                    Skip for now
                                </button>
                            </div>
                        ) : (
                            <>
                                {slides[currentIndex].icon && (
                                    <div className="p-8 bg-white/10 rounded-[2rem] backdrop-blur-md shadow-2xl border border-white/20">
                                        {React.createElement(slides[currentIndex].icon, { size: 80, className: "text-white" })}
                                    </div>
                                )}
                                <h2 className="text-5xl font-black tracking-tighter leading-none">{slides[currentIndex].title}</h2>
                                <p className="text-xl font-medium opacity-90 leading-relaxed">{slides[currentIndex].desc}</p>

                                <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleGetStarted}
                                    className="mt-8 px-12 py-5 bg-white text-black font-black rounded-full text-xl shadow-2xl hover:scale-105 transition-transform"
                                >
                                    Get Started
                                </motion.button>
                            </>
                        )}
                    </motion.div>

                    {/* Background blob for extra flair */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/10 rounded-full blur-[100px] pointer-events-none" />

                    {/* Navigation Hint */}
                    {currentIndex < slides.length - 1 && (
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                            className="absolute bottom-10 opacity-70 cursor-pointer p-4"
                            onClick={nextSlide}
                        >
                            <ChevronDown size={40} />
                        </motion.div>
                    )}
                </motion.div>
            </AnimatePresence>

            {/* Auth Modal Overlay */}
            <AnimatePresence>
                {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
            </AnimatePresence>
        </div>
    );
}
