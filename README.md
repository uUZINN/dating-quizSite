# 2024 연애 시뮬레이션
![image](https://github.com/uUZINN/dating-quizSite/assets/89904583/933b43af-1dc9-4213-a84d-7896a7fb1040)
"쓰레기는 쓰레기통에" 라는 웹툰을 소재로 연애 시뮬레이션 퀴즈게임을 제작하였습니다.<br>
웹툰 내용을 바탕으로 주인공들의 성격을 그대로 반영하였으며,<br>
직접 json파일을 제작하여 스토리도 색다르게 변경하고 총 4명의 주인공 중에서<br>
프로필을 참고하여 선택할 수 있습니다.<br>
<br>
웹툰을 모르더라도 일반 시뮬레이션 게임과 유사하기 때문에 어렵지 않게<br>
게임을 즐길 수 있습니다. <br>
<br>
주인공 성격에 잘 맞추어 정답을 선택하게 된다면 높은 최종 점수를 받을 수 있습니다.<br>
<br>
과연 당신의 데이트 점수는?!!<br>
<br>

## Page-list
1. 메인페이지<br>
   - 웹툰 로고 사용<br>
   - 등장인물 선택 (인혜, 연오, 우빈, 수지)<br>
   - 등장인물 클릭 시, 프로필 팝업<br>
     1) 공략 정보 : 데이트 제목, 난이도, tip, 시작하기 버튼<br>
2. 서브페이지<br>
   - 등장인물 별 json 파일 제작<br>
     1) https://uuzinn.github.io/dating-quizSite/json/Sooji.json<br>
     2) https://uuzinn.github.io/dating-quizSite/json/Ubin.json<br>
     3) https://uuzinn.github.io/dating-quizSite/json/inhae.json<br>
     4) https://uuzinn.github.io/dating-quizSite/json/yeano.json<br>
   - 데이트 상황에 맞는 각 배경 이미지 사용<br>
   - 텍스트 박스 혹은 Enter 클릭 시, 스토리 전개<br>
   - 스토리 전개 중, 캐릭터 성격에 맞추어 적절한 대답 선택<br>
   - 정답 클릭 : 점수 상승 / 오답 클릭 : 점수 하락<br>
   - 스토리 엔딩 : 최종 점수 공개, 등장인물과의 관계성 공개<br>
   
## JAVASCRIPT
1.문제 가져오기
```
        const fetchQuiz = () => {
            fetch("https://raw.githubusercontent.com/jeongsaeyeong/quizproject01/main/Sooji.json")
                .then((res) => res.json())
                .then((items) => {
                    quizInfo = items.map((item, index) => {
                        const formattedQuiz = {
                            runText: item.runText,
                            Question: item.Question,
                            choiceBad: item.choiceBad,
                            choiceGood: item.choiceGood,
                            Choice: item.Choice, // 선택지 배열
                            Answer: item.Answer, // 정답
                            Feel: item.feel, // 표정
                            Background: item.backgrond
                        };
                        return formattedQuiz;
                    });
                    console.log(quizInfo.length);
                    updataQuiz();
                });
        };
```
