    var vplayer = videojs("my_video_1", {}, function()
    {
     vplayer.on("play", function()
     {
      gapi.hangout.data.setValue('play','play');
     });
     vplayer.on("pause", function()
     {
      gapi.hangout.data.setValue('play','pause');
      gapi.hangout.data.setValue('time',vplayer.currentTime());
     });
    });