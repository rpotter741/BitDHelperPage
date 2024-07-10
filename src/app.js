import { gangData } from "../asset/data.js";

$(function() {
    var $app = $('#app');
    $app.html('');

    var $header = $('<div class="header"></div>')
    $header.appendTo($app);

    var $headerText = $('<div class="headerText"></div>');
    $headerText.text('DREAD GULCH INFORMATION PAMPHLET');
    $headerText.appendTo($header);

    var $content = $('<div class="content"></div>')
    $content.appendTo($app);

    var renderRegions = function() {
        $content.html('');

        var $regionHeader = $('<div class="contentHeader"></div>');
        $regionHeader.text('FACTIONS OF INTEREST');
        $regionHeader.appendTo($content);

        var regions = Object.keys(gangData);
        regions.forEach(function(region) {

            var $card = $(`<div class="card" id="${region}"></div>`)
            $card.appendTo($content);

            var $titleRow = $('<div class="regionTitleRow"></div>')
            $titleRow.appendTo($card);

            var $expandBtn = $('<button class="regionExpandBtn"></button>')
            $expandBtn.html('&#8594');
            $expandBtn.count = 0;
            $expandBtn.appendTo($titleRow)
            $card.on('click', function() {
                if ($expandBtn.count % 2 === 0) {
                    $expandBtn.html('&#8595');
                    $expandBtn.count++;
                } else {
                    $expandBtn.html('&#8594')
                    $expandBtn.count++
                }
            })

            var $title = $('<div class="cardTitle"></div>')
            $title.text(`${region}`);
            $title.appendTo($titleRow);

            renderGangs($card);


        })
            diceRoller($app);
    }

    var renderGangs = function(parent) {
        var $table = $('<div class="headerRow hidden"></div>')
        $table.css({
            'width': '95%',
            'margin-left': '1rem'
        })
        $table.appendTo(parent);

        var $gangText = $('<div class="headerTitleRow"></div>')
        $gangText.text('Name')
        $gangText.appendTo($table)

        var $tierText = $('<div class="tierText"></div>')
        $tierText.text('Tier');
        $tierText.appendTo($table);

        var $holdText = $('<div class="holdText"></div>')
        $holdText.text('Hold');
        $holdText.appendTo($table);

        var $statusText = $('<div class="statusText"></div>');
        $statusText.text('Status');
        $statusText.appendTo($table);


        var gangList = gangData[parent[0].id];
        gangList.forEach(function(gang) {
            var card = $(`<div class="subCard hidden ${parent[0].id}"></div>`)
            card.appendTo(parent);

            var $titleRow = $('<div class="bigTitle"></div>');
            $titleRow.appendTo(card);

            var $subTitle = $('<div class="titleRow"></div>')
            $subTitle.appendTo($titleRow);

            var $expandBtn = $('<button class="gangExpandBtn">&rarr;</button>');
            $expandBtn.appendTo($subTitle);
            $expandBtn.count = 0;
            card.on('click', function() {
                if ($expandBtn.count % 2 === 0) {
                    $expandBtn.html('&#8595');
                    $expandBtn.count++;
                } else {
                    $expandBtn.html('&#8594')
                    $expandBtn.count++
                }
            })


            var $title = $('<div class="cardTitle"></div>')
            $title.text(gang.name);
            $title.appendTo($subTitle);

            var $gangLevel = $('<select></select')

            var $levelOne = $('<option value="1">I</option>')
            $levelOne.appendTo($gangLevel);

            var $levelTwo = $('<option value="2">II</option>')
            $levelTwo.appendTo($gangLevel);

            var $levelThree = $('<option value="3">III</option>')
            $levelThree.appendTo($gangLevel);

            var $levelFour = $('<option value="4">IV</option>')
            $levelFour.appendTo($gangLevel);

            var $levelFive = $('<option value="5">V</option>')
            $levelFive.appendTo($gangLevel);

            $gangLevel.on('change', function(event) {
                gang.score = parseInt($gangLevel.val());
                if (gang.score === 1) {
                    $gangLevel.attr({
                        'class': 'levelOne tier',
                    });
                    $levelOne.attr('selected', 'selected');
                    gang.tier = 1;
                } else if (gang.score === 2) {
                    $gangLevel.attr({
                        'class': 'levelTwo tier',
                    });
                    $levelTwo.attr('selected', 'selected');
                    gang.tier = 2;
                } else if (gang.score === 3) {
                    $gangLevel.attr({
                        'class': 'levelThree tier',
                    });
                    $levelThree.attr('selected', 'selected');
                    gang.tier = 3
                } else if (gang.score === 4) {
                    $gangLevel.attr({
                        'class': 'levelFour tier',
                    });
                    $levelFour.attr('selected', 'selected');
                    gang.tier = 4;
                } else if (gang.score === 5) {
                    $gangLevel.attr({
                        'class': 'levelFive tier',
                    });
                    $levelFive.attr('selected', 'selected');
                    gang.tier = 5;
                }

            })

            if (gang.score === 1) {
                $gangLevel.attr({
                    'class': 'levelOne tier',
                });
                $levelOne.attr('selected', 'selected');
            } else if (gang.score === 2) {
                $gangLevel.attr({
                    'class': 'levelTwo tier',
                });
                $levelTwo.attr('selected', 'selected');
            } else if (gang.score === 3) {
                $gangLevel.attr({
                    'class': 'levelThree tier',
                });
                $levelThree.attr('selected', 'selected');
            } else if (gang.score === 4) {
                $gangLevel.attr({
                    'class': 'levelFour tier',
                });
                $levelFour.attr('selected', 'selected');
            } else if (gang.score === 5) {
                $gangLevel.attr({
                    'class': 'levelFive tier',
                });
                $levelFive.attr('selected', 'selected');
            }
            $gangLevel.appendTo($titleRow);

            var $hold = $('<div class="hold"></div>');
            $hold.text(gang.hold);
            $hold.appendTo($titleRow)
            $hold.on('click', function(event) {
                if (event.target.innerHTML === 'S') {
                    event.target.innerHTML = 'W';
                    gang.hold = 'W';
                } else if (event.target.innerHTML === 'W') {
                    event.target.innerHTML = 'S';
                    gang.hold = 'S';
                }
            })

            var $status = $('<input type="number" class="status"></input>');
            $status.attr('value', gang.status)
            $status.appendTo($titleRow)
            $status.on('change', function(event) {
                gang.status = event.target.value;

            })


            var $cardContent = $(`<div class="cardContent" id=${gang.name}></div>`);
            $cardContent.appendTo(card);

            var $leaderRow =  $('<div class="leaderRow hidden"></div>');
            $leaderRow.appendTo($cardContent);

            var $leaderLabel = $('<div class="leaderLabel"></div>')
            $leaderLabel.text('Leader:')
            $leaderLabel.appendTo($leaderRow);

            var $leaderText = $('<input type="text" class="leaderValue"></input>')
            $leaderText.val(gang.leader)
            $leaderText.appendTo($leaderRow);

            gang.description.forEach(function(line) {
                var newLine = $('<p class="hidden details"></p>');
                newLine.text(line);
                newLine.appendTo($cardContent);
            })
        })
    }

    var diceRoller = function(parent) {
        var $diceBox = $('<div class="diceRoller"></div>');
        $diceBox.appendTo(parent);

        var $diceTitle = $('<div></div>');
        $diceTitle.text('Dice Roller');
        $diceTitle.appendTo($diceBox);

        var $rollRow = $('<div class="rollRow"></div>')
        $rollRow.appendTo($diceBox);

        var $numberInput = $('<input id="diceAmt" type="number" name="diceAmt"></input>')
        $numberInput.appendTo($rollRow);

        var $rollBtn = $('<button class="rollBtn">Roll!</button>')
        $rollBtn.appendTo($rollRow);
        $rollBtn.on('click', function() {
            rollDice($numberInput.val());
        })

        var $resultsRow = $('<div id="resultsRow"></div>');
        $resultsRow.html('Nothing rolled yet.')
        $resultsRow.appendTo($diceBox);

    }

    renderRegions();

    var rollDice = function(value) {
        var res = [];
        for (var i = 0; i < value; i++) {
            var roll = Math.floor(Math.random() * 6) + 1;
            res.push(roll);
        }
        var $resultsRow = $('#resultsRow');
        $resultsRow.html('');
        res.sort();
        res.forEach(function(item) {
            var $die = $('<div></div>')
            $die.attr({
                'class': 'dice' + item,
            })
            $die.text(item);
            $die.appendTo($resultsRow)
        })

        return res.sort();
    }

    var $regionCards = $('.card');
    $regionCards.on('click', function(event) {
        var card = $(event.target.parentElement.parentElement.children);
        card = card.slice(1);
        card.toggleClass('show');
    })

    var $gangCards = $('.subCard');
    $gangCards.on('click', function(event) {
        var card = $(event.target.parentElement.parentElement.parentElement.children[1].children);
        card.toggleClass('show');
    })


})

// make a renderer at bottom of screen for friendly factions
    //searches for any rep > 0
    //renders cards based on filter for status > 0;
//make a renderer below that for unfriendly factions
    //searches for any rep < 0;
    //renders cards based on filter for status < 0;
