function getTimeInHours(timeInMin) {
  if (!timeInMin) {
    return '--';
  }
  return (Math.floor(timeInMin / 60) || 0) + 'h ' + timeInMin % 60 + 'min ';
}

function cutOverview(text) {
  if (text.length > 50) {
    text = text.substring(0, 50) + '...';
  }
  return '<p>' + text + '<span class="read-more">>> read more</span></p>';
}

function createCard(item) {
  const genres = item.genres.join(', ');
  const time = getTimeInHours(item.runtime);
  const overview = cutOverview(item.overview);
  return '<div class="content__item">'
              + '<img src="' + item.poster_path + '" />'
              + '<div class="item-description">'
                + '<div class="item-title"><h2>' + item.title + '</h2><p>' + item.tagline + '</p></div>'
                + '<div class="item-info"><h3>Genre: </h3><p>' + genres + '</p></div>'
                + '<div class="item-info"><h3>Time: </h3><p>' + time + '</p></div>'
                + '<div class="item-info"><h3>Rating: </h3><p>' + item.vote_average + '<span>(Votes: ' + item.vote_count + ')</span></p></div>'
                + '<div class="item-info"><h3>Description: </h3>' + overview + '</div>'
              + '</div>'
          + '</div>';
}

function renderCards(array) {
  $.each(array, function() {
    $('#content').append(this);
  });
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
      const card = createCard(responseArr[i]);
      findedItems.push(card);
    }

    if (findedItems.length === 10) {
      data.offset += i + 1;
      renderCards(findedItems);
      break;
    }
  }
  
  if (findedItems.length < 10) {
    data.offset += data.limit;
    ajaxRequest(data);
  }

  console.log('data.offset ', data.offset);
  console.log('findedItems ', findedItems);
}

function ajaxRequest(data) {
  $.ajax({
    url: data.url,
    dataType: 'json',
    data: { offset: data.offset },
    beforeSend: function() { data.inProgress = true; },
    context: {
      data: data
    },
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

// https://twog.me/sokratit-tekst-jquery-readmore/
