package com.example.exercise_picture.service.picture;

import com.example.exercise_picture.model.Category;
import com.example.exercise_picture.model.Picture;
import com.example.exercise_picture.service.IGeneralService;
import com.example.exercise_picture.service.category.ICategoryService;


import java.util.List;
import java.util.Optional;

public interface IPictureService extends IGeneralService<Picture> {
    Iterable<Picture> findAll();

    Optional<Picture> findById(Long id);

    Picture save(Picture picture);

    void remove(Long id);
//    List<Picture> findByCategory(Category category);
//
//    List<Picture> findPictureByName(String name);

}
