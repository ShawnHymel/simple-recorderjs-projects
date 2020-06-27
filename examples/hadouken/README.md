The HTML for this was stored as a WordPress page, so there was no standalone HTML file. The following appeard as the WordPress written content in HTML format. Note that actual recording was done with the addition of the &ltbutton&gt object at the bottom of the page. User recordings were inserted by code into the &ltol id="recordingsList"&gt section.

```
<h1>Hadouken</h1>
<p><strong><a href="https://shawnhymel.com/wp-content/uploads/2020/02/Super-Street-Fighter-II-Turbo-Hadouken.gif"><img class="size-full wp-image-1928 alignnone" src="https://shawnhymel.com/wp-content/uploads/2020/02/Super-Street-Fighter-II-Turbo-Hadouken.gif" alt="" width="252" height="107" /></a></strong></p>
<p><strong>How to participate</strong></p>
<p>Thank you for helping out! All you need to do is press the Record button below and say "hadouken" as enthusiastically (or angrily or whatever) as possible. Your browser might give you a pop-up asking to use your microphone, which you'll want to agree to. You'll have about 1 second to shout "hadouken," and then a widget will appear that lets you preview the recording. It helps if you're in a quiet room with little to no ambient noises.</p>
<p>Feel free to create multiple recordings with different inflections! When you're done, please preview the recordings to make sure that you can clearly hear "hadouken" in them.</p>
<p>When you're done, press the "Upload" button next to each recording that you want to send me for the project.</p>
<p>If you need help with the pronunciation, see <a href="https://www.youtube.com/watch?v=7jgdycXQv80">this video</a>.</p>
<p><strong>Hey Shawn, why are you doing this?</strong></p>
<p>Because for fun. I'm working on a personal project of the machine learning sorts that recognizes when someone says this famous phrase from the Street Fighter video game series.</p>
<p><strong>License</strong></p>
<p>By uploading your voice, you're giving me consent to use it in an aggregate fashion as part of a machine learning exercise. They will only be used as part of a personal project for non-commercial purposes. Code for the project will be open source and available on something like GitHub.</p>
<p>Audio recordings will be labeled with non-identifying information (so people won't know who is speaking). All recordings will be bundled and available as a .zip file for anyone to download to use in their machine learning projects, similar to the <a href="https://ai.googleblog.com/2017/08/launching-speech-commands-dataset.html">Google Speech Commands dataset.</a></p>
<p><small>This page is based on the <a href="https://github.com/addpipe/simple-recorderjs-demo">simple-recorder-js demo project</a>.</small></p>
<div id="controls" style="text-align: center;"><button id="recordButton">Record</button></div>
<div id="formats">Format: start recording to see sample rate</div>
<p><strong>Recordings:</strong></p>
<ol id="recordingsList"></ol>
<p><!-- inserting these scripts at the end to be able to use all the elements in the DOM --><br /><script src="https://cdn.rawgit.com/mattdiamond/Recorderjs/08e7abd9/dist/recorder.js"></script><br /><script 
```