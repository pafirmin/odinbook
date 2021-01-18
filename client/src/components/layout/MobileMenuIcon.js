import React, { Fragment } from "react";
import MobileMenu from "./MobileMenu";

const MobileMenuIcon = ({ activeDropdown, toggleDropdown, toggleTheme }) => {
  return (
    <Fragment>
      <div>
        <i
          onClick={toggleDropdown}
          className="fas fa-bars"
          style={{ fontSize: "1.4em", cursor: "pointer" }}
        />
      </div>
      {activeDropdown === 4 && <MobileMenu toggleTheme={toggleTheme} />}
    </Fragment>
  );
};

export default MobileMenuIcon;
