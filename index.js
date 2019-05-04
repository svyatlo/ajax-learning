
function processData(response) {
  console.log('this in processData ', this);
  var items = [];
  var filmsArray = response.data;
  console.log('response ', response);
  console.log('filmsArray ', filmsArray);
  
  $.each( filmsArray, function() {
    var title = this.title;
    var genres = this.genres;
    if (genres.includes(findThis)) {
      items.push(this);
    }
  });
  console.log(items);
}

function ajaxRequest(url, findThis) {
  console.log('findThis in ajax ', findThis);
  $.ajax({
    url: url,
    dataType: 'json',
    data: { offset: 0, limit: 30 },
    context: $('#findThis').val(),
    success: processData
  });
}

$(function() {
  $('#form').submit(function(e) {
    e.preventDefault();

    var findThis = $(this).find('#findThis').val();
    var url = 'http://react-cdp-api.herokuapp.com/movies/';
    console.log(findThis);
    ajaxRequest(url, findThis);
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