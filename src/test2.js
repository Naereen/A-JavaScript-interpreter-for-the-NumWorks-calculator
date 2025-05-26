// This is NOT a Python script
// This is a JavaScript file!

// Highly experimental: just a for loop, to sleep
function msleep(s) {
    for (let j = 1; j <= s; j++) {
        // Just a comment here
    }
}

console.log("Hello world from JavaScript!");
console.log("Testing Eadk functions:");
msleep(5000);

const brightness = Eadk.backlight_brightness();
console.log("Eadk.backlight_brightness() =", Eadk.backlight_brightness());
msleep(2000);

for (let dwarf = 1; dwarf <= 13; dwarf++) {
    for (let b = brightness; b >= 0; b=b-16) {
        Eadk.set_backlight_brightness(b);
        console.log("Eadk.backlight_brightness() =", Eadk.backlight_brightness());
        msleep(50);
    }

    for (let b = 0; b <= brightness; b=b+16) {
        Eadk.set_backlight_brightness(b);
        console.log("Eadk.backlight_brightness() =", Eadk.backlight_brightness());
        msleep(50);
    }
}
