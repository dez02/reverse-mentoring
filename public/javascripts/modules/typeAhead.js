const axios = require('axios');
const dompurify = require('dompurify');


function searchResultsHTML(courses) {
  return courses.map((course) => {
    return `
      <a href="/courses/${course.slug}" class="search__result">
        <strong>${course.name}</strong>
      </a>
      `;
  });
}

function typeAhead(search) {
  if (!search) return;

  const searchInput = search.querySelector('input[name="search"]');
  const searchResults = search.querySelector('.search__results');

  // console.log(searchInput, searchResults);

  searchInput.on('input', function () {
    console.log(this.value);

    if (!this.value) {
      searchResults.style.display = 'none';
      return;
    }
    searchResults.style.display = 'block';

    axios
      .get(`courses/api/search?q=${this.value}`)
      .then((res) => {
        if (res.data.length) {
          searchResults.innerHTML = searchResultsHTML(res.data);
          return;
        }
        searchResults.innerHTML = dompurify.sanitize(`<div className="search__result">
        No results for ${this.value}
        </div>`);
      })
      .catch((err) => {
        console.error(err);
      });
  });
  // handle keyboard inputs
  searchInput.on('keyup', (e) => {
    // if they aren't pressing up, down or enter, who cares!
    if (![38, 40, 13].includes(e.keyCode)) {
      return; // nah
    }
    const activeClass = 'search__result--active';
    const current = search.querySelector(`.${activeClass}`);
    const items = search.querySelectorAll('.search__result');
    let next;
    if (e.keyCode === 40 && current) {
      next = current.nextElementSibling || items[0];
    } else if (e.keyCode === 40) {
      next = items[0];
    } else if (e.keyCode === 38 && current) {
      next = current.previousElementSibling || items[items.length - 1];
    } else if (e.keyCode === 38) {
      next = items[items.length - 1];
    } else if (e.keyCode === 13 && current.href) {
      window.location = current.href;
      return;
    }
    if (current) {
      current.classList.remove(activeClass);
    }
    next.classList.add(activeClass);
  });
}

export default typeAhead;
