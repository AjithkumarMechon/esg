import React from "react";
import styles from "./left_section.module.css";
import { ReactComponent as EnvIcon } from "../../../logo/environment.svg";
import { ReactComponent as SocialIcon } from "../../../logo/social.svg";
import { ReactComponent as CorporateIcon } from "../../../logo/corporate.svg";
import { ReactComponent as EnvWhiteIcon } from "../../../logo/environment-white.svg";
import { ReactComponent as SocialWhiteIcon } from "../../../logo/social-white.svg";
import { ReactComponent as CorporateWhiteIcon } from "../../../logo/corporate-white.svg";
import OuterCollapse from "./outer_collapse/OuterCollapse";

function getIcons(icon) {
  switch (icon) {
    case "Environment":
      return [EnvIcon, EnvWhiteIcon];
    case "Social":
      return [SocialIcon, SocialWhiteIcon];
    case "Corporate Governance":
      return [CorporateIcon, CorporateWhiteIcon];
    default:
      return EnvIcon;
  }
}

export default function LeftSection({ categoryIndustryMapList }) {

  return (
    <>
      <div className={styles.left_section}>
        <div className={styles.rating_model}>RATING MODEL</div>
        <div className={styles.category_list_div}>
          {categoryIndustryMapList.map((outer, idx) => {
            const [Icon, ActiveIcon] = getIcons(outer.category.name);
            return (
              <OuterCollapse
                Icon={Icon}
                ActiveIcon={ActiveIcon}
                title={outer.category.name}
                themeIndustryMaps={outer.themeIndustryMaps}
                key={idx}
                active={idx === 0 ? true : false}
                parentIdx={idx}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
