import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from "app/entities/trade/trade.reducer";
import { AgGridReact } from 'ag-grid-react';
import { GridOptions } from 'ag-grid-community';
import { ITrade } from "app/shared/model/trade.model";
import moment from 'moment';

export interface ITradeProps extends StateProps, DispatchProps {
  tradeList: ITrade[];
}

export const TradeViewPage = (props: ITradeProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { tradeList } = props;

  const gridOptions: GridOptions = {
    columnDefs: [
      { field: 'uniqueTag', sort: 'desc' },
      {
        field: 'tradeDate',
        cellRenderer(data) {
          return moment(data.value).format('YYYY-MM-DD HH:mm:ss');
        }
      },
      { field: 'side' },
      { field: 'quantity' },
      { field: 'productId' },
      { field: 'price' },
      { field: 'currency' },
      { field: 'primaryAccount' },
      { field: 'versusAccount' },
      { field: 'trader' },
    ],
    defaultColDef: {
      flex: 1,
      width: 170,
      sortable: true,
      filter: true,
      resizable: true,
      enableCellChangeFlash: true,
    },
    multiSortKey: 'ctrl',
    rowData: tradeList,
  };

  return (
    <div>
      <h2>Trade View</h2>
      <div className="ag-theme-alpine" style={{ height: '600px', width: '100%' }}>
        <AgGridReact
          rowData={gridOptions.rowData}
          columnDefs={gridOptions.columnDefs}
          defaultColDef={gridOptions.defaultColDef}
          multiSortKey={gridOptions.multiSortKey}
        />
      </div>
    </div>
  );
};

const mapStateToProps = ({ trade }: IRootState) => ({
  tradeList: trade.entities,
  loading: trade.loading,
});

const mapDispatchToProps = { getEntities };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TradeViewPage);
