package com.pms.web.rest;

import com.pms.service.PositionService;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * REST controller for managing {@link com.pms.service.PositionService}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class PositionResource {

    private final Logger log = LoggerFactory.getLogger(PositionResource.class);

    private final PositionService positionService;

    public PositionResource(PositionService positionService) {
        this.positionService = positionService;
    }

    /**
     * {@code GET  /positions} : get all positions.
     *
     * @return the positions with status {@code 200 (OK)} and the list of positions in body.
     */
    @GetMapping("/positions")
    public ResponseEntity<List<PositionService.Position>> getAllPositions() {
        log.debug("REST request to get all positions");
        return ResponseEntity.ok().body(positionService.getAllPositions());
    }

    /**
     * {@code GET  /positions/:positionKey} : get the position for "positionKey".
     *
     * @param positionKey the id of the position to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the position, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/positions/{positionKey}")
    public ResponseEntity<?> getPosition(@PathVariable String positionKey) {
        log.debug("REST request to get Position : {}", positionKey);
        positionService.getPosition(positionKey);
        return ResponseUtil.wrapOrNotFound(positionService.getPosition(positionKey));
    }
}
