import React, { useState } from 'react';
import { Camera, Edit2, ChevronRight, Settings, Bell, Shield, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';

const SettingsItem = ({ icon: Icon, label, danger }) => (
    <motion.button
        whileHover={{ x: 5, backgroundColor: 'rgba(255,255,255,0.8)' }}
        whileTap={{ scale: 0.98 }}
        className={`w-full p-4 bg-white/60 backdrop-blur-sm rounded-2xl shadow-sm border border-white/50 text-left font-medium flex justify-between items-center group mb-3 ${danger ? 'text-red-500 hover:bg-red-50/50' : 'text-gray-700 hover:text-eco-green'}`}
    >
        <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-xl ${danger ? 'bg-red-100 text-red-500' : 'bg-gray-100 text-gray-500'}`}>
                <Icon size={18} />
            </div>
            <span>{label}</span>
        </div>
        {!danger && <ChevronRight size={18} className="text-gray-300 group-hover:text-eco-green transition-colors" />}
    </motion.button>
);

export default function Profile() {
    const [user] = useState({
        name: "Eco Warrior",
        description: "Loving the sustainable life! 🌿",
        pfp: null
    });

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center pt-8 pb-20"
        >
            <div className="relative group cursor-pointer mb-6">
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="w-32 h-32 rounded-full bg-gradient-to-br from-eco-light to-eco-green p-1 shadow-2xl"
                >
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-eco-dark overflow-hidden border-4 border-white">
                        {user.pfp ? (
                            <img src={user.pfp} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-4xl font-black">EW</span>
                        )}
                    </div>
                </motion.div>
                <div className="absolute bottom-0 right-0 p-3 bg-eco-dark text-white rounded-full shadow-lg border-4 border-eco-bg">
                    <Camera size={18} />
                </div>
            </div>

            <div className="text-center space-y-2 mb-10">
                <div className="flex items-center justify-center space-x-2">
                    <h1 className="text-3xl font-black text-eco-dark">{user.name}</h1>
                    <button className="p-1.5 bg-gray-100 rounded-full text-gray-500 hover:text-eco-green hover:bg-white transition-colors"><Edit2 size={14} /></button>
                </div>
                <p className="text-gray-500 font-medium">{user.description}</p>
            </div>

            <div className="w-full px-2">
                <h3 className="font-bold text-gray-400 text-xs uppercase tracking-widest mb-4 ml-2">Settings</h3>
                <SettingsItem icon={Settings} label="Account Settings" />
                <SettingsItem icon={Bell} label="Notifications" />
                <SettingsItem icon={Shield} label="Privacy & Security" />
                <SettingsItem icon={LogOut} label="Log Out" danger />
            </div>
        </motion.div>
    );
}
