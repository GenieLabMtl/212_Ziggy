function right() {
    basic.showLeds(`
        . . # . .
        . . . # .
        # # # # #
        . . . # .
        . . # . .
        `)
    music.playTone(220, music.beat(BeatFraction.Whole))
}
radio.onReceivedNumber(function (receivedNumber) {
    Detection = 1
})
function jeux1() {
    while (confirmer) {
        //let text = level.toString();
        //basic.showString("" + (text))

        for (let i = 0; (i < cpt)&&(confirmer); i++) {
            seq(tab[i]);
        }

        seqMap()
        tab[cpt] = rand
        cpt++;
        let verif: boolean;
        verif = false
        for (let cpt2 = 0; cpt2 <= level - 1; cpt2++) {
            if (!(verif_move(tab[cpt2]))) {
                verif = true
                level = 1
                cpt = 0
                if(confirmer){
                loose_screen()
                }
            }
        }
        if (!(verif)) {
            win_screen()
            level += 1
        }
    }
}


function up() {
    basic.showLeds(`
        . . # . .
        . # # # .
        # . # . #
        . . # . .
        . . # . .
        `)
    music.playTone(131, music.beat(BeatFraction.Whole))
}
function left() {
    basic.showLeds(`
        . . # . .
        . # . . .
        # # # # #
        . # . . .
        . . # . .
        `)
    music.playTone(294, music.beat(BeatFraction.Whole))
}
function verif_move(step: number) {
    let valid: boolean
    pause(1000);
    clear_screen()
    switch (step) {
        case 0:
            if (input.acceleration(Dimension.Y) < -500 && input.acceleration(Dimension.X) > -200 && input.acceleration(Dimension.X) < 200) {
                valid = true;
                up();
            }
            else {
                valid = false;
            }
            break;
        case 1:
            if (input.acceleration(Dimension.Y) > 500 && input.acceleration(Dimension.X) > -200 && input.acceleration(Dimension.X) < 200) {
                valid = true;
                down();
            }
            else {
                valid = false;
            }
            break;
        case 2:
            if (input.acceleration(Dimension.X) > 500 && input.acceleration(Dimension.Y) > -200 && input.acceleration(Dimension.Y) < 200) {
                valid = true;
                right();
            }
            else {
                valid = false;
            }
            break;
        case 3:
            if (input.acceleration(Dimension.X) < -500 && input.acceleration(Dimension.Y) > -200 && input.acceleration(Dimension.Y) < 200) {
                valid = true;
                left();
            }
            else {
                valid = false;
            }
            break;
    }
    return valid
}

input.onButtonPressed(Button.A, function () {
    if (confirmer==0) {
        if (jeux >= 2) {
            jeux = 0
        } else {
            jeux += 1
        }
    }
})

function seqMap() {
    rand = randint(0, 3)
    switch (rand) {
        case 0:
            up();
            break;
        case 1:
            down();
            break;
        case 2:
            right();
            break;
        case 3:
            left();
            break;
    }
    clear_screen()
}
function seq(number: any) {

    switch (number) {
        case 0:
            up();
            break;
        case 1:
            down();
            break;
        case 2:
            right();
            break;
        case 3:
            left();
            break;
    }
    clear_screen()
}
function jeux3() {
    while (confirmer) {
        note = 5.54 * Math.abs(Pos_x)
        rest = 0.833 * Math.abs(Pos_y)
        if (PinState2) {
            music.rest(rest)
        }
        if (PinState1) {
            music.ringTone(note)
        }
        serial.writeValue("note", note)
        serial.writeValue("rest", vol)
    }
    music.stopAllSounds()
}
function jeux2() {
    while (confirmer) {
        if (PinState1) {
            if (note <= 950) {
                note += 10
            }
        } else {
            if (note >= 130) {
                note += 0 - 10
            }
        }
        if (PinState2) {
            if (vol <= 254) {
                vol += 10
            }
        } else {
            if (vol >= 32) {
                vol += 0 - 10
            }
        }
        serial.writeValue("note", note)
        serial.writeValue("vol", vol)
    }
}
function clear_screen() {
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        `)
}
input.onButtonPressed(Button.B, function () {
    if (confirmer == 0) {
        confirmer = 1
    } else {
        confirmer = 0
    }
})
function loose_screen() {
    basic.showLeds(`
        . . . . .
        . # . # .
        . . . . .
        . # # # .
        # . . . #
        `)
}
function win_screen() {
    basic.showLeds(`
        . . . . .
        . # . # .
        . . . . .
        # . . . #
        . # # # .
        `)
}
function down() {
    basic.showLeds(`
        . . # . .
        . . # . .
        # . # . #
        . # # # .
        . . # . .
        `)
    music.playTone(165, music.beat(BeatFraction.Whole))
}
/**
 * boutons capacitifs
 */
let AnalogPinVal2 = 0
let AnalogPinVal1 = 0
let PinState1 = 0
let PinState2 = 0
let Pos_y = 0
let Pos_x = 0
let confirmer = 0
let jeux = 0
let Detection = 0
let rest = 0
let vol = 0
let note = 0
let level = 0
let bearing = 0
let tab: number[] = []
let cpt = 0
let rand: number;
note = 131
vol = 200
rest = 100
level = 1
radio.setGroup(55)
Detection = 0
jeux = 0
loops.everyInterval(10, function () {
    Pos_x = input.rotation(Rotation.Pitch)
    Pos_y = input.rotation(Rotation.Roll)
    AnalogPinVal1 = pins.analogReadPin(AnalogPin.P1)
    AnalogPinVal2 = pins.analogReadPin(AnalogPin.P2)
    if (AnalogPinVal1 > 500) {
        PinState1 = 1
    } else {
        PinState1 = 0
    }
    if (AnalogPinVal2 > 500) {
        PinState2 = 1
    } else {
        PinState2 = 0
    }
})
basic.forever(function () {
    if (jeux == 0) {
        basic.showString("1")
        if (confirmer) {
            jeux1()
        }
    } else if (jeux == 1) {
        basic.showString("2")
        if (confirmer) {
            jeux2()
        }
    } else if (jeux == 2) {
        basic.showString("3")
        if (confirmer) {
            jeux3()
        }

    }
    else {
        music.stopAllSounds()
    }
})
loops.everyInterval(132, function () {
    if (jeux == 1 && confirmer) {
        music.playTone(note, vol)
    }
})
