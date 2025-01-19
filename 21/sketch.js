let score = 0;
let maxClicks = 21;
let gameEnded = false;
let targetX, targetY; // 21의 좌표
let targetSize = 32; // 21의 초기 크기
let targetColor;
let bgVideo; // 배경 동영상
let showOpening = true; // 오프닝 화면을 보여줄지 여부
let openingClickCount = 0; // 오프닝 화면에서 클릭 횟수 0 으로

function preload() {
  // 21.mp4 동영상을 로드
  bgVideo = createVideo("21.mp4");
  bgVideo.hide(); // 비디오를 숨기고 캔버스에 직접 그리기 위해 hide 처리
}

function setup() {
  createCanvas(1000, 1000);
  textAlign(CENTER, CENTER);
  resetTargetPosition(); // 21의 초기 좌표 설정

  targetColor = color(255, 0, 0); // 처음 색상

  // 동영상을 반복 재생
  bgVideo.loop();
  bgVideo.volume(0); // 음소거
}

function draw() {
  if (showOpening) {
    showOpeningScene(); // 오프닝 화면 표시
  } else if (!gameEnded) {
    image(bgVideo, 0, 0, width, height);

    // "21"의 색상과 크기를 계속해서 변화
    targetSize = 32 + sin(frameCount * 0.1) * 10; // 크기가 32에서 약간씩 변화
    targetColor = color(random(255), random(255), random(255)); // 색상 랜덤 변화
    
     // "21"의 좌표를 업데이트 (움직임을 줌)
    targetX += targetSpeedX;
    targetY += targetSpeedY;
    
      // 화면 가장자리에서 튕기게 하기
    if (targetX < 0 || targetX > width) {
      targetSpeedX *= -1;  // X 방향 반전
    }
    if (targetY < 0 || targetY > height) {
      targetSpeedY *= -1;  // Y 방향 반전
    }
    

    // "21"을 표시할 위치에 숫자를 그림
    fill(targetColor);
    textSize(targetSize);
    text("21", targetX, targetY); // 21의 좌표에 숫자 표시

    // 점수 텍스트(Score)
    fill(255); 
    rect(0, 0, 120, 50);
    fill(0);
    textSize(20);
    text("Score: " + score + "/21", 60, 30);

    // 마우스 호버링 시, 마우스 주변에 원을 그림
    fill(255, 255, 25, 100);
    ellipse(mouseX, mouseY, 50, 50); // 마우스를 따라다니는 원
  } else {
    showEndingScene(); // 엔딩 화면
  }
}

function mousePressed() {
  if (showOpening) {
    openingClickCount++;
    if (openingClickCount >= 2) {
      showOpening = false; // 두 번 클릭하면 오프닝 화면을 종료하고 게임 시작
    }
  } else if (!gameEnded) {
    // 마우스가 21 근처를 클릭했을 때만 점수 증가 및 좌표 변경
    if (dist(mouseX, mouseY, targetX, targetY) < 30) {
      score++;
      resetTargetPosition(); // 21의 좌표를 다시 설정

      if (score >= maxClicks) {
        gameEnded = true; // 21번 클릭 시 게임 종료
      }
    }
  }
}

function resetTargetPosition() {
  // 21의 새로운 좌표를 무작위로 설정
  targetX = random(50, width - 50); // 가장자리로 가지 않도록 여유 공간을 둠
  targetY = random(50, height - 50);
  
  targetSpeedX = random(-3, 3);
  targetSpeedY = random(-3, 3);
}

// 책도 그렇고 홍보를 위한 프레젠테이션
//우선순위, 어떤 크루가 있고, 초대합니다. 짤막하게 구성한다고 했을 때 안내책자에 들어가는 내용들 ㅇ


function showOpeningScene() {
  // 오프닝 화면
  background(21, 21, 21);
  fill(255);
  textSize(32);
  text("Invitation", width / 2, height / 2 - 50);
  textSize(20);
  text("당신을 21 그룹으로 초대합니다", width / 2, height / 2);
  textSize(16);
  text(
    "세상 속에 숨어있는 21을 찾아서 클릭하세요.",
    width / 2,
    height / 2 + 50
  );
  textSize(20);
  text("-->", width / 2 + 250, height / 2 + 250);
}

function showEndingScene() {
  // 엔딩 화면
  background(255 - 21, 255 - 21, 255 - 21);
  textSize(32);
  fill(0);
  text("Congrats! You clicked 21 times!", width / 2, height / 2);
  textSize(20);
  text("당신을 21 그룹의 크루원으로 인정합니다.", width / 2, height / 2 + 50);
  text("하단의 링크로 오세요.", width / 2, height / 2 + 70); // 초대 메시지 표시
  text("sc21.cargo.site", width / 2, height / 2 + 100);
  line(width / 2 - 70, height / 2 + 110, width / 2 + 70, height / 2 + 110);
}
