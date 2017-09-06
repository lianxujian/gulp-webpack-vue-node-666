<template>
    <div class="wrapper">
        <canvas id="creative" width="640" height="1136" ref="creativeCanvas">

        </canvas>
        <div class="creative-material-info" v-if="menuShowFlag">
            <el-button type="primary"  v-on:click="saveImage">保存到本地</el-button>
            <el-button type="primary"  v-on:click="uploadImage">上传</el-button>
        </div>
        <div style="display: none" id="qrcode"> </div>
    </div>
</template>

<style>
    .wrapper {
    }

</style>

<script>
    import MaterialImg from '../assets/logo.png';
    import Tel from '../assets/person.png';
    import Person from '../assets/tel.png';
    import '../externel/jquery-1.7.2.min';
    import '../externel/jquery.qrcode.min';
    export default {
        data() {
            return {
                menuShowFlag: false
            }

        },
        methods: {
            loadImages: (imgSources, callback) => {
                let count = Object.values(imgSources).length
                let {keys, values, entries} = Object;
                let loadedNum = 0;
                let images = {};
                for (let [k, v] of entries(imgSources)) {
                    images[k] = new Image()
                    images[k].onload = function () {
                        if (++loadedNum >= count){
                            callback(images);
                        }
                    }
                    images[k].src = v;
                }
            },
            saveImage(){
                let me = this;
                let type = 'png';
                let imgData = me.$refs.creativeCanvas.toDataURL(type)
                //新窗口打开
                var w=window.open('about:blank','image from canvas');
                w.document.write("<img src='"+ imgData +"' alt='from canvas'/>");
                // 将mime-type改为image/octet-stream，强制让浏览器直接download
                imgData = imgData.replace(me.fixType(type),'image/octet-stream');
                window.location.href=imgData; // it will save locally

            },
            uploadImage(){},
            fixType(type){
                type = type.toLowerCase().replace(/jpg/i, 'jpeg');
                var r = type.match(/png|jpeg|bmp|gif/)[0];
                return 'image/' + r;
            }
        },
        mounted: function () {
            let qrcodeCanvas = $("#qrcode");
            qrcodeCanvas.qrcode({
                render: "canvas", //也可以替换为table
                text: "http://localhost:8080/#/canvas"
            })
            let QrcodeImg = qrcodeCanvas.find("canvas")[0].toDataURL();
            let canvas = document.getElementById('creative');
            let ctx = canvas.getContext('2d')
            let me = this;
            // 创意物料图片地址
            let materialImg = MaterialImg;
            let qrcodeImg = QrcodeImg;
            let tel = Tel;
            let person = Person;
            let imgSources = {materialImg , qrcodeImg , tel , person};
            me.loadImages(imgSources, function (images) {
                ctx.drawImage(images.materialImg,0,0,640,1136);
                ctx.drawImage(images.qrcodeImg,99,957,128,128);
                ctx.drawImage(images.person,286,968,43,43);
                ctx.drawImage(images.tel,286,1031,43,43);

                ctx.beginPath();
                ctx.moveTo(88.5,976.5);
                ctx.lineTo(88.5,946.5);
                ctx.lineTo(118.5,946.5);
                //右上角

                ctx.moveTo(206.5,946.5);
                ctx.lineTo(236.5,946.5);
                ctx.lineTo(236.5,976.5);
                //左下角
                ctx.moveTo(88.5,1064.5);
                ctx.lineTo(88.5,1094.5);
                ctx.lineTo(118.5,1094.5);
                //右下角
                ctx.moveTo(206.5,1094.5);
                ctx.lineTo(236.5,1094.5);
                ctx.lineTo(236.5,1064.5);

                ctx.lineWidth = 1;
                ctx.strokeStyle = 'rgba(219,219,219,1)';
                ctx.stroke()

                ctx.font = '42px Microsoft YaHei';
                ctx.fillText('CC', 341, 1006);
                ctx.font = '36px Microsoft YaHei';
                ctx.fillText('12312341234',341,1065);

                me.menuShowFlag = true;
            })
        }
    }
</script>