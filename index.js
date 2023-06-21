const app = require('./app')
require('dotenv').config()
const mongoose = require('mongoose')

// connecting to database
mongoose.connect(process.env.DB)
.then(() => {
    console.log("DB Connected");
    app.listen(process.env.PORT, () => {
        console.log(`Server started on port ${process.env.PORT}`);
    })
})