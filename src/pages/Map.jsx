import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import L from 'leaflet';

// Helper component to center map on search
function MapUpdater({ center }) {
    const map = useMap();
    useEffect(() => {
        if (center) map.flyTo(center, 13);
    }, [center, map]);
    return null;
}

// Custom SVG pin icon factory
function createPin(color = '#526B53') {
    const svgString = `
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="38" viewBox="0 0 28 38">
            <defs>
                <filter id="shadow" x="-40%" y="-20%" width="180%" height="160%">
                    <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="rgba(0,0,0,0.18)"/>
                </filter>
            </defs>
            <path d="M14 0C6.268 0 0 6.268 0 14c0 9.625 14 24 14 24S28 23.625 28 14C28 6.268 21.732 0 14 0z" 
                  fill="${color}" filter="url(#shadow)" />
            <circle cx="14" cy="13" r="5.5" fill="white" opacity="0.92"/>
        </svg>
    `;
    return L.divIcon({
        html: svgString,
        className: '',
        iconSize: [28, 38],
        iconAnchor: [14, 38],
        popupAnchor: [0, -38],
    });
}

const PIN_COLORS = {
    'thrift': '#526B53',
    'vintage': '#8B7355',
    'donation-center': '#8B3A3A',
    default: '#526B53',
};

export default function MapPage() {
    const [query, setQuery] = useState('');
    const [stores, setStores] = useState([]);
    const [filteredStores, setFilteredStores] = useState([]);
    const [center, setCenter] = useState([40.4406, -79.9959]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStores();
    }, []);

    const fetchStores = async () => {
        setLoading(true);
        const { data, error } = await supabase.from('thrift_stores').select('*');
        if (!error && data) {
            setStores(data);
            setFilteredStores(data);
            if (data.length > 0) setCenter([data[0].lat, data[0].lng]);
        }
        setLoading(false);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        const lq = query.toLowerCase();
        const filtered = stores.filter(s =>
            s.name.toLowerCase().includes(lq) ||
            s.type.toLowerCase().includes(lq) ||
            s.address.toLowerCase().includes(lq)
        );
        setFilteredStores(filtered);
        if (filtered.length > 0) setCenter([filtered[0].lat, filtered[0].lng]);
    };

    return (
        <div className="flex flex-col h-full bg-background relative font-sans">
            {/* Header */}
            <div className="pt-14 px-6 pb-5 bg-white sticky top-0 z-[1000] border-b border-border">
                <h1 className="text-3xl font-serif text-foreground mb-4 tracking-tight">Nearby Thrift Stores</h1>

                <form onSubmit={handleSearch} className="relative flex items-center">
                    <Search className="absolute left-4 w-4 h-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search by store name, type..."
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        className="w-full bg-accent border border-border rounded-md pl-11 pr-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all text-[14px]"
                    />
                </form>
            </div>

            {/* Map */}
            <div className="flex-1 w-full bg-accent relative z-0">
                <MapContainer center={center} zoom={13} scrollWheelZoom={false} className="w-full h-full">
                    <MapUpdater center={center} />
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                    />

                    {!loading && filteredStores.map(store => {
                        const pinColor = PIN_COLORS[store.type] || PIN_COLORS.default;
                        return (
                            <Marker key={store.id} position={[store.lat, store.lng]} icon={createPin(pinColor)}>
                                <Popup className="rewear-popup">
                                    <div style={{ fontFamily: 'Outfit, sans-serif', minWidth: '180px' }}>
                                        <p style={{ fontFamily: 'TiemposText, Georgia, serif', fontWeight: '600', fontSize: '15px', lineHeight: '1.3', marginBottom: '4px', color: '#1D231E' }}>
                                            {store.name}
                                        </p>
                                        <p style={{ fontSize: '12px', color: '#6B7C6E', marginBottom: '10px', lineHeight: '1.4' }}>
                                            {store.address}
                                        </p>
                                        <div>
                                            <span style={{
                                                fontSize: '10px',
                                                fontWeight: '600',
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.1em',
                                                color: pinColor,
                                                padding: '3px 8px',
                                                border: `1px solid ${pinColor}40`,
                                                borderRadius: '4px',
                                                background: `${pinColor}10`,
                                            }}>
                                                {store.type === 'donation-center' ? 'Donation' : store.type}
                                            </span>
                                        </div>
                                    </div>
                                </Popup>
                            </Marker>
                        );
                    })}
                </MapContainer>
            </div>
        </div>
    );
}
