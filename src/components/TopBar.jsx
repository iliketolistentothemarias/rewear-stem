import React from 'react';
import { Settings, HelpCircle, User } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TopBar() {
    return (
        <div className="fixed top-0 left-0 right-0 h-14 bg-transparent z-40 px-4 flex items-center justify-between pointer-events-none">

            {/* Profile / Left */}
            <Link to="/profile" className="flex items-center pointer-events-auto bg-white/80 backdrop-blur-md p-1.5 rounded-full shadow-sm border border-white/20">
                <div className="w-8 h-8 rounded-full bg-eco-light flex items-center justify-center text-white overflow-hidden">
                    {/* Placeholder PFP */}
                    <User size={20} />
                </div>
                <span className="ml-2 mr-2 text-sm font-semibold text-eco-text">Hi, User</span>
            </Link>

            {/* Settings / Right */}
            <div className="flex items-center space-x-2 pointer-events-auto">
                <Link to="/help" className="p-2 rounded-full bg-white/80 backdrop-blur-md shadow-sm border border-white/20 text-eco-text">
                    <HelpCircle size={20} />
                </Link>
                <Link to="/settings" className="p-2 rounded-full bg-white/80 backdrop-blur-md shadow-sm border border-white/20 text-eco-text">
                    <Settings size={20} />
                </Link>
            </div>
        </div>
    );
}
