export const APP_VERSION = '0.7.2';

// LocalStorage keys — intentionally obfuscated; do NOT rename (breaks existing user data)
export const STORAGE_KEY_SOUND = '_hv-m-s';
export const STORAGE_KEY_VERSION = '_hv-m-v';
export const STORAGE_KEY_GAME = '_hv-m-g';
export const STORAGE_KEY_HISTORY = '_hv-m-h';
export const STORAGE_KEY_NOTIFICATION = '_hv-m-n';

// Default grid size for the 9x9 (easy) difficulty
export const DEFAULT_GRID_SIZE = 9;

// Radius of the safe zone around the first-click cell during mine placement
export const MINE_EXCLUSION_ZONE = 2;

// Responsive layout breakpoints (px)
export const LAYOUT_HEIGHT_SM = 568;
export const LAYOUT_WIDTH_MD = 768;
export const LAYOUT_WIDTH_LG = 992;

// Column count above which the wide-grid compact layouts activate
export const LAYOUT_COLS_THRESHOLD = 16;

// Timings (ms)
export const TIMER_INTERVAL_MS = 1000;
export const SOUND_REVEAL_DELAY_MS = 250;
export const WIN_RESULT_DELAY_MS = 5000;
export const LOSE_RESULT_DELAY_MS = 4000;
export const LOADER_HIDE_DELAY_MS = 500;
