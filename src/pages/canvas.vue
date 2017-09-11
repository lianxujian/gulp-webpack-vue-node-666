<template>
    <div class="wrapper">
        <img class="header-image" v-bind:src="headerSrc" v-on:click="changeAndUploadImage"/>
        <vueCropper
                ref="cropper"
                :img="option.img"
                :outputSize="option.size"
                :outputType="option.outputType"
                :info="option.info"
                :canScale="option.canScale"
                :autoCrop="option.autoCrop"
                :autoCropWidth="option.width"
                :autoCropHeight="option.height"
                :fixed="option.fixed"
                :fixedNumber="option.fixedNumber"
                v-if="option.showCropperFlag"
                class="cropper-container"
                @realTime="realTime"
                :style="{ width: windowWidth + 'px',height: windowHeight + 'px' }"
        ></vueCropper>
        <el-button type="primary" @click="finishCrop('base64')" class="btn">finish</el-button>
        <el-button type="primary" @click="candelCrop" class="btn">cancel</el-button>
        <canvas id="creative" width="640" height="1136" ref="creativeCanvas"></canvas>

        <div class="creative-material-info" v-if="menuShowFlag">
            <el-button type="primary" v-on:click="saveImage">保存到本地</el-button>
        </div>
        <input ref="inputImage" type="file" accept="image/*" style="display: none;" @change="showCropper"/>
        <div style="display: none" id="qrcode"></div>
    </div>
</template>

<style rel="stylesheet/scss" lang="sass">
    .wrapper {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        .header-image{
            height: 150px;
            width: 150px;
            border-radius: 50%;
        }
        .creative-material-info{

        }
        .cropper-container{
            position: absolute;
            top: 0px;
            left: 0px;
        }
    }

</style>

<script>
    import Button from 'element-ui/lib/button'
    import MaterialImg from '../assets/logo.png';
    import Tel from '../assets/person.png';
    import Person from '../assets/tel.png';
    import headerImage from '../assets/logo.png';
    import '../externel/jquery-1.7.2.min';
    import '../externel/jquery.qrcode.min';
    import Axios from '../axios/index'
    import Vue from 'vue'
    Vue.use(Button)//使用插件
    import VueCropper from 'vue-cropper'

    export default {
        data() {
            return {
                menuShowFlag: false,
                headerSrc: localStorage.getItem('headerSrc') || headerImage,
                option: {
                    showCropperFlag: false,
                    img: '',
                    info: true,
                    size: 1,
                    outputType: 'jpeg',
                    canScale: false,
                    autoCrop: true,
                    // 只有自动截图开启 宽度高度才生效
                    autoCropWidth: 300,
                    autoCropHeight: 250,
                    // 开启宽度和高度比例
                    fixed: true,
                    fixedNumber: [4, 3],
                },
                windowHeight: window.innerHeight,
                windowWidth: window.innerWidth
            }

        },
        methods: {
            /*画canvas前确定是否将所有图片加载完毕*/
            loadImages: (imgSources, callback) => {
                let count = Object.values(imgSources).length
                let {keys, values, entries} = Object;
                let loadedNum = 0;
                let images = {};
                for (let [k, v] of entries(imgSources)) {
                    images[k] = new Image()
                    images[k].onload = function () {
                        if (++loadedNum >= count) {
                            callback(images);
                        }
                    }
                    images[k].src = v;
                }
            },
            /*将canvas转成图片保存到本地*/
            saveImage() {
                let me = this;
                let type = 'png';
                let imgData = me.$refs.creativeCanvas.toDataURL(type)
                //新窗口打开
                var w = window.open('about:blank', 'image from canvas');
                w.document.write("<img src='" + imgData + "' alt='from canvas'/>");
                // 将mime-type改为image/octet-stream，强制让浏览器直接download
                imgData = imgData.replace(me.fixType(type), 'image/octet-stream');
                window.location.href = imgData; // it will save locally

            },
            /*修改图片格式*/
            fixType(type) {
                type = type.toLowerCase().replace(/jpg/i, 'jpeg');
                var r = type.match(/png|jpeg|bmp|gif/)[0];
                return 'image/' + r;
            },
            /*头像点击事件*/
            changeAndUploadImage() {
                let me = this;
                me.$refs.inputImage.click()
            },
            /*显示剪切的组件*/
            showCropper(e) {
                let me = this;
                var file = e.target.files[0]
                if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
                    alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
                    return false
                }
                var reader = new FileReader()
                reader.onload = (e) => {
                    me.option.img = e.target.result
                }
                reader.readAsDataURL(file)
                me.option.showCropperFlag = true

            },
            // 实时预览函数
            realTime () {
                let me = this;
                me.$refs.cropper.getCropData((data) => {
                    me.headerSrc = data
                })
            },
            // 结束裁剪
            finishCrop (type){
                let me = this;
                // 将data上传，把url返回给headerSRC 并存储在location

                me.$refs.cropper.getCropData((data) => {
                    var param = {
                        imgData: data
                    }
                    me.$axios({
                        url: Axios.updateHeader,
                        method: 'post',
                        data: param
                    })
                        .then(function (res) {
                            let src = res.data && res.data.headerSrc
                            localStorage.setItem('headerSrc', 'http://' + src);
                            me.option.showCropperFlag = false
                            me.headerSrc = localStorage.getItem('headerSrc') || headerImage
                        })
                        .catch(function (res) {
                            console.log(res)
                        })
                })

            },
            //取消裁剪
            candelCrop(){
                let me = this;
                me.option.showCropperFlag = false;
                me.headerSrc = localStorage.getItem('headerSrc') || headerImage
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
            let imgSources = {materialImg, qrcodeImg, tel, person};
            me.loadImages(imgSources, function (images) {
                ctx.drawImage(images.materialImg, 0, 0, 640, 900);
                ctx.drawImage(images.qrcodeImg, 99, 957, 128, 128);
                ctx.drawImage(images.person, 286, 968, 43, 43);
                ctx.drawImage(images.tel, 286, 1031, 43, 43);

                ctx.beginPath();
                ctx.moveTo(88.5, 976.5);
                ctx.lineTo(88.5, 946.5);
                ctx.lineTo(118.5, 946.5);
                //右上角

                ctx.moveTo(206.5, 946.5);
                ctx.lineTo(236.5, 946.5);
                ctx.lineTo(236.5, 976.5);
                //左下角
                ctx.moveTo(88.5, 1064.5);
                ctx.lineTo(88.5, 1094.5);
                ctx.lineTo(118.5, 1094.5);
                //右下角
                ctx.moveTo(206.5, 1094.5);
                ctx.lineTo(236.5, 1094.5);
                ctx.lineTo(236.5, 1064.5);

                ctx.lineWidth = 1;
                ctx.strokeStyle = 'rgba(219,219,219,1)';
                ctx.stroke()

                ctx.font = '42px Microsoft YaHei';
                ctx.fillText('CC', 341, 1006);
                ctx.font = '36px Microsoft YaHei';
                ctx.fillText('12312341234', 341, 1065);

                me.menuShowFlag = true;
            })
        },
        components: {
            VueCropper: VueCropper
        }
    }
</script>