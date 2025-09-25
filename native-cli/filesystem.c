#include "filesystem.h"

int write_file(const char* filename, const char* content) {
    FILE* file = fopen(filename, "w");
    if (file == NULL) {
        return -1; // Error opening file
    }
    
    int result = fputs(content, file);
    fclose(file);
    
    return (result == EOF) ? -1 : 0; // Return 0 on success, -1 on error
}

char* read_file(const char* filename) {
    FILE* file = fopen(filename, "r");
    if (file == NULL) {
        return NULL; // Error opening file
    }
    
    // Get file size
    fseek(file, 0, SEEK_END);
    long size = ftell(file);
    fseek(file, 0, SEEK_SET);
    
    // Allocate memory for content + null terminator
    char* content = malloc(size + 1);
    if (content == NULL) {
        fclose(file);
        return NULL; // Memory allocation failed
    }
    
    // Read file content
    size_t bytes_read = fread(content, 1, size, file);
    content[bytes_read] = '\0'; // Null terminate
    
    fclose(file);
    return content;
}

void free_file_content(char* content) {
    if (content != NULL) {
        free(content);
    }
}