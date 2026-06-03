import React from 'react';
import { GameCell } from '../GameCell/GameCell';

export function GameColumn( {
    started,
    rows,
    colIndex,
    cellsCol,
    clickOnCellHandler,
    toggleFlagOnCellHandler,
} ) {
    // eslint-disable-next-line prefer-spread
    const rowsArray = Array.apply( null, {
        length: rows,
    } );

    return (
        <div className='game-column'>
            { rowsArray.map( ( item, index ) => (
                <GameCell
                    // eslint-disable-next-line react/no-array-index-key
                    key={ index }
                    started={ started }
                    colIndex={ colIndex }
                    rowIndex={ index }
                    cell={ cellsCol[ index ] }
                    clickOnCellHandler={ () => clickOnCellHandler( colIndex, index ) }
                    toggleFlagOnCellHandler={ ( e ) => {
                        e.preventDefault();
                        toggleFlagOnCellHandler( colIndex, index );
                    } }
                />
            ) ) }
        </div>
    );
}
