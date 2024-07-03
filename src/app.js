import { gangData } from "../asset/data.js";

$(function() {
    var $app = $('#app');
    $app.html('');

    var $header = $('<div class="header"></div>')
    $header.text('Boi\'s Helper App')
    $header.appendTo($app);

    var $content = $('<div class="content"></div>')
    $content.appendTo($app);

    var renderRegions = function() {
        $content.html('');

        var $regionHeader = $('<div class="contentHeader"></div>');
        $regionHeader.text('Regions/Districts');
        $regionHeader.appendTo($content);

        var regions = Object.keys(gangData);
        regions.forEach(function(region) {
            
            var $card = $(`<div class="card" id="${region}"></div>`)
            $card.appendTo($content);

            var $titleRow = $('<div class="titleRow"></div>')
            $titleRow.appendTo($card);
            
            var $expandBtn = $('<button class="regionExpandBtn"></button>')
            $expandBtn.html('&#8594');
            $expandBtn.count = 0;
            $expandBtn.appendTo($titleRow)
            $expandBtn.on('click', function() {
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

            //access children of region card
            // console.log($card.children().slice(1))
        })
    }

    var renderGangs = function(parent) {
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
            $expandBtn.on('click', function() {
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
            $title.appendTo($subTitle)

            var $gangLevel = $('<div></div>')
            $gangLevel.text(gang.level)
            if (gang.score === 1) {
                $gangLevel.attr('class', 'levelOne gangLevel');
            } else if (gang.score === 2) {
                $gangLevel.attr('class', 'levelTwo gangLevel');
            } else if (gang.score === 3) {
                $gangLevel.attr('class', 'levelThree gangLevel');
            } else if (gang.score === 4) {
                $gangLevel.attr('class', 'levelFour gangLevel');
            }
            $gangLevel.appendTo($titleRow);

            var cardContent = $(`<div class="cardContent" id=${gang.name}></div>`);
            cardContent.appendTo(card);

            gang.description.forEach(function(line) {
                var newLine = $('<div class="hidden"></div>');
                newLine.text(line);
                newLine.appendTo(cardContent);
            })

            //access content div
            // console.log(card.children()[1]);

        })
    }

    renderRegions();

    var $regionCards = $('.regionExpandBtn');
    $regionCards.on('click', function(event) {
        var card = $(event.target.parentElement.parentElement.children);
        card = card.slice(1);
        card.toggleClass('hidden');
    })

    var $gangCards = $('.gangExpandBtn');
    $gangCards.on('click', function(event) {
        var card = $(event.target.parentElement.parentElement.parentElement.children[1].children);
        card.toggleClass('hidden');
    })


})