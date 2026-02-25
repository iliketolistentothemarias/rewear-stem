import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Edit, UserPlus, Flag, Trash2, MapPin } from 'lucide-react';

export default function Chat() {
    const [chats, setChats] = useState([
        { id: 1, name: "Sarah J.", msg: "Is the oversized tee still available?", time: "2m ago" },
        { id: 2, name: "Local Thrift Co.", msg: "Thanks for your donation today!", time: "1h ago" },
        { id: 3, name: "Marcus", msg: "I can meet at 5pm by the station.", time: "Yesterday" }
    ]);
    const [query, setQuery] = useState('');

    const suggested = [
        { name: "EcoVintage", dist: "0.8 miles" },
        { name: "Alex R.", dist: "1.2 miles" },
        { name: "Thrift Haven", dist: "2.5 miles" }
    ];

    const removeChat = (id) => {
        setChats(chats.filter(c => c.id !== id));
    };

    return (
        <div className="flex flex-col h-full bg-background animate-fade-in relative font-sans overflow-hidden">

            {/* Header Container */}
            <div className="pt-14 px-6 pb-4 bg-white sticky top-0 z-20 shadow-sm border-b border-border">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-lg border border-primary/30 shadow-sm">
                            U
                        </div>
                        <h1 className="text-3xl font-serif text-foreground">Messages</h1>
                    </div>
                    <button className="p-2 rounded-full bg-accent text-foreground hover:bg-border transition-colors">
                        <Edit className="w-5 h-5" />
                    </button>
                </div>

                {/* Global Search */}
                <div className="relative flex items-center">
                    <Search className="absolute left-4 w-5 h-5 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search messages..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full bg-accent border border-border rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all placeholder:text-muted-foreground text-[15px]"
                    />
                </div>
            </div>

            {/* Main Chat List */}
            <div className="flex-1 overflow-y-auto px-6 pt-4 pb-32">
                <div className="space-y-4">
                    <AnimatePresence>
                        {chats.filter(c => c.name.toLowerCase().includes(query.toLowerCase())).map(chat => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                                key={chat.id}
                                className="relative bg-accent rounded-2xl overflow-hidden shadow-sm border border-border"
                            >
                                {/* Background Action Buttons */}
                                <div className="absolute inset-y-0 left-0 w-1/4 bg-red-100 flex items-center justify-start pl-4 cursor-pointer" onClick={() => removeChat(chat.id)}>
                                    <button className="text-red-600 flex flex-col items-center"><Trash2 size={20} /><span className="text-[10px] uppercase font-bold mt-1">Clear</span></button>
                                </div>
                                <div className="absolute inset-y-0 right-0 w-1/4 bg-orange-100 flex items-center justify-end pr-4 cursor-pointer" onClick={() => removeChat(chat.id)}>
                                    <button className="text-orange-600 flex flex-col items-center"><Flag size={20} /><span className="text-[10px] uppercase font-bold mt-1">Report</span></button>
                                </div>

                                {/* Foreground Draggable Item */}
                                <motion.div
                                    drag="x"
                                    dragConstraints={{ left: 0, right: 0 }}
                                    onDragEnd={(event, info) => {
                                        if (info.offset.x > 50 || info.offset.x < -50) {
                                            removeChat(chat.id);
                                        }
                                    }}
                                    className="relative bg-white p-4 rounded-2xl border-b border-border flex items-center space-x-4 cursor-grab active:cursor-grabbing"
                                >
                                    <div className="w-12 h-12 rounded-full bg-accent border border-border flex-shrink-0 flex items-center justify-center text-muted-foreground font-semibold text-lg">
                                        {chat.name[0]}
                                    </div>
                                    <div className="flex-1 overflow-hidden">
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h3 className="font-semibold text-foreground text-[16px]">{chat.name}</h3>
                                            <span className="text-xs text-muted-foreground font-medium">{chat.time}</span>
                                        </div>
                                        <p className="text-sm text-muted-foreground truncate">{chat.msg}</p>
                                    </div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    {chats.length === 0 && (
                        <div className="text-center text-muted-foreground py-8 animate-fade-in">
                            No active conversations. Start one nearby!
                        </div>
                    )}
                </div>

                {/* Suggested Nearby */}
                <div className="mt-12">
                    <h2 className="text-lg font-serif text-foreground mb-4">Suggested Nearby</h2>
                    <div className="flex space-x-4 overflow-x-auto pb-4 -mx-6 px-6 no-scrollbar">
                        {suggested.map((s, i) => (
                            <div key={i} className="flex-shrink-0 w-40 bg-white border border-border p-4 rounded-2xl shadow-sm text-center">
                                <div className="w-14 h-14 mx-auto bg-accent rounded-full border border-border/70 mb-3 flex items-center justify-center">
                                    <UserPlus className="w-6 h-6 text-primary/70" />
                                </div>
                                <h4 className="font-medium text-[15px] truncate text-foreground">{s.name}</h4>
                                <p className="text-xs text-muted-foreground flex items-center justify-center mt-1">
                                    <MapPin className="w-3 h-3 mr-1" /> {s.dist}
                                </p>
                                <button className="w-full mt-3 py-2 border border-primary/20 hover:bg-primary/10 text-primary font-semibold text-[13px] rounded-lg transition-colors active:scale-95">Say Hi</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
