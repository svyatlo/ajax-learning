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
  const responseArr = response.data;
  const url = this.url;
  const data = this.data;
  const findedItemsArr = this.findedItemsArr;
  const findThis = $('#findThis').val().toLowerCase();

  console.log('response ', response);
  console.log('responseArr ', responseArr);
  console.log('findThis ', findThis);
  
  for (let i = 0; i < responseArr.length; i += 1) {
    let title = responseArr[i].title.toLowerCase();
    let description = responseArr[i].overview.toLowerCase();
    let genres = responseArr[i].genres;

    for (let i = 0; i < genres.length; i += 1) {
      genres[i] = genres[i].toLowerCase();
    }

    if (title.includes(findThis) || description.includes(findThis) || genres.includes(findThis)) {
      if (findedItemsArr.length < 10) {
        findedItemsArr.push(responseArr[i]);
      }
    }

    if (findedItemsArr.length === 10) {
      data.offset += i + 1;
      console.log('index ', i);
      console.log('data.offset ', data.offset);
      break;
    }
  }
  console.log('findedItemsArr ', findedItemsArr);
  
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
  const url = 'http://react-cdp-api.herokuapp.com/movies/';
  const findedItemsArr = [];
  const data = {
    offset: 0,
    limit: 10
  }
  let scrollCounter = 10;
  
  $('#form')
    .append('<input id="findThis" type="text" name="findThis">')
    .append('<input type="submit" value="Search">')
    .submit(function(e) {
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