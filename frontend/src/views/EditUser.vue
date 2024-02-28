<script>
import API from "../api"
export default {
    data() {
        return {
            user: {
                name: "",
                gender: "",
                email: "",
                age: "",
                phone: "",
                service: "",
                image: "",
            },
            PF:[],
            image:null,
        };
        },
        async created () {
            const response = await API.getUserById(this.$route.params.id);
            this.PF = "http://localhost:3000";
            this.user = response;
         },
        methods: {
           selectfile(event) {
                this.image = event.target.files[0]
           },
           async updateUser() {
               try {
                    const fd = new FormData();
                    fd.append("image", this.image);
                    fd.append("name", this.user.name);
                    fd.append("gender", this.user.gender);
                    fd.append("email", this.user.email);
                    fd.append("age", this.user.age);
                    fd.append("phone", this.user.phone);
                    fd.append("service", this.user.service);
                    fd.append("old_image", this.user.image);
                    if(window.confirm("Bạn có chắc muốn cập nhật thông tin này không?")) {
                        await API.updateUser(this.$route.params.id, fd)
                        this.$router.push('/').then(alert("Thông tin nhân viên đã được cập nhật"))                    
                    }
               } catch (error) {
                    console.log(error);
               }
            },
        },
}
</script>

<template>
    <div id="edituser" class="container mb-5">
        <Form @submit="updateUser()" enctype="multipart/form-data" class="form-style mt-3">
            <div class="mb-3">
                <img height="250" style="border-radius: 5px;" :src=" PF + `/${user.image}`" class="img-edit" alt="loi hinh anh" >
            </div>
            <div class="mb-3">
                <label for="name">Họ và tên: </label>
                <Field id="name" name="name" v-model="user.name" :rules="NameIsvalid"  type="text" class="form-control" placeholder="VD: Lê Văn A"/>
                <ErrorMessage style="color:red;" name="name"/>
            </div>
            <div class="mb-3">
                <label for="gender">Giới tính: </label>
                <select v-model="user.gender" name="gender" id="gender">
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                    <option value="Khác">Khác</option>
                </select>
            </div>
            <div class="mb-3">
                
                <label for="age">Ngày sinh: </label>
                <Field name="age" id="age" v-model="user.age" :rules="requiredIsvalid" type="date" />
                <ErrorMessage style="color:red;" name="age"/>
            </div>
            <div class="mb-3">
                <label for="phone">Số điện thoại: </label>
                <Field name="phone" id="phone" v-model="user.phone" type="text" :rules="PhoneIsvalid" class="form-control" placeholder="VD: 0962233466"/>
                <ErrorMessage style="color:red;" name="phone"/>
                
            </div>
            <div class="mb-3">
                <label for="email">Email: </label>
                <Field name="email" id="email" v-model="user.email" type="text" :rules="EmailIsvalid" class="form-control" placeholder="VD: dat@gmail.co"/>
                <ErrorMessage style="color:red;" name="email" />
            </div>
            <div class="mb-3">
                <label for="position">Vị trí: </label>
                <Field name="position" id="position" v-model="user.service" type="text" :rules="requiredIsvalid" class="form-control" placeholder="VD: Nhân viên"/>
                <ErrorMessage style="color:red;" name="position"/>
                
            </div>
            <button type="submit" class="btn-submit">Cập nhật nhân viên</button>
        </Form>
    </div>
</template>

<style>
.btn-submit {
    border: none;
    padding:10px;
    background: blue;
    color: white;
}
</style>


<script setup>
import { Field, Form, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
   const NameIsvalid = yup
        .string()
        .required("Tên phải có giá trị.")
        .min(2, "Tên phải ít nhất 2 ký tự.")
        .max(50, "Tên có nhiều nhất 50 ký tự.")
    
   const EmailIsvalid = yup
        .string()
        .required("Thông tin không được để trống.")
        .email("E-mail không đúng.")
        .max(50, "E-mail tối đa 50 ký tự.")
    
    const requiredIsvalid = yup
        .string()
        .required("Thông tin không được để trống.")

   
   const PhoneIsvalid = yup
           .string()
           .matches(
           /((09|03|07|08|05)+([0-9]{8})\b)/g,
           "Số điện thoại không hợp lệ.")
</script>