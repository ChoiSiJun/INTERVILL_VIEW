//멤버 모듈 Import
import { SurveyModule } from '@common/slice/SurveyModuleData';

//모듈 정의 ( 사용권한에 따라 오픈 )
const moduleInfo = [
  {
    moduleCode: 'SURVEY',
    moduleName: '설문지관리',
    menuList: SurveyModule,
  },
];

export default moduleInfo;
