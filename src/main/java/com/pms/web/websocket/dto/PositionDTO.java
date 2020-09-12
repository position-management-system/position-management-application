package com.pms.web.websocket.dto;

import java.math.BigDecimal;

/**
 * DTO for a position
 */
public class PositionDTO {

    private String account;
    private String productId;
    private String currency;
    private BigDecimal quantity;
    private BigDecimal averagePrice;

    public String getAccount() {
        return account;
    }

    public void setAccount(String account) {
        this.account = account;
    }

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
        return "PositionDTO{" +
            "account='" + account + '\'' +
            ", productId='" + productId + '\'' +
            ", currency='" + currency + '\'' +
            ", quantity=" + quantity +
            ", averagePrice=" + averagePrice +
            '}';
    }
}
