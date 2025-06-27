document.addEventListener('DOMContentLoaded', () => {
    // --- 設定値（定数）を冒頭に集約 ---
    const GAGE_DURATION = 3000; // ゲージが満タンになるまでの時間（ミリ秒）
    const FRAME_RATE = 16;      // ゲージ更新の間隔（ミリ秒）。約60fps
    const NEXT_PAGE_URL = "p2.html"; // 遷移先のURL
    // アニメーションの時間(0.8秒)に合わせて調整
    const PAGE_TRANSITION_DELAY = 600; // ページ遷移までの待ち時間（0.6秒）

    // --- 要素の取得 ---
    const stoneBtn = document.getElementById('stoneBtn');
    const gageImg = document.getElementById('gageImg');
    const helpBtn = document.getElementById('helpBtn');
    const flashOverlay = document.getElementById('flash-overlay');

    // --- 変数 ---
    let progress = 0;
    let interval = null; // setIntervalのIDを保持

    function setGage(percent) {
        gageImg.style.clipPath = `inset(0 ${100 - (percent * 100)}% 0 0)`;
    }

    function startGage() {
        if (interval) return;
        
        flashOverlay.classList.remove('active');

        const startTime = Date.now();

        interval = setInterval(() => {
            progress = (Date.now() - startTime) / GAGE_DURATION;

            if (progress >= 1) {
                setGage(1);
                clearInterval(interval);
                interval = null;

                flashOverlay.classList.add('active');

                setTimeout(() => {
                    window.location.href = NEXT_PAGE_URL;
                }, PAGE_TRANSITION_DELAY);
            } else {
                setGage(progress);
            }
        }, FRAME_RATE);
    }

    function cancelGage() {
        clearInterval(interval);
        interval = null;
        progress = 0;
        setGage(0);
    }

    // --- イベントリスナーの設定 ---
    stoneBtn.addEventListener('mousedown', e => { e.preventDefault(); startGage(); });
    stoneBtn.addEventListener('touchstart', e => { e.preventDefault(); startGage(); });

    ['mouseup', 'mouseleave', 'touchend', 'touchcancel'].forEach(ev => {
        stoneBtn.addEventListener(ev, e => { e.preventDefault(); cancelGage(); });
    });

    helpBtn.addEventListener('click', () => {
        alert('【ヘルプ】パワーストーンを3秒間長押しすると、オーラの鑑定が始まります。');
    });

    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('dragstart', e => e.preventDefault());
    });
});
