import dotenv from "dotenv";
dotenv.config();  

import app from "./server.js";
import syncDB from "./db/sync.js";
(async () => {
  try {
    await syncDB();
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server is running on port ${process.env.PORT || 3000}`);
    });
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    process.exit(1);
  }
})();
