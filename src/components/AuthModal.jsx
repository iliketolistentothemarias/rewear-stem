import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';

export default function AuthModal({ onClose }) {
    const navigate = useNavigate();

    const handleLogin = (provider) => {
        // Mock login
        console.log(`Logging in with ${provider}`);
        navigate('/home');
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        >
            <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl relative"
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200"
                >
                    <X size={20} />
                </button>

                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-eco-text">Join ReWear</h2>
                    <p className="text-gray-500">Sign up to start your eco-journey.</p>
                </div>

                <div className="space-y-4">
                    <button
                        onClick={() => handleLogin('Apple')}
                        className="w-full py-3.5 bg-black text-white font-semibold rounded-xl flex items-center justify-center space-x-2"
                    >
                        <span>Continue with Apple</span>
                    </button>

                    <button
                        onClick={() => handleLogin('Google')}
                        className="w-full py-3.5 bg-white border border-gray-300 text-gray-700 font-semibold rounded-xl flex items-center justify-center space-x-2 hover:bg-gray-50"
                    >
                        <span>Continue with Google</span>
                    </button>

                    <button
                        onClick={() => handleLogin('Email')}
                        className="w-full py-3.5 bg-eco-green text-white font-semibold rounded-xl hover:bg-eco-dark transition-colors"
                    >
                        Sign up with Email
                    </button>
                </div>

                <div className="mt-6 text-center text-xs text-gray-400">
                    By signing up, you agree to our <span className="underline">Terms of Service</span> and <span className="underline">Privacy Policy</span>.
                </div>
            </motion.div>
        </motion.div>
    );
}
