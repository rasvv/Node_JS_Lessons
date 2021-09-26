console.log('1');

setTimeout(() => {
 console.log('2');
 Promise.resolve().then(() => {
   setTimeout(() => {
     console.log('3');
     Promise.resolve().then(() => {
       console.log('4');
     })
   })
 }) 
});

console.log('5');

Promise.resolve().then(() => Promise.resolve().then(() =>  console.log('6')))