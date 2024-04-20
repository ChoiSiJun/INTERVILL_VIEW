export const MemberModule = [
  {
    menuCode: 'MEMBER_LIST',
    menuName: '이용자 리스트',
    menuPath: '/liberty/member',
    children: [
      {
        menuCode: 'MEMBER_LIST_SEARCH',
        menuName: '검색',
        menuPath: '/',
      },
    ],
  },
  {
    menuCode: 'MEMBER_LIMIT',
    menuName: '서비스 제한 ',
    menuPath: '/liberty/dashboard',
    children: [
      {
        menuCode: 'MEMBER_LIMIT_SEARCH',
        menuName: '검색',
        menuPath: '/',
      },

      {
        menuCode: 'MEMBER_LIMIT_INSERT',
        menuName: '규정 관리',
        menuPath: '/',
      },
    ],
  },
  {
    menuCode: 'MEMBER_REPORT',
    menuName: '리포트',
    menuPath: '/',
    children: [
      {
        menuCode: 'MEMBER_REPORT_JOIN',
        menuName: '가입 통계',
        menuPath: '/',
      },

      {
        menuCode: 'MEMBER_REPORT_CONNECT',
        menuName: '접속 통계',
        menuPath: '/',
      },
    ],
  },
];
