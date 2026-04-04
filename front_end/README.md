# Todo App - Frontend

このプロジェクトは、Todo Appのフロントエンド部分です。ReactとTypeScriptを使用して構築された、モダンなWebアプリケーションです。ユーザーはタスクとプロジェクトを管理するための直感的なUIを提供します。

## 機能

- **タスク管理**: タスクの作成、編集、削除、ステータス管理
- **プロジェクト管理**: プロジェクトの作成、編集、削除
- **カレンダー表示**: 月間ビューでのタスク表示
- **リアルタイム更新**: バックエンドAPIとの連携

## 技術スタック

- **React 19**: UIライブラリ
- **TypeScript**: 型安全なJavaScript
- **Vite**: 高速なビルドツール
- **Material-UI**: UIコンポーネントライブラリ
- **Tailwind CSS**: ユーティリティファーストCSSフレームワーク
- **React Router**: クライアントサイドルーティング
- **Axios**: HTTPクライアント
- **Day.js**: 日付操作ライブラリ
- **Lucide React**: アイコンライブラリ

## インストール

### 前提条件
- Node.js (バージョン 18以上)
- npm または yarn

### セットアップ

1. プロジェクトディレクトリに移動:
   ```bash
   cd front_end
   ```

2. 依存関係をインストール:
   ```bash
   npm install
   ```

## 実行

### 開発サーバー起動
```bash
npm run dev
```
ブラウザで http://localhost:5173 にアクセスしてアプリケーションを表示します。

### ビルド
```bash
npm run build
```
`dist` ディレクトリに本番用ファイルが生成されます。

## プロジェクト構造

```
src/
├── components/          # 再利用可能なUIコンポーネント
│   ├── AddTaskFormDialog.tsx
│   ├── EditTaskFormDialog.tsx
│   ├── MonthView.tsx
│   ├── Navigation.tsx
│   ├── NumberField.tsx
│   ├── ProjectFormDialog.tsx
│   ├── Table.tsx
│   └── Task.tsx
├── context/             # React Context
│   └── AppContextProvider.tsx
├── pages/               # ページコンポーネント
│   ├── Calendar.tsx
│   ├── Project.tsx
│   └── TaskList.tsx
├── types/               # TypeScript型定義
│   └── task.ts
├── util/                # ユーティリティ関数
│   └── dayUtils.ts
├── App.tsx              # メインアプリコンポーネント
├── App.css              # アプリ全体のスタイル
├── index.css            # グローバルスタイル
└── main.tsx             # エントリーポイント
```

## 使用方法

1. アプリケーション起動後、ナビゲーションバーからページを切り替え
2. **タスクリスト**: タスクの一覧表示、追加、編集、削除
3. **プロジェクト**: プロジェクトの管理
4. **カレンダー**: 月間ビューでのタスク確認

### タスク操作
- **追加**: 「タスク追加」ボタンから新規タスク作成
- **編集**: タスク行の編集ボタンから変更
- **削除**: タスク行の削除ボタンから削除
- **ステータス変更**: 完了/未完了、開始/停止の切り替え

## API連携

バックエンドAPI (http://localhost:3000) と連携してデータを取得・更新します。主要なAPIエンドポイント:

- `/api/tasks` - タスクCRUD操作
- `/api/projects` - プロジェクトCRUD操作

## 開発者向け情報

### コーディング規約
- TypeScriptを使用し、型安全を確保
- コンポーネントは再利用可能に設計

### 環境変数
必要に応じて `.env` ファイルを作成し、APIのベースURLなどを設定:
```
VITE_API_BASE_URL=http://localhost:3000
```