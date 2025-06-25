document.addEventListener('DOMContentLoaded', () => {
    // 既存の鑑定データをlocalStorageから取得
    let uranaiData = JSON.parse(localStorage.getItem('auraUranaiData')) || {};

    // すべての選択肢ボタンを取得
    const choiceButtons = document.querySelectorAll('.choice-btn');

    // 各ボタンにクリックイベントを設定
    choiceButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault(); // aタグのデフォルト動作をキャンセル

            // data-value属性から選択された血液型を取得
            const selectedBloodType = e.currentTarget.dataset.value;

            // 鑑定データに血液型を保存
            uranaiData.bloodType = selectedBloodType;
            
            // 更新したデータをlocalStorageに保存
            localStorage.setItem('auraUranaiData', JSON.stringify(uranaiData));
            
            // 次のページ(p5.html)へ遷移
            window.location.href = 'p5.html';
        });
    });
});
