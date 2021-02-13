SRC = main.c

.PHONY: all
all: main.wasm

main.wasm: 
	clang --target=wasm32 -nostdlib -Wl,--no-entry -Wl,--export-all -Wl,--allow-undefined -o $@ $(SRC)
