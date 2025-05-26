// This is NOT a Python script
// This is a JavaScript file!

// A bit hacky experimental: just a for loop, to sleep
function msleep(s) {
  if (Eadk.timing_msleep instanceof Function) {
      Eadk.timing_msleep(s);
  } else {
      for (let j = 1; j <= s; j++) {
          // Just a comment here
      }
  }
}

console.log("Hello world from JavaScript!");
console.log("Testing Eadk functions:");
msleep(5000);

const brightness = Eadk.backlight_brightness();
console.log("Eadk.backlight_brightness() =", Eadk.backlight_brightness());
msleep(2000);

// Iterate some times from full brightness to zero brightness
const number_of_dwarfs = 13;
for (let dwarf = 1; dwarf <= number_of_dwarfs; dwarf++) {

  // Let's go into the dark
  for (let b = brightness; b >= 0; b=b-16) {
      Eadk.set_backlight_brightness(b);
      console.log("Eadk.backlight_brightness() =", Eadk.backlight_brightness());
      msleep(50);
  }

  // And back into the light!
  for (let b = 0; b <= brightness; b=b+16) {
      Eadk.set_backlight_brightness(b);
      console.log("Eadk.backlight_brightness() =", Eadk.backlight_brightness());
      msleep(50);
  }
}

msleep(1000);

// Let's test the constants SCREEN_WIDTH, SCREEN_HEIGHT
console.log("Eadk.SCREEN_WIDTH =", Eadk.SCREEN_WIDTH);
msleep(1000);
console.log("Eadk.SCREEN_HEIGHT =", Eadk.SCREEN_HEIGHT);
msleep(1000);

// Let's test the battery API
console.log("Eadk.battery_is_charging() =", Eadk.battery_is_charging());
msleep(1000);
console.log("Eadk.battery_level() =", Eadk.battery_level());
msleep(1000);
console.log("Eadk.battery_voltage() =", Eadk.battery_voltage());
msleep(1000);


// Let's test the colors and display_draw_string
// First display on white background, and big text
const big_text   = 1; // 1 for big text
Eadk.display_draw_string("Hello in red on white ?", 20, 10, big_text, Eadk.color_red, Eadk.color_white);
msleep(1000);
Eadk.display_draw_string("Hello in green on white ?", 40, 10, big_text, Eadk.color_green, Eadk.color_white);
msleep(1000);
Eadk.display_draw_string("Hello in blue on white ?", 60, 10, big_text, Eadk.color_blue, Eadk.color_white);
msleep(1000);
Eadk.display_draw_string("Hello in black on white ?", 60, 10, big_text, Eadk.color_black, Eadk.color_white);
msleep(1000);

// Then display on black background, and small text
const small_text = 0; // 0 for small text
Eadk.display_draw_string("Hello in red on black ?", 20, 10, small_text, Eadk.color_red, Eadk.color_black);
msleep(1000);
Eadk.display_draw_string("Hello in green on black ?", 40, 10, small_text, Eadk.color_green, Eadk.color_black);
msleep(1000);
Eadk.display_draw_string("Hello in blue on black ?", 60, 10, small_text, Eadk.color_blue, Eadk.color_black);
msleep(1000);
Eadk.display_draw_string("Hello in white on black ?", 60, 10, small_text, Eadk.color_white, Eadk.color_black);
msleep(1000);

// Finish for this test script
console.log("End for the tests of Eadk functions!");
msleep(1000);
