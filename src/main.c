//
// C main.c file (main application file)
// for the Espruino JavaScript interpreter (NWA) app for the Numwoks calculators
//

#include "crt_stubs.h"
// #include <sys/time.h> // gettimeofday
#include <eadk.h> // For all the NumWorks's EADK functions

#include "storage.h"
#include "espruino_embedded.h"

const char eadk_app_name[] __attribute__((section(".rodata.eadk_app_name"))) = "JavaScript v0.3";
const uint32_t eadk_api_level  __attribute__((section(".rodata.eadk_api_level"))) = 0;

// TODO: Check why __exidx_start/__exidx_end is needed
void __exidx_start() { }
void __exidx_end() { }

// ----------------------------------
/** We have to define these */

// XXX: I manually added this function, it wasn't present in the 'test.c' file from Espruino.
void jshKickSoftWatchDog() {
}

// We don't need this, for our app, but apparently Espruino needs it
uint64_t ejs_get_microseconds() {
  return (uint64_t) (eadk_timing_millis() * 1000);
}

// We don't need this, for our app, but apparently Espruino needs it
void ejs_print(const char *str) {
  printf("%s", str);
}
// ----------------------------------

// int main(int argc, char ** argv) {
int main() {

  // Clear the screen, to start with a clean screen
  eadk_display_push_rect_uniform(eadk_screen_rect, eadk_color_white);

  eadk_display_draw_string("NumWorks's JavaScript interpreter v0.3\n", (eadk_point_t){0, 16*0}, false, eadk_color_black, eadk_color_white);
  eadk_timing_msleep(1000);
  eadk_display_draw_string("Based on Espruino, by @Naereen\n", (eadk_point_t){0, 16*1}, false, eadk_color_black, eadk_color_white);
  eadk_timing_msleep(1000);

  ejs_create(1000);
  struct ejs* ejs[1];
  ejs[0] = ejs_create_instance();

  eadk_display_draw_string("Reading from 'javascript.py' file...\n", (eadk_point_t){0, 16*2}, false, eadk_color_black, eadk_color_white);
  eadk_timing_msleep(1000);

  // We read "javascript.py"
  size_t file_len = 0;
  const char * code_from_file = extapp_fileRead("javascript.py", &file_len);

  // DONE: I wasn't able to compile while depending on external data, but it works if reading from a local 'javascript.py' file.
  // const char * code = eadk_external_data;

  const char * code = (code_from_file == NULL || file_len <= 0) ? "console.log(\"Hi from JavaScript interpreter! sleep(3s)\");\n Eadk.timing_msleep(3000);" : (code_from_file + 1);

  eadk_display_draw_string("Executing code...\n", (eadk_point_t){0, 16*3}, false, eadk_color_black, eadk_color_white);
  eadk_timing_msleep(500);
  printf("(Length of code to execute = %i)\n", strlen(code));
  eadk_timing_msleep(500);

  JsVar *v = ejs_exec(ejs[0], code, false);
  jsiConsolePrintf("Returns = %v\n", v);
  jsvUnLock(v);

  eadk_timing_msleep(3000);
  ejs_destroy_instance(ejs[0]);
  ejs_destroy();

  printf("Quitting JavaScript interpreter...\n");
  eadk_timing_msleep(1000);

  return EXIT_SUCCESS;
}
