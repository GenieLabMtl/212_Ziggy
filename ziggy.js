let volMax: number = 50;
music.setVolume(volMax);

// Premier jeux

let moove: number;
interface display {
    leds: Image,
    tone: number,
};

let dir: display[] = [{
    leds: images.createImage(`
            . . # . .
            . . # . .
            # . # . #
            . # # # .
            . . # . .
            `),
    tone: 165,
}, {
    leds: images.createImage(`
            . . # . .
            . # # # .
            # . # . #
            . . # . .
            . . # . .
            `),
    tone: 131,
}, {
    leds: images.createImage(`
            . . # . .
            . . . # .
            # # # # #
            . . . # .
            . . # . .
            `),
    tone: 220,
}, {
    leds: images.createImage(`
            . . # . .
            . # . . .
            # # # # #
            . # . . .
            . . # . .
            `),
    tone: 294,
}];

function loose_screen() {
    basic.showLeds(`
            . . . . .
            . # . # .
            . . . . .
            . # # # .
            # . . . #
            `);
}

function win_screen() {
    basic.showLeds(`
            . . . . .
            . # . # .
            . . . . .
            # . . . #
            . # # # .
            `);
}

function clear_screen() {
    basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            `);
}

function showDirection(direction: number) {
    let info: display = dir[direction];
    info.leds.plotFrame(0);
    music.playTone(info.tone, music.beat(BeatFraction.Whole));
    clear_screen();
}

function acceleration(X: number, Y: number) {
    return X > 500 && Y > -500 && Y < 500;
}

function verifDirection(direction: number) {
    let X: number = input.acceleration(Dimension.X);
    let Y: number = input.acceleration(Dimension.Y);
    let minus: number = -1 + 2 * (direction / 2 >> 0);
    if ((direction / 2) >> 0 == 0) {
        return acceleration(minus * Y, X);
    } else {
        return acceleration(minus * X, Y);
    }
}

function game1() {
    let tab: number[] = [];
    while (confirmer) {
        let verif: boolean = true;
        tab.push(randint(0, 3));
        for (let i of tab) {
            showDirection(i);
        }
        for (let i of tab) {
            music.playTone(200, music.beat(BeatFraction.Whole));
            pause(1000);
            if (!verifDirection(i)) {
                tab = [];
                loose_screen();
                verif = false;
                break;
            }
            showDirection(i);
            if (tab.length == 10) {
                basic.showIcon(IconNames.Fabulous);
                music.startMelody(music.builtInMelody(Melodies.Entertainer), MelodyOptions.Once);
                music.rest(music.beat(BeatFraction.Breve) * 2);
                tab = [];
                verif = false;
                break;
            }
        }
        if (verif) {
            win_screen();
        }
    }
}

// Deuxieme jeux

let note: number = 131;
let vol: number = volMax;

let Pos_x: number = 0;
let Pos_y: number = 0;
let PinState1: number = 0;
let PinState2: number = 0;

loops.everyInterval(132, function () {
    if (jeux == 1 && confirmer) {
        music.playTone(note, vol);
    }
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
    while (confirmer) {
        note = keepInRange(PinState1, note, 950, 130);
        vol = keepInRange(PinState2, vol, 254, 32);
        serial.writeValue("note", note);
        serial.writeValue("vol", vol);
    }
    music.stopAllSounds();
}

// Troisieme jeux

let rest: number = 100;

function game3() {
    while (confirmer) {
        note = 5.54 * Math.abs(Pos_x);
        rest = 0.833 * Math.abs(Pos_y);
        if (PinState2) {
            music.rest(rest);
        }
        if (PinState1) {
            music.ringTone(note);
        }
        serial.writeValue("note", note);
        serial.writeValue("rest", vol);
    }
    music.stopAllSounds();
}

// Menu

let jeux = 0;
let confirmer = 0;

let function_table: { (): void }[] = [game1, game2, game3];

input.onButtonPressed(Button.A, function () {
    if (confirmer == 0) {
        jeux = (jeux + 1) % 3;
    } else {
        volMax = (volMax + 25) % 200;
        music.setVolume(volMax);
    }
});

input.onButtonPressed(Button.B, function () {
    confirmer = (confirmer + 1) % 2;
})

basic.forever(function () {
    basic.showString((jeux + 1).toString());
    if (confirmer) {
        function_table[jeux]();
    }
})
