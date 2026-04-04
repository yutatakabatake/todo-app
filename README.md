# Todo App

このプロジェクトは、タスク管理とプロジェクト管理を支援するフルスタックWebアプリケーションです。ユーザーはタスクの作成、編集、削除、完了状態の管理、プロジェクトの管理、カレンダー表示を行うことができます。

## 機能

- **タスク管理**: タスクの作成、編集、削除、完了/未完了の切り替え、開始/停止の管理
- **プロジェクト管理**: プロジェクトの作成、編集、削除
- **カレンダー表示**: 月間ビューでのタスク表示

## 技術スタック

### フロントエンド
- React 19
- TypeScript
- Vite
- Material-UI
- Tailwind CSS
- React Router
- Axios

### バックエンド
- Node.js
- Express.js
- PostgreSQL
- CORS

## インストールと実行

### 前提条件
- Node.js (バージョン 18以上)
- PostgreSQL
- npm または yarn

### セットアップ

1. リポジトリをクローン:
   ```bash
   git clone <repository-url>
   cd todo-app
   ```

2. バックエンドのセットアップ:
   ```bash
   cd back_end
   npm install
   ```

3. フロントエンドのセットアップ:
   ```bash
   cd ../front_end
   npm install
   ```

4. PostgreSQLデータベースを作成し、環境変数を設定:
   `.env` ファイルを `back_end` ディレクトリに作成し、以下の内容を記述:
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

### 実行

1. バックエンドサーバーを起動:
   ```bash
   cd back_end
   npm run dev
   ```

2. フロントエンドを起動:
   ```bash
   cd front_end
   npm run dev
   ```

3. ブラウザで http://localhost:5173 にアクセス

## 使用方法

- ホームページでタスク一覧を表示
- プロジェクトページでプロジェクトを管理
- カレンダーページで月間ビューを表示
- タスクの追加、編集、削除はダイアログから行う

## API エンドポイント

### タスク
- `GET /api/tasks` - 全タスク取得
- `POST /api/tasks` - 新規タスク作成
- `PUT /api/tasks/:id` - タスク編集
- `PUT /api/tasks/done/:id` - タスク完了
- `PUT /api/tasks/start/:id` - タスク開始
- `PUT /api/tasks/stop/:id` - タスク停止
- `DELETE /api/tasks/:id` - タスク削除

### プロジェクト
- `GET /api/projects` - 全プロジェクト取得
- `POST /api/projects` - 新規プロジェクト作成
- `PUT /api/projects/:id` - プロジェクト編集
- `DELETE /api/projects/:id` - プロジェクト削除

## 貢献

1. このリポジトリをフォーク
2. 機能ブランチを作成 (`git checkout -b feature/AmazingFeature`)
3. 変更をコミット (`git commit -m 'Add some AmazingFeature'`)
4. ブランチにプッシュ (`git push origin feature/AmazingFeature`)
5. Pull Requestを作成