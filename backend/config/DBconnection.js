import mongoose from "mongoose";

export default async function DBconnection(url) {
    try {
        await mongoose.connect(url, { maxPoolSize: 50 })
            .then(() => console.log('Database connected successfully'))
            .catch((err) => console.log('Error connecting to database', err));
    } catch (error) {
        console.log('Database connection failed : ', error);
        process.exit(1);
    }
}