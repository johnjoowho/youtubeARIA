const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

function getDataFromApi(searchTerm, callback) {
  const settings = {
    url: YOUTUBE_SEARCH_URL,
    data: {
      key: 'AIzaSyCpwi5H_OHjs4kUpzs0OX70rQyp1n8eV9c',
      part: 'snippet',
      q: `${searchTerm} in:name`,
      per_page: 5
    },
    
    dataType: 'json',
    type: 'GET',
    success: callback
  };

  $.ajax(settings);
}

function renderResult(result) {
  return `
        <li class="result-item"> 
          <a href="http://www.youtube.com/watch?v=${result.id.videoId}">
            <img class="thumbnail-image" src="${result.snippet.thumbnails.medium.url}" alt="${result.snippet.title}">
          </a> 
        </li>
  `;
}

function displayYouTubeSearchData(data) {
  
  const results = data.items.map(renderResult).join("\n");
  const resultsString = `
    <h2 class="results-notice" aria-live="assertive">There are ${data.pageInfo.resultsPerPage} results on this page</h2>
    <ul class="search-results">${results}</ul> 
  `
  $('.js-search-results').html(resultsString);

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
