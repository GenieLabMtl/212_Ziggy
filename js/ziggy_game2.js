let note: number = 131;
let vol: number = volMax;

let Pos_x: number = 0;
let Pos_y: number = 0;
let PinState1: number = 0;
let PinState2: number = 0;

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

function keepInRange(state: number, variable: number, max: number, min: number) {
    if (variable < max) {
        variable += state * 10;
    }
    if (variable > min) {
        variable -= (1 - state) * 10;
    }
    return variable;
}

function game2() {
    while (1){
        note = keepInRange(PinState1, note, 950, 130);
        vol = keepInRange(PinState2, vol, 254, 32);
        serial.writeValue("note", note);
        serial.writeValue("vol", vol);
    }
}

game2();