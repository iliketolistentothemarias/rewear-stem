import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Map, PlusCircle, Users, Gift } from 'lucide-react';
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

const NavItem = ({ to, icon: Icon, label }) => (
    <NavLink
        to={to}
        className={({ isActive }) =>
            twMerge(
                "flex flex-col items-center justify-center w-full h-full relative z-10",
                isActive ? "text-eco-green" : "text-gray-400 hover:text-eco-text transition-colors"
            )
        }
    >
        {({ isActive }) => (
            <>
                <motion.div whileTap={{ scale: 0.8 }}>
                    <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                </motion.div>
                <span className="text-[10px] font-medium mt-1">{label}</span>
                {isActive && (
                    <motion.div
                        layoutId="nav-bg"
                        className="absolute -top-1 w-8 h-1 bg-eco-green rounded-b-full shadow-[0_0_10px_rgba(46,139,87,0.5)]"
                    />
                )}
            </>
        )}
    </NavLink>
);

export default function BottomNav() {
    return (
        <div className="fixed bottom-4 left-4 right-4 h-16 rounded-2xl glass-panel flex items-center justify-around px-2 z-50 shadow-2xl safe-area-bottom">
            <NavItem to="/home" icon={Home} label="Home" />
            <NavItem to="/map" icon={Map} label="Map" />

            {/* Floating Action Button */}
            <div className="relative -top-8">
                <NavLink
                    to="/action"
                >
                    {({ isActive }) => (
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={twMerge(
                                "flex items-center justify-center w-16 h-16 rounded-full shadow-[0_8px_32px_rgba(46,139,87,0.4)] transition-colors duration-200 border-4 border-eco-bg",
                                isActive ? "bg-eco-dark text-white" : "bg-eco-green text-white hover:bg-eco-dark"
                            )}
                        >
                            <PlusCircle size={32} />
                        </motion.div>
                    )}
                </NavLink>
            </div>

            <NavItem to="/network" icon={Users} label="Network" />
            <NavItem to="/rewards" icon={Gift} label="Rewards" />
        </div>
    );
}
