
let gameCount = 0;
let winCount = 0;
let drawCount = 0;
let loseCount = 0;
let result = "";

$(".choice_btn").on("click",function(){
    const num = Math.floor(Math.random() * 3) + 1;
    console.log(num)
    gameCount += 1;
    $(".choices_computer img").css("opacity", 0.2);
    $("#result").text("").hide();

    if (num === 1){
        console.log("コンピューターはグー");
        $("#icon_rock-computer").css("opacity", 1);
        if (this.id === "button_rock"){
            console.log("あいこ");
            drawCount += 1;
            result = "Draw";
        } else if (this.id === "button_scissors"){
            console.log("負け");
            loseCount += 1;
            result = "You Lose";
        } else {
            console.log("勝ち")
            winCount += 1;
            result = "You Win";
        }
    } else if (num === 2){
        console.log("コンピューターはチョキ");
        $("#icon_scissors-computer").css("opacity", 1);
        if (this.id === "button_rock"){
            console.log("勝ち");
            winCount += 1;
            result = "You Win";
        } else if (this.id === "button_scissors"){
            console.log("あいこ");
            drawCount += 1;
            result = "Draw";
        } else {
            console.log("負け")
            loseCount += 1;
            result = "You Lose";
        }
    } else {
        console.log("コンピューターはパー");
        $("#icon_paper-computer").css("opacity", 1);
        if (this.id === "button_rock"){
            console.log("負け");
            loseCount += 1;
            result = "You Lose";
        } else if (this.id === "button_scissors"){
            console.log("勝ち");
            winCount += 1;
            result = "You Win";
        } else {
            console.log("あいこ")
            drawCount += 1;
            result = "Draw";
        }
    }

    setTimeout(function () {
    $("#result")
        .text(result)
        .show()
        .fadeOut(60)
        .fadeIn(60)
        .fadeOut(60)
        .fadeIn(60);
    }, 850);
    
    $("#game_count").html(String(gameCount).padStart(2, "0"));
    $("#win_count").html(String(winCount).padStart(2, "0"));
    $("#draw_count").html(String(drawCount).padStart(2, "0"));
    $("#lose_count").html(String(loseCount).padStart(2, "0"));

})