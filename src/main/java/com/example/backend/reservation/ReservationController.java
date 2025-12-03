package com.example.backend.reservation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping(path = "api")
public class ReservationController {

    @Autowired
    private ReservationService reservationService;

    @GetMapping("reservation")
    public List<Reservation> allReservation() {
        return reservationService.getAllReservation();
    }
}
