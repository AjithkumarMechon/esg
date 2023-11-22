import React from "react";
import styles from "../../styles/login.module.css";
const IdbContent = ({
  props,
  handleData,
  src,
  h3_text,
  p_text,
  img_color,
  idb_color_content,
  text_color,
}) => {
  return (
    <div>
      <button className={styles.button_idb}>
        <div
          key={props}
          className={styles.idb_content}
          style={idb_color_content}
          onClick={handleData}
        >
          <div className={styles.imagesJoin} style={img_color}>
            <img className={styles.logo_header} src={src} alt="logo" />
          </div>
          <div className={styles.idb_text}>
            <h3 style={text_color}>{h3_text}</h3>
            <p style={text_color}>{p_text}</p>
          </div>
        </div>
      </button>
    </div>
  );
};
export default IdbContent;
