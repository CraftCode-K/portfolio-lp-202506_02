document.addEventListener('DOMContentLoaded', () => {
    // 既存の鑑定データをlocalStorageから取得（なければ新規作成）
    let uranaiData = JSON.parse(localStorage.getItem('auraUranaiData')) || {};

    const yearInput = document.getElementById('year');
    const monthInput = document.getElementById('month');
    const dayInput = document.getElementById('day');
    const submitBtn = document.getElementById('submit-btn');

    submitBtn.addEventListener('click', (e) => {
        e.preventDefault();

        const year = yearInput.value.trim();
        const month = monthInput.value.trim();
        const day = dayInput.value.trim();

        // --- バリデーション（入力チェック） ---

        // 1. 未入力チェック
        if (year === '' || month === '' || day === '') {
            alert('生年月日をすべて入力してください。');
            return; // 処理を中断
        }

        // 2. 存在する日付かチェック
        //    例: 2月30日や13月1日などを弾く
        const date = new Date(year, month - 1, day); // 月は0から始まるため-1する
        if (
            date.getFullYear() !== Number(year) ||
            date.getMonth() !== Number(month) - 1 ||
            date.getDate() !== Number(day)
        ) {
            alert('正しい日付を入力してください。');
            return; // 処理を中断
        }
        
        // --- チェック通過後の処理 ---

        // データを保存
        uranaiData.birthdate = `${year}年${month}月${day}日`;
        localStorage.setItem('auraUranaiData', JSON.stringify(uranaiData));

        // 次のページ(p3.html)へ遷移
        window.location.href = 'p3.html';
    });
});
