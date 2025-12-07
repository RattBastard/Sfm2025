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
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
        Room room1 = roomService.findByRoomNumber(roomNumber);
        model.addAttribute("room", room1);

        List<Reservation> reservations = reservationService.getAllReservation();
        model.addAttribute("reservationsList", reservations);

        Map<Long, Integer> roomNumbers = new HashMap<>();
        for (Reservation reservation : reservations) {
            Room room2 = roomService.findByRoomID(reservation.getRoomID());
            roomNumbers.put(reservation.getID(), room2.getRoomNumber());
        }
        model.addAttribute("roomNumbers", roomNumbers);
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

    @PostMapping("/floors/{roomNumber}")
    public String saveReservation(@PathVariable int roomNumber,@ModelAttribute("newReservation") Reservation reservation, Model model) throws Exception {
        Room room = roomService.findByRoomNumber(roomNumber);

        try {
            reservation.setRoomID(room.getRoomID());
            reservationService.makeNewReservation(reservation.getRoomID(),
                    reservation.getSubjectID(),
                    reservation.getEvent(),
                    reservation.getStart(),
                    reservation.getEnd());
        }
        catch (Exception e) {
            model.addAttribute("errorMessage", e.getMessage());
            model.addAttribute("room", room);
            model.addAttribute("teachers", teacherService.getAllTeacher());
            return "createReservation";
        }

        return "redirect:/floors/" + roomNumber;
    }

    @GetMapping("/floors/edit/{reservationID}")
    public String showReservationEdit(@PathVariable Long reservationID, Model model) {
        Reservation reservation = reservationService.findByID(reservationID);
        Room room = roomService.findByRoomID(reservation.getRoomID());
        List<Teacher> teachers = teacherService.getAllTeacher();

        model.addAttribute("reservation", reservation);
        model.addAttribute("room", room);
        model.addAttribute("teachers", teachers);
        return "editReservation";
    }

    @PostMapping("/floors/edit/{reservationID}")
    public String updateReservation(@PathVariable Long reservationID,
                                    @ModelAttribute Reservation updatedReservation) {
        Reservation reservation = reservationService.findByID(reservationID);

        reservation.setSubjectID(updatedReservation.getSubjectID());
        reservation.setEvent(updatedReservation.getEvent());
        reservation.setStart(updatedReservation.getStart());
        reservation.setEnd(updatedReservation.getEnd());

        reservationService.save(reservation);

        Room room = roomService.findByRoomID(reservation.getRoomID());
        return "redirect:/floors/" + room.getRoomNumber();
    }

    @PostMapping("/floors/delete/{reservationID}")
    public String deleteReservation(@PathVariable Long reservationID) {
        Reservation reservation = reservationService.findByID(reservationID);
        Long roomID = reservation.getRoomID();
        Room room = roomService.findByRoomID(roomID);
        int roomNumber = room.getRoomNumber();
        reservationService.deleteByID(reservation.getID());
        return  "redirect:/floors/" + roomNumber;
    }

}
