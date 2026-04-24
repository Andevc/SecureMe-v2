// ══════════════════════════════════════════════════════════
// DATA
// ══════════════════════════════════════════════════════════
const QUESTIONS = [
  {id:1,q:"¿Tu cuenta de Instagram (o red social principal) es pública?",risk:15,factor:"instagram_publico"},
  {id:2,q:"¿Publicas tu ubicación en redes sociales en tiempo real o con frecuencia?",risk:15,factor:"ubicacion_publicada"},
  {id:3,q:"¿Tu número de teléfono está visible en alguna red social o perfil público?",risk:15,factor:"telefono_visible"},
  {id:4,q:"¿Usas el mismo nombre de usuario en varias redes sociales?",risk:10,factor:"mismo_username"},
  {id:5,q:"¿Tu perfil de Facebook es público o tiene mucha info visible?",risk:10,factor:"facebook_publico"},
  {id:6,q:"¿Has publicado fotos donde se vea tu casa, dirección o lugar de trabajo?",risk:10,factor:"fotos_sin_filtro"},
  {id:7,q:"¿Aceptas solicitudes de amistad/seguimiento de personas que no conocés?",risk:5,factor:"acepta_desconocidos"},
  {id:8,q:"¿Tu correo electrónico aparece públicamente en internet o redes sociales?",risk:10,factor:"email_visible"},
  {id:9,q:"¿Has compartido tu ubicación exacta en publicaciones o comentarios recientes?",risk:5,factor:"ubicacion_publicada"},
  {id:10,q:"¿Subís fotos sin eliminar los metadatos de ubicación GPS?",risk:5,factor:"metadatos_fotos"},
];

const RECS = {
  instagram_publico:{id:'ig',icon:'🔒',title:'Cambia tu Instagram a privado',desc:'Tu perfil público permite que cualquiera vea fotos, ubicaciones y actividad.',urgency:'alta',steps:['Ve a tu perfil → Menú (☰) → Configuración','Privacidad → Privacidad de la cuenta','Activa "Cuenta privada"','Revisa quién te sigue y elimina desconocidos']},
  ubicacion_publicada:{id:'loc',icon:'📍',title:'Deja de publicar ubicación en tiempo real',desc:'Compartir dónde estás permite rastrear tu rutina, domicilio y trabajo.',urgency:'alta',steps:['No etiquetes ubicaciones en posts e historias','Desactiva "Añadir ubicación" por defecto','Publica ubicaciones SOLO después de irte del lugar','Revisa el historial de ubicaciones en Google Maps']},
  telefono_visible:{id:'tel',icon:'📱',title:'Oculta tu número de teléfono',desc:'Tu teléfono visible puede usarse para acosarte o venderse en bases de datos filtradas.',urgency:'alta',steps:['Facebook: Configuración → Info → Editar teléfono → Solo yo','Instagram: no publiques tu número en la bio','WhatsApp: ajusta quién ve tu número en Privacidad','Usa un número secundario para registros en apps']},
  mismo_username:{id:'user',icon:'🔄',title:'Usa usernames diferentes en cada red',desc:'El mismo @usuario en todas las plataformas facilita encontrarte con una sola búsqueda.',urgency:'media',steps:['Crea nombres únicos para cada red social','Evita tu nombre real completo como username','No uses variaciones obvias (maria, maria_, maria.r)','Herramienta: namechk.com para ver tu exposición']},
  facebook_publico:{id:'fb',icon:'👤',title:'Configura la privacidad de Facebook',desc:'Facebook tiene la mayor cantidad de información personal expuesta de todas las redes.',urgency:'media',steps:['Configuración → Privacidad → Ver más configuraciones','¿Quién puede ver tus publicaciones futuras? → Amigos','Revisa la sección "Comprobación de privacidad"','Elimina apps de terceros que tengan acceso a tu cuenta']},
  fotos_sin_filtro:{id:'foto',icon:'🖼️',title:'Revisá qué revelan tus fotos',desc:'Las fotos pueden revelar tu casa, escuela, matrículas de autos y lugares frecuentes.',urgency:'media',steps:['Antes de subir, revisá el fondo de la imagen','Tapá matrículas, números de casa, nombres de calles','Evitá fotos frente a lugares reconocibles cerca de tu casa','Usá la herramienta de difuminado de Instagram antes de publicar']},
  acepta_desconocidos:{id:'acc',icon:'👥',title:'Sé selectivo con quién te sigue',desc:'Seguidores desconocidos amplían tu superficie de exposición sin que lo sepas.',urgency:'baja',steps:['Revisa tu lista de seguidores y elimina cuentas sospechosas','Activa "Aprobar seguidores" en Instagram','En Facebook, limita a amigos de amigos las solicitudes','Desconfía de perfiles sin foto, sin posts o con pocas conexiones']},
  email_visible:{id:'mail',icon:'✉️',title:'Oculta tu email de perfiles públicos',desc:'Tu email puede usarse para phishing, spam y búsqueda en bases de datos filtradas.',urgency:'media',steps:['Eliminá tu email de biografías de redes sociales','Usá emails secundarios para redes (ej: ProtonMail)','Verificá tu email en haveibeenpwned.com','Nunca publiques tu email en comentarios o posts públicos']},
  metadatos_fotos:{id:'meta',icon:'🗺️',title:'Eliminá metadatos GPS de tus fotos',desc:'Las fotos guardan la ubicación exacta donde fueron tomadas.',urgency:'alta',steps:['iPhone: Ajustes → Privacidad → Servicios de ubicación → Cámara → Nunca','Android: Cámara → Ajustes → Desactivá "Guardar ubicación"','Para fotos antiguas: usá la app "Metapho" o "Photo Exif Editor"','Antes de enviar fotos por WhatsApp, eliminá los metadatos']}
};

const GUIDE_DATA = [
  {cat:'urgent',icon:'🔑',title:'Protege tus contraseñas',text:'Usá contraseñas únicas y largas para cada cuenta. Activá el gestor de contraseñas y nunca las compartas.',tags:['Cuentas','Acceso']},
  {cat:'urgent',icon:'🚨',title:'Denuncia el ciberacoso',text:'Si recibís mensajes amenazantes, documentá todo (capturas) y reportalo a la plataforma y autoridades.',tags:['Acoso','Denuncia']},
  {cat:'urgent',icon:'🔞',title:'Nunca compartas contenido íntimo',text:'No envíes fotos íntimas por plataformas digitales. El sexting puede usarse para sextorsión.',tags:['Privacidad','Sextorsión']},
  {cat:'urgent',icon:'🕵️',title:'Revisá tu exposición pública',text:'Auditá qué información tuya es visible. Nombre, foto, ubicación y teléfono accesibles crean un perfil de riesgo.',tags:['Exposición','Datos']},
  {cat:'urgent',icon:'🚫',title:'Bloqueá y reportá agresores',text:'No respondas provocaciones. Bloqueá de inmediato a quienes te agreden y usá las herramientas de reporte.',tags:['Bloqueo','Reporte']},
  {cat:'urgent',icon:'🔐',title:'Activá 2FA en todas tus cuentas',text:'La autenticación de dos factores evita accesos no autorizados incluso si obtienen tu contraseña.',tags:['2FA','Seguridad']},
  {cat:'urgent',icon:'📡',title:'Desactivá el seguimiento de ubicación',text:'Apagá el GPS en fotos y publicaciones. No compartás tu ubicación en tiempo real.',tags:['Ubicación','Stalking']},
  {cat:'important',icon:'🧠',title:'Cuidá tu bienestar digital',text:'El estrés por violencia digital es real. Establecé límites de tiempo en redes y buscá apoyo si es necesario.',tags:['Bienestar','Mental']},
  {cat:'important',icon:'📲',title:'Revisá permisos de apps',text:'Verificá qué apps tienen acceso a tu cámara, micrófono y contactos. Revocá los innecesarios.',tags:['Permisos','Apps']},
  {cat:'important',icon:'🚷',title:'No difundas contenido violento',text:'Compartir videos de agresiones amplifica el daño. Denuncialo en lugar de redistribuirlo.',tags:['Contenido','Difusión']},
  {cat:'important',icon:'⚖️',title:'Conocé tus derechos digitales',text:'Tenés derecho a solicitar eliminación de tus datos y a protección contra el doxing según las leyes locales.',tags:['Derechos','Legal']},
  {cat:'important',icon:'🤖',title:'Cuidado con los deepfakes',text:'Los videos manipulados con IA pueden usarse para difamar. Verificá siempre la fuente de videos virales.',tags:['Deepfake','IA']},
  {cat:'important',icon:'💚',title:'Practicá la empatía digital',text:'Antes de publicar algo sobre otra persona, preguntate: ¿causaría daño real? El anonimato no justifica el maltrato.',tags:['Empatía','Conducta']},
  {cat:'important',icon:'👶',title:'Identificá el grooming',text:'El grooming es la manipulación online para obtener acceso a menores. Educá a niños sobre cómo reconocerlo.',tags:['Grooming','Menores']},
  {cat:'important',icon:'🤝',title:'No te aislés ante el acoso',text:'Si sos víctima de violencia digital, buscá apoyo en personas de confianza. El aislamiento empeora el impacto.',tags:['Apoyo','Víctimas']},
  {cat:'practice',icon:'🛡️',title:'Aprendé autodefensa digital',text:'Tomá cursos básicos de ciberseguridad. Conocer las amenazas te permite anticiparlas.',tags:['Educación','Ciberseguridad']},
  {cat:'practice',icon:'👀',title:'Sé un testigo activo',text:'Si presenciás acoso digital hacia otra persona, apoyá a la víctima y reportá el contenido dañino.',tags:['Testigo','Comunidad']},
  {cat:'practice',icon:'📸',title:'Pedí consentimiento para publicar fotos',text:'Siempre solicitá permiso antes de publicar fotos donde aparezcan otras personas.',tags:['Consentimiento','Fotos']},
  {cat:'practice',icon:'💑',title:'Construí relaciones digitales sanas',text:'Las relaciones saludables se basan en respeto y consentimiento. Desconfiá de quien te presiona para compartir datos.',tags:['Relaciones','Respeto']},
  {cat:'practice',icon:'❌',title:'Decí NO al discurso de odio',text:'No participés en discursos de odio ni campañas de linchamiento digital. El cambio empieza en vos.',tags:['Odio','Acción']},
];

// ══════════════════════════════════════════════════════════
// STATE
// ══════════════════════════════════════════════════════════
let state = {
  answers:{},
  score:null,
  riskLevel:null,
  riskFactors:[],
  currentQ:0,
  testDone:false
};

function loadState(){
  try{const s=localStorage.getItem('secureme_v2');if(s){state={...state,...JSON.parse(s)}}}catch(e){}
}
function saveState(){
  try{localStorage.setItem('secureme_v2',JSON.stringify(state))}catch(e){}
}
loadState();

// ══════════════════════════════════════════════════════════
// NAVIGATION
// ══════════════════════════════════════════════════════════
function showPage(id){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(l=>l.classList.remove('active'));
  document.getElementById('page-'+id).classList.add('active');
  const navEl = document.getElementById('nav-'+id);
  if(navEl) navEl.classList.add('active');
  closeMobileMenu();
  window.scrollTo(0,0);

  if(id==='test') initTest();
  if(id==='results') renderResults();
  if(id==='guide') renderGuide();
  if(id==='chat') initChat();
  if(id==='osint') initOSINT();
}

function closeMobileMenu(){
  const nl = document.getElementById('navLinks');
  if(!nl) return;
  if(window.innerWidth <= 768){
    nl.style.display = 'none';
  }
  nl.dataset.open = 'false';
}

function toggleMobileMenu(){
  if(window.innerWidth > 768) return;
  const nl = document.getElementById('navLinks');
  const nav = document.getElementById('navbar');
  const isOpen = nl.dataset.open === 'true';
  if(isOpen){
    closeMobileMenu();
    return;
  }

  nl.style.display = 'flex';
  nl.style.flexDirection = 'column';
  nl.style.position = 'absolute';
  nl.style.top = (nav ? nav.offsetHeight : 60) + 'px';
  nl.style.left = '0';
  nl.style.right = '0';
  nl.style.background = 'var(--bg)';
  nl.style.padding = '12px 14px';
  nl.style.gap = '8px';
  nl.style.borderBottom = '1px solid var(--border)';
  nl.style.zIndex = '999';
  nl.dataset.open = 'true';
}

window.addEventListener('resize',()=>{
  const nl = document.getElementById('navLinks');
  if(!nl) return;
  if(window.innerWidth > 768){
    nl.style.display = 'flex';
    nl.style.flexDirection = '';
    nl.style.position = '';
    nl.style.top = '';
    nl.style.left = '';
    nl.style.right = '';
    nl.style.background = '';
    nl.style.padding = '';
    nl.style.gap = '';
    nl.style.borderBottom = '';
    nl.style.zIndex = '';
    nl.dataset.open = 'false';
  } else if(nl.dataset.open !== 'true') {
    nl.style.display = 'none';
  }
});

// ══════════════════════════════════════════════════════════
// TEST
// ══════════════════════════════════════════════════════════
function initTest(){
  if(state.testDone && state.score !== null){
    renderTestResult();
    return;
  }
  state.currentQ = state.currentQ || 0;
  renderQuestion();
  renderDots();
}

function renderQuestion(){
  const wrap = document.getElementById('questionWrap');
  const idx = state.currentQ;
  const q = QUESTIONS[idx];
  const pct = Math.round((idx/QUESTIONS.length)*100);
  document.getElementById('progressBar').style.width = pct+'%';
  document.getElementById('progressText').textContent = idx+'/'+QUESTIONS.length;

  const ans = state.answers[q.id];
  const isYes = ans === q.risk;
  const isNo = ans === 0;

  wrap.innerHTML = `
    <div class="q-card" key="${q.id}">
      <div class="q-num">PREGUNTA ${String(idx+1).padStart(2,'0')} DE ${QUESTIONS.length}</div>
      <div class="q-risk-chip">RIESGO +${q.risk} pts</div>
      <div class="q-text">${q.q}</div>
      <div class="q-options">
        <button class="q-btn ${isYes?'selected-yes':''}" onclick="answerQ(${q.risk},${q.id})">
          <span class="q-radio">${isYes?'<svg width="10" height="10" viewBox="0 0 10 10"><path d="M2 5l2.5 2.5L8 3" stroke="white" stroke-width="1.8" stroke-linecap="round" fill="none"/></svg>':''}</span>
          <div><div class="q-option-label" style="color:${isYes?'var(--accent2)':'var(--text)'}">Sí</div><div class="q-option-hint">Aumenta mi exposición (+${q.risk} pts)</div></div>
        </button>
        <button class="q-btn ${isNo?'selected-no':''}" onclick="answerQ(0,${q.id})">
          <span class="q-radio">${isNo?'<svg width="10" height="10" viewBox="0 0 10 10"><path d="M2 5l2.5 2.5L8 3" stroke="#000" stroke-width="1.8" stroke-linecap="round" fill="none"/></svg>':''}</span>
          <div><div class="q-option-label" style="color:${isNo?'var(--accent)':'var(--text)'}">No</div><div class="q-option-hint">No suma riesgo (0 pts)</div></div>
        </button>
      </div>
      <div class="q-nav">
        <button class="q-back-btn" onclick="goBackQ()" ${idx===0?'disabled':''}>← Anterior</button>
        ${ans!==undefined && idx<QUESTIONS.length-1?`<button class="btn-primary" style="padding:10px 24px;font-size:13px" onclick="nextQ()">Siguiente →</button>`:''}
        ${ans!==undefined && idx===QUESTIONS.length-1?`<button class="btn-primary" style="padding:10px 24px;font-size:13px" onclick="finishTest()">Ver resultado →</button>`:''}
      </div>
    </div>
  `;
  renderDots();
}

function answerQ(val, qid){
  state.answers[qid] = val;
  saveState();
  const q = QUESTIONS[state.currentQ];
  setTimeout(()=>{
    if(state.currentQ < QUESTIONS.length-1){
      state.currentQ++;
      renderQuestion();
    } else {
      renderQuestion();
    }
  }, 350);
}

function nextQ(){
  if(state.currentQ < QUESTIONS.length-1){
    state.currentQ++;
    renderQuestion();
  }
}

function goBackQ(){
  if(state.currentQ > 0){
    state.currentQ--;
    renderQuestion();
  }
}

function finishTest(){
  let score = 0;
  const factors = [];
  QUESTIONS.forEach(q=>{
    const a = state.answers[q.id];
    if(a > 0){score += a; factors.push(q.factor);}
  });
  state.score = score;
  state.riskFactors = [...new Set(factors)];
  state.riskLevel = score>=75?'critical':score>=50?'high':score>=25?'medium':'low';
  state.testDone = true;
  saveState();
  renderTestResult();
}

function renderTestResult(){
  const wrap = document.getElementById('questionWrap');
  document.getElementById('progressBar').style.width='100%';
  document.getElementById('progressText').textContent='10/10';

  const s = state.score;
  const rl = state.riskLevel;
  const color = rl==='critical'||rl==='high'?'var(--accent2)':rl==='medium'?'var(--accent4)':'var(--accent)';
  const label = rl==='critical'?'CRÍTICO':rl==='high'?'ALTO':rl==='medium'?'MEDIO':'BAJO';
  const desc = s>=75?'Tu exposición digital es muy alta. Tomá medidas urgentes de inmediato.'
    :s>=50?'Tenés varios factores de riesgo que deberías revisar esta semana.'
    :s>=25?'Tu exposición es moderada. Hay margen importante para mejorar.'
    :'¡Excelente! Tu huella digital está bien controlada.';

  let breakdownHTML = '';
  QUESTIONS.forEach(q=>{
    const a = state.answers[q.id];
    const pts = a > 0 ? `+${a}` : '✓ 0';
    const c = a > 0 ? 'var(--accent2)' : 'var(--accent)';
    const qShort = q.q.length>52?q.q.slice(0,52)+'…':q.q;
    breakdownHTML += `<div class="breakdown-item"><span class="breakdown-q">${qShort}</span><span class="breakdown-score" style="color:${c}">${pts}</span></div>`;
  });

  wrap.innerHTML = `
    <div class="result-card">
      <div class="result-badge" style="color:${color};border-color:${color}40;background:${color}12">
        Nivel de riesgo — ${label}
      </div>
      <div class="score-circle-wrap">
        <div class="score-circle" style="border-color:${color};box-shadow:0 0 40px ${color}44">
          <span class="score-big" style="color:${color}">${s}</span>
          <span class="score-slash">/ 100</span>
        </div>
      </div>
      <p class="result-desc">${desc}</p>
      <div class="breakdown">${breakdownHTML}</div>
      <div class="result-btns">
        <button class="btn-primary" onclick="showPage('results')">Ver análisis completo →</button>
        <button class="btn-secondary" onclick="resetTest()">Repetir test</button>
      </div>
    </div>
  `;
  // Hide dots
  document.getElementById('qDots').innerHTML='';
}

function resetTest(){
  state.answers={};state.score=null;state.riskLevel=null;state.riskFactors=[];state.currentQ=0;state.testDone=false;
  saveState();
  initTest();
}

function renderDots(){
  const dots = document.getElementById('qDots');
  if(!dots) return;
  let html='';
  QUESTIONS.forEach((q,i)=>{
    const a = state.answers[q.id];
    const isCur = i===state.currentQ;
    const isDone = a !== undefined;
    const bg = isCur?'var(--text)':isDone?(a>0?'var(--accent2)':'var(--accent)'):'var(--surface2)';
    const w = isCur?'20px':'6px';
    html+=`<span class="q-dot" style="background:${bg};width:${w};opacity:${isCur?1:0.7}"></span>`;
  });
  dots.innerHTML=html;
}

// ══════════════════════════════════════════════════════════
// RESULTS
// ══════════════════════════════════════════════════════════
function renderResults(){
  const content = document.getElementById('resultsContent');
  if(!state.testDone || state.score===null){
    content.innerHTML=`<div class="empty-state">No hay resultados todavía.<br>Primero <a href="#" onclick="showPage('test');return false">completá el test</a>.</div>`;
    return;
  }

  const s = state.score;
  const rl = state.riskLevel;
  const color = rl==='critical'||rl==='high'?'#ff3355':rl==='medium'?'#ffcc00':'#00ff88';
  const label = rl==='critical'?'CRÍTICO':rl==='high'?'ALTO':rl==='medium'?'MEDIO':'BAJO';

  // GAUGE
  const deg = Math.round((s/100)*180);
  const rad = (deg-180)*(Math.PI/180);
  const cx=140,cy=140,r=110;
  const ex=cx+r*Math.cos(rad),ey=cy+r*Math.sin(rad);

  // RADAR DATA
  const cats = [
    {label:'Redes Sociales',val:calcCat([1,5])},
    {label:'Ubicación',val:calcCat([2,9])},
    {label:'Datos Personales',val:calcCat([3,8])},
    {label:'Huella Digital',val:calcCat([4])},
    {label:'Fotos',val:calcCat([6,10])},
    {label:'Contactos',val:calcCat([7])}
  ];

  // RECS
  const recs = state.riskFactors.map(f=>RECS[f]).filter(Boolean).sort((a,b)=>{
    const o={alta:1,media:2,baja:3};return o[a.urgency]-o[b.urgency];
  });

  const urgCnt = recs.filter(r=>r.urgency==='alta').length;
  const medCnt = recs.filter(r=>r.urgency==='media').length;
  const lowCnt = recs.filter(r=>r.urgency==='baja').length;

  let recsHTML = recs.length===0
    ? `<div style="padding:40px;text-align:center;font-family:var(--mono);color:var(--accent);font-size:14px">🎉 ¡Sin factores de riesgo detectados! Mantén estos buenos hábitos.</div>`
    : recs.map((r,i)=>`
      <div>
        <div class="rec-row" onclick="toggleRec('rec${i}')">
          <div class="rec-icon">${r.icon}</div>
          <div class="rec-badge badge-${r.urgency}">${r.urgency==='alta'?'URGENTE':r.urgency==='media'?'IMPORTANTE':'RECOMENDADO'}</div>
          <div><div class="rec-title">${r.title}</div><div class="rec-desc">${r.desc}</div></div>
          <button class="rec-expand-btn" onclick="event.stopPropagation();toggleRec('rec${i}')">Ver pasos ▶</button>
        </div>
        <div class="rec-steps" id="rec${i}">
          <div class="rec-steps-title">📝 PASOS A SEGUIR</div>
          ${r.steps.map(s=>`<div class="rec-step">${s}</div>`).join('')}
        </div>
      </div>
    `).join('');

  // SHARE TEXT
  const shareText = `🛡️ Hice el test de SecureMe y obtuve ${s}/100 (riesgo ${label}). ¿Sabés qué tan expuesto estás digitalmente? Averigualo en secureme.app #PrivacidadDigital #SecureMe`;

  content.innerHTML = `
    <!-- GAUGE -->
    <div class="gauge-wrap">
      <div class="gauge-container">
        <svg class="gauge-svg" viewBox="0 0 280 160">
          <defs>
            <linearGradient id="gaugeBg" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style="stop-color:#00ff88"/>
              <stop offset="50%" style="stop-color:#ffcc00"/>
              <stop offset="100%" style="stop-color:#ff3355"/>
            </linearGradient>
          </defs>
          <!-- Track -->
          <path d="M 30 140 A 110 110 0 0 1 250 140" stroke="rgba(255,255,255,0.08)" stroke-width="12" fill="none" stroke-linecap="round"/>
          <!-- Fill -->
          <path d="M 30 140 A 110 110 0 0 1 250 140" stroke="url(#gaugeBg)" stroke-width="12" fill="none" stroke-linecap="round"
            stroke-dasharray="${deg/180*345} 345" id="gaugeArc"/>
          <!-- Needle -->
          <line x1="140" y1="140" x2="${ex}" y2="${ey}" stroke="${color}" stroke-width="3" stroke-linecap="round" id="gaugeNeedle"/>
          <circle cx="140" cy="140" r="6" fill="${color}" id="gaugeDot"/>
          <!-- Labels -->
          <text x="30" y="158" fill="rgba(255,255,255,0.3)" font-size="11" font-family="JetBrains Mono">0</text>
          <text x="130" y="26" fill="rgba(255,255,255,0.3)" font-size="11" font-family="JetBrains Mono" text-anchor="middle">50</text>
          <text x="248" y="158" fill="rgba(255,255,255,0.3)" font-size="11" font-family="JetBrains Mono">100</text>
        </svg>
        <div class="gauge-score-text">
          <div class="gauge-num" style="color:${color}">${s}</div>
          <div class="gauge-label">Riesgo ${label}</div>
        </div>
      </div>
    </div>

    <!-- CHARTS -->
    <div class="chart-section">
      <div class="chart-card">
        <div class="chart-title">FACTORES DE RIESGO POR CATEGORÍA</div>
        <div class="radar-wrap">
          ${renderRadar(cats,color)}
        </div>
      </div>
      <div class="chart-card">
        <div class="chart-title">DISTRIBUCIÓN DE RIESGO</div>
        <div class="bar-list">
          ${cats.map(c=>`
            <div class="bar-item">
              <div class="bar-label">
                <span class="bar-name">${c.label}</span>
                <span class="bar-val" style="color:${c.val>=70?'var(--accent2)':c.val>=40?'var(--accent4)':'var(--accent)'}">${c.val}%</span>
              </div>
              <div class="bar-track"><div class="bar-fill" style="width:${c.val}%;background:${c.val>=70?'var(--accent2)':c.val>=40?'var(--accent4)':'var(--accent)'}"></div></div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>

    <!-- RECS TABLE -->
    <div class="rec-table" style="margin:0 auto 40px;max-width:1100px">
      <div class="rec-table-header">
        <div class="rec-th">Tipo</div>
        <div class="rec-th">Urgencia</div>
        <div class="rec-th">Recomendación</div>
        <div class="rec-th">Acción</div>
      </div>
      <div>${recsHTML}</div>
      <div class="rec-footer">
        📊 Total: <strong>${recs.length} recomendaciones</strong> &nbsp;•&nbsp;
        Urgentes: <strong style="color:var(--accent2)">${urgCnt}</strong> &nbsp;•&nbsp;
        Importantes: <strong style="color:var(--accent4)">${medCnt}</strong> &nbsp;•&nbsp;
        Recomendadas: <strong style="color:var(--accent3)">${lowCnt}</strong>
      </div>
    </div>

    <!-- SHARE -->
    <div class="share-section">
      <div class="share-title">COMPARTÍ TU RESULTADO</div>
      <p class="share-sub">Ayudá a tu red a conocer su exposición digital</p>
      <div class="share-btns">
        <button class="share-btn share-twitter" onclick="shareTwitter()">
          𝕏 Compartir en Twitter/X
        </button>
        <button class="share-btn share-copy" onclick="copyResult()">
          📋 Copiar resultado
        </button>
        <button class="share-btn share-img" onclick="showPage('guide')">
          🛡️ Ver guía completa
        </button>
      </div>
    </div>
  `;

  // Animate bars
  setTimeout(()=>{
    document.querySelectorAll('.bar-fill').forEach(b=>{b.style.transition='width 1.2s cubic-bezier(0.4,0,0.2,1)'});
  },100);

  window._shareText = shareText;
}

function calcCat(ids){
  let total=0,maxTotal=0;
  ids.forEach(id=>{
    const q = QUESTIONS.find(x=>x.id===id);
    if(!q)return;
    maxTotal+=q.risk;
    if(state.answers[q.id]>0)total+=q.risk;
  });
  return maxTotal===0?0:Math.round((total/maxTotal)*100);
}

function renderRadar(cats,color){
  const W=420,H=360,cx=210,cy=180,r=90,n=cats.length;
  let axes='',fills='',labels='';
  cats.forEach((c,i)=>{
    const angle=(i/n)*Math.PI*2-Math.PI/2;
    const ex=cx+r*Math.cos(angle),ey=cy+r*Math.sin(angle);
    axes+=`<line x1="${cx}" y1="${cy}" x2="${ex}" y2="${ey}" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>`;
    const val=c.val/100;
    const px=cx+r*val*Math.cos(angle),py=cy+r*val*Math.sin(angle);
    if(i===0)fills+=`M ${px} ${py}`;else fills+=` L ${px} ${py}`;
    const labelRadius = r + 28;
    const lx=cx+labelRadius*Math.cos(angle),ly=cy+labelRadius*Math.sin(angle);
    const side = Math.cos(angle);
    const anchor = side > 0.2 ? 'start' : side < -0.2 ? 'end' : 'middle';
    const dx = side > 0.2 ? 8 : side < -0.2 ? -8 : 0;
    labels+=`<text x="${lx}" y="${ly}" dx="${dx}" fill="rgba(255,255,255,0.45)" font-size="10" font-family="JetBrains Mono" text-anchor="${anchor}" dominant-baseline="middle">${c.label}</text>`;
  });
  fills+=' Z';
  // rings
  let rings='';
  [0.25,0.5,0.75,1].forEach(v=>{
    let ring='';
    cats.forEach((c,i)=>{
      const angle=(i/n)*Math.PI*2-Math.PI/2;
      const px=cx+r*v*Math.cos(angle),py=cy+r*v*Math.sin(angle);
      ring+=`${i===0?'M':'L'} ${px} ${py}`;
    });
    rings+=`<path d="${ring} Z" stroke="rgba(255,255,255,0.06)" fill="none" stroke-width="1"/>`;
  });

  return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
    ${rings}${axes}
    <path d="${fills}" fill="${color}22" stroke="${color}" stroke-width="1.5"/>
    ${labels}
  </svg>`;
}

function toggleRec(id){
  const el=document.getElementById(id);
  if(!el)return;
  el.classList.toggle('open');
  const btn=el.previousElementSibling.querySelector('.rec-expand-btn');
  if(btn)btn.textContent=el.classList.contains('open')?'Ocultar ▼':'Ver pasos ▶';
}

function shareTwitter(){
  const url=`https://twitter.com/intent/tweet?text=${encodeURIComponent(window._shareText||'Probé SecureMe, la herramienta de privacidad digital #SecureMe')}`;
  window.open(url,'_blank');
}

function copyResult(){
  const text=window._shareText||`Mi score en SecureMe: ${state.score}/100`;
  navigator.clipboard.writeText(text).then(()=>showToast('✅','Resultado copiado al portapapeles')).catch(()=>showToast('❌','No se pudo copiar'));
}

// ══════════════════════════════════════════════════════════
// OSINT SIMULATOR
// ══════════════════════════════════════════════════════════
let osintRunning=false;
let osintTimer=null;

const OSINT_SCRIPT = [
  {delay:200,type:'prompt',text:'osint@terminal:~$',cmd:' iniciar-scan --objetivo objetivo_demo --modo educativo'},
  {delay:800,type:'result',text:'[*] SecureMe OSINT Scanner v3.2 iniciado'},
  {delay:400,type:'comment',text:'[*] MODO EDUCATIVO — Todos los datos son ficticios'},
  {delay:400,type:'separator',text:'─────────────────────────────────────────────────────'},
  {delay:600,type:'prompt',text:'osint@terminal:~$',cmd:' buscar-redes --username objetivo_demo'},
  {delay:900,type:'result',text:'[+] Buscando username en 47 plataformas...'},
  {delay:1200,type:'found',text:'[✓] Instagram: @mariagonzalez_  → PERFIL PÚBLICO'},
  {delay:400,type:'found',text:'[✓] Twitter/X: @mariagonzalez_  → ACTIVO'},
  {delay:400,type:'found',text:'[✓] TikTok: @mariagonzalez_     → PÚBLICO'},
  {delay:400,type:'found',text:'[✓] LinkedIn: María González     → VISIBLE'},
  {delay:400,type:'found',text:'[✓] GitHub: mariagonzalez        → REPOSITORIOS PÚBLICOS'},
  {delay:400,type:'found',text:'[✓] Pinterest: mariagonz         → TABLEROS PÚBLICOS'},
  {delay:400,type:'warning',text:'[!] MISMO USERNAME en 6/47 plataformas — ALTA EXPOSICIÓN'},
  {delay:600,type:'separator',text:'─────────────────────────────────────────────────────'},
  {delay:400,type:'prompt',text:'osint@terminal:~$',cmd:' extraer-metadata --fuente instagram'},
  {delay:800,type:'result',text:'[*] Analizando últimas 24 publicaciones...'},
  {delay:1000,type:'found',text:'[✓] Foto 1: GPS [-16.5002, -68.1193]  → Zona Sur, La Paz'},
  {delay:400,type:'found',text:'[✓] Foto 8: GPS [-16.4956, -68.1330]  → UMSA Campus'},
  {delay:400,type:'found',text:'[✓] Foto 15: GPS [-16.4892, -68.1245] → Café frecuente'},
  {delay:400,type:'warning',text:'[!] METADATOS GPS detectados en 18/24 fotos'},
  {delay:500,type:'danger',text:'[✗] RUTINA DIARIA EXPUESTA: L-V 8am → Campus | 6pm → Zona Sur'},
  {delay:600,type:'separator',text:'─────────────────────────────────────────────────────'},
  {delay:400,type:'prompt',text:'osint@terminal:~$',cmd:' buscar-contacto --fuente facebook,linkedin'},
  {delay:800,type:'result',text:'[*] Escaneando perfiles de contacto...'},
  {delay:800,type:'found',text:'[✓] Teléfono: +591 7XX-XXXX (Facebook público)'},
  {delay:400,type:'found',text:'[✓] Email: maria.g@gmail.com (LinkedIn bio)'},
  {delay:400,type:'found',text:'[✓] Trabajo: UMSA — Ingeniería de Sistemas'},
  {delay:400,type:'warning',text:'[!] Email encontrado en 2 brechas de datos (HaveIBeenPwned)'},
  {delay:600,type:'separator',text:'─────────────────────────────────────────────────────'},
  {delay:400,type:'prompt',text:'osint@terminal:~$',cmd:' compilar-perfil --exportar'},
  {delay:1000,type:'result',text:'[*] Compilando perfil completo...'},
  {delay:600,type:'found',text:'[✓] Nombre real: María González'},
  {delay:200,type:'found',text:'[✓] Dirección aproximada: Zona Sur, La Paz, Bolivia'},
  {delay:200,type:'found',text:'[✓] Institución: UMSA — Ing. Sistemas'},
  {delay:200,type:'found',text:'[✓] Rutina: L-V entrada 8am, salida 6pm'},
  {delay:200,type:'found',text:'[✓] Contacto: teléfono + email verificados'},
  {delay:600,type:'separator',text:'─────────────────────────────────────────────────────'},
  {delay:400,type:'danger',text:'[✗] NIVEL DE EXPOSICIÓN: CRÍTICO (87/100)'},
  {delay:300,type:'danger',text:'[✗] TIEMPO TOTAL DE INVESTIGACIÓN: 12 minutos'},
  {delay:300,type:'danger',text:'[✗] PERFIL COMPLETO CONSTRUIDO SIN ACCESO ESPECIAL'},
  {delay:400,type:'comment',text:'[*] FIN DE SIMULACIÓN — Protegé tu información digital'},
];

function initOSINT(){
  if(!document.getElementById('terminalOutput')) return;
}

function startOSINT(){
  if(osintRunning) return;
  osintRunning=true;
  document.getElementById('startSimBtn').style.display='none';
  document.getElementById('resetSimBtn').style.display='inline-flex';
  const out = document.getElementById('terminalOutput');
  out.innerHTML='';
  let totalDelay=0;
  let riskProgress=0;

  OSINT_SCRIPT.forEach((line,i)=>{
    totalDelay+=line.delay;
    setTimeout(()=>{
      let html='';
      if(line.type==='prompt'){
        html=`<div class="t-line"><span class="t-prompt">${line.text}</span><span class="t-cmd">${line.cmd}</span></div>`;
      } else if(line.type==='found'){
        html=`<div class="t-line"><span class="t-found">${line.text}</span></div>`;
        riskProgress=Math.min(100,riskProgress+5);
      } else if(line.type==='warning'){
        html=`<div class="t-line"><span class="t-warning">${line.text}</span></div>`;
        riskProgress=Math.min(100,riskProgress+8);
      } else if(line.type==='danger'){
        html=`<div class="t-line"><span class="t-danger">${line.text}</span></div>`;
        riskProgress=Math.min(100,riskProgress+12);
      } else if(line.type==='result'){
        html=`<div class="t-line"><span class="t-result">${line.text}</span></div>`;
      } else if(line.type==='info'){
        html=`<div class="t-line"><span class="t-info">${line.text}</span></div>`;
      } else if(line.type==='comment'){
        html=`<div class="t-line"><span class="t-comment">${line.text}</span></div>`;
      } else if(line.type==='separator'){
        html=`<div class="t-line"><span class="t-separator">${line.text}</span></div>`;
      }
      out.innerHTML += html;
      // Animate last line
      const lines=out.querySelectorAll('.t-line');
      const last=lines[lines.length-1];
      if(last){setTimeout(()=>last.classList.add('visible'),20);}
      // Scroll terminal
      const tb=out.closest('.terminal-body');
      if(tb)tb.scrollTop=tb.scrollHeight;

      // Update risk meter
      const rm=document.getElementById('riskMeter');
      if(rm&&riskProgress>0){
        rm.classList.add('show');
        document.getElementById('riskBarEl').style.width=riskProgress+'%';
        document.getElementById('riskPct').textContent=riskProgress+'%';
      }

      // Show profile at end
      if(i===OSINT_SCRIPT.length-1){
        setTimeout(()=>{
          document.getElementById('victimProfile').classList.add('show');
          const cursor=out.querySelector('.t-cursor');
          if(cursor)cursor.remove();
        },600);
      }
    }, totalDelay);
  });
}

function resetOSINT(){
  osintRunning=false;
  document.getElementById('terminalOutput').innerHTML='';
  document.getElementById('riskMeter').classList.remove('show');
  document.getElementById('victimProfile').classList.remove('show');
  document.getElementById('riskBarEl').style.width='0%';
  document.getElementById('riskPct').textContent='0%';
  document.getElementById('startSimBtn').style.display='inline-flex';
  document.getElementById('resetSimBtn').style.display='none';
}

// ══════════════════════════════════════════════════════════
// GUIDE
// ══════════════════════════════════════════════════════════
function renderGuide(){
  const cats=[
    {key:'urgent',label:'ACCIONES URGENTES',color:'var(--accent2)',badge:'urgent-badge',card:'urgent',badgeText:'URGENTE'},
    {key:'important',label:'ACCIONES IMPORTANTES',color:'var(--accent4)',badge:'important-badge',card:'important',badgeText:'IMPORTANTE'},
    {key:'practice',label:'BUENAS PRÁCTICAS',color:'var(--accent)',badge:'practice-badge',card:'practice',badgeText:'PRÁCTICA'},
  ];
  let html='';
  cats.forEach(cat=>{
    const items=GUIDE_DATA.filter(g=>g.cat===cat.key);
    html+=`
      <div class="guide-section">
        <div class="guide-section-header">
          <span class="gsec-dot" style="background:${cat.color};box-shadow:0 0 8px ${cat.color}"></span>
          <span class="gsec-label" style="color:${cat.color}">${cat.label}</span>
          <span class="gsec-count">${items.length} elementos</span>
        </div>
        <div class="guide-cards">
          ${items.map(item=>`
            <div class="guide-card ${cat.card}">
              <div class="guide-card-top"></div>
              <div class="guide-card-body">
                <div class="guide-card-icon">${item.icon}</div>
                <div class="guide-card-badge ${cat.badge}">${cat.badgeText}</div>
                <div class="guide-card-title">${item.title}</div>
                <p class="guide-card-text">${item.text}</p>
                <div class="guide-card-tags">${item.tags.map(t=>`<span class="gtag">${t}</span>`).join('')}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  });

  html+=`
    <div style="max-width:1200px;margin:40px auto;text-align:center;background:var(--surface);border-radius:16px;padding:48px;border:1px solid rgba(0,255,136,0.15)">
      <h2 style="font-family:var(--display);font-size:36px;letter-spacing:2px;margin-bottom:12px">¿NECESITÁS AYUDA AHORA?</h2>
      <p style="font-family:var(--mono);font-size:13px;color:var(--muted2);margin-bottom:28px;max-width:500px;margin-left:auto;margin-right:auto">Si estás sufriendo violencia digital, no estás solo/a. Existen recursos que pueden ayudarte.</p>
      <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
        <button class="btn-primary" onclick="showPage('test')">🔍 Hacer el Test de Riesgo</button>
        <button class="btn-secondary" onclick="showPage('results')">📊 Ver mis Resultados</button>
      </div>
    </div>
  `;

  document.getElementById('guideContent').innerHTML=html;
}


// ══════════════════════════════════════════════════════════
// CHATBOT
// ══════════════════════════════════════════════════════════
const CHAT_KB = {
  instagram: {
    q: '¿Cómo pongo mi Instagram en privado?',
    a: '<strong>Para poner Instagram en privado:</strong><ul class="step-list"><li>Abrí Instagram y tocá tu foto de perfil</li><li>Tocá el ícono de menú (☰) → Configuración y privacidad</li><li>Privacidad → Privacidad de la cuenta</li><li>Activá el switch <strong>Cuenta privada</strong></li><li>Revisá quién ya te sigue y eliminá cuentas desconocidas</li></ul>⚠️ Esto evita que desconocidos vean tus fotos, historias y ubicaciones.'
  },
  '2fa': {
    q: '¿Cómo activo el 2FA?',
    a: '<strong>Autenticación en dos factores (2FA) — paso a paso:</strong><ul class="step-list"><li><strong>Instagram:</strong> Configuración → Seguridad → Autenticación en dos pasos</li><li><strong>WhatsApp:</strong> Ajustes → Cuenta → Verificación en dos pasos</li><li><strong>Gmail:</strong> myaccount.google.com → Seguridad → Verificación en 2 pasos</li><li><strong>Facebook:</strong> Configuración → Seguridad e inicio de sesión → 2FA</li></ul>Recomendamos usar una <strong>app autenticadora</strong> (Google Authenticator o Authy) en lugar de SMS, porque es más seguro.'
  },
  doxing: {
    q: '¿Qué es el doxing?',
    a: 'El <strong>doxing</strong> es la recopilación y publicación de información privada de una persona usando solo datos públicos disponibles en internet.<br><br>Un atacante puede usar tu <strong>nombre de usuario, fotos y redes públicas</strong> para construir un perfil con tu nombre, dirección, teléfono, trabajo y rutina — en menos de 15 minutos.<br><br><strong>Señales de que te están doxxeando:</strong><ul class="step-list"><li>Mensajes de desconocidos que mencionan datos personales</li><li>Tus datos aparecen en foros o grupos sin que los publicaras</li><li>Recibís amenazas específicas sobre tu ubicación</li></ul>Si creés que te están doxxeando, <strong>hacé el test de SecureMe</strong> para ver qué información está expuesta.'
  },
  grooming: {
    q: '¿Qué es el grooming y cómo lo reconozco?',
    a: 'El <strong>grooming</strong> es la manipulación online de un adulto hacia un menor para ganar su confianza con fines de abuso sexual.<br><br><strong>Señales de alerta:</strong><ul class="step-list"><li>Un adulto desconocido pide hablar en privado o en secreto</li><li>Regala cosas (juegos, dinero, skins, etc.) sin motivo</li><li>Pide fotos o muestra interés inusual en la vida personal</li><li>Pide que no le cuenten a sus padres o amigos</li><li>Hace preguntas íntimas o comparte contenido sexual</li></ul><strong>Qué hacer:</strong> Cortar el contacto de inmediato, guardar capturas y reportarlo al Ministerio Público o SEPDAVI Bolivia. Nunca es culpa del menor.'
  },
  metadatos: {
    q: '¿Qué son los metadatos GPS en fotos?',
    a: 'Cada foto que sacás con tu celular guarda datos ocultos llamados <strong>metadatos EXIF</strong>, que incluyen la <strong>ubicación GPS exacta</strong> de dónde fue tomada.<br><br>Al subir esa foto a redes sociales, cualquiera puede extraer esa info y saber dónde vivís, trabajás o estudiás.<br><br><strong>Cómo desactivar el GPS en fotos:</strong><ul class="step-list"><li><strong>iPhone:</strong> Ajustes → Privacidad → Servicios de ubicación → Cámara → Nunca</li><li><strong>Android:</strong> Cámara → Ajustes → Desactivar "Guardar ubicación"</li><li>Para fotos ya subidas, Instagram elimina automáticamente los metadatos al publicar</li></ul>Aun así, el <strong>fondo de las fotos</strong> puede revelar tu ubicación — revisá antes de publicar.'
  },
  denuncia: {
    q: '¿Cómo denuncio violencia digital en Bolivia?',
    a: '<strong>Pasos para denunciar en Bolivia:</strong><ul class="step-list"><li>Guardá evidencia: capturas de pantalla, URLs, mensajes (con fecha y hora visible)</li><li>No borres los mensajes aunque sean perturbadores — son tu prueba</li><li>Presentate al <strong>Ministerio Público</strong> más cercano con tu CI</li><li>Pedí hablar con la Fiscalía especializada en Cibercrimen o Delitos contra la Mujer</li><li>También podés contactar <strong>SEPDAVI</strong> (Servicio Plurinacional de la Víctima)</li></ul>⚠️ Bolivia aún no tiene una ley específica de violencia digital, pero los delitos pueden procesarse bajo el Código Penal y la Ley 348 contra la violencia hacia la mujer.<br><br><em>Recordá: solo el 5% denuncia. Ese acto importa y puede proteger a otras personas.</em>'
  },
  sextorsion: {
    q: '¿Qué hago si me están sextorsionando?',
    a: '⚠️ <strong>Sextorsión: qué hacer AHORA</strong><br><br>La sextorsión es cuando alguien amenaza con publicar fotos o videos íntimos tuyos si no pagás o hacés lo que piden.<br><br><strong>Pasos inmediatos:</strong><ul class="step-list"><li>NO pagués — pagar no garantiza nada y puede empeorar la situación</li><li>NO respondas a las amenazas ni entres en contacto</li><li>Guardá todo: capturas de los mensajes con fechas</li><li>Bloqueá al agresor en todas las plataformas</li><li>Reportá el perfil a la plataforma (Instagram, WhatsApp, etc.)</li><li>Denunciá al Ministerio Público o SEPDAVI</li></ul>No estás solo/a. Esto no es tu culpa. Las autoridades están para ayudarte.'
  },
  contrasenas: {
    q: '¿Cómo creo contraseñas seguras?',
    a: '<strong>Guía de contraseñas seguras:</strong><ul class="step-list"><li>Mínimo <strong>12 caracteres</strong> mezclando letras, números y símbolos</li><li><strong>Nunca repitas</strong> la misma contraseña en dos servicios distintos</li><li>Evitá nombres, fechas de nacimiento o palabras del diccionario</li><li>Usá un <strong>gestor de contraseñas</strong>: Bitwarden (gratuito) o 1Password</li><li>Activá <strong>2FA</strong> en todas las cuentas importantes</li></ul><strong>Ejemplo de contraseña fuerte:</strong><br><code style="background:var(--surface2);padding:4px 8px;border-radius:4px;font-size:12px">Michi#2024$CoffeeLaz!</code><br><br>Con un gestor solo necesitás recordar UNA contraseña maestra.'
  },
  facebook: {
    q: '¿Cómo configuro la privacidad en Facebook?',
    a: '<strong>Configuración de privacidad en Facebook:</strong><ul class="step-list"><li>Configuración → Privacidad → "¿Quién puede ver tus publicaciones futuras?" → <strong>Solo yo</strong> o <strong>Amigos</strong></li><li>Configuración → Privacidad → "¿Quién puede buscarte?" → Solo amigos de amigos</li><li>Configuración → Seguridad e inicio de sesión → Activá <strong>alertas de acceso no reconocido</strong></li><li>Usá la <strong>Comprobación de privacidad</strong> (herramienta oficial de Facebook)</li><li>Revisá y eliminá las <strong>apps de terceros</strong> que tienen acceso a tu cuenta</li></ul>⚠️ <strong>Ojo con el teléfono:</strong> Verificá que tu número no sea público en Configuración → Info → Datos de contacto e info básica.'
  },
  breach: {
    q: '¿Cómo sé si mis datos fueron filtrados?',
    a: '<strong>Cómo verificar si tus datos fueron expuestos:</strong><ul class="step-list"><li>Entrá a <strong>haveibeenpwned.com</strong> e ingresá tu email</li><li>Si aparecés en una filtración, <strong>cambiá esa contraseña de inmediato</strong></li><li>Revisá también si usabas esa contraseña en otras cuentas</li><li>Activá <strong>alertas de Google</strong> con tu nombre para ver dónde aparece</li></ul><strong>Si tus datos fueron filtrados:</strong><ul class="step-list"><li>Cambiá la contraseña del servicio afectado</li><li>Activá 2FA en esa cuenta</li><li>Revisá movimientos inusuales (si era una cuenta bancaria o de email)</li></ul>Los datos filtrados pueden aparecer en la <em>dark web</em> y usarse para phishing o acceso no autorizado.'
  }
};

const QUICK_QUESTIONS = [
  {k:'instagram', label:'🔒 ¿Cómo pongo Instagram en privado?'},
  {k:'2fa', label:'🔐 ¿Qué es el 2FA y cómo lo activo?'},
  {k:'doxing', label:'🕵️ ¿Qué es el doxing?'},
  {k:'grooming', label:'⚠️ ¿Cómo identifico el grooming?'},
  {k:'sextorsion', label:'🚨 Me están sextorsionando, ¿qué hago?'},
];

let chatHistory = [];
let chatInitialized = false;

function initChat(){
  if(chatInitialized) return;
  chatInitialized = true;
  const msgs = document.getElementById('chatMessages');
  msgs.innerHTML = '';
  
  // Welcome message
  addBotMessage('¡Hola! Soy el <strong>Asesor de Privacidad de SecureMe</strong>. Estoy aquí para ayudarte con dudas sobre privacidad digital, configuración de cuentas, ciberseguridad y violencia online.<br><br>Podés preguntarme cualquier cosa o elegir una de estas opciones:', false);
  
  // Show score if test done
  if(state.testDone && state.score !== null){
    const tag = document.getElementById('chatScoreTag');
    const num = document.getElementById('chatScoreNum');
    if(tag) tag.style.display = 'flex';
    if(num) num.textContent = state.score + '/100';
    const rl = state.riskLevel;
    const lvl = rl==='critical'?'CRÍTICO':rl==='high'?'ALTO':rl==='medium'?'MEDIO':'BAJO';
    setTimeout(()=>{
      addBotMessage(`Vi que completaste el test y obtuviste <strong style="color:${rl==='critical'||rl==='high'?'var(--accent2)':'var(--accent4)'}">${state.score}/100 (riesgo ${lvl})</strong>. ¿Querés que te explique cómo mejorar algún factor específico?`);
    }, 600);
  }
  
  renderQuickBtns();
}

function renderQuickBtns(){
  const el = document.getElementById('quickBtns');
  if(!el) return;
  el.innerHTML = QUICK_QUESTIONS.map(q =>
    `<button class="quick-btn" onclick="handleQuickQ('${q.k}')">${q.label}</button>`
  ).join('');
}

function handleQuickQ(key){
  const item = CHAT_KB[key];
  if(!item) return;
  addUserMessage(item.q);
  setTimeout(()=> addBotMessage(item.a), 700);
}

function askTopic(key){
  showPage('chat');
  setTimeout(()=>{
    handleQuickQ(key);
  }, 300);
}

function addUserMessage(text){
  const msgs = document.getElementById('chatMessages');
  const t = new Date().toLocaleTimeString('es',{hour:'2-digit',minute:'2-digit'});
  const div = document.createElement('div');
  div.className = 'chat-msg user';
  div.innerHTML = `<div class="msg-bubble user-bubble">${text}</div><span class="msg-time">${t}</span>`;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
  chatHistory.push({role:'user', text});
}

function addBotMessage(html, animate=true){
  const msgs = document.getElementById('chatMessages');
  const t = new Date().toLocaleTimeString('es',{hour:'2-digit',minute:'2-digit'});
  
  if(animate){
    // typing indicator
    const typing = document.createElement('div');
    typing.className = 'chat-msg bot';
    typing.id = 'typing-ind';
    typing.innerHTML = '<div class="typing-indicator"><span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span></div>';
    msgs.appendChild(typing);
    msgs.scrollTop = msgs.scrollHeight;
    
    setTimeout(()=>{
      const el = document.getElementById('typing-ind');
      if(el) el.remove();
      const div = document.createElement('div');
      div.className = 'chat-msg bot';
      div.innerHTML = `<div class="msg-bubble bot-bubble">${html}</div><span class="msg-time">${t}</span>`;
      msgs.appendChild(div);
      msgs.scrollTop = msgs.scrollHeight;
    }, 900);
  } else {
    const div = document.createElement('div');
    div.className = 'chat-msg bot';
    div.innerHTML = `<div class="msg-bubble bot-bubble">${html}</div><span class="msg-time">${t}</span>`;
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
  }
  chatHistory.push({role:'bot', text:html});
}

function sendChat(){
  const inp = document.getElementById('chatInput');
  const text = inp.value.trim();
  if(!text) return;
  inp.value = '';
  addUserMessage(text);
  
  const lower = text.toLowerCase();
  let found = null;
  
  // keyword matching
  const kw = {
    instagram: ['instagram','ig','privado','perfil'],
    '2fa': ['2fa','dos factores','doble','verificacion','verificación','autenticacion'],
    doxing: ['dox','doxing','información expuesta','datos expuestos'],
    grooming: ['grooming','menor','niño','adolescente','pedofilia','manipulacion'],
    metadatos: ['metadatos','gps','foto','ubicacion','exif'],
    denuncia: ['denunciar','denuncia','ministerio','sepdavi','reportar','bolivian'],
    sextorsion: ['sextorsion','sextorsión','foto intima','video intim','chantaje','amenaza'],
    contrasenas: ['contraseña','password','clave','bitwarden','gestor'],
    facebook: ['facebook','fb'],
    breach: ['filtración','filtrado','brecha','haveibeenpwned','hackearon','hackeron']
  };
  
  for(const [key, words] of Object.entries(kw)){
    if(words.some(w => lower.includes(w))){ found = key; break; }
  }
  
  if(found && CHAT_KB[found]){
    setTimeout(()=> addBotMessage(CHAT_KB[found].a), 700);
  } else if(lower.includes('hola') || lower.includes('buenas') || lower.includes('hey')){
    setTimeout(()=> addBotMessage('¡Hola! 👋 ¿En qué puedo ayudarte hoy? Podés preguntarme sobre <strong>privacidad en redes sociales, contraseñas, doxing, grooming, filtraciones de datos</strong> o cómo denunciar violencia digital en Bolivia.'), 600);
  } else if(lower.includes('gracias') || lower.includes('listo') || lower.includes('ok')){
    setTimeout(()=> addBotMessage('De nada. Recordá que la privacidad digital es un hábito, no una acción única. ¿Tenés otra duda? 🛡️'), 500);
  } else if(lower.includes('ayuda') || lower.includes('emergencia') || lower.includes('victima') || lower.includes('víctima')){
    setTimeout(()=> addBotMessage('Si estás en una situación de urgencia, contactá directamente a:<br><br>🚨 <strong>SEPDAVI Bolivia</strong> — Servicio Plurinacional de la Víctima<br>⚖️ <strong>Ministerio Público</strong> — Fiscalía especializada en Delitos Contra la Mujer<br><br>No estás solo/a. Documentá todo (capturas de pantalla) y no respondas al agresor.'), 700);
  } else {
    const fallbacks = [
      'No encontré una respuesta exacta, pero podés preguntarme sobre: <strong>Instagram, 2FA, doxing, grooming, metadatos GPS, filtraciones, sextorsión, contraseñas o cómo denunciar</strong>. ¿Cuál de estos te interesa?',
      'Esa pregunta me queda grande 😅 Pero sí puedo ayudarte con temas de <strong>privacidad, configuración de redes sociales, ciberseguridad o violencia digital</strong>. ¿Probás con uno de esos temas?',
      'Todavía estoy aprendiendo, pero sobre <strong>privacidad digital y seguridad online</strong> sé bastante. ¿Podés reformular la pregunta con palabras clave como Instagram, contraseña, doxing o grooming?'
    ];
    setTimeout(()=> addBotMessage(fallbacks[Math.floor(Math.random()*fallbacks.length)]), 800);
  }
  renderQuickBtns();
}

function chatKey(e){
  if(e.key === 'Enter') sendChat();
}

// ══════════════════════════════════════════════════════════
// TOAST
// ══════════════════════════════════════════════════════════
function showToast(icon,msg){
  const t=document.getElementById('toast');
  document.getElementById('toastIcon').textContent=icon;
  document.getElementById('toastMsg').textContent=msg;
  t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),3000);
}

// ══════════════════════════════════════════════════════════
// SCROLL REVEAL
// ══════════════════════════════════════════════════════════
const revealObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');revealObs.unobserve(e.target)}});
},{threshold:0.1});
document.querySelectorAll('.reveal').forEach(el=>revealObs.observe(el));

// ══════════════════════════════════════════════════════════
// COUNT UP ANIMATION
// ══════════════════════════════════════════════════════════
function animateCountUp(el){
  const target=parseInt(el.dataset.target);
  let current=0;
  const step=Math.ceil(target/40);
  const timer=setInterval(()=>{
    current=Math.min(current+step,target);
    el.textContent=current;
    if(current>=target)clearInterval(timer);
  },40);
}
const countObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){animateCountUp(e.target);countObs.unobserve(e.target)}});
});
document.querySelectorAll('.count-up').forEach(el=>countObs.observe(el));

// ══════════════════════════════════════════════════════════
// INIT
// ══════════════════════════════════════════════════════════
// Duplicate ticker for seamless loop
const ticker=document.getElementById('ticker');
if(ticker){ticker.innerHTML+=ticker.innerHTML}

// Show test result if already done
if(state.testDone&&state.score!==null){
  // Test is already done, test page will show result
}

// Init test if on test page
initTest();