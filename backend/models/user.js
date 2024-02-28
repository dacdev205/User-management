const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: String,
    gender: String,
    email: String,
    age:String,
    image: String,
    phone: String,
    service: String,
    created: {
      type: Date,
      default: Date.now()
    },
});

module.exports = mongoose.model("User", userSchema)