import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Recycle, HeartHandshake, ShoppingBag, Store } from 'lucide-react';

export default function Onboarding() {
    const navigate = useNavigate();
    const [step, setStep] = useState(0);

    const slides = [
        {
            title: "Location Access",
            desc: "ReWear needs your location to map out nearby thrift stores, donation centers, and local community members.",
            icon: <MapPin className="w-16 h-16 text-primary mb-6" />,
            action: "Enable Location",
            requiresAction: true
        },
        {
            title: "Repurpose",
            desc: "Find ways on how you can repurpose old or unwanted clothing.",
            icon: <Recycle className="w-20 h-20 text-emerald-600 mb-8" />
        },
        {
            title: "Donate",
            desc: "Donate old or unwanted clothing to local thrift stores or chat with others who want them.",
            icon: <HeartHandshake className="w-20 h-20 text-rose-500 mb-8" />
        },
        {
            title: "Buy",
            desc: "Buy unwanted clothes from other users to upgrade your wardrobe!",
            icon: <ShoppingBag className="w-20 h-20 text-blue-500 mb-8" />
        },
        {
            title: "Sell",
            desc: "Sell old or unwanted clothes by chatting with those who are looking to buy.",
            icon: <Store className="w-20 h-20 text-amber-500 mb-8" />
        }
    ];

    const handleNext = () => {
        if (step < slides.length - 1) {
            setStep(s => s + 1);
        } else {
            navigate('/home');
        }
    };

    const currentSlide = slides[step];

    // Slide vertically for TikTok effect
    const variants = {
        enter: { y: '100%', opacity: 1 },
        center: { y: 0, opacity: 1 },
        exit: { y: '-100%', opacity: 1 },
    };

    return (
        <div className="fixed inset-0 bg-background text-foreground overflow-hidden">
            <AnimatePresence initial={false}>
                <motion.div
                    key={step}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="absolute inset-0 flex flex-col justify-center items-center p-8 text-center glass-panel"
                >
                    <div className="max-w-xs flex flex-col items-center">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            {currentSlide.icon}
                        </motion.div>

                        <h1 className="text-5xl font-serif font-semibold tracking-tight text-foreground mb-6">
                            {currentSlide.title}
                        </h1>

                        <p className="text-lg text-muted-foreground font-sans leading-relaxed">
                            {currentSlide.desc}
                        </p>

                        {currentSlide.requiresAction ? (
                            <button
                                onClick={() => {
                                    // Simulate asking for location API, then move on
                                    setTimeout(handleNext, 300);
                                }}
                                className="mt-12 w-full py-4 px-6 bg-primary text-white rounded-xl font-medium tracking-wide shadow-lg active:scale-95 transition-all text-lg"
                            >
                                {currentSlide.action}
                            </button>
                        ) : null}
                    </div>

                    {/* Progress Indicators */}
                    <div className="absolute bottom-12 flex space-x-2">
                        {slides.map((_, idx) => (
                            <div
                                key={idx}
                                className={`h-2 rounded-full transition-all duration-300 ${idx === step ? 'w-8 bg-primary' : 'w-2 bg-border'}`}
                            />
                        ))}
                    </div>

                    {/* Invisible click handler to act as swipe/tap next if not on action screen */}
                    {!currentSlide.requiresAction && (
                        <div onClick={handleNext} className="absolute inset-0 z-10 cursor-pointer" />
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
