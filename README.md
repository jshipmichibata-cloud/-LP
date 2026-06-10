# 人事AI活用レベル診断LP

人事・採用部門向けの「人事AI活用レベル診断」LPです。採用、社員教育、評価、労務、離職防止、人事データ活用、個人情報管理、経営連携の状態を診断します。HTML/CSS/JavaScriptのみで動作し、VercelのStatic Siteとして公開できます。

## ファイル構成

```text
.
├── index.html       # LP本体
├── style.css        # デザイン、レスポンシブ対応
├── script.js        # 診断ロジック、レーダーチャート、Googleフォーム送信
├── vercel.json      # Vercel公開設定
├── .gitignore       # GitHubに含めないファイル
├── .vercelignore    # Vercelにアップロードしないファイル
└── README.md        # 公開手順
```

`outputs/` と `work/` は作業・確認用のフォルダです。GitHub/Vercelには含めません。

## 動作概要

- 診断前に会社名、役職、名前、電話番号を入力します。
- 16問の診断フォームに回答すると、人事AI活用の総合スコア、8項目スコア、診断タイプ、現在の課題を表示します。
- 「診断結果を見る」ボタンを押した時点で、会社情報と診断結果をGoogleフォームに送信します。
- 回答者には表示しない内部データとして、診断結果に応じた必要ChapterをGoogleフォームへ送信します。
- レーダーチャートはChart.jsを利用します。CDNが読み込めない場合は、canvasの簡易描画にフォールバックします。

## ローカル確認

```bash
python3 -m http.server 4173
```

ブラウザで以下を開きます。

```text
http://localhost:4173/
```

JavaScriptの構文チェック:

```bash
node --check script.js
```

## GitHubにアップロードする手順

1. GitHubで新しいリポジトリを作成します。
   - 例: `ai-diagnosis-lp`
   - Public / Private はどちらでも構いません。
2. このフォルダ直下のファイルをGitHubにアップロードします。
   - `index.html`
   - `style.css`
   - `script.js`
   - `vercel.json`
   - `.gitignore`
   - `.vercelignore`
   - `README.md`
3. `outputs/` と `work/` はアップロードしません。

コマンドでアップロードする場合:

```bash
git init
git add index.html style.css script.js vercel.json .gitignore .vercelignore README.md
git commit -m "Add AI diagnosis landing page"
git branch -M main
git remote add origin https://github.com/YOUR_NAME/ai-diagnosis-lp.git
git push -u origin main
```

`YOUR_NAME` とリポジトリ名は、実際のGitHubアカウントに合わせて変更してください。

## Vercelで公開する手順

1. [Vercel](https://vercel.com/) にログインします。
2. `Add New...` → `Project` をクリックします。
3. GitHub連携を行い、作成したリポジトリを選択します。
4. Framework Preset は `Other` または自動検出のままで問題ありません。
5. Build Command は空欄で構いません。
6. Output Directory も空欄で構いません。
7. `Deploy` をクリックします。

デプロイ後、以下のようなURLが発行されます。

```text
https://your-project-name.vercel.app/
```

## 公開後に確認すること

- ファーストビューが表示される
- 診断前に会社名、役職、名前、電話番号を入力できる
- 16問の診断に回答できる
- 診断結果、8項目スコア、レーダーチャートが表示される
- 「診断結果を見る」ボタンを押すとGoogleフォームへ回答が入る
- Googleフォーム側で必要Chapterが確認できる
- Googleフォームの回答がスプレッドシートに保存される

## Googleフォーム連携を変更する場合

`script.js` の `googleFormConfig` を編集します。

```js
const googleFormConfig = {
  actionUrl: "GoogleフォームのformResponse URL",
  entries: {
    company: "entry.xxxxx",
    name: "entry.xxxxx"
  }
};
```

Googleフォームの項目を変更した場合は、`entry.xxxxx` のIDも変わることがあります。
