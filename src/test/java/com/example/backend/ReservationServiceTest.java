package com.example.backend;

import com.example.backend.reservation.Reservation;
import com.example.backend.reservation.ReservationRepository;
import com.example.backend.reservation.ReservationService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class ReservationServiceTest {

    @Mock
    private ReservationRepository reservationRepository;

    @InjectMocks
    private ReservationService reservationService;

    @Test
    void testFindByID() {
        Reservation res = new Reservation();
        res.setID(1L);

        Mockito.when(reservationRepository.findById(1L))
                .thenReturn(Optional.of(res));

        Reservation result = reservationService.findByID(1L);

        assertNotNull(result);
        assertEquals(1L, result.getID());
    }

    @Test
    void testDeleteByID() {
        reservationService.deleteByID(1L);
        Mockito.verify(reservationRepository, Mockito.times(1)).deleteById(1L);
    }

    @Test
    void testGetAllReservation() {
        Mockito.when(reservationRepository.findAll())
                .thenReturn(List.of(new Reservation(), new Reservation()));

        List<Reservation> result = reservationService.getAllReservation();

        assertEquals(2, result.size());
    }

    @Test
    void testCheckIfDateAlreadyReserved_ReturnsTrue_WhenConflictExists() {
        Long roomID = 1L;
        LocalDateTime start = LocalDateTime.now();
        LocalDateTime end = start.plusHours(1);

        Mockito.when(reservationRepository
                        .findByRoomIDAndStartLessThanAndEndGreaterThan(roomID, end, start))
                .thenReturn(List.of(new Reservation()));

        boolean result = reservationService.checkIfDateAlreadyReserved(roomID, start, end);

        assertTrue(result);
    }

    @Test
    void testCheckIfDateAlreadyReserved_ReturnsFalse_WhenNoConflict() {
        Long roomID = 1L;
        LocalDateTime start = LocalDateTime.now();
        LocalDateTime end = start.plusHours(1);

        Mockito.when(reservationRepository
                        .findByRoomIDAndStartLessThanAndEndGreaterThan(roomID, end, start))
                .thenReturn(List.of());

        boolean result = reservationService.checkIfDateAlreadyReserved(roomID, start, end);

        assertFalse(result);
    }

    @Test
    void testMakeNewReservation_ThrowsException_WhenRoomAlreadyReserved() {
        Long roomID = 1L;
        LocalDateTime start = LocalDateTime.now();
        LocalDateTime end = start.plusHours(1);

        Mockito.when(reservationRepository
                        .findByRoomIDAndStartLessThanAndEndGreaterThan(roomID, end, start))
                .thenReturn(List.of(new Reservation()));

        Exception ex = assertThrows(Exception.class, () ->
                reservationService.makeNewReservation(roomID, 2L, "Event", start, end)
        );

        assertEquals("A terem mar foglalt!", ex.getMessage());
    }

    @Test
    void testMakeNewReservation_ThrowsException_WhenStartAfterEnd() {
        Long roomID = 1L;
        LocalDateTime start = LocalDateTime.now().plusHours(1);
        LocalDateTime end = LocalDateTime.now();

        Exception ex = assertThrows(Exception.class, () ->
                reservationService.makeNewReservation(roomID, 2L, "Event", start, end)
        );

        assertEquals("A kezdesi idopont nem lehet nagyobb mint a befejezes!", ex.getMessage());
    }

    @Test
    void testMakeNewReservation_SuccessfulSave() throws Exception {
        Long roomID = 1L;
        Long subjectID = 2L;
        LocalDateTime start = LocalDateTime.now();
        LocalDateTime end = start.plusHours(1);

        Reservation saved = new Reservation();
        saved.setID(10L);

        Mockito.when(reservationRepository
                        .findByRoomIDAndStartLessThanAndEndGreaterThan(roomID, end, start))
                .thenReturn(List.of());

        Mockito.when(reservationRepository.save(Mockito.any(Reservation.class)))
                .thenReturn(saved);

        Reservation result = reservationService.makeNewReservation(roomID, subjectID, "Event", start, end);

        assertNotNull(result);
        assertEquals(10L, result.getID());
        Mockito.verify(reservationRepository).save(Mockito.any(Reservation.class));
    }
}
