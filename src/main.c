//
// C main.c file (main application file)
// for the Espruino JavaScript interpreter (NWA) app for the Numwoks calculators
//

#include "crt_stubs.h"
// #include <sys/time.h> // gettimeofday
#include <eadk.h> // For all the NumWorks's EADK functions

#include "storage.h"
#include "espruino_embedded.h"

// // https://yaya-cout.github.io/Nwagyu/reference/apps/syscalls.html
// // FIXME: experimental use of svcall.h
// #include "svcall.h"

// void SVC_ATTRIBUTES setBlinking(uint16_t periodInMilliseconds,  float dutyCycle) {
//   SVC_RETURNING_VOID(SVC_LED_SET_BLINKING)
// }


const char eadk_app_name[] __attribute__((section(".rodata.eadk_app_name"))) = "Espruino JavaScript";
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

  printf("NumWorks's Embedded JavaScript interpreter v0.0.4\n");
  eadk_timing_msleep(1000);
  printf("Based on Espruino, by Naereen\n");
  eadk_timing_msleep(1000);

  // SVC call to SVC_LED_SET_BLINKING = 36
  // https://github.com/numworks/epsilon/blob/9072ab80a16d4c15222699f73896282a65eecd54/ion/src/device/shared/drivers/svcall.h#L82
  // asm("svc 36");

  // // https://github.com/numworks/epsilon/blob/9072ab80a16d4c15222699f73896282a65eecd54/ion/src/shared/exam_mode.cpp#L14
  // const uint16_t blinkPeriod = 1000;  // in ms
  // const float blinkDutyCycle = 0.1f;
  // setBlinking(blinkPeriod, blinkDutyCycle);

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

  const char * code = (code_from_file == NULL && file_len <= 0) ? "console.log(\"Hi from JavaScript interpreter! sleep(3s)\");\n Eadk.timing_msleep(3000);" : (code_from_file + 1);

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
