import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';
import { useAuth } from '../lib/AuthContext';

export default function Auth() {
    const navigate = useNavigate();
    const { signIn, signUp } = useAuth();
    const [isLogin, setIsLogin] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const variants = {
        enter: { x: 40, opacity: 0 },
        center: { x: 0, opacity: 1 },
        exit: { x: -40, opacity: 0 },
    };

    const handleSubmit = async (e) => {
        e?.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (isLogin) {
                const { error } = await signIn(email, password);
                if (error) {
                    setError(error.message);
                } else {
                    // Session auto-updates via AuthContext → RedirectIfAuth sends to /home
                    navigate('/home');
                }
            } else {
                // Sign up — Supabase auto-logs you in if email confirmation is off
                const { data, error } = await signUp(email, password);
                if (error) {
                    setError(error.message);
                } else if (data?.session) {
                    // Auto-logged in, go straight to onboarding
                    navigate('/onboarding');
                } else if (data?.user && !data?.session) {
                    // Email confirmation is required — tell user to check email
                    setError('Check your email for a confirmation link, then sign in.');
                    setIsLogin(true);
                }
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[100dvh] flex flex-col bg-background text-foreground font-sans relative overflow-hidden px-8 py-12">
            <AnimatePresence mode="wait">
                <motion.div
                    key={isLogin ? 'login' : 'signup'}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.35 }}
                    className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full"
                >
                    <div className="mb-10">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">ReWear</p>
                        <h1 className="text-4xl font-serif text-foreground leading-tight mb-2">
                            {isLogin ? 'Welcome back.' : 'Join the community.'}
                        </h1>
                        <p className="text-muted-foreground text-[15px]">Fashion that gives back.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-3">
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <input
                                type="email"
                                placeholder="Email address"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                                className="w-full bg-white border border-border rounded-md pl-11 pr-4 py-3.5 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all placeholder:text-muted-foreground text-[15px]"
                            />
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                                minLength={6}
                                className="w-full bg-white border border-border rounded-md pl-11 pr-4 py-3.5 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all placeholder:text-muted-foreground text-[15px]"
                            />
                        </div>

                        {error && (
                            <p className="text-sm text-rose-600 bg-rose-50 border border-rose-200 rounded-md px-4 py-2.5">{error}</p>
                        )}

                        <button
                            type="submit"
                            disabled={loading || !email || !password}
                            className="w-full py-3.5 bg-primary text-white rounded-md font-medium tracking-wide flex items-center justify-center space-x-2 active:scale-[0.98] transition-all hover:bg-primary/90 disabled:opacity-60 disabled:active:scale-100 mt-1"
                        >
                            {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                                    <ArrowRight className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </form>

                    <button
                        onClick={() => { setIsLogin(!isLogin); setError(''); }}
                        className="mt-8 text-sm text-muted-foreground hover:text-foreground transition-colors text-center w-full"
                    >
                        {isLogin ? "New to ReWear? Create an account" : "Already have an account? Sign in"}
                    </button>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
