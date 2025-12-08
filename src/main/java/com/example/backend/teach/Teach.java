package com.example.backend.teach;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "tanitja")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Teach {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ID;
    private Long subjectID;
    private Long teacherID;
}
