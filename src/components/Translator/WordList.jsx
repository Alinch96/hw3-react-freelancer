import styles from "./WordList.module.css";
import WordListItem from "./WordListItem";

const WordList = ({ list, lang, getHandleWordClick, getGenerateBorder }) => {
  return (
    <ul className={styles.wordList}>
      {list.map((item) => (
        <WordListItem
          key={item.id}
          id={item.id}
          handleWordClick={getHandleWordClick(lang)}
          generateBorder={getGenerateBorder(lang)}
        >
          {item[lang]}
        </WordListItem>
      ))}
    </ul>
  );
};

export default WordList;
