package com.example.backend.controller;

import org.springframework.ui.Model;
import com.example.backend.reservation.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.ArrayList;
import java.util.List;

@Controller
public class MainController {

    @Autowired
    private ReservationService reservationService;

    @GetMapping("/floors")
    public String showFloors(Model model) {
        List<String> floors = new ArrayList<>(List.of("Foldszint", "1. emelet", "2. emelet", "3. emelet"));
        model.addAttribute("floors", floors);
        return "floors";
    }
}
