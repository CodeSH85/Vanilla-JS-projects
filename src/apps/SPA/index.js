const useHash = false;
const mainView = document.querySelector('#mainView');

document.addEventListener('click', e => {
  const { target } = e;
  if (!target.matches('nav a')) {
    return;
  }
  e.preventDefault();
  urlRoute();
})

const routes = {
  "404": {
    title: "404 Not Found",
    template: "/templates/404.html",
    description: "",
  },
  "/src/SPA/": {    
    title: "Home",
    template: "/templates/index.html",
    description: "",
  },
  "/src/SPA/about": {    
    title: "About",
    template: "/templates/about.html",
    description: "",
  },
  "/src/SPA/service": {    
    title: "service",
    template: "/templates/service.html",
    description: "",
  }
}

const urlRoute = (event) => {
  event = event || window.event;
  event.preventDefault();
  window.history.pushState(null, "", event.target.href);
  urlLocationHandler();
}

const urlLocationHandler = async() => {
  const location = window.location.pathname;
  if (location.length === 0) {
    location = "/";
  }

  const route = routes[location] || routes['404'];
  const html = await fetch(route.template).then( res => {
    res.text();
  })
  mainView.innerHTML = html;
}

