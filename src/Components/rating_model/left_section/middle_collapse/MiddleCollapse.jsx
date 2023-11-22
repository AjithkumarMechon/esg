import React from "react";
import styles from "./middle_collapse.module.css";
import { ReactComponent as ArrowRightIcon } from "../../../../logo/arrow-right.svg";
import { ReactComponent as ArrowDownIcon } from "../../../../logo/arrow-down.svg";
import InnerList from "../inner_list/InnerList";

export default function MiddleCollapse({ title, active, keyIssueThemeMaps, parentIdx }) {
  const [CollapseIcon, setCollapseIcon] = React.useState(
    active ? ArrowDownIcon : ArrowRightIcon
  );
  const [isActive, setIsActive] = React.useState(active ? active : false);
  const [style, setStyle] = React.useState(
    active ? styles.inner_list_container_open : styles.inner_list_container
  );

  function handleClick(e) {
    if (isActive) {
      setStyle(styles.inner_list_container);
      setCollapseIcon(ArrowRightIcon);
    } else {
      setStyle(styles.inner_list_container_open);
      setCollapseIcon(ArrowDownIcon);
    }
    setIsActive(!isActive);
  }

  return (
    <>
      <div className={styles.middle} onClick={handleClick}>
        <p className={styles.title}>{title}</p>
        <CollapseIcon />
      </div>
      <div className={style}>
        {keyIssueThemeMaps.map((keyIssue, idx) => {
          return (
            <InnerList
              keyIssueId={"keyIssue_" + keyIssue.keyIssue.id}
              title={keyIssue.keyIssue.name}
              key={idx}
              active={idx === 0 && parentIdx === 0}
            />
          );
        })}
      </div>
    </>
  );
}
