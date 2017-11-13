const Stopwatch = require( 'timer-stopwatch' );
const format = require( 'format-duration' );
const Favico = require('favico.js');

const timer = new Stopwatch( 0 );
const favicon = new Favico({animation:'slide'});

(function() {
  $( '#startButton' ).click( function() {
    const title = $( '#timeCount' );
    const timerTitle = title[0];
    const milliStaminaConst = 5 * 60 * 1;
    const totalMilliseconds = (parseInt( $( '#maxStamina' ).val() ) - parseInt( $( '#currentStamina' ).val() )) * milliStaminaConst;
    
    timer.reset( totalMilliseconds );
    title.removeClass( 'text-danger' );
    timer.start();
    timer.onTime( function( time ) {
      timerTitle.innerHTML = format( time.ms );
    } );

    timer.onDone( function() {
      // TODO: Add sound (and sound disable control)

      favicon.badge(1);
      timerTitle.innerHTML = 'STAMINA FILLED!';
      $( '#timeCount' ).addClass( 'text-danger' );
    } );

  } );
})();