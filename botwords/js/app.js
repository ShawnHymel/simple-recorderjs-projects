/**
 * Creates 1 second WAV files by capturing audio from user's microphone
 * Authors: Andrew Jaswa, Shawn Hymel
 * Date: June 27, 2020
 * 
 * Simple recorder demo. Press "record" button to create a ~1 second recording
 * from user's microphone.  Recording appears to let users listen to it, save
 * it locally to their computer, or upload it to the server (in directory that
 * served this page).
 * 
 * Based on: https://github.com/addpipe/simple-recorderjs-demo
 * Button handling code from: https://stackoverflow.com/questions/23835150/javascript-event-listener-for-multiple-buttons-with-same-class-name/23835338
 */

// webkitURL is deprecated but nevertheless
URL = window.URL || window.webkitURL;

var gumStream; 						//stream from getUserMedia()
var recorder; 		                //Recorder.js object
var input; 							//MediaStreamAudioSourceNode (for recording)

// Shim for AudioContext when it's not avb. 
var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext //audio context to help us record

// Handle clicks with our buttons
if (document.addEventListener) {
    document.addEventListener("click", handleClick, false);
}
else if (document.attachEvent) {
    document.attachEvent("onclick", handleClick);
}

// Find which element caused the click and handle appropriately
function handleClick(event) {
    event = event || window.event;
    event.target = event.target || event.srcElement;

    var element = event.target;

    // Climb up the document tree from the target of the event
    while (element) {
        if (element.nodeName === "BUTTON" && /recordButton/.test(element.className)) {
            
            // User clicked a <button> with class="recordButton"
            startRecording(element);
            break;
        }

        element = element.parentNode;
    }
}

// Function: when "Record" button is clicked
function startRecording(button) {
	console.log("Button clicked: " + button.id);

	// Simple constraints object, for more advanced audio features see
	// https://addpipe.com/blog/audio-constraints-getusermedia/
    var constraints = { audio: true, video:false }

    // Disable the record button until get success or fail from getUserMedia() 
	button.disabled = true;

    // We're using the standard promise based getUserMedia() 
    // developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
	navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
		console.log("getUserMedia() success, stream created, initializing Recorder.js ...");
		
    // Create an audio context after getUserMedia is called. Sample rate may
    // change, but it defaults to the one set in your OS (for playback device)
		audioContext = new AudioContext();

		// Update the format 
		document.getElementById("formats").innerHTML="Format: 1 channel pcm @ "+audioContext.sampleRate/1000+"kHz"
		
		// Assign to gumStream for later use
		gumStream = stream;
		
		// Use the stream
		input = audioContext.createMediaStreamSource(stream);

        // Create the Recorder object and configure to record mono sound
		recorder = new Recorder(input,{numChannels:1})

		// Start the recording process
		recorder.record()
        
        // Sleep for 1 sec
        setTimeout(function () {stopRecording(button)}, 2000);
		console.log("Recording started");

	}).catch(function(err) {
	    
	  	// Enable the record button if getUserMedia() fails
    	button.disabled = false;
	});
}

// Function: called when recording is done
function stopRecording(button) {
	console.log("Recording stopped");

	// Disable the stop button, enable the record too allow for new recordings
	button.disabled = false;
	
	// Tell the recorder to stop the recording
	recorder.stop();

	// Stop microphone access
	gumStream.getAudioTracks()[0].stop();

	// Create the wav blob and pass it on to createDownloadLink
	recorder.exportWAV(createDownloadLink.bind(this, button.id));
}

function createDownloadLink(phrase, blob) {
	
	var url = URL.createObjectURL(blob);
	var au = document.createElement('audio');
	var li = document.createElement('li');
	var link = document.createElement('a');

	// Name of .wav file to use during upload and download (without extendion)
	var datetime = new Date().toISOString();
	var filename = phrase + "_" + datetime + ".wav";
	filename = filename.replace(/:/g, "_");
	console.log("Creating: " + filename);

	// Add controls to the <audio> element
	au.controls = true;
	au.src = url;

	// Save to disk link
	link.href = url;
	link.download = filename+".wav";
	link.innerHTML = "Download";

	// Add the new audio element to li
	li.appendChild(au);
	
	// Add the filename to the li
	li.appendChild(document.createTextNode(filename))

	// Add the save to disk link to li
	li.appendChild(link);
	
	// Upload link
	var upload = document.createElement('a');
	upload.href="#";
	upload.innerHTML = "Upload to server";
	upload.addEventListener("click", function(event){
		  var xhr=new XMLHttpRequest();
		  xhr.onload=function(e) {
		      if(this.readyState === 4) {
		          console.log("Server returned: ",e.target.responseText);
		      }
		  };
		  var fd=new FormData();
		  fd.append("audio_data",blob, filename);
		  xhr.open("POST","upload.php",true);
		  xhr.send(fd);
		  upload.innerHTML = "";
		  event.preventDefault();
	})
	li.appendChild(document.createTextNode (" "))
	li.appendChild(upload)

	// Add the li element to the ol
	var list = document.getElementById(phrase + "List");
	list.appendChild(li);
}