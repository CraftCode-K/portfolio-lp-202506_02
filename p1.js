document.addEventListener('DOMContentLoaded', () => {
    // --- 設定値（定数）を冒頭に集約 ---
    const GAGE_DURATION = 3000; // ゲージが満タンになるまでの時間（ミリ秒）
    const FRAME_RATE = 16;      // ゲージ更新の間隔（ミリ秒）。約60fps
    const NEXT_PAGE_URL = "p2.html"; // 遷移先のURL
    const PAGE_TRANSITION_DELAY = 150; // ページ遷移までの待ち時間（ミリ秒）

    // --- 要素の取得 ---
    const stoneBtn = document.getElementById('stoneBtn');
    const gageImg = document.getElementById('gageImg');
    const helpBtn = document.getElementById('helpBtn');
    const glowEffect = document.getElementById('glow-effect');

    // --- 変数 ---
    let progress = 0;
    let interval = null; // setIntervalのIDを保持

    /**
     * ゲージの見た目を更新する関数
     * @param {number} percent - ゲージの進捗率 (0.0 ~ 1.0)
     */
    function setGage(percent) {
        // clip-pathを使ってゲージの表示幅をコントロール
        gageImg.style.clipPath = `inset(0 ${100 - (percent * 100)}% 0 0)`;
    }

    /**
     * ゲージの増加を開始する関数
     */
    function startGage() {
        // 処理が実行中なら何もしない
        if (interval) return;

        // エフェクトをリセット（念のため）
        glowEffect.classList.remove('active');

        gageImg.classList.add('show');
        const startTime = Date.now();

        interval = setInterval(() => {
            progress = (Date.now() - startTime) / GAGE_DURATION;

            if (progress >= 1) {
                // ゲージが100%に達した場合
                setGage(1);
                clearInterval(interval);
                interval = null; // 処理終了

                // エフェクトを起動
                glowEffect.classList.add('active');

                // 少し待ってから次のページへ
                setTimeout(() => {
                    window.location.href = NEXT_PAGE_URL;
                }, PAGE_TRANSITION_DELAY);
            } else {
                // ゲージが増加中の場合
                setGage(progress);
            }
        }, FRAME_RATE);
    }

    /**
     * ゲージの増加をキャンセルしてリセットする関数
     */
    function cancelGage() {
        clearInterval(interval);
        interval = null; // 処理終了
        progress = 0;
        setGage(0);
        gageImg.classList.remove('show');
    }

    // --- イベントリスナーの設定 ---

    // 長押し開始イベント（マウスとタッチ）
    stoneBtn.addEventListener('mousedown', e => { e.preventDefault(); startGage(); });
    stoneBtn.addEventListener('touchstart', e => { e.preventDefault(); startGage(); });

    // 長押し終了イベント（複数のイベントに対応）
    ['mouseup', 'mouseleave', 'touchend', 'touchcancel'].forEach(ev => {
        stoneBtn.addEventListener(ev, e => { e.preventDefault(); cancelGage(); });
    });

    // ヘルプボタンのクリックイベント
    helpBtn.addEventListener('click', () => {
        alert('【ヘルプ】パワーストーンを3秒間長押しすると、オーラの鑑定が始まります。');
    });

    // 全画像のドラッグを禁止
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('dragstart', e => e.preventDefault());
    });
});
