$('.column')
    .on('click', selectOrMoveTopDisc);

$('.difficulty-btn')
    .on('click', playGame);

let typeGame;
let score;

function selectOrMoveTopDisc() {
    var selectedColumns = $('#gameBoard').find('.column.selected');

    var $selectedColumn = (selectedColumns.length > 0) ? $(selectedColumns.get(0)) : null;
    var $thisColumn = $(this);

    if (!$selectedColumn) {
        if ($thisColumn.children('.disc:first-of-type').length < 1) {
            return;
        }
        $thisColumn.toggleClass('selected');
        return;
    }
    if ($selectedColumn.attr('id') === $thisColumn.attr('id')) {
        $thisColumn.toggleClass('selected');
        return;
    }


    if (_validMove($selectedColumn, $thisColumn)) {
        var $disc = $($selectedColumn.children('.disc:first-of-type').get(0)).detach();
        $thisColumn.prepend($disc);
        $selectedColumn.removeClass('selected');
        incrementCounter();
        _checkWin();
        checkStars();
    }
}

function _validMove($from, $to) {
    if ($to.children('.disc').length == 0) return true;
    if ($from.children('.disc').length == 0) return false;
    var $topOfTo = $($to.children('.disc:first-of-type').get(0));
    var $topOfFrom = $($from.children('.disc:first-of-type').get(0));
    return +$topOfTo.data('layer') > +$topOfFrom.data('layer');
}

function _checkWin() {
    if ($('#column1').children('.disc').length == 0 && $('#column2').children('.disc').length == 0) {
        $('#gameBoard').addClass('game-won');
        $('.column').fadeTo(1000, 0);
        $('#scoreboard').fadeTo(1000, 0);
        $('#win').fadeTo(1000, 1).css('zIndex', 20);

        checkStars();
    }
}

const starsCount = [
    [7, 10, 13],
    [15, 30, 45],
    [31, 50, 70],
    [63, 90, 120],
    [127, 170, 220],
    [255, 500, 1000],
    [511, 1200, 2400]
];

function playGame() {
    var layerCount = +$(this).data('layers');
    for (var i = 1; i <= layerCount; i++) {
        $('#column1').append('<div class="disc layer' + i + '" data-layer="' + i + '"> <span class="discnumber"> ' + i + '</span></div>');
    }
    $('#options').hide(function () {
        $('.column').fadeTo(100, 1);
        $('#scoreboard').fadeTo(100, 1);
    });
    $('#gameBoard').data('score', 0);

    typeGame = layerCount - 3;
}


function checkStars() {
    for (var i = 0; i < starsCount[typeGame].length; i++) {

        if (score > starsCount[typeGame][i]) {
            $('.star-container').each(function(index, v){
                $(this).find('.star').eq(i).removeClass('star-active');
                
            })
        }
    }
}

function incrementCounter() {
    score = $('#gameBoard').data('score') + 1;
    $('#gameBoard').data('score', score);
    $('.score-display').html(score);
}

function playAgain() {
    location.reload();
}

//stars