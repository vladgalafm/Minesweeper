import { minesAmount, difficultyOptions, historyTemplate, gameTemplate, cellTemplate } from './data';

describe( 'minesAmount', () => {
    test.each( [
        [ '9x9', 10 ],
        [ '9x16', 20 ],
        [ '16x16', 40 ],
        [ '30x16', 99 ],
    ] )( '%s has %i mines', ( difficulty, count ) => {
        expect( minesAmount[ difficulty ] )
            .toBe( count );
    } );
} );

describe( 'cellTemplate', () => {
    test( 'all boolean flags default to false', () => {
        const booleanFlags = [ 'opened', 'mine', 'flagged', 'defused', 'blownUp', 'rightFlagged', 'wrongFlagged' ];

        booleanFlags.forEach( ( flag ) => {
            expect( cellTemplate[ flag ] )
                .toBe( false );
        } );
    } );

    test( 'minesAround defaults to 0', () => {
        expect( cellTemplate.minesAround )
            .toBe( 0 );
    } );
} );

describe( 'historyTemplate', () => {
    test( 'all counters start at zero', () => {
        const zeroFields = [ 'gamesPlayed', 'gamesWon', 'longestWinStreak', 'longestLoseStreak', 'currentWinStreak', 'currentLoseStreak' ];

        zeroFields.forEach( ( field ) => {
            expect( historyTemplate[ field ] )
                .toBe( 0 );
        } );
    } );

    test( 'bestTime starts at Infinity', () => {
        expect( historyTemplate.bestTime )
            .toBe( Infinity );
    } );
} );

describe( 'difficultyOptions', () => {
    test( 'each option carries the correct mine count from minesAmount', () => {
        difficultyOptions.forEach( ( option ) => {
            expect( option.mines )
                .toBe( minesAmount[ option.value ] );
        } );
    } );

    test( 'option values match the colsxrows difficulty key format', () => {
        difficultyOptions.forEach( ( option ) => {
            expect( option.value )
                .toMatch( /^\d+x\d+$/u );
        } );
    } );
} );

describe( 'gameTemplate', () => {
    const mockCells = [
        [
            {
                opened: false,
            },
        ],
    ];

    test( 'passes cells through unchanged', () => {
        expect( gameTemplate( mockCells ).cells )
            .toBe( mockCells );
    } );

    test( 'defaults to 9x9 beginner difficulty', () => {
        const game = gameTemplate( mockCells );

        expect( game.difficulty )
            .toBe( '9x9' );
        expect( game.cols )
            .toBe( 9 );
        expect( game.rows )
            .toBe( 9 );
    } );

    test( 'starts in a not-yet-started state', () => {
        const game = gameTemplate( mockCells );

        expect( game.started )
            .toBe( false );
        expect( game.inProgress )
            .toBe( false );
        expect( game.result )
            .toBeNull();
    } );

    test( 'all counters initialise to zero', () => {
        const game = gameTemplate( mockCells );

        expect( game.timeProceed )
            .toBe( 0 );
        expect( game.flaggedAmount )
            .toBe( 0 );
        expect( game.safeCellsRevealed )
            .toBe( 0 );
    } );
} );
