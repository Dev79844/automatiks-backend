import app from "./app";
import mongoose from "mongoose";

mongoose.connect(process.env.DB)
.then(() => {
    console.log("DB connected");
    app.listen(process.env.PORT, () => {
        console.log(`Server started on port ${process.env.DB}`);
    })
})