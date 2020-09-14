package com.pms.web.websocket;

import com.pms.web.websocket.dto.PositionDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Arrays;
import java.util.List;
import java.util.Random;

@Controller
@EnableScheduling
public class PositionWebSocketService {

    private static final Logger log = LoggerFactory.getLogger(PositionWebSocketService.class);

    private final SimpMessageSendingOperations messagingTemplate;

    private List<String> productIds = Arrays.asList("VOD.L", "BP.L", "RR.L");
    private List<String> accounts = Arrays.asList("Account 1", "Account 2");
    private List<String> currencies = Arrays.asList("EUR", "GBP");

    public PositionWebSocketService(SimpMessageSendingOperations messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    @Scheduled(fixedDelay = 4000L)
    @SendTo("/topic/positions")
    public void sendPositions() {
        Random random = new Random();
        PositionDTO positionDTO = new PositionDTO();
        String account = accounts.get(random.nextInt(accounts.size()));
        String productId = productIds.get(random.nextInt(productIds.size()));
        String currency = currencies.get(random.nextInt(currencies.size()));
        String id = account + productId + currency;
        positionDTO.setId(id);
        positionDTO.setAccount(account);
        positionDTO.setProductId(productId);
        positionDTO.setCurrency(currency);
        positionDTO.setQuantity(BigDecimal.valueOf(random.nextInt(100)));
        positionDTO.setAveragePrice(BigDecimal.valueOf(random.nextDouble() * 100).setScale(6, RoundingMode.HALF_UP));

        log.debug("Sending Positions" + positionDTO.toString());
        messagingTemplate.convertAndSend("/topic/positions", positionDTO);
    }
}
