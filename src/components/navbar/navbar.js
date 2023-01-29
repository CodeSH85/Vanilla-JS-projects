const template = document.createElement('template');

template.innerHTML = `
  <link href="/dist/style.css" rel="stylesheet">
  <nav class="w-full py-2 px-3 bg-slate-400">
    <ul class="flex flex-row mr-auto ml-auto">
      <li class="mx-2 px-2 text-center">
        <img src="" alt="logo">
      </li>
      <li class="grow">

      </li>
      <li class="mx-2 px-2 text-center hover:bg-red-300">
        About
      </li>
      <li class="mx-2 px-2 text-center">
        Menu
      </li>
    </ul>
  </nav>
`

export default class NavBar extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({mode: 'open'});
    // shadow.appendChild(style);
    // shadow.appendChild(wrapper);
    shadow.appendChild(template.content);
  }
}

// customElements.define('nav-bar', NavBar);

