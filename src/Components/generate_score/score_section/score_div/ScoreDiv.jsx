import React from "react";
import styles from "./score_div.module.css";
// import GaugeChart from "react-gauge-chart";
import { ReactComponent as ENVIcon } from "./icons/environment.svg";
import { ReactComponent as SocialIcon } from "./icons/social.svg";
import { ReactComponent as GovernanceIcon } from "./icons/governance.svg";
import GaugeComponent from "react-gauge-component";

function getIcon(title) {
  switch (title) {
    case "Environment":
      return ENVIcon;
    case "Social":
      return SocialIcon;
    case "Governance":
      return GovernanceIcon;
    default:
      return ENVIcon;
  }
}

export default function ScoreDiv({ title, score }) {
  const Icon = getIcon(title);
  return (
    <div className={styles.score_div}>
      <div className={styles.title_div}>
        <Icon />
        <p className={styles.title}>{title}</p>
      </div>
      <div className={styles.chart_div}>
        <GaugeComponent
          className={styles.gaugeComponent}
          type="semicircle"
          arc={{
            width: 0.3,
            padding: 0,
            cornerRadius: 0,
            subArcs: [
              {
                color: "#FF0000",
                showTick: true,
                tickFontSize: 14,
              },
              {
                color: "#FFC000",
                showTick: true,
              },
              {
                color: "#FFD966",
                showTick: true,
              },
              {
                color: "#E2F0D9",
                showTick: true,
              },
              {
                color: "#00B050",
                showTick: true,
              },
            ],
          }}
          value={score.toFixed(0)}
          minValue={0}
          maxValue={100}
          animate
        />
      </div>
      <div className={styles.score_text}>
        <p style={{ margin: 0 }}>Score</p>
        <p style={{ fontSize: "2.25rem", fontWeight: "700", margin: 0 }}>
          {score.toFixed(0)}%
        </p>
      </div>
    </div>
  );
}
