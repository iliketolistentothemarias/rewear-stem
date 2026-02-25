import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Settings, Award, Package, Leaf, ShieldCheck, Trash2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../lib/AuthContext';

// Mock recent purchases (in a real app you'd query a purchases/orders table)
const MOCK_PURCHASES = [
    { id: 'p1', title: 'Vintage Levi\'s 501', price: '$32.00', image_url: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=300' },
    { id: 'p2', title: 'Cashmere Turtleneck', price: '$45.00', image_url: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&q=80&w=300' },
    { id: 'p3', title: 'Silk Midi Skirt', price: '$28.00', image_url: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&q=80&w=300' },
];

export default function Profile() {
    const navigate = useNavigate();
    const { user, signOut } = useAuth();
    const [userItems, setUserItems] = useState([]);
    const [loading, setLoading] = useState(true);

    // Derive the display user from auth or fall back to a demo
    const displayUser = {
        username: user?.email?.split('@')[0] || 'eco_warrior',
        points: 250,
        memberSince: user ? new Date(user.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Oct 2025',
    };

    useEffect(() => {
        fetchUserItems();
    }, [user]);

    const fetchUserItems = async () => {
        setLoading(true);
        let query = supabase.from('items').select('*');
        // If authenticated, filter by their seller_id; otherwise show 3 demo items
        if (user?.id) {
            query = query.eq('seller_id', user.id);
        } else {
            query = query.limit(3);
        }
        const { data } = await query;
        if (data) setUserItems(data);
        setLoading(false);
    };

    const handleRemoveListing = async (itemId) => {
        // Optimistic UI update first
        setUserItems(prev => prev.filter(i => i.id !== itemId));
        const { error } = await supabase.from('items').delete().eq('id', itemId);
        if (error) {
            console.error('Delete failed:', error);
            // Revert on failure
            fetchUserItems();
        }
    };

    const handleSignOut = async () => {
        await signOut();
        navigate('/auth');
    };

    return (
        <div className="flex flex-col min-h-full bg-background relative font-sans">
            {/* Header */}
            <div className="pt-14 px-6 pb-4 bg-white sticky top-0 z-[100] flex justify-between items-center border-b border-border">
                <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full bg-accent flex items-center justify-center active:scale-95 transition-transform">
                    <ArrowLeft size={18} />
                </button>
                <div className="font-serif text-xl text-foreground">Profile</div>
                <button onClick={handleSignOut} className="w-9 h-9 rounded-full bg-accent flex items-center justify-center active:scale-95 transition-transform" title="Sign out">
                    <Settings size={18} className="text-muted-foreground" />
                </button>
            </div>

            {/* Content */}
            <div className="flex-1 px-5 pt-6 pb-32">

                {/* User Info Card */}
                <div className="bg-white rounded-xl p-6 border border-border mb-6 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-accent to-transparent" />
                    <div className="relative z-10">
                        <div className="w-20 h-20 mx-auto bg-accent rounded-full border-2 border-border overflow-hidden mb-4 mt-2 flex items-center justify-center">
                            <span className="text-3xl font-serif text-primary">{displayUser.username[0].toUpperCase()}</span>
                        </div>
                        <h2 className="text-2xl font-serif text-foreground mb-1">@{displayUser.username}</h2>
                        <p className="text-sm text-muted-foreground flex items-center justify-center mb-4">
                            <ShieldCheck className="w-3.5 h-3.5 mr-1 text-primary" /> Member since {displayUser.memberSince}
                        </p>
                        <div className="inline-flex items-center border border-border bg-accent/60 text-primary px-3 py-1.5 rounded-md text-sm font-medium">
                            <Leaf className="w-3.5 h-3.5 mr-1.5" />
                            {displayUser.points} Eco Points
                        </div>
                    </div>
                </div>

                {/* Impact Journey */}
                <h3 className="font-serif text-xl mb-3 text-foreground tracking-tight">Impact Journey</h3>
                <div className="bg-white rounded-xl border border-border p-5 mb-6 relative overflow-hidden">
                    <svg className="absolute top-0 right-0 w-full h-full text-primary/5 pointer-events-none" viewBox="0 0 100 200" preserveAspectRatio="none">
                        <path d="M 20,0 C 80,50 80,100 50,150 C 20,200 80,250 80,300" stroke="currentColor" strokeWidth="6" fill="none" strokeDasharray="8 8" />
                    </svg>
                    <div className="space-y-5 relative z-10">
                        {[
                            { label: 'Seedling', pts: '0', reached: true },
                            { label: 'Sprout', pts: '250', reached: true, current: true },
                            { label: 'Blooming Tree', pts: '300', reached: false },
                        ].map((milestone, idx) => (
                            <motion.div
                                key={milestone.label}
                                initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1, type: 'spring', bounce: 0.4 }}
                                className={`flex items-center ${idx % 2 !== 0 ? 'flex-row-reverse' : ''} space-x-3 ${idx % 2 !== 0 ? 'space-x-reverse' : ''}`}
                            >
                                <div className={`w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 border-2 ${milestone.current
                                    ? 'bg-primary border-primary text-white shadow-md'
                                    : milestone.reached
                                        ? 'bg-primary/80 border-primary/60 text-white'
                                        : 'bg-white border-dashed border-border text-muted-foreground'
                                    }`}>
                                    {milestone.reached ? <Leaf size={16} /> : <Award size={16} />}
                                </div>
                                <div className={idx % 2 !== 0 ? 'text-right' : ''}>
                                    <p className={`font-medium text-[14px] ${milestone.current ? 'text-primary' : milestone.reached ? 'text-foreground' : 'text-muted-foreground'}`}>
                                        {milestone.label}
                                    </p>
                                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                                        {milestone.pts} pts {milestone.current ? '• Current' : ''} {!milestone.reached ? `• ${300 - displayUser.points} pts away` : ''}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="bg-white p-4 rounded-xl border border-border">
                        <div className="w-8 h-8 rounded-md bg-blue-50 text-blue-500 flex items-center justify-center mb-2">
                            <Package size={16} />
                        </div>
                        <p className="text-2xl font-serif text-foreground">{userItems.length}</p>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mt-0.5">Items Listed</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-border">
                        <div className="w-8 h-8 rounded-md bg-green-50 text-green-600 flex items-center justify-center mb-2">
                            <Leaf size={16} />
                        </div>
                        <p className="text-2xl font-serif text-foreground">45kg</p>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mt-0.5">CO2 Saved</p>
                    </div>
                </div>

                {/* Recent Purchases */}
                <h3 className="font-serif text-xl mb-3 text-foreground tracking-tight">Recent Purchases</h3>
                <div className="flex space-x-3 overflow-x-auto pb-3 mb-7 scrollbar-none -mx-5 px-5">
                    {MOCK_PURCHASES.map((p, i) => (
                        <motion.div
                            key={p.id}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.08 }}
                            className="flex-shrink-0 w-28 cursor-pointer"
                            onClick={() => navigate('/home')}
                        >
                            <div className="w-28 h-36 rounded-md overflow-hidden border border-border bg-accent mb-2">
                                <img src={p.image_url} alt={p.title} className="w-full h-full object-cover" />
                            </div>
                            <p className="font-serif text-[12px] text-foreground leading-tight line-clamp-2">{p.title}</p>
                            <p className="text-[11px] text-muted-foreground mt-0.5">{p.price}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Your Listings */}
                <h3 className="font-serif text-xl mb-3 text-foreground tracking-tight">Your Listings</h3>
                {loading ? (
                    <div className="flex justify-center py-8">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                    </div>
                ) : userItems.length === 0 ? (
                    <div className="text-center py-10 border border-dashed border-border rounded-xl text-muted-foreground">
                        <p className="font-serif text-lg">No listings yet</p>
                        <p className="text-sm mt-1">Use the + button to list something</p>
                    </div>
                ) : (
                    <div className="space-y-2">
                        <AnimatePresence>
                            {userItems.map((item, i) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, x: -20, height: 0 }}
                                    transition={{ delay: i * 0.06 }}
                                    className="bg-white rounded-md border border-border flex items-center overflow-hidden hover:border-primary/30 hover:shadow-sm transition-all"
                                >
                                    <div
                                        className="w-16 h-16 flex-shrink-0 bg-accent overflow-hidden cursor-pointer"
                                        onClick={() => navigate(`/item/${item.id}`)}
                                    >
                                        {item.image_url
                                            ? <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
                                            : <div className="w-full h-full flex items-center justify-center text-primary/20"><Package size={18} /></div>
                                        }
                                    </div>
                                    <div
                                        className="flex-1 min-w-0 px-3 py-2 cursor-pointer"
                                        onClick={() => navigate(`/item/${item.id}`)}
                                    >
                                        <h4 className="font-serif text-[14px] text-foreground leading-tight truncate">{item.title}</h4>
                                        <p className="text-[11px] text-primary mt-0.5">{item.price}</p>
                                    </div>
                                    <div className="flex items-center pr-3 space-x-2">
                                        <span className="text-[9px] uppercase tracking-widest text-muted-foreground font-medium">{item.type}</span>
                                        <button
                                            onClick={() => handleRemoveListing(item.id)}
                                            className="w-7 h-7 rounded-md flex items-center justify-center text-muted-foreground hover:text-rose-500 hover:bg-rose-50 transition-colors"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </div>
    );
}
