<template>
    <div>
        <form>
            <input type="file"  @change="onFileChange">
        </form>
    </div>
</template>
<script>
    export default{
        data(){
            return{}
        },
        created(){

        },
        methods:{
            onFileChange(e){
                var formData = new FormData();
                formData.append('name',e.target.files[0]);
                var xhr = new XMLHttpRequest();
                xhr.open('post', 'http://www.myblog.com/?s=Index/System/getUsers', true);
                xhr.send(formData);
                xhr.onreadystatechange = function (){
                    if (xhr.readyState === 4) {
                        var res = xhr.responseText;
                        console.log(res)
                    }
                }
            }
        }
    }
</script>