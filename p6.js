document.addEventListener('DOMContentLoaded', () => {
    // 既存の鑑定データをlocalStorageから取得
    let uranaiData = JSON.parse(localStorage.getItem('auraUranaiData')) || {};

    const nameInput = document.getElementById('name-input');
    const submitBtn = document.getElementById('submit-btn');

    submitBtn.addEventListener('click', (e) => {
        e.preventDefault(); // aタグのデフォルト動作をキャンセル

        const name = nameInput.value.trim(); // 入力値の前後の空白を削除

        // バリデーション：入力が空でないかチェック
        if (name === '') {
            alert('お名前（ニックネーム可）を入力してください。');
            return; // 処理を中断
        }

        // データを保存
        uranaiData.name = name;
        localStorage.setItem('auraUranaiData', JSON.stringify(uranaiData));

        // 次のページ(p7.html)へ遷移
        window.location.href = 'p7.html';
    });
});
