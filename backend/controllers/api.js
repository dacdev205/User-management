const User = require("../models/user");
const fs = require("fs");
module.exports = class API {
    static async fetchAllUser(req, res) {
        try {
            const users = await User.find();
            res.status(200).json(users);
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    }

    static async fetchUserByID(req, res) {
        const id = req.params.id;
        try {
            const user = await User.findById(id);
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json({message: err.message});
        }
}
    
    static async createUser(req, res) {
        const user = req.body;
        const imagename =req.file.filename;
        user.image = imagename;
        try {
            await User.create(user);
            res.status(201).json({message: "User created successfully"});
        } catch (err) {
            res.status(400).json({message: err.message});
        }
    }

    static async updateUser(req, res) {
        const id = req.params.id;
        let new_image = "";
        if(req.file) {
            new_image = req.file.filename;
            try {
                fs.unlinkSync("./uploads/" + req.body.old_image);
            } catch (err) {
                console.log(err);
            }
        } else {
            new_image = req.body.old_image;
        }
        const newUser = req.body;
        newUser.image = new_image;

        try {
            await User.findByIdAndUpdate(id, newUser);
            res.status(200).json({message: "User updated successfully"});
        } catch (err) {
            res.status(404).json({message: err.message});
        }
    }

    static async deleteUser(req, res) {
        const id = req.params.id;
        try {
            const result = await User.findByIdAndDelete(id);
            if(result.image !="") {
                try {
                    fs.unlinkSync("./uploads/" + result.image);
                } catch (err) {
                    console.log(err)
                }
            }
            res.status(200).json({message: "User deteted succesfully"});
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    }
}