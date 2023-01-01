const display = document.querySelector('#display');
const card = document.querySelector('#card');
const clock = document.querySelector('#clock');
const pointer = document.querySelector('#pointer');

setInterval(()=>{
  const hour = new Date().getHours();
  const minute = new Date().getMinutes();
  let second = new Date().getSeconds();
  const day = new Date().getDay();
  const date = new Date().getDate();
  const month = new Date().getMonth();
  const year = new Date().getFullYear();
  let now = `${year} ${month+1} / ${date} / ${hour} : ${minute} : ${second}`;
  display.innerHTML = now;
  
  second = second + 360/60;

  pointer.style.transform = `rotate(${second}deg)`;

},1000)


let classes = ['border-t-8', 'border-black', 'w-2', 'h-48', 'origin-bottom', 'fixed'];
let secClasses = ['border-t-6', 'border-gray-500', 'w-2', 'h-48', 'origin-bottom', 'fixed'];

for(let i = 0; i <= 360; i++) {

  let test = document.createElement('div');
  let sec = document.createElement('div');
  test.classList.add(...classes);
  sec.classList.add(...secClasses);
  if(i % 30 === 0 && i != 0) {
    test.classList.add(`rotate-${i}`);
    clock.appendChild(test);
  }
  if(i%6===0 && i!==0) {
    test.classList.add(`rotate-${i}`);

    clock.appendChild(sec);
  }
}