//Q1:
let x=5;
let y=6;
 
function sum (x,y){
    return x+y;
}
console.log(sum(x,y));
console.log(sum(8,12));
///////////////////////////////////////////////////
//Q2:
function isPalindrome(str){
    let str2 = '';
    for (let i = str.length -1; i>=0; i--){
        str2 += str[i];
    }
        if (str2 == str){
            return true;   
        } else{
            return false;
        }   
    }

let str3 = 'yoloy'
console.log(isPalindrome(str3))

///////////////////////////////////////////////////
//Q3:
let nameString = "yomna";
function reverseString(){
    return nameString.split('').reverse().join('')
}
console.log(reverseString())

///////////////////////////////////////////////////
//Q4:
let arr =[1,2,3,4,5]
let arrEven= []
for (let i of arr) {
    if (i % 2 === 0) {
        arrEven.push(i);
    }
}
console.log (arrEven)

////////////////////////////////////////////////////
//Q5:

////////////////////////////////////////////////////
//Q6:
var str= '';
function reverseStr (str2){

    for (let i =  str2.length-1; i>=0; i-- ){
        str += str2[i];
    }
    return str;
}
console.log(reverseStr('yomna'));

///////////////////////////////////////////////////////////
//Q7:
function sumArr(arr){
    let sum = 0;
    for (let i=0; i<arr.length; i++){
        sum += arr[i]
    }
    return sum ;
}
console.log(sumArr([1,2,3]))
//////////////////////////////////////////////////////////////
//Q8
function fact(num){
    if (num === 0){
        return 1;
    }
    return num * fact(num -1)
}
console.log(fact(5));

//////////////////////////////////////////////////////////////
//Q9:
function avgVal (arr){
    let avg = 0;
    for (let i=0; i<arr.length; i++ ){
        avg += arr[i]/2
    }
    return avg;
}
console.log(avgVal([1,2,3]))

/////////////////////////////////////////////////////////////////
//Q10
function calcIndex(arr, x) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === x) {
            return i; 
        }
    }
    return -1; 
}
// using indexof :
function calcIndex2(arr, x){
    return arr.indexOf (x)
}
let arr2 =['a', 'b', 'c'];

console.log(calcIndex(arr2, 3));
console.log(calcIndex2(arr2, '4'))

////////////////////////////////////////////////////////////////
//Q11:
console.log(Number.isInteger(42));

//with function
function isInteger(num) {
    return Number.isInteger(num);
}
console.log(isInteger(9));

////////////////////////////////////////////////////////////////////
//Q12:
function calcAge(age){
    return age * 365;
}
console.log(calcAge(27));
////////////////////////////////////////////////////////////////////
//Q13

//The ability of a JavaScript function to accept another function as an argument
function sayHello(callBack){
    callBack()
}
sayHello(function(){
    console.log('say Hellooo');
})