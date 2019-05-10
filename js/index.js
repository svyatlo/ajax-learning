function renderItems(findedItemsArr) {
  var content = '';
  $.each(findedItemsArr, function() {
    var img = ('<img src="' + this.poster_path + '" />');
    content = content + img;
  });
  console.log(content);
  $('#content').append(content);
}

function processData(response) {
  var findThis = $('#findThis').val().toLowerCase();
  console.log('findThis ', findThis);
  var url = this.url;
  var data = this.data;
  var findedItemsArr = this.findedItemsArr;
  console.log('findedItemsArr in processData ', findedItemsArr);
  var responseArr = response.data;
  console.log('response ', response);
  console.log('filmsArray ', responseArr);
  
  $.each( responseArr, function() {
    var title = this.title.toLowerCase();
    var description = this.overview.toLowerCase();
    var genres = this.genres;

    for (var i = 0; i < genres.length; i += 1) {
      genres[i] = genres[i].toLowerCase();
    }

    if (title.includes(findThis) || description.includes(findThis) || genres.includes(findThis)) {
      findedItemsArr.push(this);
    }
  });
  console.log(findedItemsArr);
  
  if (findedItemsArr.length < 10) {
    data.offset += data.limit;
    ajaxRequest(url, data, findedItemsArr);
  } else {
    renderItems(findedItemsArr);
  }
}

function ajaxRequest(url, data, findedItemsArr) {
  $.ajax({
    url: url,
    dataType: 'json',
    data: data,
    context: { 
      url: url,
      data: data,
      findedItemsArr: findedItemsArr
    },
    success: processData
  });
}

$(function() {
  var url = 'http://react-cdp-api.herokuapp.com/movies/';
  var findedItemsArr = [];
  var data = {
    offset: 0,
    limit: 25
  }

  $('#form').submit(function(e) {
    e.preventDefault();
    findedItemsArr = [];
    data.offset = 0;
    ajaxRequest(url, data, findedItemsArr);
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