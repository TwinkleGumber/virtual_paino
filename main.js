var currentSongNumber = 1;
var willLoop = 0;
var willShuffle = 0; // will use this soon

function fancyTimeFormat(time)
{   
    // Hours, minutes and seconds
    var hrs = ~~(time / 3600);
    var mins = ~~((time % 3600) / 60);
    var secs = time % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";

    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}

 function updateCurrentTime() {
    var song = document.querySelector('audio');
    var currentTime = ~~(song.currentTime); // ~~ means Math.floor()
    currentTime = fancyTimeFormat(currentTime);
    var duration = ~~(song.duration);
    duration = fancyTimeFormat(duration)
    $('.time-elapsed').text(currentTime);
    $('.song-duration').text(duration);
}


function randomExcluded(min, max, excluded) {
    var n = Math.floor(Math.random() * (max-min) + min);
    if (n >= excluded) n++;
    return n;
}



//defines name of the song
// var songName1 = 'Badri Ki Dulhania (Title Track)';
 //var songName2 = 'Humma Song';
 //var songName3 = 'Nashe Si Chadh Gayi';
 //var songName4 = 'The Breakup Song';
// var songList = ['Badri Ki Dulhania (Title Track)', 'Humma Song', 'Nashe Si Chadh Gayi', 'The Breakup Song'];
// var fileNames = ['song1.mp3','song2.mp3','song3.mp3','song4.mp3'];
// var artistList = [' Neha Kakkar, Monali Thakur, Ikka Singh, Dev Negi','Badshah, Jubin Nautiyal, Shashaa Tirupati','Arijit Singh','Nakash Aziz, Arijit Singh, Badshah, Jonita Gandhi'];
// var albumList = ['Badrinath ki Dulhania','Ok Jaanu','Befikre','Ae Dil Hai Mushkil'];
// var durationList = ['2:56','3:15','2:34','2:29'];
var songs = [{
                'name': 'let her go',
                'artist': 'passenger',
                'album': 'passenger',
                'duration': '4:14',
                'fileName': 'let her go.mp3',
                'image':'song1.jpg'
            },
            {
                'name': 'youare beautiful',
                'artist': 'James Blunt',
                'album': 'bACK TO BEDLAM',
                'duration': '3:33',
                'fileName': 'you are beautiful.mp3',
                'image':'song2.jpg'
            },
            {
                'name': 'See You Again',
                'artist': 'Charlie Puth',
                'album': 'Furious7',
                'duration': '3:57',
                'fileName': 'wiz.mp3',
                'image':'song3.jpg'
            },
            {
                'name': 'Baarish',
                'artist': 'Mohammed Irfan',
                'album': 'Yaarian',
                'duration': '6:15',
                'fileName': 'Barish.mp3',
                'image':'song4.jpg'
    }];


$('.fa-repeat').on('click',function() {
    $('.fa-repeat').toggleClass('disabled')
    willLoop = 1 - willLoop;
});


$('.fa-random').on('click',function() {
    $('.fa-random').toggleClass('disabled')
    willShuffle = 1 - willShuffle;
});


function timeJump() {
    var song = document.querySelector('audio')
    song.currentTime = song.duration - 5;
}


$('audio').on('ended',function() {
    var audio = document.querySelector('audio');
    if (willShuffle == 1) {
        var nextSongNumber = randomExcluded(1,4,currentSongNumber); // Calling our function from Stackoverflow
        var nextSongObj = songs[nextSongNumber-1];
        audio.src = nextSongObj.fileName;
        toggleSong();
        changeCurrentSongDetails(nextSongObj);
        currentSongNumber = nextSongNumber;
    }
    else if(currentSongNumber < 4) {
        var nextSongObj = songs[currentSongNumber];
        audio.src = nextSongObj.fileName;
        toggleSong();
        changeCurrentSongDetails(nextSongObj);
        currentSongNumber = currentSongNumber + 1;
    }
    else if(willLoop == 1) {
        var nextSongObj = songs[0];
        audio.src = nextSongObj.fileName;
        toggleSong();
        changeCurrentSongDetails(nextSongObj);
        currentSongNumber =  1;
    }
    else {
        $('.play-icon').removeClass('fa-pause').addClass('fa-play');
        audio.currentTime = 0;
    }
})






    function changeCurrentSongDetails(songObj) {
        $('.current-song-image').attr('src','img/' + songObj.image);
        $('.current-song-name').text(songObj.name);
        $('.current-song-album').text(songObj.album);
    }


function addSongNameClickEvent(songObj,position) {

    var id = '#song' + position;
    var songName = songObj.fileName;

    $(id).click(function() {

        var audio = document.querySelector('audio');
        var currentSong = audio.src;

        if(currentSong.search(songName ) != -1)  
        {
            toggleSong();
        }
        else {
            audio.src = songName;
            toggleSong();
             changeCurrentSongDetails(songObj);
        }
    });
}

window.onload = function() {

    changeCurrentSongDetails(songs[0]);

//objects are used
for(var i =0; i < songs.length;i++) {
        var obj = songs[i];
        var name = '#song' + (i+1);
        var song = $(name);
        song.find('.song-name').text(obj.name);
        song.find('.song-artist').text(obj.artist);
        song.find('.song-album').text(obj.album);
        song.find('.song-length').text(obj.duration);
        addSongNameClickEvent(obj,i+1);
    }

    updateCurrentTime(); 
    setInterval(function() {
    updateCurrentTime();
    },1000);

    $('#songs').DataTable();

}


// $('#songs').DataTable({
//     paging: false
// });

     // $('#song1 .song-name').text(songList[0]);
      //$('#song1 .song-artist').text(artistList[0]);

      //$('#song2 .song-name').text(songList[1]);
      //$('#song2 .song-artist').text(artistList[1]);

      //$('#song3 .song-name').text(songList[2]);
      //$('#song3 .song-artist').text(artistList[2]);

      //$('#song4 .song-name').text(songList[3]);
      //$('#song4 .song-artist').text(artistList[3]);
     




function toggleSong() {

    var song = document.querySelector('audio');

    if(song.paused == true) {
        console.log('Playing');
        $('.play-icon').removeClass('fa-play').addClass('fa-pause');
        song.play();
    }
    else {
        console.log('Pausing');
        $('.play-icon').removeClass('fa-pause').addClass('fa-play');
        song.pause();
    }

} 

   
$('.play-icon').on('click', function() {
    toggleSong();
});

$('body').on('keypress',function(event) {
    var target = event.target;
    if (event.keyCode == 32 && target.tagName !='INPUT')
    {
        toggleSong();
    }
});

// for (var i = 0; i < fileNames.length ; i++) {//loop is used 
//      addSongNameClickEvent(fileNames[i],i+1)
// }

  


            // addSongNameClickEvent(fileNames[0],1);//song1
           // addSongNameClickEvent(fileNames[1],2);//song2
          // addSongNameClickEvent(fileNames[2],3);//song3
         // addSongNameClickEvent(fileNames[3],4);//song4




//  $('.welcome-screen button').on('click', function() {
//     var name = $('#name-input').val();
//     if (name.length > 2) {
//         var message = "Welcome, " + name;
//         $('.main .user-name').text(message);
//         $('.welcome-screen').addClass('hidden');
//         $('.main').removeClass('hidden');
//     } else {
//         $('#name-input').addClass('error');
//     }
// });


// jquery plugin
// $('#songs').DataTable({
//         paging: false
//     });