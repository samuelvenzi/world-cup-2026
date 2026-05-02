import { useState, useEffect, useCallback, useMemo, createContext, useContext, useRef } from "react";

// ---------------------------------------------------------------------------
// Theme
// ---------------------------------------------------------------------------

const ThemeCtx = createContext(null);
const useTheme = () => useContext(ThemeCtx);

const DARK = {
  bg:               '#060a14',
  surface:          '#0d1322',
  surfaceDeep:      '#09101f',
  border:           '#1e2d4a',
  borderSubtle:     '#141f3a',
  text:             '#c8d8f0',
  textSub:          '#5a7aaa',
  textFaint:        '#3a5580',
  accent:           '#ffd700',
  accentDim:        '#c9a84c',
  success:          '#4ade80',
  successDeep:      '#1db954',
  info:             '#60a5fa',
  statCollected:    '#4ade80',
  statMissing:      '#8da4c0',
  statDupes:        '#60a5fa',
  statPct:          '#ffd700',
  headerBg:         'linear-gradient(180deg,#0b1225 0%,#060a14 100%)',
  headerBorder:     '#141f3a',
  progressTrack:    '#0a1020',
  tabActiveBg:      '#ffd700',
  tabActiveColor:   '#000',
  tabInactiveColor: '#5a7aaa',
  inputBg:          '#0d1322',
  inputText:        '#c8d8f0',
  inputFocus:       '#ffd700',
  secEmptyBg:       '#0d1322',
  secEmptyBorder:   '#1e2d4a',
  secFullBg:        'linear-gradient(135deg,#064023,#1db954)',
  secFullBorder:    '#1db954',
  secLabel:         '#ffd700',
  secCount:         '#5a7aaa',
  teamEmptyBg:      '#09101f',
  teamEmptyBorder:  '#141f3a',
  teamStartedBg:    '#0d1828',
  teamStartedBorder:'#1e3a70',
  teamFullBg:       'linear-gradient(145deg,#064023,#0f5c31,#1db954)',
  teamFullBorder:   '#1db954',
  teamNameFull:     '#a7f3c8',
  teamNameOther:    '#6080a0',
  teamCountEmpty:   '#1e3060',
  stickerEmptyBg:   '#0d1322',
  stickerEmptyBorder:'#1e2d4a',
  stickerEmptyCode: '#5a7aa0',
  stickerEmptyName: '#2e4060',
  stickerEmptyStar: '#ffd700',
  stickerHaveBg:    'linear-gradient(145deg,#064023,#0f7a3e,#1db954,#0f7a3e,#064023)',
  stickerHaveBorder:'#1db954',
  stickerHaveCode:  '#e6fff2',
  stickerHaveName:  '#5cb87e',
  stickerHaveStar:  '#fff',
  stickerSpecialBg:    'linear-gradient(145deg,#7a5c00,#c9952a,#ffd700,#c9952a,#7a5c00)',
  stickerSpecialBorder:'#ffd700',
  stickerSpecialCode:  '#fff8e1',
  stickerSpecialName:  '#c9a84c',
  stickerSpecialStar:  '#fff',
  extraBtnBg:       'rgba(0,0,0,0.35)',
  extraBtnColor:    '#fff',
  extraCountHave:   '#5cb87e',
  extraCountSpecial:'#c9a84c',
  extraCountDupe:   '#60a5fa',
  chipBg:           '#0d1322',
  chipBorder:       '#1e2d4a',
  chipColor:        '#4a6080',
  chipSpecialBorder:'#3a2800',
  chipSpecialColor: '#c9952a',
  dupeBg:           '#0d1322',
  dupeBorder:       '#1e2d4a',
  dupeBtnBg:        '#111827',
  dupeBtnColor:     '#fff',
  scrollThumb:      '#1e2d4f',
};

const LIGHT = {
  bg:               '#eef2fa',
  surface:          '#ffffff',
  surfaceDeep:      '#dde6f5',
  border:           '#bfceea',
  borderSubtle:     '#d4dff0',
  text:             '#0f1c38',
  textSub:          '#3a5580',
  textFaint:        '#6a86ac',
  accent:           '#b07800',
  accentDim:        '#8a5f00',
  success:          '#16a34a',
  successDeep:      '#15803d',
  info:             '#1d4ed8',
  statCollected:    '#16a34a',
  statMissing:      '#4a6090',
  statDupes:        '#1d4ed8',
  statPct:          '#b07800',
  headerBg:         'linear-gradient(180deg,#ffffff 0%,#eef2fa 100%)',
  headerBorder:     '#bfceea',
  progressTrack:    '#dde6f5',
  tabActiveBg:      '#1a2d5a',
  tabActiveColor:   '#ffd700',
  tabInactiveColor: '#4a6090',
  inputBg:          '#ffffff',
  inputText:        '#0f1c38',
  inputFocus:       '#1a2d5a',
  secEmptyBg:       '#ffffff',
  secEmptyBorder:   '#bfceea',
  secFullBg:        'linear-gradient(135deg,#dcfce7,#86efac)',
  secFullBorder:    '#16a34a',
  secLabel:         '#1a2d5a',
  secCount:         '#4a6090',
  teamEmptyBg:      '#f4f8ff',
  teamEmptyBorder:  '#d4dff0',
  teamStartedBg:    '#eff6ff',
  teamStartedBorder:'#93c5fd',
  teamFullBg:       'linear-gradient(145deg,#dcfce7,#bbf7d0,#86efac)',
  teamFullBorder:   '#16a34a',
  teamNameFull:     '#14532d',
  teamNameOther:    '#3a5580',
  teamCountEmpty:   '#9ab0cc',
  stickerEmptyBg:   '#f4f8ff',
  stickerEmptyBorder:'#bfceea',
  stickerEmptyCode: '#3a5580',
  stickerEmptyName: '#7a94b8',
  stickerEmptyStar: '#c8900a',
  stickerHaveBg:    'linear-gradient(145deg,#dcfce7,#bbf7d0,#86efac,#bbf7d0,#dcfce7)',
  stickerHaveBorder:'#16a34a',
  stickerHaveCode:  '#14532d',
  stickerHaveName:  '#15803d',
  stickerHaveStar:  '#14532d',
  stickerSpecialBg:    'linear-gradient(145deg,#fef9c3,#fde68a,#fbbf24,#fde68a,#fef9c3)',
  stickerSpecialBorder:'#d97706',
  stickerSpecialCode:  '#78350f',
  stickerSpecialName:  '#92400e',
  stickerSpecialStar:  '#92400e',
  extraBtnBg:       'rgba(0,0,0,0.10)',
  extraBtnColor:    '#1a2d5a',
  extraCountHave:   '#15803d',
  extraCountSpecial:'#92400e',
  extraCountDupe:   '#1d4ed8',
  chipBg:           '#f4f8ff',
  chipBorder:       '#bfceea',
  chipColor:        '#3a5580',
  chipSpecialBorder:'#d97706',
  chipSpecialColor: '#92400e',
  dupeBg:           '#ffffff',
  dupeBorder:       '#bfceea',
  dupeBtnBg:        '#eef2fa',
  dupeBtnColor:     '#1a2d5a',
  scrollThumb:      '#bfceea',
};

// ---------------------------------------------------------------------------
// Global styles
// ---------------------------------------------------------------------------

const FontStyle = ({ th }) => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@400;600;700&family=Barlow:wght@400;500&display=swap');
    * { box-sizing: border-box; }
    body { margin: 0; background: ${th.bg}; }
    ::-webkit-scrollbar { width: 5px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: ${th.scrollThumb}; border-radius: 3px; }
    .sc { transition: transform 0.12s ease, box-shadow 0.12s ease; cursor: pointer; }
    .sc:hover { transform: scale(1.05); box-shadow: 0 4px 12px rgba(0,0,0,0.18); }
    .tc { transition: transform 0.15s ease, border-color 0.15s ease; cursor: pointer; }
    .tc:hover { transform: translateY(-3px); }
    .pulse { animation: pulse 1.8s ease-in-out infinite; }
    @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
    @keyframes pop { 0%{transform:scale(1)} 50%{transform:scale(1.12)} 100%{transform:scale(1)} }
    .pop { animation: pop 0.2s ease; }
    input:focus { outline: none; border-color: ${th.inputFocus} !important; }
    button:active { transform: scale(0.95); }
  `}</style>
);

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const TEAMS = [
  // Group A
  { code: 'MEX', name: 'México',           flag: '🇲🇽', group: 'A' },
  { code: 'RSA', name: 'África do Sul',    flag: '🇿🇦', group: 'A' },
  { code: 'KOR', name: 'Coreia do Sul',    flag: '🇰🇷', group: 'A' },
  { code: 'CZE', name: 'República Checa',  flag: '🇨🇿', group: 'A' },
  // Group B
  { code: 'CAN', name: 'Canadá',           flag: '🇨🇦', group: 'B' },
  { code: 'BIH', name: 'Bósnia e Herz.',   flag: '🇧🇦', group: 'B' },
  { code: 'QAT', name: 'Catar',            flag: '🇶🇦', group: 'B' },
  { code: 'SUI', name: 'Suíça',            flag: '🇨🇭', group: 'B' },
  // Group C
  { code: 'BRA', name: 'Brasil',           flag: '🇧🇷', group: 'C' },
  { code: 'MAR', name: 'Marrocos',         flag: '🇲🇦', group: 'C' },
  { code: 'HAI', name: 'Haiti',            flag: '🇭🇹', group: 'C' },
  { code: 'SCO', name: 'Escócia',          flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', group: 'C' },
  // Group D
  { code: 'USA', name: 'EUA',              flag: '🇺🇸', group: 'D' },
  { code: 'PAR', name: 'Paraguai',         flag: '🇵🇾', group: 'D' },
  { code: 'AUS', name: 'Austrália',        flag: '🇦🇺', group: 'D' },
  { code: 'TUR', name: 'Turquia',          flag: '🇹🇷', group: 'D' },
  // Group E
  { code: 'GER', name: 'Alemanha',         flag: '🇩🇪', group: 'E' },
  { code: 'CUR', name: 'Curaçao',          flag: '🇨🇼', group: 'E' },
  { code: 'CIV', name: 'Costa do Marfim',  flag: '🇨🇮', group: 'E' },
  { code: 'ECU', name: 'Equador',          flag: '🇪🇨', group: 'E' },
  // Group F
  { code: 'NED', name: 'Holanda',          flag: '🇳🇱', group: 'F' },
  { code: 'JPN', name: 'Japão',            flag: '🇯🇵', group: 'F' },
  { code: 'SWE', name: 'Suécia',           flag: '🇸🇪', group: 'F' },
  { code: 'TUN', name: 'Tunísia',          flag: '🇹🇳', group: 'F' },
  // Group G
  { code: 'BEL', name: 'Bélgica',          flag: '🇧🇪', group: 'G' },
  { code: 'EGY', name: 'Egito',            flag: '🇪🇬', group: 'G' },
  { code: 'IRN', name: 'Irã',              flag: '🇮🇷', group: 'G' },
  { code: 'NZL', name: 'Nova Zelândia',    flag: '🇳🇿', group: 'G' },
  // Group H
  { code: 'ESP', name: 'Espanha',          flag: '🇪🇸', group: 'H' },
  { code: 'CPV', name: 'Cabo Verde',       flag: '🇨🇻', group: 'H' },
  { code: 'KSA', name: 'Arábia Saudita',   flag: '🇸🇦', group: 'H' },
  { code: 'URU', name: 'Uruguai',          flag: '🇺🇾', group: 'H' },
  // Group I
  { code: 'FRA', name: 'França',           flag: '🇫🇷', group: 'I' },
  { code: 'SEN', name: 'Senegal',          flag: '🇸🇳', group: 'I' },
  { code: 'IRQ', name: 'Iraque',           flag: '🇮🇶', group: 'I' },
  { code: 'NOR', name: 'Noruega',          flag: '🇳🇴', group: 'I' },
  // Group J
  { code: 'ARG', name: 'Argentina',        flag: '🇦🇷', group: 'J' },
  { code: 'ALG', name: 'Argélia',          flag: '🇩🇿', group: 'J' },
  { code: 'AUT', name: 'Áustria',          flag: '🇦🇹', group: 'J' },
  { code: 'JOR', name: 'Jordânia',         flag: '🇯🇴', group: 'J' },
  // Group K
  { code: 'POR', name: 'Portugal',         flag: '🇵🇹', group: 'K' },
  { code: 'UZB', name: 'Uzbequistão',      flag: '🇺🇿', group: 'K' },
  { code: 'COL', name: 'Colômbia',         flag: '🇨🇴', group: 'K' },
  { code: 'COD', name: 'Congo DR',         flag: '🇨🇩', group: 'K' },
  // Group L
  { code: 'ENG', name: 'Inglaterra',       flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', group: 'L' },
  { code: 'CRO', name: 'Croácia',          flag: '🇭🇷', group: 'L' },
  { code: 'GHA', name: 'Gana',             flag: '🇬🇭', group: 'L' },
  { code: 'PAN', name: 'Panamá',           flag: '🇵🇦', group: 'L' },
];

const SPECIAL_SECTIONS = [
  {
    id: 'fwc-intro', name: 'Copa do Mundo FIFA', icon: '🌍',
    stickers: [
      { code: '00',   name: 'Capa do Álbum',    isSpecial: true },
      ...Array.from({ length: 8 }, (_, i) => ({
        code: `FWC${i + 1}`, name: `Copa do Mundo ${i + 1}`, isSpecial: true,
      })),
    ],
  },
  {
    id: 'fwc-museum', name: 'Museu FIFA', icon: '🏛️',
    stickers: Array.from({ length: 11 }, (_, i) => ({
      code: `FWC${i + 9}`, name: `Museu FIFA ${i + 1}`, isSpecial: true,
    })),
  },
];

function getTeamStickers(code) {
  return [
    { code: `${code}1`, name: 'Escudo (Foil)', isSpecial: true },
    { code: `${code}2`, name: 'Foto da Equipe', isSpecial: false },
    ...Array.from({ length: 18 }, (_, i) => ({ code: `${code}${i + 3}`, name: `Jogador ${i + 1}`, isSpecial: false })),
  ];
}

const TOTAL = 980;

// ---------------------------------------------------------------------------
// Storage — direct localStorage
// ---------------------------------------------------------------------------

function loadStorage() {
  try { const raw = localStorage.getItem('copa2026v1'); return raw ? JSON.parse(raw) : {}; }
  catch { return {}; }
}
function saveStorage(data) {
  try { localStorage.setItem('copa2026v1', JSON.stringify(data)); } catch {}
}

// ---------------------------------------------------------------------------
// StickerCard
// ---------------------------------------------------------------------------

function StickerCard({ code, name, isSpecial, data, onToggle, onExtra }) {
  const th    = useTheme();
  const have  = data?.have  || false;
  const extra = data?.extra || 0;

  const bg         = have ? (isSpecial ? th.stickerSpecialBg      : th.stickerHaveBg)      : th.stickerEmptyBg;
  const border     = have ? (isSpecial ? th.stickerSpecialBorder   : th.stickerHaveBorder)   : th.stickerEmptyBorder;
  const codeColor  = have ? (isSpecial ? th.stickerSpecialCode     : th.stickerHaveCode)     : th.stickerEmptyCode;
  const nameColor  = have ? (isSpecial ? th.stickerSpecialName     : th.stickerHaveName)     : th.stickerEmptyName;
  const starColor  = have ? (isSpecial ? th.stickerSpecialStar     : th.stickerHaveStar)     : th.stickerEmptyStar;
  const checkColor = extra > 0 ? th.extraCountDupe : (isSpecial ? th.extraCountSpecial : th.extraCountHave);

  return (
    <div
      className="sc"
      onClick={() => onToggle(code)}
      style={{ background: bg, border: `1px solid ${border}`, borderRadius: 8, padding: '8px 6px 6px', position: 'relative', userSelect: 'none', minHeight: 72 }}
    >
      {isSpecial && (
        <div style={{ position: 'absolute', top: 4, right: 5, fontSize: 9, color: starColor, fontWeight: 900 }}>★</div>
      )}
      <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 13, color: codeColor, letterSpacing: 0.5 }}>{code}</div>
      <div style={{ fontSize: 9, lineHeight: 1.2, marginTop: 2, color: nameColor }}>{name}</div>
      {have && (
        <div style={{ marginTop: 7, display: 'flex', alignItems: 'center', gap: 3 }} onClick={e => e.stopPropagation()}>
          <button onClick={() => onExtra(code, -1)} style={{ width: 18, height: 18, background: th.extraBtnBg, border: 'none', borderRadius: 3, color: th.extraBtnColor, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}>−</button>
          <span style={{ fontSize: 11, fontWeight: 800, color: checkColor, minWidth: 20, textAlign: 'center', fontFamily: "'Barlow Condensed',sans-serif" }}>
            {extra > 0 ? `+${extra}` : '✓'}
          </span>
          <button onClick={() => onExtra(code, 1)} style={{ width: 18, height: 18, background: th.extraBtnBg, border: 'none', borderRadius: 3, color: th.extraBtnColor, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}>+</button>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// InfoModal
// ---------------------------------------------------------------------------

function InfoModal({ onClose }) {
  const th = useTheme();
  const items = [
    ['📌 Marcar figurinha',  'Clique no card para marcar como coletada. Clique novamente para desmarcar.'],
    ['+/− Repetidas',        'Com a figurinha marcada, use + e − para registrar quantas cópias repetidas você tem.'],
    ['★ Foil / Especial',    'Figurinhas com ★ são holográficas/foil. Ficam com fundo dourado quando coletadas.'],
    ['↓ Exportar',           'Salva todo o seu progresso como um arquivo .json no seu dispositivo.'],
    ['↑ Importar',           'Carrega um arquivo .json exportado anteriormente para restaurar o progresso.'],
    ['💾 Progresso',          'Salvo automaticamente neste dispositivo. Nenhuma conta ou internet necessária.'],
    ['☀️ / 🌙 Tema',         'Alterna entre tema claro e escuro. A preferência é salva automaticamente.'],
    ['↺ Reset',              'Apaga todo o progresso. Clique duas vezes para confirmar.'],
  ];
  return (
    <div
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.65)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{ background: th.surface, border: `1px solid ${th.border}`, borderRadius: 12, padding: 24, maxWidth: 460, width: '100%', color: th.text, fontFamily: "'Barlow',sans-serif", maxHeight: '80vh', overflowY: 'auto', position: 'relative' }}
      >
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: 12, right: 14, background: 'none', border: 'none', fontSize: 20, color: th.textSub, cursor: 'pointer', lineHeight: 1, padding: 0 }}
        >×</button>
        <div style={{ fontFamily: "'Bebas Neue',cursive", fontSize: 22, color: th.accent, letterSpacing: 2, marginBottom: 18 }}>
          Como Usar
        </div>
        {items.map(([title, desc]) => (
          <div key={title} style={{ marginBottom: 14 }}>
            <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 14, color: th.accent, marginBottom: 3 }}>{title}</div>
            <div style={{ fontSize: 13, color: th.textSub, lineHeight: 1.5 }}>{desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// App
// ---------------------------------------------------------------------------

export default function App() {
  const [themeKey, setThemeKey] = useState(() => {
    try { return localStorage.getItem('copa2026-theme') || 'light'; } catch { return 'light'; }
  });
  const th = themeKey === 'dark' ? DARK : LIGHT;

  useEffect(() => {
    try { localStorage.setItem('copa2026-theme', themeKey); } catch {}
  }, [themeKey]);

  const [stickers,     setStickers]     = useState({});
  const [loaded,       setLoaded]       = useState(false);
  const [activeTeam,   setActiveTeam]   = useState(null);
  const [tab,          setTab]          = useState('album');
  const [search,       setSearch]       = useState('');
  const [confirmReset, setConfirmReset] = useState(false);
  const [showInfo,     setShowInfo]     = useState(false);

  const fileRef = useRef(null);

  useEffect(() => {
    setStickers(loadStorage());
    setLoaded(true);
  }, []);
  useEffect(() => { if (loaded) saveStorage(stickers); }, [stickers, loaded]);

  const toggleHave = useCallback((code) => {
    setStickers(prev => {
      if (prev[code]?.have) { const next = { ...prev }; delete next[code]; return next; }
      return { ...prev, [code]: { have: true, extra: 0 } };
    });
  }, []);

  const addExtra = useCallback((code, delta) => {
    setStickers(prev => {
      const cur = prev[code] || { have: true, extra: 0 };
      return { ...prev, [code]: { ...cur, extra: Math.max(0, (cur.extra || 0) + delta) } };
    });
  }, []);

  const collected  = useMemo(() => Object.values(stickers).filter(s => s?.have).length, [stickers]);
  const totalDupes = useMemo(() => Object.values(stickers).reduce((a, s) => a + (s?.extra || 0), 0), [stickers]);
  const pct        = Math.round((collected / TOTAL) * 100);

  const filteredTeams = useMemo(() =>
    TEAMS.filter(t =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.code.toLowerCase().includes(search.toLowerCase()) ||
      `grupo ${t.group}`.toLowerCase().includes(search.toLowerCase())
    ),
    [search]
  );

  const teamCompletion = useCallback((code) => {
    const s = getTeamStickers(code);
    return { done: s.filter(st => stickers[st.code]?.have).length, total: 20 };
  }, [stickers]);

  const allStickers = useMemo(() => [
    ...SPECIAL_SECTIONS.flatMap(sec => sec.stickers.map(s => ({ ...s, section: sec.name, icon: sec.icon }))),
    ...TEAMS.flatMap(team => getTeamStickers(team.code).map(s => ({ ...s, section: team.name, icon: team.flag }))),
  ], []);

  const missing = useMemo(() => allStickers.filter(s => !stickers[s.code]?.have), [allStickers, stickers]);

  const missingGrouped = useMemo(() => {
    const g = {};
    missing.forEach(s => { if (!g[s.section]) g[s.section] = { icon: s.icon, items: [] }; g[s.section].items.push(s); });
    return g;
  }, [missing]);

  const dupes = useMemo(() =>
    Object.entries(stickers).filter(([, s]) => s?.have && s?.extra > 0).sort((a, b) => b[1].extra - a[1].extra),
    [stickers]
  );

  const handleReset = () => {
    if (confirmReset) { setStickers({}); setConfirmReset(false); }
    else { setConfirmReset(true); setTimeout(() => setConfirmReset(false), 3000); }
  };

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(stickers, null, 2)], { type: 'application/json' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href = url;
    a.download = 'copa2026-figurinhas.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target.result);
        if (typeof data === 'object' && data !== null) setStickers(data);
      } catch {}
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const F = { fontFamily: "'Barlow',sans-serif" };

  if (!loaded) return (
    <ThemeCtx.Provider value={th}>
      <FontStyle th={th} />
      <div style={{ background: th.bg, minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
        <div style={{ fontSize: 48 }} className="pulse">⚽</div>
        <div style={{ color: th.accent, fontFamily: "'Bebas Neue',cursive", fontSize: 20, letterSpacing: 3 }}>Carregando...</div>
      </div>
    </ThemeCtx.Provider>
  );

  return (
    <ThemeCtx.Provider value={th}>
      <FontStyle th={th} />
      <div style={{ background: th.bg, minHeight: '100vh', color: th.text, ...F }}>
        <input ref={fileRef} type="file" accept=".json" style={{ display: 'none' }} onChange={handleImport} />

        {/* ── HEADER ── */}
        <div style={{ background: th.headerBg, borderBottom: `1px solid ${th.headerBorder}`, position: 'sticky', top: 0, zIndex: 100, padding: '12px 16px 0' }}>
          <div style={{ maxWidth: 1080, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
              <div>
                <div style={{ fontFamily: "'Bebas Neue',cursive", fontSize: 24, letterSpacing: 3, color: th.accent, lineHeight: 1 }}>⚽ Copa do Mundo 2026</div>
                <div style={{ fontSize: 9, color: th.textFaint, letterSpacing: 2, textTransform: 'uppercase' }}>Álbum Panini · 980 Figurinhas · 48 Seleções</div>
              </div>
              <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
                {[
                  [collected,         'TENHO',     th.statCollected],
                  [TOTAL - collected, 'FALTAM',    th.statMissing],
                  [totalDupes,        'REPETIDAS', th.statDupes],
                  [`${pct}%`,         'COMPLETO',  th.statPct],
                ].map(([v, l, c]) => (
                  <div key={l} style={{ textAlign: 'center', minWidth: 44 }}>
                    <div style={{ fontFamily: "'Bebas Neue',cursive", fontSize: 22, color: c, lineHeight: 1 }}>{v}</div>
                    <div style={{ fontSize: 9, color: th.textFaint, letterSpacing: 1.5 }}>{l}</div>
                  </div>
                ))}
                {/* action buttons */}
                <button onClick={() => setShowInfo(true)} title="Instruções"
                  style={{ width: 30, height: 30, background: 'transparent', border: `1px solid ${th.border}`, borderRadius: 6, fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0, color: th.textSub }}>ℹ</button>
                <button onClick={handleExport} title="Exportar progresso"
                  style={{ padding: '4px 10px', fontSize: 11, background: 'transparent', border: `1px solid ${th.border}`, borderRadius: 5, color: th.textSub, cursor: 'pointer', ...F }}>↓ Exportar</button>
                <button onClick={() => fileRef.current?.click()} title="Importar progresso"
                  style={{ padding: '4px 10px', fontSize: 11, background: 'transparent', border: `1px solid ${th.border}`, borderRadius: 5, color: th.textSub, cursor: 'pointer', ...F }}>↑ Importar</button>
                <button onClick={() => setThemeKey(k => k === 'dark' ? 'light' : 'dark')} title="Alternar tema"
                  style={{ width: 30, height: 30, background: 'transparent', border: `1px solid ${th.border}`, borderRadius: 6, fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}>
                  {themeKey === 'dark' ? '☀️' : '🌙'}
                </button>
                <button onClick={handleReset}
                  style={{ padding: '4px 10px', fontSize: 11, background: confirmReset ? '#7f1d1d' : 'transparent', border: `1px solid ${confirmReset ? '#ef4444' : th.border}`, borderRadius: 5, color: confirmReset ? '#fca5a5' : th.textFaint, cursor: 'pointer', ...F, transition: 'all 0.2s' }}>
                  {confirmReset ? '⚠️ Confirmar?' : '↺ Reset'}
                </button>
              </div>
            </div>
            <div style={{ margin: '10px 0 0', height: 3, background: th.progressTrack, borderRadius: 2, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${pct}%`, background: pct === 100 ? th.accent : `linear-gradient(90deg,${th.accent},${th.success})`, borderRadius: 2, transition: 'width 0.4s ease' }} />
            </div>
            <div style={{ display: 'flex', gap: 2, marginTop: 10 }}>
              {[['album', '📋 Álbum'], ['missing', `❌ Faltam (${TOTAL - collected})`], ['dupes', `🔁 Repetidas (${totalDupes})`]].map(([id, label]) => (
                <button key={id} onClick={() => { setTab(id); setActiveTeam(null); }}
                  style={{ padding: '8px 14px', fontSize: 12, background: tab === id ? th.tabActiveBg : 'transparent', color: tab === id ? th.tabActiveColor : th.tabInactiveColor, border: 'none', borderBottom: `2px solid ${tab === id ? th.tabActiveBg : 'transparent'}`, borderRadius: '6px 6px 0 0', fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, letterSpacing: 0.5, cursor: 'pointer', transition: 'all 0.15s' }}
                >{label}</button>
              ))}
            </div>
          </div>
        </div>

        {/* ── CONTENT ── */}
        <div style={{ maxWidth: 1080, margin: '0 auto', padding: '16px 16px 60px' }}>

          {/* ALBUM — grid */}
          {tab === 'album' && !activeTeam && (
            <div>
              <input placeholder="🔍 Buscar seleção ou grupo..." value={search} onChange={e => setSearch(e.target.value)}
                style={{ width: '100%', maxWidth: 300, padding: '8px 12px', background: th.inputBg, border: `1px solid ${th.border}`, borderRadius: 8, color: th.inputText, fontSize: 13, marginBottom: 14, ...F, transition: 'border-color 0.2s' }} />

              <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
                {SPECIAL_SECTIONS.map(sec => {
                  const done = sec.stickers.filter(s => stickers[s.code]?.have).length;
                  const full = done === sec.stickers.length;
                  return (
                    <div key={sec.id} className="tc" onClick={() => setActiveTeam('__' + sec.id)}
                      style={{ background: full ? th.secFullBg : th.secEmptyBg, border: `1px solid ${full ? th.secFullBorder : th.secEmptyBorder}`, borderRadius: 10, padding: '10px 16px', minWidth: 130 }}>
                      <div style={{ fontSize: 20, marginBottom: 4 }}>{sec.icon}</div>
                      <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 13, color: th.secLabel }}>{sec.name}</div>
                      <div style={{ fontSize: 11, color: th.secCount, marginTop: 2 }}>{done}/{sec.stickers.length}</div>
                      <div style={{ height: 3, background: th.progressTrack, borderRadius: 2, marginTop: 6, overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${(done / sec.stickers.length) * 100}%`, background: th.accent, borderRadius: 2 }} />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(128px,1fr))', gap: 10 }}>
                {filteredTeams.map(team => {
                  const { done, total } = teamCompletion(team.code);
                  const full    = done === total;
                  const started = done > 0;
                  return (
                    <div key={team.code} className="tc" onClick={() => setActiveTeam(team.code)}
                      style={{ background: full ? th.teamFullBg : started ? th.teamStartedBg : th.teamEmptyBg, border: `1px solid ${full ? th.teamFullBorder : started ? th.teamStartedBorder : th.teamEmptyBorder}`, borderRadius: 10, padding: 12 }}>
                      <div style={{ fontSize: 30, textAlign: 'center', marginBottom: 2 }}>{team.flag}</div>
                      <div style={{ fontSize: 9, color: th.textFaint, textAlign: 'center', letterSpacing: 1, fontFamily: "'Barlow Condensed',sans-serif", marginBottom: 2 }}>GRUPO {team.group}</div>
                      <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 12, color: full ? th.teamNameFull : th.teamNameOther, textAlign: 'center', lineHeight: 1.2 }}>{team.name}</div>
                      <div style={{ fontFamily: "'Bebas Neue',cursive", fontSize: 16, color: full ? th.success : done > 0 ? th.accent : th.teamCountEmpty, textAlign: 'center', marginTop: 4 }}>{done}/{total}</div>
                      <div style={{ height: 3, background: th.progressTrack, borderRadius: 2, marginTop: 6, overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${(done / total) * 100}%`, background: full ? th.success : th.accent, borderRadius: 2, transition: 'width 0.3s' }} />
                      </div>
                    </div>
                  );
                })}
              </div>
              {filteredTeams.length === 0 && <div style={{ textAlign: 'center', padding: 40, color: th.textFaint, fontSize: 14 }}>Nenhuma seleção encontrada</div>}
            </div>
          )}

          {/* ALBUM — team detail */}
          {tab === 'album' && activeTeam && !activeTeam.startsWith('__') && (() => {
            const team = TEAMS.find(t => t.code === activeTeam);
            const ts   = getTeamStickers(activeTeam);
            const done = ts.filter(s => stickers[s.code]?.have).length;
            return (
              <div>
                <button onClick={() => setActiveTeam(null)} style={{ background: 'none', border: 'none', color: th.accent, cursor: 'pointer', fontSize: 13, marginBottom: 14, ...F, padding: 0 }}>← Voltar para seleções</button>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16, flexWrap: 'wrap' }}>
                  <div style={{ fontSize: 48 }}>{team.flag}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: "'Bebas Neue',cursive", fontSize: 26, color: th.accent, letterSpacing: 1 }}>{team.name}</div>
                    <div style={{ fontSize: 11, color: th.textSub, marginTop: 2 }}>
                      Grupo {team.group} · {done}/20 · Códigos: <span style={{ color: th.info }}>{team.code}1 – {team.code}20</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }}>
                      <div style={{ flex: 1, maxWidth: 200, height: 4, background: th.progressTrack, borderRadius: 2, overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${(done / 20) * 100}%`, background: done === 20 ? th.success : th.accent, borderRadius: 2, transition: 'width 0.3s' }} />
                      </div>
                      {done === 20 && <span style={{ fontFamily: "'Bebas Neue',cursive", fontSize: 14, color: th.success, letterSpacing: 2 }}>✓ COMPLETO</span>}
                    </div>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(98px,1fr))', gap: 8 }}>
                  {ts.map(s => <StickerCard key={s.code} {...s} data={stickers[s.code]} onToggle={toggleHave} onExtra={addExtra} />)}
                </div>
              </div>
            );
          })()}

          {/* ALBUM — special section detail */}
          {tab === 'album' && activeTeam?.startsWith('__') && (() => {
            const sec  = SPECIAL_SECTIONS.find(s => s.id === activeTeam.slice(2));
            const done = sec.stickers.filter(s => stickers[s.code]?.have).length;
            return (
              <div>
                <button onClick={() => setActiveTeam(null)} style={{ background: 'none', border: 'none', color: th.accent, cursor: 'pointer', fontSize: 13, marginBottom: 14, ...F, padding: 0 }}>← Voltar</button>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                  <div style={{ fontSize: 40 }}>{sec.icon}</div>
                  <div>
                    <div style={{ fontFamily: "'Bebas Neue',cursive", fontSize: 24, color: th.accent, letterSpacing: 1 }}>{sec.name}</div>
                    <div style={{ fontSize: 11, color: th.textSub }}>{done}/{sec.stickers.length} figurinhas</div>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(98px,1fr))', gap: 8 }}>
                  {sec.stickers.map(s => <StickerCard key={s.code} {...s} data={stickers[s.code]} onToggle={toggleHave} onExtra={addExtra} />)}
                </div>
              </div>
            );
          })()}

          {/* MISSING tab */}
          {tab === 'missing' && (
            <div>
              {missing.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                  <div style={{ fontSize: 64, marginBottom: 16 }}>🏆</div>
                  <div style={{ fontFamily: "'Bebas Neue',cursive", fontSize: 32, color: th.accent, letterSpacing: 3 }}>Álbum Completo!</div>
                  <div style={{ color: th.textSub, marginTop: 8 }}>Todas as 980 figurinhas coletadas!</div>
                </div>
              ) : (
                <>
                  <div style={{ color: th.textSub, fontSize: 12, marginBottom: 16 }}>
                    {missing.length} figurinhas faltando · Clique no código para marcar como obtida
                  </div>
                  {Object.entries(missingGrouped).map(([section, { icon, items }]) => (
                    <div key={section} style={{ marginBottom: 20 }}>
                      <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 13, color: th.accent, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6, letterSpacing: 0.5 }}>
                        <span>{icon}</span><span>{section}</span>
                        <span style={{ color: th.textFaint, fontWeight: 400 }}>({items.length} faltando)</span>
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                        {items.map(s => (
                          <div key={s.code} onClick={() => toggleHave(s.code)} className="sc"
                            style={{ background: th.chipBg, border: `1px solid ${s.isSpecial ? th.chipSpecialBorder : th.chipBorder}`, borderRadius: 6, padding: '4px 10px', fontSize: 12, color: s.isSpecial ? th.chipSpecialColor : th.chipColor, fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, letterSpacing: 0.5 }}>
                            {s.isSpecial ? '★ ' : ''}{s.code}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          )}

          {/* DUPES tab */}
          {tab === 'dupes' && (
            <div>
              {dupes.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 20px', color: th.textSub, fontSize: 14 }}>
                  <div style={{ fontSize: 40, marginBottom: 12 }}>🔁</div>
                  Nenhuma figurinha repetida ainda.<br />
                  <span style={{ fontSize: 12, color: th.textFaint }}>Use os botões +/− nas figurinhas já coletadas para registrar repetidas.</span>
                </div>
              ) : (
                <>
                  <div style={{ color: th.textSub, fontSize: 12, marginBottom: 16 }}>{dupes.length} tipos · {totalDupes} total de repetidas</div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(130px,1fr))', gap: 10 }}>
                    {dupes.map(([code, data]) => {
                      const teamCode = code.replace(/\d+$/, '');
                      const team = TEAMS.find(t => t.code === teamCode);
                      return (
                        <div key={code} style={{ background: th.dupeBg, border: `1px solid ${th.dupeBorder}`, borderRadius: 10, padding: 12 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                            {team && <span style={{ fontSize: 18 }}>{team.flag}</span>}
                            <div>
                              <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 15, color: th.info, letterSpacing: 0.5 }}>{code}</div>
                              {team && <div style={{ fontSize: 10, color: th.textFaint }}>{team.name}</div>}
                            </div>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <button onClick={() => addExtra(code, -1)} style={{ width: 26, height: 26, background: th.dupeBtnBg, border: 'none', borderRadius: 5, color: th.dupeBtnColor, cursor: 'pointer', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}>−</button>
                            <span style={{ fontFamily: "'Bebas Neue',cursive", fontSize: 24, color: th.info, minWidth: 36, textAlign: 'center', letterSpacing: 1 }}>+{data.extra}</span>
                            <button onClick={() => addExtra(code, 1)} style={{ width: 26, height: 26, background: th.dupeBtnBg, border: 'none', borderRadius: 5, color: th.dupeBtnColor, cursor: 'pointer', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}>+</button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
        <div style={{ textAlign: 'center', padding: '32px 16px 20px', fontSize: 11, color: th.textFaint, fontFamily: "'Barlow',sans-serif", lineHeight: 1.6 }}>
          Ferramenta não oficial criada por fãs · Não afiliada à Panini ou à FIFA
        </div>
      </div>

      {showInfo && <InfoModal onClose={() => setShowInfo(false)} />}
    </ThemeCtx.Provider>
  );
}
