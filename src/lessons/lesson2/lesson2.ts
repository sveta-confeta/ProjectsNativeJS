import {log} from "util";

console.log('lesson 2');



//Карирование:
// Реализовать функцию sum которая суммирует 2 числа следующим образом sum(3)(6) === 9
function sum(num:number){
    return function sum2(num2:number){
        return num+num2;
    }
}
//Рекурсия
function sumRecursion(num:number):number{ //например нам надо выходить из рекурсии когда мы дошли до 1
    if(num ===1) return num //достигли 1 ,вернули 1 и вышли// если num =1,то просто верните 1
    return num+sumRecursion( num-1);

}
console.log(sumRecursion(100));

//Замыкание
function makeCounter() {
    let count = 0;

    return function() {
        return ++count; // есть доступ к внешней переменной "count"
    };
}

let counter = makeCounter();
console.log(counter()); // 1
console.log(counter()); // 2
const counter2 = makeCounter();
console.log(counter2()); // 1
console.log(counter()); // 3



// Task 03
// Переписать функцию из Task 02 так, что бы она принимала число в качестве аргумента и это число было стартовым значением счетчика
// и возвращала следующий объект методов:

function numberCounter(num:number) {
    let count = num;


    return  function() {
        return count--;
    };
    return function() {
        return count++ // есть доступ к внешней переменной "count"
    };

}

// increase: +1
// decrease: -1
// reset: установить счетчик в 0;
// set: установить счетчик в заданное значение;


// Реализовать функцию superSum которая принимает число в качестве аргумента, которое указывает на количество слагаемых
// и что бы корректно работали следующие вызовы:
// 1) superSum(0) //0
// 2) superSum(3)(2)(5)(3) //10
// 3) superSum(3)(2)(5,3) //10
// 4) superSum(3)(2,5,3) //10
// 5) superSum(3)(2,5)(3) //10
// 6) superSum(3)(2,5)(3,9) //10

//1)
function superSum (n:number){
   if (n<=0){
       return 0;
}
}
///2)
function superSum2 (n:number){
   let otherParams:Array<number>=[];
   function inner (...arg:number[]){
       otherParams=[...otherParams,...arg]
       if(otherParams.length>=n){
           otherParams.length=n;
           return otherParams.reduce((acc,el)=>acc+el)
       }else {
           return inner;
       }
   }
   return inner;
}




// Task 05
//рекурсия

function sumTo(n:number){
    let result=0;
    for(let i=1;i>=n;n++){
        result=result +i;
    }
    return result;
}
let i=1;
function sumToRecursion(n:number){
console.log(i);
i++;
if(i<n){
    sumToRecursion(n)
}

}
sumToRecursion(5)

// Task 06
// написать функцию, которая повторяет функционал метода flat массива на всю глубину.
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat

// just a plug
export default () => {};


//https://learn.javascript.ru/task/filter-through-function
