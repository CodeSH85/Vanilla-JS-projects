const mainView = document.querySelector('#mainView');
const startBtn = document.querySelector('#startBtn');

const templateOne = `<h1>Hello World! One</h1>`;
const templateTwo = `
  <h1>
    Hello World! Three
  </h1>
  <button id="toTwo">To Two</button>
`;
const templateThree = `<h1>Hello World! Two</h1>`;

const templates = {
  one: templateOne,
  two: templateTwo,
  three: templateThree
};

const toTwo = querySelector()

startBtn.addEventListener('click', e => {
  history.pushState(null, ",", "one");
  mainView.innerHTML = templateOne;
})

const render = (url) => {
  mainView.innerHTML = templates[url];
}

const init = () => {
  if (window.location.pathname.includes('one')) {
    render('one');
  }
  if (window.location.pathname.includes('two')) {
    render('two');
  }
  if (window.location.pathname.includes('three')) {
    render('three');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  history.pushState(null, "", 'one');
  init();
})
