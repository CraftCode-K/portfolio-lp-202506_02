document.addEventListener('DOMContentLoaded', () => {
    // 既存の鑑定データをlocalStorageから取得（なければ新しいオブジェクトを作成）
    let uranaiData = JSON.parse(localStorage.getItem('auraUranaiData')) || {};

    /**
     * 性別を選択した際の処理
     * @param {string} gender - '男性' または '女性'
     */
    const selectGender = (gender) => {
        // 鑑定データに性別を保存
        uranaiData.gender = gender;
        
        // 更新したデータをlocalStorageに保存
        localStorage.setItem('auraUranaiData', JSON.stringify(uranaiData));
        
        // 次のページ(p4.html)へ遷移
        window.location.href = 'p4.html';
    };

    // 「男性」ボタンがクリックされた時の処理
    document.getElementById('male-btn').addEventListener('click', (e) => {
        e.preventDefault(); // aタグのデフォルトの画面遷移を無効化
        selectGender('男性');
    });

    // 「女性」ボタンがクリックされた時の処理
    document.getElementById('female-btn').addEventListener('click', (e) => {
        e.preventDefault(); // aタグのデフォルトの画面遷移を無効化
        selectGender('女性');
    });
});
