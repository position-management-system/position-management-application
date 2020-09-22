package com.pms.web.rest;

import com.pms.PositionApp;
import com.pms.domain.Trade;
import com.pms.repository.TradeRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.Instant;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link TradeResource} REST controller.
 */
@SpringBootTest(classes = PositionApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class TradeResourceIT {

    private static final String DEFAULT_UNIQUE_TAG = "AAAAAAAAAA";
    private static final String UPDATED_UNIQUE_TAG = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_TRADE_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_TRADE_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_SIDE = "AAAAAAAAAA";
    private static final String UPDATED_SIDE = "BBBBBBBBBB";

    private static final Integer DEFAULT_QUANTITY = 1;
    private static final Integer UPDATED_QUANTITY = 2;

    private static final String DEFAULT_PRODUCT_ID = "AAAAAAAAAA";
    private static final String UPDATED_PRODUCT_ID = "BBBBBBBBBB";

    private static final BigDecimal DEFAULT_PRICE = new BigDecimal(1);
    private static final BigDecimal UPDATED_PRICE = new BigDecimal(2);

    private static final String DEFAULT_CURRENCY = "AAAAAAAAAA";
    private static final String UPDATED_CURRENCY = "BBBBBBBBBB";

    private static final Instant DEFAULT_EXECUTION_TIME = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_EXECUTION_TIME = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_PRIMARY_ACCOUNT = "AAAAAAAAAA";
    private static final String UPDATED_PRIMARY_ACCOUNT = "BBBBBBBBBB";

    private static final String DEFAULT_VERSUS_ACCOUNT = "AAAAAAAAAA";
    private static final String UPDATED_VERSUS_ACCOUNT = "BBBBBBBBBB";

    private static final String DEFAULT_TRADER = "AAAAAAAAAA";
    private static final String UPDATED_TRADER = "BBBBBBBBBB";

    @Autowired
    private TradeRepository tradeRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTradeMockMvc;

    private Trade trade;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Trade createEntity(EntityManager em) {
        Trade trade = new Trade()
            .uniqueTag(DEFAULT_UNIQUE_TAG)
            .tradeDate(DEFAULT_TRADE_DATE)
            .side(DEFAULT_SIDE)
            .quantity(DEFAULT_QUANTITY)
            .productId(DEFAULT_PRODUCT_ID)
            .price(DEFAULT_PRICE)
            .currency(DEFAULT_CURRENCY)
            .executionTime(DEFAULT_EXECUTION_TIME)
            .primaryAccount(DEFAULT_PRIMARY_ACCOUNT)
            .versusAccount(DEFAULT_VERSUS_ACCOUNT)
            .trader(DEFAULT_TRADER);
        return trade;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Trade createUpdatedEntity(EntityManager em) {
        Trade trade = new Trade()
            .uniqueTag(UPDATED_UNIQUE_TAG)
            .tradeDate(UPDATED_TRADE_DATE)
            .side(UPDATED_SIDE)
            .quantity(UPDATED_QUANTITY)
            .productId(UPDATED_PRODUCT_ID)
            .price(UPDATED_PRICE)
            .currency(UPDATED_CURRENCY)
            .executionTime(UPDATED_EXECUTION_TIME)
            .primaryAccount(UPDATED_PRIMARY_ACCOUNT)
            .versusAccount(UPDATED_VERSUS_ACCOUNT)
            .trader(UPDATED_TRADER);
        return trade;
    }

    @BeforeEach
    public void initTest() {
        trade = createEntity(em);
    }

    @Test
    @Transactional
    public void createTrade() throws Exception {
        int databaseSizeBeforeCreate = tradeRepository.findAll().size();
        // Create the Trade
        restTradeMockMvc.perform(post("/api/trades")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(trade)))
            .andExpect(status().isCreated());

        // Validate the Trade in the database
        List<Trade> tradeList = tradeRepository.findAll();
        assertThat(tradeList).hasSize(databaseSizeBeforeCreate + 1);
        Trade testTrade = tradeList.get(tradeList.size() - 1);
        assertThat(testTrade.getUniqueTag()).isEqualTo(DEFAULT_UNIQUE_TAG);
        assertThat(testTrade.getTradeDate()).isEqualTo(DEFAULT_TRADE_DATE);
        assertThat(testTrade.getSide()).isEqualTo(DEFAULT_SIDE);
        assertThat(testTrade.getQuantity()).isEqualTo(DEFAULT_QUANTITY);
        assertThat(testTrade.getProductId()).isEqualTo(DEFAULT_PRODUCT_ID);
        assertThat(testTrade.getPrice()).isEqualTo(DEFAULT_PRICE);
        assertThat(testTrade.getCurrency()).isEqualTo(DEFAULT_CURRENCY);
        assertThat(testTrade.getExecutionTime()).isEqualTo(DEFAULT_EXECUTION_TIME);
        assertThat(testTrade.getPrimaryAccount()).isEqualTo(DEFAULT_PRIMARY_ACCOUNT);
        assertThat(testTrade.getVersusAccount()).isEqualTo(DEFAULT_VERSUS_ACCOUNT);
        assertThat(testTrade.getTrader()).isEqualTo(DEFAULT_TRADER);
    }

    @Test
    @Transactional
    public void createTradeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tradeRepository.findAll().size();

        // Create the Trade with an existing ID
        trade.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTradeMockMvc.perform(post("/api/trades")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(trade)))
            .andExpect(status().isBadRequest());

        // Validate the Trade in the database
        List<Trade> tradeList = tradeRepository.findAll();
        assertThat(tradeList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkUniqueTagIsRequired() throws Exception {
        int databaseSizeBeforeTest = tradeRepository.findAll().size();
        // set the field null
        trade.setUniqueTag(null);

        // Create the Trade, which fails.


        restTradeMockMvc.perform(post("/api/trades")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(trade)))
            .andExpect(status().isBadRequest());

        List<Trade> tradeList = tradeRepository.findAll();
        assertThat(tradeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTradeDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = tradeRepository.findAll().size();
        // set the field null
        trade.setTradeDate(null);

        // Create the Trade, which fails.


        restTradeMockMvc.perform(post("/api/trades")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(trade)))
            .andExpect(status().isBadRequest());

        List<Trade> tradeList = tradeRepository.findAll();
        assertThat(tradeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkSideIsRequired() throws Exception {
        int databaseSizeBeforeTest = tradeRepository.findAll().size();
        // set the field null
        trade.setSide(null);

        // Create the Trade, which fails.


        restTradeMockMvc.perform(post("/api/trades")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(trade)))
            .andExpect(status().isBadRequest());

        List<Trade> tradeList = tradeRepository.findAll();
        assertThat(tradeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkQuantityIsRequired() throws Exception {
        int databaseSizeBeforeTest = tradeRepository.findAll().size();
        // set the field null
        trade.setQuantity(null);

        // Create the Trade, which fails.


        restTradeMockMvc.perform(post("/api/trades")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(trade)))
            .andExpect(status().isBadRequest());

        List<Trade> tradeList = tradeRepository.findAll();
        assertThat(tradeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkProductIdIsRequired() throws Exception {
        int databaseSizeBeforeTest = tradeRepository.findAll().size();
        // set the field null
        trade.setProductId(null);

        // Create the Trade, which fails.


        restTradeMockMvc.perform(post("/api/trades")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(trade)))
            .andExpect(status().isBadRequest());

        List<Trade> tradeList = tradeRepository.findAll();
        assertThat(tradeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPriceIsRequired() throws Exception {
        int databaseSizeBeforeTest = tradeRepository.findAll().size();
        // set the field null
        trade.setPrice(null);

        // Create the Trade, which fails.


        restTradeMockMvc.perform(post("/api/trades")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(trade)))
            .andExpect(status().isBadRequest());

        List<Trade> tradeList = tradeRepository.findAll();
        assertThat(tradeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCurrencyIsRequired() throws Exception {
        int databaseSizeBeforeTest = tradeRepository.findAll().size();
        // set the field null
        trade.setCurrency(null);

        // Create the Trade, which fails.


        restTradeMockMvc.perform(post("/api/trades")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(trade)))
            .andExpect(status().isBadRequest());

        List<Trade> tradeList = tradeRepository.findAll();
        assertThat(tradeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkExecutionTimeIsRequired() throws Exception {
        int databaseSizeBeforeTest = tradeRepository.findAll().size();
        // set the field null
        trade.setExecutionTime(null);

        // Create the Trade, which fails.


        restTradeMockMvc.perform(post("/api/trades")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(trade)))
            .andExpect(status().isBadRequest());

        List<Trade> tradeList = tradeRepository.findAll();
        assertThat(tradeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPrimaryAccountIsRequired() throws Exception {
        int databaseSizeBeforeTest = tradeRepository.findAll().size();
        // set the field null
        trade.setPrimaryAccount(null);

        // Create the Trade, which fails.


        restTradeMockMvc.perform(post("/api/trades")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(trade)))
            .andExpect(status().isBadRequest());

        List<Trade> tradeList = tradeRepository.findAll();
        assertThat(tradeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkVersusAccountIsRequired() throws Exception {
        int databaseSizeBeforeTest = tradeRepository.findAll().size();
        // set the field null
        trade.setVersusAccount(null);

        // Create the Trade, which fails.


        restTradeMockMvc.perform(post("/api/trades")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(trade)))
            .andExpect(status().isBadRequest());

        List<Trade> tradeList = tradeRepository.findAll();
        assertThat(tradeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTraderIsRequired() throws Exception {
        int databaseSizeBeforeTest = tradeRepository.findAll().size();
        // set the field null
        trade.setTrader(null);

        // Create the Trade, which fails.


        restTradeMockMvc.perform(post("/api/trades")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(trade)))
            .andExpect(status().isBadRequest());

        List<Trade> tradeList = tradeRepository.findAll();
        assertThat(tradeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTrades() throws Exception {
        // Initialize the database
        tradeRepository.saveAndFlush(trade);

        // Get all the tradeList
        restTradeMockMvc.perform(get("/api/trades?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(trade.getId().intValue())))
            .andExpect(jsonPath("$.[*].uniqueTag").value(hasItem(DEFAULT_UNIQUE_TAG)))
            .andExpect(jsonPath("$.[*].tradeDate").value(hasItem(DEFAULT_TRADE_DATE.toString())))
            .andExpect(jsonPath("$.[*].side").value(hasItem(DEFAULT_SIDE)))
            .andExpect(jsonPath("$.[*].quantity").value(hasItem(DEFAULT_QUANTITY)))
            .andExpect(jsonPath("$.[*].productId").value(hasItem(DEFAULT_PRODUCT_ID)))
            .andExpect(jsonPath("$.[*].price").value(hasItem(DEFAULT_PRICE.intValue())))
            .andExpect(jsonPath("$.[*].currency").value(hasItem(DEFAULT_CURRENCY)))
            .andExpect(jsonPath("$.[*].executionTime").value(hasItem(DEFAULT_EXECUTION_TIME.toString())))
            .andExpect(jsonPath("$.[*].primaryAccount").value(hasItem(DEFAULT_PRIMARY_ACCOUNT)))
            .andExpect(jsonPath("$.[*].versusAccount").value(hasItem(DEFAULT_VERSUS_ACCOUNT)))
            .andExpect(jsonPath("$.[*].trader").value(hasItem(DEFAULT_TRADER)));
    }
    
    @Test
    @Transactional
    public void getTrade() throws Exception {
        // Initialize the database
        tradeRepository.saveAndFlush(trade);

        // Get the trade
        restTradeMockMvc.perform(get("/api/trades/{id}", trade.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(trade.getId().intValue()))
            .andExpect(jsonPath("$.uniqueTag").value(DEFAULT_UNIQUE_TAG))
            .andExpect(jsonPath("$.tradeDate").value(DEFAULT_TRADE_DATE.toString()))
            .andExpect(jsonPath("$.side").value(DEFAULT_SIDE))
            .andExpect(jsonPath("$.quantity").value(DEFAULT_QUANTITY))
            .andExpect(jsonPath("$.productId").value(DEFAULT_PRODUCT_ID))
            .andExpect(jsonPath("$.price").value(DEFAULT_PRICE.intValue()))
            .andExpect(jsonPath("$.currency").value(DEFAULT_CURRENCY))
            .andExpect(jsonPath("$.executionTime").value(DEFAULT_EXECUTION_TIME.toString()))
            .andExpect(jsonPath("$.primaryAccount").value(DEFAULT_PRIMARY_ACCOUNT))
            .andExpect(jsonPath("$.versusAccount").value(DEFAULT_VERSUS_ACCOUNT))
            .andExpect(jsonPath("$.trader").value(DEFAULT_TRADER));
    }
    @Test
    @Transactional
    public void getNonExistingTrade() throws Exception {
        // Get the trade
        restTradeMockMvc.perform(get("/api/trades/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTrade() throws Exception {
        // Initialize the database
        tradeRepository.saveAndFlush(trade);

        int databaseSizeBeforeUpdate = tradeRepository.findAll().size();

        // Update the trade
        Trade updatedTrade = tradeRepository.findById(trade.getId()).get();
        // Disconnect from session so that the updates on updatedTrade are not directly saved in db
        em.detach(updatedTrade);
        updatedTrade
            .uniqueTag(UPDATED_UNIQUE_TAG)
            .tradeDate(UPDATED_TRADE_DATE)
            .side(UPDATED_SIDE)
            .quantity(UPDATED_QUANTITY)
            .productId(UPDATED_PRODUCT_ID)
            .price(UPDATED_PRICE)
            .currency(UPDATED_CURRENCY)
            .executionTime(UPDATED_EXECUTION_TIME)
            .primaryAccount(UPDATED_PRIMARY_ACCOUNT)
            .versusAccount(UPDATED_VERSUS_ACCOUNT)
            .trader(UPDATED_TRADER);

        restTradeMockMvc.perform(put("/api/trades")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedTrade)))
            .andExpect(status().isOk());

        // Validate the Trade in the database
        List<Trade> tradeList = tradeRepository.findAll();
        assertThat(tradeList).hasSize(databaseSizeBeforeUpdate);
        Trade testTrade = tradeList.get(tradeList.size() - 1);
        assertThat(testTrade.getUniqueTag()).isEqualTo(UPDATED_UNIQUE_TAG);
        assertThat(testTrade.getTradeDate()).isEqualTo(UPDATED_TRADE_DATE);
        assertThat(testTrade.getSide()).isEqualTo(UPDATED_SIDE);
        assertThat(testTrade.getQuantity()).isEqualTo(UPDATED_QUANTITY);
        assertThat(testTrade.getProductId()).isEqualTo(UPDATED_PRODUCT_ID);
        assertThat(testTrade.getPrice()).isEqualTo(UPDATED_PRICE);
        assertThat(testTrade.getCurrency()).isEqualTo(UPDATED_CURRENCY);
        assertThat(testTrade.getExecutionTime()).isEqualTo(UPDATED_EXECUTION_TIME);
        assertThat(testTrade.getPrimaryAccount()).isEqualTo(UPDATED_PRIMARY_ACCOUNT);
        assertThat(testTrade.getVersusAccount()).isEqualTo(UPDATED_VERSUS_ACCOUNT);
        assertThat(testTrade.getTrader()).isEqualTo(UPDATED_TRADER);
    }

    @Test
    @Transactional
    public void updateNonExistingTrade() throws Exception {
        int databaseSizeBeforeUpdate = tradeRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTradeMockMvc.perform(put("/api/trades")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(trade)))
            .andExpect(status().isBadRequest());

        // Validate the Trade in the database
        List<Trade> tradeList = tradeRepository.findAll();
        assertThat(tradeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTrade() throws Exception {
        // Initialize the database
        tradeRepository.saveAndFlush(trade);

        int databaseSizeBeforeDelete = tradeRepository.findAll().size();

        // Delete the trade
        restTradeMockMvc.perform(delete("/api/trades/{id}", trade.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Trade> tradeList = tradeRepository.findAll();
        assertThat(tradeList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
