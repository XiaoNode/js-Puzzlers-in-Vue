import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

const state={
	count: 44,
	rightnum: 0,
	errornum: 0,
	current: 0,
	imgurl: '../assets/right.png',
	imgStatus: 'consider',
	showNext: false,
	items: [
		{
			'title': 'What is the result of this expression? (or multiple ones)',
			'question': '["1", "2", "3"].map(parseInt)',
			'select': ['["1", "2", "3"]','[1, 2, 3]','[0, 1, 2]','other'],
			'answer': 4,
			'notic': 'what you actually get is [1, NaN, NaN] because parseInt takes two parameters (val, radix) and map passes 3 (element, index, array)'
		},
		{
			'title': 'What is the result of this expression? (or multiple ones)',
			'question': '[typeof null, null instanceof Object]',
			'select': ['["object", false]','[null, false]','["object", true]','other'],
			'answer': 1,
			'notic': 'typeof will always return "object" for native non callable objects.'
		}
	]
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
	itemss:function (state) {  
		return state.items.slice(state.current,state.current+1)
	},
	answer:function (state) {  
		return state.items.slice(state.current,state.current+1)
	}
}

export default new Vuex.Store({
	state,mutations,getters
})