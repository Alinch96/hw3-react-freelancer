import { useEffect, useId, useRef, useState } from "react";
import styles from "./AdditionTrainer.module.css";

const AdditionTrainer = ({ children }) => {
  const userAnswerId = useId();
  const [numbers, setNumbers] = useState({
    num_1: null,
    num_2: null,
    answer: "",
  });
  const [click, setClick] = useState(false);
  const [isTestStarted, setIsTestStarted] = useState(false);
  const [history, setHistory] = useState([]);
  const [secondsLeft, setSecondsLeft] = useState(10);
  const intervalRef = useRef(null);
  const timerRef = useRef(null);
  const historyRef = useRef([]);
  const numbersRef = useRef({});

  const rightAnswers = history.filter(
    ({ num_1, num_2, answer }) => num_1 + num_2 === answer
  );
  const wrongAnswers = history.filter(
    ({ num_1, num_2, answer }) => num_1 + num_2 !== answer
  );

  const generateRandom = () => Math.floor(Math.random() * 10) + 1;

  const handleAnswerChange = (e) => {
    const isEmptyInput = e.target.value.trim().length === 0;
    const answer = isEmptyInput ? e.target.value : Number(e.target.value);
    setNumbers((prev) => ({ ...prev, answer }));
  };

  const handleTestStart = () => {
    setIsTestStarted(true);
    setNumbers({
      num_1: generateRandom(),
      num_2: generateRandom(),
      answer: "",
    });
    setClick((click) => !click);
    timerRef.current = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);
  };

  const handleNextClick = (e) => {
    e.preventDefault();
    setHistory((prev) => [...prev, numbers]);
    setNumbers({
      num_1: generateRandom(),
      num_2: generateRandom(),
      answer: "",
    });
    setClick((click) => !click);
    clearInterval(timerRef.current);
    setSecondsLeft(10);
    timerRef.current = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);
  };

  const handleResetTest = () => {
    setIsTestStarted(false);
    setNumbers({
      num_1: null,
      num_2: null,
      answer: "",
    });
    setHistory([]);
    setSecondsLeft(10);
  };

  useEffect(() => {
      if (!isTestStarted) return;
      
      intervalRef.current = setInterval(() => {
        console.log("start interval");
      clearInterval(timerRef.current);
      setSecondsLeft(10);
      timerRef.current = setInterval(() => {
        console.log("tick");
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
      setHistory((prev) => [...prev, numbersRef.current]);
      setNumbers({
        num_1: generateRandom(),
        num_2: generateRandom(),
        answer: "",
      });
    }, 10000);

    setTimeout(() => {
        clearInterval(intervalRef.current);
        clearInterval(timerRef.current);
    }, 10000 * (10 - historyRef.current.length));

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [click, isTestStarted]);

  useEffect(() => {
    numbersRef.current = numbers;
  }, [numbers]);

  useEffect(() => {
    historyRef.current = history;
  }, [history]);

  return (
    <div className={styles.trainerWrapper}>
      <h2 className={styles.trainerTitle}>{children}</h2>
      <p className={styles.trainerDescription}>
        Вам буде надано 10 прикладів для розв&apos;язку, по 10 секунд на кожен.
      </p>

      {isTestStarted && history.length < 10 && (
        <div className={styles.timer}>{secondsLeft}</div>
      )}

      {!isTestStarted && (
        <div className={styles.startWrapper}>
          <button
            type="button"
            className={styles.startButton}
            onClick={handleTestStart}
          >
            Поїхали!
          </button>
        </div>
      )}

      {isTestStarted && history.length < 10 && (
        <form className={styles.trainerForm}>
          <label
            htmlFor={userAnswerId}
            className={styles.formLabel}
          >
            {numbers.num_1} + {numbers.num_2}
          </label>
          <input
            type="number"
            id={userAnswerId}
            min="1"
            value={numbers.answer}
            onChange={handleAnswerChange}
            className={styles.answerInput}
          />
          <button
            type="submit"
            className={styles.nextButton}
            onClick={handleNextClick}
          >
            Наступний
          </button>
        </form>
      )}

      {history.length >= 10 && (
        <div className={styles.resultsWrapper}>
          <div className={styles.answersWrapper}>
            <div className={styles.answersColumn}>
              <h3 className={styles.answersTitle}>
                Правильні відповіді: {rightAnswers.length}
              </h3>
              <ul className={styles.answersList}>
                {rightAnswers.map(({ num_1, num_2, answer }, i) => (
                  <li
                    key={i}
                    className={styles.rightAnswerItem}
                  >
                    {num_1} + {num_2} = {answer}
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.answersColumn}>
              <h3 className={styles.answersTitle}>
                Неправильні відповіді: {wrongAnswers.length}
              </h3>
              <ul className={styles.answersList}>
                {wrongAnswers.map(({ num_1, num_2, answer }, i) => (
                  <li
                    key={i}
                    className={styles.wrongAnswerItem}
                  >
                    {num_1} + {num_2} = {answer}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <button
            type="button"
            className={styles.retryButton}
            onClick={handleResetTest}
          >
            Зробити наступну спробу
          </button>
        </div>
      )}
    </div>
  );
};

export default AdditionTrainer;
