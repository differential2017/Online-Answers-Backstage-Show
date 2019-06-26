<template>
  <div id="app">
    <router-view>
      <router-link to="/"><Login></Login></router-link> |
    </router-view>
  </div>
</template>

<style lang="scss">

</style>

<script>
import Login from "@/views/Login";
export default {
  data:function(){
    return{

    }
  },
  methods:{},
  components:{
    Login
  }
}
</script>

