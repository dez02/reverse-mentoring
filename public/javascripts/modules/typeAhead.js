const axios = require('axios');

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
        searchResults.innerHTML = `<div className="search__result">
        No results for ${this.value} found!
        </div>
        `;
      })
      .catch((err) => {
        console.error(err);
      });
  });
}

export default typeAhead;
