// ── CONSTANTS ─────────────────────────────────────────────────────────────────

const MONTH_NAMES = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];
const MONTH_SHORT = ['Jan','Fév','Mar','Avr','Mai','Jun','Jul','Aoû','Sep','Oct','Nov','Déc'];
const WEEKS_PER_MONTH = [5,4,5,4,5,4,5,5,4,5,4,5];
const CUR_MONTH = 5;
const CUR_WEEK_IN_MONTH = 4;

const WEEK_OFFSETS = [0];
for (let i = 0; i < 12; i++) WEEK_OFFSETS.push(WEEK_OFFSETS[i] + WEEKS_PER_MONTH[i]);
const TOTAL_WEEKS = WEEK_OFFSETS[12];

function mw(m, w) { return WEEK_OFFSETS[m - 1] + w; }
const CUR_GLOBAL_WEEK = mw(CUR_MONTH, CUR_WEEK_IN_MONTH);

// ── INIT DATA ─────────────────────────────────────────────────────────────────

const INIT_USERS = [
  { id:1, name:'Lohan Barman', initials:'LB', email:'lohan.barman@hevs.ch', pin:'0000', role:'Admin',   color:'#3C8A5E', photo:'assets/lohanpp.png', firstLogin:true },
  { id:2, name:'Julia Bise',   initials:'JB', email:'julia.bise@hevs.ch',   pin:'1234', role:'Membre', color:'#7C3AED', photo:null,                  firstLogin:true },
];

const INIT_STATUSES = [
  { id:'new',      label:'Non traité', color:'#D97706', bg:'#FEF3C7' },
  { id:'progress', label:'En cours',   color:'#2563EB', bg:'#DBEAFE' },
  { id:'waiting',  label:'En attente', color:'#7C3AED', bg:'#EDE9FE' },
  { id:'done',     label:'Traité',     color:'#059669', bg:'#D1FAE5' },
];

const INIT_GANTT_STATUSES = [
  { id:'progress', label:'En cours', color:'#3C8A5E' },
  { id:'planned',  label:'Planifié', color:'#94A3B8' },
  { id:'done',     label:'Terminé',  color:'#10B981' },
  { id:'urgent',   label:'Urgent',   color:'#F59E0B' },
];

const INIT_GANTT = {
  lohan: [
    { id:1, name:'Newsletter mensuelle',   start:1,          end:TOTAL_WEEKS,    statusId:'progress' },
    { id:2, name:'Refonte site web HESTS', start:mw(2,1),    end:mw(5,2),        statusId:'progress' },
    { id:3, name:'Campagne RS printemps',  start:mw(3,2),    end:mw(6,3),        statusId:'progress' },
    { id:4, name:'Conférence presse mai',  start:mw(5,3),    end:mw(5,4),        statusId:'done'     },
    { id:5, name:'Rapport annuel 2026',    start:mw(9,1),    end:mw(11,3),       statusId:'planned'  },
    { id:6, name:'Campagne rentrée',       start:mw(7,1),    end:mw(9,2),        statusId:'planned'  },
  ],
  julia: [
    { id:1, name:'Coordination événements', start:1,         end:TOTAL_WEEKS,    statusId:'progress' },
    { id:2, name:'Vidéo institutionnelle',   start:1,         end:mw(3,4),        statusId:'done'     },
    { id:3, name:'Brochure formations',      start:mw(4,1),   end:mw(6,3),        statusId:'progress' },
    { id:4, name:'Inauguration salle',       start:mw(5,3),   end:mw(5,4),        statusId:'urgent'   },
    { id:5, name:'Plan com rentrée',         start:mw(6,2),   end:mw(8,3),        statusId:'planned'  },
    { id:6, name:'Shooting photo automne',   start:mw(9,2),   end:mw(10,3),       statusId:'planned'  },
  ],
};

const INIT_TODOS = {
  todo: [
    { id:1, title:'Relire communiqué inauguration',     assignees:[1],   due:'2026-05-29', time:'', priority:'high'   },
    { id:2, title:'Mettre à jour page actualités site', assignees:[2],   due:'2026-06-02', time:'', priority:'medium' },
    { id:3, title:'Préparer brief shooting photo juin', assignees:[1],   due:'2026-06-05', time:'14:00', priority:'low' },
  ],
  progress: [
    { id:4, title:'Newsletter juin — rédaction',         assignees:[1],   due:'2026-05-28', time:'', priority:'high'   },
    { id:5, title:'Vidéo récap journée portes ouvertes', assignees:[2],   due:'2026-05-30', time:'', priority:'medium' },
    { id:6, title:'Mise à jour LinkedIn',                assignees:[1,2], due:'2026-05-27', time:'', priority:'high', late:true },
    { id:7, title:'Révision charte graphique HESTS',     assignees:[1],   due:'2026-06-10', time:'', priority:'low'   },
  ],
  done: [
    { id:8,  title:'Envoi newsletter mai',         assignees:[1], due:'2026-05-15', time:'', priority:'medium' },
    { id:9,  title:'Communiqué presse conférence', assignees:[2], due:'2026-05-10', time:'', priority:'high'   },
    { id:10, title:'Story Instagram inauguration', assignees:[2], due:'2026-05-21', time:'', priority:'low'   },
    { id:11, title:'Rapport com Q1 2026',          assignees:[1], due:'2026-04-30', time:'', priority:'medium' },
  ],
};

const INIT_MAILS = [
  { id:1, sender:'Marie Rochat — RTS',  subject:'Demande d\'interview directrice', date:'27.05', statusId:'new',      assigned:'', unread:true,  priority:true  },
  { id:2, sender:'Prof. Bernard Simon', subject:'Invitation conférence annuelle',  date:'27.05', statusId:'progress', assigned:'Lohan', unread:true,  priority:true  },
  { id:3, sender:'Mairie de Sion',      subject:'Partenariat événement été 2026',  date:'26.05', statusId:'new',      assigned:'', unread:true,  priority:false },
  { id:4, sender:'Agence Publicom',     subject:'Maquettes brochure formations',   date:'26.05', statusId:'progress', assigned:'Julia', unread:false, priority:false },
  { id:5, sender:'Département fédéral', subject:'Rapport de communication 2025',  date:'25.05', statusId:'done',     assigned:'Lohan', unread:false, priority:false },
  { id:6, sender:'Rédaction 24heures',  subject:'Portrait alumni HESTS',          date:'24.05', statusId:'done',     assigned:'Julia', unread:false, priority:false },
];

const EVENTS = {
  '2026-5-5':  [{ text:'Réunion équipe com',   type:'ev-green' }],
  '2026-5-8':  [{ text:'Deadline newsletter',   type:'ev-red'   }],
  '2026-5-13': [{ text:'Formation LinkedIn',     type:'ev-blue'  }],
  '2026-5-21': [{ text:'Inauguration salle',     type:'ev-green' }],
  '2026-5-27': [{ text:'Comité communication',   type:'ev-green' }],
  '2026-5-29': [{ text:'Brief agence créative',  type:'ev-blue'  }],
  '2026-6-3':  [{ text:'Journée portes ouvertes',type:'ev-green' }],
  '2026-6-10': [{ text:'Charte — deadline',       type:'ev-red'   }],
};

// ── STATE ─────────────────────────────────────────────────────────────────────

const state = {
  currentUser: null, pin: '',
  mailFilter: 'all',
  mails:         JSON.parse(JSON.stringify(INIT_MAILS)),
  todos:         JSON.parse(JSON.stringify(INIT_TODOS)),
  users:         JSON.parse(JSON.stringify(INIT_USERS)),
  gantt:         JSON.parse(JSON.stringify(INIT_GANTT)),
  ganttPerson:   'lohan',
  ganttStatuses: JSON.parse(JSON.stringify(INIT_GANTT_STATUSES)),
  mailStatuses:  JSON.parse(JSON.stringify(INIT_STATUSES)),
  calYear: 2026, calMonth: 5,
  addTaskCol: 'todo',
  dragTaskId: null, dragFromCol: null,
  taskSort: 'priority',
  editingProjectId: null,
  editingTaskId: null,
  editingTaskCol: null,
  loginUserId: null,
  pinCreating: false,
  pinConfirming: false,
  pinCreateFirst: '',
};

// ── PERSISTENCE ───────────────────────────────────────────────────────────────

const STORAGE_KEY = 'sodesk_v1';

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      mails:         state.mails,
      todos:         state.todos,
      gantt:         state.gantt,
      ganttStatuses: state.ganttStatuses,
      mailStatuses:  state.mailStatuses,
      users:         state.users,
      taskSort:      state.taskSort,
    }));
  } catch(e) {}
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const s = JSON.parse(raw);
    if (s.mails)         state.mails         = s.mails;
    if (s.todos)         state.todos         = s.todos;
    if (s.gantt)         state.gantt         = s.gantt;
    if (s.ganttStatuses) state.ganttStatuses = s.ganttStatuses;
    if (s.mailStatuses)  state.mailStatuses  = s.mailStatuses;
    if (s.users)         state.users         = s.users;
    if (s.taskSort)      state.taskSort      = s.taskSort;
  } catch(e) {}
}

function resetToDefaults() {
  if (!confirm('Réinitialiser toutes les données aux valeurs par défaut ?\nCette action est irréversible.')) return;
  localStorage.removeItem(STORAGE_KEY);
  location.reload();
}

loadState();

// ── HELPERS ───────────────────────────────────────────────────────────────────

function getUser(id) { return state.users.find(u => u.id === id); }
function avatarStyle(u) { return `background:${u.color};color:#fff`; }
function getMailStatus(id) { return state.mailStatuses.find(s => s.id === id) || state.mailStatuses[0]; }

function formatDue(dateStr, time) {
  if (!dateStr || dateStr === '—') return '—';
  const parts = dateStr.split('-');
  if (parts.length !== 3) return dateStr;
  const d = parts[2].padStart(2,'0'), m = parts[1].padStart(2,'0');
  return time ? `${d}.${m} à ${time}` : `${d}.${m}`;
}

function isLate(dateStr) {
  if (!dateStr || dateStr === '—') return false;
  return new Date(dateStr) < new Date('2026-05-27');
}

const PRIORITY_META = {
  high:   { label:'Haute',   color:'#EF4444', bg:'#FEE2E2' },
  medium: { label:'Moyenne', color:'#F59E0B', bg:'#FEF3C7' },
  low:    { label:'Basse',   color:'#9CA3AF', bg:'#F3F4F6' },
};

// ── SVG CHARTS ────────────────────────────────────────────────────────────────

function svgBarChart(data, labels, color, h = 72) {
  const barW = 22, gap = 8, total = data.length;
  const maxV = Math.max(...data, 1);
  const svgW = total * (barW + gap);
  const bars = data.map((v, i) => {
    const barH = Math.max(2, (v / maxV) * h);
    const x = i * (barW + gap);
    const y = h - barH;
    const isCur = i === data.length - 1;
    return `
      <rect x="${x}" y="${y}" width="${barW}" height="${barH}" fill="${isCur ? color : color + '60'}" rx="4"/>
      <text x="${x + barW/2}" y="${h + 13}" text-anchor="middle" font-size="9" fill="#9CA3AF">${labels[i]}</text>
      <text x="${x + barW/2}" y="${y - 3}" text-anchor="middle" font-size="9" fill="${isCur ? color : '#9CA3AF'}" font-weight="${isCur?'700':'400'}">${v}</text>`;
  }).join('');
  return `<svg width="${svgW}" height="${h + 20}" viewBox="0 0 ${svgW} ${h + 20}" style="overflow:visible">${bars}</svg>`;
}

function svgLineChart(data, color, w = 160, h = 40) {
  const maxV = Math.max(...data, 1), minV = Math.min(...data, 0);
  const range = maxV - minV || 1;
  const step = w / (data.length - 1);
  const pts = data.map((v, i) => `${i * step},${h - ((v - minV) / range) * h}`).join(' ');
  const areaPts = `0,${h} ${pts} ${(data.length-1)*step},${h}`;
  const last = data[data.length - 1];
  const lx = (data.length - 1) * step;
  const ly = h - ((last - minV) / range) * h;
  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    <defs><linearGradient id="lg_${color.replace('#','')}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${color}" stop-opacity="0.25"/>
      <stop offset="1" stop-color="${color}" stop-opacity="0"/>
    </linearGradient></defs>
    <polygon points="${areaPts}" fill="url(#lg_${color.replace('#','')})"/>
    <polyline points="${pts}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="${lx}" cy="${ly}" r="3" fill="${color}"/>
  </svg>`;
}

// ── LOGIN ─────────────────────────────────────────────────────────────────────

function renderUserSelect() {
  const grid = document.getElementById('user-select-grid');
  if (!grid) return;
  grid.innerHTML = state.users.map(u => `
    <button class="user-select-card" onclick="selectUser(${u.id})">
      <div class="user-sel-av" style="background:${u.color};overflow:hidden">
        ${u.photo ? `<img src="${u.photo}" style="width:100%;height:100%;object-fit:cover" onerror="this.style.display='none'">` : u.initials}
      </div>
      <div class="user-sel-name">${u.name.split(' ')[0]}</div>
      <div class="user-sel-role">${u.role}</div>
    </button>`).join('');
}

function selectUser(id) {
  const u = state.users.find(x => x.id === id);
  if (!u) return;
  state.loginUserId = id;
  state.pin = '';
  state.pinCreating = !!u.firstLogin;
  state.pinConfirming = false;
  state.pinCreateFirst = '';

  document.getElementById('selected-user-display').innerHTML = `
    <div style="display:flex;align-items:center;gap:10px;justify-content:center;margin-bottom:18px">
      <div style="width:36px;height:36px;border-radius:50%;background:${u.color};display:flex;align-items:center;justify-content:center;color:#fff;font-size:13px;font-weight:700;overflow:hidden">
        ${u.photo ? `<img src="${u.photo}" style="width:100%;height:100%;object-fit:cover" onerror="this.style.display='none'">` : u.initials}
      </div>
      <span style="font-weight:600;font-size:15px;color:var(--text)">${u.name.split(' ')[0]}</span>
    </div>`;

  document.getElementById('pin-label').textContent = u.firstLogin ? 'Choisissez votre code PIN' : 'Votre code PIN';
  document.getElementById('pin-error').textContent = '';
  updateDots();
  document.getElementById('step-select').style.display = 'none';
  document.getElementById('step-pin').style.display = '';
}

function backToUserSelect() {
  state.loginUserId = null;
  state.pin = '';
  state.pinCreating = false;
  state.pinConfirming = false;
  state.pinCreateFirst = '';
  updateDots();
  document.getElementById('pin-error').textContent = '';
  document.getElementById('step-pin').style.display = 'none';
  document.getElementById('step-select').style.display = '';
}

function pinKey(k) {
  if (state.pin.length >= 4) return;
  state.pin += k;
  updateDots();
  if (state.pin.length === 4) setTimeout(pinSubmit, 150);
}
function pinDel() { state.pin = state.pin.slice(0, -1); updateDots(); }
function updateDots() {
  for (let i = 0; i < 4; i++) {
    const d = document.getElementById('d' + i);
    if (!d) return;
    d.classList.toggle('filled', i < state.pin.length);
    d.classList.remove('error');
  }
}

function pinSubmit() {
  const u = state.users.find(x => x.id === state.loginUserId);
  if (!u) return;

  // ── Première connexion : création PIN (direct, sans confirmation) ──────────
  if (state.pinCreating) {
    u.pin = state.pin;
    u.firstLogin = false;
    saveState();
    state.pinCreating = false;
    state.currentUser = u; state.pin = '';
    document.getElementById('pin-error').textContent = '';
    launchApp();
    return;
  }

  // ── Connexion normale ──────────────────────────────────────────────────────
  if (u.pin === state.pin) {
    state.currentUser = u; state.pin = '';
    document.getElementById('pin-error').textContent = '';
    launchApp();
  } else {
    document.getElementById('pin-error').textContent = 'Code incorrect.';
    for (let i = 0; i < 4; i++) document.getElementById('d' + i).classList.add('error');
    setTimeout(() => { state.pin = ''; updateDots(); }, 700);
  }
}

function launchApp() {
  const u = state.currentUser;
  document.getElementById('login-screen').style.display = 'none';
  document.getElementById('app').style.display = 'flex';
  refreshSidebarUser();
  if (u.role === 'Admin') {
    document.getElementById('admin-section').style.display = '';
    document.getElementById('admin-nav').style.display = '';
  }
  const now = new Date();
  const days = ['dimanche','lundi','mardi','mercredi','jeudi','vendredi','samedi'];
  const months = ['janvier','février','mars','avril','mai','juin','juillet','août','septembre','octobre','novembre','décembre'];
  document.getElementById('dash-greeting').textContent = 'Bonjour ' + u.name.split(' ')[0] + ' 👋';
  document.getElementById('dash-date').textContent = days[now.getDay()] + ' ' + now.getDate() + ' ' + months[now.getMonth()] + ' ' + now.getFullYear();
  renderAll();
}

function refreshSidebarUser() {
  const u = state.currentUser;
  const avEl = document.getElementById('sb-av');
  avEl.innerHTML = u.photo ? `<img src="${u.photo}" onerror="this.parentNode.textContent='${u.initials}'">` : u.initials;
  avEl.style.background = u.photo ? 'transparent' : u.color;
  document.getElementById('sb-name').textContent = u.name.split(' ')[0];
  document.getElementById('sb-role').textContent = u.role;
}

function logout() {
  state.currentUser = null; state.loginUserId = null;
  state.pin = ''; state.pinCreating = false; state.pinConfirming = false; state.pinCreateFirst = '';
  updateDots();
  document.getElementById('app').style.display = 'none';
  document.getElementById('login-screen').style.display = 'flex';
  document.getElementById('step-pin').style.display = 'none';
  document.getElementById('step-select').style.display = '';
  document.getElementById('pin-error').textContent = '';
  renderUserSelect();
  goTo('dashboard', document.querySelector('.nav-item'));
}

function renderAll() {
  renderDashboard();
  renderMails();
  renderTodos();
  renderGantt(state.ganttPerson);
  renderLegend();
  renderCalendar();
  renderAdmin();
  renderStatusList();
}

// ── NAVIGATION ────────────────────────────────────────────────────────────────

function goTo(page, el) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const pg = document.getElementById('page-' + page);
  if (pg) pg.classList.add('active');
  const nav = el || document.querySelector(`[onclick*="goTo('${page}')"]`);
  if (nav) nav.classList.add('active');
}

// ── DASHBOARD ─────────────────────────────────────────────────────────────────

function renderDashboard() {
  const newMails = state.mails.filter(m => m.statusId === 'new').length;
  const inProgress = state.todos.progress.length;
  document.getElementById('stat-mails').textContent = newMails;
  document.getElementById('stat-tasks').textContent = inProgress;

  // My tasks list
  const tasks = state.todos.progress.slice(0, 4);
  document.getElementById('dash-tasks').innerHTML = tasks.map(t => {
    const u = getUser(t.assignees[0]);
    const pm = PRIORITY_META[t.priority || 'medium'];
    return `<li class="act-item">
      <div class="act-av" style="${avatarStyle(u)}">${u.initials}</div>
      <div class="act-text">${t.title}</div>
      <div style="display:flex;align-items:center;gap:6px">
        <span class="badge" style="background:${pm.bg};color:${pm.color}">${pm.label}</span>
        <div class="act-time" style="${isLate(t.due)?'color:#EF4444;font-weight:600':''}">${formatDue(t.due, t.time)}</div>
      </div>
    </li>`;
  }).join('');

  // Charts
  renderEmailChart();
  renderSocialStats();
}

function renderEmailChart() {
  const weekData  = [5, 8, 6, 11, 9, 7, 12, 6];
  const weekLabels = ['S18','S19','S20','S21','S22','S23','S24','S25'];
  const monthData  = [38, 42, 35, 51, 44, 47];
  const monthLabels = ['Déc','Jan','Fév','Mar','Avr','Mai'];
  const el = document.getElementById('email-chart');
  if (el) el.innerHTML = svgBarChart(weekData, weekLabels, '#3C8A5E');
  const el2 = document.getElementById('email-chart-month');
  if (el2) el2.innerHTML = svgBarChart(monthData, monthLabels, '#3C8A5E');
}

function renderSocialStats() {
  const linkedin  = [784, 826, 862, 901, 942, 978, 1015, 1058, 1105, 1155, 1218, 1284];
  const facebook  = [3200, 3280, 3350, 3418, 3488, 3540, 3590, 3625, 3658, 3685, 3706, 3721];
  const instagram = [840, 850, 858, 864, 870, 875, 879, 883, 886, 888, 890, 892];
  const lig = document.getElementById('linkedin-sparkline');
  const fsp = document.getElementById('facebook-sparkline');
  const isp = document.getElementById('instagram-sparkline');
  if (lig) lig.innerHTML = svgLineChart(linkedin, '#0A66C2');
  if (fsp) fsp.innerHTML = svgLineChart(facebook, '#1877F2');
  if (isp) isp.innerHTML = svgLineChart(instagram, '#E1306C');
}

function switchEmailChart(btn, period) {
  document.querySelectorAll('.chart-toggle .tog-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const weekEl  = document.getElementById('email-chart');
  const monthEl = document.getElementById('email-chart-month');
  if (weekEl)  weekEl.style.display  = period === 'week'  ? '' : 'none';
  if (monthEl) monthEl.style.display = period === 'month' ? '' : 'none';
}

// ── MAILBOX ───────────────────────────────────────────────────────────────────

function filterMail(btn, f) {
  state.mailFilter = f;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderMails();
}

function toggleMailPriority(id) {
  const m = state.mails.find(x => x.id === id);
  if (m) { m.priority = !m.priority; renderMails(); saveState(); }
}

function renderMails() {
  let mails = state.mails;
  if (state.mailFilter === 'new')  mails = mails.filter(m => m.statusId === 'new');
  if (state.mailFilter === 'mine') mails = mails.filter(m => m.assigned === state.currentUser?.name.split(' ')[0]);
  if (state.mailFilter === 'done') mails = mails.filter(m => m.statusId === 'done');

  const newCount = state.mails.filter(m => m.statusId === 'new').length;
  const badge = document.getElementById('mail-badge');
  if (badge) { badge.textContent = newCount; badge.style.display = newCount ? '' : 'none'; }
  document.getElementById('stat-mails').textContent = newCount;

  const priority = mails.filter(m => m.priority);
  const standard = mails.filter(m => !m.priority);

  const renderMailItem = m => {
    const s = getMailStatus(m.statusId);
    const statusOptions = state.mailStatuses.map(st =>
      `<option value="${st.id}" ${m.statusId === st.id ? 'selected' : ''}>${st.label}</option>`
    ).join('');
    return `<div class="mail-item ${m.unread ? 'unread' : ''}">
      <button class="flag-btn ${m.priority?'flagged':''}" onclick="toggleMailPriority(${m.id})" title="${m.priority?'Retirer priorité':'Marquer prioritaire'}">★</button>
      <div class="mail-sender">${m.sender}</div>
      <div class="mail-subject">${m.subject}</div>
      <div class="mail-date">${m.date}</div>
      <select class="assign-sel" onchange="assignMail(${m.id},this.value)">
        <option value="" ${!m.assigned?'selected':''}>— Assigner</option>
        ${state.users.map(u=>`<option value="${u.name.split(' ')[0]}" ${m.assigned===u.name.split(' ')[0]?'selected':''}>${u.name.split(' ')[0]}</option>`).join('')}
      </select>
      <select class="assign-sel" onchange="changeMailStatus(${m.id},this.value)" style="border-color:${s.color};color:${s.color}">
        ${statusOptions}
      </select>
    </div>`;
  };

  let html = '';
  if (priority.length) {
    html += `<div class="mail-zone-hd"><span class="zone-dot priority"></span> À traiter aujourd'hui <span class="zone-count">${priority.length}</span></div>`;
    html += priority.map(renderMailItem).join('');
  }
  if (standard.length) {
    html += `<div class="mail-zone-hd" style="margin-top:${priority.length?'18px':'0'}"><span class="zone-dot standard"></span> Plus tard <span class="zone-count">${standard.length}</span></div>`;
    html += standard.map(renderMailItem).join('');
  }
  if (!mails.length) html = `<div style="color:var(--muted);text-align:center;padding:40px">Aucun email dans cette vue.</div>`;

  document.getElementById('mail-list').innerHTML = html;
}

function assignMail(id, person) {
  const m = state.mails.find(x => x.id === id);
  if (m) { m.assigned = person; m.unread = false; renderMails(); saveState(); }
}
function changeMailStatus(id, statusId) {
  const m = state.mails.find(x => x.id === id);
  if (m) { m.statusId = statusId; m.unread = false; renderMails(); renderDashboard(); saveState(); }
}

// ── KANBAN ────────────────────────────────────────────────────────────────────

function setSortTask(sel) { state.taskSort = sel.value; renderTodos(); }

function sortedTasks(col) {
  const tasks = [...state.todos[col]];
  const pOrder = { high: 0, medium: 1, low: 2 };
  if (state.taskSort === 'priority') return tasks.sort((a,b) => (pOrder[a.priority||'medium']) - (pOrder[b.priority||'medium']));
  if (state.taskSort === 'date')     return tasks.sort((a,b) => (a.due||'').localeCompare(b.due||''));
  return tasks;
}

function renderTodos() {
  ['todo','progress','done'].forEach(col => {
    const tasks = sortedTasks(col);
    document.getElementById('cnt-' + col).textContent = tasks.length;
    document.getElementById('col-' + col).innerHTML = tasks.map(t => {
      const pm = PRIORITY_META[t.priority || 'medium'];
      const avatars = t.assignees.map(uid => {
        const u = getUser(uid);
        if (!u) return '';
        return `<div class="task-av-wrap">
          <div class="task-av" style="${avatarStyle(u)}" title="${u.name}">${u.photo ? `<img src="${u.photo}" onerror="this.parentNode.textContent='${u.initials}'">` : u.initials}</div>
          ${t.assignees.length > 1 ? `<button class="remove-av" onclick="removeAssignee(${t.id},'${col}',${uid})">×</button>` : ''}
        </div>`;
      }).join('');
      const canAdd = t.assignees.length < state.users.length;
      const nextUser = state.users.find(u => !t.assignees.includes(u.id));
      const addBtn = canAdd && nextUser
        ? `<button class="add-assignee-btn" onclick="toggleAssignee(${t.id},'${col}',${nextUser.id})" title="Ajouter ${nextUser.name.split(' ')[0]}">+</button>`
        : '';
      const late = isLate(t.due);
      return `<div class="task-card" draggable="true" ondragstart="dragStart(event,${t.id},'${col}')" ondragend="dragEnd(event)">
        <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:4px;margin-bottom:2px">
          <div class="task-title">${t.title}</div>
          <button class="task-edit-btn" onclick="openEditTask(${t.id},'${col}')" title="Modifier">✏️</button>
        </div>
        <div style="display:flex;align-items:center;gap:6px;margin-bottom:8px">
          <span class="priority-dot" style="background:${pm.color}" title="${pm.label}"></span>
          <span style="font-size:11px;color:${pm.color}">${pm.label}</span>
        </div>
        <div class="task-meta">
          <div class="task-assignees">${avatars}${addBtn}</div>
          <span class="task-due ${late?'late':''}">${formatDue(t.due, t.time)}</span>
        </div>
      </div>`;
    }).join('');
  });
}

function removeAssignee(taskId, col, userId) {
  const t = state.todos[col].find(x => x.id === taskId);
  if (t && t.assignees.length > 1) { t.assignees = t.assignees.filter(id => id !== userId); renderTodos(); saveState(); }
}
function toggleAssignee(taskId, col, userId) {
  const t = state.todos[col].find(x => x.id === taskId);
  if (!t) return;
  t.assignees.includes(userId) ? (t.assignees.length > 1 && (t.assignees = t.assignees.filter(id => id !== userId))) : t.assignees.push(userId);
  renderTodos(); saveState();
}

// Drag & drop
function dragStart(e, taskId, fromCol) {
  state.dragTaskId = taskId; state.dragFromCol = fromCol;
  setTimeout(() => { const c = e.target.closest('.task-card'); if (c) c.classList.add('dragging'); }, 0);
}
function dragEnd()  { document.querySelectorAll('.task-card').forEach(c => c.classList.remove('dragging')); document.querySelectorAll('.k-col').forEach(c => c.classList.remove('drag-over')); }
function dragOver(e){ e.preventDefault(); document.querySelectorAll('.k-col').forEach(c => c.classList.remove('drag-over')); e.currentTarget.classList.add('drag-over'); }
function dropTask(e, toCol) {
  e.preventDefault(); document.querySelectorAll('.k-col').forEach(c => c.classList.remove('drag-over'));
  const { dragTaskId: id, dragFromCol: from } = state;
  if (!id || from === toCol) return;
  const t = state.todos[from].find(x => x.id === id);
  if (!t) return;
  state.todos[from] = state.todos[from].filter(x => x.id !== id);
  state.todos[toCol].push(t);
  state.dragTaskId = null; state.dragFromCol = null;
  renderTodos(); renderDashboard(); saveState();
}

// Add / edit task modal
function openAddTask(col) {
  state.addTaskCol = col;
  state.editingTaskId = null; state.editingTaskCol = null;
  document.getElementById('modal-task-title').textContent = 'Nouvelle tâche';
  document.getElementById('t-title').value = '';
  document.getElementById('t-due').value = '';
  document.getElementById('t-time').value = '';
  document.getElementById('t-priority').value = 'medium';
  document.getElementById('t-both').checked = false;
  document.getElementById('t-assignee').innerHTML = state.users.map(u => `<option value="${u.id}">${u.name}</option>`).join('');
  document.getElementById('modal-task').style.display = 'flex';
}
function openEditTask(id, col) {
  const t = state.todos[col].find(x => x.id === id);
  if (!t) return;
  state.editingTaskId = id; state.editingTaskCol = col;
  document.getElementById('modal-task-title').textContent = 'Modifier la tâche';
  document.getElementById('t-title').value = t.title;
  document.getElementById('t-due').value = t.due || '';
  document.getElementById('t-time').value = t.time || '';
  document.getElementById('t-priority').value = t.priority || 'medium';
  document.getElementById('t-assignee').innerHTML = state.users.map(u => `<option value="${u.id}">${u.name}</option>`).join('');
  document.getElementById('t-assignee').value = t.assignees[0];
  document.getElementById('t-both').checked = t.assignees.length > 1;
  document.getElementById('modal-task').style.display = 'flex';
}
function confirmAddTask() {
  const title = document.getElementById('t-title').value.trim();
  if (!title) return;
  const due      = document.getElementById('t-due').value;
  const time     = document.getElementById('t-time').value;
  const priority = document.getElementById('t-priority').value;
  const userId   = parseInt(document.getElementById('t-assignee').value);
  const both     = document.getElementById('t-both').checked;
  const assignees = both ? state.users.map(u => u.id) : [userId];

  if (state.editingTaskId !== null) {
    const t = state.todos[state.editingTaskCol].find(x => x.id === state.editingTaskId);
    if (t) Object.assign(t, { title, assignees, due, time, priority });
    state.editingTaskId = null; state.editingTaskCol = null;
  } else {
    state.todos[state.addTaskCol].push({ id: Date.now(), title, assignees, due, time, priority });
  }
  closeModal('modal-task');
  renderTodos(); renderDashboard(); saveState();
}

// ── GANTT ─────────────────────────────────────────────────────────────────────

function renderLegend() {
  const bar = document.getElementById('legend-bar');
  if (!bar) return;
  bar.innerHTML = state.ganttStatuses.map((s, i) =>
    `<div class="legend-chip" onclick="editLegend(${i})">
      <div class="legend-dot" style="background:${s.color}"></div>${s.label}
    </div>`
  ).join('') + `<button class="add-legend" onclick="addGanttStatus()">+ Légende</button>`;
}

function editLegend(i) {
  const s = state.ganttStatuses[i];
  const newLabel = prompt('Nom du statut :', s.label); if (newLabel === null) return;
  const newColor = prompt('Couleur hex :', s.color);  if (newColor === null) return;
  state.ganttStatuses[i].label = newLabel || s.label;
  state.ganttStatuses[i].color = newColor || s.color;
  renderLegend(); renderGantt(state.ganttPerson); saveState();
}
function addGanttStatus() {
  const label = prompt('Nom :'); if (!label) return;
  const color = prompt('Couleur hex :', '#6366F1'); if (!color) return;
  state.ganttStatuses.push({ id: 'custom_' + Date.now(), label, color });
  renderLegend(); saveState();
}

function switchGantt(person) {
  state.ganttPerson = person;
  document.getElementById('tog-lohan').classList.toggle('active', person === 'lohan');
  document.getElementById('tog-julia').classList.toggle('active', person === 'julia');
  renderGantt(person);
}

function renderGantt(person) {
  const projects = state.gantt[person] || [];
  let monthRow = '<tr><th class="th-task" rowspan="2">Projet</th>';
  let weekRow  = '<tr>';
  for (let m = 0; m < 12; m++) {
    const wCount = WEEKS_PER_MONTH[m], isCur = (m + 1) === CUR_MONTH;
    monthRow += `<th class="th-month ${isCur?'cur-month-head':''}" colspan="${wCount}">${MONTH_SHORT[m]}</th>`;
    for (let w = 1; w <= wCount; w++) {
      const gw = WEEK_OFFSETS[m] + w, isCurW = gw === CUR_GLOBAL_WEEK;
      weekRow += `<th class="th-week ${isCurW?'cur-week':''}">S${w}</th>`;
    }
  }
  monthRow += '</tr>'; weekRow += '</tr>';

  let tbody = '<tbody>';
  projects.forEach(p => {
    const s = state.ganttStatuses.find(x => x.id === p.statusId) || state.ganttStatuses[0];
    let cells = '';
    for (let w = 1; w <= TOTAL_WEEKS; w++) {
      const active = w >= p.start && w <= p.end;
      const isStart = w === p.start, isEnd = w === p.end, single = p.start === p.end;
      let cls = active ? `g-bar${single?' bar-only':isStart?' bar-start':isEnd?' bar-end':''}` : '';
      cells += `<td class="g-bar-cell"><div class="${cls}" style="${active?`background:${s.color};opacity:0.82`:''}"></div></td>`;
    }
    tbody += `<tr>
      <td class="td-task">
        <div style="display:flex;align-items:center;justify-content:space-between;gap:6px">
          <div class="g-task-name">${p.name}</div>
          <div style="display:flex;gap:4px;flex-shrink:0">
            <button class="gantt-icon-btn" onclick="openEditProject(${p.id})" title="Modifier">✏️</button>
            <button class="gantt-icon-btn danger" onclick="deleteProject(${p.id})" title="Supprimer">×</button>
          </div>
        </div>
      </td>${cells}</tr>`;
  });
  tbody += `<tr class="add-project-row"><td colspan="${TOTAL_WEEKS+1}">
    <button class="add-project-btn" onclick="openAddProject()">+ Ajouter un projet</button>
  </td></tr></tbody>`;

  document.getElementById('gantt-table').innerHTML = `<thead>${monthRow}${weekRow}</thead>${tbody}`;
}

function buildWeekOptions(selectedVal) {
  return Array.from({length: 12}, (_, m) =>
    Array.from({length: WEEKS_PER_MONTH[m]}, (__, w) => {
      const gw = WEEK_OFFSETS[m] + w + 1;
      return `<option value="${gw}" ${gw === selectedVal ? 'selected' : ''}>${MONTH_SHORT[m]} — S${w+1}</option>`;
    }).join('')
  ).join('');
}

function buildPersonCheckboxes(preSelected) {
  const keys = ['lohan', 'julia'];
  return keys.map(key => {
    const u = state.users.find(u => u.name.split(' ')[0].toLowerCase() === key);
    const color = u ? u.color : '#3C8A5E';
    const initials = u ? u.initials : key[0].toUpperCase();
    const label = u ? u.name.split(' ')[0] : key;
    const checked = preSelected.includes(key) ? 'checked' : '';
    return `<label class="person-check-label" style="border-color:${checked ? color : ''}">
      <input type="checkbox" name="p-person" value="${key}" ${checked} style="accent-color:${color}"
        onchange="this.closest('label').style.borderColor=this.checked?'${color}':''">
      <div class="person-check-av" style="background:${color}">${initials}</div>
      ${label}
    </label>`;
  }).join('');
}

function openAddProject() {
  state.editingProjectId = null;
  document.getElementById('p-name').value = '';
  document.getElementById('p-start').innerHTML = buildWeekOptions(CUR_GLOBAL_WEEK);
  document.getElementById('p-end').innerHTML   = buildWeekOptions(Math.min(CUR_GLOBAL_WEEK + 4, TOTAL_WEEKS));
  document.getElementById('p-status').innerHTML = state.ganttStatuses.map(s => `<option value="${s.id}">${s.label}</option>`).join('');
  document.getElementById('p-persons').innerHTML = buildPersonCheckboxes([state.ganttPerson]);
  document.getElementById('modal-project-title').textContent = 'Ajouter un projet';
  document.getElementById('modal-project').style.display = 'flex';
}

function openEditProject(id) {
  const p = state.gantt[state.ganttPerson].find(x => x.id === id);
  if (!p) return;
  state.editingProjectId = id;
  document.getElementById('p-name').value = p.name;
  document.getElementById('p-start').innerHTML = buildWeekOptions(p.start);
  document.getElementById('p-end').innerHTML   = buildWeekOptions(p.end);
  document.getElementById('p-status').innerHTML = state.ganttStatuses.map(s =>
    `<option value="${s.id}" ${s.id===p.statusId?'selected':''}>${s.label}</option>`).join('');
  const alreadyIn = ['lohan','julia'].filter(person => state.gantt[person].some(x => x.id === id));
  document.getElementById('p-persons').innerHTML = buildPersonCheckboxes(alreadyIn.length ? alreadyIn : [state.ganttPerson]);
  document.getElementById('modal-project-title').textContent = 'Modifier le projet';
  document.getElementById('modal-project').style.display = 'flex';
}

function confirmAddProject() {
  const name = document.getElementById('p-name').value.trim(); if (!name) return;
  const start    = parseInt(document.getElementById('p-start').value);
  const end      = Math.max(start, parseInt(document.getElementById('p-end').value));
  const statusId = document.getElementById('p-status').value;
  const checked  = document.querySelectorAll('input[name="p-person"]:checked');
  const persons  = checked.length ? Array.from(checked).map(c => c.value) : [state.ganttPerson];

  if (state.editingProjectId !== null) {
    persons.forEach(person => {
      const idx = state.gantt[person].findIndex(x => x.id === state.editingProjectId);
      if (idx !== -1) Object.assign(state.gantt[person][idx], { name, start, end, statusId });
      else state.gantt[person].push({ id: state.editingProjectId, name, start, end, statusId });
    });
  } else {
    const newId = Date.now();
    persons.forEach(person => state.gantt[person].push({ id: newId, name, start, end, statusId }));
  }
  closeModal('modal-project');
  renderGantt(state.ganttPerson); saveState();
}

function deleteProject(id) {
  const p = state.gantt[state.ganttPerson].find(x => x.id === id);
  if (!p) return;
  if (!confirm(`Supprimer le projet "${p.name}" ?\nCette action est irréversible.`)) return;
  state.gantt[state.ganttPerson] = state.gantt[state.ganttPerson].filter(x => x.id !== id);
  renderGantt(state.ganttPerson); saveState();
}

// ── CALENDAR ──────────────────────────────────────────────────────────────────

function calNav(dir) {
  state.calMonth += dir;
  if (state.calMonth > 12) { state.calMonth = 1; state.calYear++; }
  if (state.calMonth < 1)  { state.calMonth = 12; state.calYear--; }
  renderCalendar();
}
function renderCalendar() {
  const { calYear: y, calMonth: m } = state;
  document.getElementById('cal-title').textContent = MONTH_NAMES[m-1] + ' ' + y;
  const firstDay = new Date(y, m-1, 1).getDay();
  const startOffset = firstDay === 0 ? 6 : firstDay - 1;
  const daysInMonth = new Date(y, m, 0).getDate();
  const daysInPrev  = new Date(y, m-1, 0).getDate();
  const today = new Date();
  const isCurMo = today.getFullYear() === y && today.getMonth()+1 === m;
  let html = '';
  for (let i = 0; i < startOffset; i++) html += `<div class="cal-day other"><div class="day-num">${daysInPrev-startOffset+1+i}</div></div>`;
  for (let d = 1; d <= daysInMonth; d++) {
    const evs = EVENTS[`${y}-${m}-${d}`] || [];
    html += `<div class="cal-day ${isCurMo && d === today.getDate() ? 'today' : ''}">
      <div class="day-num">${d}</div>
      ${evs.map(e => `<div class="cal-ev ${e.type}">${e.text}</div>`).join('')}
    </div>`;
  }
  const rem = (startOffset + daysInMonth) % 7; if (rem) for (let i = 1; i <= 7-rem; i++) html += `<div class="cal-day other"><div class="day-num">${i}</div></div>`;
  document.getElementById('cal-days').innerHTML = html;
}

// ── ADMIN ─────────────────────────────────────────────────────────────────────

function renderAdmin() {
  document.getElementById('u-table').innerHTML = `
    <thead><tr><th></th><th>Nom</th><th>Email</th><th>PIN</th><th>Rôle</th><th>Couleur</th><th>Action</th></tr></thead>
    <tbody>${state.users.map(u => `
      <tr>
        <td><div class="u-av" style="background:${u.color};overflow:hidden">
          ${u.photo ? `<img src="${u.photo}" style="width:100%;height:100%;object-fit:cover" onerror="this.style.display='none'">` : u.initials}
        </div></td>
        <td style="font-weight:600">${u.name}</td>
        <td style="color:var(--muted);font-size:12px">${u.email}</td>
        <td>
          ${state.currentUser?.role === 'Admin'
            ? `<div style="display:flex;align-items:center;gap:6px">
                <span id="pin-val-${u.id}" style="font-family:monospace;font-size:13px;letter-spacing:2px">••••</span>
                <button onclick="togglePin(${u.id})" class="eye-btn" title="Afficher/masquer">👁</button>
              </div>`
            : `<span style="font-family:monospace;color:var(--muted);letter-spacing:2px">••••</span>`
          }
        </td>
        <td>
          <select class="form-sel" onchange="updateUserRole(${u.id},this.value)" style="padding:4px 8px;font-size:12px">
            <option ${u.role==='Admin'?'selected':''}>Admin</option>
            <option ${u.role==='Membre'?'selected':''}>Membre</option>
            <option ${u.role==='Lecture seule'?'selected':''}>Lecture seule</option>
          </select>
        </td>
        <td>
          <input type="color" value="${u.color}" onchange="updateUserColor(${u.id},this.value)"
            style="width:32px;height:28px;border:none;background:none;cursor:pointer;padding:0;border-radius:6px">
        </td>
        <td>${u.id > 2 ? `<button class="btn-sm" onclick="removeUser(${u.id})">Retirer</button>` : '—'}</td>
      </tr>`).join('')}
    </tbody>`;
}

function togglePin(id) {
  if (state.currentUser?.role !== 'Admin') return;
  const u = state.users.find(x => x.id === id);
  const el = document.getElementById('pin-val-' + id);
  if (!el || !u) return;
  el.textContent = el.textContent === '••••' ? u.pin : '••••';
}

function openProfile() {
  const u = state.currentUser;
  document.getElementById('profile-user-info').innerHTML = `
    <div style="width:52px;height:52px;border-radius:50%;background:${u.color};display:flex;align-items:center;justify-content:center;color:#fff;font-size:17px;font-weight:700;overflow:hidden;flex-shrink:0">
      ${u.photo ? `<img src="${u.photo}" style="width:100%;height:100%;object-fit:cover" onerror="this.style.display='none'">` : u.initials}
    </div>
    <div>
      <div style="font-weight:700;font-size:15px;color:var(--text)">${u.name}</div>
      <div style="font-size:12px;color:var(--muted);margin-top:2px">${u.email}</div>
      <span style="font-size:11px;font-weight:600;color:${u.color}">${u.role}</span>
    </div>`;
  document.getElementById('prof-pin-current').value = '';
  document.getElementById('prof-pin-new').value = '';
  document.getElementById('prof-pin-confirm').value = '';
  document.getElementById('prof-pin-error').textContent = '';
  document.getElementById('prof-pin-success').textContent = '';
  document.getElementById('modal-profile').style.display = 'flex';
}

function saveNewPin() {
  const u = state.currentUser;
  const current = document.getElementById('prof-pin-current').value.trim();
  const newPin   = document.getElementById('prof-pin-new').value.trim();
  const confirm  = document.getElementById('prof-pin-confirm').value.trim();
  const errEl    = document.getElementById('prof-pin-error');
  const okEl     = document.getElementById('prof-pin-success');
  errEl.textContent = ''; okEl.textContent = '';

  if (current !== u.pin)        { errEl.textContent = 'Code actuel incorrect.'; return; }
  if (!/^\d{4}$/.test(newPin))  { errEl.textContent = 'Le nouveau code doit contenir exactement 4 chiffres.'; return; }
  if (newPin !== confirm)        { errEl.textContent = 'Les deux nouveaux codes ne correspondent pas.'; return; }

  u.pin = newPin;
  saveState();
  document.getElementById('prof-pin-current').value = '';
  document.getElementById('prof-pin-new').value = '';
  document.getElementById('prof-pin-confirm').value = '';
  okEl.textContent = 'Code PIN mis à jour avec succès !';
  setTimeout(() => { okEl.textContent = ''; }, 3000);
}
function updateUserRole(id, role) {
  const u = state.users.find(x => x.id === id);
  if (u) { u.role = role; saveState(); }
}
function updateUserColor(id, color) {
  const u = state.users.find(x => x.id === id);
  if (u) { u.color = color; renderAdmin(); renderTodos(); saveState(); }
}
function addUser() {
  const name  = document.getElementById('new-name').value.trim();
  const email = document.getElementById('new-email').value.trim();
  const role  = document.getElementById('new-role').value;
  const color = document.getElementById('new-color').value;
  if (!name || !email) { alert('Merci de remplir le nom et l\'email.'); return; }
  const initials = name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
  const defaultPin = Math.floor(1000 + Math.random() * 9000).toString();
  state.users.push({ id: Date.now(), name, initials, email, pin: defaultPin, role, color, photo: null, firstLogin: true });
  document.getElementById('new-name').value = '';
  document.getElementById('new-email').value = '';
  renderAdmin(); saveState();
  alert(`Invitation envoyée à ${email}\nPIN temporaire : ${defaultPin}`);
}
function removeUser(id) {
  if (!confirm('Retirer cet utilisateur ?')) return;
  state.users = state.users.filter(u => u.id !== id); renderAdmin(); saveState();
}

// ── CUSTOM MAIL STATUSES ──────────────────────────────────────────────────────

function renderStatusList() {
  const el = document.getElementById('status-list');
  if (!el) return;
  el.innerHTML = state.mailStatuses.map((s, i) => `
    <div class="custom-status-row">
      <input type="color" class="cs-color" value="${s.color}" onchange="updateStatus(${i},'color',this.value)">
      <input class="cs-name-input" value="${s.label}" onchange="updateStatus(${i},'label',this.value)">
      <span class="badge" style="background:${s.bg};color:${s.color}">${s.label}</span>
      ${i >= 4 ? `<button class="btn-sm" onclick="removeStatus(${i})">×</button>` : ''}
    </div>`).join('');
}
function updateStatus(i, field, val) {
  state.mailStatuses[i][field] = val;
  if (field === 'color') state.mailStatuses[i].bg = val + '22';
  renderStatusList(); renderMails(); saveState();
}
function addCustomStatus() {
  state.mailStatuses.push({ id:'custom_'+Date.now(), label:'Nouveau statut', color:'#6366F1', bg:'#EEF2FF' });
  renderStatusList(); renderMails(); saveState();
}
function removeStatus(i) { state.mailStatuses.splice(i, 1); renderStatusList(); renderMails(); saveState(); }

// ── MODAL ─────────────────────────────────────────────────────────────────────

function closeModal(id) { document.getElementById(id).style.display = 'none'; }

renderUserSelect();

document.addEventListener('keydown', function(e) {
  const stepPin = document.getElementById('step-pin');
  if (!stepPin || stepPin.style.display === 'none') return;
  if (e.key >= '0' && e.key <= '9') { e.preventDefault(); pinKey(e.key); }
  else if (e.key === 'Backspace')    { e.preventDefault(); pinDel(); }
  else if (e.key === 'Enter')        { e.preventDefault(); if (state.pin.length === 4) pinSubmit(); }
});
