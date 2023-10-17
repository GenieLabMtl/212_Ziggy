let volMax: number = 50;
music.setVolume(volMax);


let time_paused:number = 1000;

function showGameId(game: string) {
    led.setBrightness(0);
    basic.showString(game);
    led.fadeIn(time_paused);
    basic.pause(time_paused);
    led.fadeOut(time_paused);
    led.setBrightness(255);
}

input.onButtonPressed(Button.A, function () {
    volMax = (volMax + 25) % 200;
    music.setVolume(volMax);
});