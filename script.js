const catFactForm = document.getElementById('cat-fact-form');
const catFactCount = document.getElementById('cat-fact-count');
const catFactListEl = document.getElementById('cat-fact-list');

catFactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  if (catFactCount.value == 0) {
    alert('You have to get at least one fact.');
  }

  catFactListEl.innerHTML = '<li>loading...</li>';

  // get facts and render them
  const catFacts = await getCatFact(catFactCount.value);
  catFactListEl.innerHTML = ''; // clear after getting facts

  for (let catFact of catFacts.data) {
    appendCatFact(catFactListEl, catFact);
  }
});

async function getCatFact(count) {
  try {
    const data = await fetch(`https://meowfacts.herokuapp.com/?count=${count}`);
    const response = await data.json();
    return response;
  } catch (error) {
    console.error(error.message);
  }
}

function appendCatFact(parentEl, text) {
  const catFactEl = document.createElement('li');
  catFactEl.classList.add('cat-fact');
  catFactEl.innerText = text;

  parentEl.append(catFactEl);
}
