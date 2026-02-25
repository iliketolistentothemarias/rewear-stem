import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, UploadCloud, Tag, DollarSign, Leaf, Heart, Recycle, ShoppingBag, CheckCircle2, Play, Image } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../lib/AuthContext';

export default function UploadModal({ isOpen, onClose }) {
    const { user } = useAuth();
    const [step, setStep] = useState('menu');
    const [category, setCategory] = useState(null);
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [mediaFile, setMediaFile] = useState(null);
    const [mediaPreview, setMediaPreview] = useState(null);
    const [mediaType, setMediaType] = useState(null); // 'image' | 'video'
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef(null);

    const handleSelect = (cat) => {
        setCategory(cat);
        setStep('form');
    };

    const handleClose = () => {
        setStep('menu');
        setCategory(null);
        setTitle('');
        setPrice('');
        setDescription('');
        setMediaFile(null);
        setMediaPreview(null);
        setMediaType(null);
        onClose();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setMediaFile(file);
        const url = URL.createObjectURL(file);
        setMediaPreview(url);
        setMediaType(file.type.startsWith('video/') ? 'video' : 'image');
    };

    const uploadMedia = async () => {
        if (!mediaFile) return null;
        const ext = mediaFile.name.split('.').pop();
        const path = `items/${Date.now()}.${ext}`;
        const { error } = await supabase.storage
            .from('rewear-media')
            .upload(path, mediaFile, { contentType: mediaFile.type, upsert: false });
        if (error) { console.error('Upload error:', error); return null; }
        const { data } = supabase.storage.from('rewear-media').getPublicUrl(path);
        return data.publicUrl;
    };

    const handlePublish = async () => {
        if (!title) return;
        setUploading(true);
        try {
            let imageUrl = null;
            if (mediaFile) {
                imageUrl = await uploadMedia();
            }

            const { error } = await supabase.from('items').insert([{
                title,
                description: description || `A new ${category} listing from a ReWear user.`,
                type: category,
                price: price ? `$${parseFloat(price).toFixed(2)}` : 'Donation',
                store_name: user?.email?.split('@')[0] || 'ReWear User',
                is_verified: true,
                condition: 'Like New',
                seller_id: user?.id || null,
                image_url: imageUrl,
            }]);

            if (error) throw error;
            setStep('success');
            setTimeout(() => {
                handleClose();
                if (['/home', '/profile'].includes(window.location.pathname)) {
                    window.location.reload();
                }
            }, 2500);
        } catch (err) {
            console.error('Failed to publish:', err);
        } finally {
            setUploading(false);
        }
    };

    const categories = [
        { id: 'sell', label: 'List for Sale', icon: DollarSign, color: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200' },
        { id: 'donate', label: 'Donate Item', icon: Heart, color: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-200' },
        { id: 'repurpose', label: 'Share DIY', icon: Recycle, color: 'text-violet-600', bg: 'bg-violet-50', border: 'border-violet-200' },
        { id: 'buy', label: 'Request to Buy', icon: ShoppingBag, color: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-200' },
    ];

    const canPublish = title && (category === 'donate' || category === 'repurpose' || price);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="fixed inset-0 bg-foreground/40 backdrop-blur-sm z-[100]"
                    />

                    <motion.div
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                        className="fixed inset-x-0 bottom-0 z-[101] bg-white rounded-t-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden"
                    >
                        {/* Handle */}
                        <div className="w-full flex justify-center pt-3 pb-1 cursor-pointer flex-shrink-0" onClick={handleClose}>
                            <div className="w-10 h-1 bg-border rounded-full" />
                        </div>

                        <div className="px-6 pb-10 overflow-y-auto flex-1">

                            {/* STEP 1: Menu */}
                            {step === 'menu' && (
                                <div>
                                    <div className="flex justify-between items-center mb-6 pt-2">
                                        <h2 className="text-2xl font-serif text-foreground">What would you like to do?</h2>
                                        <button onClick={handleClose} className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                                            <X size={20} />
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        {categories.map((c) => (
                                            <button
                                                key={c.id}
                                                onClick={() => handleSelect(c.id)}
                                                className={`flex flex-col items-center justify-center p-5 rounded-md border ${c.border} ${c.bg} hover:shadow-sm transition-all active:scale-[0.97]`}
                                            >
                                                <c.icon size={22} className={`${c.color} mb-2.5`} strokeWidth={2} />
                                                <span className={`font-medium text-[13px] ${c.color}`}>{c.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* STEP 2: Form */}
                            {step === 'form' && (
                                <div>
                                    <div className="flex justify-between items-center mb-5 pt-2">
                                        <h2 className="text-2xl font-serif text-foreground capitalize">
                                            {category === 'buy' ? 'Post a Request' : category === 'repurpose' ? 'Share an Idea' : `List to ${category}`}
                                        </h2>
                                        <button onClick={() => setStep('menu')} className="text-sm text-muted-foreground font-medium px-3 py-1 border border-border rounded-md hover:bg-accent transition-colors">Back</button>
                                    </div>

                                    {/* Media upload (not for request type) */}
                                    {category !== 'buy' && (
                                        <>
                                            <input
                                                ref={fileInputRef}
                                                type="file"
                                                accept="image/*,video/*"
                                                className="hidden"
                                                onChange={handleFileChange}
                                            />
                                            {mediaPreview ? (
                                                <div className="relative mb-5 rounded-md overflow-hidden border border-border bg-black">
                                                    {mediaType === 'video' ? (
                                                        <video src={mediaPreview} controls className="w-full max-h-48 object-contain" />
                                                    ) : (
                                                        <img src={mediaPreview} alt="preview" className="w-full max-h-48 object-cover" />
                                                    )}
                                                    <button
                                                        onClick={() => { setMediaFile(null); setMediaPreview(null); setMediaType(null); }}
                                                        className="absolute top-2 right-2 w-7 h-7 bg-black/60 text-white rounded-full flex items-center justify-center"
                                                    >
                                                        <X size={14} />
                                                    </button>
                                                </div>
                                            ) : (
                                                <button
                                                    onClick={() => fileInputRef.current?.click()}
                                                    className="w-full border border-dashed border-border rounded-md p-6 flex flex-col items-center justify-center mb-5 hover:border-primary/50 hover:bg-accent/30 transition-colors cursor-pointer"
                                                >
                                                    <div className="flex space-x-3 mb-3 text-muted-foreground">
                                                        <Image size={20} />
                                                        <Play size={20} />
                                                    </div>
                                                    <p className="font-medium text-foreground text-sm">Tap to add photo or video</p>
                                                    <p className="text-xs text-muted-foreground mt-1">Supports JPG, PNG, MP4, MOV</p>
                                                </button>
                                            )}
                                        </>
                                    )}

                                    <div className="space-y-3 mb-6">
                                        <div>
                                            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5">
                                                {category === 'buy' ? 'What are you looking for?' : 'Title'}
                                            </label>
                                            <input
                                                type="text"
                                                placeholder={category === 'repurpose' ? 'e.g. Turn Levi\'s into a tote bag...' : category === 'buy' ? 'e.g. Vintage Levi\'s 501, size M' : 'e.g. Cashmere turtleneck, size S'}
                                                value={title}
                                                onChange={e => setTitle(e.target.value)}
                                                className="w-full bg-accent/50 border border-border rounded-md px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all text-foreground text-[15px]"
                                            />
                                        </div>

                                        {(category === 'sell' || category === 'buy') && (
                                            <div>
                                                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5">
                                                    {category === 'buy' ? 'Max Budget (optional)' : 'Price'}
                                                </label>
                                                <div className="relative">
                                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">$</span>
                                                    <input
                                                        type="number"
                                                        placeholder="0.00"
                                                        value={price}
                                                        onChange={e => setPrice(e.target.value)}
                                                        className="w-full bg-accent/50 border border-border rounded-md pl-8 pr-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all text-foreground text-[15px]"
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        <div>
                                            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5">Description (optional)</label>
                                            <textarea
                                                placeholder="Add more details..."
                                                value={description}
                                                onChange={e => setDescription(e.target.value)}
                                                rows={2}
                                                className="w-full bg-accent/50 border border-border rounded-md px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all text-foreground text-[15px] resize-none"
                                            />
                                        </div>
                                    </div>

                                    <button
                                        onClick={handlePublish}
                                        disabled={!canPublish || uploading}
                                        className={`w-full py-4 rounded-md font-semibold tracking-wide transition-all flex items-center justify-center space-x-2 ${canPublish && !uploading ? 'bg-primary text-white active:scale-[0.98] shadow-sm hover:bg-primary/90' : 'bg-muted text-muted-foreground'}`}
                                    >
                                        {uploading ? (
                                            <>
                                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                <span>Publishing...</span>
                                            </>
                                        ) : (
                                            <span>{category === 'buy' ? 'Post Request' : 'Publish Listing'}</span>
                                        )}
                                    </button>
                                </div>
                            )}

                            {/* STEP 3: Success */}
                            {step === 'success' && (
                                <div className="flex flex-col items-center justify-center py-12">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: 'spring', stiffness: 200, damping: 18 }}
                                        className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6"
                                    >
                                        <CheckCircle2 size={40} className="text-primary" />
                                    </motion.div>
                                    <h2 className="text-3xl font-serif text-foreground text-center mb-2">
                                        {category === 'buy' ? 'Request posted!' : category === 'repurpose' ? 'Idea shared!' : 'Item listed!'}
                                    </h2>
                                    <p className="text-muted-foreground text-center text-[15px]">Your community will see it shortly.</p>

                                    {(category === 'donate' || category === 'repurpose' || category === 'sell') && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.4 }}
                                            className="mt-8 bg-accent border border-border rounded-md p-4 text-center w-full"
                                        >
                                            <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-1">Eco Reward</p>
                                            <div className="flex items-center justify-center space-x-2">
                                                <Leaf className="w-5 h-5 text-primary" />
                                                <span className="text-2xl font-bold text-primary">
                                                    +{category === 'donate' ? '15' : category === 'repurpose' ? '10' : '5'}
                                                </span>
                                                <span className="text-lg text-foreground font-medium">pts</span>
                                            </div>
                                        </motion.div>
                                    )}
                                </div>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
