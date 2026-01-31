import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, CreditCard, Recycle, Heart, Camera, Upload } from 'lucide-react';

const ActionTab = ({ id, label, icon: Icon, active, onClick }) => (
    <button
        onClick={() => onClick(id)}
        className={`flex-1 flex flex-col items-center justify-center py-4 transition-colors relative z-10 ${active ? 'text-eco-dark' : 'text-gray-400 hover:text-gray-600'}`}
    >
        <motion.div whileTap={{ scale: 0.9 }}>
            <Icon size={24} className="mb-1" />
        </motion.div>
        <span className="text-xs font-medium">{label}</span>
        {active && (
            <motion.div
                layoutId="activeActionTab"
                className="absolute inset-0 bg-white shadow-sm rounded-xl -z-10 border border-gray-100/50"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
        )}
    </button>
);

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.05 }
    }
};

const item = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0 }
};

export default function Action() {
    const [activeTab, setActiveTab] = useState('sell');

    return (
        <div className="flex flex-col h-full pb-20">
            {/* Header Tabs */}
            <div className="pt-4 px-2 mb-4">
                <h1 className="text-center font-black text-2xl mb-4 gradient-text">Action Center</h1>
                <div className="flex p-1 bg-gray-100/50 backdrop-blur-md rounded-2xl">
                    <ActionTab id="sell" label="Sell" icon={ShoppingBag} active={activeTab === 'sell'} onClick={setActiveTab} />
                    <ActionTab id="buy" label="Buy" icon={CreditCard} active={activeTab === 'buy'} onClick={setActiveTab} />
                    <ActionTab id="repurpose" label="Repurpose" icon={Recycle} active={activeTab === 'repurpose'} onClick={setActiveTab} />
                    <ActionTab id="donate" label="Donate" icon={Heart} active={activeTab === 'donate'} onClick={setActiveTab} />
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 px-4 overflow-y-auto custom-scrollbar">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        variants={container}
                        initial="hidden"
                        animate="show"
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="h-full pb-10"
                    >
                        {activeTab === 'sell' && (
                            <div className="space-y-6">
                                <motion.div variants={item} whileTap={{ scale: 0.98 }} className="border-2 border-dashed border-eco-green/30 rounded-3xl h-56 flex flex-col items-center justify-center bg-eco-bg/50 backdrop-blur-sm text-eco-green hover:border-eco-green hover:bg-eco-green/5 cursor-pointer transition-colors glass-card">
                                    <Camera size={48} className="mb-3 opacity-80" strokeWidth={1.5} />
                                    <span className="font-bold text-lg">Take a photo</span>
                                    <span className="text-xs text-eco-text/60 mt-1">or upload from gallery</span>
                                </motion.div>
                                <motion.div variants={item} className="glass-card p-6 rounded-3xl space-y-4">
                                    <input type="text" placeholder="Item Name" className="w-full bg-transparent border-b border-gray-200 py-3 focus:outline-none focus:border-eco-green placeholder-gray-400 font-medium" />
                                    <input type="text" placeholder="Price ($)" className="w-full bg-transparent border-b border-gray-200 py-3 focus:outline-none focus:border-eco-green placeholder-gray-400 font-medium" />
                                    <textarea placeholder="Description" rows={3} className="w-full bg-transparent border-b border-gray-200 py-3 focus:outline-none focus:border-eco-green resize-none placeholder-gray-400 font-medium"></textarea>
                                    <motion.button whileTap={{ scale: 0.95 }} className="w-full bg-eco-dark text-white font-bold py-4 rounded-2xl shadow-lg shadow-eco-dark/20 mt-4 hover:shadow-xl transition-shadow">
                                        Post Item
                                    </motion.button>
                                </motion.div>
                            </div>
                        )}

                        {activeTab === 'buy' && (
                            <div className="grid grid-cols-2 gap-4">
                                {[1, 2, 3, 4, 5, 6].map(i => (
                                    <motion.div variants={item} key={i} whileHover={{ scale: 1.02 }} className="glass-card p-3 rounded-2xl">
                                        <div className="aspect-[3/4] bg-gray-100 rounded-xl mb-3 relative overflow-hidden">
                                            {/* Simulated Image */}
                                            <div className={`absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 ${i % 2 === 0 ? 'opacity-80' : 'opacity-60'}`} />
                                        </div>
                                        <h3 className="font-bold text-sm text-gray-800">Vintage Tee</h3>
                                        <div className="flex justify-between items-center mt-1">
                                            <p className="text-xs font-medium text-gray-500">$24.00</p>
                                            <div className="w-2 h-2 rounded-full bg-eco-green"></div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}

                        {activeTab === 'repurpose' && (
                            <div className="space-y-4">
                                <motion.div variants={item} className="glass-card p-4 rounded-2xl flex items-start space-x-4 cursor-pointer group">
                                    <div className="w-24 h-24 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600 group-hover:scale-105 transition-transform">
                                        <Recycle size={32} />
                                    </div>
                                    <div className="py-1">
                                        <span className="text-[10px] font-bold bg-orange-100 text-orange-700 px-2 py-1 rounded-full uppercase tracking-wider">Tutorial</span>
                                        <h3 className="font-bold text-lg text-gray-800 mt-2 leading-tight">DIY Denim Bag</h3>
                                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">Transform old jeans into a stylish tote bag. Beginner friendly.</p>
                                    </div>
                                </motion.div>
                                <motion.div variants={item} className="glass-card p-4 rounded-2xl flex items-start space-x-4 cursor-pointer group">
                                    <div className="w-24 h-24 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 group-hover:scale-105 transition-transform">
                                        <Upload size={32} />
                                    </div>
                                    <div className="py-1">
                                        <span className="text-[10px] font-bold bg-blue-100 text-blue-700 px-2 py-1 rounded-full uppercase tracking-wider">Video</span>
                                        <h3 className="font-bold text-lg text-gray-800 mt-2 leading-tight">T-Shirt Yarn</h3>
                                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">Learn how to make yarn from old t-shirts for knitting/crochet.</p>
                                    </div>
                                </motion.div>
                            </div>
                        )}

                        {activeTab === 'donate' && (
                            <motion.div variants={item} className="text-center space-y-6 pt-6">
                                <div className="relative inline-block">
                                    <div className="absolute inset-0 bg-red-200 blur-2xl opacity-50 rounded-full animate-pulse"></div>
                                    <Heart size={80} className="text-red-500 relative z-10 mx-auto" fill="currentColor" />
                                </div>
                                <div>
                                    <h2 className="text-3xl font-black text-gray-800">Donate for Good</h2>
                                    <p className="text-gray-500 mt-2 max-w-xs mx-auto">Schedule a pickup or find a drop-off location to earn credits and help the planet.</p>
                                </div>
                                <div className="space-y-3 pt-4">
                                    <motion.button whileTap={{ scale: 0.95 }} className="w-full bg-eco-green text-white font-bold py-4 rounded-2xl shadow-xl shadow-eco-green/30">Find Drop-off Locations</motion.button>
                                    <motion.button whileTap={{ scale: 0.95 }} className="w-full bg-white/50 backdrop-blur-md text-eco-green border-2 border-eco-green font-bold py-4 rounded-2xl shadow-sm">Schedule Pickup</motion.button>
                                </div>
                            </motion.div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
