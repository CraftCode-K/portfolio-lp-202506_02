document.addEventListener('DOMContentLoaded', () => {
    // 既存の鑑定データをlocalStorageから取得
    let uranaiData = JSON.parse(localStorage.getItem('auraUranaiData')) || {};

    /**
     * 婚歴を選択した際の処理
     * @param {string} status - '既婚' または '未婚'
     */
    const selectMaritalStatus = (status) => {
        // 鑑定データに婚歴を保存
        uranaiData.maritalStatus = status;
        
        // 更新したデータをlocalStorageに保存
        localStorage.setItem('auraUranaiData', JSON.stringify(uranaiData));
        
        // 次のページ(p6.html)へ遷移
        window.location.href = 'p6.html';
    };

    // 「既婚」ボタンがクリックされた時の処理
    document.getElementById('married-btn').addEventListener('click', (e) => {
        e.preventDefault();
        selectMaritalStatus('既婚');
    });

    // 「未婚」ボタンがクリックされた時の処理
    document.getElementById('unmarried-btn').addEventListener('click', (e) => {
        e.preventDefault();
        selectMaritalStatus('未婚');
    });
});
