#
# GNU Makefile for the JavaScript (NWA) app for the Numwoks calculators
#
# See https://github.com/Naereen/A-JavaScript-interpreter-for-the-NumWorks-calculator
# See https://yaya-cout.github.io/Nwagyu/guide/help/how-to-install.html
# See https://github.com/espruino/Espruino/blob/master/README_Building.md#embedding-in-other-applications for Espruino embedding
# See https://bellard.org/quickjs/ for old QuickJS
#
Q ?= @
CC = arm-none-eabi-gcc
NWLINK = npx --yes -- nwlink
LINK_GC = 1
LTO = 1

objs = $(addprefix output/javascript/,\
  espruino_embedded.o \
)

#   eadk_lib.o
objs += $(addprefix output/,\
  storage.o \
  crt_stubs.o \
  icon.o \
  main.o \
)

CFLAGS = -std=c99
CFLAGS += $(shell $(NWLINK) eadk-cflags-device)
CFLAGS += -Os -Wall -Wextra -Wvla
# CFLAGS += -Werror
CFLAGS += -ggdb
CFLAGS += -Isrc/javascript

LDFLAGS = -Wl,--relocatable
LDFLAGS += $(shell $(NWLINK) eadk-ldflags-device)

# Uncomment this when building the native Numworks app
LDFLAGS += -nostartfiles

# LDFLAGS += --specs=nano.specs # Alternatively, use nano C lib
LDFLAGS += --specs=nosys.specs # Alternatively, use full-fledged newlib

ifeq ($(LINK_GC),1)
CFLAGS += -fdata-sections -ffunction-sections
LDFLAGS += -Wl,-e,main -Wl,-u,eadk_app_name -Wl,-u,eadk_app_icon -Wl,-u,eadk_api_level
LDFLAGS += -Wl,--gc-sections
endif

ifeq ($(LTO),1)
CFLAGS += -flto -fno-fat-lto-objects
CFLAGS += -fwhole-program
CFLAGS += -fvisibility=internal
LDFLAGS += -flinker-output=nolto-rel
endif

.PHONY: build
build: output/javascript.nwa
	ls -larth output/javascript.nwa
	du -b output/javascript.nwa
	file output/javascript.nwa

.PHONY: check
check: output/javascript.bin
	ls -larth output/javascript.bin
	du -b output/javascript.bin
	file output/javascript.bin

.PHONY: elf
elf: output/javascript.elf
	ls -larth output/javascript.elf
	du -b output/javascript.elf
	file output/javascript.elf

.PHONY: run
run: output/javascript.nwa src/test.js
	@echo "INSTALL $<"
# $(Q) $(NWLINK) install-nwa --external-data src/test.js $<
	$(Q) $(NWLINK) install-nwa $<

output/%.bin: output/%.nwa src/test.js
	@echo "BIN     $@"
# $(Q) $(NWLINK) nwa-bin --external-data src/test.js $< $@
	$(Q) $(NWLINK) nwa-bin $< $@

output/%.elf: output/%.nwa src/test.js
	@echo "ELF     $@"
# $(Q) $(NWLINK) nwa-elf --external-data src/test.js $< $@
	$(Q) $(NWLINK) nwa-elf $< $@

output/javascript.nwa: $(objs)
	@echo "LD      $@"
	$(Q) $(CC) $(CFLAGS) $(LDFLAGS) $^ -lm -o $@

output/%.o: src/%.c
	@mkdir -p $(@D)
	@echo "CC      $^"
	$(Q) $(CC) $(CFLAGS) -c $^ -o $@

output/icon.o: src/icon.png
	@echo "ICON    $<"
	$(Q) $(NWLINK) png-icon-o $< $@

.PHONY: clean
clean:
	@echo "CLEAN"
	$(Q) rm -rf output
