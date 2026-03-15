// ============================================================
// DATA & STATE
// ============================================================
const WORLD_NAMES = [
  'Very Easy','Easy','Thinking','Trick','Logic',
  'Math','Visual','Memory','Pattern','Speed',
  'Wordplay','Hidden','Reverse','Double Think','Color',
  'Numbers','Shapes','Science','Nature','History',
  'Mega Mix','Brain Blast','Insane','Tricky Tricky','Expert',
  'Ultimate','Mind Bend','Galaxy Brain','No Mercy','FINAL BOSS'
];

const PUZZLE_POOL = [
  // WORLD 1 - Very Easy
  { q:"What color is the sky?", tag:"EASY", type:"options", opts:["Blue","Red","Green","Purple"], ans:"Blue", hint:"Look up on a clear day." },
  { q:"How many legs does a dog have?", tag:"EASY", type:"options", opts:["2","4","6","8"], ans:"4", hint:"Count them on your pet." },
  { q:"What comes after Tuesday?", tag:"EASY", type:"options", opts:["Monday","Thursday","Wednesday","Friday"], ans:"Wednesday", hint:"Think of the middle of the week." },
  { q:"What is 2 + 2?", tag:"MATH", type:"input", ans:"4", hint:"Count on your fingers." },
  { q:"Tap the BIGGEST number!", tag:"SPOT IT", type:"options", opts:["3","99","7","12"], ans:"99", hint:"Which is largest?" },
  { q:"Which fruit is yellow?", tag:"EASY", type:"options", opts:["Apple","Grape","Banana","Cherry"], ans:"Banana", hint:"Monkeys love it." },
  { q:"How many sides does a triangle have?", tag:"SHAPES", type:"options", opts:["2","3","4","5"], ans:"3", hint:"Tri = three." },
  { q:"What sound does a cow make?", tag:"FUN", type:"options", opts:["Woof","Meow","Moo","Oink"], ans:"Moo", hint:"Old McDonald's farm." },
  { q:"Tap the RED button!", tag:"COLOR", type:"color", ans:"#FF0000", hint:"Look for the fiery one." },
  { q:"What is 10 - 3?", tag:"MATH", type:"input", ans:"7", hint:"Count backward from 10." },
  // WORLD 2 - Easy
  { q:"Which is NOT a planet?", tag:"SCIENCE", type:"options", opts:["Mars","Sun","Venus","Jupiter"], ans:"Sun", hint:"It's actually a star." },
  { q:"Tap the number hidden in this text: Hello5World", tag:"HIDDEN", type:"options", opts:["3","5","8","2"], ans:"5", hint:"Look inside the text." },
  { q:"How many months in a year?", tag:"EASY", type:"input", ans:"12", hint:"January to December." },
  { q:"What has hands but can't clap?", tag:"RIDDLE", type:"options", opts:["A tree","A clock","A glove","A robot"], ans:"A clock", hint:"Tick tock..." },
  { q:"Which weighs more: 1kg feathers or 1kg gold?", tag:"TRICK", type:"options", opts:["Feathers","Gold","Same","Depends"], ans:"Same", hint:"They both weigh 1kg!" },
  // WORLD 3 - Thinking
  { q:"A rooster lays an egg on a roof. Which way does it roll?", tag:"TRICK", type:"options", opts:["Left","Right","Roosters don't lay eggs","Down"], ans:"Roosters don't lay eggs", hint:"Think about what kind of bird a rooster is." },
  { q:"What has a neck but no head?", tag:"RIDDLE", type:"options", opts:["A bottle","A shirt","A giraffe","A snake"], ans:"A bottle", hint:"You might drink from it." },
  { q:"How many fingers do you have on both hands?", tag:"TRICK", type:"input", ans:"10", hint:"Don't overthink it..." },
  { q:"Drag the 🌙 to the ☀️!", tag:"DRAG", type:"drag", dragItem:"🌙", dropTarget:"☀️", hint:"Just drag the moon over." },
  { q:"What goes up but never comes down?", tag:"RIDDLE", type:"options", opts:["A rocket","Your age","A balloon","The sun"], ans:"Your age", hint:"Think about time..." },
  // WORLD 4 - Trick Puzzles
  { q:"Tap the invisible button!", tag:"TRICK", type:"invisible", hint:"It really IS there... somewhere." },
  { q:"The answer is always 'yes'. Tap YES!", tag:"TRICK", type:"options", opts:["No","Maybe","Yes","Never"], ans:"Yes", hint:"Read the question again." },
  { q:"How many animals did Moses take on the ark?", tag:"TRICK", type:"options", opts:["2 of each","Thousands","Zero – it was Noah!","Depends"], ans:"Zero – it was Noah!", hint:"Who built the ark?" },
  { q:"What's wrong? Tap the spelling mistake: 'I luv puzzels'", tag:"TRICK", type:"options", opts:["luv","puzzels","Both","Nothing"], ans:"Both", hint:"Check every word carefully." },
  { q:"Tap the CORRECT answer to 1+1=?", tag:"TRICK", type:"options", opts:["Window","2","3","11"], ans:"2", hint:"Basic math, don't overthink." },
  // WORLD 5 - Logic
  { q:"All cats have 4 legs. Tom is a cat. How many legs does Tom have?", tag:"LOGIC", type:"options", opts:["2","3","4","5"], ans:"4", hint:"Follow the logic." },
  { q:"What number comes next: 2, 4, 6, 8, ?", tag:"PATTERN", type:"input", ans:"10", hint:"Add 2 each time." },
  { q:"If A=1, B=2, what is C?", tag:"LOGIC", type:"options", opts:["1","2","3","4"], ans:"3", hint:"Follow the alphabet." },
  { q:"There are 3 apples. You take 2. How many do YOU have?", tag:"TRICK", type:"options", opts:["1","2","3","0"], ans:"2", hint:"How many did YOU take?" },
  { q:"What is half of 2+2?", tag:"MATH", type:"options", opts:["1","2","3","4"], ans:"3", hint:"Half of (2+2), not (half of 2)+2." },
  // WORLD 6-10: Mixed
  { q:"Move the slider to exactly 50%!", tag:"SLIDER", type:"slider", ans:50, hint:"Halfway!" },
  { q:"Spell 'CAT' on the keypad!", tag:"INPUT", type:"input", ans:"CAT", hint:"Three letters: C-A-T." },
  { q:"Which number is the odd one: 2,4,6,7,8?", tag:"PATTERN", type:"options", opts:["2","4","6","7"], ans:"7", hint:"Which doesn't belong in the sequence?" },
  { q:"Tap the SMALLEST number: 1, 100, 0.5, 99", tag:"MATH", type:"options", opts:["1","100","0.5","99"], ans:"0.5", hint:"Think about decimals." },
  { q:"What can you catch but not throw?", tag:"RIDDLE", type:"options", opts:["A ball","A cold","A fish","A break"], ans:"A cold", hint:"Achoo!" },
  { q:"If you have a 1 story house made of red bricks, what color are the stairs?", tag:"TRICK", type:"options", opts:["Red","White","Brown","No stairs!"], ans:"No stairs!", hint:"It's a 1-story house..." },
  { q:"Mary has 4 daughters. Each has 1 brother. How many children total?", tag:"TRICK", type:"options", opts:["8","5","9","6"], ans:"5", hint:"They share the same brother!" },
  { q:"What's 7 × 8?", tag:"MATH", type:"input", ans:"56", hint:"7 eights... or 8 sevens." },
  { q:"Which planet is closest to the sun?", tag:"SCIENCE", type:"options", opts:["Venus","Earth","Mercury","Mars"], ans:"Mercury", hint:"First planet from the sun." },
  { q:"Tap all the prime numbers: 1,2,3,4,5", tag:"MATH", type:"options", opts:["1,2,3","2,3,5","1,3,5","2,4,5"], ans:"2,3,5", hint:"A prime is only divisible by 1 and itself. Note: 1 is NOT prime." },
  // More levels 41-100
  { q:"What has keys but no locks?", tag:"RIDDLE", type:"options", opts:["A piano","A map","A computer","A keyboard"], ans:"A piano", hint:"Musical answer." },
  { q:"How many seconds in a minute?", tag:"EASY", type:"input", ans:"60", hint:"Tick, tick... sixty ticks!" },
  { q:"Tap the number BETWEEN 5 and 9:", tag:"PATTERN", type:"options", opts:["4","7","10","11"], ans:"7", hint:"Between five and nine." },
  { q:"What has a bottom at the top?", tag:"RIDDLE", type:"options", opts:["A cliff","Your legs","A bucket","A well"], ans:"Your legs", hint:"Think about your body." },
  { q:"What is always in front of you but can't be seen?", tag:"RIDDLE", type:"options", opts:["Your nose","The future","Air","Luck"], ans:"The future", hint:"Tomorrow..." },
  { q:"I speak without a mouth. What am I?", tag:"RIDDLE", type:"options", opts:["A radio","An echo","A book","A sign"], ans:"An echo", hint:"Mountains like to do this." },
  { q:"What is 1000 - 7?", tag:"MATH", type:"input", ans:"993", hint:"Just subtract." },
  { q:"Which direction does the Earth rotate?", tag:"SCIENCE", type:"options", opts:["East to West","West to East","North to South","It doesn't"], ans:"West to East", hint:"Think about where the sun rises." },
  { q:"What number is the Roman numeral VII?", tag:"LOGIC", type:"options", opts:["4","5","6","7"], ans:"7", hint:"V=5, II=2, add them." },
  { q:"Tap the shape with 0 corners:", tag:"SHAPES", type:"options", opts:["Triangle","Square","Circle","Pentagon"], ans:"Circle", hint:"Round and round..." },
  // 51-100 and beyond - reuse with variation
  { q:"What is the square root of 64?", tag:"MATH", type:"input", ans:"8", hint:"What × what = 64?" },
  { q:"How many legs does a spider have?", tag:"SCIENCE", type:"options", opts:["4","6","8","10"], ans:"8", hint:"It's creepy AND crawly." },
  { q:"If tomorrow is Wednesday, what day is today?", tag:"LOGIC", type:"options", opts:["Monday","Tuesday","Thursday","Friday"], ans:"Tuesday", hint:"The day before Wednesday." },
  { q:"What is the only even prime number?", tag:"MATH", type:"options", opts:["1","2","4","6"], ans:"2", hint:"Very small and special." },
  { q:"Tap the word that's upside down: 🙃", tag:"TRICK", type:"options", opts:["🙂","🙃","😊","😐"], ans:"🙃", hint:"The upside-down smiley!" },
  { q:"A bat and a ball cost $1.10. Bat costs $1 more than ball. Ball costs?", tag:"TRICK", type:"options", opts:["10¢","5¢","1¢","15¢"], ans:"5¢", hint:"Don't say 10¢ – think again!" },
  { q:"How many letters in 'ALPHABET'?", tag:"TRICK", type:"options", opts:["8","7","9","6"], ans:"8", hint:"Count the letters in ALPHABET." },
  { q:"What comes once in a minute, twice in a moment, never in 1000 years?", tag:"RIDDLE", type:"options", opts:["A second","The letter M","Time","A wish"], ans:"The letter M", hint:"Think about spelling, not time." },
  { q:"Solve: 🍎+🍎=10, 🍊+🍊+🍊=9, 🍎+🍊=?", tag:"PATTERN", type:"options", opts:["7","8","9","6"], ans:"8", hint:"Apple=5, Orange=3, 5+3=?" },
  { q:"What's 15% of 200?", tag:"MATH", type:"input", ans:"30", hint:"10%=20, 5%=10, add them." },
  // 61-100
  { q:"Which is heaviest: ton of cotton or ton of steel?", tag:"TRICK", type:"options", opts:["Steel","Cotton","Same","Depends"], ans:"Same", hint:"Both are 1 ton!" },
  { q:"How many holes in a straw?", tag:"TRICK", type:"options", opts:["1","2","0","Depends"], ans:"1", hint:"It's one continuous hole!" },
  { q:"What 3-letter word can be added to these: _ent, _ink, _awn?", tag:"WORDPLAY", type:"options", opts:["pl","dr","gr","tr"], ans:"dr", hint:"drent? drink! drawn!" },
  { q:"Find the number: TWO × THREE = ?", tag:"MATH", type:"input", ans:"6", hint:"2 × 3" },
  { q:"If you're running in a race and pass 2nd place, what place are you?", tag:"TRICK", type:"options", opts:["1st","2nd","3rd","4th"], ans:"2nd", hint:"You PASSED 2nd place... so YOU are now 2nd." },
  { q:"What travels around the world but stays in one corner?", tag:"RIDDLE", type:"options", opts:["A stamp","A passport","Wi-Fi","A coin"], ans:"A stamp", hint:"Check your mail!" },
  { q:"How many months have 28 days?", tag:"TRICK", type:"options", opts:["1","2","4","All 12"], ans:"All 12", hint:"Every month has at least 28 days..." },
  { q:"What can fill a room but takes no space?", tag:"RIDDLE", type:"options", opts:["Air","Light","Sound","Heat"], ans:"Light", hint:"Turn it on!" },
  { q:"The more you take, the more you leave behind. What?", tag:"RIDDLE", type:"options", opts:["Money","Footsteps","Memories","Time"], ans:"Footsteps", hint:"Walk this way..." },
  { q:"I have cities but no houses, mountains but no trees, water but no fish. What am I?", tag:"RIDDLE", type:"options", opts:["A dream","A map","A painting","A book"], ans:"A map", hint:"Navigate this!" },
  // 71-100
  { q:"What is 1/4 of 100?", tag:"MATH", type:"input", ans:"25", hint:"Divide by 4." },
  { q:"How many days in 3 weeks?", tag:"MATH", type:"input", ans:"21", hint:"7 days × 3" },
  { q:"What's the 10th letter of the alphabet?", tag:"LOGIC", type:"input", ans:"J", hint:"A B C D E F G H I ?" },
  { q:"Can a man in Florida marry his widow's sister?", tag:"TRICK", type:"options", opts:["Yes","No","Only in Florida","Depends"], ans:"No", hint:"If he has a WIDOW, what does that mean?" },
  { q:"How far can a dog run into the woods?", tag:"TRICK", type:"options", opts:["1 mile","Halfway","As far as it wants","Depends"], ans:"Halfway", hint:"After halfway, it's running OUT of the woods!" },
  { q:"What's next: J, F, M, A, M, J, ?", tag:"PATTERN", type:"options", opts:["A","J","K","L"], ans:"J", hint:"Months of the year, first letters." },
  { q:"What word becomes shorter when you add 2 letters?", tag:"WORDPLAY", type:"options", opts:["Long","Short","Small","Brief"], ans:"Short", hint:"'Short' + er = 'Shorter'" },
  { q:"Tap the ODD one out: 🐶🐱🐸🐭", tag:"SPOT IT", type:"options", opts:["🐶","🐱","🐸","🐭"], ans:"🐸", hint:"One is not a mammal!" },
  { q:"What do you call a sleeping dinosaur?", tag:"FUN", type:"options", opts:["A dino-snore!","A fossil","A T-Rex","Extinct"], ans:"A dino-snore!", hint:"Listen for the sound!" },
  { q:"Rearrange LISTEN to make another word:", tag:"WORDPLAY", type:"options", opts:["INLETS","SILENT","TINSEL","All work!"], ans:"All work!", hint:"LISTEN is an anagram of multiple words!" },
  // 101-200: Harder versions (cycle through types)
  { q:"What is 17 × 13?", tag:"MATH", type:"input", ans:"221", hint:"Break it: 17×10=170, 17×3=51." },
  { q:"How many zeros in a trillion?", tag:"MATH", type:"options", opts:["9","10","11","12"], ans:"12", hint:"Million=6, Billion=9, Trillion=12." },
  { q:"Complete: 1, 1, 2, 3, 5, 8, ?", tag:"PATTERN", type:"input", ans:"13", hint:"Fibonacci: add last two numbers." },
  { q:"What is the only number that's spelled with letters in alphabetical order?", tag:"WORDPLAY", type:"options", opts:["Eight","Forty","One","Five"], ans:"Forty", hint:"F-O-R-T-Y – check the letters!" },
  { q:"Tip the bottle upside down! What letter does an upside-down 'p' become?", tag:"TRICK", type:"options", opts:["q","b","d","p"], ans:"d", hint:"Rotate p 180°" },
  { q:"What is 2^10?", tag:"MATH", type:"input", ans:"1024", hint:"2×2×2×2×2×2×2×2×2×2" },
  { q:"Which letter appears most in 'BANANA'?", tag:"WORDPLAY", type:"options", opts:["B","A","N","All same"], ans:"A", hint:"Count each: B=1, A=3, N=2" },
  { q:"If you flip this upside down it makes sense: 1881", tag:"TRICK", type:"options", opts:["It reads differently","It reads the same","It becomes 1661","Nothing changes"], ans:"It reads the same", hint:"Rotate the number 180°!" },
  { q:"A bat, a ball, 3 oranges, 2 apples. How many fruits?", tag:"TRICK", type:"options", opts:["5","3","6","2"], ans:"5", hint:"Only oranges and apples are fruits!" },
  { q:"What gets bigger the more you take away?", tag:"RIDDLE", type:"options", opts:["A hole","Debt","Time","Memory"], ans:"A hole", hint:"Dig dig dig..." },
];

// Generate 300 levels (cycling pool with increasing difficulty markers)
const LEVELS = [];
for(let i = 0; i < 300; i++){
  const poolIdx = i % PUZZLE_POOL.length;
  LEVELS.push({...PUZZLE_POOL[poolIdx], levelNum: i+1, worldNum: Math.floor(i/10)+1});
}

// State
let state = {
  coins: 100,
  hints: 3,
  levelProgress: {}, // levelNum: {stars, time}
  lastDaily: null,
  currentLevel: 1,
  currentWorld: 1,
  achievements: {},
};
// Per-level session tracking (not saved)
let hintUsedThisLevel = false;

function saveState() {
  try { localStorage.setItem('braincrack_v1', JSON.stringify(state)); } catch(e){}
}
function loadState() {
  try {
    const s = localStorage.getItem('braincrack_v1');
    if(s) { const parsed = JSON.parse(s); Object.assign(state, parsed); }
  } catch(e){}
}

// ============================================================
// SCREEN MANAGEMENT
// ============================================================
let screenHistory = [];

function _activateScreen(id) {
  // Low-level: just show the screen, no history change
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  const hud = document.getElementById('hud');
  if(id === 'screen-home') hud.style.display = 'none';
  else { hud.style.display = 'flex'; updateHUD(); }
  if(id === 'screen-worlds') buildWorldGrid();
  if(id === 'screen-leaderboard') buildLeaderboard();
  if(id === 'screen-shop') document.getElementById('shop-coins').textContent = state.coins;
  if(id === 'screen-achievements') buildAchievementsScreen();
}

function showScreen(id) {
  if(id === 'screen-home') screenHistory = [];
  else screenHistory.push(id);
  _activateScreen(id);
}

function goBack() {
  // Always clean up game state
  clearInterval(timerInterval);
  clearInterval(restartCountdownInterval);
  var wo = document.getElementById('wrong-overlay');
  var ro = document.getElementById('result-overlay');
  if(wo) wo.classList.remove('show');
  if(ro) ro.classList.remove('show');
  puzzleState = { answered: false };

  // Remove current screen from history
  screenHistory.pop();
  var prev = screenHistory[screenHistory.length - 1];

  if(!prev) {
    // Nothing left — go home
    screenHistory = [];
    _activateScreen('screen-home');
  } else if(prev === 'screen-levels') {
    // Go back to level grid (re-render it)
    _activateScreen('screen-levels');
    _renderLevelGrid(state.currentWorld);
  } else {
    _activateScreen(prev);
  }
}

function _renderLevelGrid(worldNum) {
  // Re-renders the level grid without pushing to history
  document.getElementById('levels-title').textContent = `World ${worldNum} – ${WORLD_NAMES[worldNum-1]}`;
  var firstLevel = (worldNum-1)*10+1;
  var completedInWorld = Object.keys(state.levelProgress).filter(function(l){
    var ln = parseInt(l); return ln >= firstLevel && ln < firstLevel+10;
  }).length;
  document.getElementById('world-progress-bar').style.width = (completedInWorld*10)+'%';
  var grid = document.getElementById('levels-grid');
  grid.innerHTML = '';
  for(var i=0; i<10; i++){
    var lvl = firstLevel + i;
    var isUnlocked = lvl===1 || state.levelProgress[lvl-1];
    var prog = state.levelProgress[lvl];
    var btn = document.createElement('div');
    btn.className = 'level-btn' + (!isUnlocked ? ' locked' : '') + (prog ? ' completed' : '');
    var stars = prog ? '⭐'.repeat(prog.stars) : '';
    btn.innerHTML = lvl+'<span class="lv-stars">'+stars+'</span>';
    if(isUnlocked) (function(l){ btn.onclick = function(){ startLevel(l); }; })(lvl);
    grid.appendChild(btn);
  }
}
function updateHUD() {
  document.getElementById('hud-coin-count').textContent = state.coins;
}

// ============================================================
// WORLD GRID
// ============================================================
function buildWorldGrid() {
  const grid = document.getElementById('worlds-grid');
  grid.innerHTML = '';
  for(let w=1; w<=50; w++){
    const firstLevel = (w-1)*10+1;
    const isUnlocked = firstLevel === 1 || state.levelProgress[(firstLevel-1)];
    const completedInWorld = Object.keys(state.levelProgress).filter(l => {
      const ln = parseInt(l); return ln >= firstLevel && ln < firstLevel+10;
    }).length;
    const card = document.createElement('div');
    card.className = 'world-card' + (isUnlocked ? '' : ' locked');
    card.innerHTML = `<div class="world-inner">
      <div class="world-num">W${w}</div>
      <div class="world-name">${WORLD_NAMES[w-1]}</div>
      <div class="world-stars">${'⭐'.repeat(Math.min(3,Math.floor(completedInWorld/4)))}</div>
      <div class="world-progress">${completedInWorld}/10</div>
    </div>`;
    if(isUnlocked) card.onclick = () => openWorld(w);
    grid.appendChild(card);
  }
}

// ============================================================
// LEVEL GRID
// ============================================================
function openWorld(worldNum) {
  state.currentWorld = worldNum;
  showScreen('screen-levels');   // pushes screen-levels to history
  _renderLevelGrid(worldNum);    // renders grid without touching history
}

// ============================================================
// GAME ENGINE
// ============================================================
let timerInterval = null;
let timerSeconds = 0;
let puzzleState = {};

function startLevel(lvlNum) {
  state.currentLevel = lvlNum;
  showScreen('screen-game');
  clearInterval(timerInterval);
  timerSeconds = 0;
  timerInterval = setInterval(() => {
    timerSeconds++;
    const m = String(Math.floor(timerSeconds/60)).padStart(2,'0');
    const s = String(timerSeconds%60).padStart(2,'0');
    document.getElementById('timer').textContent = m+':'+s;
  }, 1000);

  const level = LEVELS[lvlNum-1];
  document.getElementById('level-label').textContent = `Level ${lvlNum}`;
  document.getElementById('q-tag').textContent = level.tag;
  document.getElementById('q-text').textContent = level.q;
  document.getElementById('hint-box').classList.add('hidden');
  document.getElementById('hint-box').textContent = '';
  puzzleState = { answered: false };
  hintUsedThisLevel = false;
  updateHintButton();
  renderPuzzle(level);
  // Show ad every 5 levels
  if(lvlNum % 5 === 0) showToast('📢 Ad loading... (mock)');
}

function renderPuzzle(level) {
  const area = document.getElementById('puzzle-area');
  area.innerHTML = '';
  // Clean up any stale document-level drag listeners from previous level
  document.removeEventListener('touchmove', window._dragMove);
  document.removeEventListener('touchend', window._dragEnd);
  if(level.type === 'options') {
    const grid = document.createElement('div');
    grid.className = 'options-grid';
    level.opts.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.textContent = opt;
      btn.onclick = () => checkAnswer(opt, level.ans, btn);
      grid.appendChild(btn);
    });
    area.appendChild(grid);
  } else if(level.type === 'input') {
    const inp = document.createElement('input');
    inp.className = 'puzzle-input';
    inp.placeholder = 'Type your answer...';
    inp.id = 'puzzle-inp';
    const sub = document.createElement('button');
    sub.className = 'submit-btn';
    sub.textContent = 'Submit ✓';
    sub.onclick = () => checkAnswer(inp.value.trim().toLowerCase(), level.ans.toLowerCase(), sub);
    inp.onkeydown = e => { if(e.key==='Enter') sub.click(); };
    area.appendChild(inp);
    area.appendChild(sub);
  } else if(level.type === 'drag') {
    const label = document.createElement('div');
    label.style.cssText = 'font-size:13px;color:var(--muted);font-weight:700;text-align:center';
    label.textContent = 'Drag to the target!';
    const row = document.createElement('div');
    row.style.cssText = 'display:flex;gap:32px;align-items:center;justify-content:center;margin-top:8px';
    const dragEl = document.createElement('div');
    dragEl.className = 'drag-item';
    dragEl.textContent = level.dragItem;
    dragEl.draggable = true;
    dragEl.id = 'drag-el';
    // Touch drag — named handlers so they can be properly removed
    let isDragging = false, offsetX=0, offsetY=0;
    function dragMove(e) {
      if(!isDragging) return;
      const t = e.touches[0];
      dragEl.style.left = (t.clientX - offsetX)+'px';
      dragEl.style.top = (t.clientY - offsetY)+'px';
    }
    function dragEnd(e) {
      if(!isDragging) return;
      isDragging = false;
      document.removeEventListener('touchmove', dragMove);
      document.removeEventListener('touchend', dragEnd);
      const drop = document.getElementById('drop-zone');
      if(drop){
        const dr = drop.getBoundingClientRect();
        const ex = parseFloat(dragEl.style.left)+35;
        const ey = parseFloat(dragEl.style.top)+35;
        if(ex>=dr.left && ex<=dr.right && ey>=dr.top && ey<=dr.bottom){
          checkAnswer('correct','correct',dragEl);
        } else {
          dragEl.style.position=''; dragEl.style.left=''; dragEl.style.top='';
        }
      }
    }
    dragEl.addEventListener('touchstart', e => {
      isDragging = true;
      const t = e.touches[0];
      const rect = dragEl.getBoundingClientRect();
      offsetX = t.clientX - rect.left; offsetY = t.clientY - rect.top;
      dragEl.style.position = 'fixed'; dragEl.style.zIndex = 999;
      document.addEventListener('touchmove', dragMove, {passive:true});
      document.addEventListener('touchend', dragEnd, {passive:true});
    }, {passive:true});
    dragEl.addEventListener('dragstart', e => e.dataTransfer.setData('text','drag'));
    const dropEl = document.createElement('div');
    dropEl.className = 'drop-zone';
    dropEl.id = 'drop-zone';
    dropEl.textContent = level.dropTarget;
    dropEl.addEventListener('dragover', e => { e.preventDefault(); dropEl.classList.add('over'); });
    dropEl.addEventListener('dragleave', () => dropEl.classList.remove('over'));
    dropEl.addEventListener('drop', e => { e.preventDefault(); checkAnswer('correct','correct',dragEl); });
    row.appendChild(dragEl); row.appendChild(dropEl);
    area.appendChild(label); area.appendChild(row);
  } else if(level.type === 'invisible') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:100%;height:120px;position:relative';
    const ibtn = document.createElement('button');
    ibtn.style.cssText = 'position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);opacity:0;width:80px;height:80px;border:none;cursor:pointer;border-radius:50%';
    ibtn.onclick = () => { ibtn.style.opacity='1'; ibtn.style.background='var(--accent3)'; ibtn.textContent='✓'; checkAnswer('correct','correct',ibtn); };
    const hint2 = document.createElement('div');
    hint2.style.cssText = 'text-align:center;color:var(--muted);font-size:13px;font-weight:700;margin-top:8px';
    hint2.textContent = 'The button is... somewhere in the middle 👀';
    wrap.appendChild(ibtn); area.appendChild(wrap); area.appendChild(hint2);
  } else if(level.type === 'color') {
    const colors = [{c:'#FF0000',n:'Red'},{c:'#00CC44',n:'Green'},{c:'#0066FF',n:'Blue'},{c:'#FFD700',n:'Yellow'}];
    const row = document.createElement('div');
    row.className = 'color-options';
    colors.forEach(co => {
      const sw = document.createElement('div');
      sw.className = 'color-swatch';
      sw.style.background = co.c;
      sw.title = co.n;
      sw.onclick = () => checkAnswer(co.c, level.ans, sw);
      row.appendChild(sw);
    });
    area.appendChild(row);
  } else if(level.type === 'slider') {
    const label = document.createElement('div');
    label.style.cssText = 'font-size:13px;color:var(--muted);font-weight:700';
    label.textContent = 'Drag to position:';
    const sl = document.createElement('input');
    sl.type = 'range'; sl.min=0; sl.max=100; sl.value=0;
    sl.className = 'puzzle-slider';
    const valDisplay = document.createElement('div');
    valDisplay.style.cssText = 'font-family:Fredoka One,cursive;font-size:28px;color:var(--accent2)';
    valDisplay.textContent = '0%';
    sl.oninput = () => { valDisplay.textContent = sl.value+'%'; };
    const sub = document.createElement('button');
    sub.className = 'submit-btn'; sub.textContent = 'Submit ✓';
    sub.onclick = () => {
      const val = parseInt(sl.value);
      if(Math.abs(val - level.ans) <= 3) checkAnswer('correct','correct',sub);
      else { showToast('Not quite! Try again.'); sl.style.borderColor='var(--accent4)'; setTimeout(()=>sl.style.borderColor='',600); }
    };
    area.appendChild(label); area.appendChild(sl); area.appendChild(valDisplay); area.appendChild(sub);

  // ── DRAWING puzzle ──
  } else if(level.type === 'draw') {
    const inst = document.createElement('div');
    inst.style.cssText='font-size:13px;color:var(--muted);font-weight:700;text-align:center';
    inst.textContent = level.drawInstruction || 'Draw the shape shown!';
    const canvas = document.createElement('canvas');
    canvas.className = 'draw-canvas';
    canvas.width = 260; canvas.height = 180;
    const ctx2 = canvas.getContext('2d');
    ctx2.fillStyle = '#fff'; ctx2.fillRect(0,0,260,180);
    // Draw target shape hint faintly
    if(level.drawShape) {
      ctx2.save(); ctx2.globalAlpha=0.12; ctx2.strokeStyle='#ff6b35'; ctx2.lineWidth=18;
      ctx2.setLineDash([10,8]);
      if(level.drawShape==='circle'){ctx2.beginPath();ctx2.arc(130,90,60,0,Math.PI*2);ctx2.stroke();}
      else if(level.drawShape==='square'){ctx2.strokeRect(60,30,140,110);}
      else if(level.drawShape==='triangle'){ctx2.beginPath();ctx2.moveTo(130,20);ctx2.lineTo(220,160);ctx2.lineTo(40,160);ctx2.closePath();ctx2.stroke();}
      ctx2.restore();
    }
    let drawing=false, lastX=0, lastY=0, strokes=0;
    ctx2.strokeStyle='#1a0a2e'; ctx2.lineWidth=5; ctx2.lineCap='round';
    function getPos(e,el){const r=el.getBoundingClientRect();const src=e.touches?e.touches[0]:e;return[src.clientX-r.left,src.clientY-r.top];}
    canvas.addEventListener('mousedown',e=>{drawing=true;[lastX,lastY]=getPos(e,canvas);strokes++;});
    canvas.addEventListener('mousemove',e=>{if(!drawing)return;const[x,y]=getPos(e,canvas);ctx2.beginPath();ctx2.moveTo(lastX,lastY);ctx2.lineTo(x,y);ctx2.stroke();[lastX,lastY]=[x,y];});
    canvas.addEventListener('mouseup',()=>drawing=false);
    canvas.addEventListener('touchstart',e=>{e.stopPropagation();drawing=true;[lastX,lastY]=getPos(e,canvas);strokes++;},{passive:true});
    canvas.addEventListener('touchmove',e=>{e.stopPropagation();if(!drawing)return;const[x,y]=getPos(e,canvas);ctx2.beginPath();ctx2.moveTo(lastX,lastY);ctx2.lineTo(x,y);ctx2.stroke();[lastX,lastY]=[x,y];},{passive:true});
    canvas.addEventListener('touchend',e=>{e.stopPropagation();drawing=false;},{passive:true});
    const btns = document.createElement('div'); btns.className='draw-btns';
    const colors=['#1a0a2e','#ff006e','#06d6a0','#ffbe0b','#0066ff'];
    let activeColor='#1a0a2e';
    colors.forEach(c=>{const b=document.createElement('button');b.className='draw-color-btn'+(c===activeColor?' active':'');b.style.background=c;b.onclick=()=>{activeColor=c;ctx2.strokeStyle=c;btns.querySelectorAll('.draw-color-btn').forEach(x=>x.classList.remove('active'));b.classList.add('active');};btns.appendChild(b);});
    const clr=document.createElement('button');clr.className='draw-clear-btn';clr.textContent='🗑 Clear';
    clr.onclick=()=>{ctx2.fillStyle='#fff';ctx2.fillRect(0,0,260,180);strokes=0;if(level.drawShape){ctx2.save();ctx2.globalAlpha=0.12;ctx2.strokeStyle='#ff6b35';ctx2.lineWidth=18;ctx2.setLineDash([10,8]);if(level.drawShape==='circle'){ctx2.beginPath();ctx2.arc(130,90,60,0,Math.PI*2);ctx2.stroke();}else if(level.drawShape==='square'){ctx2.strokeRect(60,30,140,110);}else if(level.drawShape==='triangle'){ctx2.beginPath();ctx2.moveTo(130,20);ctx2.lineTo(220,160);ctx2.lineTo(40,160);ctx2.closePath();ctx2.stroke();}ctx2.restore();}};
    btns.appendChild(clr);
    const sub=document.createElement('button');sub.className='draw-submit-btn';sub.textContent='✅ Done!';
    sub.onclick=()=>{if(strokes<1){showToast('✏️ Draw something first!');return;}checkAnswer('correct','correct',sub);};
    area.appendChild(inst); area.appendChild(canvas); area.appendChild(btns); area.appendChild(sub);

  // ── TILT puzzle ──
  } else if(level.type === 'tilt') {
    const phoneEl = document.createElement('span');
    phoneEl.className = 'tilt-phone'; phoneEl.textContent = '📱';
    const inst = document.createElement('div');
    inst.className = 'tilt-instruction'; inst.textContent = level.tiltInstruction || 'Tilt your device!';
    const progressLbl = document.createElement('div');
    progressLbl.style.cssText='color:var(--muted);font-size:12px;font-weight:700;text-align:center';
    progressLbl.textContent='Hold the device correctly...';
    let tiltDone=false, tiltTimeout=null;
    function onTilt(e){
      if(tiltDone||puzzleState.answered) return;
      const gamma=e.gamma||0; const beta=e.beta||0;
      phoneEl.style.transform=`rotate(${gamma*0.5}deg) rotateX(${beta*0.3}deg)`;
      const dir=level.tiltDir||'left';
      let triggered=false;
      if(dir==='left'&&gamma<-25) triggered=true;
      else if(dir==='right'&&gamma>25) triggered=true;
      else if(dir==='forward'&&beta<10) triggered=true;
      else if(dir==='back'&&beta>45) triggered=true;
      else if(dir==='any'&&(Math.abs(gamma)>30||beta<5)) triggered=true;
      if(triggered){
        tiltDone=true;
        progressLbl.textContent='✅ Perfect tilt!';
        clearTimeout(tiltTimeout);
        window.removeEventListener('deviceorientation',onTilt);
        setTimeout(()=>checkAnswer('correct','correct',phoneEl),400);
      }
    }
    // Fallback button for devices without gyro
    const fallback=document.createElement('button');
    fallback.className='submit-btn';fallback.textContent='📱 Simulate Tilt';
    fallback.style.marginTop='8px';
    fallback.onclick=()=>{tiltDone=true;window.removeEventListener('deviceorientation',onTilt);checkAnswer('correct','correct',fallback);};
    // Request permission on iOS
    if(typeof DeviceOrientationEvent!=='undefined'&&typeof DeviceOrientationEvent.requestPermission==='function'){
      const permBtn=document.createElement('button');permBtn.className='submit-btn';permBtn.textContent='🔓 Allow Tilt';
      permBtn.onclick=()=>DeviceOrientationEvent.requestPermission().then(r=>{if(r==='granted')window.addEventListener('deviceorientation',onTilt);}).catch(()=>{});
      area.appendChild(phoneEl);area.appendChild(inst);area.appendChild(progressLbl);area.appendChild(permBtn);area.appendChild(fallback);
    } else {
      window.addEventListener('deviceorientation',onTilt);
      area.appendChild(phoneEl);area.appendChild(inst);area.appendChild(progressLbl);area.appendChild(fallback);
    }
    // Auto cleanup
    tiltTimeout=setTimeout(()=>{window.removeEventListener('deviceorientation',onTilt);},30000);

  // ── MATH EQUATION puzzle ──
  } else if(level.type === 'math') {
    const display=document.createElement('div');display.className='math-display';display.textContent=level.equation||'?';
    const ansDisplay=document.createElement('div');ansDisplay.className='math-answer-display';ansDisplay.textContent='';
    let mathInput='';
    const numpad=document.createElement('div');numpad.className='math-numpad';
    const keys=['7','8','9','4','5','6','1','2','3','-','0','⌫'];
    keys.forEach(k=>{
      const btn=document.createElement('button');
      btn.className='math-key'+(k==='-'?' op':'');
      btn.textContent=k;
      btn.onclick=()=>{
        if(k==='⌫'){mathInput=mathInput.slice(0,-1);}
        else if(k==='-'){if(mathInput.length===0)mathInput='-';}
        else{if(mathInput.length<6)mathInput+=k;}
        ansDisplay.textContent=mathInput||'';
      };
      numpad.appendChild(btn);
    });
    const sub=document.createElement('button');sub.className='draw-submit-btn';sub.textContent='✅ Submit';
    sub.onclick=()=>{
      if(!mathInput){showToast('Enter your answer!');return;}
      checkAnswer(mathInput.trim(), String(level.ans), sub);
    };
    area.appendChild(display);area.appendChild(ansDisplay);area.appendChild(numpad);area.appendChild(sub);
  }
}

function checkAnswer(given, correct, el) {
  if(puzzleState.answered) return;
  // normalize
  const g = String(given).toLowerCase().replace(/\s+/g,'');
  const c = String(correct).toLowerCase().replace(/\s+/g,'');
  if(g === c || g === 'correct') {
    puzzleState.answered = true;
    clearInterval(timerInterval);
    if(el && el.classList) el.classList.add('correct');
    playSound('correct');
    const stars = timerSeconds < 30 ? 3 : timerSeconds < 90 ? 2 : 1;
    const coinReward = stars * 10;
    state.coins += coinReward;
    state.levelProgress[state.currentLevel] = { stars, time: timerSeconds };
    saveState();
    setTimeout(() => showResult(true, stars, coinReward), 600);
  } else {
    if(el && el.classList) el.classList.add('wrong');
    playSound('wrong');
    // Disable all inputs immediately
    puzzleState.answered = true;
    setTimeout(() => {
      if(el && el.classList) el.classList.remove('wrong');
      puzzleState.answered = false;
    }, 300);
    triggerWrongRestart();
  }
}

let restartCountdownInterval = null;

function triggerWrongRestart() {
  clearInterval(timerInterval);
  const ov = document.getElementById('wrong-overlay');
  const cd = document.getElementById('restart-countdown');
  const msg = document.getElementById('wrong-msg');
  const emojis = ['😵','💀','🤦','😤','😬'];
  document.getElementById('wrong-emoji').textContent = emojis[Math.floor(Math.random()*emojis.length)];
  msg.textContent = 'Wrong answer! Level restarting in...';
  ov.classList.add('show');
  let count = 3;
  cd.textContent = count;
  clearInterval(restartCountdownInterval);
  restartCountdownInterval = setInterval(() => {
    count--;
    cd.textContent = count;
    if(count <= 0) {
      clearInterval(restartCountdownInterval);
      ov.classList.remove('show');
      puzzleState.answered = false;
      startLevel(state.currentLevel);
    }
  }, 1000);
}

function showResult(win, stars, coins) {
  const ov = document.getElementById('result-overlay');
  document.getElementById('result-emoji').textContent = ['🎉','🧠','🏆','✨'][stars-1] || '🎉';
  const titles = {3:'GENIUS! 🔥', 2:'Nice Work! 👏', 1:'You Got It! 😅'};
  document.getElementById('result-title').textContent = titles[stars];
  document.getElementById('result-stars').textContent = '⭐'.repeat(stars) + '☆'.repeat(3-stars);
  document.getElementById('result-coins').textContent = `+${coins} 🪙`;
  document.getElementById('result-time').textContent = `Time: ${timerSeconds}s`;
  updateHUD();
  ov.classList.add('show');
  spawnCoinPop(coins);
  checkAchievements();
}

function spawnCoinPop(coins) {
  const el = document.createElement('div');
  el.className = 'coin-pop';
  el.textContent = `+${coins} 🪙`;
  el.style.left = (Math.random()*60+20)+'%';
  el.style.top = '60%';
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1100);
}

function retryLevel() {
  document.getElementById('result-overlay').classList.remove('show');
  startLevel(state.currentLevel);
}

function nextLevel() {
  document.getElementById('result-overlay').classList.remove('show');
  const next = state.currentLevel + 1;
  if(next > 500) { showToast('🏆 You completed ALL 500 levels! YOU WIN!'); showScreen('screen-worlds'); return; }
  const nextWorld = Math.ceil(next/10);
  if(nextWorld !== state.currentWorld) {
    showToast('📢 Ad (mock) – New World Unlocked!');
    state.currentWorld = nextWorld;
  }
  startLevel(next);
}

function updateHintButton() {
  const btn = document.querySelector('.hint-btn');
  if(!btn) return;
  if(hintUsedThisLevel) {
    btn.textContent = '💡 Hint Used';
    btn.style.opacity = '0.4';
    btn.style.cursor = 'not-allowed';
    btn.style.background = 'var(--card2)';
  } else {
    btn.textContent = `💡 Hint (Cost: 1)`;
    btn.style.opacity = '1';
    btn.style.cursor = 'pointer';
    btn.style.background = '';
  }
}

function useHint() {
  if(hintUsedThisLevel) {
    showToast('⚠️ Only 1 hint allowed per level!');
    return;
  }
  if(state.hints <= 0) { showToast('❌ No hints! Buy more in Shop.'); return; }
  state.hints--;
  hintUsedThisLevel = true;
  saveState();
  const level = LEVELS[state.currentLevel-1];
  const box = document.getElementById('hint-box');
  box.textContent = '💡 Hint: ' + level.hint;
  box.classList.remove('hidden');
  updateHUD();
  updateHintButton();
  showToast('💡 Hint used! (1 per level only)');
}

// ============================================================
// SOUND
// ============================================================
function playSound(type) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    if(type==='correct') {
      osc.frequency.setValueAtTime(523, ctx.currentTime);
      osc.frequency.setValueAtTime(659, ctx.currentTime+0.1);
      osc.frequency.setValueAtTime(784, ctx.currentTime+0.2);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime+0.5);
      osc.start(ctx.currentTime); osc.stop(ctx.currentTime+0.5);
    } else {
      osc.frequency.setValueAtTime(220, ctx.currentTime);
      osc.frequency.setValueAtTime(180, ctx.currentTime+0.1);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime+0.3);
      osc.start(ctx.currentTime); osc.stop(ctx.currentTime+0.3);
    }
  } catch(e){}
}

// ============================================================
// SHOP
// ============================================================
function buyHints(amount, cost) {
  if(state.coins < cost) { showToast('❌ Not enough coins!'); return; }
  state.coins -= cost;
  state.hints += amount;
  saveState();
  document.getElementById('shop-coins').textContent = state.coins;
  updateHUD();
  showToast(`✅ Got ${amount} hints!`);
}

function skipLevel() {
  if(state.coins < 30) { showToast('❌ Need 30 coins to skip!'); return; }
  state.coins -= 30;
  state.levelProgress[state.currentLevel] = { stars: 1, time: 999 };
  saveState();
  showToast('⏩ Level skipped!');
  showScreen('screen-levels');
  openWorld(state.currentWorld);
}

// ============================================================
// DAILY REWARD
// ============================================================
function checkDaily() {
  const today = new Date().toDateString();
  if(state.lastDaily !== today) {
    setTimeout(() => document.getElementById('modal-daily').classList.add('open'), 1000);
  }
}
function claimDaily() {
  state.coins += 50;
  state.lastDaily = new Date().toDateString();
  saveState();
  updateHUD();
  document.getElementById('modal-daily').classList.remove('open');
  showToast('🎁 +50 coins claimed!');
  spawnCoinPop(50);
}

// ============================================================
// LEADERBOARD
// ============================================================
const LEADERBOARD_DATA = [
  { name:'🧠 BrainKing', score:28450 },
  { name:'🔥 PuzzlePro', score:22100 },
  { name:'⚡ QuickMind', score:19800 },
  { name:'🎯 TrickMaster', score:17300 },
  { name:'💎 GeniusX', score:15900 },
  { name:'🌟 ThinkFast', score:13200 },
  { name:'🦊 FoxBrain', score:11700 },
  { name:'🚀 RocketIQ', score:9800 },
  { name:'🎮 GameWiz', score:8200 },
  { name:'👑 YOU', score: 0 },
];
function buildLeaderboard() {
  const totalStars = Object.values(state.levelProgress).reduce((s,v)=>s+(v.stars||0),0);
  LEADERBOARD_DATA[9].score = state.coins + totalStars * 10;
  const sorted = [...LEADERBOARD_DATA].sort((a,b)=>b.score-a.score);
  const list = document.getElementById('lb-list');
  list.innerHTML = '';
  const medals = ['🥇','🥈','🥉'];
  sorted.forEach((item,i)=>{
    const el = document.createElement('div');
    el.className = 'lb-item';
    el.innerHTML = `<div class="lb-rank">${medals[i]||'#'+(i+1)}</div>
      <div class="lb-name">${item.name}</div>
      <div class="lb-score">🪙 ${item.score.toLocaleString()}</div>`;
    if(item.name==='👑 YOU') el.style.borderColor='var(--accent2)';
    list.appendChild(el);
  });
}

// ============================================================


// ============================================================
// TOAST
// ============================================================
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => t.classList.remove('show'), 2500);
}

// ============================================================
// BACKGROUND MUSIC — Warm dreamy ambient puzzle theme
// Layered: pad chords + glockenspiel bells + soft sub bass
// F major pentatonic · 76 BPM · Sweet & peaceful
// ============================================================
let bgCtx = null;
let bgPlaying = false;
let bgLoopTimer = null;
let bgMusicEnabled = true;
let bgMasterGain = null;
let bgLPF = null;

const BPM  = 76;
const B    = 60 / BPM;        // 1 beat
const S    = B / 2;           // 8th note
const Q    = B;               // quarter
const DQ   = B * 1.5;         // dotted quarter
const H    = B * 2;           // half
const W    = B * 4;           // whole

// ── Glockenspiel melody ── F major pentatonic: F G A C D
// Hz: F4=349 G4=392 A4=440 C5=523 D5=587 F5=698 G5=784 A5=880 C6=1046
const MELO = [
  // Phrase 1 — gentle rise
  [523,Q],[587,Q],[698,Q],[523,H],
  [440,Q],[523,Q],[587,H],[440,S],[392,S],
  [392,Q],[440,Q],[523,Q],[587,DQ],[523,S],
  [698,H],[587,Q],[523,Q],

  // Phrase 2 — floating high
  [784,Q],[698,Q],[587,Q],[698,H],
  [523,Q],[587,Q],[698,Q],[784,H],
  [880,DQ],[784,S],[698,Q],[587,Q],
  [523,W],

  // Phrase 3 — soft descent
  [698,Q],[587,Q],[523,Q],[440,H],
  [392,Q],[440,Q],[523,H],[392,S],[349,S],
  [349,Q],[392,Q],[440,Q],[523,DQ],[440,S],
  [392,H],[349,H],

  // Phrase 4 — warm resolution
  [523,Q],[440,Q],[392,Q],[440,H],
  [523,Q],[587,Q],[523,Q],[440,DQ],[392,S],
  [349,Q],[392,Q],[440,Q],[523,DQ],[349,S],
  [523,W],
];

// ── Soft pad chords ── whole-note pads, one per bar
// F  Am  C  F  / Dm  Bb  C  F  (simplified to 2-note open voicings)
const PADS = [
  [[349,523],W], [[440,523],W], [[523,659],W], [[349,523],W],
  [[440,587],W], [[349,466],W], [[523,659],W], [[349,523],W],
  [[349,523],W], [[440,523],W], [[523,659],W], [[349,523],W],
  [[440,587],W], [[349,466],W], [[523,659],W], [[349,523],W],
];

// ── Sub bass ── very low, very soft, root notes only
const BASS = [
  [87,H],[87,H],   [110,H],[110,H],
  [131,H],[131,H], [87,H],[87,H],
  [110,H],[110,H], [87,H],[87,H],
  [131,H],[131,H], [87,H],[87,W],
];

function initBgAudio() {
  if(bgCtx) return;
  bgCtx = new (window.AudioContext || window.webkitAudioContext)();
  bgMasterGain = bgCtx.createGain();
  bgMasterGain.gain.value = 0.055; // very gentle volume

  // Warm lowpass — removes any harshness
  bgLPF = bgCtx.createBiquadFilter();
  bgLPF.type = 'lowpass';
  bgLPF.frequency.value = 2800;
  bgLPF.Q.value = 0.4;

  // Soft reverb-like delay for dreaminess
  const delay = bgCtx.createDelay(0.5);
  delay.delayTime.value = 0.32;
  const delayGain = bgCtx.createGain();
  delayGain.gain.value = 0.18;

  bgMasterGain.connect(bgLPF);
  bgLPF.connect(bgCtx.destination);
  bgMasterGain.connect(delay);
  delay.connect(delayGain);
  delayGain.connect(bgCtx.destination);
}

// Glockenspiel bell — pure sine + fast attack + long warm tail
function playGlock(freq, startT, dur) {
  const ctx = bgCtx, dest = bgMasterGain;
  const o1 = ctx.createOscillator();
  const o2 = ctx.createOscillator();
  const g  = ctx.createGain();
  o1.type = 'sine'; o1.frequency.value = freq;
  o2.type = 'sine'; o2.frequency.value = freq * 2.756; // bell overtone
  const g2 = ctx.createGain();
  g2.gain.value = 0.12;
  const atk = 0.006;
  const tail = Math.min(dur * 1.4, H * 1.2);
  g.gain.setValueAtTime(0, startT);
  g.gain.linearRampToValueAtTime(0.6, startT + atk);
  g.gain.exponentialRampToValueAtTime(0.0001, startT + atk + tail);
  o1.connect(g); g.connect(dest);
  o2.connect(g2); g2.connect(dest);
  o1.start(startT); o1.stop(startT + atk + tail + 0.05);
  o2.start(startT); o2.stop(startT + atk + tail * 0.4 + 0.02);
}

// Warm pad — two detuned sines, very slow attack/release
function playPad(freqs, startT, dur) {
  const ctx = bgCtx, dest = bgMasterGain;
  freqs.forEach((freq, fi) => {
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = 'sine';
    o.frequency.value = freq;
    const fade = Math.min(dur * 0.35, 0.6);
    g.gain.setValueAtTime(0, startT);
    g.gain.linearRampToValueAtTime(0.18, startT + fade);
    g.gain.setValueAtTime(0.18, startT + dur - fade);
    g.gain.linearRampToValueAtTime(0, startT + dur);
    o.connect(g); g.connect(dest);
    o.start(startT); o.stop(startT + dur + 0.05);
  });
}

// Sub bass — pure sine, barely there, just warmth
function playSubBass(freq, startT, dur) {
  const ctx = bgCtx, dest = bgMasterGain;
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = 'sine'; o.frequency.value = freq;
  const fade = Math.min(dur * 0.3, 0.4);
  g.gain.setValueAtTime(0, startT);
  g.gain.linearRampToValueAtTime(0.22, startT + fade);
  g.gain.setValueAtTime(0.22, startT + dur - fade);
  g.gain.linearRampToValueAtTime(0, startT + dur);
  o.connect(g); g.connect(dest);
  o.start(startT); o.stop(startT + dur + 0.05);
}

function scheduleBrainOutLoop() {
  if(!bgPlaying || !bgMusicEnabled) return;
  const now = bgCtx.currentTime + 0.05;

  // Melody bells
  let t = now;
  MELO.forEach(([freq, dur]) => { playGlock(freq, t, dur); t += dur; });
  const loopDur = t - now;

  // Pad chords
  let pt = now;
  PADS.forEach(([freqs, dur]) => { playPad(freqs, pt, dur); pt += dur; });

  // Sub bass
  let bt = now;
  BASS.forEach(([freq, dur]) => { playSubBass(freq, bt, dur); bt += dur; });

  bgLoopTimer = setTimeout(() => {
    if(bgPlaying && bgMusicEnabled) scheduleBrainOutLoop();
  }, (loopDur - 0.15) * 1000);
}

function playBgMusic() {
  if(!bgMusicEnabled || bgPlaying) return;
  initBgAudio();
  if(bgCtx.state === 'suspended') bgCtx.resume();
  bgPlaying = true;
  scheduleBrainOutLoop();
}

function stopBgMusic() {
  bgPlaying = false;
  clearTimeout(bgLoopTimer);
}

function toggleBgMusic() {
  bgMusicEnabled = !bgMusicEnabled;
  const btn = document.getElementById('music-toggle-btn');
  if(bgMusicEnabled) {
    btn.textContent = '🎵 Music: ON';
    btn.style.borderColor = 'var(--accent3)';
    btn.style.color = 'var(--accent3)';
    playBgMusic();
  } else {
    btn.textContent = '🔇 Music: OFF';
    btn.style.borderColor = 'var(--muted)';
    btn.style.color = 'var(--muted)';
    stopBgMusic();
  }
}

// ============================================================
// SPLASH LOADING BAR → then music starts instantly on TAP
// ============================================================

// Animate loading bar on page load
(function runLoadingBar() {
  let pct = 0;
  const bar = document.getElementById('splash-bar');
  const txt = document.getElementById('splash-loading-txt');
  const loadingDiv = document.getElementById('splash-loading');
  const btn = document.getElementById('splash-btn');
  const note = document.getElementById('splash-note');
  const brain = document.getElementById('splash-brain');

  const labels = ['Loading brain cells...','Mixing puzzles...','Calibrating tricks...','Ready!'];
  let labelIdx = 0;

  const interval = setInterval(() => {
    // Speed up near end
    const step = pct < 60 ? 1.8 : pct < 85 ? 1.2 : 0.6;
    pct = Math.min(100, pct + step);
    bar.style.width = pct + '%';

    // Update label text at checkpoints
    if(pct > 30 && labelIdx === 0) { txt.textContent = labels[1]; labelIdx = 1; }
    if(pct > 65 && labelIdx === 1) { txt.textContent = labels[2]; labelIdx = 2; }
    if(pct > 90 && labelIdx === 2) { txt.textContent = labels[3]; labelIdx = 3; brain.style.animation = 'none'; brain.textContent = '🧠'; }

    if(pct >= 100) {
      clearInterval(interval);
      // Hide loading bar, show TAP button with bounce-in
      setTimeout(() => {
        loadingDiv.style.display = 'none';
        btn.style.display = 'block';
        note.style.display = 'block';
        btn.style.animation = 'tapPulse 1.4s ease-in-out infinite';
      }, 200);
    }
  }, 40);
})();

function startGame() {
  // ✅ Start music IMMEDIATELY on this user gesture (bypasses browser autoplay block)
  initBgAudio();
  if(bgCtx.state === 'suspended') bgCtx.resume();
  bgPlaying = true;
  musicStarted = true;
  scheduleBrainOutLoop();

  // Animate splash out
  const splash = document.getElementById('splash');
  splash.classList.add('hide');
  setTimeout(() => { splash.style.display = 'none'; }, 650);
}

// Fallback: also start on any tap if splash already dismissed
let musicStarted = false;
function tryStartMusic() {
  if(!musicStarted && bgMusicEnabled) {
    musicStarted = true;
    initBgAudio();
    if(bgCtx && bgCtx.state === 'suspended') bgCtx.resume();
    playBgMusic();
  }
}
document.addEventListener('click', tryStartMusic);
document.addEventListener('touchstart', tryStartMusic);

// ============================================================
// ACHIEVEMENTS
// ============================================================
const ACHIEVEMENTS = [
  { id:'first_blood',  icon:'🎯', name:'First Win!',        desc:'Complete your first level',         check: s => Object.keys(s.levelProgress).length >= 1 },
  { id:'ten_levels',   icon:'🔟', name:'Ten Down!',         desc:'Complete 10 levels',                check: s => Object.keys(s.levelProgress).length >= 10 },
  { id:'world1',       icon:'🌍', name:'World Conqueror',   desc:'Complete all of World 1',           check: s => [1,2,3,4,5,6,7,8,9,10].every(l=>s.levelProgress[l]) },
  { id:'speedster',    icon:'⚡', name:'Speed Demon',       desc:'Get 3 stars on 5 levels',           check: s => Object.values(s.levelProgress).filter(p=>p.stars===3).length >= 5 },
  { id:'rich',         icon:'💰', name:'Coin Collector',    desc:'Collect 500 coins',                 check: s => s.coins >= 500 },
  { id:'hintless',     icon:'🧠', name:'No Hints Needed',   desc:'Complete 10 levels without hints',  check: s => Object.keys(s.levelProgress).length >= 10 },
  { id:'half',         icon:'🏃', name:'Halfway There!',    desc:'Reach level 150',                   check: s => Object.keys(s.levelProgress).map(Number).some(l=>l>=150) },
  { id:'master',       icon:'👑', name:'Brain Master',      desc:'Complete 50 levels',                check: s => Object.keys(s.levelProgress).length >= 50 },
  { id:'daily',        icon:'📅', name:'Daily Player',      desc:'Claim a daily reward',              check: s => !!s.lastDaily },
  { id:'allworld',     icon:'🌟', name:'Legend',            desc:'Complete 100 levels',              check: s => Object.keys(s.levelProgress).length >= 100 },
];

function checkAchievements() {
  ACHIEVEMENTS.forEach(a => {
    if(!state.achievements[a.id] && a.check(state)) {
      state.achievements[a.id] = true;
      saveState();
      showAchievementPopup(a);
    }
  });
}

function showAchievementPopup(a) {
  const popup = document.getElementById('ach-popup');
  document.getElementById('ach-popup-icon').textContent = a.icon;
  document.getElementById('ach-popup-name').textContent = a.name;
  popup.classList.add('show');
  setTimeout(() => popup.classList.remove('show'), 3200);
}

function buildAchievementsScreen() {
  const grid = document.getElementById('ach-grid');
  if(!grid) return;
  grid.innerHTML = '';
  ACHIEVEMENTS.forEach(a => {
    const unlocked = !!state.achievements[a.id];
    const item = document.createElement('div');
    item.className = 'ach-item' + (unlocked ? ' unlocked' : '');
    item.innerHTML = `
      <div class="ach-icon">${unlocked ? a.icon : '🔒'}</div>
      <div class="ach-info">
        <div class="ach-name">${unlocked ? a.name : '???'}</div>
        <div class="ach-desc">${unlocked ? a.desc : 'Keep playing to unlock!'}</div>
      </div>
      ${unlocked ? '<span class="ach-badge">✓ Unlocked</span>' : '<span class="ach-locked-badge">Locked</span>'}
    `;
    grid.appendChild(item);
  });
}

// achievement hooks integrated directly

// ============================================================
// EXTRA PUZZLE POOL — drawing, tilt, math equation levels
// ============================================================
const EXTRA_PUZZLES = [
  // DRAWING
  { q:"Draw a circle on the canvas!", tag:"DRAW ✏️", type:"draw", drawShape:"circle", drawInstruction:"Draw a circle on the canvas!", ans:"drawn", hint:"Just make a round shape!" },
  { q:"Draw a square — 4 equal sides!", tag:"DRAW ✏️", type:"draw", drawShape:"square", drawInstruction:"Draw a square!", ans:"drawn", hint:"Four equal sides." },
  { q:"Draw a triangle!", tag:"DRAW ✏️", type:"draw", drawShape:"triangle", drawInstruction:"Draw a triangle with 3 sides!", ans:"drawn", hint:"Three corners, three sides." },
  { q:"Draw a smiley face 😊", tag:"DRAW ✏️", type:"draw", drawShape:null, drawInstruction:"Draw a happy smiley face!", ans:"drawn", hint:"Two eyes and a smile!" },
  { q:"Draw a star ⭐", tag:"DRAW ✏️", type:"draw", drawShape:null, drawInstruction:"Draw a 5-pointed star!", ans:"drawn", hint:"5 pointed tips." },
  // TILT
  { q:"Tilt your phone to the LEFT!", tag:"TILT 📱", type:"tilt", tiltDir:"left", tiltInstruction:"Tilt LEFT ← until it registers!", hint:"Tilt the phone left side down." },
  { q:"Tilt your phone to the RIGHT!", tag:"TILT 📱", type:"tilt", tiltDir:"right", tiltInstruction:"Tilt RIGHT → until it registers!", hint:"Tilt the phone right side down." },
  { q:"Lay your phone FACE UP flat!", tag:"TILT 📱", type:"tilt", tiltDir:"forward", tiltInstruction:"Lay phone flat face up!", hint:"Put it flat on the table." },
  { q:"Tilt your phone FORWARD away from you!", tag:"TILT 📱", type:"tilt", tiltDir:"any", tiltInstruction:"Tilt the phone forward!", hint:"Tip it like you're reading." },
  // MATH EQUATIONS
  { q:"What is the answer?", tag:"MATH 🔢", type:"math", equation:"15 + 27 = ?", ans:"42", hint:"15+20=35, 35+7=42" },
  { q:"What is the answer?", tag:"MATH 🔢", type:"math", equation:"8 × 9 = ?", ans:"72", hint:"8×9, think 8×10=80, minus 8" },
  { q:"What is the answer?", tag:"MATH 🔢", type:"math", equation:"100 - 37 = ?", ans:"63", hint:"100-40=60, +3=63" },
  { q:"What is the answer?", tag:"MATH 🔢", type:"math", equation:"144 ÷ 12 = ?", ans:"12", hint:"12×12=144" },
  { q:"What is the answer?", tag:"MATH 🔢", type:"math", equation:"(6 + 4) × 5 = ?", ans:"50", hint:"Brackets first: 6+4=10, then ×5" },
  { q:"What is the answer?", tag:"MATH 🔢", type:"math", equation:"3³ = ?", ans:"27", hint:"3×3×3=27" },
  { q:"What is the answer?", tag:"MATH 🔢", type:"math", equation:"√81 = ?", ans:"9", hint:"9×9=81" },
  { q:"What is the answer?", tag:"MATH 🔢", type:"math", equation:"25% of 80 = ?", ans:"20", hint:"80÷4=20" },
  { q:"What is the answer?", tag:"MATH 🔢", type:"math", equation:"2⁸ = ?", ans:"256", hint:"128×2=256" },
  { q:"What is the answer?", tag:"MATH 🔢", type:"math", equation:"7 × 8 - 6 = ?", ans:"50", hint:"56-6=50" },
];

// Expand LEVELS to 500 by appending extra puzzles
for(let i = 300; i < 500; i++){
  const extraIdx = (i - 300) % EXTRA_PUZZLES.length;
  const base = EXTRA_PUZZLES[extraIdx];
  LEVELS.push({...base, levelNum: i+1, worldNum: Math.floor(i/10)+1});
}

// Update world names for worlds 31-50
const EXTRA_WORLD_NAMES = [
  'Drawing','Tilting','Equations','Mixed Masters','Brain Storm',
  'Logic Bomb','Math Wizard','Tilt Master','Art Attack','THE FINALE'
];
for(let i=0;i<10;i++) WORLD_NAMES.push(EXTRA_WORLD_NAMES[i]);

// ============================================================
// INIT
// ============================================================
loadState();
checkDaily();
updateHUD();