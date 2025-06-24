document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('birthForm');
  const yearInput = document.getElementById('year');
  const monthInput = document.getElementById('month');
  const dayInput = document.getElementById('day');
  const errorMessage = document.getElementById('errorMessage');

  // デフォルト日付
  yearInput.value = 1980;
  monthInput.value = 1;
  dayInput.value = 1;

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const year = Number(yearInput.value);
    const month = Number(monthInput.value);
    const day = Number(dayInput.value);

    // 入力バリデーション
    if (!year || !month || !day) {
      showError('すべて入力してください');
      return;
    }
    if (year < 1900 || year > 2099) {
      showError('年は1900〜2099で入力してください');
      return;
    }
    if (month < 1 || month > 12) {
      showError('月は1〜12で入力してください');
      return;
    }
    if (day < 1 || day > 31) {
      showError('日付が不正です');
      return;
    }
    // 日付の妥当性
    if (!isValidDate(year, month, day)) {
      showError('存在しない日付です');
      return;
    }
    // 通過時は値を保存
    const birth = { year, month, day };
    localStorage.setItem('birth', JSON.stringify(birth));
    // 画面遷移
    window.location.href = "p3.html";
  });

  function showError(msg) {
    errorMessage.textContent = msg;
  }

  function isValidDate(y, m, d) {
    const dt = new Date(y, m - 1, d);
    return dt.getFullYear() === y && (dt.getMonth() + 1) === m && dt.getDate() === d;
  }
});
