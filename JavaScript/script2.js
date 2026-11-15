// 比較用：手の切り替え → 確定 → 結果の点滅を、約1.1秒で表示する
$(function () {
    let gameCount = 0;
    let winCount = 0;
    let drawCount = 0;
    let loseCount = 0;
    let isPlaying = false;

    // 指定した手だけを明るくする（1：グー、2：チョキ、3：パー）
    function showComputerHand(hand) {
        $(".choices_computer img").css("opacity", 0.2);

        if (hand === 1) {
            $("#icon_rock-computer").css("opacity", 1);
        } else if (hand === 2) {
            $("#icon_scissors-computer").css("opacity", 1);
        } else {
            $("#icon_paper-computer").css("opacity", 1);
        }
    }

    $(".choice_btn").on("click", function () {
        // 演出が終わるまで、次の対戦を始めない
        if (isPlaying) {
            return;
        }
        isPlaying = true;
        $(".choice_btn").prop("disabled", true);

        // 本当の手は最初に決めておき、見た目だけを切り替える
        const num = Math.floor(Math.random() * 3) + 1;
        let result = "";
        console.log(num);
        gameCount += 1;
        $("#result").text("").hide();

        // 切り替える間隔を少しずつ広げて、だんだん遅く見せる
        showComputerHand(1);
        setTimeout(function () { showComputerHand(2); }, 40);
        setTimeout(function () { showComputerHand(3); }, 100);
        setTimeout(function () { showComputerHand(1); }, 180);
        setTimeout(function () { showComputerHand(2); }, 300);
        setTimeout(function () { showComputerHand(3); }, 450);

        // 0.65秒後、本当の手で止める
        setTimeout(function () { showComputerHand(num); }, 650);

        // 勝敗の判定は、元のコードと同じ分岐を使う
        if (num === 1) {
            console.log("コンピューターはグー");
            if (this.id === "button_rock") {
                console.log("あいこ");
                drawCount += 1;
                result = "Draw";
            } else if (this.id === "button_scissors") {
                console.log("負け");
                loseCount += 1;
                result = "You Lose";
            } else {
                console.log("勝ち");
                winCount += 1;
                result = "You Win";
            }
        } else if (num === 2) {
            console.log("コンピューターはチョキ");
            if (this.id === "button_rock") {
                console.log("勝ち");
                winCount += 1;
                result = "You Win";
            } else if (this.id === "button_scissors") {
                console.log("あいこ");
                drawCount += 1;
                result = "Draw";
            } else {
                console.log("負け");
                loseCount += 1;
                result = "You Lose";
            }
        } else {
            console.log("コンピューターはパー");
            if (this.id === "button_rock") {
                console.log("負け");
                loseCount += 1;
                result = "You Lose";
            } else if (this.id === "button_scissors") {
                console.log("勝ち");
                winCount += 1;
                result = "You Win";
            } else {
                console.log("あいこ");
                drawCount += 1;
                result = "Draw";
            }
        }

        // 手が止まってから0.2秒待ち、カウンターと結果を表示する
        setTimeout(function () {
            $("#game_count").html(String(gameCount).padStart(2, "0"));
            $("#win_count").html(String(winCount).padStart(2, "0"));
            $("#draw_count").html(String(drawCount).padStart(2, "0"));
            $("#lose_count").html(String(loseCount).padStart(2, "0"));

            $("#result")
                .text(result)
                .show()
                .fadeOut(60)
                .fadeIn(60)
                .fadeOut(60)
                .fadeIn(60, function () {
                    // 点滅が終わったら、次の対戦を受け付ける
                    isPlaying = false;
                    $(".choice_btn").prop("disabled", false);
                });
        }, 850);
    });
});
