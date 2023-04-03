function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function injectHTML(list) {
  console.log('fired injectHTML')
  const target = document.querySelector('#restaurant_list');
  target.innerHTML = '';
  list.forEach((item) => {
    const str = `<li>${item.name}</li>`;
    target.innerHTML += str;
  })
}

function filterList(list, query) {
  return list.filter((item) => {
    const lowerCaseName = item.name.toLowerCase();
    const lowerCaseQuery = query.toLowerCase();
    return lowerCaseName.includes(lowerCaseQuery)
  })
}

function cutList(list) {
  console.log('fired cutList');
  const range = [...Array(15).keys()];
  return newArray = range.map((item) => {
    const index = getRandomIntInclusive(0, list.length - 1);
    return list[index];
  });
}

async function mainEvent() { // the async keyword means we can make API requests
  const form = document.querySelector('.main_form'); // This class name needs to be set on your form before you can listen for an event on it
  const filterButton = document.querySelector('#filter_button')
  const loadDataButton = document.querySelector('#data_load')
  const generateListButton = document.querySelector('#generate')
  let currentList = [];

  const loadAnimation = document.querySelector('#data_load_animation');
  loadAnimation.style.display = 'none';

  loadDataButton.addEventListener('click', async (submitEvent) => { // async has to be declared on every function that needs to "await" something
    console.log('loading data'); // this is substituting for a "breakpoint"
    loadAnimation.style.display = 'inline-block';

    const results = await fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json');

    currentList = await results.json();
    loadAnimation.style.display = 'none';

    console.table(currentList); // this is called "dot notation"
  });

  filterButton.addEventListener('click', (event) => {
    const formData = new FormData(form);
    const formProps = Object.fromEntries(formData);

    console.log(formProps);
    const newList = filterList(currentList, formProps.resto);

    console.log(newList);
    injectHTML(newList);
  });

  generateListButton.addEventListener('click', (event) => {
    console.log('generated list');
    const restoList = cutList(currentList);
    injectHTML(restoList);
  });
}

document.addEventListener('DOMContentLoaded', async () => mainEvent()); // the async keyword means we can make API requests
