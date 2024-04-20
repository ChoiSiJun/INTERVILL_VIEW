// import { MirModal, MirButton, LabelWithInput } from '@common_components_ui';

// import { useAppDispatch, useAppSelector } from '@config/ReduxHooks';
// import {
//   updateMember,
//   closeMemberModal,
// } from '@module/member/slice/MemberSlice';

// import { useEffect, useRef } from 'react';

// const MemberUpdateModal = () => {
//   //버튼 연결 Ref
//   const memberIdInputRef = useRef<HTMLInputElement>(null);
//   const memberWebIdInputRef = useRef<HTMLInputElement>(null);
//   const memberNameInputRef = useRef<HTMLInputElement>(null);
//   const loginPasswordInputRef = useRef<HTMLInputElement>(null);

//   //멤버 수정 핸들러 - 리덕스 디스패치
//   const dispatch = useAppDispatch();
//   const handleMemberUpdate = () => {
//     dispatch(
//       updateMember({
//         memberId: memberIdInputRef.current?.value || '',
//         memberWebId: memberWebIdInputRef.current?.value || '',
//         loginPassword: loginPasswordInputRef.current?.value || '',
//         memberName: memberNameInputRef.current?.value || '',
//         memberKey: MemberUpdateData.memberData.memberKey,
//       }),
//     );
//   };

//   //Member Update Modal set
//   const MemberUpdateData = useAppSelector(state => state.Member);

//   //값 세팅
//   useEffect(() => {
//     if (memberIdInputRef.current) {
//       memberIdInputRef.current.value = MemberUpdateData.memberData.memberId;
//     }

//     if (memberWebIdInputRef.current) {
//       memberWebIdInputRef.current.value =
//         MemberUpdateData.memberData.memberWebId;
//     }

//     if (memberNameInputRef.current) {
//       memberNameInputRef.current.value = MemberUpdateData.memberData.memberName;
//     }

//     if (loginPasswordInputRef.current) {
//       loginPasswordInputRef.current.value =
//         MemberUpdateData.memberData.loginPassword;
//     }
//   });

//   //Member Modal Close
//   const handleModalClose = () => dispatch(closeMemberModal());

//   return (
//     <MirModal.MainModal
//       title="멤버생성 모달"
//       show={MemberUpdateData.modal}
//       buttonList={[
//         <MirButton.UpdateButton
//           key="save"
//           buttonName="저장"
//           onClick={handleMemberUpdate}
//         />,
//         <MirButton.UpdateButton
//           key="close"
//           buttonName="닫기"
//           onClick={handleModalClose}
//         />,
//       ]}
//       handleClose={handleModalClose}
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

// export default MemberUpdateModal;
