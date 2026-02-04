export const VIEW_MODES = {
    HOME: 'home_view',
    PLAY: 'play_view',
    LIBRARY: 'library_view',
};

export const GAME_LEVELS = {
    EASY: 'easy',
    NORMAL: 'normal',
    HARD: 'hard',
};

export const LEVEL_CONFIG = {
    [GAME_LEVELS.EASY]: 5,
    [GAME_LEVELS.NORMAL]: 10,
    [GAME_LEVELS.HARD]: 15,
};

export const GAME_STATE = {
    ACTIVE: 0,
    VICTORY: 1,
    DEFEAT: 2,
};