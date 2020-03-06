<template>
    <div id="MyCollection">
        <div v-for="(item, index) in 6" :key="index">
            <van-row>
                <van-col span="6">
                    <img src="../../../static/ClassifyImg/HL6880/浅蓝色.jpg" width="100%" alt="">
                </van-col>
                <van-col span="18" style="position: relative; padding: .8rem 1rem">
                    <p>HL 6880#陶瓷桑蚕丝POLO</p>
                    <p style="margin-top: 1.6rem">￥28.00</p>
                </van-col>
            </van-row>
            <van-divider />
        </div>
    </div>
</template>

<script>
export default {
  name: 'MyCollection',
  data () {
    return {
    }
  },
  components: {},
  computed: {},
  watch: {},
  created () {
  },
  mounted () {},
  methods: {}
}
</script>

<style scoped>
    *{
        margin: 0;
        padding: 0;
    }
    #MyCollection{
        background: transparent;
        background-size: 100% 100%;
        width: 100%;
        height:100%;
    }
</style>
