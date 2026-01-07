export const blocksData = [
  { id: 1, label: 'Bloco 1', count: 12 },
  { id: 2, label: 'Bloco 2', count: 8 },
  { id: 3, label: 'Bloco 3', count: 10 },
  { id: 4, label: 'Bloco 4', count: 10 },
  { id: 5, label: 'Bloco 5', count: 10 },
  { id: 6, label: 'Bloco 6', count: 10 },
  { id: 7, label: 'Bloco 7', count: 9 },
  { id: 8, label: 'Bloco 8', count: 8, hasClock: true },
  { id: 9, label: 'Bloco 9', count: 10 },
  { id: 10, label: 'Bloco 10', count: 10 },
  { id: 11, label: 'Bloco 11', count: 10 },
  { id: 12, label: 'Bloco 12', count: 10 },
];

export const specialtiesData = [
  { id: 1, label: 'Cirurgia' },
  { id: 2, label: 'Clínica Médica' },
  { id: 3, label: 'GO' },
  { id: 4, label: 'Pediatria' },
  { id: 5, label: 'Preventiva' },
  { id: 6, label: 'Adrenal' },
  { id: 7, label: 'Diabetes' },
  { id: 8, label: 'Endocrino' },
];

export const sampleCofExpressItems = [
  {
    id: 1,
    title: 'Trauma Abdominal específico - PARTE 1',
    duration: '7:13',
    type: 'express',
    isCompleted: true,
  }
];

export const sampleAulasPlaylist = [
  {
    id: 2,
    title: 'Trauma Trauma Abdominal específico - PARTE 2',
    duration: '31:15',
    type: 'aula',
    isCompleted: false,
    isCurrent: true
  },
  {
    id: 3,
    title: 'Definição e Classificação',
    duration: '15:20',
    type: 'aula',
    isCompleted: false,
    isLocked: true
  }
];

export const sampleAulas = [
  {
    id: 1,
    title: 'Introdução às Artrites e Artrite Reumatoide (AR)',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=400',
    duration: '01:08:17',
    aulasCount: 3,
    questoesCount: 16,
    flashcardsCount: 7,
    isWatching: true
  },
  {
    id: 2,
    title: 'Espondiloartrites',
    imageUrl: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=400',
    duration: '01:05:41',
    aulasCount: 2,
    questoesCount: 10,
    flashcardsCount: 8,
    isWatching: false
  },
  {
    id: 3,
    title: 'Outros tipos de diabetes',
    imageUrl: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=400',
    duration: '37:52',
    aulasCount: 2,
    questoesCount: 6,
    flashcardsCount: 8,
    isWatching: false
  }
];