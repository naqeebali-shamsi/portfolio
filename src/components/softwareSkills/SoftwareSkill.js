import React from "react";
import "./SoftwareSkill.scss";
import {skillsSection} from "../../portfolio";
import CustomIcon from "../customIcons/CustomIcon";

export default function SoftwareSkill() {
  return (
    <div>
      <div className="software-skills-main-div">
        <ul className="dev-icons">
          {skillsSection.softwareSkills.map((skills, i) => {
           const useFontAwesome = skills.fontAwesomeClassname?.includes('fa-');
            return (
              <li
                key={i}
                className="software-skill-inline"
                name={skills.skillName}
              >
                {useFontAwesome ? (
                <i className={skills.fontAwesomeClassname} />
              ) : (
                <CustomIcon iconName={skills.skillName} />
              )}
                <p>{skills.skillName}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
