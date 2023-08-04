import NavBar from "./components/navbar/navbar.js";
import Footer from "./components/footer/footer.js";


customElements.define('nav-bar', NavBar);
customElements.define('footer-comp', Footer);

const urlList = [
  {
    title: 'paint',
    link: './src/apps/paint/index.html'
  },
  {
    title: 'clock',
    link: './src/apps/clock/index.html'
  },
  {
    title: 'drag-drop',
    link: './src/apps/drag-drop-select/index.html'
  },
]

const list = document.querySelector('#projectList');

urlList.forEach(url => {
  const li = document.createElement('li');
  const template = `
    <a href="${url.link}">${url.title}</a>
  `
  li.innerHTML = template;
  list.appendChild(li);
})

