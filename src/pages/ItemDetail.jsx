import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { ArrowLeft, MapPin, Tag, MessageCircle, Heart, CheckCircle2, DollarSign, User, Award, ShoppingBag } from 'lucide-react';

export default function ItemDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [item, setItem] = useState(null);
    const [seller, setSeller] = useState(null);
    const [loading, setLoading] = useState(true);

    // Purchase State
    const [isProcessing, setIsProcessing] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        fetchItemDetails();
    }, [id]);

    const fetchItemDetails = async () => {
        setLoading(true);
        // Fetch Item
        const { data: itemData, error: itemError } = await supabase
            .from('items')
            .select('*')
            .eq('id', id)
            .single();

        if (itemData) {
            setItem(itemData);
            // Fetch Seller if seller_id exists
            if (itemData.seller_id) {
                const { data: sellerData } = await supabase
                    .from('users')
                    .select('*')
                    .eq('id', itemData.seller_id)
                    .single();
                if (sellerData) setSeller(sellerData);
            }
        } else {
            console.error('Item fetch error:', itemError);
        }
        setLoading(false);
    };

    const handleBuy = () => {
        setIsProcessing(true);
        // Simulate network request for payment
        setTimeout(() => {
            setIsProcessing(false);
            setShowSuccess(true);
        }, 1500);
    };

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-background">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!item) {
        return (
            <div className="flex flex-col h-screen items-center justify-center bg-background p-6 text-center">
                <h2 className="text-2xl font-serif mb-2">Item Not Found</h2>
                <button onClick={() => navigate('/home')} className="text-primary font-medium">Return Home</button>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-background relative font-sans w-full">


            {/* Header / Nav */}
            <div className="absolute top-0 w-full z-10 flex justify-between items-center p-6 pt-14 bg-gradient-to-b from-black/50 to-transparent">
                <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white active:scale-95 transition-transform">
                    <ArrowLeft size={20} />
                </button>
                <div className="flex space-x-3">
                    <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white active:scale-95 transition-transform">
                        <Heart size={20} />
                    </button>
                </div>
            </div>

            {/* Hero Image */}
            <div className="w-full h-[55vh] bg-accent relative">
                {item.image_url ? (
                    <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-primary/30">
                        <Tag size={64} />
                    </div>
                )}
            </div>

            {/* Details Sheet */}
            <div className="flex-1 bg-white rounded-t-2xl -mt-8 relative z-20 px-6 pt-8 pb-32 shadow-[0_-4px_20px_rgba(0,0,0,0.03)] border-t border-border/50">
                <div className="flex justify-between items-start mb-2">
                    <h1 className="text-2xl font-serif text-foreground leading-tight max-w-[70%]">{item.title}</h1>
                    <span className="text-2xl font-bold text-primary">{item.price}</span>
                </div>

                <div className="flex items-center space-x-4 mb-6">
                    <span className="px-3 py-1 bg-accent text-primary rounded-full text-xs font-bold uppercase tracking-wider">{item.type}</span>
                    {item.condition && (
                        <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-bold uppercase tracking-wider">{item.condition}</span>
                    )}
                </div>

                <p className="text-foreground/80 leading-relaxed mb-8">{item.description}</p>

                {/* Seller Profile Block */}
                <h3 className="font-serif text-xl mb-4">About the Seller</h3>
                <div className="bg-background rounded-md p-4 border border-border flex items-center justify-between mb-8 cursor-pointer hover:border-primary/30 hover:shadow-sm transition-all" onClick={() => navigate('/profile')}>
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-accent rounded-full border border-border/50 overflow-hidden flex items-center justify-center">
                            {seller && seller.avatar_url ? (
                                <img src={seller.avatar_url} alt={seller.full_name || seller.username} className="w-full h-full object-cover" />
                            ) : (
                                <User className="text-primary/50" />
                            )}
                        </div>
                        <div>
                            <p className="font-semibold text-foreground">{seller ? (seller.full_name || seller.username) : "Local Eco-Warrior"}</p>
                            <p className="text-xs text-muted-foreground flex items-center mt-0.5">
                                <Award className="w-3 h-3 mr-1 text-primary" /> {seller ? seller.points : 120} Eco Points
                            </p>
                        </div>
                    </div>
                    <button className="w-10 h-10 rounded-full bg-white border border-border flex items-center justify-center text-primary shadow-sm">
                        <MessageCircle size={18} />
                    </button>
                </div>

                {/* Location Info */}
                <div className="flex items-center space-x-3 text-muted-foreground mb-12">
                    <MapPin size={18} />
                    <span className="text-sm font-medium">{item.store_name || "Pittsburgh Area"}</span>
                </div>
            </div>

            {/* Single Buy Action Bar */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border p-4 pb-safe z-30">
                <button
                    onClick={handleBuy}
                    disabled={isProcessing || showSuccess}
                    className="w-full py-4 bg-primary text-white font-bold rounded-xl shadow-md hover:shadow-lg active:scale-95 transition-all text-lg flex items-center justify-center disabled:opacity-80 disabled:active:scale-100"
                >
                    {isProcessing ? (
                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : showSuccess ? (
                        <span className="flex items-center"><CheckCircle2 className="mr-2" /> Secured!</span>
                    ) : (
                        item.price.toLowerCase() === 'donation' ? 'Claim Now' : `Buy Now for ${item.price}`
                    )}
                </button>
            </div>

            {/* Quirky Success Animation Overlay */}
            <AnimatePresence>
                {showSuccess && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 backdrop-blur-sm p-6"
                    >
                        <motion.div
                            initial={{ scale: 0.95, y: 20, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            transition={{ type: "spring", bounce: 0.4, duration: 0.6 }}
                            className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl border border-border text-center relative overflow-hidden"
                        >
                            {/* Decorative background elements */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                className="absolute -top-20 -right-20 w-40 h-40 bg-accent rounded-full opacity-50"
                            />

                            <motion.div
                                initial={{ y: -50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3, type: "spring" }}
                                className="w-24 h-24 bg-primary/20 text-primary rounded-3xl mx-auto mb-6 flex items-center justify-center rotate-12 relative z-10"
                            >
                                <ShoppingBag size={48} className="text-primary" />
                            </motion.div>

                            <h2 className="text-3xl font-serif font-bold text-foreground mb-2 relative z-10">It's Yours!</h2>
                            <p className="text-muted-foreground mb-8 relative z-10 leading-relaxed">You just snagged <span className="font-semibold text-foreground">{item.title}</span>. The seller has been notified and we captured the payment.</p>

                            <button
                                onClick={() => navigate('/home')}
                                className="w-full py-4 bg-accent text-primary font-bold rounded-xl active:scale-95 transition-transform hover:bg-accent/80 relative z-10"
                            >
                                Keep Browsing
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
}
