import { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { Home, MessageCircle, Recycle, Map as MapIcon, Plus } from 'lucide-react';
import UploadModal from '../components/UploadModal';

export default function MainLayout() {
    const [isUploadOpen, setUploadOpen] = useState(false);

    return (
        <div className="h-[100dvh] flex flex-col bg-background text-foreground font-sans relative overflow-hidden">

            {/* Scrollable Main Output Area */}
            <main className="flex-1 overflow-y-auto pb-24 no-scrollbar bg-background">
                <Outlet />
            </main>

            {/* Spotify-style Bottom Navigation Bar */}
            <nav className="absolute bottom-0 w-full bg-white/95 backdrop-blur-md border-t border-border shadow-[0_-4px_20px_rgba(42,59,48,0.04)] pb-[env(safe-area-inset-bottom)] z-50">
                <div className="flex justify-around items-end px-2 pt-2 pb-3 h-20">
                    <NavItem to="/home" icon={<Home className="w-[26px] h-[26px]" />} label="Home" />
                    <NavItem to="/chat" icon={<MessageCircle className="w-[26px] h-[26px]" />} label="Messages" />

                    {/* Central Prominent Upload Action */}
                    <div className="flex flex-col items-center -mt-6">
                        <button
                            onClick={() => setUploadOpen(true)}
                            className="w-[56px] h-[56px] bg-primary text-white rounded-2xl flex items-center justify-center shadow-lg eco-shadow hover:scale-105 active:scale-95 transition-transform"
                        >
                            <Plus className="w-8 h-8" strokeWidth={2.5} />
                        </button>
                        <span className="text-[10px] font-medium text-foreground mt-1.5 tracking-wide">List Item</span>
                    </div>

                    <NavItem to="/repurpose" icon={<Recycle className="w-[26px] h-[26px]" />} label="Ideas" />
                    <NavItem to="/map" icon={<MapIcon className="w-[26px] h-[26px]" />} label="Map" />
                </div>
            </nav>

            <UploadModal isOpen={isUploadOpen} onClose={() => setUploadOpen(false)} />
        </div>
    );
}

function NavItem({ to, icon, label }) {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `flex flex-col items-center w-16 transition-all duration-300 ${isActive ? 'text-primary scale-105' : 'text-muted-foreground hover:text-foreground'
                }`
            }
        >
            <div className={`relative flex items-center justify-center transition-all mb-1`}>
                {icon}
            </div>
            <span className={`text-[10px] font-medium mt-0.5 transition-all w-full text-center`}>
                {label}
            </span>
        </NavLink>
    );
}
