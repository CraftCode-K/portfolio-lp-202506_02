document.addEventListener('DOMContentLoaded', () => {
    // --- メール設定（ここを編集するだけで変更可能） ---
    const mailToAddress = 'kantei@example.com';   // 宛先メールアドレス
    const mailSubject = '【無料】オーラ鑑定の申し込み'; // メールの件名
    // ---------------------------------------------

    // localStorageからデータを取得して表示
    const uranaiData = JSON.parse(localStorage.getItem('auraUranaiData')) || {};

    // 各IDを持つ要素に、保存されたデータを表示
    document.getElementById('confirm-birthdate').textContent = uranaiData.birthdate || '未入力';
    document.getElementById('confirm-gender').textContent = uranaiData.gender || '未入力';
    document.getElementById('confirm-bloodType').textContent = uranaiData.bloodType || '未入力';
    document.getElementById('confirm-maritalStatus').textContent = uranaiData.maritalStatus || '未入力';
    document.getElementById('confirm-name').textContent = uranaiData.name || '未入力';

    // 「鑑定スタート」ボタンの処理
    document.getElementById('submit-btn').addEventListener('click', (e) => {
        e.preventDefault();

        // メールの本文テンプレートを作成
        const mailBody = `
以下の内容でオーラ鑑定を申し込みます。
--------------------------------
■ プロフィール
・生年月日： ${uranaiData.birthdate || ''}
・性別： ${uranaiData.gender || ''}
・血液型： ${uranaiData.bloodType || ''}
・結婚歴： ${uranaiData.maritalStatus || ''}
・お名前： ${uranaiData.name || ''}
--------------------------------

※このメールに返信して鑑定結果をお受け取りください。
        `;

        // mailtoリンクを生成してメーラーを起動
        // encodeURIComponentで各要素をURLエンコードするのが重要
        const mailtoLink = `mailto:${mailToAddress}?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody.trim())}`;

        // メーラーを起動
        window.location.href = mailtoLink;

        // メーラー起動後にlocalStorageのデータをクリア（任意）
        // ※鑑定申し込みを1回きりにしたい場合などに有効
        // localStorage.removeItem('auraUranaiData');
    });
});
