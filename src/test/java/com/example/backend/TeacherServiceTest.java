package com.example.backend;

import com.example.backend.teacher.Teacher;
import com.example.backend.teacher.TeacherRepository;
import com.example.backend.teacher.TeacherService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class TeacherServiceTest {

    @Mock
    private TeacherRepository teacherRepository;

    @InjectMocks
    private TeacherService teacherService;

    @Test
    void testGetAllTeacher() {
        Teacher t1 = new Teacher();
        Teacher t2 = new Teacher();

        Mockito.when(teacherRepository.findAll())
                .thenReturn(List.of(t1, t2));

        List<Teacher> result = teacherService.getAllTeacher();

        assertEquals(2, result.size());
    }
}
