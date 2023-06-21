package com.example.exercise_picture;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ExerciseFictureApplication {

    public static void main(String[] args) {
        SpringApplication.run(ExerciseFictureApplication.class, args);
    }

//        @Bean
//    CommandLineRunner run(UserService userService){
//        return args -> {
//            userService.saveRole(new Role(null,"ROLE_USER"));
//            userService.saveRole(new Role(null,"ROLE_MANAGE"));
//            userService.saveRole(new Role(null,"ROLE_ADMIN"));
//            userService.saveRole(new Role(null,"ROLE_SUPER_ADMIN"));
//
//            userService.saveUser(new User(null,"ChungCarlos","Chungcarlos@gmail.com","123456",new HashSet<>()));
//            userService.saveUser(new User(null,"Chung","ChungCarlos95@gmail.com","123456",new HashSet<>()));
//
//            userService.addToUser("Chungcarlos@gmail.com","ROLE_USER");
//            userService.addToUser("ChungCarlos@gmail.com","ROLE_MANAGE");
//
//            userService.addToUser("ChungCarlos95@gmail.com","ROLE_ADMIN");
//            userService.addToUser("ChungCarlos95@gmail.com","ROLE_SUPER_ADMIN");
//        };
//    }
}
