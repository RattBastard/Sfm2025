package com.example.backend.reservation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ReservationService {
    @Autowired
    private ReservationRepository reservationRepository;

    public List<Reservation> getAllReservation() {
        return reservationRepository.findAll();
    }

    public boolean checkIfDateAlreadyReserved(Long roomID, LocalDateTime start, LocalDateTime end) {
        return !reservationRepository.findByRoomIDAndStartLessThanAndEndGreaterThan(roomID, end, start).isEmpty();
    }

    public Reservation makeNewReservation(Long roomID, Long subjectID, String event, LocalDateTime start, LocalDateTime end) throws Exception {
        if (checkIfDateAlreadyReserved(roomID, start, end)) {
            throw new Exception("A terem mar foglalt!");
        }

        Reservation reservation = new Reservation();
        reservation.setRoomID(roomID);
        reservation.setSubjectID(subjectID);
        reservation.setEvent(event);
        reservation.setStart(start);
        reservation.setEnd(end);
        return reservationRepository.save(reservation);
    }
}
