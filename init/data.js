// const sampleListings = [
//   {
//     "title": "Cozy Mountain Cabin",
//     "description": "A beautiful cabin with scenic views of the mountains.",
//     "image": {
//       "url": "https://res.cloudinary.com/dvqe3rsyv/image/upload/v1741648854/wanderlust_DEV/i8ftdysu4vqufcanwxyo.jpg",
//       "filename": "wanderlust_DEV/i8ftdysu4vqufcanwxyo"
//     },
//     "price": 1200,
//     "location": "Aspen, CO",
//     "country": "USA",
//     "reviews": ["65a12345e123456789abcd01", "65a67890e123456789abcd02"],
//     "owner": "65a98765e123456789abcd99",
//     "geometry": {
//       "type": "Point",
//       "coordinates": [-106.837, 39.1911]
//     }
//   },
//   {
//     "title": "Luxury Beachfront Villa",
//     "description": "A stunning villa with private beach access and modern amenities.",
//     "image": {
//       "url": "https://res.cloudinary.com/dvqe3rsyv/image/upload/v1741648925/wanderlust_DEV/j0eysdbfjyjvsecqze5o.jpg",
//       "filename": "wanderlust_DEV/j0eysdbfjyjvsecqze5o"
//     },
//     "price": 3500,
//     "location": "Malibu, CA",
//     "country": "USA",
//     "reviews": ["65a98765e123456789abcd03"],
//     "owner": "65a54321e123456789abcd98",
//     "geometry": {
//       "type": "Point",
//       "coordinates": [-118.7798, 34.0259]
//     }
//   },
//   {
//     "title": "Charming Paris Apartment",
//     "description": "A cozy apartment in the heart of Paris, close to the Eiffel Tower.",
//     "image": {
//       "url": "https://res.cloudinary.com/dvqe3rsyv/image/upload/v1741648983/wanderlust_DEV/wavhdxmuoqk5zavqvoul.jpg",
//       "filename": "wanderlust_DEV/wavhdxmuoqk5zavqvoul"
//     },
//     "price": 1800,
//     "location": "Paris",
//     "country": "France",
//     "reviews": ["65a11223e123456789abcd04", "65a33445e123456789abcd05"],
//     "owner": "65a22222e123456789abcd97",
//     "geometry": {
//       "type": "Point",
//       "coordinates": [2.3522, 48.8566]
//     }
//   },
//   {
//     "title": "Tokyo City Loft",
//     "description": "Modern loft with breathtaking city views, located in the heart of Tokyo.",
//     "image": {
//       "url": "https://res.cloudinary.com/dvqe3rsyv/image/upload/v1741649126/wanderlust_DEV/k5b6qo8hedw3qstcqkof.jpg",
//       "filename": "wanderlust_DEV/k5b6qo8hedw3qstcqkof"
//     },
//     "price": 2200,
//     "location": "Tokyo",
//     "country": "Japan",
//     "reviews": ["65a44567e123456789abcd06"],
//     "owner": "65a33333e123456789abcd96",
//     "geometry": {
//       "type": "Point",
//       "coordinates": [139.6917, 35.6895]
//     }
//   },
//   {
//     "title": "Rustic Italian Farmhouse",
//     "description": "A peaceful getaway in the Tuscan countryside with breathtaking views.",
//     "image": {
//       "url": "https://res.cloudinary.com/dvqe3rsyv/image/upload/v1741649166/wanderlust_DEV/kv6oxyntmcclnmjfdcey.jpg",
//       "filename": "wanderlust_DEV/kv6oxyntmcclnmjfdcey"
//     },
//     "price": 1400,
//     "location": "Tuscany",
//     "country": "Italy",
//     "reviews": ["65a55678e123456789abcd07"],
//     "owner": "65a44444e123456789abcd95",
//     "geometry": {
//       "type": "Point",
//       "coordinates": [11.2558, 43.7696]
//     }
//   },
//   {
//     "title": "Santorini Cliffside House",
//     "description": "White-washed house with an infinity pool overlooking the Aegean Sea.",
//     "image": {
//       "url": "https://res.cloudinary.com/dvqe3rsyv/image/upload/v1741649214/wanderlust_DEV/iblailr6zdglyfrh5bal.jpg",
//       "filename": "wanderlust_DEV/iblailr6zdglyfrh5bal"
//     },
//     "price": 3000,
//     "location": "Santorini",
//     "country": "Greece",
//     "reviews": ["65a66789e123456789abcd08"],
//     "owner": "65a55555e123456789abcd94",
//     "geometry": {
//       "type": "Point",
//       "coordinates": [25.4605, 36.3932]
//     }
//   },
//   {
//     "title": "Modern New York Penthouse",
//     "description": "Luxury penthouse with skyline views of Manhattan.",
//     "image": {
//       "url": "https://res.cloudinary.com/dvqe3rsyv/image/upload/v1741649270/wanderlust_DEV/zqe3q9ljsalumdc4bkot.jpg",
//       "filename": "wanderlust_DEV/zqe3q9ljsalumdc4bkot"
//     },
//     "price": 5000,
//     "location": "New York, NY",
//     "country": "USA",
//     "reviews": ["65a77890e123456789abcd09"],
//     "owner": "65a66666e123456789abcd93",
//     "geometry": {
//       "type": "Point",
//       "coordinates": [-74.006, 40.7128]
//     }
//   },
//   {
//     "title": "Secluded Bali Treehouse",
//     "description": "A treehouse in the jungle with breathtaking views and natural surroundings.",
//     "image": {
//       "url": "https://res.cloudinary.com/dvqe3rsyv/image/upload/v1741649312/wanderlust_DEV/mx75nzgsqhjc4o1zioxh.jpg",
//       "filename": "wanderlust_DEV/mx75nzgsqhjc4o1zioxh"
//     },
//     "price": 1500,
//     "location": "Bali",
//     "country": "Indonesia",
//     "reviews": ["65a88901e123456789abcd10"],
//     "owner": "65a77777e123456789abcd92",
//     "geometry": {
//       "type": "Point",
//       "coordinates": [115.1889, -8.4095]
//     }
//   },
//   {
//     "title": "Swiss Alps Chalet",
//     "description": "Luxury chalet with a fireplace and incredible mountain views.",
//     "image": {
//       "url": "https://res.cloudinary.com/dvqe3rsyv/image/upload/v1741649354/wanderlust_DEV/xai9evdeubigwsxn2jkn.jpg",
//       "filename": "wanderlust_DEV/xai9evdeubigwsxn2jkn"
//     },
//     "price": 3200,
//     "location": "Zermatt",
//     "country": "Switzerland",
//     "reviews": ["65a99012e123456789abcd11"],
//     "owner": "65a88888e123456789abcd91",
//     "geometry": {
//       "type": "Point",
//       "coordinates": [7.7491, 46.0207]
//     }
//   },
//   {
//     "title": "Sydney Harbor Apartment",
//     "description": "Apartment with a balcony overlooking the Sydney Opera House.",
//     "image": {
//       "url": "https://res.cloudinary.com/dvqe3rsyv/image/upload/v1741649420/wanderlust_DEV/wkq9qk2avepqfi01qjjj.jpg",
//       "filename": "wanderlust_DEV/wkq9qk2avepqfi01qjjj"
//     },
//     "price": 2800,
//     "location": "Sydney",
//     "country": "Australia",
//     "reviews": ["65a11234e123456789abcd12"],
//     "owner": "65a99999e123456789abcd90",
//     "geometry": {
//       "type": "Point",
//       "coordinates": [151.2093, -33.8688]
//     }
//   },
//   {
//     "title": "Dubai Skyscraper Suite",
//     "description": "High-rise suite in the Burj Khalifa district with stunning city views.",
//     "image": {
//       "url": "https://res.cloudinary.com/dvqe3rsyv/image/upload/v1741649486/wanderlust_DEV/docsth40mmuiqtyg7mp9.jpg",
//       "filename": "wanderlust_DEV/docsth40mmuiqtyg7mp9"
//     },
//     "price": 4000,
//     "location": "Dubai",
//     "country": "UAE",
//     "reviews": ["65a22345e123456789abcd13"],
//     "owner": "65a00000e123456789abcd89",
//     "geometry": {
//       "type": "Point",
//       "coordinates": [55.2708, 25.2048]
//     }
//   },
//   // {
//   //   "title": "Santorini Cliffside House",
//   //   "description": "White-washed house with an infinity pool overlooking the Aegean Sea.",
//   //   "image": {
//   //     "url": "https://res.cloudinary.com/dvqe3rsyv/image/upload/v1741649214/wanderlust_DEV/iblailr6zdglyfrh5bal.jpg",
//   //     "filename": "wanderlust_DEV/iblailr6zdglyfrh5bal"
//   //   },
//   //   "price": 3000,
//   //   "location": "Santorini",
//   //   "country": "Greece",
//   //   "reviews": ["65a66789e123456789abcd08"],
//   //   "owner": "65a55555e123456789abcd94",
//   //   "geometry": {
//   //     "type": "Point",
//   //     "coordinates": [25.4605, 36.3932]
//   //   }
//   // },
//   // {
//   //   "title": "Amalfi Coast Villa",
//   //   "description": "Elegant villa nestled on the cliffs with panoramic views of the Tyrrhenian Sea.",
//   //   "image": {
//   //     "url": "https://res.cloudinary.com/dvqe3rsyv/image/upload/v1741649214/wanderlust_DEV/amalfi1.jpg",
//   //     "filename": "wanderlust_DEV/amalfi1"
//   //   },
//   //   "price": 2800,
//   //   "location": "Positano",
//   //   "country": "Italy",
//   //   "reviews": ["65a66789e123456789abcd01"],
//   //   "owner": "65a55555e123456789abcd91",
//   //   "geometry": {
//   //     "type": "Point",
//   //     "coordinates": [14.4849, 40.6281]
//   //   }
//   // },
//   // {
//   //   "title": "Swiss Alps Chalet",
//   //   "description": "Cozy wooden chalet surrounded by snow-capped peaks and alpine meadows.",
//   //   "image": {
//   //     "url": "https://res.cloudinary.com/dvqe3rsyv/image/upload/v1741649214/wanderlust_DEV/swisschalet.jpg",
//   //     "filename": "wanderlust_DEV/swisschalet"
//   //   },
//   //   "price": 3500,
//   //   "location": "Zermatt",
//   //   "country": "Switzerland",
//   //   "reviews": ["65a66789e123456789abcd02"],
//   //   "owner": "65a55555e123456789abcd92",
//   //   "geometry": {
//   //     "type": "Point",
//   //     "coordinates": [7.7486, 46.0207]
//   //   }
//   // },
//   // {
//   //   "title": "Bali Jungle Retreat",
//   //   "description": "Eco-friendly bamboo villa hidden deep within Ubud's lush rainforest.",
//   //   "image": {
//   //     "url": "https://res.cloudinary.com/dvqe3rsyv/image/upload/v1741649214/wanderlust_DEV/baliretreat.jpg",
//   //     "filename": "wanderlust_DEV/baliretreat"
//   //   },
//   //   "price": 1200,
//   //   "location": "Ubud",
//   //   "country": "Indonesia",
//   //   "reviews": ["65a66789e123456789abcd03"],
//   //   "owner": "65a55555e123456789abcd93",
//   //   "geometry": {
//   //     "type": "Point",
//   //     "coordinates": [115.2625, -8.5097]
//   //   }
//   // },
//   // {
//   //   "title": "Big Sur Cliff House",
//   //   "description": "Modern architecture meets raw coastal wilderness on California’s rugged coastline.",
//   //   "image": {
//   //     "url": "https://res.cloudinary.com/dvqe3rsyv/image/upload/v1741649214/wanderlust_DEV/bigsurhouse.jpg",
//   //     "filename": "wanderlust_DEV/bigsurhouse"
//   //   },
//   //   "price": 4000,
//   //   "location": "Big Sur",
//   //   "country": "USA",
//   //   "reviews": ["65a66789e123456789abcd04"],
//   //   "owner": "65a55555e123456789abcd95",
//   //   "geometry": {
//   //     "type": "Point",
//   //     "coordinates": [-121.7852, 36.2704]
//   //   }
//   // },
//   // {
//   //   "title": "Patagonia Mountain Lodge",
//   //   "description": "Remote luxury lodge with breathtaking views of the Andes and glacial lakes.",
//   //   "image": {
//   //     "url": "https://res.cloudinary.com/dvqe3rsyv/image/upload/v1741649214/wanderlust_DEV/patagonialodge.jpg",
//   //     "filename": "wanderlust_DEV/patagonialodge"
//   //   },
//   //   "price": 3100,
//   //   "location": "El Chaltén",
//   //   "country": "Argentina",
//   //   "reviews": ["65a66789e123456789abcd05"],
//   //   "owner": "65a55555e123456789abcd96",
//   //   "geometry": {
//   //     "type": "Point",
//   //     "coordinates": [-72.8842, -49.3315]
//   //   }
//   // }
// ];

// module.exports = { data: sampleListings };
