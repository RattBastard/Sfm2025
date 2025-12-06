package com.example.backend.room;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class RoomService {
    @Autowired
    private RoomRepository roomRepository;

    public List<Integer> findByFloor(int floorNumber) {
        List<Room> rooms = roomRepository.findByFloor(floorNumber);
        return rooms.stream().map(room -> room.getRoomNumber()).collect(Collectors.toList());
    }
}
