// This is NOT a Python script
// This is a JavaScript file!

console.log("Hello world from JavaScript! Testing.\n");
console.log("Hello world from JavaScript! Testing.\n");
console.log("Hello world from JavaScript! Testing.\n");
Eadk.timing_msleep(1000);

const brightness = Eadk.backlight_brightness();
console.log("Eadk.backlight_brightness() =", Eadk.backlight_brightness());
Eadk.timing_msleep(1000);

Eadk.set_backlight_brightness(1);
console.log("Eadk.backlight_brightness() =", Eadk.backlight_brightness());
Eadk.timing_msleep(1000);

Eadk.set_backlight_brightness(brightness);
console.log("Eadk.backlight_brightness() =", Eadk.backlight_brightness());
Eadk.timing_msleep(1000);

const eadk_color_black = 0x0;
const eadk_color_white = 0xFFFF;
const eadk_color_red   = 0xF800;
const eadk_color_green = 0x07E0;
const eadk_color_blue  = 0x001F;

for (let j = 1; j <= 1; j++) {
  // Just a comment here
  for (let i = 1; i <= 2; i++) {
    Eadk.display_draw_string("Hello", 10 * i, 10 * i + 20 * j, 1); // 1 pour grand texte
  }
  for (let i = 3; i <= 4; i++) {
    Eadk.display_draw_string("Hello", 10 * i, 10 * i + 20 * j, 0); // 0 pour petit texte
  }
  for (let i = 5; i <= 6; i++) {
    Eadk.display_draw_string("Hello", 10 * i, 10 * i + 20 * j, 0);
  }

  let i = 7;
  Eadk.display_draw_string("Hello", 10 * i, 10 * i + 20 * j, 0, eadk_color_red);
  i++;
  Eadk.display_draw_string("Hello", 10 * i, 10 * i + 20 * j, 0, eadk_color_green);
  i++;
  Eadk.display_draw_string("Hello", 10 * i, 10 * i + 20 * j, 0, eadk_color_blue);
  i++;

  Eadk.timing_msleep(1000);
}