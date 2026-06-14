import {
    APP_VERSION,
    STORAGE_KEY_SOUND,
    STORAGE_KEY_VERSION,
    STORAGE_KEY_GAME,
    STORAGE_KEY_HISTORY,
    STORAGE_KEY_NOTIFICATION,
    DEFAULT_GRID_SIZE,
    MINE_EXCLUSION_ZONE,
    LAYOUT_HEIGHT_SM,
    LAYOUT_WIDTH_MD,
    LAYOUT_WIDTH_LG,
    LAYOUT_COLS_THRESHOLD,
    TIMER_INTERVAL_MS,
    SOUND_REVEAL_DELAY_MS,
    WIN_RESULT_DELAY_MS,
    LOSE_RESULT_DELAY_MS,
    LOADER_HIDE_DELAY_MS,
} from './constants';

describe( 'constants', () => {
    describe( 'APP_VERSION', () => {
        it( 'is a non-empty string', () => {
            expect( typeof APP_VERSION )
                .toBe( 'string' );
            expect( APP_VERSION.length )
                .toBeGreaterThan( 0 );
        } );

        it( 'matches semver format', () => {
            expect( APP_VERSION )
                .toMatch( /^\d+\.\d+\.\d+$/u );
        } );
    } );

    describe( 'LocalStorage keys', () => {
        it( 'STORAGE_KEY_SOUND has the correct obfuscated value', () => {
            expect( STORAGE_KEY_SOUND )
                .toBe( '_hv-m-s' );
        } );

        it( 'STORAGE_KEY_VERSION has the correct obfuscated value', () => {
            expect( STORAGE_KEY_VERSION )
                .toBe( '_hv-m-v' );
        } );

        it( 'STORAGE_KEY_GAME has the correct obfuscated value', () => {
            expect( STORAGE_KEY_GAME )
                .toBe( '_hv-m-g' );
        } );

        it( 'STORAGE_KEY_HISTORY has the correct obfuscated value', () => {
            expect( STORAGE_KEY_HISTORY )
                .toBe( '_hv-m-h' );
        } );

        it( 'STORAGE_KEY_NOTIFICATION has the correct obfuscated value', () => {
            expect( STORAGE_KEY_NOTIFICATION )
                .toBe( '_hv-m-n' );
        } );

        it( 'all storage keys are unique', () => {
            const keys = [
                STORAGE_KEY_SOUND,
                STORAGE_KEY_VERSION,
                STORAGE_KEY_GAME,
                STORAGE_KEY_HISTORY,
                STORAGE_KEY_NOTIFICATION,
            ];
            const unique = new Set( keys );

            expect( unique.size )
                .toBe( keys.length );
        } );
    } );

    describe( 'grid constants', () => {
        it( 'DEFAULT_GRID_SIZE is 9', () => {
            expect( DEFAULT_GRID_SIZE )
                .toBe( 9 );
        } );

        it( 'MINE_EXCLUSION_ZONE is 2', () => {
            expect( MINE_EXCLUSION_ZONE )
                .toBe( 2 );
        } );
    } );

    describe( 'layout breakpoints', () => {
        it( 'LAYOUT_HEIGHT_SM is 568', () => {
            expect( LAYOUT_HEIGHT_SM )
                .toBe( 568 );
        } );

        it( 'LAYOUT_WIDTH_MD is 768', () => {
            expect( LAYOUT_WIDTH_MD )
                .toBe( 768 );
        } );

        it( 'LAYOUT_WIDTH_LG is 992', () => {
            expect( LAYOUT_WIDTH_LG )
                .toBe( 992 );
        } );

        it( 'LAYOUT_WIDTH_LG is larger than LAYOUT_WIDTH_MD', () => {
            expect( LAYOUT_WIDTH_LG )
                .toBeGreaterThan( LAYOUT_WIDTH_MD );
        } );

        it( 'LAYOUT_COLS_THRESHOLD is 16', () => {
            expect( LAYOUT_COLS_THRESHOLD )
                .toBe( 16 );
        } );
    } );

    describe( 'timing constants', () => {
        it( 'TIMER_INTERVAL_MS is 1000', () => {
            expect( TIMER_INTERVAL_MS )
                .toBe( 1000 );
        } );

        it( 'SOUND_REVEAL_DELAY_MS is 250', () => {
            expect( SOUND_REVEAL_DELAY_MS )
                .toBe( 250 );
        } );

        it( 'WIN_RESULT_DELAY_MS is 5000', () => {
            expect( WIN_RESULT_DELAY_MS )
                .toBe( 5000 );
        } );

        it( 'LOSE_RESULT_DELAY_MS is 4000', () => {
            expect( LOSE_RESULT_DELAY_MS )
                .toBe( 4000 );
        } );

        it( 'LOADER_HIDE_DELAY_MS is 500', () => {
            expect( LOADER_HIDE_DELAY_MS )
                .toBe( 500 );
        } );

        it( 'WIN_RESULT_DELAY_MS is longer than LOSE_RESULT_DELAY_MS', () => {
            expect( WIN_RESULT_DELAY_MS )
                .toBeGreaterThan( LOSE_RESULT_DELAY_MS );
        } );

        it( 'all timing constants are positive numbers', () => {
            [
                TIMER_INTERVAL_MS,
                SOUND_REVEAL_DELAY_MS,
                WIN_RESULT_DELAY_MS,
                LOSE_RESULT_DELAY_MS,
                LOADER_HIDE_DELAY_MS,
            ].forEach( ( t ) => {
                expect( typeof t )
                    .toBe( 'number' );
                expect( t )
                    .toBeGreaterThan( 0 );
            } );
        } );
    } );
} );
