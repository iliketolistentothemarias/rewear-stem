import React from 'react';
import { Gift, Wallet, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const item = {
    hidden: { opacity: 0, scale: 0.9 },
    show: { opacity: 1, scale: 1 }
};

const RewardItem = ({ title, cost, partner, imageColor }) => (
    <motion.div
        variants={item}
        whileHover={{ x: 5 }}
        whileTap={{ scale: 0.98 }}
        className="flex items-center space-x-4 p-4 glass-card rounded-2xl cursor-pointer"
    >
        <div className={`w-16 h-16 rounded-2xl ${imageColor} flex items-center justify-center text-white font-bold text-xl shadow-lg opacity-90`}>
            {partner.charAt(0)}
        </div>
        <div className="flex-1">
            <h3 className="font-bold text-gray-800">{title}</h3>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">{partner}</p>
        </div>
        <div className="flex flex-col items-end">
            <span className="font-black text-eco-green">{cost} pts</span>
            <button className="mt-2 text-[10px] font-bold px-3 py-1.5 bg-black text-white rounded-full uppercase tracking-wide hover:bg-gray-800 transition-colors">
                Redeem
            </button>
        </div>
    </motion.div>
);

export default function Rewards() {
    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-8 pt-4 pb-24"
        >
            <header>
                <h1 className="text-3xl font-black gradient-text mb-6">Rewards</h1>
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="p-8 bg-gradient-to-br from-eco-dark to-eco-green text-white rounded-[2rem] shadow-2xl relative overflow-hidden"
                >
                    <div className="relative z-10 flex justify-between items-start">
                        <div>
                            <p className="text-eco-light text-sm font-bold uppercase tracking-widest mb-1">Balance</p>
                            <h2 className="text-5xl font-black tracking-tighter">750</h2>
                        </div>
                        <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-md shadow-inner border border-white/10">
                            <Wallet size={32} />
                        </div>
                    </div>
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl animate-blob"></div>
                </motion.div>
            </header>

            <section>
                <div className="flex justify-between items-center mb-5 px-1">
                    <h2 className="font-bold text-xl text-gray-800">Redeem Points</h2>
                    <span className="text-sm text-eco-green flex items-center font-bold">View All <ArrowRight size={14} className="ml-1" /></span>
                </div>
                <div className="space-y-4">
                    <RewardItem title="15% Off Your Next Purchase" partner="Patagonia" cost="500" imageColor="bg-blue-600" />
                    <RewardItem title="$10 Donation Credit" partner="Red Cross" cost="1000" imageColor="bg-red-600" />
                    <RewardItem title="Free Coffee" partner="Local Cafe" cost="250" imageColor="bg-yellow-600" />
                </div>
            </section>
        </motion.div>
    );
}
