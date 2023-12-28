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
2. 클릭 이벤트 핸들러
```
const introBoxClickHandler = () => {
            if (isRunTextMode) {
                currentRunTextIndex++; // 다음 runText 배열 요소 인덱스로 이동
                // 만약 현재 배열 요소를 모두 표시했다면 Question 모드로 전환
                if (currentRunTextIndex >= quizInfo[currentIndex].runText.length) {
                    currentRunTextIndex = 0; // 배열 요소 인덱스 초기화
                    isRunTextMode = false; // Question 모드로 전환
                }
            } else {
                currentIndex++; // 다음 퀴즈로 이동
                // 만약 마지막 퀴즈를 넘어가면 초기화
                if (currentIndex >= 39) {
                    endingtext();
                    textSTop();
                }
                isRunTextMode = true; // runText 모드로 전환
                console.log("current" + currentIndex)
            }
            // 퀴즈 업데이트
            updataQuiz();
        };
        // intro_box 클릭 이벤트를 등록
        introWrap.addEventListener("click", introBoxClickHandler);
```
3. 문제 출력
```
         const updataQuiz = () => {
            const quiz = quizInfo[currentIndex];
            const Background = quiz.Background;
            if (quiz) {
                let content = '';
                content = `
                <div class="quiz__background">
                    <div class="background-image" style="background-image: url('${quiz.Background}')"></div>
                </div>
                `;
                const quizHTML = `${content}`;
                quizWrap.innerHTML = quizHTML;
            }
            if (quiz) {
                let content = '';
                if (isRunTextMode) {
                    // runText 모드
                    const runTextItem = quiz.runText[currentRunTextIndex];
                    content = `
                    <div id="intro" class="intro_wrap">
                        <div class="intro_box">
                            <p>${runTextItem}</p>
                            <button class="next_btn blink"><img src="../assets/img/next.png" alt=""></button>
                        </div>
                    </div>
                    `;
                } else {
                    // Question 모드
                    content = `
                    <div id="choice">
                        <div class="character">
                            <img src="${quiz.Feel}" alt="">
                        </div>
                        <div class="choice_box">
                            <p id="questionText">${quiz.Question}</p>
                            <div class="choice_btn">
                                <button class="choice_A" id="choiceA">${quiz.Choice[0]}</button>
                                <button class="choice_B" id="choiceB">${quiz.Choice[1]}</button>
                            </div>
                        </div>
                    </div>
                    `;
                }
                const quizHTML = `${content}`;
                introWrap.innerHTML = quizHTML;

            }
        };
```
4. 정답 확인
```
function checkAnswer(quiz, userChoice) {

            let answer = quiz.Answer; // JSON 파일에서 정답 가져오기

            // 사용자의 선택과 정답 비교
            if (userChoice === answer) {
                InheaLove += 3;
                showResult(quiz.choiceGood);
                console.log(InheaLove);
            } else {
                // 오답인 경우
                InheaLove += 2;
                showResult(quiz.choiceBad);
            }
        }
```
