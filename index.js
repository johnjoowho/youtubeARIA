const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

function getDataFromApi(searchTerm, callback) {
  const settings = {
    url: YOUTUBE_SEARCH_URL,
    data: {
      key: 'AIzaSyCpwi5H_OHjs4kUpzs0OX70rQyp1n8eV9c',
      part: 'snippet',
      q: `${searchTerm} in:name`,
      per_page: 10
    },
    
    dataType: 'json',
    type: 'GET',
    success: callback
  };

  $.ajax(settings);
}

function renderResult(result) {
  return `
      <ul id="results-list">
        <li class="result"> 
          <a href="http://www.youtube.com/watch?v=${result.id.videoId}">
            <img class="thumbnail-image" src="${result.snippet.thumbnails.medium.url}" alt="thumbnail">
          </a> 
        </li>
      </ul> 
  `;
}

function displayYouTubeSearchData(data) {
  const results = data.items.map(renderResult).join("");
  $('.js-search-results').html(results);
}

function watchSubmit() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();
    // clear out the input
    queryTarget.val("");
    getDataFromApi(query, displayYouTubeSearchData);
  });
}

$(watchSubmit);
