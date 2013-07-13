var localplay = "init";
var localurl = "init";
var localtime = "init";
var newuser = "true";

var tempstr = "abc";
function urlButtonClick() {
  var urlprompt = window.prompt("Please enter in the direct URL of a html5 video.","http://video-js.zencoder.com/oceans-clip.mp4");
  tempstr = urlprompt.toString();
  gapi.hangout.data.setValue('url',tempstr);
}

var forbiddenCharacters = /[^a-zA-Z!0-9_\-/:. ]/;
function setText(element, text) 
{
  element.innerHTML = typeof text === 'string' ?
      text.replace(forbiddenCharacters, '') : '';
}

function updateVideo(state)
{ 
  var statePlay = state['play'];
  var stateURL = state['url'];
  var stateTime = state['time'];

  // If you are a new user and states already exist sync with everyone
  //if (statePlay || stateURL || stateTime)
  //if (newuser === 'true' )
  //{
  //  syncp();
  //}

  var player = videojs("my_video_1");

  // Check if the local player needs to change the play state
  if (statePlay)
  if (statePlay.toString() !== localplay) 
  {
     if (statePlay1.toString() === "play")
     {
             console.log('Playing video.');
             player.ready(function(){
             player.play();
             });
             localplay = "play";
             newuser = false;
     }   
     if (statePlay1.toString() === "pause")
     {
             console.log('Pausing video.');
             player.ready(function(){
             player.pause();
             });
             localplay = "pause";
             newuser = false;
     } 
  }

  // Check if the local player needs to change the url it's playing
  if (stateURL)
  if (stateURL.toString() !== localurl) 
  {
   	     console.log('Changing URL value to '+ stateURL.toString());
             player.ready(function()
             {player.src(stateURL.toString());});
             localurl = stateURL.toString();
  }
  // Check if the local player needs to update the time from a user interface seek
  if (stateTime)
  if (stateTime.toString() !== localtime)
   {
             console.log('Changing time value to ' + stateTime.toString());
             player.ready(function(){
             player.currentTime(stateTime.toString());});
             localtime = stateTime.toString();
   }
}

function syncp()
{  
  var player = videojs("my_video_1");

  // If you have been playing the video pause the video and update the time
  if ( newuser === 'false' )
  {
     console.log('Pausing video for new participant.');
     player.ready(function(){
     player.pause();
     });
     localplay = "pause";
     gapi.hangout.data.setValue('time',player.currentTime());
  }

  // If you are a new user
  if (newuser === 'true' )
  {
      console.log('Syncing video with existing participants.');
      // Wait two Seconds for state data to be updated by other participants
      pause(2000);
      var state = gapi.hangout.data.getState(); 
      player.ready(function(){
      // Load the video at the correct time
      player.src(state['url'].toString());
      player.currentTime(state['time'].toString());

      localurl = state['url'].toString();
      localtime = state['time'].toString();
      localplay = "pause";
      newuser = false;
      // Wait three seconds to buffer
      pause(3000);
      // Tell everyone to play if >5s in
      if ( parseInt(state['time'].toString()) > 5 )
       gapi.hangout.data.setValue('play', 'play');
     });
  }
}

function pause (millis)
{
     var date = new Date();
     var curDate = null;
     do { curDate = new Date(); }
     while(curDate-date < millis);
}

// A function to be run at app initialization time which registers our callbacks
function init() 
{
  console.log('Init app.');
  var apiReady = function(eventObj) 
  {
    if (eventObj.isApiReady)
     {
      console.log('API is ready');
      gapi.hangout.data.onStateChanged.add(function(eventObj) 
      {
        updateVideo(eventObj.state);
      });
      //gapi.hangout.onParticipantsAdded.add(function(eventObj) 
      //{
      //  syncp();
      //});
      gapi.hangout.onApiReady.remove(apiReady);
    }
  };
  gapi.hangout.onApiReady.add(apiReady);
}

gadgets.util.registerOnLoadHandler(init);
