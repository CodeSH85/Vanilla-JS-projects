const pics = [
  '1', '2', '3', '4'
]

const displayArea = document.querySelector('#display');

let counter = 0;
// setInterval(()=>{
  for(let i = 0; i < pics.length; i++) {
    console.log(pics[getRandomNum(pics)])
  }
// }, 3000)

function getRandomNum(arr) {
  return Math.floor(Math.random() * arr.length);
}

let num = getRandomNum(pics)
