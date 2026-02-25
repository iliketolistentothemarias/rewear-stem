import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, Check, ArrowRight, Loader2 } from 'lucide-react';
import { useAuth } from '../lib/AuthContext';

export default function Auth() {
    const navigate = useNavigate();
    const { signIn, signUp } = useAuth();
    const [isLogin, setIsLogin] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(1); // 1: auth, 2: terms (signup only), 3: success

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
                if (error) setError(error.message);
                else navigate('/home');
            } else {
                if (step === 1) { setStep(2); setLoading(false); return; }
                const { error } = await signUp(email, password);
                if (error) setError(error.message);
                else setStep(3);
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

                {/* Step 1: Credentials */}
                {step === 1 && (
                    <motion.div
                        key="auth"
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
                                        <span>{isLogin ? 'Sign In' : 'Continue'}</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </>
                                )}
                            </button>
                        </form>

                        <button
                            onClick={() => { setIsLogin(!isLogin); setError(''); setStep(1); }}
                            className="mt-8 text-sm text-muted-foreground hover:text-foreground transition-colors text-center w-full"
                        >
                            {isLogin ? "New to ReWear? Create an account" : "Already have an account? Sign in"}
                        </button>
                    </motion.div>
                )}

                {/* Step 2: Terms (Sign Up) */}
                {step === 2 && (
                    <motion.div
                        key="terms"
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.35 }}
                        className="flex-1 flex flex-col pt-8 max-w-sm mx-auto w-full"
                    >
                        <h2 className="text-3xl font-serif mb-6 leading-tight">Terms &<br />Community Rules</h2>
                        <div className="flex-1 overflow-y-auto mb-8 text-[14px] leading-relaxed text-muted-foreground border border-border rounded-md p-5 bg-white space-y-3">
                            <p>By joining ReWear, you agree to our terms of service.</p>
                            <p>1. Accurately describe any fashion items you list.</p>
                            <p>2. This platform exists to reduce consumerism. Points are rewarded for donations.</p>
                            <p>3. We reserve the right to remove accounts participating in fraudulent activity.</p>
                            <p>4. Be respectful to all community members.</p>
                        </div>

                        {error && (
                            <p className="text-sm text-rose-600 mb-4 bg-rose-50 border border-rose-200 rounded-md px-4 py-2.5">{error}</p>
                        )}

                        <div className="flex space-x-3">
                            <button onClick={() => setStep(1)} className="flex-1 py-3.5 bg-accent text-foreground rounded-md font-medium">
                                Back
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={loading}
                                className="flex-[2] py-3.5 bg-primary text-white rounded-md font-medium flex items-center justify-center disabled:opacity-60"
                            >
                                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Agree & Create Account'}
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* Step 3: Success */}
                {step === 3 && (
                    <motion.div
                        key="success"
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.35 }}
                        className="flex-1 flex flex-col items-center justify-center max-w-sm mx-auto w-full text-center"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', bounce: 0.5 }}
                            className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6"
                        >
                            <Check className="w-10 h-10 text-primary" />
                        </motion.div>
                        <h2 className="text-3xl font-serif mb-2">You're in.</h2>
                        <p className="text-muted-foreground text-[15px] mb-8">Check your email to confirm your account, then sign in.</p>
                        <button
                            onClick={() => { setIsLogin(true); setStep(1); setStep(1); }}
                            className="w-full py-3.5 bg-primary text-white rounded-md font-medium"
                        >
                            Go to Sign In
                        </button>
                    </motion.div>
                )}

            </AnimatePresence>
        </div>
    );
}
