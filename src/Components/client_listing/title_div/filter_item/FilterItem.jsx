import React, { useState } from "react";
import styles from "./filter_item.module.css";
import { ReactComponent as ArrowRightIcon } from "./icons/arrow-right.svg";
import { ReactComponent as ArrowDownIcon } from "./icons/arrow-down.svg";

export default function FilterItem({
  title,
  itemList,
  id,
  setList,
  setter,
  setFiltersCount,
}) {
  const [Icon, setIcon] = useState(ArrowRightIcon);
  const [style, setStyle] = useState(styles.items_list);

  function handleClick() {
    if (Icon === ArrowRightIcon) {
      setIcon(ArrowDownIcon);
      setStyle(styles.items_list_open);
    } else {
      setIcon(ArrowRightIcon);
      setStyle(styles.items_list);
    }
  }

  function handleChange(e) {
    const { value, checked } = e.target;

    if (id !== "industry") {
      if (checked) {
        setList.push(Number(value));
        setter([...setList]);
        setFiltersCount((prev) => prev + 1);
      } else {
        setter(setList.filter((item) => item !== Number(value)));
        setFiltersCount((prev) => prev - 1);
      }
    } else {
      if (checked) {
        setList.push(value);
        setter([...setList]);
        setFiltersCount((prev) => prev + 1);
      } else {
        setter(setList.filter((item) => item !== value));
        setFiltersCount((prev) => prev - 1);
      }
    }

    //console.log(setList);
  }

  return (
    <>
      <div className={styles.filter_item} onClick={handleClick}>
        <Icon />
        {title}
      </div>
      <div className={style}>
        {itemList?.map((item, idx) => {
          return (
            <div className={styles.item_grid} key={idx}>
              <div className={styles.item} style={{ alignItems: "flex-start" }}>
                <input
                  id={"title_div_filters_" + id + idx}
                  type="checkbox"
                  value={id !== "industry" ? item.id : item.code}
                  checked={setList.includes(
                    id !== "industry" ? item.id : item.code
                  )}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.item}>
                <label htmlFor={"title_div_filters_" + id + idx}>
                  {item.name}
                </label>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
