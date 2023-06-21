package com.example.exercise_picture.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@Data
@NoArgsConstructor
@Table(name = "Categories")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name_category;
    @ManyToMany(mappedBy = "categories",fetch = FetchType.LAZY)
    @Fetch(value = FetchMode.SELECT)
    @JsonIgnore
    private List<Picture> pictures;

    public Category(Long id, String name_category) {
        this.id = id;
        this.name_category = name_category;
    }
}
