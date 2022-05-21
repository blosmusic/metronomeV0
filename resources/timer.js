//create a usable timer for metronome

function Timer(callback, timeInterval, options) {
  this.timeInterval = timeInterval;

  //start timer
  this.start = () => {
    //set expected time
    this.expected = Date.now() + this.timeInterval;
    this.theTimeout = null;

    if (options.immediate) {
      callback();
    }

    this.timeout = setTimeout(this.round, this.timeInterval);
    console.log('Timer Started');
  }

  //stop timer
  this.stop = () => {
    clearTimeout(this.timeout);
    console.log('Timer Stopped');
  }

  //takes care of running callbacks and adjusting the time interval
  this.round = () => {
    console.log('timeout', this.timeout);

    //drift is current moment in time minus the expected time
    let drift = Date.now() - this.expected;

    //check if drift is greater than time interval and run error callback if true
    if (drift > this.timeInterval) {
      if (options.errorCallback) {
        options.errorCallback();
      }
    }

    callback();
    this.expected += this.timeInterval;
    console.log('Drift', drift);
    console.log('Next round interval', this.timeInterval - drift);

    //run timeout again and set timeInterval of next iteration
    //to the original time interval minus drift
    this.timeout = setTimeout(this.round, this.timeInterval - drift);
  }
}

export default Timer;
