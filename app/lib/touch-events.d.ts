// Type definitions for HTML Touch Events
// Project: http://www.w3.org/TR/touch-events/
// Definitions by: Kevin Barabash <https://github.com/kevinb7>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

interface TouchEvent extends UIEvent {
    touches: Touch[];
    targetTouches: Touch[];
    changedTouches: Touch[];
    altKey: boolean;
    metaKey: boolean;
    ctrlKey: boolean;
    shiftKey: boolean;
}

interface Touch {
    identifier: number;
    target: EventTarget;
    screenX: number;
    screenY: number;
    clientX: number;
    clientY: number;
    pageX: number;
    pageY: number;
}