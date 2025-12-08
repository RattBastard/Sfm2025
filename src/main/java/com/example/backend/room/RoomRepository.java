package com.example.backend.room;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {

    public Room findByRoomID(Long roomID);

    public List<Room> findByFloor(int floorNumber);

    public Room findByRoomNumber(int roomNumber);
}
