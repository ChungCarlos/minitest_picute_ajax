package com.example.exercise_picture.repository;


import com.example.exercise_picture.model.Category;
import com.example.exercise_picture.model.Picture;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IPictureRepo extends JpaRepository<Picture,Long> {
    List<Picture> findByNameContainingIgnoreCase(String name);
    List<Picture> findAllByCategories(Category category);
}
