import { useState } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router";
import CategoryPage from "./category/Categorypage"; // カテゴリページをインポート
import "./App.css";

function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [category, setCategory] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState("");

  const addTask = () => {
    if (input.trim() === "" || category.trim() === "") return;
    setTasks([...tasks, { text: input, category, completed: false }]);
    setInput("");
    setCategory("");
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const toggleComplete = (index) => {
    setTasks(
      tasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const startEditing = (index, text) => {
    setEditingIndex(index);
    setEditingText(text);
  };

  const updateTask = (index) => {
    if (editingText.trim() === "") {
      setEditingIndex(null);
      return;
    }
    setTasks(
      tasks.map((task, i) =>
        i === index ? { ...task, text: editingText } : task
      )
    );
    setEditingIndex(null);
  };

  return (
    
      <div>
        <h2 className="todo">ToDo List</h2>
        {/* リンク付きh2タグ */}
        <h2>
          
          <Link to="./timer/PomodoroTimer">作業する</Link>
        </h2>

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="タスクを入力"
        />
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="カテゴリを入力"
        />
        <button onClick={addTask}>追加</button>

        {/* カテゴリページへのリンク */}
        <nav>
          <Link to="/category/仕事">仕事</Link> | 
          <Link to="/category/趣味">趣味</Link> | 
          <Link to="/category/買い物">買い物</Link>
        </nav>

        <Routes>
          <Route
            path="/category/:categoryName"
            element={<CategoryPage tasks={tasks} />} // カテゴリページにタスクを渡す
          />
        </Routes>

        {/* メインページでタスク一覧を表示 */}
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>
              {editingIndex === index ? (
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  onBlur={() => updateTask(index)}
                  onKeyDown={(e) => e.key === "Enter" && updateTask(index)}
                  autoFocus
                />
              ) : (
                <span onClick={() => startEditing(index, task.text)}>
                  {task.completed ? "✔ " : ""}
                  {task.text} (カテゴリ: {task.category})
                </span>
              )}
              <button onClick={() => deleteTask(index)}>削除</button>
            </li>
          ))}
        </ul>
      </div>
   
  );
}

export default TodoApp;
