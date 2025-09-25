cmake_minimum_required(VERSION 3.16)
project(ignite_native)

set(CMAKE_C_STANDARD 11)
set(CMAKE_C_STANDARD_REQUIRED ON)

# Create shared library from C source files
add_library(ignite_native SHARED
    filesystem.c
)

# Set output directory
set_target_properties(ignite_native PROPERTIES
    LIBRARY_OUTPUT_DIRECTORY ${CMAKE_CURRENT_SOURCE_DIR}
    C_VISIBILITY_PRESET default
    VISIBILITY_INLINES_HIDDEN OFF
)

# Include current directory for headers
target_include_directories(ignite_native PRIVATE ${CMAKE_CURRENT_SOURCE_DIR})

# Export all symbols for FFI
set_target_properties(ignite_native PROPERTIES
    LINK_FLAGS "-Wl,-exported_symbols_list,${CMAKE_CURRENT_SOURCE_DIR}/exported_symbols.txt"
)
