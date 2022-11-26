const VNode = (target, value) => {
  console.log(target);

  if(target == HTMLElement){
    console.log(target);
  }

  return new Proxy(target, {
    get: (target, key)=> {
      console.log(`Accessed: ${key}`);
      return Reflect.get(target, key);
    },
    set: (target, key, value, self)=> {
      console.log(`updated key: ${key} to ${value}`);
      Reflect.set(target, key, value);
    }
  })

}

const test = {
  name: 'Saul'
}

const PTest = VNode(test);

PTest.name;
PTest.name = 'Mike';


const testBtn = document.querySelector('#test');
// console.log(typeof(document.querySelector('#test')));

const btn = VNode(testBtn);





