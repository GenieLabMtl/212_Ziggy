let rand: number;
let level = 1

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
input.onButtonPressed(Button.A, function () {
    if (jeux == 5) {
        jeux = 0
    } else {
        jeux += 1
    }
})
function jeux3 () {
    while (confirmer) {
        if (input.acceleration(Dimension.X) > 500 && input.acceleration(Dimension.Y) > -200 && input.acceleration(Dimension.Y) < 200) {
            basic.showLeds(`
                . . # . .
                . . . # .
                # # # # #
                . . . # .
                . . # . .
                `)
            music.playTone(131, music.beat(BeatFraction.Whole))
        } else if (input.acceleration(Dimension.X) < -500 && input.acceleration(Dimension.Y) > -200 && input.acceleration(Dimension.Y) < 200) {
            basic.showLeds(`
                . . # . .
                . # . . .
                # # # # #
                . # . . .
                . . # . .
                `)
            music.playTone(165, music.beat(BeatFraction.Whole))
        } else if (input.acceleration(Dimension.Y) > 500 && input.acceleration(Dimension.X) > -200 && input.acceleration(Dimension.X) < 200) {
            basic.showLeds(`
                . . # . .
                . . # . .
                # . # . #
                . # # # .
                . . # . .
                `)
            music.playTone(220, music.beat(BeatFraction.Whole))
        } else if (input.acceleration(Dimension.Y) < -500 && input.acceleration(Dimension.X) > -200 && input.acceleration(Dimension.X) < 200) {
            basic.showLeds(`
                . . # . .
                . # # # .
                # . # . #
                . . # . .
                . . # . .
                `)
            music.playTone(294, music.beat(BeatFraction.Whole))
        } else if (input.acceleration(Dimension.Y) < -400 && input.acceleration(Dimension.X) < -400) {
            basic.showLeds(`
                # # # # .
                # # . . .
                # . # . .
                # . . # .
                . . . . #
                `)
            music.playTone(392, music.beat(BeatFraction.Whole))
        } else if (input.acceleration(Dimension.Y) > 400 && input.acceleration(Dimension.X) > 400) {
            basic.showLeds(`
                # . . . .
                . # . . #
                . . # . #
                . . . # #
                . # # # #
                `)
            music.playTone(494, music.beat(BeatFraction.Whole))
        } else if (input.acceleration(Dimension.Y) < -400 && input.acceleration(Dimension.X) > 400) {
            basic.showLeds(`
                . # # # #
                . . . # #
                . . # . #
                . # . . #
                # . . . .
                `)
            music.playTone(659, music.beat(BeatFraction.Whole))
        } else if (input.acceleration(Dimension.Y) > 400 && input.acceleration(Dimension.X) < -400) {
            basic.showLeds(`
                . . . . #
                # . . # .
                # . # . .
                # # . . .
                # # # # .
                `)
            music.playTone(784, music.beat(BeatFraction.Whole))
        } else {
            basic.showLeds(`
                # # # # #
                # . . . #
                # . # . #
                # . . . #
                # # # # #
                `)
        }
    }
}
function jeux2 () {
    while (confirmer) {
        basic.showString("jeux 2")
    }
}
function jeux6 () {
    while (confirmer) {
        basic.pause(100)
        radio.sendNumber(radio.receivedPacket(RadioPacketProperty.SignalStrength))
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            `)
        if (Detection == 1) {
            Detection = 0
            basic.showLeds(`
                . . . . .
                . # . # .
                . . . . .
                # . . . #
                . # # # .
                `)
            music.playMelody("C D E F G A B C5 ", 120)
        }
    }
}
input.onButtonPressed(Button.B, function () {
    if (confirmer == 0) {
        confirmer = 1
    } else {
        confirmer = 0
    }
})
function jeux5 () {
    while (confirmer) {
        bearing = input.compassHeading()
        if (bearing < 22.5 || bearing > 337.5) {
            basic.showString("N")
        } else if (bearing < 67.5 && bearing > 22.5) {
            basic.showString("NE")
        } else if (bearing < 112.5 && bearing > 67.5) {
            basic.showString("E")
        } else if (bearing < 157.5 && bearing > 112.5) {
            basic.showString("SE")
        } else if (bearing < 202.5 && bearing > 157.5) {
            basic.showString("S")
        } else if (bearing < 247.5 && bearing > 202.5) {
            basic.showString("S0")
        } else if (bearing < 292.5 && bearing > 247.5) {
            basic.showString("0")
        } else {
            basic.showString("N0")
        }
    }
}
function jeux4 () {
    while (confirmer) {
        basic.showString("jeux 4")
    }
}
let bearing = 0
let confirmer = 0
let jeux = 0
let Detection = 0
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
    } else if (jeux == 3) {
        basic.showString("4")
        if (confirmer) {
            jeux4()
        }
    } else if (jeux == 4) {
        basic.showString("5")
        if (confirmer) {
            jeux5()
        }
    } else if (jeux == 5) {
        basic.showString("6")
        if (confirmer) {
            jeux6()
        }
    }
})

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
function down_right() {
    basic.showLeds(`
        # . . . .
        . # . . #
        . . # . #
        . . . # #
        . # # # #
        `)
    music.playTone(494, music.beat(BeatFraction.Whole))
}
function up_right() {
    basic.showLeds(`
        . # # # #
        . . . # #
        . . # . #
        . # . . #
        # . . . .
        `)
    music.playTone(659, music.beat(BeatFraction.Whole))
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
function up_left() {
    basic.showLeds(`
        # # # # .
        # # . . .
        # . # . .
        # . . # .
        . . . . #
        `)
    music.playTone(392, music.beat(BeatFraction.Whole))
}
function down_left() {
    basic.showLeds(`
        . . . . #
        # . . # .
        # . # . .
        # # . . .
        # # # # .
        `)
    music.playTone(784, music.beat(BeatFraction.Whole))
}
function seqMap() {
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
function clear_screen() {
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        `)
}
function loose_screen() {
    basic.showLeds(`
        . . . . .
        . # . # .
        . . . . .
        . # # # .
        # . . . #
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
