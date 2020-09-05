import React from 'react';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Position from './position/position';
import Trade from './trade/trade';

const Routes = ({match}) => (
  <div>
    <ErrorBoundaryRoute path={`${match.url}/position`} component={Position}/>
    <ErrorBoundaryRoute path={`${match.url}/trade`} component={Trade}/>
  </div>
);

export default Routes;
