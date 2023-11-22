import React, { useEffect, useState } from "react";
import styles from "./dropdown_response.module.css";
import Cookies from "js-cookie";

export default function DropdownResponse({
  id,
  unit,
  name,
  response,
  onChange,
  trim = null,
}) {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (unit?.code?.toLowerCase() !== "industrytype") {
      fetch(
        process.env.REACT_APP_API_URL +
          "api/v1/dropdown?type=" +
          (unit?.code === "Quarter_Old" ? "Quarter" : unit?.code),
        {
          headers: {
            Authorization: Cookies.get("esg_access_token"),
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          //console.log(unit.code, data.responseBody);
          setOptions(data.responseBody[unit.code]);
        });
    } else {
      fetch(process.env.REACT_APP_API_URL + "api/v1/industry", {
        headers: {
          Authorization: Cookies.get("esg_access_token"),
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setOptions(data.responseBody);
        });
    }
  }, [unit]);

  return (
    <select id={id} onChange={onChange} className={styles.select} name={name}>
      <option>Select</option>
      {options?.map((option, idx) => {
        return (
          <option
            key={idx}
            title={option.name}
            data-id={option.id}
            data-idx={idx}
            data-code={option.code}
            selected={option.name === response}
            value={option.name}
          >
            {option.name.substring(0, trim ? trim : option.name.length)}
            {option.name.length > (trim ? trim : option.name.length) ? " . . . " : ""}
          </option>
        );
      })}
    </select>
  );
}
