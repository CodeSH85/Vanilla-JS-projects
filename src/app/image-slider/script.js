
document.addEventListener('DOMContentLoaded', ()=>{
  getImage();
  // let imgs = document.querySelectorAll('.img');
})

const image_range = 5;
const imgDisplay = document.querySelector('#imgDisplay');
const container = document.querySelector('#container');

function getImage() {
  for(let i = 1; i <= image_range; i++) {
    let image = document.createElement('img');
    image.src = `https://picsum.photos/1280/720?random=${i}`
    image.classList.add('img');
    imgDisplay.appendChild(image);
  }
}

imgDisplay.addEventListener('wheel', handleWheel, { passive: false });

function handleWheel(e) {
  e.preventDefault();
  imgDisplay.scrollLeft += e.deltaY;
  let imgs = document.querySelectorAll('.img');

  imgs.forEach((img, index) => {

    let i = index;

    setTimeout(makeDis.bind(null, i), i*1000)

    function makeDis() {
      console.log(i);
      img.classList.add('img-fade');
    }

  });  
}

