import React from 'react';
import { Translate } from 'react-jhipster';
import { connect } from 'react-redux';

export interface IPositionViewProps {
  positions: any[];
}

export const PositionViewPage = ({ positions }: IPositionViewProps) => {
  return (
    <div>
      <h2>Position View</h2>
      <table className="table table-sm table-striped table-bordered">
        <thead>
        <tr>
          <th>
            <span>
              Account
            </span>
          </th>
          <th>
            <span>
              Product
            </span>
        </th>
          <th>
            <span>
              Currency
            </span>
          </th>
          <th>
            <span>
              Quantity
            </span>
          </th>
          <th>
            <span>
              Price
            </span>
          </th>
        </tr>
        </thead>
        <tbody>
        {positions.map((position, i) => (
          <tr key={`log-row-${i}`}>
            <td>{position.account}</td>
            <td>{position.productId}</td>
            <td>{position.currency}</td>
            <td>{position.averagePrice}</td>
            <td>{position.quantity}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = ({ view }) => ({
  positions: view.positions.data,
});

export default connect(mapStateToProps)(PositionViewPage);
