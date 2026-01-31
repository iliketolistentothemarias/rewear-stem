import React from 'react';
import { Search, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.08 }
    }
};

const item = {
    hidden: { opacity: 0, x: -10 },
    show: { opacity: 1, x: 0 }
};

const ChatItem = ({ name, message, time, unread }) => (
    <motion.div
        variants={item}
        whileTap={{ scale: 0.98 }}
        className="flex items-center space-x-4 p-4 glass-card rounded-2xl mb-3 cursor-pointer"
    >
        <div className="relative">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-md ${unread ? 'bg-gradient-to-br from-eco-green to-teal-600' : 'bg-gray-300'}`}>
                {name.charAt(0)}
            </div>
            {unread > 0 && (
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-[10px] text-white font-bold border-4 border-white">
                    {unread}
                </div>
            )}
        </div>
        <div className="flex-1 min-w-0">
            <div className="flex justify-between items-baseline mb-1">
                <h3 className={`font-bold truncate text-base ${unread ? 'text-gray-900' : 'text-gray-600'}`}>{name}</h3>
                <span className="text-xs text-gray-400 font-medium">{time}</span>
            </div>
            <p className={`text-sm truncate ${unread > 0 ? 'text-gray-800 font-medium' : 'text-gray-400'}`}>
                {message}
            </p>
        </div>
    </motion.div>
);

export default function Network() {
    return (
        <div className="h-full flex flex-col pt-4 space-y-6 pb-24">
            <header className="flex justify-between items-center px-1">
                <h1 className="text-3xl font-black gradient-text">Messages</h1>
                <motion.button
                    whileTap={{ scale: 0.9 }}
                    className="p-3 bg-white shadow-md rounded-full text-eco-green"
                >
                    <MessageCircle size={24} />
                </motion.button>
            </header>

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                    type="text"
                    placeholder="Search messages..."
                    className="w-full pl-12 pr-4 py-4 bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-eco-green/50 placeholder-gray-400 font-medium"
                />
            </div>

            {/* Chat List */}
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="flex-1 overflow-y-auto custom-scrollbar"
            >
                <ChatItem name="Sarah Jenkins" message="Is the vintage denim jacket still available?" time="2m ago" unread={1} />
                <ChatItem name="Mike T." message="Thanks for the donation! It really helps." time="1h ago" unread={0} />
                <ChatItem name="Eco Boutique" message="New arrivals that match your style! 🌱" time="Yesterday" unread={0} />
                <ChatItem name="Alex R." message="Can we meet at the downtown center?" time="2d ago" unread={0} />
            </motion.div>
        </div>
    );
}
