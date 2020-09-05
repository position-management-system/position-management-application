import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const ViewsMenu = props => (
  <NavDropdown
    icon="th-list"
    name={translate('global.menu.views.main')}
    id="view-menu"
    style={{ maxHeight: '80vh', overflow: 'auto' }}
  >
    <MenuItem icon="asterisk" to="/view/position">
      <Translate contentKey="global.menu.views.position" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/view/trade">
      <Translate contentKey="global.menu.views.trade" />
    </MenuItem>
  </NavDropdown>
);
