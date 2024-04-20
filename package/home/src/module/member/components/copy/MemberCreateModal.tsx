// import { MirModal, LabelWithInput, MirButton } from '@common_components_ui';
// import { useAppDispatch } from '@config/ReduxHooks';
// import { createMember } from '@module/member/slice/MemberSlice';
// import { useRef } from 'react';
// import { toast } from 'react-toastify';

// interface MemberCreateModalProps {
//   show: boolean;
//   handleClose: () => void;
// }

// const MemberCreateModal = ({ show, handleClose }: MemberCreateModalProps) => {
//   //버튼 연결 Ref
//   const memberIdInputRef = useRef<HTMLInputElement>(null);
//   const memberWebIdInputRef = useRef<HTMLInputElement>(null);
//   const memberNameInputRef = useRef<HTMLInputElement>(null);
//   const loginPasswordInputRef = useRef<HTMLInputElement>(null);

//   //멤버 생성 핸들러 - 리덕스 디스패치
//   const dispatch = useAppDispatch();
//   const HandleMemberCreate = async () => {
//     try {
//       await dispatch(
//         createMember({
//           memberId: memberIdInputRef.current?.value || '',
//           memberWebId: memberWebIdInputRef.current?.value || '',
//           loginPassword: loginPasswordInputRef.current?.value || '',
//           memberName: memberNameInputRef.current?.value || '',
//         }),
//       ).unwrap();

//       handleClose();

//       toast.success('저장되었습니다.');
//     } catch (error) {
//       toast.error('오류가 발생하였습니다.');
//     }
//   };

//   return (
//     <MirModal.MainModal
//       title="멤버생성 모달"
//       show={show}
//       buttonList={[
//         <MirButton.CreateButton
//           key="save"
//           buttonName="저장"
//           onClick={HandleMemberCreate}
//         />,
//         <MirButton.CreateButton
//           key="close"
//           buttonName="닫기"
//           onClick={handleClose}
//         />,
//       ]}
//       handleClose={handleClose}
//     >
//       <LabelWithInput
//         type="text"
//         label="아이디"
//         labelType="row"
//         ref={memberIdInputRef}
//       />
//       <LabelWithInput
//         type="text"
//         label="로그인 아이디"
//         labelType="row"
//         ref={memberWebIdInputRef}
//       />
//       <LabelWithInput
//         type="text"
//         label="이름"
//         labelType="row"
//         ref={memberNameInputRef}
//       />
//       <LabelWithInput
//         type="password"
//         label="비밀번호"
//         labelType="row"
//         ref={loginPasswordInputRef}
//       />
//     </MirModal.MainModal>
//   );
// };

// export default MemberCreateModal;
