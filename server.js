const app = require('./src/app');
const dotenv = require("dotenv");
const { connectToDB } = require("./src/config/db");


// Load environment variables from .env file...
dotenv.config();


// Connect to the database...
connectToDB();


// Start the server...
const PORT = process.env.PORT || 8080;


// Server running and 100% health check...
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log("🩺 Health Check");
    console.log("Server Status: OK");
});