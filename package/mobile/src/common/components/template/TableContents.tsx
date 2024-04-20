import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import SearchField, {
  SearchFieldProps,
} from '@common/components/atoms/input/SearchField';
import DataTable, {
  DataTableProps,
} from '@common/components/atoms/table/DataTable';

import ToolbarContent, {
  ToolbarContentProps,
} from '@common/components/molecule/ToolbarContent';

interface TableContentsProps
  extends DataTableProps,
    ToolbarContentProps,
    SearchFieldProps {}

const TableContents = ({
  buttonList,
  rows,
  columns,
  searchInputRef,
  onClick,
}: TableContentsProps) => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} md={12} lg={12}>
        <ToolbarContent buttonList={buttonList} />
      </Grid>

      <Grid item xs={12} md={12} lg={12}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
          }}
        >
          <Grid item xs={12} md={12} lg={12}>
            <SearchField searchInputRef={searchInputRef} onClick={onClick} />
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={12} md={12} lg={12}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <DataTable rows={rows} columns={columns} />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default TableContents;
