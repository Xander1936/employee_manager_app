package tech.getarrays.employeemanager.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import tech.getarrays.employeemanager.model.Employee;

import java.util.List;
import java.util.Optional;

public interface EmployeeRepo extends JpaRepository<Employee, Long> {

    List<Employee> findAll();

    Optional<Employee> findEmployeeById(Long id);

    void deleteEmployeeById(Long id);

}
