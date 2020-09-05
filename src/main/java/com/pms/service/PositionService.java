package com.pms.service;

import com.pms.domain.Trade;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.MathContext;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@Transactional
public class PositionService {

    private final Logger log = LoggerFactory.getLogger(PositionService.class);

    private final HashMap<String, Position> positionStore = new HashMap<>();

    public void addTrade(Trade trade) {
        log.debug("Processing addTrade for trade '{}'", trade.getUniqueTag());

        // Get position effects
        ArrayList<PositionEffect> positionEffects = getPositionEffects(trade);
        ApplyPositionEffects(positionEffects);

        log.debug("Position has been updated for trade '{}'", trade.getUniqueTag());
        printCurrentPositions();
    }

    public void updateTrade(Trade origTrade, Trade updatedTrade) {
        log.debug("Processing updateTrade for trade '{}'", origTrade.getUniqueTag());

        // Reverse position effects
        ArrayList<PositionEffect> origPositionEffects = reversePositionEffect(getPositionEffects(origTrade));
        ApplyPositionEffects(origPositionEffects);

        // Apply position effects
        ArrayList<PositionEffect> newPositionEffects = getPositionEffects(updatedTrade);
        ApplyPositionEffects(newPositionEffects);

        log.debug("Position has been updated for trade '{}'", origTrade.getUniqueTag());

        printCurrentPositions();
    }

    public List<Position> getAllPositions() {
        return new ArrayList<>(positionStore.values());
    }

    public Optional<Position> getPosition(String positionKey) {
        return Optional.ofNullable(positionStore.get(positionKey));
    }

    private void printCurrentPositions() {
        for (Map.Entry<String, Position> positionEntry : positionStore.entrySet()) {
            log.debug("Position key '{}', value '{}'", positionEntry.getKey(), positionEntry.getValue());
        }
    }

    private void ApplyPositionEffects(ArrayList<PositionEffect> origPositionEffects) {
        for (PositionEffect positionEffect : origPositionEffects) {
            String positionKey = positionEffect.getPositionKey();
            Position existingPosition = positionStore.get(positionKey);
            if (existingPosition == null) {
                Position newPosition = new Position();
                newPosition.setProductId(positionEffect.getProductId());
                newPosition.setQuantity(positionEffect.getSignedQuantity());
                newPosition.setAveragePrice(positionEffect.getPrice());
                newPosition.setCurrency(positionEffect.getCurrency());
                positionStore.put(positionKey, newPosition);
            } else {
                BigDecimal existingPositionAveragePrice = existingPosition.getAveragePrice();
                BigDecimal existingPositionQuantity = existingPosition.getQuantity();

                // Handle currency positions because there is no price for them
                if (existingPositionAveragePrice != null) {
                    BigDecimal positionTotalValue = existingPositionAveragePrice.multiply(existingPositionQuantity);
                    BigDecimal newPositionQuantity = existingPositionQuantity.add(positionEffect.getSignedQuantity());

                    if (newPositionQuantity.compareTo(BigDecimal.ZERO) == 0) {
                        existingPosition.setAveragePrice(BigDecimal.ZERO);
                    } else {
                        existingPosition.setAveragePrice(
                            positionTotalValue.divide(newPositionQuantity, new MathContext(6, RoundingMode.HALF_UP)
                            )
                        );
                    }
                }
                existingPosition.setQuantity(existingPositionQuantity.add(positionEffect.getSignedQuantity()));
            }
        }
    }

    private ArrayList<PositionEffect> getPositionEffects(Trade trade) {
        ArrayList<PositionEffect> positionEffects = new ArrayList<>();

        PositionEffect primaryStockPositionEffect = new PositionEffect();
        primaryStockPositionEffect.setPositionKey(trade.getPrimaryAccount() + trade.getProductId() + trade.getCurrency());
        primaryStockPositionEffect.setProductId(trade.getProductId());
        primaryStockPositionEffect.setSignedQuantity(BigDecimal.valueOf(trade.getSignedQuantity()));
        primaryStockPositionEffect.setPrice(trade.getPrice());
        primaryStockPositionEffect.setCurrency(trade.getCurrency());
        positionEffects.add(primaryStockPositionEffect);

        BigDecimal totalCashValue = trade.getPrice().multiply(BigDecimal.valueOf(-trade.getSignedQuantity()));
        PositionEffect primaryCashPositionEffect = new PositionEffect();
        primaryCashPositionEffect.setPositionKey(trade.getPrimaryAccount() + trade.getCurrency());
        primaryCashPositionEffect.setProductId(trade.getCurrency());
        primaryCashPositionEffect.setSignedQuantity(totalCashValue);
        primaryCashPositionEffect.setPrice(null);
        primaryCashPositionEffect.setCurrency(trade.getCurrency());
        positionEffects.add(primaryCashPositionEffect);

        PositionEffect versusStockPositionEffect = new PositionEffect();
        versusStockPositionEffect.setPositionKey(trade.getVersusAccount() + trade.getProductId() + trade.getCurrency());
        versusStockPositionEffect.setProductId(trade.getProductId());
        versusStockPositionEffect.setSignedQuantity(BigDecimal.valueOf(-trade.getSignedQuantity()));
        versusStockPositionEffect.setPrice(trade.getPrice());
        versusStockPositionEffect.setCurrency(trade.getCurrency());
        positionEffects.add(versusStockPositionEffect);

        PositionEffect versusCashPositionEffect = new PositionEffect();
        versusCashPositionEffect.setPositionKey(trade.getVersusAccount() + trade.getCurrency());
        versusCashPositionEffect.setProductId(trade.getProductId());
        versusCashPositionEffect.setSignedQuantity(totalCashValue.negate());
        versusCashPositionEffect.setPrice(null);
        versusCashPositionEffect.setCurrency(trade.getCurrency());
        positionEffects.add(versusCashPositionEffect);

        return positionEffects;
    }

    private ArrayList<PositionEffect> reversePositionEffect( ArrayList<PositionEffect> positionEffects) {
        for (PositionEffect positionEffect : positionEffects) {
            positionEffect.setSignedQuantity(positionEffect.getSignedQuantity().negate());
        }
        return positionEffects;
    }

    static class PositionEffect {
        private String positionKey;
        private String productId;
        private BigDecimal signedQuantity;
        private BigDecimal price;
        private String currency;

        public String getPositionKey() {
            return positionKey;
        }

        public void setPositionKey(String positionKey) {
            this.positionKey = positionKey;
        }

        public String getProductId() {
            return productId;
        }

        public void setProductId(String productId) {
            this.productId = productId;
        }

        public BigDecimal getSignedQuantity() {
            return signedQuantity;
        }

        public void setSignedQuantity(BigDecimal signedQuantity) {
            this.signedQuantity = signedQuantity;
        }

        public BigDecimal getPrice() {
            return price;
        }

        public void setPrice(BigDecimal price) {
            this.price = price;
        }

        public String getCurrency() {
            return currency;
        }

        public void setCurrency(String currency) {
            this.currency = currency;
        }
    }

    public static class Position {
        private String productId;
        private String currency;
        private BigDecimal quantity;
        private BigDecimal averagePrice;

        public String getProductId() {
            return productId;
        }

        public void setProductId(String productId) {
            this.productId = productId;
        }

        public String getCurrency() {
            return currency;
        }

        public void setCurrency(String currency) {
            this.currency = currency;
        }

        public BigDecimal getQuantity() {
            return quantity;
        }

        public void setQuantity(BigDecimal quantity) {
            this.quantity = quantity;
        }

        public BigDecimal getAveragePrice() {
            return averagePrice;
        }

        public void setAveragePrice(BigDecimal averagePrice) {
            this.averagePrice = averagePrice;
        }

        @Override
        public String toString() {
            return "Position{" +
                "productId='" + productId + '\'' +
                ", currency='" + currency + '\'' +
                ", quantity=" + quantity +
                ", averagePrice=" + averagePrice +
                '}';
        }
    }
}
