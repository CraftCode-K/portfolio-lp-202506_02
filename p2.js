// --- 入力バリデーション & 決定ボタン制御 ---
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('birthdayForm');
  const yearInput = document.getElementById('year');
  const monthInput = document.getElementById('month');
  const dayInput = document.getElementById('day');

  // 日付が有効かチェック
  function isValidDate(y, m, d) {
    if (!y || !m || !d) return false;
    m = Number(m); d = Number(d);
    const date = new Date(Number(y), m - 1, d);
    return (date.getFullYear() == y && date.getMonth() + 1 == m && date.getDate() == d);
  }

  // 入力時、最大桁数制限
  yearInput.addEventListener('input', () => {
    if (yearInput.value.length > 4) yearInput.value = yearInput.value.slice(0, 4);
  });
  monthInput.addEventListener('input', () => {
    if (monthInput.value.length > 2) monthInput.value = monthInput.value.slice(0, 2);
    if (Number(monthInput.value) > 12) monthInput.value = 12;
  });
  dayInput.addEventListener('input', () => {
    if (dayInput.value.length > 2) dayInput.value = dayInput.value.slice(0, 2);
    if (Number(dayInput.value) > 31) dayInput.value = 31;
  });

  // サブミット時
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const y = yearInput.value, m = monthInput.value, d = dayInput.value;
    if (!isValidDate(y, m, d)) {
      alert("正しい日付を入力してください");
      return;
    }
    // --- 遷移先を変更する場合はここ ---
    // 入力値はlocalStorage等で保存しておくと他ページで参照可能
    localStorage.setItem("birthYear", y);
    localStorage.setItem("birthMonth", m);
    localStorage.setItem("birthDay", d);
    window.location.href = "p3.html"; // 次の質問ページへ
  });
});
