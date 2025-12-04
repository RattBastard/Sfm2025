package com.example.backend.reservation;

import com.example.backend.room.Room;
import com.example.backend.room.RoomRepository;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.Local;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class ReservationService {
    @Autowired
    private  ReservationRepository reservationRepository;
    private RoomRepository roomRepository;

    public List<Reservation> getAllReservation() {
        return reservationRepository.findAll();
    }

    public List<Integer> findByFloor(int floorNumber) {
        List<Room> rooms = roomRepository.findByFloor(floorNumber);
        return rooms.stream().map(room -> room.getRoomNumber()).collect(Collectors.toList());
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
