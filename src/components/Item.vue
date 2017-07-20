<template>
<div>
	<div class="toptic">
		<h1>{{rightnum}} / {{errornum}} of {{count}}</h1>
	</div> 

	<div v-for="item in itemss">
		<h2>{{ item.title }}</h2>
		<code>{{ item.question }}</code>
		<div class="buttondiv">
			<button type="button" class="btn btn-default btn-lg" @click.once="selected(index+1)" v-for="(i ,index) in item.select">{{ i }}</button>	
		</div>

		<p>{{ item.notic }}</p>

		<img src="../assets/consider.png" class="img-responsive center-block" v-if="imgStatus=='consider'">
		<img src="../assets/right.png" class="img-responsive center-block" v-if="imgStatus=='right'">
		<img src="../assets/error.png" class="img-responsive center-block" v-if="imgStatus=='error'">

		<div class="buttondiv">
		<button type="button" class="btn btn-primary btn-lg fr" v-if="current<44 && showNext">Next test >></button> 
		</div>	
		<div id="answer" v-show="false">{{ item.answer }}</div>
	</div>

	<!-- {{ answer }}  --- -->
</div>
</template>

<script>
import store from '@/vuex/store'
import { mapState, mapMutations, mapGetters } from 'vuex'
export default{
	name: 'item',
	data() {
		return {
			msg: 'test begin!'
		}
	},
	store,
	computed: {
		...mapState(['count','rightnum','errornum','current','imgurl','imgStatus','showNext','items']),
		...mapGetters(['itemss','answer'])
	},
	methods: {
		...mapMutations(['rightAdd','errorAdd']),
		add(){
			this.$store.commit('rightAdd')
		},
		selected(index){
			console.log(index);
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