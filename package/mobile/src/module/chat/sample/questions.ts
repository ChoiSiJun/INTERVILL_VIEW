
interface Question {
    title: string;
    content: string;
    placeholder: string;
  }

const sampleQuestions: Question[]= [
    { title: "프로그래밍 언어 경험"
      , content: "현재 사용하고 있는 프로그램 언어는 어떤것인가요?"
      , placeholder: "언어명과 사용하는 간단한 이유를 설명해주세요 \n 예)java, 취업에 유리하기 때문에" },
    { title: "개발 도구"
      , content: "가장 자주 사용하는 IDE를 알려주세요."
      , placeholder: "Eclipse, Intellij, Vscode, Visual studio 등"},
    { title: "프로젝트 경험"
      , content: "가장 최근에 참여했던 프로젝트는 어떤 프로젝트였나요?"
      , placeholder: "공연 예매 시스템, 금융 IT 프로젝트, 매크로 프로그램"},
    { title: "학습 방법"
      , content: "학습은 어떤 방식을 선호하시나요?"
      , placeholder: "기술 문서 체크, 유튜브, 인터넷 강의, 스터디"},
    { title: "기술 동향 예측"
      , content: "앞으로 전망이 있어보이는 기술이나 서비스는 어떤것이라고 생각하시나요?"
      , placeholder: "AI, React, Java"},
    { title: "설문 종료"
      , content: "설문에 참여해 주셔서 감사합니다."
      , placeholder: "잠시 후 완료페이지로 이동합니다."}
]

export default sampleQuestions;