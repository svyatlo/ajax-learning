function getTimeInHours(timeInMin) {
  let timeInHours = 0;

  if (!timeInMin) {
    return '--';
  }
  
  while (timeInMin >= 60) {
    timeInHours += 1;
    timeInMin -= 60;
  }
  return timeInHours + ' h ' + timeInMin + ' min ';
}

function renderItems(findedItems) {
  let content = '';
  $.each(findedItems, function() {
    const genres = this.genres.join(', ');
    const time = getTimeInHours(this.runtime);
    content += '<div class="content__item">'
                + '<img src="' + this.poster_path + '" />'
                + '<div class="item-description">'
                  + '<div class="item-title"><h2>' + this.title + '</h2><p>' + this.tagline + '</p></div>'
                  + '<div class="item-info"><h3>Genre: </h3><p>' + genres + '</p></div>'
                  + '<div class="item-info"><h3>Time: </h3><p>' + time + '</p></div>'
                  + '<div class="item-info"><h3>Rating: </h3><p>' + this.vote_average + '<span>(Votes: ' + this.vote_count + ')</span></p></div>'
                  + '<div class="item-info"><h3>Description: </h3><p>' + this.overview + '</p></div>'
                + '</div>'
            + '</div>';
  });
  $('#content').append(content);
}

function processData(response) {
  const responseArr = response.data;
  const data = this.data;
  const findedItems = this.data.findedItems;
  const findThis = $('#findThis').val().toLowerCase();

  data.inProgress = false;

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
      if (findedItems.length < 10) {
        findedItems.push(responseArr[i]);
      }
    }

    if (findedItems.length === 10) {
      data.offset += i + 1;
      renderItems(findedItems);
      console.log('data.offset ', data.offset);
      break;
    }
  }
  console.log('findedItems ', findedItems);
  
  if (findedItems.length < 10) {
    data.offset += data.limit;
    ajaxRequest(data);
  }
}

function ajaxRequest(data) {
  $.ajax({
    url: data.url,
    dataType: 'json',
    data: { offset: data.offset },
    context: {
      data: data
    },
    beforeSend: function() { data.inProgress = true; },
    success: processData
  });
}

$(function() {
  const data = {
    url: 'http://react-cdp-api.herokuapp.com/movies/',
    offset: 0,
    limit: 10,
    findedItems: [],
    inProgress: false
  };
  
  $('#form')
    .append('<input id="findThis" type="text" name="findThis">')
    .append('<input type="submit" value="Search">')
    .submit(function(e) {
      e.preventDefault();
      $('#content').empty();
      data.findedItems = [];
      data.offset = 0;
      ajaxRequest(data);
    });

  $(window)
    .scroll(function() {
      if ($(window).scrollTop() + $(window).height() >= $(document).height() - 20 && !data.inProgress) {
        data.findedItems = [];
        ajaxRequest(data);
      }
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