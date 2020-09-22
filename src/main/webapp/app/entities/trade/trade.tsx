import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './trade.reducer';
import { ITrade } from 'app/shared/model/trade.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITradeProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Trade = (props: ITradeProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { tradeList, match, loading } = props;
  return (
    <div>
      <h2 id="trade-heading">
        <Translate contentKey="positionApp.trade.home.title">Trades</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="positionApp.trade.home.createLabel">Create new Trade</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {tradeList && tradeList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="positionApp.trade.uniqueTag">Unique Tag</Translate>
                </th>
                <th>
                  <Translate contentKey="positionApp.trade.tradeDate">Trade Date</Translate>
                </th>
                <th>
                  <Translate contentKey="positionApp.trade.side">Side</Translate>
                </th>
                <th>
                  <Translate contentKey="positionApp.trade.quantity">Quantity</Translate>
                </th>
                <th>
                  <Translate contentKey="positionApp.trade.productId">Product Id</Translate>
                </th>
                <th>
                  <Translate contentKey="positionApp.trade.price">Price</Translate>
                </th>
                <th>
                  <Translate contentKey="positionApp.trade.currency">Currency</Translate>
                </th>
                <th>
                  <Translate contentKey="positionApp.trade.executionTime">Execution Time</Translate>
                </th>
                <th>
                  <Translate contentKey="positionApp.trade.primaryAccount">Primary Account</Translate>
                </th>
                <th>
                  <Translate contentKey="positionApp.trade.versusAccount">Versus Account</Translate>
                </th>
                <th>
                  <Translate contentKey="positionApp.trade.trader">Trader</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {tradeList.map((trade, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${trade.id}`} color="link" size="sm">
                      {trade.id}
                    </Button>
                  </td>
                  <td>{trade.uniqueTag}</td>
                  <td>{trade.tradeDate ? <TextFormat type="date" value={trade.tradeDate} format={APP_LOCAL_DATE_FORMAT} /> : null}</td>
                  <td>{trade.side}</td>
                  <td>{trade.quantity}</td>
                  <td>{trade.productId}</td>
                  <td>{trade.price}</td>
                  <td>{trade.currency}</td>
                  <td>{trade.executionTime ? <TextFormat type="date" value={trade.executionTime} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{trade.primaryAccount}</td>
                  <td>{trade.versusAccount}</td>
                  <td>{trade.trader}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${trade.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${trade.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${trade.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="positionApp.trade.home.notFound">No Trades found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ trade }: IRootState) => ({
  tradeList: trade.entities,
  loading: trade.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Trade);
