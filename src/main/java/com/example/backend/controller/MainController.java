package com.example.backend.controller;

import com.example.backend.reservation.Reservation;
import com.example.backend.room.Room;
import com.example.backend.room.RoomService;
import com.example.backend.teacher.Teacher;
import com.example.backend.teacher.TeacherRepository;
import com.example.backend.teacher.TeacherService;
import org.springframework.ui.Model;
import com.example.backend.reservation.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Controller
public class MainController {

    @Autowired
    private ReservationService reservationService;
    @Autowired
    private RoomService roomService;
    @Autowired
    private TeacherService teacherService;

    @GetMapping("/floors")
    public String showFloors(@RequestParam (required = false) Integer floor, Model model) {
        List<String> floors = new ArrayList<>(List.of("Foldszint", "1. emelet", "2. emelet", "3. emelet"));
        model.addAttribute("floors", floors);

        if (floor != null) {
            List<Integer> rooms = roomService.findByFloor(floor);
            model.addAttribute("rooms", rooms);
        }
        return "floors";
    }

    @GetMapping("/floors/{roomNumber}")
    public String showReservation(@PathVariable int roomNumber, Model model) {
        Room room = roomService.findByRoomNumber(roomNumber);
        model.addAttribute("room", room);

        model.addAttribute("reservationsList", reservationService.getAllReservation());
        return "reservations";
    }

    @GetMapping("/floors/{roomNumber}/new")
    public String makeNewReservation(@PathVariable int roomNumber, Model model) {
        Room room = roomService.findByRoomNumber(roomNumber);
        model.addAttribute("room", room);

        Reservation reservation = new Reservation();
        reservation.setRoomID(room.getRoomID());
        model.addAttribute("newReservation", reservation);

        List<Teacher> teachers = teacherService.getAllTeacher();
        model.addAttribute("teachers", teachers);
        return "createReservation";
    }

    @PostMapping("/floors/{roomNumber}/new")
    public String makeReservation(@PathVariable int roomNumber,@ModelAttribute("newReservation") Reservation reservation) throws Exception {
        Room room = roomService.findByRoomNumber(roomNumber);

        reservation.setRoomID(room.getRoomID());
        reservationService.makeNewReservation(reservation.getRoomID(),
                            reservation.getSubjectID(),
                            reservation.getEvent(),
                            reservation.getStart(),
                            reservation.getEnd());

        return "redirect:/floors/" + roomNumber;
    }
}
