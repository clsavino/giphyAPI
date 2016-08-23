$(document).ready(function() {

	var players = ['Stephen Curry', 'LeBron James','Kevin Durant', 'Russell Westbrook', 'Kyrie Irving', 'Kawhi Leonard', 'Chris Paul', 'Draymond Green', 'LaMarcus Aldridge'];
	var newPlayer = '';

	function makeButton(newPlayer){
		// player's name is the parameter
		// the name was retrieved from the user's input or from the stored array
		console.log('newPlayer',newPlayer);
		//must be an element with <> included
		var btn = $('<button>');
		btn.addClass('player'); // the class for buttons
		//player's name passed into function
		//added as a data-name attr and as text in the button
		btn.attr('data-name', newPlayer);
		btn.text(newPlayer);
		//append new btn to playerBtns div
		$('#playerBtns').append(btn);
	}

	function renderButtons() {
		
		//loop through the array of players
		for (var i = 0; i < players.length; i++) {
			//dynamically generate buttons for each player in the array
			newPlayer = players[i];
			makeButton(newPlayer);
		};

	} //end of renderButtons
	
	function displayPlayers() {

		var $nbaPlayer = $(this).data('name');
		console.log('nbaPlayer', $nbaPlayer);
		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + $nbaPlayer + "&api_key=dc6zaTOxFJmzC&limit=9";
		console.log('queryURL ', queryURL);
		//build a div with attrs
		//for each player user selects 
		var $playerDiv = $('<div>');
		var $p = $('<p>');
		$p.addClass('player-name');
		$p.text($nbaPlayer);

		$.ajax({
                url: queryURL,
                method: 'GET'
            })
            .done(function(response) {

            for (var i = 0; i <= 9; i++) {
				var $results = response.data[i];
					console.log('$results ', $results);
				var rating = $results.rating;

                if (rating === 'g' || rating === 'pg') {
					var $stillImg = $results.images.fixed_height_still.url;
					var $animateImg = $results.images.fixed_height.url;				
					// make an img element with data fields and urls to match the state - still or static
					var $img = $('<img>');
					$img.addClass('playerImg');// the class for images
					$img.attr('src', $stillImg);
					$img.attr('data-state', 'still');
					$img.attr('data-still', $stillImg);
					$img.attr('data-animate', $animateImg);
					
					$playerDiv.append($img);
				};			
			};	
				//append static gifs and info into #gifs div
				$('#gifs').prepend($playerDiv);
				$('#gifs').prepend($p);
			}); //end of .done
		
	} //end of displayPlayers

	function changeState() {
		console.log('entered changeState');
			$('.playerImg').on('click', function() {
				var state = $(this).attr('data-state');
        		console.log(' player Image clicked, state = ', state);
				if (state === 'still') {
					$(this).attr('data-state', 'animate');
					$(this).attr('src', $(this).attr('data-animate'));
					console.log('data-state ', $(this).attr('src', $(this).attr('data-animate')));
				} else if (state === 'animate') {
					$(this).attr('data-state', 'still');
					$(this).attr('src',$(this).attr('data-still'));
				}; // end of else if
			}); // end of on.click
	}// end of changeState

	//User can input the name of a player they want to add
	//add the player's name when they enter it in the input box
	// and press the "submit" button
	$('#addPlayer').on('click', function() {
		newPlayer = $('#player-input').val().trim();
		makeButton(newPlayer);
		players.push(newPlayer);
		// When users press "enter" instead of clicking on the button, it won't move to the next page
		return false;
	});

	// Generic function for displaying the player's gifs
	// the player class is on the buttons with player's names
	$(document).on('click', '.player', displayPlayers);
	$(document).on('click', '.playerImg', changeState);



	renderButtons();

}); //end of document.ready