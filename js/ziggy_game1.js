let moove: number;
interface display {
    leds: number,
    tone: number,
};

let dir: display[] = [{
    leds: ArrowNames.South,
    tone: 165,
}, {
    leds: ArrowNames.North,
    tone: 131,
}, {
    leds: ArrowNames.East,
    tone: 220,
}, {
    leds: ArrowNames.West,
    tone: 294,
}];

function loose_screen() {
    basic.showIcon(IconNames.No);
}

function win_screen() {
    basic.showIcon(IconNames.Happy);
}

function clear_screen() {
    basic.clearScreen();
}

function showDirection(direction: number) {
    let info: display = dir[direction];
    basic.showArrow(info.leds);
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
    let verif: boolean = true;
    tab.push(randint(0, 3));
    for (let i of tab) {
        showDirection(i);
    }
    for (let i of tab) {
        music.playTone(200, music.beat(BeatFraction.Whole));
        pause(3000);
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
        if (verif) {
            win_screen();
        }
    }
    game1();
}

game1();
