import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

const state={
	count: 44,
	rightnum: 0,
	errornum: 0,
	current: 1,
	imgurl: '../assets/right.png',
	imgStatus: 'consider',
	showNext: false
}

const mutations={
	rightAdd(state){ 
		state.rightnum++
	},
	errorAdd(state){
		state.errornum++
	}
}

const getters={
	count:function (state) {
		console.log("getters");
		return state.count+=10
	}
}

export default new Vuex.Store({
	state,mutations,getters
})