'use strict';

$( '#diagram' ).load( './diagram.html' );

const
    questions = [
        {
            question: '',
            opts: {
                A: 'ok',
                B: 'ok',
                C: 'ok',
                D: 'ok'
            },
            answer: 'A',
            answered: false,
            correct: false
        }
    ],
    manager   = {
        _score: 0,
        get score() {
            return manager._score;
        },
        set score( v ) {
            $( '#score' ).text( v + '%' );
            manager._score = v;
        }
    };

function calculateScore() {
    const correct = questions.reduce( ( r, i ) => {
        if( i.correct )
            r++;
        return r;
    }, 0 );

    manager.score = ( correct / questions.length ) * 100;
}

$( '#questionModal' ).on( 'show.bs.modal', e => {
    const
        button = $( e.relatedTarget ),
        qnum   = button.data( 'q' ),
        qblock = questions[ qnum ],
        qopts  = Object.keys( qblock.opts );

    $( '.modal-title' ).text( 'Question ' + ( qnum + 1 ) );

    $( '.modal-body' ).html( '' );

    console.log( qblock );

    for( let i = 0; i < qopts.length; ++i ) {
        const opt = $( '<button>' );

        opt.text( `${qopts[ i ]}: ${qblock.opts[ qopts[ i ] ]}` );
        opt.addClass( 'btn btn-outline-primary btn-block' );

        opt.click(
            () => {
                opt.removeClass( 'btn-outline-primary' );

                if( qopts[ i ] === qblock.answer )
                    opt.addClass( 'btn-outline-success' );
                else
                    opt.addClass( 'btn-outline-danger' );

                if( !qblock.answered ) {
                    if( qopts[ i ] === qblock.answer )
                        qblock.correct = true;

                    calculateScore();
                    qblock.answered = true;
                }
            }
        );

        $( '.modal-body' ).append( opt );
    }
} );

for( let i = 0; i < questions.length; ++i ) {
    $( '#questionBar' ).append(
        `<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#questionModal" data-q="${i}">Question ${i + 1}</button>`
    );
}