let Pos_x: number = 0;
let Pos_y: number = 0;
let PinState1: number = 0;
let PinState2: number = 0;

let note: number = 131;
let vol: number = volMax;
let rest: number = 100;

loops.everyInterval(132, function () {
    music.playTone(note, vol);
});

function getPinstate(pin: number) {
    let AnalogPin: number = pins.analogReadPin(pin);
    return AnalogPin > 500 ? 1 : 0;
}

loops.everyInterval(10, function () {
    Pos_x = input.rotation(Rotation.Pitch);
    Pos_y = input.rotation(Rotation.Roll);
    PinState1 = getPinstate(AnalogPin.P1);
    PinState2 = getPinstate(AnalogPin.P2);
})

function game3() {
    while(1){
        note = 5.54 * Math.abs(Pos_x);
        rest = 0.833 * Math.abs(Pos_y);
        music.rest(rest);
        music.ringTone(note);
        serial.writeValue("note", note);
        serial.writeValue("rest", rest);
    }
}


game3();