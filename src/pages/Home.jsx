import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, Award, Search, CheckCircle2, ShoppingBag } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function Home() {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [toastMsg, setToastMsg] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('items')
            .select('*')
            .order('created_at', { ascending: false });

        if (!error && data) {
            setItems(data);
        } else {
            console.error('Error fetching items:', error);
        }
        setLoading(false);
    };

    const handleBuy = (id, title) => {
        setItems(items.filter(item => item.id !== id));
        setToastMsg(`Claimed: ${title}! Check your messages to coordinate.`);
        setTimeout(() => setToastMsg(''), 3500);
    };

    const filteredItems = items.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.type.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const listings = filteredItems.filter(item => item.type !== 'buy');
    const requests = filteredItems.filter(item => item.type === 'buy');

    return (
        <div className="flex flex-col min-h-full bg-background relative font-sans">

            {/* Toast Notification */}
            <AnimatePresence>
                {toastMsg && (
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        className="fixed top-safe left-4 right-4 mt-4 z-[100] bg-primary text-white p-4 rounded-xl shadow-lg flex items-center space-x-3"
                    >
                        <CheckCircle2 size={24} />
                        <p className="font-medium text-[15px]">{toastMsg}</p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Header & Stats Section */}
            <div className="pt-14 pb-6 px-6 bg-accent rounded-b-xl shadow-sm relative z-10 border-b border-border/50">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-serif text-foreground tracking-tight">Marketplace</h1>
                    <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2 bg-white/70 backdrop-blur-md px-4 py-2 rounded-full border border-border text-primary font-semibold shadow-sm cursor-pointer hover:bg-white/90 transition-colors" onClick={() => navigate('/profile')}>
                            <Leaf className="w-5 h-5" />
                            <span>12 Points</span>
                        </div>
                        <button
                            onClick={() => navigate('/profile')}
                            className="w-10 h-10 rounded-full bg-accent border border-border overflow-hidden active:scale-95 transition-transform hover:shadow-sm"
                        >
                            <img src="https://i.pravatar.cc/150?u=emma" alt="Profile" className="w-full h-full object-cover" />
                        </button>
                    </div>
                </div>

                {/* Progress Bar Mock */}
                <div className="bg-white rounded-md p-5 shadow-sm border border-border mb-6">
                    <div className="flex justify-between items-center mb-3">
                        <div>
                            <p className="text-sm text-muted-foreground font-medium uppercase tracking-widest">Next Reward</p>
                            <p className="font-serif text-lg leading-tight mt-1 flex items-center">
                                Macy's <span className="inline-flex items-center justify-center w-5 h-5 ml-2 bg-accent text-primary rounded-full"><Award className="w-3 h-3" /></span>
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="font-semibold text-xl text-primary">12 / 20</p>
                            <p className="text-[11px] text-muted-foreground uppercase tracking-widest font-medium">Donations</p>
                        </div>
                    </div>

                    <div className="h-3 w-full bg-accent rounded-full overflow-hidden border border-border/50">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '60%' }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                            className="h-full bg-primary rounded-full relative"
                        >
                            <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                        </motion.div>
                    </div>
                </div>

                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search items..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white border border-border rounded-md pl-11 pr-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all text-foreground text-[14px]"
                    />
                </div>
            </div>

            {/* Marketplace Feed Section */}
            <div className="flex-1 px-4 pt-5 pb-32">
                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    </div>
                ) : (
                    <>
                        {/* Main Listings: sell, donate, repurpose */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
                            <AnimatePresence>
                                {listings.map((item, i) => (
                                    <motion.div
                                        layout
                                        key={item.id}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ delay: i * 0.03 }}
                                        onClick={() => navigate(`/item/${item.id}`)}
                                        className="group bg-white rounded-md overflow-hidden border border-border flex flex-col active:scale-[0.98] transition-all cursor-pointer hover:border-primary/25 hover:shadow-sm"
                                    >
                                        {/* Image */}
                                        <div className="aspect-[3/4] w-full bg-accent relative overflow-hidden">
                                            {item.image_url ? (
                                                <img src={item.image_url} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-primary/20">
                                                    <ShoppingBag size={20} />
                                                </div>
                                            )}
                                        </div>

                                        {/* Details */}
                                        <div className="p-2.5 flex flex-col justify-between flex-1 bg-white">
                                            <h3 className="font-serif text-[13px] text-foreground leading-tight line-clamp-1">{item.title}</h3>
                                            <div className="mt-1.5 flex items-center justify-between">
                                                <span className={`font-serif text-[14px] ${item.price.toLowerCase() === 'donation' ? 'text-primary' : 'text-foreground'}`}>
                                                    {item.price}
                                                </span>
                                                <span className="text-[9px] uppercase tracking-widest text-muted-foreground font-medium">
                                                    {item.type}
                                                </span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {listings.length === 0 && !searchQuery && (
                            <div className="text-center py-16 text-muted-foreground">
                                <ShoppingBag className="w-10 h-10 mx-auto mb-3 opacity-30" />
                                <p className="font-serif text-lg">No items yet</p>
                                <p className="text-sm mt-1 text-muted-foreground">Be the first to list something</p>
                            </div>
                        )}

                        {/* Item Requests Section (type=buy) */}
                        {requests.length > 0 && (
                            <div className="mt-10">
                                <div className="flex items-center space-x-3 mb-4">
                                    <div className="flex-1 h-px bg-border" />
                                    <span className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-semibold">Community Requests</span>
                                    <div className="flex-1 h-px bg-border" />
                                </div>
                                <div className="space-y-2">
                                    {requests.map((item, i) => (
                                        <motion.div
                                            key={item.id}
                                            initial={{ opacity: 0, y: 6 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.05 }}
                                            onClick={() => navigate(`/item/${item.id}`)}
                                            className="bg-white border border-dashed border-border rounded-md p-3.5 flex items-center justify-between cursor-pointer hover:border-primary/30 hover:shadow-sm transition-all active:scale-[0.99]"
                                        >
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-serif text-[14px] text-foreground leading-tight truncate">{item.title}</h4>
                                                <p className="text-[10px] uppercase tracking-widest text-muted-foreground mt-0.5">{item.store_name}</p>
                                            </div>
                                            <div className="ml-4 text-right flex-shrink-0">
                                                <span className="font-serif text-[14px] text-foreground">{item.price !== 'Donation' ? `up to ${item.price}` : 'Any price'}</span>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
