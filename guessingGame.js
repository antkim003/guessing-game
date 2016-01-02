var guessingGame = function() {
  /* **** Global Variables **** */
  // try to elminate these global variables in your project, these are here just to start.

  var playersGuess,
      winningNumber,
      guesses = [],
      guessesLeft,
      hintUsed = false;

  generateWinningNumber();



  /* **** Guessing Game Functions **** */

  // Generate the Winning Number

  function generateWinningNumber(){
    // add code here
    // all inclusive is Math.floor(Math.random() * (max - min + 1)) + min
    // range from 1 - 100
    winningNumber = Math.floor(Math.random() * (100-1 + 1)) + 1;
    console.log('winning number ', winningNumber);
  }

  // Fetch the Players Guess

  function playersGuessSubmission(guess){
    // add code here
    playersGuess = parseInt(guess);
    guessesLeft  = parseInt($('.guessleft').html());

    checkGuess();
    console.log('players guess ', playersGuess, ' guesses ', guesses, 'guesses left ', guessesLeft);

  }

  // Determine if the next guess should be a lower or higher number

  function lowerOrHigher(){
    // add code here

    if (playersGuess > winningNumber) {
      // guess higher than the winning number!
      console.log('guess is higher than the winning number');
      return 'Your guess is higher';
    } else if (playersGuess < winningNumber) {
      // else guess is lower!
      console.log('guess is lower!')
      return 'Your guess is lower';
    } else {
      return '';
    }
  }

  function distanceFrom() {
    var distance = Math.abs(playersGuess - winningNumber),
        outputStr;
    if (distance === 0) {
      outputStr = "0";
    }
    else if (distance <= 5) {
      outputStr = "within 5";
    } else if (distance <= 10) {
      outputStr =  "within 10";
    } else if (distance <= 15) {
      outputStr =  "within 15";
    } else if (distance <= 20) {
      outputStr =  "within 20";
    } else if (distance <= 30) {
      outputStr =  "within 30";
    } else {
      outputStr = "greater than 40";
    }

    return outputStr + " digits of the winning number"

  }

  function guessMessage() {
    var outputString;

    if (lowerOrHigher().length > 0) {
      outputString = lowerOrHigher() + ' and ' + distanceFrom();  
    } else {
      outputString = '!!!';
    }
    

    $('.guessMessage').html(outputString);
  }

  // Check if the Player's Guess is the winning number 

  function checkGuess(){
    // add code here
    var isDuplicateGuess = checkForDuplicates();
    if (playersGuess === winningNumber) {
      // guess was correct!
      console.log("that's correct!");
      $('.helpMessage').html('you got it!!');
      $('.image-container').html('<img src="https://ronemycolumbuspower.files.wordpress.com/2014/10/family_feud_nod.gif" />')
      $('.colorTransition').css('background-color','green');
    } else {
      
      console.log(isDuplicateGuess);
      
      if (isDuplicateGuess) {
        $('.helpMessage').html('you already guessed this!');
        $('.image-container').html('<img src="http://www.theblaze.com/wp-content/uploads/2013/12/colbert.gif" />');
        $('.colorTransition').css('background-color','red');
      } else {
        $('.helpMessage').html('try again!');
        $('.image-container').html('<img src="http://24.media.tumblr.com/7716ef547264521e476a067b1c8d2717/tumblr_mmwl4erFiF1s2kxflo1_500.gif" />');
        $('.colorTransition').css('background-color','yellow');
        guesses.push(playersGuess);
        guessesLeft--;
        $('.guessleft').html(guessesLeft); 
      }
    }
    guessMessage();
  }

  function checkForDuplicates() {
    var isDuplicateGuess = false;
    guesses.forEach(function(value, index) {
      if (value === playersGuess) {
        isDuplicateGuess = true;
        return;
      } 
    });
    return isDuplicateGuess;
  }
  // Create a provide hint button that provides additional clues to the "Player"

  function provideHint(){
    // add code here
    var numberOfHints, hints = [],
        tempVal, currentVal, randomIndex,
        output;

    if (!hintUsed) {
      hintUsed = true;

      if (guesses.length < 3) {
        numberOfHints = 3;
      } else {
        numberOfHints = 5 - guesses.length;
      }

      for (var i = 0; i < numberOfHints-1; i++) {
        hints.push(Math.floor(Math.random() * 100 ) + 1);
      };
      hints.push(winningNumber);

      // compile hints with the answer in it
      // shuffler

      while (0 !== numberOfHints) {
        randomIndex = Math.floor(Math.random() * numberOfHints);
        console.log('before ', hints);
        tempVal = hints[randomIndex];
        hints[randomIndex] = hints[numberOfHints-1];
        hints[numberOfHints-1]  = tempVal;
        console.log('after ', hints);
        numberOfHints--;
      }



      output = hints.join(' , ');
      $(".guessHint").html(output);  
    } else {
      $('.guessError').html('You used your hint already!');
    }
    
    
  }

  // Allow the "Player" to Play Again

  function playAgain(){
    // add code here
    guesses = []
    hintUsed = false;
    playersGuess = '';
    generateWinningNumber();
    guessesLeft = 5;

    $('.helpMessage').html("Guess a number between 1 and a 100. We'll tell you if you're getting hotter or warmer!");
    $('.guessMessage, .guessError, .guessHint').html('');
    $('.colorTransition').css('background-color','none');
    $('.image-container').html('<img src="http://s.quickmeme.com/img/04/041a37e80660a87acf2d11d499682114fc9cf58e9c9ddfc4d04887ddf354f85f.jpg" />')
    $('.guessleft').html(5);
  }



  return {
    generateWinningNumber: generateWinningNumber,
    playersGuessSubmission: playersGuessSubmission,
    lowerOrHigher: lowerOrHigher,
    checkGuess: checkGuess,
    provideHint: provideHint,
    playAgain: playAgain
  }
}



/* **** Event Listeners/Handlers ****  */

$(document).ready(function() {
  // initializer the game here
  var game = new guessingGame();

  // $("#guessForm").on("submit",function(ev) {
  //   ev.preventDefault();
  //   var $guessElem = $(ev.currentTarget).find('#guess');
  //   game.playersGuessSubmission($guessElem.val());
  //   $guessElem.val('');


  // });
  $("#guessForm").on("keyup","#guess",function(ev) {
    ev.preventDefault();
    if (ev.keyCode === 13) {
      game.playersGuessSubmission($(this).val());
      $(this).val('');  
    }
  });

  $("#guessForm").on('click','button',function(ev) {
    var $guessElem = $('#guessForm').find('#guess');
    game.playersGuessSubmission($guessElem.val());
    $guessElem.val('');  
  });

  $("#hint").on('click', function(ev) {
    ev.preventDefault();
    game.provideHint();
  });

  $('#playAgain').on('click',function(ev) {
    ev.preventDefault();
    game.playAgain();
  });
});