// Execute this code when the DOM has fully loaded.
$(document).ready( () => {

  // The number we will manipulate by clicking crystals. Our "current guess" number.
  var yourMatchingNumber = 0;

  // Generates the random "target number" we will try to reach.
  var randomNum = randomNumGen();

  // Setting up our starting variables.
  var wins = 0;
  var losses = 0;
  var crystals;

  // Function that generates random values for our crystals and returns our crystals object.
  function randomNumCrystals() {
    // Crystals object.
    return {
      red: {
        points: Math.floor(Math.random() * 12) + 1,
        imageUrl: "assets/images/blue-crystal.jpg"
      },
      blue: {
        points: Math.floor(Math.random() * 12) + 1,
        imageUrl: "assets/images/red-crystal.jpg"
      },
      yellow: {
        points: Math.floor(Math.random() * 12) + 1,
        imageUrl: "assets/images/yellow-crystal.jpg"
      },
      green: {
        points: Math.floor(Math.random() * 12) + 1,
        imageUrl: "assets/images/green-crystal.jpg"
      }
    };
  }

  // Function to create a random number between 19 and 120.
  function randomNumGen() {
    return Math.floor(Math.random() * 102) + 19;
  }

  // Function that resets the game.
  function setGame() {
    // Make our current total number 0.
    yourMatchingNumber = 0;
    // Generate random crystal values.
    crystals = randomNumCrystals();
    // Generate a random target number and render it to the page.
    randomNum = randomNumGen();
    $("#random-area").text(randomNum);
  }

  // Function that handles updating the page.
  function updateDom(didUserWin) {
    $("#win-area").empty();

    // If the user won...
    if (didUserWin === true) {
      // Show victory message, animate it, restart the game, and render the new "current guess" number.
      $("#win-area").animate({fontSize: '3em'}, "slow");
      $("#win-area").append($("<p>").text("You won!!"));
      $("#win-area").animate({fontSize: '1em'}, "slow");
      setGame();
      renderMatchingNumber();
    }
    // If the user lost...
    else if (didUserWin === false) {
      // Show defeat message, animate it, restart the game, and render the new "current guess" number.
      $("#win-area").animate({fontSize: '3em'}, "slow");
      $("#win-area").append($("<p>").text("You lost!!"));
      $("#win-area").animate({fontSize: '1em'}, "slow");
      setGame();
      renderMatchingNumber();
    }

    // Building our win/loss display and appending it to the page.
    var wSpan = $("<span>").text(wins);
    var lSpan = $("<span>").text(losses);

    var pWins = $("<p>").text("Wins: ");
    var pLosses = $("<p>").text("Losses: ");

    pWins.append(wSpan);
    pLosses.append(lSpan);

    $("#win-area").append(pWins);
    $("#win-area").append(pLosses);
  }

  // Function to render our crystals to the page.
  function renderCrystals() {
    for (var key in crystals) {
      var crystalDiv = $("<div class='crystals-button' data-name='" + key + "'>");
      var crystalImg = $("<img alt='image' class='crystal-img'>").attr("src", crystals[key].imageUrl);
      crystalDiv.append(crystalImg);
      $("#crystal-area").append(crystalDiv);
    }
  }

  // Function to update our "current guess" number. We are passing in the crystal that was clicked as an argument.
  function updateMatchingNumber(crystal) {
    // Update our "current guess" number based on which crystal was clicked.
    yourMatchingNumber += crystals[crystal.attr("data-name")].points;
  }

  // Function that will render your "current guess" number to the page.
  function renderMatchingNumber() {
    var scoreNumDiv = $("<div id='score-number'>").text(yourMatchingNumber);
    $("#score-area").html();
    $("#score-area").html(scoreNumDiv);
  }

  // Call our functions to start the game!
  setGame();
  updateDom();
  renderCrystals();
  renderMatchingNumber();

  // Here we create an on.click event for the crystals with button sounds.
  $(".crystals-button").on("click", function (event) {
    // Update our "current guess" number and re-render it.
    updateMatchingNumber($(this));
    renderMatchingNumber();
    $('audio#buttonSound')[0].play()

    // Check to see if we have won or lost.
    // If our current guess number equals the target number..
    if (yourMatchingNumber === randomNum) {
      // Increment wins, play winning sound, restart the game, and update the page.
      wins++;
      setGame();
      updateDom(true);
      $('audio#winSound')[0].play()
    }
    // If our guess number exceeded our target number...
    else if (yourMatchingNumber > randomNum) {
      // Increment losses, play losing sound, restart the game, and update the page.
      losses++;
      setGame();
      updateDom(false);
      $('audio#loseSound')[0].play()
    }
    $('audio#bgMusic')[0].play() // jquery to call on our background music audio id. 
  });



});

