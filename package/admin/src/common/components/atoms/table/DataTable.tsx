import { DataGrid, GridColDef, GridSlots } from '@mui/x-data-grid';
import LinearProgress from '@mui/material/LinearProgress';
import CustomNoRowsOverlay from '@common/components/atoms/table/customOverlay/NoRowsOverlay';

export interface DataTableProps {
  rows: Record<string, string | number | null>[];
  columns: GridColDef[];
}

const DataTable = ({ rows, columns }: DataTableProps) => {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10, 20, 50]}
        checkboxSelection
        slots={{
          loadingOverlay: LinearProgress as GridSlots['loadingOverlay'],
          noRowsOverlay: CustomNoRowsOverlay,
        }}
      />
    </div>
  );
};

export default DataTable;
