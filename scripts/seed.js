// Use native fetch to seed since we can't install the supabase-js library due to EPERM.

const supabaseUrl = process.argv[2];
const supabaseKey = process.argv[3];

if (!supabaseUrl || !supabaseKey) {
    console.error('Please provide Supabase URL and Service Role Key as arguments.');
    process.exit(1);
}

const headers = {
    'apikey': supabaseKey,
    'Authorization': `Bearer ${supabaseKey}`,
    'Content-Type': 'application/json',
    'Prefer': 'return=representation' // Return the inserted rows so we get the UUIDs
};

const dummyUsers = [
    { username: "Emma Chamberlain", points: 250 },
    { username: "Aiden Smith", points: 120 },
    { username: "Sophia Lee", points: 450 }
];

const dummyStores = [
    { name: "Avalon Exchange", address: "5908 Forbes Ave, Pittsburgh, PA", lat: 40.4374, lng: -79.9221, type: "vintage" },
    { name: "Goodwill", address: "125 51st St, Pittsburgh, PA", lat: 40.4812, lng: -79.9575, type: "thrift" },
    { name: "Thriftique", address: "125 51st St, Pittsburgh, PA", lat: 40.4800, lng: -79.9560, type: "donation-center" },
];

async function seed() {
    console.log('🌱 Starting Supabase Seeding (Buyers/Sellers) via REST API...');

    try {
        console.log('Inserting Sellers...');
        const userRes = await fetch(`${supabaseUrl}/rest/v1/users`, {
            method: 'POST',
            headers,
            body: JSON.stringify(dummyUsers)
        });
        if (!userRes.ok) throw new Error(await userRes.text());
        const insertedUsers = await userRes.json();

        console.log(`Inserted ${insertedUsers.length} users.`);

        console.log('Inserting thrift stores...');
        const storeRes = await fetch(`${supabaseUrl}/rest/v1/thrift_stores`, {
            method: 'POST',
            headers,
            body: JSON.stringify(dummyStores)
        });
        if (!storeRes.ok) throw new Error(await storeRes.text());

        // Clean product-only photos (flatlay / e-commerce style, no models)
        const dummyItems = [
            {
                title: "Minimalist Beige Tee",
                description: "Premium cotton classic fit t-shirt in a neutral stone color. Very soft and versatile.",
                store_name: "Avalon Exchange",
                price: "$18.00",
                type: "buy",
                condition: "Like New",
                seller_id: insertedUsers[0].id,
                image_url: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&q=80&w=600",
                is_verified: true
            },
            {
                title: "Vintage Denim Jacket",
                description: "Light wash oversized denim jacket. Perfect for layering.",
                store_name: "Thriftique",
                price: "$45.00",
                type: "buy",
                condition: "Good",
                seller_id: insertedUsers[1].id,
                image_url: "https://images.unsplash.com/photo-1551537482-f2075a1d43de?auto=format&fit=crop&q=80&w=600",
                is_verified: true
            },
            {
                title: "Oversized Knit Sweater",
                description: "Chunky cream knit sweater. Sustainably sourced wool blend.",
                store_name: "Goodwill",
                price: "$30.00",
                type: "sell",
                condition: "Excellent",
                seller_id: insertedUsers[2].id,
                image_url: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&q=80&w=600",
                is_verified: false
            },
            {
                title: "Essential Black Hoodie",
                description: "Heavyweight cotton black hoodie. Relaxed fit.",
                store_name: "Avalon Exchange",
                price: "$28.00",
                type: "buy",
                condition: "Like New",
                seller_id: insertedUsers[0].id,
                image_url: "https://images.unsplash.com/photo-1620799139507-2a76f79a2f4d?auto=format&fit=crop&q=80&w=600",
                is_verified: true
            },
            {
                title: "Upcycled Denim Tote Bag",
                description: "Handmade tote from reclaimed denim. One of a kind.",
                store_name: "Thriftique",
                price: "$15.00",
                type: "repurpose",
                condition: "New",
                seller_id: insertedUsers[2].id,
                image_url: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=600",
                is_verified: true
            },
            {
                title: "Hollister Classic Hoodie",
                description: "Navy blue pullover hoodie. Very comfy, gently worn.",
                store_name: "Goodwill",
                price: "$25.00",
                type: "sell",
                condition: "Good",
                seller_id: insertedUsers[1].id,
                image_url: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=600",
                is_verified: false
            },
            {
                title: "Levi's 501 Original Jeans",
                description: "Classic straight leg fit, dark indigo wash. Timeless style.",
                store_name: "Avalon Exchange",
                price: "$40.00",
                type: "sell",
                condition: "Like New",
                seller_id: insertedUsers[0].id,
                image_url: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=600",
                is_verified: true
            },
            {
                title: "American Eagle Oversized Tee",
                description: "Soft cotton graphic tee. Perfect for casual days.",
                store_name: "Thriftique",
                price: "Donation",
                type: "donate",
                condition: "Good",
                seller_id: insertedUsers[2].id,
                image_url: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=600",
                is_verified: false
            },
            {
                title: "Nike Vintage Windbreaker",
                description: "90s-style windbreaker in forest green. Lightweight and packable.",
                store_name: "Goodwill",
                price: "$35.00",
                type: "sell",
                condition: "Excellent",
                seller_id: insertedUsers[1].id,
                image_url: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=600",
                is_verified: true
            }
        ];

        console.log('Inserting clothing items with linked Seller IDs...');
        const itemRes = await fetch(`${supabaseUrl}/rest/v1/items`, {
            method: 'POST',
            headers,
            body: JSON.stringify(dummyItems)
        });
        if (!itemRes.ok) throw new Error(await itemRes.text());

        console.log('✅ Seeding complete! Database is populated with Users, Stores, and Items.');
    } catch (e) {
        console.error('Seeding failed:', e.message);
        process.exit(1);
    }
}

seed();
