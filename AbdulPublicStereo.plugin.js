/**
 * @name AbdulPublicStereo
 * @version 1
 * @author Abdul
 * @description Stereo Plugin Made By Abdul
 * @github https://github.com/AbdulBhaiJaan
 * @discord discord.gg/freevault
 */

class AbdulPublicStereo {
    constructor() {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.encoder = this.createEncoder();
        this.stereoPanner = new StereoPannerNode(this.audioContext, { pan: 0 });
        this.gainNode = this.audioContext.createGain();
        this.isPlaying = false;
        this.init();
    }

    init() {
        this.applyAudioSettings();
    }

    createEncoder() {
        const mediaStreamDestination = this.audioContext.createMediaStreamDestination();
        return mediaStreamDestination;
    }

    applyAudioSettings() {
        this.stereoPanner.connect(this.gainNode);
        this.gainNode.connect(this.encoder);
        this.gainNode.gain.value = 1.5;
    }

    start() {
        if (!this.isPlaying) {
            this.audioContext.resume().then(() => {
                this.isPlaying = true;
                console.log("Audio processing started.");
            });
        }
    }

    stop() {
        if (this.isPlaying) {
            this.audioContext.suspend().then(() => {
                this.isPlaying = false;
                console.log("Audio processing stopped.");
            });
        }
    }

    setBitrate(newBitrate) {
        this.bitrate = newBitrate;
    }

    setStereoEffect(panValue) {
        this.stereoPanner.pan.value = panValue;
    }
}

const audioPlugin = new AbdulPublicStereo();
audioPlugin.setBitrate(640);
audioPlugin.setStereoEffect(0.5);

module.exports = audioPlugin;
