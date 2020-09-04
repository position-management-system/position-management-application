import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './trade.reducer';
import { ITrade } from 'app/shared/model/trade.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITradeDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const TradeDetail = (props: ITradeDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { tradeEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="positionApp.trade.detail.title">Trade</Translate> [<b>{tradeEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="uniqueTag">
              <Translate contentKey="positionApp.trade.uniqueTag">Unique Tag</Translate>
            </span>
          </dt>
          <dd>{tradeEntity.uniqueTag}</dd>
          <dt>
            <span id="tradeDate">
              <Translate contentKey="positionApp.trade.tradeDate">Trade Date</Translate>
            </span>
          </dt>
          <dd>{tradeEntity.tradeDate ? <TextFormat value={tradeEntity.tradeDate} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="side">
              <Translate contentKey="positionApp.trade.side">Side</Translate>
            </span>
          </dt>
          <dd>{tradeEntity.side}</dd>
          <dt>
            <span id="quantity">
              <Translate contentKey="positionApp.trade.quantity">Quantity</Translate>
            </span>
          </dt>
          <dd>{tradeEntity.quantity}</dd>
          <dt>
            <span id="productId">
              <Translate contentKey="positionApp.trade.productId">Product Id</Translate>
            </span>
          </dt>
          <dd>{tradeEntity.productId}</dd>
          <dt>
            <span id="price">
              <Translate contentKey="positionApp.trade.price">Price</Translate>
            </span>
          </dt>
          <dd>{tradeEntity.price}</dd>
          <dt>
            <span id="currency">
              <Translate contentKey="positionApp.trade.currency">Currency</Translate>
            </span>
          </dt>
          <dd>{tradeEntity.currency}</dd>
          <dt>
            <span id="executionTime">
              <Translate contentKey="positionApp.trade.executionTime">Execution Time</Translate>
            </span>
          </dt>
          <dd>
            {tradeEntity.executionTime ? <TextFormat value={tradeEntity.executionTime} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="primaryAccount">
              <Translate contentKey="positionApp.trade.primaryAccount">Primary Account</Translate>
            </span>
          </dt>
          <dd>{tradeEntity.primaryAccount}</dd>
          <dt>
            <span id="versusAccount">
              <Translate contentKey="positionApp.trade.versusAccount">Versus Account</Translate>
            </span>
          </dt>
          <dd>{tradeEntity.versusAccount}</dd>
          <dt>
            <span id="trader">
              <Translate contentKey="positionApp.trade.trader">Trader</Translate>
            </span>
          </dt>
          <dd>{tradeEntity.trader}</dd>
        </dl>
        <Button tag={Link} to="/trade" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/trade/${tradeEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ trade }: IRootState) => ({
  tradeEntity: trade.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TradeDetail);
