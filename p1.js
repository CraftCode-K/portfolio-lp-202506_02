document.addEventListener('DOMContentLoaded', () => {
  const stoneBtn = document.getElementById('stoneBtn');
  const gageImg = document.getElementById('gageImg');
  let progress = 0;
  let interval = null;
  const duration = 3000; // 3秒

  function setGage(percent) {
    gageImg.style.clipPath = `inset(0 ${(1 - percent) * 100}% 0 0)`;
  }

  function startGage() {
    gageImg.classList.add('show');
    progress = 0;
    setGage(0);
    const start = Date.now();
    interval = setInterval(() => {
      progress = (Date.now() - start) / duration;
      if (progress >= 1) {
        setGage(1);
        clearInterval(interval);
        setTimeout(() => {
          window.location.href = "p2.html";
        }, 150);
      } else {
        setGage(progress);
      }
    }, 16);
  }

  function cancelGage() {
    clearInterval(interval);
    setGage(0);
    gageImg.classList.remove('show');
  }

  // タッチ・マウス両対応
  stoneBtn.addEventListener('touchstart', e => {
    e.preventDefault();
    startGage();
  });
  stoneBtn.addEventListener('mousedown', e => {
    e.preventDefault();
    startGage();
  });

  ['mouseup', 'mouseleave', 'touchend', 'touchcancel'].forEach(ev => {
    stoneBtn.addEventListener(ev, cancelGage);
  });

  // 画像のドラッグ禁止
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('dragstart', e => e.preventDefault());
  });

  // ヘルプ
  document.getElementById('helpBtn').addEventListener('click', function() {
    alert('ヘルプ画面（仮）');
  });
});
