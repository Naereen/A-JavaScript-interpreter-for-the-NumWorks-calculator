/* src/crt_stubs.h */
#include <stddef.h>

extern char end;

void _init(void);
// extern void _init(void);

// void _fini(void);
// extern void _init(void);

void * _sbrk(ptrdiff_t incr);

extern char _eadk_external_data_start[];

void * get_eadk_data(void);
