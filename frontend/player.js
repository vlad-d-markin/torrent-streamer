import _ from 'lodash'

var listeners = {}; // event: [listsners array]

const audio = document.createElement('audio')

audio.controls = false;
audio.autoplay = false;
audio.loop = false;

audio.onerror = function(error) {
    console.error('Player error', error)
    fireEvent('error', error)
}

audio.onloadedmetadata = function() {
    fireEvent('duration', audio.duration)
}

audio.ontimeupdate = function() {
    fireEvent('position', audio.currentTime)
}

function fireEvent(eventName, ...params) {
    if (_.isArray(listeners[eventName])) {
        _.each(listeners[eventName], function(listener) {
            listener(...params)
        })
    }
}

export function setSource(src) {
    audio.src = src;
}

export function play() {
    audio.play()
}

export function pause() {
    audio.pause()
}

export function getCurrentTime() {
    return audio.currentTime
}

export function setCurrentTime(time) {
    return audio.currentTime = time
}

export function getDuration() {
    return audio.duration
}

export function on(eventName, listener) {
    if (_.isArray(listeners[eventName])) {
        listeners[eventName].push(listener)
    }
    else {
        listeners[eventName] = [ listener ]
    }
}
