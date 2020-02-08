(function($){
 
    $.fn.shuffle = function() {
 
        var allElems = this.get(),
            getRandom = function(max) {
                return Math.floor(Math.random() * max);
            },
            shuffled = $.map(allElems, function(){
                var random = getRandom(allElems.length),
                    randEl = $(allElems[random]).clone(true)[0];
                allElems.splice(random, 1);
                return randEl;
           });
 
        this.each(function(i){
            $(this).replaceWith($(shuffled[i]));
        });
 
        return $(shuffled);
 
    };
 
})(jQuery);
//////////////////////END OF SHUFFLE
var cardsOpened = 0;
var previousValue = 0;
var previousElement = null;
var score = 0;
var oldScore = 0;
var level = 0;
var maxMoves = 0;
var movesMade = 0;
var isChosen = true;
  

$(function(){
    for(var i = 1; i <= 10; i++){
        $(".field").append('<div data-id="'+i+'-'+1+'" class="card"><div class="number">' + i + '</div></div>').append('<div data-id="'+i+'-'+2+'" class="card"><div class="number">' + i + '</div></div>');
    }
    
    $('.card').shuffle();
    $('.card .number').hide();
    
    $('.btn').click(function(){
        if(isChosen){
            switch($(this).justtext().trim()){
                case "Easy":
                    console.log("EASY GAME");
                    maxMoves = 100;
                    $(".result").html("")
                    break;
                case "Normal":
                    console.log("NORMAL GAME");
                    maxMoves = 60;
                    $(".result").html("")
                    break;
                case "Hard":
                    console.log("HARD GAME");
                    maxMoves = 30;
                    $(".result").html("")
                    break;
            }
        }
        isChosen = false;
    });
    
    $('.reset').click(function(){
        isChosen = true;
        movesMade = 0;
        score = 0;
        cardsOpened = 0;
        previousValue = 0;
        $(".card").removeClass("inactive");
        $(".card .number").hide();
        $(".score").html("Score: ");
        score = 0;
        $(".score").append(score);
        $('.card').shuffle();
        $(".result").html("");
    });
    
    $('.card').click(function(){
        if(isChosen == false){
            if(movesMade < maxMoves){
                if(!$(this).hasClass("inactive")){
                    if(previousElement == null || previousElement.data("id") != $(this).data("id")){
                        movesMade++;
                        console.log(maxMoves, movesMade);
                        if(cardsOpened > 1){
                            cardsOpened = 0;
                            previousValue = 0;
                            $(".card .number").hide();
                        }
                        
                        $(this).children(".number").show();
                        cardsOpened++;

                        if($(this).children(".number").html() == previousValue){
                            $(this).addClass("inactive");
                            previousElement.addClass("inactive");
                            $(".score").html("Score: ");
                            score++;
                            $.playSound('punch');
                            oldScore = score;
                            $(".score").append(score);
                        } else{
                            $.playSound('bow');
                        }

                        previousValue = $(this).children(".number").html();
                        previousElement = $(this);
                    }
                }
                if(score ==  $('.card').length / 2){
                    $(".result").html("YOU WON");
                    console.log("YOU WIN");
                }
            }
            else{
                $(".result").html("GAME OVER");
                console.log("GAME OVER");
                movesMade = 0;
                isChosen = true;
                $(".oldScore").html("Last score: ");
                $(".oldScore").append(oldScore);
                $(".score").html("Score: ");
                score = 0;
                $(".score").append(score);
                $(".card").removeClass("inactive");
                cardsOpened = 0;
                previousValue = 0;
                $(".card .number").hide();
                $('.card').shuffle();
            }
        }
    }); 
});






























