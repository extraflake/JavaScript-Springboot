package io.spring.api.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.spring.api.dto.Response;
import io.spring.api.dto.ResponseHandler;
import io.spring.api.models.Region;
import io.spring.api.services.RegionService;

@RestController
@RequestMapping("api")
public class RegionRestController {
    private RegionService regionService;

    public RegionRestController(RegionService regionService) {
        this.regionService = regionService;
    }

    // GET ALL
    // localhost:8088/api/region
    @GetMapping("region")
    public ResponseEntity<Object> get() {
        List<Region> regions = regionService.get();
        return ResponseHandler.generateResponse("data ditemukan", HttpStatus.OK, regions);
    }

    // GET BY ID
    // localhost:8088/api/region/{id}
    @GetMapping("region/{id}")
    public ResponseEntity<Object> get(@PathVariable(required = true) Integer id) {
        Region region = regionService.get(id);
        return ResponseHandler.generateResponse("data ditemukan", HttpStatus.OK, region);
    }

    // INSERT
    // localhost:8088/api/region
    @PostMapping("region")
    public ResponseEntity<Object> post(@RequestBody Region region) {
        Boolean result = regionService.save(region);
        if(result) {
            return Response.generateResponse("data berhasil tersimpan", HttpStatus.OK);
        }
        return Response.generateResponse("data gagal tersimpan", HttpStatus.BAD_REQUEST);
    }

    // UPDATE
    // localhost:8088/api/region
    @PutMapping("region")
    public ResponseEntity<Object> put(@RequestBody Region region) {
        Boolean result = regionService.save(region);
        if(result) {
            return Response.generateResponse("data berhasil terupdate", HttpStatus.OK);
        }
        return Response.generateResponse("data gagal terupdate", HttpStatus.BAD_REQUEST);
    }

    // DELETE
    // localhost:8088/api/region/{id}
    @DeleteMapping("region/{id}")
    public ResponseEntity<Object> put(@PathVariable(required = true) Integer id) {
        Boolean result = regionService.delete(id);
        if(result) {
            return Response.generateResponse("data berhasil terhapus", HttpStatus.OK);
        }
        return Response.generateResponse("data gagal terhapus", HttpStatus.BAD_REQUEST);
    }
}
