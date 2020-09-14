import React  from 'react';
import { connect } from 'react-redux';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { GridOptions } from 'ag-grid-community';
import { IPosition } from "app/shared/model/position.model";

export interface IPositionViewProps {
  positions: IPosition[];
}

export const PositionViewPage = ({ positions }: IPositionViewProps) => {

  const gridOptions: GridOptions = {
    columnDefs: [
      { field: 'account', sort: 'asc' },
      { field: 'productId', sort: 'asc' },
      { field: 'currency', sort: 'asc' },
      { field: 'averagePrice' },
      { field: 'quantity' },
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
    rowData: positions,
    cellFlashDelay: 2000,
    cellFadeDelay: 500,
  };

  return (
    <div>
      <h2>Position View</h2>
      <div className="ag-theme-alpine" style={{ height: '600px', width: '100%' }}>
        <AgGridReact
          getRowNodeId={data => data.id}
          rowData={gridOptions.rowData}
          columnDefs={gridOptions.columnDefs}
          defaultColDef={gridOptions.defaultColDef}
          multiSortKey={gridOptions.multiSortKey}
          cellFlashDelay={gridOptions.cellFlashDelay}
          cellFadeDelay={gridOptions.cellFadeDelay}
          immutableData={true}
          enableCellChangeFlash={true}
        />
        </div>
    </div>
  );
};

const mapStateToProps = ({ view }) => ({
  positions: view.positions.data,
});

export default connect(mapStateToProps)(PositionViewPage);
