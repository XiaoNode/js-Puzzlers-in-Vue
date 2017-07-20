<template>
<div>
	<div class="toptic">
		<h1>{{rightnum}} / {{errornum}} of {{count}}</h1>
	</div> 
	<h2>What is the result of this expression? (or multiple ones)</h2>
	<code>["1", "2", "3"].map(parseInt)</code>
	<div class="buttondiv">
		<button type="button" class="btn btn-default btn-lg">back blog</button>
		<button type="button" class="btn btn-default btn-lg">back blog</button>
		<button type="button" class="btn btn-default btn-lg">back blog</button>
		<button type="button" class="btn btn-default btn-lg">back blog</button>		
	</div>

	<p>what you actually get is [1, NaN, NaN] because parseInt takes two parameters (val, radix) and map passes 3 (element, index, array)</p>

	<img src="../assets/consider.png" class="img-responsive center-block" v-if="imgStatus=='consider'">
	<img src="../assets/right.png" class="img-responsive center-block" v-if="imgStatus=='right'">
	<img src="../assets/error.png" class="img-responsive center-block" v-if="imgStatus=='error'">

	<div class="buttondiv">
	<button type="button" class="btn btn-primary btn-lg fr" v-if="current<44 && showNext">Next test >></button> 
	</div>
</div>
</template>

<script>
import store from '@/vuex/store'
import { mapState, mapMutations } from 'vuex'
export default{
	name: 'item',
	data() {
		return {
			msg: 'test begin!'
		}
	},
	store,
	computed: {
		...mapState(['count','rightnum','errornum','current','imgurl','imgStatus','showNext'])
	},
	methods: {
		...mapMutations(['rightAdd','errorAdd']),
		add(){
			this.$store.commit('rightAdd')
		}
	}
}
</script>

<style>
.toptic{float: right }
h2{ margin-bottom: 30px }
code{ font-size: 160% }
.buttondiv{ margin: 30px 0 }
.buttondiv button{ margin: 0 10px }
p{ font-size: 25px }
.fr{ float: right }
</style>