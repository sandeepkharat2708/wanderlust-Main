const sampleListings = [
  {
    id: "1",
    title: "Cozy Beach House",
    description: "A beautiful cabin with scenic views of the mountains.",
    image: {
      url: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
      filename: "cabin_1",
    },
    price: 1200,
    location: "Manali",
    country: "India",
    category: "Cabin",
    rooms: {
      bedrooms: 2,
      bathrooms: 1,
    },
    capacity: {
      total: 4,
    },
  },
  {
    id: "2",
    title: "Mountain Retreat",
    description: "Stunning beachfront villa with private access to the shore.",
    image: {
      url: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2",
      filename: "beach_villa_1",
    },
    price: 3500,
    location: "Goa",
    country: "India",
    category: "Beach",
    rooms: {
      bedrooms: 4,
      bathrooms: 3,
    },
    capacity: {
      total: 8,
    },
  },
  {
    id: "3",
    title: "Modern City Apartment",
    description: "Sleek apartment in the heart of the city with skyline views.",
    image: {
      url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
      filename: "apartment_1",
    },
    price: 2000,
    location: "Mumbai",
    country: "India",
    category: "City",
    rooms: {
      bedrooms: 2,
      bathrooms: 2,
    },
    capacity: {
      total: 4,
    },
  },
  {
    id: "4",
    title: "Hillside Retreat",
    description: "Peaceful retreat with panoramic views of the valley.",
    image: {
      url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d",
      filename: "retreat_1",
    },
    price: 1800,
    location: "Shimla",
    country: "India",
    category: "Mountains",
    rooms: {
      bedrooms: 3,
      bathrooms: 2,
    },
    capacity: {
      total: 6,
    },
  },
  {
    id: "5",
    title: "Poolside Paradise",
    description: "Luxurious villa with a private infinity pool.",
    image: {
      url: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
      filename: "pool_villa_1",
    },
    price: 4000,
    location: "Udaipur",
    country: "India",
    category: "Pools",
    rooms: {
      bedrooms: 4,
      bathrooms: 4,
    },
    capacity: {
      total: 8,
    },
  },
  {
    id: "6",
    title: "Lakefront Lodge",
    description: "Serene lodge overlooking a pristine lake.",
    image: {
      url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
      filename: "lodge_1",
    },
    price: 2200,
    location: "Nainital",
    country: "India",
    category: "Lake",
    rooms: {
      bedrooms: 3,
      bathrooms: 2,
    },
    capacity: {
      total: 6,
    },
  },
  {
    id: "7",
    title: "Desert Oasis",
    description: "Luxury camp in the heart of the desert.",
    image: {
      url: "https://images.unsplash.com/photo-1518684079-3c830dcef090",
      filename: "desert_1",
    },
    price: 2800,
    location: "Jaisalmer",
    country: "India",
    category: "Camping",
    rooms: {
      bedrooms: 2,
      bathrooms: 1,
    },
    capacity: {
      total: 4,
    },
  },
  {
    id: "8",
    title: "Forest Treehouse",
    description: "Unique treehouse experience in a lush forest.",
    image: {
      url: "https://images.unsplash.com/photo-1488462237308-ecaa28b729d7",
      filename: "treehouse_1",
    },
    price: 1500,
    location: "Munnar",
    country: "India",
    category: "Unique",
    rooms: {
      bedrooms: 1,
      bathrooms: 1,
    },
    capacity: {
      total: 2,
    },
  },
  {
    id: "9",
    title: "Heritage Haveli",
    description: "Historic haveli converted into a luxury stay.",
    image: {
      url: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
      filename: "haveli_1",
    },
    price: 3200,
    location: "Jaipur",
    country: "India",
    category: "Historic",
    rooms: {
      bedrooms: 5,
      bathrooms: 4,
    },
    capacity: {
      total: 10,
    },
  },
  {
    id: "10",
    title: "Riverside Cottage",
    description: "Charming cottage next to a flowing river.",
    image: {
      url: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2",
      filename: "cottage_1",
    },
    price: 1600,
    location: "Rishikesh",
    country: "India",
    category: "Cottage",
    rooms: {
      bedrooms: 2,
      bathrooms: 2,
    },
    capacity: {
      total: 4,
    },
  },
  {
    id: "11",
    title: "Tea Estate Bungalow",
    description: "Colonial bungalow surrounded by tea plantations.",
    image: {
      url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d",
      filename: "bungalow_1",
    },
    price: 2500,
    location: "Darjeeling",
    country: "India",
    category: "Unique",
    rooms: {
      bedrooms: 3,
      bathrooms: 2,
    },
    capacity: {
      total: 6,
    },
  },
  {
    id: "12",
    title: "Beachfront Hut",
    description: "Simple but charming hut right on the beach.",
    image: {
      url: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2",
      filename: "hut_1",
    },
    price: 800,
    location: "Varkala",
    country: "India",
    category: "Beach",
    rooms: {
      bedrooms: 1,
      bathrooms: 1,
    },
    capacity: {
      total: 2,
    },
  },
];

module.exports = { sampleListings };
