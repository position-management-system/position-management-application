import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './trade.reducer';
import { ITrade } from 'app/shared/model/trade.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ITradeUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const TradeUpdate = (props: ITradeUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { tradeEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/trade');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    values.executionTime = convertDateTimeToServer(values.executionTime);

    if (errors.length === 0) {
      const entity = {
        ...tradeEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="positionApp.trade.home.createOrEditLabel">
            <Translate contentKey="positionApp.trade.home.createOrEditLabel">Create or edit a Trade</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : tradeEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="trade-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="trade-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="uniqueTagLabel" for="trade-uniqueTag">
                  <Translate contentKey="positionApp.trade.uniqueTag">Unique Tag</Translate>
                </Label>
                <AvField
                  id="trade-uniqueTag"
                  type="text"
                  name="uniqueTag"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="tradeDateLabel" for="trade-tradeDate">
                  <Translate contentKey="positionApp.trade.tradeDate">Trade Date</Translate>
                </Label>
                <AvField
                  id="trade-tradeDate"
                  type="date"
                  className="form-control"
                  name="tradeDate"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="sideLabel" for="trade-side">
                  <Translate contentKey="positionApp.trade.side">Side</Translate>
                </Label>
                <AvField
                  id="trade-side"
                  type="text"
                  name="side"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="quantityLabel" for="trade-quantity">
                  <Translate contentKey="positionApp.trade.quantity">Quantity</Translate>
                </Label>
                <AvField
                  id="trade-quantity"
                  type="string"
                  className="form-control"
                  name="quantity"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    number: { value: true, errorMessage: translate('entity.validation.number') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="productIdLabel" for="trade-productId">
                  <Translate contentKey="positionApp.trade.productId">Product Id</Translate>
                </Label>
                <AvField
                  id="trade-productId"
                  type="text"
                  name="productId"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="priceLabel" for="trade-price">
                  <Translate contentKey="positionApp.trade.price">Price</Translate>
                </Label>
                <AvField
                  id="trade-price"
                  type="text"
                  name="price"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    number: { value: true, errorMessage: translate('entity.validation.number') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="currencyLabel" for="trade-currency">
                  <Translate contentKey="positionApp.trade.currency">Currency</Translate>
                </Label>
                <AvField
                  id="trade-currency"
                  type="text"
                  name="currency"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="executionTimeLabel" for="trade-executionTime">
                  <Translate contentKey="positionApp.trade.executionTime">Execution Time</Translate>
                </Label>
                <AvInput
                  id="trade-executionTime"
                  type="datetime-local"
                  className="form-control"
                  name="executionTime"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.tradeEntity.executionTime)}
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="primaryAccountLabel" for="trade-primaryAccount">
                  <Translate contentKey="positionApp.trade.primaryAccount">Primary Account</Translate>
                </Label>
                <AvField
                  id="trade-primaryAccount"
                  type="text"
                  name="primaryAccount"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="versusAccountLabel" for="trade-versusAccount">
                  <Translate contentKey="positionApp.trade.versusAccount">Versus Account</Translate>
                </Label>
                <AvField
                  id="trade-versusAccount"
                  type="text"
                  name="versusAccount"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="traderLabel" for="trade-trader">
                  <Translate contentKey="positionApp.trade.trader">Trader</Translate>
                </Label>
                <AvField
                  id="trade-trader"
                  type="text"
                  name="trader"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/trade" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  tradeEntity: storeState.trade.entity,
  loading: storeState.trade.loading,
  updating: storeState.trade.updating,
  updateSuccess: storeState.trade.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TradeUpdate);
