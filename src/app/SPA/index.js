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
  "/": {    
    title: "Home",
    template: "/templates/index.html",
    description: "",
  },
  "about": {    
    title: "About",
    template: "/templates/about.html",
    description: "",
  },
  "/": {    
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

}

const useHash = false;
