$(document).ready(function() {

	var players = ['Stephen Curry', 'LeBron James','Kevin Durant', 'Russell Westbrook', 'Kyrie Irving', 'Kawhi Leonard', 'Chris Paul', 'Draymond Green', 'LaMarcus Aldridge'];
	var newPlayer = '';

	function makeButton(newPlayer){
		// player's name was retrieved from the user's input or from the stored array and passed to this function
		console.log('newPlayer',newPlayer);
		//must be an element with <> included
		var btn = $('<button>');
		// add the class for buttons
		btn.addClass('player'); 
		//player's name is added as a data-name attr and as text in the button
		btn.attr('data-name', newPlayer);
		btn.text(newPlayer);
		//append new btn to playerBtns div
		$('#playerBtns').append(btn);
	}

	function renderButtons() {

		// Deletes the buttons prior to adding new buttons so there is no repeat buttons 
		$('#playerBtns').empty();
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
		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + $nbaPlayer + "&api_key=dc6zaTOxFJmzC&limit=10";

		//build a div with attrs
		//for each player user selects 
		var $playerDiv = $('<div>');
		$playerDiv.addClass('player-div');

		var $pName = $('<p>');
		$pName.addClass('player-name');
		$pName.text($nbaPlayer);

		$.ajax({
                url: queryURL,
                method: 'GET'
            })
            .done(function(response) {

            for (var i = 0; i <= 9; i++) {
				var $results = response.data[i];
				console.log($results[i]);
				var rating = $results.rating;
				var $pRating = $('<p>').text('Rating: '+ rating);
				$pRating.addClass('pRating');

				var $gifDiv = $('<div>');
				$gifDiv.addClass('gif-rating');
				$gifDiv.append($pRating);


                if (rating === 'g' || rating === 'pg') {
					var $stillImg = $results.images.fixed_height_still.url;
					var $animateImg = $results.images.fixed_height.url;				
				// make an img element with data fields with image urls to match the state - still and animate
					var $img = $('<img>');
					$img.addClass('playerImg');// the class for images
					$img.attr('src', $stillImg);
					$img.attr('data-state', 'still');
					$img.attr('data-still', $stillImg);
					$img.attr('data-animate', $animateImg);
					//$playerDiv.append($img);
					$gifDiv.prepend($img);
					$playerDiv.append($gifDiv);
					$playerDiv.prepend($pName);
				};			
			};	
				//append static gifs & rating into #gifs div
				
				var $lastDiv = $('<div>').addClass('clearBoth');
				$playerDiv.append($lastDiv);

				$('#gifs').prepend($playerDiv);
				
			}); //end of .done
		
	} //end of displayPlayers

	function changeState() {
			$('.playerImg').on('click', function() {

				var state = $(this).attr('data-state');
 
				if (state === 'still') {
					$(this).attr('data-state', 'animate');
					$(this).attr('src', $(this).attr('data-animate'));
					
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
	
	// ***************VERY IMPORTANT***********************
	// $('.player').on('click', displayPlayers); 
	// won't work for new buttons (can't capture elements generated dynamically) must use
	// $(document).on('click', '.player', displayPlayers);
	//*****************************************************
	// Generic function for displaying the player's gifs
	// the '.player' class is on the buttons with player's names
	$(document).on('click', '.player', displayPlayers);

	// Generic function for animating the player's gifs
	// the '.playerImg' class is on the images
	$(document).on('click', '.playerImg', changeState);

// Function that places the buttons on the page from items in the array
	renderButtons();

}); //end of document.ready