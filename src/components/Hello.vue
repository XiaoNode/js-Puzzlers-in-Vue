<template>
  <div class="hello">
    <img src="../assets/doyou.png" class="img-responsive center-block">
    <h2>{{ title }}</h2>
   <p v-html='hmtlp'>
   </p>
   <!-- <a class="button">start testing</a> -->
   <a href="http://www.xuechenlei.com"><button type="button" class="btn btn-default btn-lg">back blog</button></a>
   <router-link to="item"><button type="button" class="btn btn-info btn-lg">start testing</button></router-link>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      title: 'Do you really know JavaScript? Come JavaScript Puzzlers!',
      hmtlp: `This is a JavaScript quiz based on the behaviour as of <a href='http://www.ecma-international.org/ecma-262/5.1/#sec-15.4.4.19' target='_blank'>ECMA 262 (5.1)</a> in a browser environment.Behaviour may be different if you try it in a node or jsc REPL, for example this and global are different at the top level of a firefox console, node repl or jsc shell. Sorry about that.
        <br>
        And more information can be accessed <a href='http://javascript-puzzlers.herokuapp.com/' target='_blank'>here</a>;
        <br>
        Are you ready? Come and start testing!
      `
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h2{
  color: #EF8436;
}
p{
  line-height: 35px; font-size: 18px;
} 
{ text-decoration: none; }

</style>
