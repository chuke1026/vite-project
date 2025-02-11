import { useParams } from "react-router";

function CategoryPage({ tasks }) {
  const { categoryName } = useParams();  // URLパラメータからカテゴリ名を取得

  // カテゴリに一致するタスクをフィルタリング
  const filteredTasks = tasks.filter(task => task.category === categoryName);

  return (
    <div>
      <h2>{categoryName}のタスク</h2>
      <ul>
        {filteredTasks.length === 0 ? (
          <p>このカテゴリにタスクはありません。</p>
        ) : (
          filteredTasks.map((task, index) => (
            <li key={index}>
              <span>{task.completed ? "✔ " : ""}{task.text}</span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default CategoryPage;
