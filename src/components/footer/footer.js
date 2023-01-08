const template = document.createElement('template');

template.innerHTML = `
  <link href="/dist/style.css" rel="stylesheet">
  <footer class="flex justify-center w-full py-2 px-3 bg-blue-400">
    <a class="p-2" href="https://github.com/CodeSH85" target="_blank">github</a>
  </footer>
`

export default class Footer extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({mode: 'open'});
    shadow.appendChild(template.content);
  }
}
