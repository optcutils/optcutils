const Stopwatch = require( 'timer-stopwatch' );
const format = require( 'format-duration' );
const timer = new Stopwatch( 0 );
(function() {
  $( '#startButton' ).click( function() {
    const title = $( '#timeCount' );
    const timerTitle = title[0];
    const milliStaminaConst = 5 * 60 * 1000;
    const totalMilliseconds = (parseInt( $( '#maxStamina' ).val() ) - parseInt( $( '#currentStamina' ).val() )) * milliStaminaConst;
    
    timer.reset( totalMilliseconds );

    title.removeClass( 'text-danger' );
    timer.start();

    timer.onTime( function( time ) {
      timerTitle.innerHTML = format( time.ms );
    } );

    timer.onDone( function() {
      // TODO: Add sound (and sound disable control)
      timerTitle.innerHTML = 'STAMINA FILLED!';
      $( '#timeCount' ).addClass( 'text-danger' );
    } );

  } );
})();