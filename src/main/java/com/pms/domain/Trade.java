package com.pms.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;

/**
 * A Trade.
 */
@Entity
@Table(name = "trade")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Trade implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "unique_tag", nullable = false)
    private String uniqueTag;

    @NotNull
    @Column(name = "trade_date", nullable = false)
    private LocalDate tradeDate;

    @NotNull
    @Column(name = "side", nullable = false)
    private String side;

    @NotNull
    @Column(name = "quantity", nullable = false)
    private Integer quantity;

    @NotNull
    @Column(name = "product_id", nullable = false)
    private String productId;

    @NotNull
    @Column(name = "price", precision = 21, scale = 2, nullable = false)
    private BigDecimal price;

    @NotNull
    @Column(name = "currency", nullable = false)
    private String currency;

    @NotNull
    @Column(name = "execution_time", nullable = false)
    private Instant executionTime;

    @NotNull
    @Column(name = "primary_account", nullable = false)
    private String primaryAccount;

    @NotNull
    @Column(name = "versus_account", nullable = false)
    private String versusAccount;

    @NotNull
    @Column(name = "trader", nullable = false)
    private String trader;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUniqueTag() {
        return uniqueTag;
    }

    public Trade uniqueTag(String uniqueTag) {
        this.uniqueTag = uniqueTag;
        return this;
    }

    public void setUniqueTag(String uniqueTag) {
        this.uniqueTag = uniqueTag;
    }

    public LocalDate getTradeDate() {
        return tradeDate;
    }

    public Trade tradeDate(LocalDate tradeDate) {
        this.tradeDate = tradeDate;
        return this;
    }

    public void setTradeDate(LocalDate tradeDate) {
        this.tradeDate = tradeDate;
    }

    public String getSide() {
        return side;
    }

    public Trade side(String side) {
        this.side = side;
        return this;
    }

    public void setSide(String side) {
        this.side = side;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public Trade quantity(Integer quantity) {
        this.quantity = quantity;
        return this;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public String getProductId() {
        return productId;
    }

    public Trade productId(String productId) {
        this.productId = productId;
        return this;
    }

    public void setProductId(String productId) {
        this.productId = productId;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public Trade price(BigDecimal price) {
        this.price = price;
        return this;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public String getCurrency() {
        return currency;
    }

    public Trade currency(String currency) {
        this.currency = currency;
        return this;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public Instant getExecutionTime() {
        return executionTime;
    }

    public Trade executionTime(Instant executionTime) {
        this.executionTime = executionTime;
        return this;
    }

    public void setExecutionTime(Instant executionTime) {
        this.executionTime = executionTime;
    }

    public String getPrimaryAccount() {
        return primaryAccount;
    }

    public Trade primaryAccount(String primaryAccount) {
        this.primaryAccount = primaryAccount;
        return this;
    }

    public void setPrimaryAccount(String primaryAccount) {
        this.primaryAccount = primaryAccount;
    }

    public String getVersusAccount() {
        return versusAccount;
    }

    public Trade versusAccount(String versusAccount) {
        this.versusAccount = versusAccount;
        return this;
    }

    public void setVersusAccount(String versusAccount) {
        this.versusAccount = versusAccount;
    }

    public String getTrader() {
        return trader;
    }

    public Trade trader(String trader) {
        this.trader = trader;
        return this;
    }

    public void setTrader(String trader) {
        this.trader = trader;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Trade)) {
            return false;
        }
        return id != null && id.equals(((Trade) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Trade{" +
            "id=" + getId() +
            ", uniqueTag='" + getUniqueTag() + "'" +
            ", tradeDate='" + getTradeDate() + "'" +
            ", side='" + getSide() + "'" +
            ", quantity=" + getQuantity() +
            ", productId='" + getProductId() + "'" +
            ", price=" + getPrice() +
            ", currency='" + getCurrency() + "'" +
            ", executionTime='" + getExecutionTime() + "'" +
            ", primaryAccount='" + getPrimaryAccount() + "'" +
            ", versusAccount='" + getVersusAccount() + "'" +
            ", trader='" + getTrader() + "'" +
            "}";
    }

    public Integer getSignedQuantity() {
        if (side.equals("Buy")) {
            return quantity;
        } else {
            return -quantity;
        }
    }
}
