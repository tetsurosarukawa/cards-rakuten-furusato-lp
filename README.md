# CARDS 楽天ふるさと納税 専門運用支援 LP

株式会社CARDSの「楽天ふるさと納税 専門運用支援」サービス紹介LP。

## 概要
- 参考LP（cd-s.co.jp の Amazon/楽天/楽天RPP広告運用代行）と同水準を目指した構成
- 静的HTML+CSS+JSで実装、GitHub Pagesで公開
- 構成案：Claude（Claude Code）／デザイン・実装補助：ChatGPT（GPT-4.1）

## ファイル構成
```
.
├── index.html
├── css/style.css
├── js/main.js
├── assets/images/          # 実写真差し替えスペース
└── docs/
    ├── lp-structure.md     # 構成書
    └── design-brief.md     # デザインブリーフ
```

## ローカル表示
```sh
open index.html
```

## 要差し替え箇所
- **お問合せフォーム**：`index.html` の `FORM_ID_PLACEHOLDER` を Google Forms の実ID に置換
- **コンサルタント写真**：`section-consultant__img` の src を差し替え
- **CARDSロゴ**：ヘッダー/フッターは現状テキスト。画像ロゴがある場合差し替え
- **プライバシーポリシー**：フッターの `#` リンクを実ページURLに

## 更新履歴
- 2026-04-18：初版作成

© 2026 株式会社CARDS
