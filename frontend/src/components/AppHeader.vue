<template>
    <header>
        <div class="logo">
            Demo Quản lí nhân viên / Nguyễn Công Đạt B2012076
        </div>
        <div class="navbarr">
            <ul class="navlink">
                <li><router-link tag="a" :to="{name: 'home'}">Xem danh sách nhân viên</router-link></li>
                <li><router-link class="addUser" tag="a" :to="{name: 'addUser'}"><i class="fa-solid fa-plus"></i>Thêm nhân viên mới</router-link></li>
            </ul>
        </div>
    </header>
</template>

<style scoped>
header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    top: 0;
    left: 0;
    width: 100%;
    padding:20px 100px;
    background: black;
}


header .logo,
.navbarr ul {
    color: white;
}

.navbarr ul {
    display: flex;
    justify-content:center;
    margin: 0;
    align-items: center;
    list-style: none;
}
.navbarr ul li a{
    color: white;
}
.navbarr ul li a.active {
    background: rgb(72, 153, 229);
    border-left: 1px solid black;
    border-right: 1px solid black;

}
.navbarr ul li a:hover {
    text-decoration: none;
    background: rgb(72, 153, 229);
}
.navbarr ul li a{
    padding: 20px;
}
</style>

<script>
    
document.addEventListener("click",function(e) {
    const navLinks = document.querySelectorAll('.navlink li a');
    for (var i = 0; i < navLinks.length; i++) {
        var navLink = navLinks[i];
        if(navLink.contains(e.target)){
            navLink.classList.add('active');
        }
    }
})
</script>