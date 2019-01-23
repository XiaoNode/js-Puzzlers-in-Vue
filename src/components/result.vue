<template>
  <div>
    <h1>your test result :</h1>
    <div>
      <h3>
        Correct sute:
        <b class="correctnum">{{ $store.state.rightnum }}</b>
      </h3>

      <h3>
        Error sute:
        <b class="errornum">{{ $store.state.errornum }}</b>
      </h3>
      <p>Wow ! The correct rate of your test is {{ result }}%</p>
      <button type="button" class="btn btn-default btn-lg fr" @click="goHome">Back to Blog</button>
      <button type="button" class="btn btn-primary btn-lg fr" @click="goTest">Do again \(≧▽≦)/</button>
    </div>
  </div>
</template>

<script>
import store from "@/vuex/store";
export default {
  store,
  computed: {
    result: function() {
      return (
        (this.$store.state.rightnum / this.$store.state.count) *
        100
      ).toFixed(2);
    }
  },
  methods: {
    goTest: function() {
      //this.$router.push({ path: '/item' });
      window.location.hash = "#item";
    },
    goHome: function() {
      window.location.href = "http://www.xuechenlei.com";
    }
  }
};
</script>

<style>
h3 {
  font-size: 150%;
}
.correctnum {
  color: green;
}
.errornum {
  color: red;
}
</style>
 