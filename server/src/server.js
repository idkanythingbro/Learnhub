
const app = require('./app');
const { connectDB } = require('./config/connectDB');
// require('dotenv').config()



// Define the path to the temp folder

const port = process.env.PORT || 8000;
connectDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on port http://127.0.0.1:${port}`);
        })
    })
    .catch(() => {
        console.log("Mongodb connections error")
    });


