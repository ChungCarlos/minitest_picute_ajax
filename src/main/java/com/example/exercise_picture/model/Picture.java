package com.example.exercise_picture.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Pictures")
public class Picture{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private int height;
    private int width;
    private String material;
    private String description;
    private double price;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "pictures_categories",
            joinColumns = @JoinColumn(name = "Picture_Id"),
            inverseJoinColumns = @JoinColumn(name = "Category_Id"))
    private List<Category> categories;
}
