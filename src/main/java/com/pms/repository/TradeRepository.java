package com.pms.repository;

import com.pms.domain.Trade;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Trade entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TradeRepository extends JpaRepository<Trade, Long> {
}
