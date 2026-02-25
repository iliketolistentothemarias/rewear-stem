import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../lib/AuthContext';

export default function Splash() {
    const navigate = useNavigate();
    const { user, loading } = useAuth();

    useEffect(() => {
        if (loading) return; // Wait for session check

        const timer = setTimeout(() => {
            // If already signed in, skip auth and go home
            if (user) {
                navigate('/home', { replace: true });
            } else {
                navigate('/auth', { replace: true });
            }
        }, 2000);

        return () => clearTimeout(timer);
    }, [user, loading, navigate]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[100dvh] bg-background">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="flex flex-col items-center space-y-4 text-center"
            >
                <h1 className="text-5xl font-serif text-primary">ReWear</h1>
                <p className="text-muted-foreground font-sans text-lg tracking-wide">Fashion that Gives Back</p>
            </motion.div>
        </div>
    );
}
