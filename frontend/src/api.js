import axios from "axios";
const url = "/api/user"

export default class API {
    static async getAllUser(){
        const res = await axios.get(url);
        return res.data;
    }
    static async getUserById(id){
        const res = await axios.get(`${url}/${id}`);
        return res.data;
    }

    static async addUser(user){
        const res = await axios.post(url, user);
        return res.data;
    }

    static async updateUser(id,user){
        const res = await axios.patch(`${url}/${id}`, user);
        return res.data;
    }
    static async deleteUser(id){
        const res = await axios.delete(`${url}/${id}`);
        return res.data;
    }

}