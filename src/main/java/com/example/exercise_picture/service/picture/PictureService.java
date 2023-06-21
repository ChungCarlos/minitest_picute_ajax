package com.example.exercise_picture.service.picture;

import com.example.exercise_picture.model.Category;
import com.example.exercise_picture.model.Picture;
import com.example.exercise_picture.repository.IPictureRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class PictureService implements IPictureService {
    @Autowired
    private IPictureRepo pictureRepo;
    @Override
    public Iterable<Picture> findAll() {
        return pictureRepo.findAll();
    }

    @Override
    public Optional<Picture> findById(Long id) {
        return pictureRepo.findById(id);
    }

    @Override
    public Picture save(Picture picture) {
       return pictureRepo.save(picture);
    }

    @Override
    public void remove(Long id) {
        pictureRepo.deleteById(id);
    }

    @Override
    public List<Picture> findByCategory(Category category) {
        return pictureRepo.findAllByCategories(category);
    }
}
