/* ===== 공통 다국어(i18n) =====
   index.html의 언어 선택(localStorage 'arcade_lang')을 읽어 게임에도 적용한다.
   - 정적: 요소에 data-ko / data-en 속성을 달면 자동 번역
   - 동적: window.t(ko, en) 사용
   - 공통 버튼/난이도/제목 등은 사전(DICT/TITLES)으로 자동 번역 (게임별 수정 불필요) */
(function(){
  let lang='ko'; try{ lang=localStorage.getItem('arcade_lang')||'ko'; }catch(e){}
  window.I18N_LANG=lang;
  window.t=function(ko,en){ return lang==='en'?en:ko; };

  // 공통 UI 문구 사전 (한국어 → 영어). 정확히 일치하는 버튼/라벨에만 적용.
  const DICT={
    '← 메인으로':'← Main','🏠 홈으로':'🏠 Home','메인으로':'Main',
    '🔄 재시작':'🔄 Restart','🔄 다시':'🔄 Again','🔄 다시하기':'🔄 Retry','🔄 다시 시작':'🔄 Restart',
    '재시작':'Restart','다시':'Again','다시하기':'Retry','다시 시작':'Restart',
    '새 게임':'New Game','🔄 새 게임':'🔄 New Game','새 퍼즐':'New Puzzle','🔀 새 미로':'🔀 New Maze','새 미로':'New Maze',
    '🔀 새로 섞기':'🔀 Shuffle','다시 섞기':'Reshuffle','새로 섞기':'Shuffle',
    '시작 ▶':'Start ▶','시작':'Start','게임 시작 ▶':'Start Game ▶','계속':'Resume','계속하기':'Resume','계속하기':'Resume',
    '⚙️ 모드 변경':'⚙️ Mode','⚙️ 모드':'⚙️ Mode','모드 변경':'Change Mode','모드':'Mode','모드 선택':'Select Mode','⚙️ 모드 변경':'⚙️ Change Mode',
    '↩ 무르기':'↩ Undo','무르기':'Undo','🔃 보드 회전':'🔃 Flip','보드 회전':'Flip',
    '쉬움':'Easy','보통':'Normal','어려움':'Hard','난이도':'Difficulty','스트릭트':'Strict','빠름':'Fast',
    '🤖 AI 대전':'🤖 vs AI','🤖 vs AI':'🤖 vs AI','👥 2인 플레이':'👥 2 Players','👥 2인':'👥 2P','2인 플레이':'2 Players','2인':'2P','vs AI':'vs AI',
    '게임 오버':'Game Over','일시정지':'Paused','초기화':'Reset','💡 힌트':'💡 Hint','✏️ 메모':'✏️ Notes','✔ 체크':'✔ Check','지움':'Erase',
    '🔍 바둑판 다시 보기':'🔍 Review Board','📋 결과 다시 보기':'📋 Show Result','새 미로':'New Maze',
    '🎲 랜덤 모드':'🎲 Random','🧠 학습 모드':'🧠 Learning','드리프트':'Drift','부스터':'Boost','발사':'Fire','발사 🔥':'Fire 🔥',
    '벽 모드':'Wall','통과 모드':'Wrap','💀 데스매치':'💀 Deathmatch','♾️ 무한모드':'♾️ Endless',
    // 시작 화면 제목(게임명) — h1 / .overlay h2 에 적용
    '스네이크':'Snake','벽돌깨기':'Breakout','테트리스':'Tetris','플래피 점프':'Flappy Jump','카드 짝맞추기':'Memory Match',
    '스페이스 인베이더':'Space Invaders','소행성':'Asteroids','버블 슈터':'Bubble Shooter','다이노 런':'Dino Run','팩맨':'Pac-Maze',
    '핑퐁':'Ping Pong','슬라이딩 퍼즐':'Sliding Puzzle','스도쿠':'Sudoku','반응속도 테스트':'Reaction Test','빠른 암산':'Quick Math',
    '보석 맞추기':'Match-3','블록 쌓기':'Stack Tower','미로 탈출':'Maze Escape','가위바위보':'Rock Paper Scissors',
    '탑다운 슈팅':'Top-Down Shooter','카트 레이싱':'Kart Racing','점프 어드벤처':'Jump Adventure','포트리스 포격전':'Artillery Duel',
    '사이먼 (기억력)':'Simon (Memory)','사목 (Connect Four)':'Connect Four','오목':'Gomoku','체스':'Chess',
  };
  // 게임 상단 제목 (topbar <b>) 번역
  const TITLES={
    '🔫 탑다운 슈팅':'🔫 Top-Down Shooter','🏎️ 카트 레이싱':'🏎️ Kart Racing','🍄 점프 어드벤처':'🍄 Jump Adventure',
    '💥 포트리스 포격전':'💥 Artillery Duel','💣 지뢰찾기':'💣 Minesweeper','🐹 두더지 잡기':'🐹 Whack-a-Mole','🧩 테트리스':'🧩 Tetris',
    '🐍 스네이크':'🐍 Snake','🧱 벽돌깨기':'🧱 Breakout','🔢 2048':'🔢 2048','🐤 플래피 점프':'🐤 Flappy Jump','🃏 카드 짝맞추기':'🃏 Memory Match',
    '🛸 스페이스 인베이더':'🛸 Space Invaders','🔴 사목':'🔴 Connect Four','🔴 사목 (Connect Four)':'🔴 Connect Four','🧠 사이먼':'🧠 Simon','☄️ 소행성':'☄️ Asteroids',
    '🫧 버블 슈터':'🫧 Bubble Shooter','🦖 다이노 런':'🦖 Dino Run','👻 팩맨':'👻 Pac-Maze','🏓 핑퐁':'🏓 Ping Pong','🔢 슬라이딩 퍼즐':'🔢 Sliding Puzzle',
    '✏️ 스도쿠':'✏️ Sudoku','⚡ 반응속도':'⚡ Reaction','🧮 빠른 암산':'🧮 Quick Math','💎 보석 맞추기':'💎 Match-3','🏗️ 블록 쌓기':'🏗️ Stack Tower','🌀 미로 탈출':'🌀 Maze Escape',
    '✊ 가위바위보':'✊ Rock Paper Scissors','⚫ 오목':'⚫ Gomoku','⚫ 오목 (Gomoku)':'⚫ Gomoku','♟️ 체스':'♟️ Chess',
    '⚪ 오델로':'⚪ Othello','⚪ 오델로 (리버시)':'⚪ Othello','🔴 체커':'🔴 Checkers','▫️ 점과 상자':'▫️ Dots & Boxes',
    '🟦 네모로직':'🟦 Nonogram','🎨 플러드잇':'🎨 Flood It','🟢 도약 점프':'🟢 Doodle Jump',
  };

  function apply(root){
    root=root||document;
    root.querySelectorAll('[data-ko][data-en]').forEach(el=>{
      el.textContent = lang==='en' ? el.getAttribute('data-en') : el.getAttribute('data-ko');
    });
    if(lang!=='en') return; // 한국어는 원문 유지
    root.querySelectorAll('.btn, a.btn, .topbar a, .opt, .mode, .diff, .d, .cat-title, .rbtn span, h1, .overlay h2').forEach(el=>{
      if(el.hasAttribute('data-ko'))return;
      const txt=el.textContent.trim();
      if(DICT[txt]!=null) el.textContent=DICT[txt];
    });
    document.querySelectorAll('.topbar b').forEach(el=>{
      if(el.hasAttribute('data-ko'))return;
      const txt=el.textContent.trim();
      if(TITLES[txt]) el.textContent=TITLES[txt];
    });
  }
  window.i18nApply=apply;
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',()=>apply());
  else apply();
})();
