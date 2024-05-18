import { Divider, Paper, TextField, Typography, styled } from '@mui/material';
import Box from '@mui/material/Box';
import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DataGrid, GridActionsCellItem, GridColDef, GridRowId, GridSortModel } from '@mui/x-data-grid';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider';
import React, { useEffect } from 'react';
import { SurveyInfoRow, surveyListInquiryReqThunk, SurveyListInquriyRequest } from '@module/survey/slice/SurveyListSlice';
import { useAppDispatch, useAppSelector } from '@config/ReduxHooks';

/**
 * 데이터 그리드
 */
export const ViewDataController = () => {

  return (
    <Box>
    </Box>
  )
}

/**
 * 데이터를 조작하는 기능이 들어가는 컴포넌트, (excel export, 오름차순 정렬, 내림차순 정렬)
 * @returns 
 */
export const DataGridView = () => {
  const SurveyInfoRow = useAppSelector(state => state.SurveyInfoList);
  const isLoading = useAppSelector(state => state.SurveyInfoList.isLoading);
  const navigate = useNavigate();
  const handleEditClick = (id : GridRowId) => {
    navigate(`/survey/doc/${id}`);
  }
  const columns: GridColDef<SurveyInfoRow>[] = [
    { field: 'rowIndex', headerName: 'No.', width: 90 },
    {
      field: 'title',
      headerName: '설문지명',
      width: 200,
      editable: false,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: '작업',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        //const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={() => handleEditClick(id)}
            color="inherit"
          />
        ];
      },
    },
    {
      field: 'frstRgstDttm',
      headerName: '생성일',
      width: 150,
      editable: false,
      renderCell: (params) => {
        const formattedDate = dayjs(new Date(params.value)).format('YYYY-MM-DD HH:mm:ss');
        return formattedDate;
      },
    },
    {
      field: 'lastUpdtDttm',
      headerName: '최종수정일',
      width: 150,
      editable: false,
      renderCell: (params) => {
        const formattedDate = dayjs(new Date(params.value)).format('YYYY-MM-DD HH:mm:ss');
        return formattedDate;
      },
    },
    {
      field: 'qstnSize',
      headerName: '문항 수',
      type: 'number',
      width: 90,
      editable: false,
    },
  ];
  //페이지 정보
  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 10,
  });

  //정렬 정보
  const [sortModel, setSortModel] = React.useState<GridSortModel>([
    {
      field: 'lastUpdtDttm',
      sort: 'desc',
    },
  ]);

  
  const dispatch = useAppDispatch();
  const handlerSurveyCreate = async (param : SurveyListInquriyRequest) => {
    try {
      //멤버정보 세팅
      await dispatch(
        surveyListInquiryReqThunk(param),
      );
      
    } catch (error) {
      console.error(error);
      console.log('오류');
    }
  };
  useEffect(() => {
    handlerSurveyCreate({
      providerId : 'guestId'
      , startDate : dayjs().subtract(30, 'day').format('YYYYMMDD')
      , endDate : dayjs().format('YYYYMMDD')
      , page : paginationModel.page
      , size : paginationModel.pageSize
      , orderBy : sortModel[0].field
      , sort : sortModel[0].sort ? sortModel[0].sort : 'asc'
    });
  }, [paginationModel, sortModel]); // 의존성 배열이 비어있어 컴포넌트가 처음 마운트될 때만 실행됩니다.

  const rowCountRef = React.useRef(SurveyInfoRow?.totalElements || 0);

  const rowCount = React.useMemo(() => {
    if (SurveyInfoRow?.totalElements !== undefined) {
      rowCountRef.current = SurveyInfoRow.totalElements;
    }
    return rowCountRef.current;
  }, [SurveyInfoRow?.totalElements]);
  return (
    <Box>
      <DataGrid
        sx={{minHeight:200}}
        rows={SurveyInfoRow.surveyInfoList}
        columns={columns}
        rowCount={rowCount}
        loading={isLoading}
        sortModel={sortModel}
        onSortModelChange={setSortModel}
        pageSizeOptions={[5, 10]}
        paginationModel={paginationModel}
        paginationMode="server"
        onPaginationModelChange={setPaginationModel}
      />
    </Box>
  )
}

/**
 * 설문지 검색 조건을 컨트롤하고 입력하는 컨트롤 박스
 * @returns 
 */
export const ListViewSearchController = () => {
  const [value, setValue] = React.useState([null, null]);
  
  return (
    <Box  sx={{
        display: 'flex',
        flexWrap: 'wrap', 
        '& > :not(style)': {
          m: 1,
          width: 128,
          height: 128,
        },
      }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Paper elevation={0} >
          <label>설문 생성일</label>
        </Paper>
        <DatePicker sx={{width:'135px'}} label="Start Date" />
        <DatePicker sx={{width:'135px'}} label="End Date" />
    </LocalizationProvider>
    </Box>
  )
}

/**
 * 설문지 리스트의 타이틀, 간단한 통계나 설명이 들어가는 컴포넌트
 */
export const ListViewTitle = () => {

  return (
    <Box sx={{textAlign:'left'}}>
      <Typography variant="h3">
        설문지 리스트 조회
      </Typography>
    </Box>
  )
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

/**
 * 설문지 리스트 관리 화면
 * @returns 
 */
export default function SurveyListView() {
  
  return (
    <Box sx={{ width: '100%' }}>
      <Stack spacing={2}>
        <Item>
          <ListViewTitle />
        </Item>
        {/* <Item>
          <ListViewSearchController>
          </ListViewSearchController>
        </Item> */}
        {/* <Item>
          <ViewDataController>
          </ViewDataController>
        </Item> */}
        <Item>
          <DataGridView>
            {/* //TODO DataGrid를 통해 설문지 리스트를 보여준다. */}
          </DataGridView>
        </Item>
      </Stack>
    </Box>
  );
}

function useQuery(paginationModel: { page: number; pageSize: number; }): { isLoading: any; rows: any; pageInfo: any; } {
  throw new Error('Function not implemented.');
}

