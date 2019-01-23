import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

const state = {
	count: 33,
	rightnum: 0,
	errornum: 0,
	current: 0,
	imgurl: '../assets/right.gif',
	imgStatus: 'consider',
	showNext: false,
	isselected: false,
	isselectright: false,
	items: [
		{
			'title': 'What is the result of this expression? (or multiple ones)',
			'question': `["1", "2", "3"].map(parseInt)`,
			'select': ['["1", "2", "3"]', '[1, 2, 3]', '[0, 1, 2]', 'other'],
			'answer': 4,
			'notic': 'what you actually get is <code>[1, NaN, NaN]</code> because <code>parseInt</code> takes two parameters (val, radix) and <code>map</code> passes <b>3</b> (element, index, array)'
		},
		{
			'title': 'What is the result of this expression? (or multiple ones)',
			'question': `[typeof null, null instanceof Object]`,
			'select': ['["object", false]', '[null, false]', '["object", true]', 'other'],
			'answer': 1,
			'notic': '<code>typeof</code> will always return "<code>object</code>" for native non callable objects.'
		},
		{
			'title': 'What is the result of this expression? (or multiple ones)',
			'question': `[ [3,2,1].reduce(Math.pow), [].reduce(Math.pow) ]`,
			'select': ['an error', '[9, 0]', '[9, NaN]', '[9, undefined]'],
			'answer': 1,
			'notic': 'Per spec: reduce on an empty array without an initial value throws <code>TypeError</code>'
		},
		{
			'title': "What is the result of this expression? (or multiple ones)",
			'question':
				`
var val = 'smtg'; 
console.log('Value is ' + (val === 'smtg') ? 'Something' : 'Nothing');
				`
			,
			'select': ['Value is Something', 'Value is Nothing', 'NaN', 'other'],
			'answer': 4,
			'notic': "it actually prints '<code>Something</code>' the + operator has higher precedence than the ternary one."
		},
		{
			'title': "What is the result of this expression? (or multiple ones)",
			'question':
				`
var name = 'World!';
(function () {
    if (typeof name === 'undefined') {
        var name = 'Jack';
        console.log('Goodbye ' + name);
    } else {
        console.log('Hello ' + name);
    }
})();
        `
			,
			'select': ['Goodbye Jack', 'Hello Jack', 'Hello undefined', 'Hello World'],
			'answer': 1,
			'notic': "The <code>var</code> declaration is hoisted to the function scope, but the initialization is not.."
		},
		{
			'title': "What is the result of this expression? (or multiple ones)",
			'question':
				`
var END = Math.pow(2, 53);
var START = END - 100;
var count = 0;
for (var i = START; i <= END; i++) {
    count++;
}
console.log(count);
				`
			,
			'select': ['0', '100', '101', 'other'],
			'answer': 4,
			'notic': "it goes into an infinite loop, 2^53 is the highest possible number in javascript, and 2^53+1 gives 2^53, so i can never become larger than that."
		},
		{
			'title': "What is the result of this expression? (or multiple ones)",
			'question':
				`
var ary = [0,1,2];
ary[10] = 10;
ary.filter(function(x) { return x === undefined;});
				`
			,
			'select': ['[undefined × 7]', '[0, 1, 2, 10]', '[]', '[undefined]'],
			'answer': 3,
			'notic': "<code>Array.prototype.filter</code> is not invoked for the missing elements."
		},
		{
			'title': "What is the result of this expression? (or multiple ones)",
			'question':
				`
var two   = 0.2
var one   = 0.1
var eight = 0.8
var six   = 0.6
[two - one == one, eight - six == two]
				`
			,
			'select': ['[true, true]', '[false, false]', '[true, false]', 'other'],
			'answer': 3,
			'notic': "JavaScript does not have precision math, even though sometimes it works correctly."
		},
		{
			'title': "What is the result of this expression? (or multiple ones)",
			'question':
				`
function showCase(value) {
    switch(value) {
    case 'A':
        console.log('Case A');
        break;
    case 'B':
        console.log('Case B');
        break;
    case undefined:
        console.log('undefined');
        break;
    default:
        console.log('Do not know!');
    }
}
showCase(new String('A'));
				`
			,
			'select': ['Case A', 'Case B', 'Do not know!', 'undefined'],
			'answer': 3,
			'notic': "<code>switch</code> uses <code>===</code> internally and <code>new String(x) !== x</code>"
		},
		{
			'title': "What is the result of this expression? (or multiple ones)",
			'question':
				`
function showCase2(value) {
    switch(value) {
    case 'A':
        console.log('Case A');
        break;
    case 'B':
        console.log('Case B');
        break;
    case undefined:
        console.log('undefined');
        break;
    default:
        console.log('Do not know!');
    }
}
showCase2(String('A'));
				`
			,
			'select': ['Case A', 'Case B', 'Do not know!', 'undefined'],
			'answer': 1,
			'notic': "<code>String(x)</code> does not create an object but does return a string, i.e. <code>typeof String(1) === 'string'</code>"
		},
		{
			'title': "What is the result of this expression? (or multiple ones)",
			'question':
				`
function isOdd(num) {
    return num % 2 == 1;
}
function isEven(num) {
    return num % 2 == 0;
}
function isSane(num) {
    return isEven(num) || isOdd(num);
}
var values = [7, 4, '13', -9, Infinity];
values.map(isSane);
				`
			,
			'select': ['[true, true, true, true, true]', '[true, true, true, true, false]', '[true, true, true, false, false]', '[true, true, false, false, false]'],
			'answer': 3,
			'notic': "<code>Infinity % 2</code> gives <code>NaN</code>, <code>-9 % 2</code> gives <code>-1</code> (modulo operator keeps sign so it's result is only reliable compared to 0)"
		},
		{
			'title': "What is the result of this expression? (or multiple ones)",
			'question':
				`
parseInt(3, 8)
parseInt(3, 2)
parseInt(3, 0)
				`
			,
			'select': ['3, 3, 3', '3, 3, NaN', '3, NaN, NaN', 'other'],
			'answer': 4,
			'notic': "<code>3</code> doesn't exist in base <code>2</code>, so obviously that's a <code>NaN</code>, but what about <code>0</code>? <code>parseInt</code> will consider a bogus radix and assume you meant <code>10</code>, so it returns <code>3</code>."
		},
		{
			'title': "What is the result of this expression? (or multiple ones)",
			'question':
				`
Array.isArray( Array.prototype )
				`
			,
			'select': ['true', 'false', 'error', 'other'],
			'answer': 1,
			'notic': "<code>Array.prototype</code> is an <code>Array</code>. Go figure."
		},
		{
			'title': "What is the result of this expression? (or multiple ones)",
			'question':
				`
var a = [0];
if ([0]) {
  console.log(a == true);
} else {
  console.log("wut");
}
				`
			,
			'select': ['true', 'false', 'wut', 'other'],
			'answer': 2,
			'notic': "<code>[0]</code> as a boolean is considered <code>true</code>. Alas, when using it in the comparisons it gets converted in a different way and all goes to hell."
		},
		{
			'title': "What is the result of this expression? (or multiple ones)",
			'question':
				`
[]==[]
				`
			,
			'select': ['true', 'false', 'error', 'other'],
			'answer': 2,
			'notic': "<code>==</code> is the spawn of satan."
		},
		{
			'title': "What is the result of this expression? (or multiple ones)",
			'question':
				`
'5' + 3
'5' - 3
				`
			,
			'select': ["‘53’,2", '8,2', 'error', 'other'],
			'answer': 1,
			'notic': "Strings know about <code>+</code> and will use it, but they are ignorant of <code>-</code> so in that case the strings get converted to numbers."
		},
		{
			'title': "What is the result of this expression? (or multiple ones)",
			'question':
				`
1 + - + + + - + 1
				`
			,
			'select': ['2', '1', 'error', 'other'],
			'answer': 1,
			'notic': "Great fun."
		},
		{
			'title': "What is the result of this expression? (or multiple ones)",
			'question':
				`
var ary = Array(3);
ary[0]=2
ary.map(function(elem) { return '1'; });
				`
			,
			'select': ['[2, 1, 1]', '["1", "1", "1"]', '[2, "1", "1"]', 'other'],
			'answer': 4,
			'notic': "The result is <code>['1', undefined × 2]</code>, as <code>map</code> is only invoked for elements of the <code>Array</code> which have been initialized."
		},
		{
			'title': "What is the result of this expression? (or multiple ones)",
			'question':
				`
function sidEffecting(ary) {
  ary[0] = ary[2];
}
function bar(a,b,c) {
  c = 10
  sidEffecting(arguments);
  return a + b + c;
}
bar(1,1,1)
				`
			,
			'select': ['3', '12', 'error', 'other'],
			'answer': 4,
			'notic': "The result is <code>21</code>, in javascript variables are tied to the <code>arguments</code> object so changing the variables changes <code>arguments</code> and changing arguments changes the local variables even when they are not in the same scope."
		},
		{
			'title': "What is the result of this expression? (or multiple ones)",
			'question':
				`
var a = 111111111111111110000,
    b = 1111;
a + b;
				`
			,
			'select': ['111111111111111111111', '111111111111111110000', 'NaN', 'Infinity'],
			'answer': 2,
			'notic': "Lack of precision for numbers in JavaScript affects both small and big numbers."
		},
		{
			'title': "What is the result of this expression? (or multiple ones)",
			'question':
				`
var x = [].reverse;
x();
				`
			,
			'select': ['[]', 'undefined', 'error', 'window'],
			'answer': 4,
			'notic': "<code>[].reverse</code> will return <code>this</code> and when invoked without an explicit receiver object it will default to the default <code>this</code> AKA <code>window</code>"
		},
		{
			'title': "What is the result of this expression? (or multiple ones)",
			'question':
				`
Number.MIN_VALUE > 0
				`
			,
			'select': ['false', 'true', 'error', 'other'],
			'answer': 2,
			'notic': "<code>Number.MIN_VALUE</code> is the smallest value bigger than zero, <code>-Number.MAX_VALUE</code> gets you a reference to something like the most negative number."
		},
		{
			'title': "What is the result of this expression? (or multiple ones)",
			'question':
				`
[1 < 2 < 3, 3 < 2 < 1]
				`
			,
			'select': ['[true, true]', '[true, false]', 'error', 'other'],
			'answer': 1,
			'notic': "This is parsed as <code>(1 > 2) > 3</code> and <code>(3 > 2) > 1</code>.Than it's implicit conversions at work:  <code>true</code> gets intified and is <code>1</code>, while false gets intified and becomes <code>0</code>."
		},
		{
			'title': "What is the result of this expression? (or multiple ones)",
			'question':
				`
// the most classic wtf
2 == [[[2]]]
				`
			,
			'select': ['true', 'false', 'undefined', 'other'],
			'answer': 1,
			'notic': "both objects get converted to strings and in both cases the resulting string is <code>'2'</code>"
		},
		{
			'title': "What is the result of this expression? (or multiple ones)",
			'question':
				`
3.toString()
3..toString()
3...toString()
				`
			,
			'select': ['"3", error, error', '"3", "3.0", error', 'error, "3", error', 'other'],
			'answer': 3,
			'notic': "<code>3.x</code> is a valid syntax to define '3' with a mantissa of <code>x</code>, <code>toString</code> is not a valid number, but the empty string is."
		},
		{
			'title': "What is the result of this expression? (or multiple ones)",
			'question':
				`
(function(){
  var x = y = 1;
})();
console.log(y);
console.log(x);
				`
			,
			'select': ['1, 1', 'error, error', '1, error', 'other'],
			'answer': 3,
			'notic': "<code>y</code> is an automatic global, not a function local one."
		},
		{
			'title': "What is the result of this expression? (or multiple ones)",
			'question':
				`
var a = /123/,
    b = /123/;
a == b
a === b
				`
			,
			'select': ['true, true', 'true, false', 'false, false', 'other'],
			'answer': 3,
			'notic': "Per spec Two regular expression literals in a program evaluate to regular expression objects that never compare as === to each other even if the two literals' contents are identical."
		},
		{
			'title': "What is the result of this expression? (or multiple ones)",
			'question':
				`
var a = [1, 2, 3],
    b = [1, 2, 3],
    c = [1, 2, 4]
a ==  b
a === b
a >   c
a <   c
				`
			,
			'select': ['false, false, false, true', 'false, false, false, false', 'true, true, false, true', 'other'],
			'answer': 1,
			'notic': "Arrays are compared lexicographically with <code>&gt;</code> and <code>&lt;</code>, but not with <code>==</code> and <code>===</code>"
		},
		{
			'title': "What is the result of this expression? (or multiple ones)",
			'question':
				`
var a = {}, b = Object.prototype;
[a.prototype === b, Object.getPrototypeOf(a) === b]
				`
			,
			'select': ['[false, true]', '[true, true]', '[false, false]', 'other'],
			'answer': 1,
			'notic': "Functions have a <code>prototype</code> property but other objects don't so <code>a.prototype</code> is <code>undefined</code>.Every <code>Object</code> instead has an internal property accessible via <code>Object.getPrototypeOf</code>."
		},
		{
			'title': "What is the result of this expression? (or multiple ones)",
			'question':
				`
function f() {}
var a = f.prototype, b = Object.getPrototypeOf(f);
a === b
				`
			,
			'select': ['true', 'false', 'null', 'other'],
			'answer': 2,
			'notic': " <code>f.prototype</code> is the object that will become the parent of any objects created with <code>new f</code> while <code>Object.getPrototypeOf</code> returns the parent in the inheritance hierarchy."
		},
		{
			'title': "What is the result of this expression? (or multiple ones)",
			'question':
				`
function foo() { }
var oldName = foo.name;
foo.name = "bar";
[oldName, foo.name]
				`
			,
			'select': ['error', '["", ""]', '["foo", "foo"]', '["foo", "bar"]'],
			'answer': 3,
			'notic': "<code>name</code> is a read only property. Why it doesn't throw an error when assigned, I do not know."
		},
		{
			'title': "What is the result of this expression? (or multiple ones)",
			'question':
				`
"1 2 3".replace(/\d/g, parseInt)
				`
			,
			'select': ['"1 2 3"', '"0 1 2"', '"NaN 2 3"', '"1 NaN 3"'],
			'answer': 4,
			'notic': "<code>String.prototype.replace</code> invokes the callback function with multiple arguments where the first is the match, then there is one argument for each capturing group, then there is the offset of the matched substring and finally the original string itself. so <code>parseInt</code> will be invoked with arguments <code>[1, 0]</code>, <code>[2, 2]</code>, <code>[3, 4]</code>."
		},
		{
			'title': "What is the result of this expression? (or multiple ones)",
			'question':
				`
function f() {}
var parent = Object.getPrototypeOf(f);
f.name // ?
parent.name // ?
typeof eval(f.name) // ?
typeof eval(parent.name) //  ?
				`
			,
			'select': ['"f", "Empty", "function", "function"', '"f", undefined, "function", error', '"f", "Empty", "function", error', 'other'],
			'answer': 3,
			'notic': "The function prototype object is defined somewhere, has a name, can be invoked, but it's not in the current scope."
		}
	]
}

const mutations = {
	rightAdd: state => state.rightnum++,
	errorAdd: state => state.errornum++,
	changeErrorImg: (state, { text }) => {
		state.imgStatus = text;
	},
	changeShowNext: state => state.showNext = !state.showNext,
	changeSelected: state => state.isselected = true,
	changeSelectright: state => state.isselectright = true,
	nextpage: state => {
		state.current++;
		state.isselected = false;
		state.isselectright = false
	}
}

const getters = {
	itemss: state => state.items.slice(state.current, state.current + 1),
	answer: state => state.items[state.current].answer
}

export default new Vuex.Store({
	state, mutations, getters
})