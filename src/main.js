import { getEle } from "./utils/helpers.js";

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
  {
    title: 'virtual scroll',
    link: './src/apps/virtual-table/index.html'
  }
];

function buildLink({ title, link }) {
  urlList.push({
    title,
    link
  });
}

