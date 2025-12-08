package com.example.backend.room;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "terem")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long roomID;
    @Column(name = "Emelet")
    private int floor;
    @Column(name = "Teremszam")
    private int roomNumber;
    @Column(name = "Gepterem")
    private boolean computerRoom;
    @Column(name = "Nagyterem")
    private boolean bigRoom;
}
