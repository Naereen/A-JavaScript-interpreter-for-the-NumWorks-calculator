//
// C main.c file (main application file)
// for the Espruino JavaScript interpreter (NWA) app for the Numwoks calculators
//

#include "crt_stubs.h"
// #include <sys/time.h> // gettimeofday
#include <eadk.h>
// #include "eadk_lib.h"
#include "storage.h"
#include "espruino_embedded.h"

const char eadk_app_name[] __attribute__((section(".rodata.eadk_app_name"))) = "JS interpreter";
const uint32_t eadk_api_level  __attribute__((section(".rodata.eadk_api_level"))) = 0;

// TODO: Check why __exidx_start/__exidx_end is needed
void __exidx_start() { }
void __exidx_end() { }

// ----------------------------------
/** We have to define these */

// XXX: I manually added this function, it wasn't present in the 'test.c' file from Espruino.
void jshKickSoftWatchDog() {
}

// XXX: do we need this, for our app?
uint64_t ejs_get_microseconds() {
  return (uint64_t) (eadk_timing_millis() * 1000);
}

// TODO: do we need this, for our app?
void ejs_print(const char *str) {
  printf("%s", str);
}
// ----------------------------------

// int main(int argc, char ** argv) {
int main() {

  printf("Embedded Espruino v0.0.1\n");
  eadk_timing_msleep(1000);

  ejs_create(1000);
  struct ejs* ejs[1];
  ejs[0] = ejs_create_instance();

  printf("Reading from 'javascript.py' file...\n");
  eadk_timing_msleep(1000);

  // We read "javascript.py"
  size_t file_len = 0;
  const char * code_from_file = extapp_fileRead("javascript.py", &file_len);

  // DONE: I wasn't able to compile while depending on external data, but it works if reading from a local 'javascript.py' file.
  // const char * code = eadk_external_data;

  const char * code = (code_from_file == NULL && file_len <= 0) ? "console.log(\"\\nHi from JavaScript interpreter! sleep(3s)\")\n// eadk.timing_msleep(3000)\ntypeof(NaN)" : (code_from_file + 1);

  printf("Executing code...\n");
  eadk_timing_msleep(1000);

  JsVar *v = ejs_exec(ejs[0], code, false);
  jsiConsolePrintf("=%v\n", v);
  jsvUnLock(v);

  eadk_timing_msleep(3000);
  ejs_destroy_instance(ejs[0]);
  ejs_destroy();

  return 0;
}
