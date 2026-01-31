import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import BottomNav from '../components/BottomNav';
import TopBar from '../components/TopBar';

const pageVariants = {
    initial: { opacity: 0, scale: 0.98, y: 10 },
    in: { opacity: 1, scale: 1, y: 0 },
    out: { opacity: 0, scale: 1.02, filter: "blur(4px)" } // Smooth fade out with blur
};

const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.4
};

export default function AppLayout() {
    const location = useLocation();
    const isSplash = location.pathname === '/';

    if (isSplash) {
        return <Outlet />;
    }

    return (
        <div className="flex flex-col min-h-screen pb-16">
            <TopBar />
            <main className="flex-1 overflow-y-auto pt-16 px-4">
                {/* Animated Page Wrapper */}
                <motion.div
                    key={location.pathname}
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                    className="h-full"
                >
                    <Outlet />
                </motion.div>
            </main>
            <BottomNav />
        </div>
    );
}
