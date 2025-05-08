export const eldritchPrefixes = [
  'Yog',
  'Zul',
  'Azath',
  'Nyarl',
  'Shub',
  'Thog',
  'Dag',
  'Tsath',
  'Glaak',
  'Cthy',
  'K’th',
  'Ubbo',
  'R’lye',
  'Xal',
  'Nodens',
  'Kez',
  'Ilth',
  'Chaug',
  'Zhar',
  'Thul',
];

export const eldritchMiddles = [
  'gnoth',
  'uggua',
  'lhu',
  'zog',
  'noth',
  'yrr',
  'zath',
  'raag',
  'tugg',
  'oth',
  'mogg',
  'llog',
  'irra',
  'nagg',
  'vhol',
  'qoth',
  'khru',
  'shagg',
  'gogg',
  'rru',
];

export const eldritchSuffixes = [
  'otep',
  'nath',
  'oth',
  'uugg',
  'zoth',
  'thul',
  'rath',
  'qag',
  'nogg',
  'graa',
  'onax',
  'uggoth',
  'cha',
  'llath',
  'yog',
  'ka',
  'nokk',
  'zor',
  'lugg',
  'ith',
];

export const eldritchTitlesNeutral = [
  'Cultist',
  'High Priest',
  'Seer',
  'Acolyte',
  'Harbinger',
  'Whisperer',
  'Voice of the Void',
  'Dreamer',
  'Bearer of the Glyph',
  'Eater of Sanity',
  'Voidspawn',
  'Speaker',
  'Warden of the Deep',
  'Faceless One',
  'Nameless',
  'Transcendent',
];

export const getRandom = <T>(arr: T[]): T => {
  const index = Math.floor(Math.random() * arr.length);
  return arr[index];
};

export const generateRandomName = (): string => {
  const addMiddle = Math.random() < 0.6;

  const randomPrefix = getRandom(eldritchPrefixes);
  const randomMiddle = addMiddle ? getRandom(eldritchMiddles) : undefined;
  const randomSuffix = getRandom(eldritchSuffixes);

  return `${randomPrefix}${randomMiddle ? randomMiddle : ''}${randomSuffix}`;
};
