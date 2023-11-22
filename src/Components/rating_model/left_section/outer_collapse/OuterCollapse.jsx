import React from "react";
import styles from "./outer_collapse.module.css";
import { ReactComponent as ArrowRightIcon } from "../../../../logo/arrow-right.svg";
import { ReactComponent as ArrowDownBlueIcon } from "../../../../logo/arrow-down-blue.svg";
import MiddleCollapse from "../middle_collapse/MiddleCollapse";

export default function OuterCollapse({
  Icon,
  ActiveIcon,
  title,
  active,
  themeIndustryMaps,
  parentIdx
}) {
  const [OuterIcon, setOuterIcon] = React.useState(active ? ActiveIcon : Icon);
  const [CollapseIcon, setCollapseIcon] = React.useState(
    active ? ArrowDownBlueIcon : ArrowRightIcon
  );
  const [outerStyles, setOuterStyles] = React.useState(
    active ? styles.active : styles.outer
  );
  const [isActive, setIsActive] = React.useState(active ? active : false);
  const [style, setStyle] = React.useState(
    active
      ? styles.middle_collapse_container_open
      : styles.middle_collapse_container
  );

  function handleClick(e) {
    if (isActive) {
      setStyle(styles.middle_collapse_container);
      setOuterStyles(styles.outer);
      setOuterIcon(Icon);
      setCollapseIcon(ArrowRightIcon);
    } else {
      setStyle(styles.middle_collapse_container_open);
      setOuterStyles(styles.active);
      setOuterIcon(ActiveIcon);
      setCollapseIcon(ArrowDownBlueIcon);
    }
    setIsActive(!isActive);
  }

  return (
    <>
      <div className={outerStyles} onClick={handleClick}>
        <OuterIcon />
        {title}
        <CollapseIcon />
      </div>
      <div className={style}>
        {themeIndustryMaps.map((theme, idx) => {
          return (
            <MiddleCollapse
              title={theme.theme.name}
              keyIssueThemeMaps={theme.keyIssueThemeMaps}
              key={idx}
              active={idx === 0 && parentIdx === 0}
              parentIdx={idx}
            />
          );
        })}
      </div>
    </>
  );
}
