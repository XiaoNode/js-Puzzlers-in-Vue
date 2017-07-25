<template>
<div>
	<div class="toptic">
		<h1>{{rightnum}} / {{errornum}} of {{count}}</h1>
	</div> 

	<div v-for="item in itemss">
		<h2>{{ item.title }}</h2>
		<code>{{ item.question }}</code>
		<div class="buttondiv bt">
			<button type="button" :class="claname" @click="selected(index+1,$event)" v-for="(i ,index) in item.select">{{ i }}</button>	
		</div>

		<p v-if="isselectright" class="bg-info"><b> Tip: </b> {{ item.notic }}</p>

		<img src="../assets/consider.png" class="img-responsive center-block" v-if="imgStatus=='consider'">
		<img src="../assets/right.png" class="img-responsive center-block" v-if="imgStatus=='right'">
		<img src="../assets/error.png" class="img-responsive center-block" v-if="imgStatus=='error'">

		<div class="buttondiv">
		<button type="button" class="btn btn-primary btn-lg fr" v-if="current<44 && showNext" @click="nextPage">Next test >></button> 
		</div>	 
		<!--isselected:{{isselected}},  isselectright:{{isselectright}}-->
	</div> 
</div>
</template>

<script>
import store from '@/vuex/store'
import { mapState, mapMutations, mapGetters } from 'vuex'
export default{
	name: 'item',
	data() {
		return {
			msg: 'test begin!',
			claname: 'btn btn-default btn-lg'
		}
	},
	store,
	computed: {
		...mapState(['count','rightnum','errornum','current','imgurl','imgStatus','showNext','items','isselected','isselectright']),
		...mapGetters(['itemss','answer'])
	},
	methods: {
		...mapMutations(['rightAdd','errorAdd','changeErrorImg','changeShowNext','nextpage','changeSelected','changeSelectright']),
		add: function(){
			this.$store.commit('rightAdd')
		},
		selected: function(index,e){
			console.log(e.target.className);
			// not selected any option
			if(this.isselected==false){
				if(index==this.answer){
					this.changeErrorImg({text:'right'});
					this.changeShowNext();
					this.rightAdd();
					this.changeSelected();
					this.changeSelectright();
					e.target.className="btn btn-default btn-lg btn-success";
				}else{
					this.changeErrorImg({text:'error'});
					this.errorAdd();
					this.changeSelected();
					e.target.className="btn btn-default btn-lg btn-danger";
				}
			}else{
				// not select right
				if(this.isselectright==false){
					if(index==this.answer){
						this.changeShowNext();
						this.changeSelected();
						this.changeSelectright();	
						e.target.className="btn btn-default btn-lg btn-success";
					}else{
						e.target.className="btn btn-default btn-lg btn-danger";
					}
				}else{
					this.changeSelected();
					e.target.className="btn btn-default btn-lg btn-danger";
				}
			}  
		},
		nextPage: function(){
			this.nextpage();
			this.changeErrorImg({text:'consider'});
			this.changeShowNext();
			document.getElementsByClassName("bt").className="sdfsd"
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
p{ font-size: 25px; padding: 10px; border-radius: 5px; }
.fr{ float: right }
</style>