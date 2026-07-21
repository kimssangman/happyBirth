# ★☆ 생일 축하 홈페이지 ☆★

1999년 개인 홈페이지 감성으로 만든 생일 축하 페이지. 모바일 우선 반응형.

## 1. 고칠 곳은 딱 한 군데

`script.js` 맨 위 `CONFIG` 객체만 바꾸면 됩니다.

```js
const CONFIG = {
  toName: "○○",              // 받는 사람 이름  ← 꼭 바꾸기
  fromName: "상민",           // 보내는 사람 이름
  metDate: "2019-05-18",      // 처음 만난 날
  birthday: "2000-08-15",     // 생일 (월·일만 사용)  ← 꼭 바꾸기
  candleCount: 5,             // 촛불 개수
  marqueeText: "...",         // 위에 흐르는 글씨
  letter: `...`,              // 편지 본문 (한 글자씩 타이핑됨)
  photos: [],                 // 갤러리 사진
  bgmOn: true,                // 입장할 때 BGM 자동 재생
};
```

사진을 넣으려면 `assets/` 폴더에 파일을 넣고:

```js
photos: [
  { src: "assets/photo1.jpg", caption: "우리 첫 사진" },
  { src: "assets/photo2.jpg", caption: "작년 생일" },
],
```

## 2. 들어있는 기능

| 기능 | 설명 |
|---|---|
| 입장 게이트 | "입장하기" 버튼. 브라우저 자동재생 정책 때문에 필요 (여기서 BGM 시작) |
| 하트 폭죽 | 화면 아무 데나 탭/클릭하면 하트가 터짐 |
| 커서 트레일 | 마우스·손가락 따라 하트가 흩날림 |
| 케이크 촛불 | 한국식으로 긴 초 1개 = 10살. 탭하거나 🎤 누르고 "후~" 불면 꺼짐 → 꽃가루 + 팡파레 |
| 불 끈 방 | 촛불이 켜져 있는 동안 케이크 칸이 어두워지고 초 주변만 촛불빛으로 밝아짐 |
| 사진 갤러리 | 사진을 누르면 크게 보기 |
| D-DAY | 함께한 날, 다음 100일 기념일, 생일 카운트다운 (매분 자동 갱신) |
| 편지 봉투 | 봉투 탭 → 열리면서 타자기 효과로 편지가 한 글자씩 |
| 코드 블록 | "실행하기" 누르면 가짜 콘솔 출력 |
| 8비트 BGM | Web Audio로 직접 합성한 Happy Birthday (음원 파일 없음) |
| 방문자 카운터 | 옛날 홈피 감성 가짜 카운터 |
| 짤 대잔치 | 90년대 지오시티즈 GIF 벽. 짤을 누르면 뱅글 돌면서 하트가 터짐 |
| 흐르는 짤 띠 | 상단에서 짤들이 옆으로 계속 흘러감 |

## 3. 짤 추가·교체

짤은 `assets/memes/` 폴더에 있고, `script.js` 의 `MEMES` 배열이 목록입니다.

```js
const MEMES = [
  "dancing-baby.gif",
  "spinning-heart-red.gif",
  // ...
];
```

새 짤을 넣으려면 파일을 `assets/memes/` 에 복사하고 배열에 파일명만 추가하면 됩니다.
빼고 싶으면 배열에서 지우세요. (배열을 비우면 짤 섹션과 상단 띠가 통째로 숨겨집니다.)

목록에 있는데 파일이 없으면 그 짤만 조용히 사라지고 페이지는 안 깨집니다.

> 기본으로 들어있는 짤은 인터넷 아카이브의 **GifCities** 에서 가져온 1990년대
> 지오시티즈 GIF들입니다. 출처는 `assets/memes/CREDITS.md` 참고.
> 저작권자가 불분명한 오래된 GIF라 개인 페이지에 쓰는 건 관행적으로 문제되지 않지만,
> 엄밀히 말해 허락받은 건 아니라는 점은 알고 계세요.

## 4. GitHub Pages 배포

```bash
cd /Users/kimsangmin/Desktop/App/happyBirth
git init
git add .
git commit -m "생일 축하 홈페이지"
git branch -M main
git remote add origin https://github.com/kimssangman/happyBirth.git
git push -u origin main
```

그다음 GitHub 저장소에서 **Settings → Pages → Source: Deploy from a branch → main / (root)** 선택.

1~2분 뒤 `https://kimssangman.github.io/happyBirth/` 에서 열립니다.

> 저장소를 **Public** 으로 만들어야 무료 계정에서 Pages가 켜집니다.
> 링크를 아는 사람은 누구나 볼 수 있으니, 편지에 너무 사적인 내용은 넣지 마세요.

## 5. 로컬에서 미리 보기

```bash
cd /Users/kimsangmin/Desktop/App/happyBirth
python3 -m http.server 8000
```

브라우저에서 `http://localhost:8000` 접속.

> `index.html` 파일을 더블클릭해서 여는 것도 되지만, 마이크 기능은 `http://localhost` 나 `https://` 에서만 동작합니다.

## 6. 파일 구조

```
happyBirth/
├─ index.html       # 구조
├─ style.css        # Y2K 스타일 (별밤 배경·무지개바·워드아트 전부 CSS)
├─ script.js        # CONFIG + 모든 인터랙션
├─ assets/          # 이미지 (없어도 이모지로 자동 대체됨)
│  ├─ CREDITS.md    # 이미지 출처·라이선스
│  └─ memes/        # 90년대 지오시티즈 짤
│     └─ CREDITS.md
├─ .nojekyll        # GitHub Pages 가 파일을 건드리지 않게
└─ README.md
```

이미지가 없거나 깨져도 자동으로 이모지로 대체되니 페이지는 안 깨집니다.
