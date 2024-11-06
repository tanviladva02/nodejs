const express = require('express');
const app = express();
app.use(express.json());
const dbConnection = require('./connection/db');
const authenticationRoutes = require("./Routes/routes.auth");
const pagesRoutes = require("./Pages/home")

app.use("/auth", authenticationRoutes);
app.use("/pages", pagesRoutes)

const port = 9000;

app.listen(port, async () => {
    try {
        await dbConnection;
        console.log(`Server is running at port ${port}`);
    } catch (error) {
        console.error('Database connection error:', error.message);
    }
});
