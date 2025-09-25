// Ignite Native CLI - A TypeScript CLI compiled to native code with Static Hermes

"use strict"

// Emulate a module scope, since global scope is unsound.
const native = {
  writeFile: (filename: string, content: string) => undefined,
  readFile: (filename: string) => "XXX",
  log: (message: string) => undefined,
}
loadNativeAPIs(native)

const B = "\x1b[34m"
const X = "\x1b[0m"

function run(): void {
  const log = native.log
  const writeFile = native.writeFile
  const readFile = native.readFile

  const filename = "test.txt"
  const content = "Hey there from Static Hermes!"

  log("Ignite Native CLI Demo")
  log("======================")

  // Write content to file
  log(` - Writing to ${filename}...`)
  const writeSuccess = writeFile(filename, content)

  if (!writeSuccess) return log(" ❌ Failed to write file")

  log(" ✅ File written successfully")

  // Read content back from file
  log(` - Reading from ${filename}...`)
  const readContent = readFile(filename)
  if (readContent === null) return log("❌ Failed to read file")

  log(" ✅ File read successfully")
  log(" - File contents:\n")
  log("-------------------\n")
  log(readContent)
  log("-------------------\n")
  log(`${B}Demo completed successfully!${X}`)
}

// Run the demonstration
run()

// All the native API bindings below here

// Emulate a module scope, since global scope is unsound.
function loadNativeAPIs(exports) {
  // FFI function declarations using Static Hermes syntax
  const _write_file = $SHBuiltin.extern_c(
    { include: "filesystem.h" },
    function write_file(filename: c_ptr, content: c_ptr): c_int {
      throw 0
    },
  )
  const _read_file = $SHBuiltin.extern_c(
    { include: "filesystem.h" },
    function read_file(filename: c_ptr): c_ptr {
      throw 0
    },
  )
  const _free_file_content = $SHBuiltin.extern_c(
    { include: "filesystem.h" },
    function free_file_content(content: c_ptr): void {},
  )

  // stdlib.h for malloc/free
  const _malloc = $SHBuiltin.extern_c(
    { include: "stdlib.h" },
    function malloc(size: c_size_t): c_ptr {
      throw 0
    },
  )
  const _free = $SHBuiltin.extern_c({ include: "stdlib.h" }, function free(p: c_ptr): void {})

  // Pointer access builtins
  const _ptr_write_char = $SHBuiltin.extern_c(
    { declared: true },
    function _sh_ptr_write_char(ptr: c_ptr, offset: c_int, v: c_char): void {},
  )
  const _ptr_read_uchar = $SHBuiltin.extern_c(
    { declared: true },
    function _sh_ptr_read_uchar(ptr: c_ptr, offset: c_int): c_uchar {
      throw 0
    },
  )

  const c_null = $SHBuiltin.c_null()

  // Helper functions for string conversion
  function malloc(size: number): c_ptr {
    "inline"
    "use unsafe"
    let res = _malloc(size)
    if (res === 0) throw Error("OOM")
    return res
  }

  function stringToAsciiz(s: any): c_ptr {
    "use unsafe"
    if (typeof s !== "string") s = String(s)
    let buf = malloc(s.length + 1)
    try {
      let i = 0
      for (let e = s.length; i < e; ++i) {
        let code: number = s.charCodeAt(i)
        if (code > 127) throw Error("String is not ASCII")
        _ptr_write_char(buf, i, code)
      }
      _ptr_write_char(buf, i, 0)
      return buf
    } catch (e) {
      _free(buf)
      throw e
    }
  }

  function asciizToString_unsafe(buf: c_ptr, maxsize: number): string {
    let res = ""
    for (let i = 0; i < maxsize; ++i) {
      let ch = _ptr_read_uchar(buf, i)
      if (ch > 127) throw Error("String is not ASCII")
      if (ch === 0) break
      res += String.fromCharCode(ch)
    }
    return res
  }

  // High-level file operations
  function writeFile(filename: string, content: string): boolean {
    "use unsafe"

    let filename_z: c_ptr = c_null
    let content_z: c_ptr = c_null

    try {
      filename_z = stringToAsciiz(filename)
      content_z = stringToAsciiz(content)

      const result = _write_file(filename_z, content_z)
      return result === 0
    } finally {
      if (filename_z !== c_null) _free(filename_z)
      if (content_z !== c_null) _free(content_z)
    }
  }

  function readFile(filename: string): string | null {
    "use unsafe"

    let filename_z: c_ptr = c_null
    let readContent: c_ptr = c_null

    try {
      filename_z = stringToAsciiz(filename)
      readContent = _read_file(filename_z)

      if (readContent === c_null) {
        return null
      }

      return asciizToString_unsafe(readContent, 1024)
    } finally {
      if (filename_z !== c_null) _free(filename_z)
      if (readContent !== c_null) _free_file_content(readContent)
    }
  }

  function log(message: string): void {
    print(message)
  }

  // Export functions to the scope
  exports.writeFile = writeFile
  exports.readFile = readFile
  exports.log = log
}
