# Ignite Native CLI (EXPERIMENTAL)

This is an experimental project to explore the possibilities of using Static Hermes to compile a simplified version of Ignite CLI to native code.

## How to build

You'll need a copy of Static Hermes.

```bash
git clone https://github.com/facebook/hermes.git
git checkout static_h
cmake -S hermes -B build -G Ninja -DCMAKE_BUILD_TYPE=Debug
cmake --build ./build
alias shermes="$PWD/build/bin/shermes"
```

Then prepare to build this project:

```bash
mkdir build
cd build
cmake ..
make
cd ..
```

Build it (you should run this anytime you make changes to the code):

```bash
shermes -typed -o ignite_bin ./ignite-native.ts -L. -lignite_native -Wc,-I.
```

Then run it:

```bash
./ignite_bin
```

If you make changes to the makefile, you'll need to run `make clean` and then `make` again in the `./build` directory.
