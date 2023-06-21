package com.example.exercise_picture.controller;

import com.example.exercise_picture.model.Picture;
import com.example.exercise_picture.repository.IPictureRepo;
import com.example.exercise_picture.service.picture.IPictureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@CrossOrigin("*")
@RestController
@RequestMapping("/pictures")
public class PictureController {
//    private CategoryServiceImpl categoryService;
    @Autowired
    private IPictureService pictureService;
    @Autowired
    private IPictureRepo iPictureRepo;

    @PostMapping
    public ResponseEntity<Picture> createPicture(@RequestBody Picture picture) {
        return new ResponseEntity<>(pictureService.save(picture), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<Iterable<Picture>> allPicture() {
        return new ResponseEntity<>(pictureService.findAll(), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Picture> deletePicture(@PathVariable Long id) {
        Optional<Picture> pictureOptional = pictureService.findById(id);
        if (!pictureOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        pictureService.remove(id);
        return new ResponseEntity<>(pictureOptional.get(), HttpStatus.NO_CONTENT);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Picture> detailPicture(@PathVariable Long id){
        Optional<Picture> pictureOptional = pictureService.findById(id);
        if (!pictureOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(pictureOptional.get(), HttpStatus.OK);
    }


    @PutMapping("/{id}")
    public ResponseEntity<Void> update(@PathVariable Long id, @RequestBody Picture picture) {
        if (this.pictureService.findById(id).isPresent()) {
            picture.setId(id);
            this.pictureService.save(picture);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/search")
    public List<Picture> searchPicturesByName(@RequestParam("name") String name) {
        return iPictureRepo.findByNameContainingIgnoreCase(name);
    }

}
