import menu from './tabs.json' assert {type: 'json'};
import articles from './article.json' assert {type: 'json'};

const ul = document.querySelector('#list');
const view = document.querySelector('#view');

let current = 0;

menu.forEach((tab, index) => {
  let list = document.createElement('li');
  list.classList.add('tab');
  let btn = document.createElement('button');
  btn.innerText = tab.title;
  btn.classList.add('btn');
  list.appendChild(btn);
  ul.appendChild(list);
  view.innerHTML = articles[0].content;

  btn.addEventListener('click', (e) => {
    let btns = document.querySelectorAll('button');
    changeView(articles, index);
    btns.forEach( btn => {
      btn.classList.remove('active');
    })
    e.target.classList.add('active');
  });

});

function changeView(file, index) {
  console.log(index);
  view.innerHTML = file[index].content;
}

