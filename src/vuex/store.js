import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

const state={
	count:1
}

const mutations={
	add(state,n){
		console.log("mutations");
		state.count+=n;
	},
	reduce(state){
		state.count--
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