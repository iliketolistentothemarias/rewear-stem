import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, PlayCircle } from 'lucide-react';

export default function Repurpose() {
    const [query, setQuery] = useState('');

    // Sample data inspired by the prompt
    const ideas = [
        { title: "T-Shirt Tote Bag", desc: "Cut off the sleeves and neckline, then tie the bottom into a knot or sew it shut to create a simple, no-sew tote bag." },
        { title: "T-Shirt Pillowcase", desc: "Turn a t-shirt into a pillowcase by cutting off the sides and sewing or tying it together." },
        { title: "T-Shirt Headbands", desc: "Cut strips of fabric and braid them together to make a stretchy, boho-style headband." },
        { title: "Denim Planter", desc: "Use old jeans to create a rustic fabric planter for your indoor plants." },
    ];

    const filtered = ideas.filter(i => i.title.toLowerCase().includes(query.toLowerCase()) || i.desc.toLowerCase().includes(query.toLowerCase()));

    return (
        <div className="flex flex-col min-h-full bg-background animate-fade-in relative pb-10">

            {/* Header */}
            <div className="pt-14 px-6 pb-6 bg-white sticky top-0 z-20 border-b border-border shadow-sm">
                <h1 className="text-3xl font-serif text-foreground mb-4">Repurpose Ideas</h1>
                <div className="relative relative flex items-center">
                    <Search className="absolute left-4 w-5 h-5 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search for an item, e.g. T-shirt..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full bg-accent border border-border rounded-xl pl-12 pr-4 py-3.5 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all placeholder:text-muted-foreground text-[15px]"
                    />
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 px-6 pt-6 space-y-5">
                <AnimatePresence>
                    {filtered.map((idea, idx) => (
                        <motion.div
                            layout
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            key={idea.title}
                            className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden group cursor-pointer"
                        >
                            <div className="h-40 bg-accent relative flex items-center justify-center border-b border-border/50">
                                <PlayCircle className="w-12 h-12 text-muted-foreground/30 group-hover:text-primary transition-colors" />
                            </div>
                            <div className="p-5">
                                <h3 className="font-serif text-xl mb-2 text-foreground">{idea.title}</h3>
                                <p className="text-muted-foreground text-[15px] leading-relaxed line-clamp-2">{idea.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                    {filtered.length === 0 && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-10 text-muted-foreground">
                            No ideas found for "{query}". Time to post one!
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Floating Action Button */}
            <button className="fixed bottom-28 right-6 w-14 h-14 bg-primary text-white rounded-full shadow-lg flex items-center justify-center active:scale-95 transition-transform z-30">
                <Plus className="w-6 h-6" />
            </button>

        </div>
    );
}
