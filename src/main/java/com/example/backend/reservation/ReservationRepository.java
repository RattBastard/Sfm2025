package com.example.backend.reservation;

import com.example.backend.room.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    public List<Reservation> findByRoomIDAndStartLessThanAndEndGreaterThan(Long roomID, LocalDateTime start, LocalDateTime end);

}
