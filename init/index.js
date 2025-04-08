if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
}
const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const initData = require("./data.js");
const dbUrl = process.env.ATLASDB_URL;
main()
    .then((res) => {
        console.log("Database connected successfully!");
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(dbUrl);
}

const initDatabase = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({
        ...obj, 
        owner: "67f5794c84461af66fadb5f1"
    }));

    await Listing.insertMany(initData.data);
    console.log(initData.data);
    console.log("Database initialized");
};

initDatabase();
