package com.example.backend.controllers;

import com.example.backend.properties.StorageProperties;
import com.example.backend.services.FileSystemStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class FileSystemStorageController {

    private final FileSystemStorageService storageService;

    @Autowired
    public FileSystemStorageController(FileSystemStorageService storageService) {
        this.storageService = storageService;
    }

    @GetMapping("/" + StorageProperties.locationStatic + "/{filename:.+}")
    public ResponseEntity<Resource> loadFile(@PathVariable String filename) {
        Resource file = storageService.loadAsResource(filename);

        return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION,
                "attachment; filename=\"" + file.getFilename() + "\"").body(file);
    }
}
