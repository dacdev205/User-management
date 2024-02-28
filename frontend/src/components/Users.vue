<script>
    import API from "../api"
    import * as XLSX from 'xlsx/xlsx.mjs';
    import "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.1/jquery.min.js"
    import "https://cdn.datatables.net/1.13.1/js/jquery.dataTables.min.js"
    export default {
        data() {
          return {
            users: [],
            PF: [],
            MOCK_DATA:[],
            term: '',
            select_all: false,
            selected: [],
            message2: null,
            checked: false,
            select_position:'',
          };
       },

       async created() {
          this.users = await API.getAllUser();
          this.MOCK_DATA = await API.getAllUser();
          this.PF = "http://localhost:3000";
       },
       methods: {

        async removeUser(id) {
            await API.deleteUser(id)
            alert("Removed this blog successfully");
        },

        select () {
            if(this.select_all == true) {
                for(let i in this.users){
                    this.checked = true; 
                    this.selected.push(this.users[i]._id);
                }
            } else {
                this.checked = false; 
                this.selected = [];
            } 
        },
        selectSingleUser() {
            if(this.users.length == this.selected.length) {
                this.select_all = true;
            } else {
                this.select_all = false;
            } if(this.selected.length >= 1){
                this.checked = true; 
            } else {
                this.checked = false;
            }
        },
        async deleteRecords(selected) {
            if(window.confirm("Bạn có chắc muốn xóa các mục đã chọn")){
                for(let i in this.selected) {
                    await API.deleteUser(selected[i])
                    this.message2 = "Các mục đã được xóa"
                }
            }
        },

        search(term) {
            this.resetUser()
            try {
                this.users = this.users.filter((user)=> {
                    return user.name.toLowerCase().includes(term.toLowerCase());
 
                })
           } catch (error) {
            return;
           }
        },

        findByPosition(select_position) {
            this.resetUser()
            try {
                this.users = this.users.filter((user)=> {
                    return user.service.toLowerCase().includes(select_position.toLowerCase());
                })
           } catch (error) {
            console.log(error);
           }
        },
        resetUser () {
            this.selected = [];
            this.select_all = false;
            this.users = this.MOCK_DATA;
            this.term = null;
            this.checked = false;

        },

        ExportToExcel(type, fn, dl) {
            var elt = this.$refs.exportable_table;
            var wb = XLSX.utils.table_to_book(elt,{sheet: "Sheet JS"});
            return dl ?
                XLSX.write(wb, {bookType:type,boolSST:true,type: 'base64'}):
                XLSX.writeFile(wb, fn || ('Danh sách nhân viên.' + (type || 'xls')));
        },

    }
}
</script>
<template>
    <div class="container">
        <div class="listController">
            <div class="search-controller">
                <button class="btn-reset" @click="resetUser()">Làm mới</button>
                <input v-model="term" @keyup.enter="search(term)" type="text" placeholder="Tìm kiếm nhân viên ">
                <button class="btn-search" @click="search(term)">Tìm kiếm</button>
            </div>
        </div>
        <div class="list-staff container">
            <div class="selectAll">
                <label class="form-checkbox">
                    Chọn tất cả
                    <input  type="checkbox" v-model="select_all" @change="select()">
                </label>
                <select @click="findByPosition(select_position)" v-model="select_position" name="" id="">
                    <option value="">Tìm nhân viên theo vị trí</option>
                    <option value="Nhân viên phục vụ">Nhân viên phục vụ</option>
                    <option value="Nhân viên chế biến">Nhân viên chế biến</option>
                    <option value="Nhân viên bán hàng">Nhân viên bán hàng</option>
                </select>
        </div>
        <table ref="exportable_table">
            <thead>
                <tr>
                    <th></th>
                    <th>STT</th>
                    <th>Tên</th>
                    <th>Giới tính</th>
                    <th>Tuổi</th>
                    <th>Email</th>
                    <th>Điện thoại</th>
                    <th>Vị trí</th>
                    <th></th>
                </tr>
        </thead>
        <tbody v-for="(user, i ) in users" :key="user._id">
            <tr>
                <td>
                    <input class="select" type="checkbox" :value="user._id" v-model="selected" @change="selectSingleUser()">
                </td>
                <td>{{i + 1}}</td>
                <td class="profile-user">
                    <img class="img-profile mr-2" :src="PF+`/${user.image}`" alt="">
                    {{user.name}}
                </td>
                <td>{{user.gender}}</td>
                <td>{{user.age}}</td>
                <td>{{user.email}}</td>
                <td>{{user.phone}}</td>
                <td>{{user.service}}</td>
                <td> 
                    <router-link tag="button" :to="{ name: 'editUser', params: {id: user._id }}"><button><i class="fa-solid fa-user-pen edit"></i></button></router-link>
                    <button class="btn-delete" @click="removeUser(user._id)"><i class="fas fa-trash delete"></i></button>
                </td>
            </tr>
            <span @click="this.$router.push({name: 'userdetail', params: {id: user._id}})" class="user-hover"></span>
            <span @click="this.$router.push({name: 'userdetail', params: {id: user._id}})" class="user-hover2"></span>
        </tbody>
        <div class="select2del">
            <button v-if="checked" @click="deleteRecords(selected)">Delete</button>
            {{message2}}
        </div>
    </table>
    <button @click="ExportToExcel('xls')" class="export">Kết xuất danh sách</button>
        </div>
    </div>

</template>


<style scoped>
    .container {
        padding: 0;
    }
    .listController {
        margin-top: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    .list-staff {
        position: absolute;
        top: 50%;
        display:flex;
        left: 50%;
        transform: translate(-50%,-50%);
        border: 1px solid black;
        border-radius: 5px;
        box-shadow: 0 4px 4px 2px #ccc;
    }

    .selectAll {
        position: absolute;
        top: -30px;
    }
    .img-profile {
        height:50px;
        border-radius: 50%;
    }
    .profile-user {
        display: flex;
        align-items: center;
    }
    table {
        width: 100%;
        width:1200px;
        border-collapse: collapse;
    }
    thead th {
     font-size: 15px;
     background: black;
     padding: 10px 20px;
     color: white;
     text-align: center;
     word-break: break-all;
    }
    tbody td {
        text-align: center;
    }
    tbody:hover{
        background: #ccc; 
    }
    tbody{
        position: relative;
        cursor: pointer;
        z-index: 1;
    }

    .user-hover {
        position: absolute;
        width: 84%;
        height:100%;
        top: 0;
        left: 50px;
    }
    .user-hover2 {
        height:100%;
        position: absolute;
        right: 0;
        top: 0;
        width: 1%;
    }
    button {
        padding: 5px 10px;
        border: none;
        outline: none;
        background: transparent;
        margin: 5px;
    }
    button .eye{
        color: rgb(107, 107, 243);
    }

    button .edit{
        color: green;
    }
    button .delete {
        color: red;
    } 
    .btn-reset {
        background: green;
        color: white;
        border-radius: 5px;
    }
    .btn-search {
        background: rgb(234, 127, 46);
        color: white;
        border-radius: 5px;
    }
    input[type="text"] {
        border: none;
        padding: 5px;
        background: rgb(179, 215, 245);
        outline: none;
        border-radius: 5px;

    }
    input[type="checkbox"] {
        margin: 5px;
    }
    .message {
        color: red;
    }
    .select2del {
        position: absolute;
        bottom: -50px;
        left: 0;
    }
    .select2del button {
        border-radius: 5px;
        color: white;
        background: rgb(236, 57, 41);

    }
    .delAll{
        position: absolute;
        bottom: -50px;
        left: 150px;
        background: rgb(48, 136, 237);
        color: white;
        border-radius: 5px;
    }
    .message-select {
        position: absolute;
        bottom: -90px;
        left: 0;
        color: red;
        border-radius: 5px;
    }
    .export {
        position: absolute;
        bottom: -50px;
        right: 0;
        background: rgb(48, 136, 237);
        color: white;
        border-radius: 5px;
    }
    @media (max-width:1023px) {
        table {
        width: 100%;
        width:990px;
        border-collapse: collapse;
        font-size: 14px;
    }
    }
</style>
    