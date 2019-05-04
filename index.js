
function processData(response, findThis) {
  var items = [];
  var filmsArray = response.data;
  console.log('response ', response);
  console.log('filmsArray ', filmsArray);
  console.log(findThis);
  $.each( filmsArray, function() {
    var title = this.title;
    var genres = this.genres;
    if (genres.includes(findThis)) {
      items.push(this);
    }
  });
  console.log(items);
}

function ajaxRequest(url) {
  $.ajax({
    url: url,
    dataType: 'json',
    data: { offset: 0, limit: 30 },
    success: processData
  });
}

$(function() {
  $('#form').submit(function(e) {
    e.preventDefault();

    var findThis = $(this).find('#findThis').val();
    var url = 'http://react-cdp-api.herokuapp.com/movies/';
    console.log(findThis);
    ajaxRequest(url);
  });
});


// $.getJSON(url, {
//   offset: 0,
//   limit: 30
// })
//   .done(function( response ) {
//     });
//     console.log(items);
//   });