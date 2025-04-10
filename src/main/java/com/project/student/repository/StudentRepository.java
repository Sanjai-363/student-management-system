package com.project.student.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.student.model.Student;

public interface StudentRepository extends JpaRepository<Student, Long> {
}
