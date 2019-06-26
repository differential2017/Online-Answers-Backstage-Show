<template>
  <!-- 主界面 -->
  <div>
    <Title></Title>
    <component :is="comname"></component>
  </div>
</template>
<style>
</style>

<script>
import Title from "@/components/Title";
import CreateMain from "@/components/CreateMain"
export default {
  data: function() {
    return {
      account:null,
      comname:null
    };
  },
  methods: {},
  mounted() {
    this.account=this.$route.query.id;
    if(this.account==null){
        alert("请重新登录");
        this.$router.push({
            path: "/"
        });
    }
    this.bus.$emit('adminInfo',this.account);
    this.bus.$on('comInfo',(data)=>{
        this.comname=data;
    })
  },
  components: {
    Title,
    CreateMain
  }
};
</script>


