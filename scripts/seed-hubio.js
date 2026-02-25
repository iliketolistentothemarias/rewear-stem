// Extracting hubIO local resources to seed as Donation Centers in ReWear

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
    'Prefer': 'return=minimal'
};

const hubIOStores = [
    { name: "Pittsburgh Refugee and Immigrant Services", address: "327 S. Main Street, Pittsburgh, PA", lat: 40.4200, lng: -80.0400, type: "donation-center" },
    { name: "Pittsburgh Veterans Affairs", address: "University Drive C, Pittsburgh, PA", lat: 40.4500, lng: -79.9600, type: "donation-center" },
    { name: "Pittsburgh YMCA", address: "Multiple Locations, Pittsburgh, PA", lat: 40.4406, lng: -79.9961, type: "donation-center" },
    { name: "Pittsburgh Community Services", address: "200 Ross Street, Pittsburgh, PA", lat: 40.4406, lng: -79.9800, type: "donation-center" },
    { name: "Pittsburgh Cares", address: "200 Ross Street, Pittsburgh, PA", lat: 40.4406, lng: -79.9800, type: "donation-center" },
    { name: "Allegheny County Dept of Human Services", address: "1 Smithfield Street, Pittsburgh, PA", lat: 40.4406, lng: -79.9961, type: "donation-center" }
];

async function seedHubIO() {
    console.log('🌱 Adding hubIO integration locations to the Map...');

    try {
        const storeRes = await fetch(`${supabaseUrl}/rest/v1/thrift_stores`, {
            method: 'POST',
            headers,
            body: JSON.stringify(hubIOStores)
        });
        if (!storeRes.ok) throw new Error(await storeRes.text());

        console.log('✅ hubIO local map integrations added successfully!');
    } catch (e) {
        console.error('Seeding failed:', e.message);
        process.exit(1);
    }
}

seedHubIO();
