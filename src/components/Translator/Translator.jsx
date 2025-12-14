import { useState } from "react";
import dictionaryData from "../../data/translator.js";
import WordList from "./WordList.jsx";
import styles from "./Translator.module.css";

const INITIAL_ACTIVE_WORDS = { ua: "", en: "" };

const Translator = ({ children }) => {
  const [words, setWords] = useState(dictionaryData);
  const [activeWords, setActiveWords] = useState(INITIAL_ACTIVE_WORDS);

  const sortedUaWords = words.toSorted((a, b) =>
    a.ua.localeCompare(b.ua)
  );

  const getHandleWordClick = (lang) => {
    return (id) => {
      setActiveWords((prev) => ({
        ...prev,
        [lang]: prev[lang] === id ? "" : id,
      }));

      const activeValues = Object.values(activeWords).filter(
        (item) => item
      );

      if (activeValues.length === 0) return;
      if (activeWords[lang]) return;

      setTimeout(() => {
        if (activeValues[0] === id) {
          setWords((prevWords) =>
            prevWords.filter((word) => word.id !== id)
          );
        }
        setActiveWords(INITIAL_ACTIVE_WORDS);
      }, 1000);
    };
  };

  const getGenerateBorder = (lang) => {
    return (id, itemStyles) => {
      const activeValues = Object.values(activeWords).filter(
        (item) => item
      );

      if (id !== activeWords[lang]) {
        return;
      }
      if (activeValues[0] === activeValues[1]) {
        return itemStyles.greenBorder;
      }
      if (activeValues.length === 1 && activeWords[lang]) {
        return itemStyles.blueBorder;
      }

      return itemStyles.redBorder;
    };
  };

  return (
    <div className={styles.translatorWrapper}>
      <h2 className={styles.translatorTitle}>{children}</h2>

      <div className={styles.listsWrapper}>
        <WordList
          {...{
            getHandleWordClick,
            getGenerateBorder,
            lang: "en",
            list: words,
          }}
        />
        <WordList
          {...{
            getHandleWordClick,
            getGenerateBorder,
            lang: "ua",
            list: sortedUaWords,
          }}
        />
      </div>
    </div>
  );
};

export default Translator;
