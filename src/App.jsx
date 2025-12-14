import { useEffect, useState } from "react";

import "./styles/reset.css";
import "./styles/global.css";
import styles from "./App.module.css";

import AdditionTrainer from "./components/AdditionTrainer/AdditionTrainer";
import Translator from "./components/Translator/Translator";

function App() {
  const [taskSelect, setTaskSelect] = useState("");
  const [task, setTask] = useState(() => {
    return localStorage.getItem("task") ?? "";
  });

  const TASKS = {
    1: (
      <Translator>
        Знайдіть відповідний переклад
      </Translator>
    ),
    2: (
      <AdditionTrainer>
        Тренажер додавання чисел
      </AdditionTrainer>
    ),
  };

  useEffect(() => {
    localStorage.setItem("task", task);
  }, [task]);

  return (
    <div className={styles.app}>
      <div className={styles.appInner}>
        <header className={styles.header}>
          <div className={styles.headerTitle}>
            <h1 className={styles.appTitle}>React тренажер задач</h1>
            <p className={styles.appSubtitle}>
              Оберіть номер завдання та перегляньте рішення.
            </p>
          </div>

          <div className={styles.controls}>
            <div className={styles.selectorBlock}>
              <label
                htmlFor="taskSelector"
                className={styles.selectorLabel}
              >
                Завдання
              </label>
              <select
                id="taskSelector"
                className={styles.taskSelect}
                value={taskSelect}
                onChange={(e) => {
                  setTaskSelect(e.target.value);
                }}
              >
                <option value="">Не вибрано</option>
                <option value="1">Тренажер з англійської</option>
                <option value="2">Тренажер з додавання</option>
              </select>
            </div>

            <button
              type="button"
              className={styles.showButton}
              disabled={taskSelect === "" || taskSelect === task}
              onClick={() => setTask(taskSelect)}
            >
              Показати рішення
            </button>
          </div>
        </header>

        <main className={styles.main}>
          {TASKS[task] ?? (
            <p className={styles.placeholder}>
              Оберіть завдання, щоб побачити рішення.
            </p>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
