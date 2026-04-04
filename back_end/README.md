# Todo App - Backend

このプロジェクトは、Todo AppのバックエンドAPIサーバーです。Node.jsとExpress.jsを使用して構築されたRESTful APIを提供します。PostgreSQLデータベースを使用してタスクとプロジェクトのデータを管理します。

## 機能

- **RESTful API**: タスクとプロジェクトのCRUD操作
- **データベース連携**: PostgreSQLを使用した永続化
- **CORS対応**: クロスオリジンリクエストを許可
- **環境変数管理**: 設定の外部管理

## 技術スタック

- **Node.js**: JavaScriptランタイム
- **Express.js**: Webアプリケーションフレームワーク
- **PostgreSQL**: リレーショナルデータベース
- **pg (node-postgres)**: PostgreSQLクライアント
- **CORS**: クロスオリジンリソース共有
- **dotenv**: 環境変数管理
- **Nodemon**: 開発時自動再起動

## インストール

### 前提条件
- Node.js (バージョン 18以上)
- PostgreSQL
- npm または yarn

### セットアップ

1. プロジェクトディレクトリに移動:
   ```bash
   cd back_end
   ```

2. 依存関係をインストール:
   ```bash
   npm install
   ```

3. PostgreSQLデータベースを作成:
   PostgreSQLクライアントでデータベースを作成:
   ```sql
   CREATE DATABASE todo_app;
   ```

4. 環境変数を設定:
   `.env` ファイルをプロジェクトルートに作成し、以下の内容を記述:
   ```
   DB_USER=your_db_user
   DB_HOST=localhost
   DB_NAME=todo_app
   DB_PASSWORD=your_db_password
   DB_PORT=5432
   ```

5. データベーステーブルを作成:
   PostgreSQLクライアントで以下のSQLを実行:
   ```sql
   CREATE TABLE projects (
     id SERIAL PRIMARY KEY,
     name VARCHAR(255) NOT NULL,
     description TEXT,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );

   CREATE TABLE tasks (
     id SERIAL PRIMARY KEY,
     title VARCHAR(255) NOT NULL,
     description TEXT,
     project_id INTEGER REFERENCES projects(id),
     status VARCHAR(50) DEFAULT 'pending',
     priority VARCHAR(50) DEFAULT 'medium',
     due_date DATE,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

## 実行

### 開発サーバー起動
```bash
npm run dev
```
Nodemonを使用してサーバーが起動し、ファイル変更時に自動再起動します。デフォルトポートは3000です。

### 本番サーバー起動
```bash
npm start
```
本番環境用のサーバーを起動します。

## API エンドポイント

ベースURL: `http://localhost:3000/api`

### タスク (Tasks)

| メソッド | エンドポイント     | 説明                           |
| -------- | ------------------ | ------------------------------ |
| GET      | `/tasks`           | 全タスクを取得                 |
| POST     | `/tasks`           | 新規タスクを作成               |
| PUT      | `/tasks/:id`       | 指定IDのタスクを編集           |
| PUT      | `/tasks/done/:id`  | 指定IDのタスクを完了状態に変更 |
| PUT      | `/tasks/start/:id` | 指定IDのタスクを開始状態に変更 |
| PUT      | `/tasks/stop/:id`  | 指定IDのタスクを停止状態に変更 |
| DELETE   | `/tasks/:id`       | 指定IDのタスクを削除           |

#### リクエスト/レスポンス例

**POST /api/tasks** (タスク作成)
```json
{
  "title": "新しいタスク",
  "description": "タスクの説明",
  "project_id": 1,
  "priority": "high",
  "due_date": "2024-12-31"
}
```

**レスポンス**
```json
{
  "id": 1,
  "title": "新しいタスク",
  "description": "タスクの説明",
  "project_id": 1,
  "status": "pending",
  "priority": "high",
  "due_date": "2024-12-31",
  "created_at": "2024-01-01T00:00:00.000Z",
  "updated_at": "2024-01-01T00:00:00.000Z"
}
```

### プロジェクト (Projects)

| メソッド | エンドポイント  | 説明                       |
| -------- | --------------- | -------------------------- |
| GET      | `/projects`     | 全プロジェクトを取得       |
| POST     | `/projects`     | 新規プロジェクトを作成     |
| PUT      | `/projects/:id` | 指定IDのプロジェクトを編集 |
| DELETE   | `/projects/:id` | 指定IDのプロジェクトを削除 |

## プロジェクト構造

```
src/
├── controllers/         # リクエストハンドラー
│   ├── taskController.js
│   └── projectController.js
├── routes/              # APIルート定義
│   ├── taskRoute.js
│   └── projectRoute.js
├── services/            # ビジネスロジック
│   ├── taskService.js
│   └── projectService.js
├── db.js                # データベース接続
└── index.js             # サーバーエントリーポイント
```

## データベーススキーマ

### projects テーブル
- `id`: SERIAL PRIMARY KEY
- `name`: VARCHAR(255) NOT NULL
- `description`: TEXT
- `created_at`: TIMESTAMP DEFAULT CURRENT_TIMESTAMP

### tasks テーブル
- `id`: SERIAL PRIMARY KEY
- `title`: VARCHAR(255) NOT NULL
- `description`: TEXT
- `project_id`: INTEGER (外部キー)
- `status`: VARCHAR(50) DEFAULT 'pending'
- `priority`: VARCHAR(50) DEFAULT 'medium'
- `due_date`: DATE
- `created_at`: TIMESTAMP DEFAULT CURRENT_TIMESTAMP
- `updated_at`: TIMESTAMP DEFAULT CURRENT_TIMESTAMP

## エラーハンドリング

APIは標準的なHTTPステータスコードを使用:
- `200`: 成功
- `201`: 作成成功
- `400`: バッドリクエスト
- `404`: リソースが見つからない
- `500`: サーバーエラー

## 開発者向け情報

### コーディング規約
- ES6+ 構文を使用
- async/await を使用した非同期処理
- 適切なエラーハンドリングを実装

### テスト
現在、テストは実装されていません。将来的にテストフレームワークを導入予定です。