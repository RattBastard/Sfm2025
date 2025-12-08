package com.example.backend;

import com.example.backend.room.Room;
import com.example.backend.room.RoomRepository;
import com.example.backend.room.RoomService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class RoomServiceTest {

    @Mock
    private RoomRepository roomRepository;

    @InjectMocks
    private RoomService roomService;

    @Test
    void testFindByRoomID() {
        Room room = new Room();
        room.setRoomID(5L);

        Mockito.when(roomRepository.findByRoomID(5L))
                .thenReturn(room);

        Room result = roomService.findByRoomID(5L);

        assertNotNull(result);
        assertEquals(5L, result.getRoomID());
    }

    @Test
    void testFindByFloor() {
        Room r1 = new Room();
        r1.setRoomNumber(101);

        Room r2 = new Room();
        r2.setRoomNumber(102);

        Mockito.when(roomRepository.findByFloor(1))
                .thenReturn(List.of(r1, r2));

        List<Integer> result = roomService.findByFloor(1);

        assertEquals(2, result.size());
        assertTrue(result.contains(101));
        assertTrue(result.contains(102));
    }

    @Test
    void testFindByRoomNumber() {
        Room room = new Room();
        room.setRoomNumber(205);

        Mockito.when(roomRepository.findByRoomNumber(205))
                .thenReturn(room);

        Room result = roomService.findByRoomNumber(205);

        assertEquals(205, result.getRoomNumber());
    }
}
