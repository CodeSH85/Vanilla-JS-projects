const textDisplay = document.querySelector('#display');
const card = document.querySelector('#card');
const clock = document.querySelector('#clock');
const secondHand = document.querySelector('#secondHand');

setInterval(()=>{
  const hour = new Date().getHours();
  const minute = new Date().getMinutes();
  let second = new Date().getSeconds();
  const day = new Date().getDay();
  const date = new Date().getDate();
  const month = new Date().getMonth();
  const year = new Date().getFullYear();
  let now = `${year} ${month+1} / ${date} / ${hour} : ${minute} : ${second}`;
  textDisplay.innerHTML = now;
  
  second = second * 360/60;

  secondHand.style.transform = `rotate(${second}deg)`;

},1000)

for(let i = 0; i <= 360; i++) {

  if (i % 30 === 0 && i != 0) {
    let min = document.createElement('div');
    min.classList.add('clock-text');
    min.style.transform = `rotate(${i}deg)`;
    clock.appendChild(min);
  }
  if (i%6===0 && i!==0) {
    let sec = document.createElement('div');
    sec.classList.add('clock-text');
    sec.classList.add('sec-text');
    sec.style.transform = `rotate(${i}deg)`;
    clock.appendChild(sec);
  }
}