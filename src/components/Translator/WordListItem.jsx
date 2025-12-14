import clsx from "clsx";
import styles from "./WordListItem.module.css";
import { memo } from "react";

const WordListItem = ({ id, children, handleWordClick, generateBorder }) => {
  return (
    <li
      className={clsx(styles.wordItem, generateBorder(id, styles))}
      onClick={() => handleWordClick(id)}
    >
      {children}
    </li>
  );
};

export default memo(WordListItem);
