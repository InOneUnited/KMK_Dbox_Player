var Dropbox = Dropbox.Dropbox;

function initDropbox() {

    let dropbox = new Dropbox({ accessToken: 'ZP2-tmvGcPAAAAAAAAAACR6nmTFyT8--8lLvhiLR_YL29SCy1ES4HSMNP69cu77d' });

    dropbox.filesListFolder({ path: '' })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });

    return dropbox;
}

function readBlob(file) {

    let reader = new FileReader();
    let firstSong = 0;

    reader.onloadend = function (event) {
        if (event.target.readyState == FileReader.DONE) {
            var player = document.getElementsByTagName('audio')[firstSong];
            player.src = "data:audio/wav;base64," + btoa(event.target.result);
            player.load();
        }
    }
    reader.readAsBinaryString(file);
}

function downloadSongs(dropbox) {

    dropbox.filesDownload({ path: "/dee_yan-key_-_02_-_winter_is_coming_adagio_-_first_snow.mp3" })
        .then(function (response) {
            readBlob(response.fileBlob);
        })
        .catch(function (response) {
            console.log(response);
        });
}

downloadSongs(initDropbox());



// PASTED AND INITIALLY CUSTOMIZED FROM 
// https://gist.githubusercontent.com/lukewduncan/3e041e4b22a50855f9faaf01dec40137/raw/b03fff5a96584e69ba1bf9e25eafc1ea20b58c09/audio-player.js


function initProgressBar() {
    var player = document.getElementById('player');
    var length = player.duration;
    var current_time = player.currentTime;

    // calculate total length of value
    var totalLength = calculateTotalValue(length);
    document.getElementById("end-time").innerHTML = totalLength;

    // calculate current value time
    var currentTime = calculateCurrentValue(current_time);
    document.getElementById("start-time").innerHTML = currentTime;

    var progressbar = document.getElementById('seek-object-container');
    progressbar.value = (player.currentTime / player.duration);
    progressbar.addEventListener("click", seek);

    if (player.currentTime == player.duration) {
        document.getElementById('play-song').className = "";
    }

    function seek(event) {
        var percent = event.offsetX / this.offsetWidth;
        player.currentTime = percent * player.duration;
        progressbar.value = percent / 100;
    }
};

function initPlayers() {

    // Variables
    // ----------------------------------------------------------
    // audio embed object
    var playerContainer = document.getElementById('player-container');
    var player = document.getElementById('player');
    var isPlaying = false;
    var playBtn = document.getElementById('play-song');

    // Controls Listeners
    // ----------------------------------------------------------
    if (playBtn != null) {
        playBtn.addEventListener('click', function () {
            togglePlay()
        });
    }

    // Controls & Sounds Methods
    // ----------------------------------------------------------
    function togglePlay() {
        if (player.paused === false) {
            player.pause();
            isPlaying = false;
            document.getElementById('play-song').className = "";

        } else {
            player.play();
            document.getElementById('play-song').className = "pause";
            isPlaying = true;
        }
    }
}

function calculateTotalValue(length) {
    var minutes = Math.floor(length / 60);
    var seconds_int = length - minutes * 60;
    var seconds_str = seconds_int.toString();
    var second = seconds_str.substr(0, 2);
    var time = minutes + ':' + second;

    return time;
}

function calculateCurrentValue(currentTime) {
    var current_minute = parseInt(currentTime / 60) % 60;
    var current_seconds_long = currentTime % 60;
    var current_seconds = current_seconds_long.toFixed();
    var current_time = (current_minute < 10 ? "0" + current_minute : current_minute) + ":" + (current_seconds < 10 ? "0" + current_seconds : current_seconds);

    return current_time;
}

initPlayers();