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
            PF: "",
            image:null,
        };
        },
        async created () {
            const response = await API.getUserById(this.$route.params.id);
            this.PF = "http://localhost:3000";
            this.user = response;
         },
}
</script>

<template>
    <div id="edituser" class="container mt-5">
            <div class="row">
                <div class="col-4">
                    <img height="250" width="250" style="border-radius: 5px;border-radius: 50%;" :src="PF + `/${user.image}`" class="img-edit" alt="loi hinh anh" >
                </div>
                
                <div class="col-8">
                    <p>Họ và tên: {{user.name}}</p>
                    <p>Giới tính: {{user.gender}}</p>
                    <p>Ngày sinh: {{user.age}}</p>
                    <p>Số điện thoại: {{user.phone}}</p>
                    <p>email: {{user.email}}</p>
                    <p>Vị trí: {{user.service}}</p>
                </div>
            </div>
        </div>
</template>

