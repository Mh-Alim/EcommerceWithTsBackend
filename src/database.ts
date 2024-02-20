import mongoose from "mongoose"

const DB_URL = "mongodb+srv://samsoon7789:3vr0WXsZuabLn6SC@cluster0.9b67iq2.mongodb.net/?retryWrites=true&w=majority";

export const connectToDatabase = () => {
    mongoose.connect(DB_URL,{
        dbName: "EcommerceTs"
    }).then((c) => {
        console.log(`Mongodb is connected `)
    }).catch((e) => {console.log("error: ",e)})
}