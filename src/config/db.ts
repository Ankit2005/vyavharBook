import config from "config";
import mongoose from "mongoose";

export const initDb = async () => {
    const DB_URL: string = config.get("database.url");
    await mongoose.connect(DB_URL);
};
