import React, { useEffect, useState } from "react";
import styles from "./indicator.module.css";
import RadioRespone from "./radio_response/RadioResponse";
import PercentageResponse from "./percentage_response/PercentageResponse";
import NumberResponse from "./number_response/NumberResponse";
import DropdownResponse from "./dropdown_response/DropdownResponse";

function getResponseComponent(responseType) {
  switch (responseType) {
    case "RADIO":
      return RadioRespone;
    case "PERCENTAGE":
      return PercentageResponse;
    case "NUMBER":
      return NumberResponse;
    case "DROPDOWN":
      return DropdownResponse;
    default:
      return RadioRespone;
  }
}

export default function Indicator({
  indicatorData,
  getResponse,
  setResponse,
  setComment,
}) {
  const [isControversy, setIsControversy] = useState(false);

  useEffect(() => {
    // console.log(indicatorData.indicator.unit.code);
    if (indicatorData.indicator.unit.code === "Controversy") {
      // console.log("is controversy");
      setIsControversy(true);
    } else {
      setIsControversy(false);
    }
  }, [indicatorData.indicator.unit.code]);

  function handleChange(e) {
    e.preventDefault();
    let { value } = e.target;
    if (indicatorData.indicator.unit.name === "PERCENTAGE") {
      const limitNumberInRange = (value, min, max) => {
        if (value < min) return min;
        if (value > max) return max;
        return value;
      };
      if (
        e.key === "Backspace" ||
        e.nativeEvent.inputType === "deleteContentBackward"
      ) {
        value = 0;
      } else {
        value = limitNumberInRange(value, 0, 100);
      }
      let valueLength = (value.toString().split(".")[1] || "").length;
      let fixedValue;
      if (valueLength >= 2) {
        fixedValue = Number(value).toFixed(2);
      } else if (valueLength === 1) {
        fixedValue = Number(value).toFixed(1);
      } else {
        fixedValue = Number(value).toFixed(0);
      }
      e.target.value = fixedValue;
      value = value / 100;
    }
    if (indicatorData.indicator.unit.name === "NUMBER") {
      value = Number(value);
    }
    setResponse(indicatorData.indicator.code, value);
  }

  function handleCommentChange(e) {
    setComment(indicatorData.indicator.code, e.target.value);
  }

  const ResponseComponent = getResponseComponent(
    indicatorData.indicator.unit.name
  );
  return (
    <div
      className={styles.indicator}
      id={isControversy ? "controversy-indicator" : ""}
    >
      <div className={styles.indicator_item}>
        {indicatorData.indicator.description}
      </div>
      <div className={styles.indicator_item}>
        <ResponseComponent
          unit={indicatorData.indicator.unit}
          name={
            indicatorData.indicator.unit.name + "_" + indicatorData.indicator.id
          }
          onChange={handleChange}
          response={getResponse(indicatorData.indicator.code).response}
        />
      </div>
      <div className={styles.indicator_item}>
        <textarea
          className={styles.comment_box}
          rows="5"
          placeholder="Enter comments here.."
          onBlur={handleCommentChange}
          defaultValue={getResponse(indicatorData.indicator.code).comment}
        ></textarea>
      </div>
    </div>
  );
}
