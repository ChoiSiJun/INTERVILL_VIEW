export const SurveyModule = [
  {
    menuCode: 'CREATE_SURVEY',
    menuName: '새 설문지',
    menuPath: '/survey/doc/create',
    children: [
      {
        menuCode: 'SURVEY_CREATE',
        menuName: '설문지 생성',
        menuPath: '/',
      },
    ],
  },
  {
    menuCode: 'SURVEY_LIST',
    menuName: '설문지 리스트 ',
    menuPath: '/survey/doc/list',
    children: [
      {
        menuCode: 'SURVEY_EDIT',
        menuName: '설문지 작업',
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
    menuCode: 'SURVEY_REPORT',
    menuName: '응답관리',
    menuPath: '/survey/responseReport',
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
