// This is NOT a Python script
// This is a JavaScript file!

// A function around timing_msleep
function msleep(ms) {
  if ('timing_msleep' in Eadk && typeof Eadk.timing_msleep === 'function' && Eadk.timing_msleep instanceof Function) {
    Eadk.timing_msleep(ms);
  } else {
    // A bit hacky experimental: just a for loop, to sleep
      for (let j = 1; j <= ms; j++) {
          // Just a comment here
      }
  }
}

console.log("Hello world from JavaScript!");
msleep(500);
console.log("Testing all Eadk functions:");
msleep(500);

console.log("Testing accents in console.log(...):");
msleep(1000);
console.log("éèêëàâîïôùûüçÉÈÊËÀÂÎÏÔÙÛÜÇ");
msleep(1000);

//
// Display
//

// Let's test the colors and display_draw_string
// First display on white background, and big text
const big_text   = 1; // 1 for big text
Eadk.display_draw_string("Hello in red on white ?", 0, 16*0, big_text, Eadk.color_red, Eadk.color_white);
msleep(1000);
Eadk.display_draw_string("Hello in green on white ?", 0, 16*1, big_text, Eadk.color_green, Eadk.color_white);
msleep(1000);
Eadk.display_draw_string("Hello in blue on white ?", 0, 16*2, big_text, Eadk.color_blue, Eadk.color_white);
msleep(1000);
Eadk.display_draw_string("Hello in black on white ?", 0, 16*3, big_text, Eadk.color_black, Eadk.color_white);

msleep(2000);

// Then display on black background, and small text
const small_text = 0; // 0 for small text
Eadk.display_draw_string("Hello in red on black ?", 0, 16*3+1+14*1, small_text, Eadk.color_red, Eadk.color_black);
msleep(1000);
Eadk.display_draw_string("Hello in green on black ?", 0, 16*3+1+14*2, small_text, Eadk.color_green, Eadk.color_black);
msleep(1000);
Eadk.display_draw_string("Hello in blue on black ?", 0, 16*3+1+14*3, small_text, Eadk.color_blue, Eadk.color_black);
msleep(1000);
Eadk.display_draw_string("Hello in white on black ?", 0, 16*3+1+14*4, small_text, Eadk.color_white, Eadk.color_black);

msleep(2000);

// First display on white background, and big text
Eadk.display_draw_string("Testing accents in Eadk.display_draw_string(...)", 0, 16*3+1+14*5, small_text, Eadk.color_red, Eadk.color_white);
msleep(1000);
Eadk.display_draw_string("éèêëàâîïôùûüçÉÈÊËÀÂÎÏÔÙÛÜÇ", 0, 16*3+1+14*6, small_text, Eadk.color_green, Eadk.color_white);

msleep(2000);

//
// Brightness
//

const brightness = Eadk.backlight_brightness();
console.log("Eadk.backlight_brightness() =", Eadk.backlight_brightness());
msleep(1000);

// Iterate some times from full brightness to zero brightness
const number_of_brightness_iterations = 5;
for (let a = 1; a <= number_of_brightness_iterations; a++) {

  // Let's go into the dark
  for (let b = brightness; b >= 0; b=b-16) {
      Eadk.backlight_set_brightness(b);
      console.log("Eadk.backlight_brightness() =", Eadk.backlight_brightness());
      msleep(50);
  }

  // And back into the light!
  for (let b = 0; b <= brightness; b=b+16) {
      Eadk.backlight_set_brightness(b);
      console.log("Eadk.backlight_brightness() =", Eadk.backlight_brightness());
      msleep(50);
  }
}

msleep(1000);

//
// Let's test the constants SCREEN_WIDTH, SCREEN_HEIGHT
//
console.log("Eadk.SCREEN_WIDTH =", Eadk.SCREEN_WIDTH);
msleep(1000);
console.log("Eadk.SCREEN_HEIGHT =", Eadk.SCREEN_HEIGHT);
msleep(1000);

//
// Let's test the battery API
//
console.log("Eadk.battery_is_charging() =", Eadk.battery_is_charging());
msleep(1000);
console.log("Eadk.battery_level() =", Eadk.battery_level());
msleep(1000);
console.log("Eadk.battery_voltage() =", Eadk.battery_voltage());
msleep(1000);

//
// Timing
//

// Let's test the function Eadk.timing_usleep(1000000)
console.log("Eadk.timing_usleep(1000000)...");
Eadk.timing_usleep(1000000);

// Let's test the function Eadk.timing_msleep(1000)
console.log("Eadk.timing_msleep(1000)...");
Eadk.timing_msleep(1000);

// Let's test the function Eadk.timing_millis()
console.log("Eadk.timing_millis() =", Eadk.timing_millis());
msleep(1000);

//
// Misc
//

// Let's test the function Eadk.usb_is_plugged()
console.log("Eadk.usb_is_plugged() =", Eadk.usb_is_plugged());
msleep(1000);

// Let's test the function Eadk.random()
for (let index = 0; index < 100; index++) {
  console.log("Eadk.random() =", Eadk.random());
  msleep(50);
}

//
// Display rect and lines
//

// Display rect
console.log("Eadk.display_push_rect_uniform(0, 0, 10, 20, Eadk.color_red)...");
msleep(1000);
Eadk.display_push_rect_uniform(190, 190, 10, 20, Eadk.color_red); // Fills a 10x20 red rectangle at (190,190)
msleep(1000);

console.log("Eadk.display_push_rect_uniform for lines...");
msleep(1000);
// Draws a line of single green line of pixels at (1,1) to (252,252)
for (let line = 1; line <= 252; line++) {
  Eadk.display_push_rect_uniform(line, line, 1, 1, Eadk.color_green);
  msleep(10);
}
msleep(1000);

//
// Finish for this test script
//

console.log("End for the tests of Eadk functions!");
msleep(1000);
