let speech = new SpeechSynthesisUtterance();
let voices = [];
let voiceSelect = document.querySelector("select");
let downloadButton = document.querySelector("#downloadAudioButton");

window.speechSynthesis.onvoiceschanged = () => {
    voices = window.speechSynthesis.getVoices();

    // Clear the select element
    voiceSelect.innerHTML = "";

    voices.forEach((voice, i) => {
        voiceSelect.options[i] = new Option(voice.name, i);
    });

    // Set the default voice
    speech.voice = voices[0];
};

voiceSelect.addEventListener("change", () => {
    speech.voice = voices[voiceSelect.value];
});

document.querySelector("button").addEventListener("click", () => {
    speech.text = document.querySelector("textarea").value;
    window.speechSynthesis.speak(speech);
});

downloadButton.addEventListener("click", () => {
    // Create an audio blob (replace with actual audio data)
    let audioBlob = new Blob([new Uint8Array([0])], { type: 'audio/wav' }); // Empty audio data for demonstration

    // Create a URL for the blob
    let audioBlobURL = URL.createObjectURL(audioBlob);

    // Create a link for downloading
    let downloadLink = document.createElement('a');
    downloadLink.href = audioBlobURL;
    downloadLink.download = 'speech_audio.wav'; // Set the desired filename

    // Trigger a click on the link to initiate the download
    downloadLink.click();

    // Revoke the object URL to free up resources
    URL.revokeObjectURL(audioBlobURL);
});
