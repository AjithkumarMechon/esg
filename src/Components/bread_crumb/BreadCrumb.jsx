import React from "react";
import styles from "./bread_crumb.module.css";
import { ReactComponent as Arrow } from "../../logo/breadcrumb-arrow.svg";
import { ReactComponent as House } from "../../logo/house.svg";
import { useNavigate } from "react-router-dom";

export default function BreadCrumb({ items }) {
  const navigate = useNavigate();
  return (
    <div className={styles.bread_crumb}>
      <House />
      {items.slice(0, items.length - 1).map((item, idx) => {
        return (
          <>
            <p
              key={idx}
              onClick={() => {
                navigate(item.href, {
                  state: item.state,
                });
              }}
              className={styles.item}
            >
              {item.title}
            </p>
            <Arrow />
          </>
        );
      })}
      <p
        className={styles.last_item}
        onClick={() => {
          navigate(
            items[items.length - 1].href,
            items[items.length - 1].state
              ? {
                  state: items[items.length - 1].state,
                }
              : {}
          );
        }}
      >
        {items[items.length - 1].title}
      </p>
    </div>
  );
}
