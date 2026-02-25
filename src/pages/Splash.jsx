import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Splash() {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/auth');
        }, 2500);
        return () => clearTimeout(timer);
    }, [navigate]);

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
