const textDisplay = document.querySelector('#display');
const card = document.querySelector('#card');
const clock = document.querySelector('#clock');
const textContainer = document.querySelector('#textContainer');
const secondHand = document.querySelector('#secondHand');
const minuteHand = document.querySelector('#minuteHand');
const hourHand = document.querySelector('#hourHand');

setInterval(()=>{
  let hour = new Date().getHours();
  let minute = new Date().getMinutes();
  let second = new Date().getSeconds();
  const day = new Date().getDay();
  const date = new Date().getDate();
  const month = new Date().getMonth();
  const year = new Date().getFullYear();
  let now = `${year} ${month+1} / ${date} / ${hour} : ${minute} : ${second}`;
  textDisplay.innerHTML = now;

  let totalSeconds = (hour * 60 + minute) * 60 + second;

  let secondAngle = totalSeconds * 360 / 60;
  let minuteAngle = totalSeconds * 360 / (60 * 60);
  let hourAngle = totalSeconds * 360 / (12 * 60 * 60);
  
  secondHand.style.transform = `rotate(${secondAngle}deg)`;
  minuteHand.style.transform = `rotate(${minuteAngle}deg)`;
  hourHand.style.transform = `rotate(${hourAngle}deg)`;
  
},1000)

for(let i = 0; i <= 360; i++) {

  if (i % 30 === 0 && i != 0) {
    let min = document.createElement('div');
    min.classList.add('clock-text');
    min.style.transform = `rotate(${i}deg)`;
    textContainer.appendChild(min);
  }
  if (i%6===0 && i!==0) {
    let sec = document.createElement('div');
    sec.classList.add('clock-text');
    sec.classList.add('sec-text');
    sec.style.transform = `rotate(${i}deg)`;
    textContainer.appendChild(sec);
  }
}