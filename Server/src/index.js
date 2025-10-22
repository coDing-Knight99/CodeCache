import dotenv from "dotenv";
import app from "./server.js";
import syncDB from "./db/sync.js";
dotenv.config();

await syncDB()
.then(()=>{
    app.listen(3000, () => {
        console.log(`Server is running on port 3000`);
    });
})
.catch((error) => {
    console.error("Failed to connect to the database:", error);
    process.exit(1);
});
