import {rejects} from "assert";


// Event loop
// https://learn.javascript.ru/event-loop
// https://habr.com/ru/company/ruvds/blog/340508/
// https://www.youtube.com/watch?v=8aGhZQkoFbQ
// https://www.youtube.com/watch?v=j4_9BZezSUA
// https://www.jsv9000.app/

// Promise
// https://learn.javascript.ru/promise-basics
// https://www.youtube.com/watch?v=1idOY3C1gYU


// https://jsonplaceholder.typicode.com/posts/1
// https://habr.com/ru/company/oleg-bunin/blog/417461/?_ga=2.54695343.543933152.1602500664-1040035071.1596811661
//имитация fetch
let prom = new Promise((res, rej) => { //создание нового промиса с двумя колбэками res,rej//функция конструктор
    setTimeout((response) => {
        if (response.httpStatus >= 200 && response.httpStatus < 400) { //проверка что запрос пришел без ошибок
            res(response.data); //вызываем функцию res и отдаем ей результат запроса.и теперь в prom доступны результаты запроса
        } else {
rej(response.error);
        }
    }, 2000, {httpStatus: 200, data: {userName: 'Sveta', id: 1, status: 'active'}, error: {}})//сделаем имитацию запроса.третьим параметом в сеттаймаут попадают аргументы,которые будут приходить в функцию в момент вызова
});
//console.log(prom) //новый промис в состоянии panding со значением undefined
// когда промис зарезолвится, мы не можем напрямую получать данные-только с помощью методов:
//смоделируем случай: в результате запроса пллучили id и по этому id делаем второй запрос на другой сервер:
prom.then(
    res => {
    return new Promise((res, rej) => { //создание нового промиса с двумя колбэками res,rej//функция конструктор
        setTimeout((response) => {
            if (response.httpStatus >= 200 && response.httpStatus < 400) { //проверка что запрос пришел без ошибок
                res(response.data); //вызываем функцию res и отдаем ей результат запроса.и теперь в prom доступны результаты запроса
            } else {
                rej(response.error);
            }
        }, 1200, {httpStatus: 200, data: { id: 1, count:68786898}, error: {}})//сделаем имитацию запроса.третьим параметом в сеттаймаут попадают аргументы,которые будут приходить в функцию в момент вызова
    });
    },err =>{ //это вторпой колбэк в методе зен и он срабатывает когда у нас промис reject

        console.log(err)
    })
    .then(res2 => {
       console.log(res2);
    },err2=>{      //второй колбэк отвечает за  rejecta. если не укажем, то на реджект зен  не сработает
        console.log(err2);
    })
    // .then(null,err3=>{
    //     console.log(err3)  //заглушка для перехвата ошибок
    // })
    .catch(err=>{     //более современный метод вместо заглушки
        console.log(err)
    })


fetch('https://jsonplaceholder.typicode.com/posts/1')
    .then((response) => response.json()) //это метод который возращает данные для нас
    .then((json)=>{
        console.log(json);
        return fetch('https://jsonplaceholder.typicode.com/posts')
    } )
    .then((resp)=>resp.json())
    .then((json) =>{
        console.log(json)
        return fetch('https://jsonplaceholder.typicode.com/posts')
    })

///////////////////////////////////////////////////////////////

let promise = new Promise((res, rej) => { //создание нового промиса с двумя колбэками res,rej//функция конструктор
    setTimeout((response) => {
        if (response.httpStatus >= 200 && response.httpStatus < 400) { //проверка что запрос пришел без ошибок
            res(response.data); //вызываем функцию res и отдаем ей результат запроса.и теперь в prom доступны результаты запроса
        } else {
            rej(response.error);
        }
    }, 2000, {httpStatus: 200, data: {userName: 'Sveta', id: 1, status: 'active'}, error: {}})//сделаем имитацию запроса.третьим параметом в сеттаймаут попадают аргументы,которые будут приходить в функцию в момент вызова
});

promise
    .then(console.log) //пришел ответ и его сразу в console.log запихнули. console.log
// ничего не возращает  -поэтому следующий зен будет undefined


