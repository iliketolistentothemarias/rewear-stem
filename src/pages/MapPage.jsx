import React from 'react';
import { MapPin, Navigation } from 'lucide-react';
import { motion } from 'framer-motion';

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const item = {
    hidden: { opacity: 0, x: -10 },
    show: { opacity: 1, x: 0 }
};

const LocationItem = ({ name, type, distance, address }) => (
    <motion.div
        variants={item}
        whileTap={{ scale: 0.98 }}
        className="bg-white/60 backdrop-blur-md p-4 rounded-2xl shadow-sm border border-white/50 flex items-center justify-between cursor-pointer hover:bg-white/80 transition-colors"
    >
        <div className="flex items-start space-x-3">
            <div className="p-3 bg-eco-light/20 text-eco-green rounded-xl">
                <MapPin size={24} />
            </div>
            <div>
                <h3 className="font-bold text-gray-800">{name}</h3>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full tracking-wide">{type}</span>
                <p className="text-sm text-gray-500 mt-1">{address}</p>
            </div>
        </div>
        <div className="flex flex-col items-end space-y-2">
            <span className="text-sm font-black text-eco-green">{distance}</span>
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="p-2 bg-eco-dark text-white rounded-full hover:bg-black transition-colors shadow-lg">
                <Navigation size={18} />
            </motion.button>
        </div>
    </motion.div>
);

export default function MapPage() {
    return (
        <div className="h-full flex flex-col space-y-4 pb-20">
            <header className="mt-4 px-2">
                <h1 className="text-2xl font-black gradient-text">Nearby Eco-Spots</h1>
            </header>

            {/* Map Placeholder */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full h-72 bg-gray-200 rounded-[2rem] relative overflow-hidden flex items-center justify-center group shadow-inner border border-white/20"
            >
                <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/World_map_blank_without_borders.svg/2000px-World_map_blank_without_borders.svg.png')] bg-cover bg-center opacity-30 grayscale" />
                <div className="z-10 bg-white/80 backdrop-blur-md px-6 py-3 rounded-2xl shadow-lg font-bold text-gray-600 border border-white/50">
                    Interactive Map Loading...
                </div>
                {/* Fake Pins */}
                <div className="absolute top-1/4 left-1/3 text-eco-green animate-bounce">
                    <MapPin size={40} fill="currentColor" className="drop-shadow-lg" />
                </div>
                <div className="absolute bottom-1/3 right-1/4 text-eco-brown animate-pulse">
                    <MapPin size={40} fill="currentColor" className="drop-shadow-lg" />
                </div>
            </motion.div>

            {/* List */}
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="space-y-3 flex-1 overflow-y-auto px-1 custom-scrollbar"
            >
                <div className="flex justify-between items-center px-1">
                    <h2 className="text-lg font-bold text-gray-600">Locations</h2>
                    <span className="text-xs font-bold text-eco-green uppercase">View All</span>
                </div>
                <LocationItem name="The Green Closet" type="Thrift Store" distance="0.8 mi" address="123 Eco Lane" />
                <LocationItem name="Goodwill Drop-off" type="Donation Center" distance="1.2 mi" address="456 Charity Blvd" />
                <LocationItem name="Plato's Closet" type="Resale" distance="2.5 mi" address="789 Fashion Ave" />
            </motion.div>
        </div>
    );
}
