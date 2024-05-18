import * as React from 'react';
import {ButtonGroup, TextField, ThemeProvider, createTheme} from '@mui/material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import { ModalHandler, ModalState } from './DocumentEditor';
import Stack from '@mui/material/Stack';
import { Divider } from '@mui/material';
import QuestionApi from '@module/survey/slice/QuestionEditApi';
import { useAppSelector } from '@config/ReduxHooks';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

/**
 * 모달창에서 모달을 띄우기 위한 모달 컴포넌트
 */
// function QuestionEditor(open, setOpen) {
//   const handleOpen = () => {
//     setOpen(true);
//   };
//   const handleClose = () => {
//     setOpen(false);
//   };

//   return (
//     <React.Fragment>
//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="child-modal-title"
//         aria-describedby="child-modal-description"
//       >
//         <Box sx={{ ...style, width: '70%' }}>
//           <h2 id="child-modal-title">Text in a child modal</h2>
//           <p id="child-modal-description">
//             Lorem ipsum, dolor sit amet consectetur adipisicing elit.
//           </p>
//           <Button onClick={handleClose}>Close Child Modal</Button>
//         </Box>
//       </Modal>
//     </React.Fragment>
//   );
// }

const theme = createTheme({
    components: {
      MuiStack: {
        defaultProps: {
          useFlexGap: true,
        },
      },
    },
  });
  


interface QuestionModalInterface {
    modalState : ModalState;
    setModalState : React.Dispatch<React.SetStateAction<T>>;
    handler : ModalHandler;
}

export default function QuestionEditor({modalState, setModalState, handler} : QuestionModalInterface) {
    
    const [updQuestion, { updLoading }] = QuestionApi.useUpdQuestionMutation();
    const [delQuestion, { delLoading }] = QuestionApi.useDelQuestionMutation();
    const [saveProp, setSaveProp] = React.useState({loading:false, disabled:false})
    const [deleteProp, setDeleteProp] = React.useState({loading:false, disabled:false})

    /**
     * 질문정보를 서버에 업데이트 하는 로직
     */
    const surveyInfo = useAppSelector(state => state.SurveyEditInfo)
    const Questions = useAppSelector(state => state.qstnApi)
    console.log("modalState ::", modalState);
    const questionHandler = {
        changedTitle : (event) => {
            if(event.target) setModalState({...modalState, question : {...modalState.question, qstnTitle:event.target.value}});
        },
        changedValue : (event) => {
            if(event.target) setModalState({...modalState, question : {...modalState.question, qstnValue:event.target.value}});
        },
        closeModal : () => {
            setModalState({...modalState, open:false});
        },
        deleteQuestion : (event) => {
            setDeleteProp({loading:true, disabled:true});
            delQuestion({
                providerId : surveyInfo.surveyM.userId,
                svyId : surveyInfo.surveyM.id,
                question : modalState.question
            }).then(({data}) => {
                console.log("saveQuestion then :: ", data);
                questionHandler.closeModal();
            }).catch(e => {
                //TODO 설문지 삭제하지 못했을 경우 실행할 처리를 구현해야 한다.
            }).finally(e => {
                setDeleteProp({loading:false, disabled:false});
            });
        },
        saveQuestion : (event) => {
            setSaveProp({loading:true, disabled:true});
            updQuestion({
                providerId : surveyInfo.surveyM.userId,
                svyId : surveyInfo.surveyM.id,
                question : modalState.question
            }).then(({data}) => {
                console.log("saveQuestion then :: ", data);
                questionHandler.closeModal();
            }).catch(e => {
                //TODO 설문지 저장에 실패했을 경우 실행할 처리를 구현해야 한다.
                setSaveProp({loading:false, disabled:false});
            }).finally(e => {
                setSaveProp({loading:false, disabled:false});
            });
        }
    }

    

    
    //TODO 질문 유형 선택하는 셀렉트 박스 함수들. 나중에 별개 컴포넌트로 분리해야함.
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef<HTMLDivElement>(null);
    const options = ['단답형', '선택형', '미정'];
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const handleClick = () => {
        console.info(`You clicked ${options[selectedIndex]}`);
    };

    const handleMenuItemClick = (
        event: React.MouseEvent<HTMLLIElement, MouseEvent>,
        index: number,
      ) => {
        setSelectedIndex(index);
        setOpen(false);
      };
    
      const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
      };
    
      const handleClose = (event: Event) => {
        if (
          anchorRef.current &&
          anchorRef.current.contains(event.target as HTMLElement)
        ) {
          return;
        }
    
        setOpen(false);
      };
  return (
    <div>
      <Modal
        open={modalState?.open ?? false}
        onClose={handler.close}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: '70%', maxWidth:1000 }}>
        <Stack>

        <Divider sx={{marginTop:2, marginBottom:2}} textAlign="left">질문 제목</Divider>
            <Stack
                direction="row"
                divider={<Divider orientation="vertical" flexItem />}
                spacing={2}
                >
                <TextField
                    sx={{width:'70%'}}
                    required
                    id="outlined-required"
                    label="제목"
                    placeholder='질문 제목을 입력해주세요.'
                    InputProps={{style: {fontWeight:600, fontSize:18}}} 
                    defaultValue={modalState.question ? modalState.question.qstnTitle : ""}
                    onChange={questionHandler.changedTitle}
                    />
                <ButtonGroup
                    size='small'
                    variant="contained"
                    ref={anchorRef}
                    aria-label="Button group with a nested menu"
                >
                    <Button onClick={handleClick}>{options[selectedIndex]}</Button>
                    <Button
                    size="small"
                    aria-controls={open ? 'split-button-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-label="select merge strategy"
                    aria-haspopup="menu"
                    onClick={handleToggle}
                    >
                    <ArrowDropDownIcon />
                    </Button>
                </ButtonGroup>
                
            </Stack>
            {/* <Divider sx={{marginTop:2, marginBottom:2}} textAlign="left">질문 속성관리</Divider> */}
            <Divider sx={{marginTop:2, marginBottom:2}} textAlign="left">질문 내용</Divider>
            <TextField
                    sx={{width:'100%'}}
                    required
                    multiline
                    rows={4}
                    size="small"
                    id="outlined-required"
                    label="질문"
                    placeholder='질문 내용을 입력해주세요.'
                    defaultValue={modalState.question ? modalState.question.qstnValue : ""}
                    onChange={questionHandler.changedValue}
                    />
            <ThemeProvider theme={theme}>
                <Stack
                    sx={{width:'100%', marginTop:3, justifyContent:'center'}}
                    direction="row"
                    flexWrap="wrap"
                    useFlexGap
                    divider={<Divider orientation="vertical" flexItem />}
                    spacing={2}
                    >
                    <LoadingButton variant="outlined" startIcon={<DeleteIcon />} color="error"
                        loading={deleteProp.loading ?? false}
                        onClick={questionHandler.deleteQuestion}>삭제</LoadingButton>
                    <Button variant="outlined" onClick={questionHandler.closeModal} color='warning'>닫기</Button>
                    <LoadingButton variant="contained" 
                        onClick={questionHandler.saveQuestion} 
                        loading={saveProp.loading ?? false}
                        color='success'>저장</LoadingButton>
                </Stack>
            </ThemeProvider>
        </Stack>
        </Box>
      </Modal>
    </div>
  );
}
