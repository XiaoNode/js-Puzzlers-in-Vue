<template>
  <div class="hello">
    <h1>{{ title }}</h1>
   <p v-html='msg'>
   </p>
   <a class="button">start testing</a>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      title: 'Do you really know JavaScript? Come JavaScript Puzzlers!',
      msg: `This is a JavaScript quiz based on the behaviour as of <a href='http://www.ecma-international.org/ecma-262/5.1/#sec-15.4.4.19' target='_blank'>ECMA 262 (5.1)</a> in a browser environment.Behaviour may be different if you try it in a node or jsc REPL, for example this and global are different at the top level of a firefox console, node repl or jsc shell. Sorry about that.
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
h1{
  color: #EF8436;
}
p{
  line-height: 25px;
  text-align:left;
}
a.button{
  box-sizing: border-box;
  text-align: center;
  background-color: #eeeeee;
  border: solid 1px;
  border-color: #bbb;
  margin: 1em;
  padding: 1em;
  border-radius: 4px;
  width: 200px
}
</style>
