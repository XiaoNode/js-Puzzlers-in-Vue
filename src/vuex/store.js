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
			'notic': 'what you actually get is [1, NaN, NaN] because parseInt takes two parameters (val, radix) and map passes 3 (element, index, array)',
			'selected': false,
			'selectright': false
		},
		{
			'title': 'What is the result of this expression? (or multiple ones)',
			'question': '[typeof null, null instanceof Object]',
			'select': ['["object", false]','[null, false]','["object", true]','other'],
			'answer': 1,
			'notic': 'typeof will always return "object" for native non callable objects.',
			'selected': false,
			'selectright': false
		},
		{
			'title': 'What is the result of this expression? (or multiple ones)',
			'question': '[ [3,2,1].reduce(Math.pow), [].reduce(Math.pow) ]',
			'select': ['an error','[9, 0]','[9, NaN]','[9, undefined]'],
			'answer': 1,
			'notic': 'Per spec: reduce on an empty array without an initial value throws TypeError',
			'selected': false,
			'selectright': false
		}		
	]
}

const mutations={
	rightAdd: state => state.rightnum++,
	errorAdd: state => state.errornum++, 
	changeErrorImg: (state,{text})=>{
		state.imgStatus=text; 
	},
	changeShowNext: state => state.showNext=!state.showNext,
 	changeSelected: state => state.items[state.current].selected=true,
 	changeSelectright: state => state.items[state.current].selectright=true,
	nextpage: state => state.current++
}

const getters={
	itemss: state => state.items.slice(state.current,state.current+1),
	answer: state => state.items[state.current].answer,
	isselected: state => state.items[state.current].selected,
	isselectright: state => state.items[state.current].selectright
}

export default new Vuex.Store({
	state,mutations,getters
})