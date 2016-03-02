(function (window) {
    "use strict";

    var ONE_SECOND = 1000;

    function Timer() {
        this.deskbell = new Audio("sounds/deskbell.wav");
        this.crank = new Audio("sounds/crank.wav");
        this.isRunning = false;
        this.secondsIntervalCounter = function () { };
        this._start = function () { };
        this._secondChange = function () { };
        this._end = function () { };
        this._stop = function () { };
    }

    Timer.prototype.onStart = function (callback) {
        this._start = callback;

        return this;
    };

    Timer.prototype.onSecondChange = function (callback) {
        this._secondChange = callback;

        return this;
    };

    Timer.prototype.onStop = function (callback) {
        this._stop = callback;

        return this;
    };

    Timer.prototype.start = function (seconds) {
        if (this.isRunning) {
            return;
        }

        if (!(this.seconds = +seconds)) {
            return console.error("seconds");
        }

        this.isRunning = true;
        this.crank.play();

        var self = this;
        this.secondsIntervalCounter = setInterval(function () {
            if (!(--self.seconds)) {
                self.end();
            }

            self._secondChange();
        }, ONE_SECOND);

        this._start();
    }

    Timer.prototype.stop = function () {
        clearInterval(this.secondsIntervalCounter);

        this.isRunning = false;
        this._stop();
    }

    Timer.prototype.getCurrentTime = function () {
        var minutes = parseInt(this.seconds / 60);
        var seconds = this.seconds % 60;

        if (seconds === 60) {
            seconds = "00";
        }
        else if (seconds.toString().length === 1) {
            seconds = "0" + seconds;
        }

        return minutes + ":" + seconds;
    }

    Timer.prototype.end = function () {
        this.stop();
        this.deskbell.play();
    }

    window.Timer = Timer;
} (window));