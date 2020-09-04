package com.pms.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.pms.web.rest.TestUtil;

public class TradeTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Trade.class);
        Trade trade1 = new Trade();
        trade1.setId(1L);
        Trade trade2 = new Trade();
        trade2.setId(trade1.getId());
        assertThat(trade1).isEqualTo(trade2);
        trade2.setId(2L);
        assertThat(trade1).isNotEqualTo(trade2);
        trade1.setId(null);
        assertThat(trade1).isNotEqualTo(trade2);
    }
}
