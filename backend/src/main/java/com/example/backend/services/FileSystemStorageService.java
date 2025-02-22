package com.example.backend.services;

import com.example.backend.exceptions.InternalServerException;
import com.example.backend.exceptions.MethodNotAllowedException;
import com.example.backend.exceptions.NotFoundException;
import com.example.backend.properties.StorageProperties;
import org.apache.tika.Tika;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.MimeType;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;

@Service
public class FileSystemStorageService {

    private final Path rootLocation;
    private final Tika tika = new Tika();
    private final List<MimeType> validMimeTypes = List.of(
            new MimeType("image", "jpeg"),
            new MimeType("image", "png"),
            new MimeType("image", "webp"));

    @Autowired
    public FileSystemStorageService(StorageProperties properties) {
        if(properties.getLocation().trim().isEmpty()) {
            throw new InternalServerException("File upload location cannot be empty.");
        }

        this.rootLocation = Paths.get(properties.getLocation());
    }

    public void init() {
        try {
            if(!Files.exists(rootLocation)) {
                Files.createDirectory(rootLocation);
            }
        } catch(IOException exception) {
            throw new InternalServerException("Could not create upload directory.");
        }
    }

    public Path store(MultipartFile file) {
        try {
            if(file.isEmpty()) {
                throw new InternalServerException("Failed to save an empty file.");
            }

            if(file.getOriginalFilename() == null) {
                throw new InternalServerException("File's original filename is null.");
            }

            String[] splitFilename = file.getOriginalFilename().split("\\.");
            String fileExtension = splitFilename[splitFilename.length - 1];

            if(fileExtension.length() > 4) {
                throw new MethodNotAllowedException("File's extension name is too long (max 4 characters).");
            }

            Path destinationFile = rootLocation.resolve(
                    Path.of(String.format("%s.%s", UUID.randomUUID(), fileExtension)).normalize()
            ).toAbsolutePath();

            if(!destinationFile.getParent().equals(rootLocation.toAbsolutePath())) {
                throw new InternalServerException("Cannot store file outside the uploads folder.");
            }

            BufferedInputStream inputStream = new BufferedInputStream(file.getInputStream());

            if(!isFileAnImage(inputStream, fileExtension)) {
                throw new MethodNotAllowedException("Detected disallowed image type. Allowed MIME types are: " + validMimeTypes.toString());
            }

            Files.copy(inputStream, destinationFile, StandardCopyOption.REPLACE_EXISTING);

            return destinationFile;
        } catch(IOException exception) {
            throw new InternalServerException("Failed to save a file.");
        }
    }

    public boolean isFileAnImage(InputStream inputStream, String fileExtension) {
        if(inputStream == null) {
            throw new MethodNotAllowedException("Detected invalid file format.");
        }

        String fileName = fileExtension != null ? "image." + fileExtension : "image";

        try {
            MimeType detectedMimeType = MimeType.valueOf(tika.detect(inputStream, fileName));
            if(!validMimeTypes.contains(detectedMimeType)) {
                return false;
            }
        } catch (IOException e) {
            throw new MethodNotAllowedException("Detected invalid file format.");
        }

        return true;
    }

    public Path load(String filename) {
        return rootLocation.resolve(filename);
    }

    public String unload(String filepath) {
        return filepath.replace(rootLocation.toString(), "").substring(1);
    }

    public Resource loadAsResource(String filename) {
        try {
            Path file = load(filename);
            Resource resource = new UrlResource(file.toUri());

            if(resource.exists() && resource.isReadable()) {
                return resource;
            } else {
                throw new MalformedURLException();
            }
        } catch(MalformedURLException exception) {
            throw new NotFoundException("File not found.");
        }
    }

    public void deleteResource(String filename) {
        try {
            Path file = load(filename);
            Resource resource = new UrlResource(file.toUri());

            if(resource.exists()) {
                Files.delete(file);
            } else {
                throw new MalformedURLException();
            }
        } catch (MalformedURLException e) {
            throw new NotFoundException("File not found");
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}