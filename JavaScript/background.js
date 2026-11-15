// PCだけ、カーソルの位置に合わせて背景をずらす
$(function () {
    const background = document.querySelector(".background_layer");
    const machine = document.querySelector(".inner_body");
    const pc = window.matchMedia("(min-width: 1024px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");

    // 最大の移動量（px）。CSSの余白32pxより小さくする
    const moveX = 24;
    const moveY = 18;

    function resetBackground() {
        background.style.setProperty("--background-x", "0px");
        background.style.setProperty("--background-y", "0px");
    }

    $(document).on("pointermove", function (event) {
        if (!pc.matches || event.originalEvent.pointerType !== "mouse") {
            return;
        }

        // ゲーム機の中心から、カーソルがどれだけ離れているか
        const rect = machine.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const x = Math.max(-1, Math.min(1, (event.clientX - centerX) / (window.innerWidth / 2)));
        const y = Math.max(-1, Math.min(1, (event.clientY - centerY) / (window.innerHeight / 2)));

        // カーソルと逆方向へ背景を動かす
        background.style.setProperty("--background-x", -x * moveX + "px");
        background.style.setProperty("--background-y", -y * moveY + "px");
    });

    // 画面の外にカーソルが出たら、背景を中央へ戻す
    $(document.documentElement).on("pointerleave", resetBackground);
    $(window).on("blur resize", resetBackground);
    pc.addEventListener("change", resetBackground);
});
