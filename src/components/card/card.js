const template = document.createElement('template');

template.innerHTML = `
  <link href="/dist/style.css" rel="stylesheet">
  <div class="">
    test
  </div>
`
export default class NavBar extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({mode: 'open'});
    shadow.appendChild(template.content);
  }
}
