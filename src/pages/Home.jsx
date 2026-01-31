import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Award, TrendingUp, Sparkles, MapPin } from 'lucide-react';

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

const StatCard = ({ icon: Icon, value, label, color, delay }) => (
    <motion.div
        variants={item}
        whileHover={{ y: -5 }}
        className={`flex flex-col items-center justify-center p-4 rounded-3xl glass-card relative overflow-hidden group border border-white/40`}
    >
        <div className={`absolute top-0 right-0 p-10 opacity-10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700 ${color.replace('text-', 'bg-')}`}></div>
        <Icon size={24} className={`mb-2 opacity-80 ${color}`} />
        <span className="text-3xl font-black text-eco-text">{value}</span>
        <span className="text-xs opacity-60 uppercase tracking-widest font-semibold">{label}</span>
    </motion.div>
);

export default function Home() {
    // Mock data
    const points = 750;
    const nextMilestone = 1000;
    const progress = (points / nextMilestone) * 100;

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-8 pb-24"
        >
            <header className="mt-4 flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-black gradient-text">Your Impact</h1>
                    <p className="text-eco-text/70 font-medium">Keep making a difference!</p>
                </div>
                <div className="p-2 glass rounded-full">
                    <Sparkles className="text-yellow-500 animate-pulse" />
                </div>
            </header>

            {/* Progress Section */}
            <motion.section
                variants={item}
                className="bg-gradient-to-br from-eco-green to-eco-dark text-white p-8 rounded-[2rem] shadow-2xl relative overflow-hidden"
            >
                <div className="relative z-10">
                    <div className="flex justify-between items-end mb-3">
                        <span className="text-sm font-bold opacity-80 tracking-wide uppercase">Next Reward</span>
                        <div className="text-right">
                            <span className="text-4xl font-black">{points}</span>
                            <span className="text-lg opacity-60">/{nextMilestone}</span>
                        </div>
                    </div>
                    <div className="h-4 bg-black/20 rounded-full overflow-hidden backdrop-blur-sm border border-white/10">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="h-full bg-gradient-to-r from-eco-light to-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.5)]"
                        />
                    </div>
                    <p className="mt-4 text-sm font-medium opacity-90 flex items-center">
                        <span className="mr-2">🎉</span>
                        You're {nextMilestone - points} points away from a discount!
                    </p>
                </div>
                {/* Decorative background circle */}
                <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-blob animation-delay-2000" />
                <div className="absolute -top-24 -left-24 w-64 h-64 bg-eco-light/20 rounded-full blur-3xl animate-blob" />
            </motion.section>

            {/* Grid Stats */}
            <section className="grid grid-cols-2 gap-4">
                <StatCard icon={Leaf} value="12" label="Repurposed" color="text-eco-green" />
                <StatCard icon={Award} value="5" label="Donated" color="text-blue-500" />
                <StatCard icon={TrendingUp} value="24kg" label="CO2 Saved" color="text-teal-500" />
                <StatCard icon={Award} value="$300" label="Earned" color="text-amber-600" />
            </section>

            {/* Recent Activity or Suggestions */}
            <section className="space-y-4">
                <h2 className="text-xl font-bold text-eco-dark px-2">Recommended for You</h2>
                <div className="space-y-3">
                    <motion.div variants={item} className="p-4 rounded-2xl glass-card flex items-center space-x-4 cursor-pointer group">
                        <div className="w-14 h-14 rounded-xl bg-indigo-100 flex-shrink-0 flex items-center justify-center text-indigo-500 group-hover:scale-110 transition-transform">
                            <MapPin />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-800">Summer Vintage Sale</h3>
                            <p className="text-sm text-gray-500 font-medium">0.5 mi • Downtown</p>
                        </div>
                    </motion.div>
                    <motion.div variants={item} className="p-4 rounded-2xl glass-card flex items-center space-x-4 cursor-pointer group">
                        <div className="w-14 h-14 rounded-xl bg-orange-100 flex-shrink-0 flex items-center justify-center text-orange-500 group-hover:scale-110 transition-transform">
                            <Sparkles />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-800">Cotton Upcycling Workshop</h3>
                            <p className="text-sm text-gray-500 font-medium">Sat, 2pm • Community Center</p>
                        </div>
                    </motion.div>
                </div>
            </section>
        </motion.div>
    );
}
