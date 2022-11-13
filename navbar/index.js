import menu from './tabs.json' assert {type: 'json'};
import articles from './article.json' assert {type: 'json'};

const ul = document.querySelector('#list');
const view = document.querySelector('#view');


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
    changeView(articles, index)
  });
});

function changeView(file, index) {
  console.log(index);
  view.innerHTML = file[index].content;
}
