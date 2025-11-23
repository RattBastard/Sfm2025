package com.example.backend.reservation;

import com.example.backend.room.Room;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class ReservationService {

    private final ReservationRepository reservationRepository;

    @Autowired
    public ReservationService(ReservationRepository reservationRepository) {
        this.reservationRepository = reservationRepository;
    }

    public List<Reservation> getAllReservation() {
        return reservationRepository.findAll();
    }

    public List<Reservation> getAllReservationByRoom(Room room) {
        return reservationRepository.findAll().stream()
                .filter(reservation -> room.equals(room.getRoomID()))
                .collect(Collectors.toList());
    }
    @SneakyThrows
    public Reservation makeReservation(Room room, LocalDateTime start, LocalDateTime end, String event) {
        List<Reservation> conflict = reservationRepository.reserve(room, start, end);

        if (!conflict.isEmpty()) {
            throw new Exception("A terem mar foglalt!");
        }

        Reservation reservation = new Reservation();
        reservation.setRoomID(room.getRoomID());
        reservation.setStart(start);
        reservation.setEnd(end);
        reservation.setEvent(event);

        return reservationRepository.save(reservation);
    }
}
