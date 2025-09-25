#ifndef FILESYSTEM_H
#define FILESYSTEM_H

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#ifdef __cplusplus
extern "C" {
#endif

// Write content to a file
int write_file(const char* filename, const char* content);

// Read content from a file
char* read_file(const char* filename);

// Free memory allocated by read_file
void free_file_content(char* content);

#ifdef __cplusplus
}
#endif

#endif