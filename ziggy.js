function right () {
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
function jeux1 () {
    while (confirmer) {
        let tab: number[] = []
        let text = level.toString();
basic.showString("" + (text))
        for (let cpt = 0; cpt <= level - 1; cpt++) {
            seqMap()
            tab[cpt] = rand
        }
        let verif: boolean;
verif = false
        for (let cpt2 = 0; cpt2 <= level - 1; cpt2++) {
            if (!(verif_move(tab[cpt2]))) {
                verif = true
                level = 1
                loose_screen()
            }
        }
        if (!(verif)) {
            level += 1
        }
    }
}
function down_right () {
    basic.showLeds(`
        # . . . .
        . # . . #
        . . # . #
        . . . # #
        . # # # #
        `)
    music.playTone(494, music.beat(BeatFraction.Whole))
}
function up_right () {
    basic.showLeds(`
        . # # # #
        . . . # #
        . . # . #
        . # . . #
        # . . . .
        `)
    music.playTone(659, music.beat(BeatFraction.Whole))
}
function up () {
    basic.showLeds(`
        . . # . .
        . # # # .
        # . # . #
        . . # . .
        . . # . .
        `)
    music.playTone(131, music.beat(BeatFraction.Whole))
}
function left () {
    basic.showLeds(`
        . . # . .
        . # . . .
        # # # # #
        . # . . .
        . . # . .
        `)
    music.playTone(294, music.beat(BeatFraction.Whole))
}
function verif_move (step: number) {
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
        case 4:
            if (input.acceleration(Dimension.Y) < -400 && input.acceleration(Dimension.X) < -400) {
                valid = true;
                up_left();
            }
            else {
                valid = false;
            }
            break;
        case 5:
            if (input.acceleration(Dimension.Y) > 400 && input.acceleration(Dimension.X) > 400) {
                valid = true;
                down_right();
            }
            else {
                valid = false;
            }
            break;
        case 6:
            if (input.acceleration(Dimension.Y) < -400 && input.acceleration(Dimension.X) > 400) {
                valid = true;
                up_right();
            }
            else {
                valid = false;
            }
            break;
        case 7:
            if (input.acceleration(Dimension.Y) > 400 && input.acceleration(Dimension.X) < -400) {
                valid = true;
                down_left();
            }
            else {
                valid = false;
            }
            break;
    }
return valid
}
function up_left () {
    basic.showLeds(`
        # # # # .
        # # . . .
        # . # . .
        # . . # .
        . . . . #
        `)
    music.playTone(392, music.beat(BeatFraction.Whole))
}
input.onButtonPressed(Button.A, function () {
    if (jeux >= 2) {
        jeux = 0
    } else {
        jeux += 1
    }
})
function down_left () {
    basic.showLeds(`
        . . . . #
        # . . # .
        # . # . .
        # # . . .
        # # # # .
        `)
    music.playTone(784, music.beat(BeatFraction.Whole))
}
function seqMap () {
    rand = randint(0, 7)
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
        case 4:
            up_left();
            break;
        case 5:
            down_right();
            break;
        case 6:
            up_right();
            break;
        case 7:
            down_left();
            break;
    }
clear_screen()
}
function jeux3 () {
    while (confirmer) {
       
    }
}
function jeux2 () {
    while (confirmer) {
        if (PinState1) {
            if (note <= 350) {
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
    //music.playTone(note, vol)
}
function clear_screen () {
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

function loose_screen () {
    basic.showLeds(`
        . . . . .
        . # . # .
        . . . . .
        . # # # .
        # . . . #
        `)
}

function down () {
    basic.showLeds(`
        . . # . .
        . . # . .
        # . # . #
        . # # # .
        . . # . .
        `)
    music.playTone(165, music.beat(BeatFraction.Whole))
}
let bearing = 0
let confirmer = 0
let jeux = 0
let Detection = 0
let level = 0
let rand: number;
//boutons capacitifs
let PinState2 = 0
let PinState1 = 0
let AnalogPinVal2 = 0
let AnalogPinVal1 = 0
let note = 131
let vol = 200
level = 1
radio.setGroup(55)
Detection = 0
jeux = 0
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
})

loops.everyInterval(10, function () {
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
loops.everyInterval(132, function () {

    if (jeux==1 && confirmer) {
        music.playTone(note, vol)
    }
    
})
