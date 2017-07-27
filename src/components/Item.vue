<template>
<div>
	<div class="toptic">
		<h1>Total process: {{rightnum + errornum}} of {{count}}</h1>
	</div> 

	<div v-for="item in itemss">
		<h2>{{ item.title }}</h2>
		<pre v-html="item.question"></pre>
		<div class="buttondiv bt">
		<!-- :class="{'has_choosed':choosedNum==index}" -->
			<button type="button" class="btn btn-default btn-lg" :class="[{ 'btn-success' : ((index+1) == item.answer) && isThis == item.answer}, { 'btn-danger' : ((index+1) != item.answer) && errorArr.indexOf((index+1)) > -1 }]" @click="selected(index+1,$event)" v-for="(i ,index) in item.select">
			{{ i }} 
			</button>	
		</div>

		<img src="../assets/consider.gif" class="img-responsive center-block" v-if="imgStatus=='consider'">
		<img src="../assets/right.gif" class="img-responsive center-block" v-if="imgStatus=='right'">
		<img src="../assets/error.gif" class="img-responsive center-block" v-if="imgStatus=='error'">
		
		<p v-if="isselectright" class="bg-info" v-html="item.notic"> </p>		

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
			isThis: 0 ,
			errorArr: ''
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
			 this.errorArr+=index;
			 // console.log(this.errorArr);
			// not selected any option
			if(this.isselected==false){
				if(index==this.answer){
					this.changeErrorImg({text:'right'});
					this.changeShowNext();
					this.rightAdd();
					this.changeSelected();
					this.changeSelectright(); 
					this.isThis=index;
				}else{
					this.changeErrorImg({text:'error'});
					this.errorAdd();
					this.changeSelected(); 
				}
			}else{
				// not select right
				if(this.isselectright==false){
					if(index==this.answer){
						this.changeShowNext();
						this.changeSelected();
						this.changeSelectright();	 
						this.isThis=index;
					}else{ 
					}
				}else{
					this.changeSelected(); 
				}
			}  
		},
		nextPage: function(){
			if((this.rightnum + this.errornum) < this.count){
				this.nextpage();
				this.changeErrorImg({text:'consider'});
				this.changeShowNext();
				this.isThis= 0;
				this.errorArr = "";				
			}else{
				this.$router.push({ path: '/result' });
			}
		}
	}
}
</script>

<style>
.toptic{float: right; color: #F47A52;}
h2{ margin-bottom: 30px }
pre{ font-size: 160%; color: #f92659 }
.buttondiv{ margin: 30px 0 }
.buttondiv button{ margin: 0 10px }
p{ font-size: 25px; padding: 10px; border-radius: 5px; }
.fr{ float: right } 
img{ width: 12rem }
</style>