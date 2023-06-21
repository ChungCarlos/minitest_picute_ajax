package com.example.exercise_picture.service.category;

import com.example.exercise_picture.model.Category;
import com.example.exercise_picture.service.IGeneralService;

import java.util.Optional;

public interface ICategoryService extends IGeneralService<Category> {
    Iterable<Category> findAll();

    Optional<Category> findById(Long id);

    Category save(Category category);

    void remove(Long id);
}
