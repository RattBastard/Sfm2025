package com.example.backend.reservation;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "foglalas")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ID;
    @Column(name = "TeremID")
    private Long roomID;
    @Column(name = "TargyID")
    private Long subjectID;
    @Column(name = "Esemeny")
    private String event;
    @Column(name = "Kezdido")
    private LocalDateTime start;
    @Column(name = "Vegido")
    private LocalDateTime end;
}