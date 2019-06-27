<template>
  <!-- 主界面 -->
  <div>
    <Title></Title>
  </div>
</template>
<style>
</style>

<script>
import Title from "@/components/Title";
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
    this.bus.$emit('adminInfo',this.$route.query.id);
  },
  components: {
    Title,
  }
};
</script>


