let volMax: number = 50;
music.setVolume(volMax);


input.onButtonPressed(Button.A, function () {
    volMax = (volMax + 25) % 200;
    music.setVolume(volMax);
});