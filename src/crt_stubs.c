/* src/crt_stubs.c */
#include <stddef.h>

extern char end;

void _init(void) {}

// void _fini(void) {}
// extern void _fini(void) {}
__attribute__((used)) void _fini(void) { }

void * _sbrk(ptrdiff_t incr) {
    static char *heap = &end;
    char *prev = heap;
    heap += incr;
    return prev;
}

extern char _eadk_external_data_start[];

void * get_eadk_data(void) {
    return _eadk_external_data_start;
}
