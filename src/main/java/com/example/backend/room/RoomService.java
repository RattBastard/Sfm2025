package com.example.backend.room;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RoomService {
    @Autowired
    private RoomRepository roomRepository;

    public Room findByRoomID(Long roomID) {
        return roomRepository.findByRoomID(roomID);
    }

    public List<Integer> findByFloor(int floorNumber) {
        List<Room> rooms = roomRepository.findByFloor(floorNumber);
        return rooms.stream().map(room -> room.getRoomNumber()).collect(Collectors.toList());
    }

    public Room findByRoomNumber(int roomNumber) {
        return roomRepository.findByRoomNumber(roomNumber);
    }

    // ========== NEW METHODS FOR REST API ==========

    public List<Room> findAllByFloor(int floorNumber) {
        return roomRepository.findByFloor(floorNumber);
    }

    public List<Room> findAll() {
        return roomRepository.findAll();
    }
}