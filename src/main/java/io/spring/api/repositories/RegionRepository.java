package io.spring.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import io.spring.api.models.Region;

@Repository
public interface RegionRepository extends JpaRepository<Region, Integer> {
    
}
