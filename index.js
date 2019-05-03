//$('#content').text('I\'m jQuery');

$(function() {
	$('#form').submit(function(e) {
		e.preventDefault();

		var findThis = $(this).find('#findThis').val();
		var url = 'http://react-cdp-api.herokuapp.com/movies/';

		$.getJSON(url, {
			offset: 0,
			limit: 30
		})
			.done(function( response ) {
				var filmsArray = response.data;
				var items = [];
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
			});
	});
});