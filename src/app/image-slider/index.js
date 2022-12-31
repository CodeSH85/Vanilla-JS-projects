const pics = [
  '1', '2', '3', '4'
]

const displayArea = document.querySelector('#display');
const show = document.createElement('div');
show.style.backgroundImage = '';

let counter = 0;
for(let i = 0; i < pics.length; i++) {
  setInterval(()=>{
    // console.log(pics[getRandomNum(pics)])
  }, 3000)
}
