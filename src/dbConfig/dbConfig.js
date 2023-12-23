import mongoose from "mongoose";
export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_DB_URL);
        let connection = mongoose.connection;
        connection.on('connected', () => {
            console.log('✅ Database Connected Successfully')
        })
        connection.on('error', (err) => {
            console.error('❌ Error in Connecting Database.' + err);
            process.exit();
        })
    } catch (err) {
        console.error('Something went wrong')
        console.error(err.message)
    }
}