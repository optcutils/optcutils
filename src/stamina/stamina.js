const Stopwatch = require( 'timer-stopwatch' );
const millisec = require( 'millisec' );

(function() {
  $( '#startButton' ).click( function() {
    const title = $( '#timeCount' );
    const timerTitle = title[0];
    const milliStaminaConst = 5 * 60 * 1000;
    const totalMilliseconds = (parseInt( $( '#maxStamina' ).val() ) - parseInt( $( '#currentStamina' ).val() )) * milliStaminaConst;
    const timer = new Stopwatch( totalMilliseconds );

    title.removeClass( 'text-danger' );
    timer.start();

    timer.onTime( function( time ) {
      if ( millisec( time.ms ).getHours() > 0 ) {
        timerTitle.innerHTML = millisec( time.ms ).format( 'hh:mm:ss' );
      } else {
        timerTitle.innerHTML = millisec( time.ms ).format( 'mm:ss' );
      }
    } );

    timer.onDone( function() {
      // TODO: Add sound (and sound disable control)

      timerTitle.innerHTML = 'STAMINA FILLED!';
      $( '#timeCount' ).addClass( 'text-danger' );
    } );

  } );
})();