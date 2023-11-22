import React from "react";
import styles from "./score_section.module.css";
import ScoreDiv from "./score_div/ScoreDiv";
import { ReactComponent as CrownIcon } from "./icons/crown.svg";
import { ReactComponent as ScoreIcon } from "./icons/score.svg";
import GaugeComponent from "react-gauge-component";
const customFontStyle = {
  fontFamily: "Arial, sans-serif",
  fontWeight: "bold",
  fontSize: "10rem !important",
};
export default function ScoreSection({ data }) {
  return (
    <div className={styles.score_section}>
      <div className={styles.individual_scores_div}>
        <ScoreDiv title="Environment" score={data["Environment Score"]} />
        <ScoreDiv title="Social" score={data["Social Score"]} />
        <ScoreDiv title="Governance" score={data["Governance Score"]} />
      </div>
      <div className={styles.esg_score_div}>
        <p className={styles.esg_score_div_title}>ESG Score</p>
        <div className={styles.esg_score_chart_div}>
          {/* {console.log(data)} */}
          <GaugeComponent
            className={styles.gaugeComponent}
            style={customFontStyle}
            type="semicircle"
            id="overall-gc"
            arc={{
              width: 0.24,
              padding: 0,
              cornerRadius: 0,
              fontSize: 2,
              subArcs: [
                {
                  color: "#FF0000",
                  showTick: true,
                  tickLength: 1,
                  tickWidth: 2,
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
            minValue={0}
            maxValue={100}
            animate
            value={data["Overall Score"]}
          />

          <div className={styles.esg_score_chart_div2}>
            <p className={styles.esg_score_chart_div2_text}>
              <CrownIcon /> Vivriti {data.Category}
            </p>
            <p className={styles.esg_score_chart_div2_text}>
              <ScoreIcon /> {data["Overall Score"].toFixed(0)}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
