/* ===== 공통 터치 컨트롤러 =====
   터치 버튼이 실제 KeyboardEvent를 발생시켜, 각 게임의 기존 키보드 입력 로직을
   그대로 재사용한다. 모바일/터치 기기에서만 표시된다. =====================*/
(function(){
  const isTouch = window.matchMedia('(hover:none) and (pointer:coarse)').matches || ('ontouchstart' in window) || navigator.maxTouchPoints>0;

  function fire(type,key){
    // document에서 bubbles로 발생시키면 window의 addEventListener까지 전파되므로 한 번만 발생
    document.dispatchEvent(new KeyboardEvent(type,{key:key,code:key,bubbles:true,cancelable:true}));
  }
  const held = {};
  function down(key,repeat){
    if(held[key])return;
    fire('keydown',key);
    if(repeat){ held[key]=setInterval(()=>fire('keydown',key),110); }
    else held[key]=true;
  }
  function up(key){
    if(held[key]&&held[key]!==true)clearInterval(held[key]);
    delete held[key];
    fire('keyup',key);
  }

  function makeBtn(def){
    const b=document.createElement('div');
    b.className='tc-btn'+(def.cls?' '+def.cls:'');
    b.innerHTML=def.label+(def.sub?`<span class="lbl">${def.sub}</span>`:'');
    const press=e=>{ e.preventDefault(); b.classList.add('pressed');
      if(def.key!=null) down(def.key,def.repeat);
      if(def.onPress) def.onPress(); };
    const release=e=>{ if(e)e.preventDefault(); b.classList.remove('pressed');
      if(def.key!=null) up(def.key);
      if(def.onRelease) def.onRelease(); };
    b.addEventListener('touchstart',press,{passive:false});
    b.addEventListener('touchend',release,{passive:false});
    b.addEventListener('touchcancel',release,{passive:false});
    // 마우스(데스크톱 테스트)도 지원
    b.addEventListener('mousedown',press);
    b.addEventListener('mouseup',release);
    b.addEventListener('mouseleave',e=>{if(b.classList.contains('pressed'))release(e);});
    return b;
  }

  function bar(){
    let el=document.getElementById('tc-bar');
    if(!el){ el=document.createElement('div'); el.id='tc-bar';
      el.innerHTML='<div class="tc-cluster left" id="tc-left"></div><div class="tc-cluster right" id="tc-right"></div>';
      document.body.appendChild(el); }
    return el;
  }

  const TC={
    isTouch(){ return isTouch; },
    /* config: { left:[btnDef...], right:[btnDef...], dpad:{keys:{up,down,left,right}, repeat:true, side:'left'} }
       btnDef: {label, key, repeat, cls, sub, onPress, onRelease} */
    make(config){
      if(!isTouch) return;
      document.body.classList.add('tc-on');
      const el=bar();
      const left=el.querySelector('#tc-left'), right=el.querySelector('#tc-right');
      left.innerHTML=''; right.innerHTML='';
      if(config.dpad){
        const d=config.dpad, side=d.side==='right'?right:left;
        const pad=document.createElement('div'); pad.className='tc-dpad';
        const mk=(k,cls,lab)=>{const x=makeBtn({label:lab,key:k,repeat:d.repeat,cls:cls});return x;};
        const map={up:'▲',down:'▼',left:'◀',right:'▶'};
        ['up','left','mid','right','down'].forEach(pos=>{
          if(pos==='mid'){const m=document.createElement('div');m.className='tc-btn mid';pad.appendChild(m);return;}
          const k=d.keys[pos]; const b=mk(k,pos,map[pos]); pad.appendChild(b);
        });
        side.appendChild(pad);
      }
      (config.left||[]).forEach(def=>left.appendChild(makeBtn(def)));
      (config.right||[]).forEach(def=>right.appendChild(makeBtn(def)));
      return el;
    },
    clear(){ const el=document.getElementById('tc-bar'); if(el)el.remove(); document.body.classList.remove('tc-on'); },
    button:makeBtn
  };
  window.TC=TC;
})();
