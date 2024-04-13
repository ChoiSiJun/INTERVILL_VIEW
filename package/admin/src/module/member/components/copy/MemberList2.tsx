// import {
//   MirContainer,
//   BasicTable,
//   InputFormControl,
//   MirButton,
// } from '@common_components_ui';

// import { useAppDispatch, useAppSelector } from '@config/ReduxHooks';
// import InputGroup from 'react-bootstrap/InputGroup';
// import { useRef } from 'react';

// import { searchMemberList } from '@module/member/slice/MemberListSlice';
// import { TableFieldProps, TableDataProps } from '@common_type';
// import {
//   deleteMember,
//   openMemberModal,
// } from '@module/member/slice/MemberSlice';

// //유저 리스트 검색 컴포넌트
// function MembetList() {
//   //검색어 필드 연결
//   const searchInputRef = useRef<HTMLInputElement>(null);

//   // 검색 액션 핸들러 - 리덕스 디스패치
//   const dispatch = useAppDispatch();
//   const handleSearch = async () => {
//     try {
//       //멤버정보 세팅
//       await dispatch(
//         searchMemberList({
//           searchType: 'memberId',
//           memberId: searchInputRef.current?.value || '',
//           page: '0',
//           size: '5',
//         }),
//       );
//     } catch (error) {
//       console.log('오류');
//     }
//   };

//   const handleUpdate = (memberKey: string) => {
//     dispatch(openMemberModal(memberKey));
//   };

//   const handleDelete = (memberKey: string) => {
//     dispatch(deleteMember(memberKey));
//   };

//   //Member FieldList -> Redux 전역
//   const tableFieldList = useAppSelector(
//     state => state.MemberList.memberFieldList,
//   );

//   //Member DataList -> Redux 전역
//   const memberList = useAppSelector(state => state.MemberList.memberDataList);
//   return (
//     <>
//       {/* 멤버 검색창 컴포넌트 */}
//       <MirContainer.SubContainer>
//         <InputGroup className="mb-3">
//           <InputFormControl
//             ref={searchInputRef}
//             className="form-control md-3"
//             type="text"
//           ></InputFormControl>

//           <MirButton.ReadButton buttonName="검색" onClick={handleSearch} />
//         </InputGroup>
//       </MirContainer.SubContainer>
//       <br />
//       {/* 멤버 리스트 결과 컴포넌트 */}
//       <MirContainer.SubContainer>
//         <BasicTable>
//           <thead>
//             <tr>
//               {tableFieldList.map((tableField, index) => (
//                 <th key={index}>{tableField.name}</th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {memberList.map((data, index) => (
//               <tr key={index}>
//                 {tableFieldList.map((tableField, index) => (
//                   <td key={index}>{RenderTableData(tableField, data)}</td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </BasicTable>
//       </MirContainer.SubContainer>
//     </>
//   );

//   function RenderTableData(tableField: TableFieldProps, data: TableDataProps) {
//     if (tableField.type == 'button') {
//       return (
//         <>
//           <MirButton.UpdateButton
//             buttonName="수정"
//             onClick={() => {
//               handleUpdate(data[tableField.key] as string);
//             }}
//           />

//           <MirButton.DeleteButton
//             buttonName="삭제"
//             onClick={() => {
//               handleDelete(data[tableField.key] as string);
//             }}
//           />
//         </>
//       );
//     }
//     return data[tableField.key];
//   }
// }

// export default MembetList;
