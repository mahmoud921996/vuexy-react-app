import React, { useState } from "react";
import { useSelector } from "react-redux";
import SubMenu from "../subMenu/SubMenu";
import SubMenuListItem from "../subMenu/SubMenuListItem/SubMenuListItem";
import classes from "./SideBarItem.module.css";

const SideBarItem = props => {
  const [showSubmenu, setShowSubmenu] = useState(false);
  const {darkTheme} = useSelector(state => state.theme)

  const arrow = props.extendable ? (
    <span className={classes["arrow__icon"]}></span>
  ) : null;
  const subMenuItemsCountElement = props.extendable?.count ? (
    <span
      className={`${classes["submenu__count"]} ${
        classes[props.extendable.className]
      }`}
    >
      {props.extendable.count}
    </span>
  ) : null;
  const statusElement = props.extendable?.status ? (
    <span className={classes[props.extendable.status]}>
      {props.extendable.status}
    </span>
  ) : null;

  const subMenuItems = props.extendable
    ? props.extendable.items.map(item => {
        return <SubMenuListItem key={item}>{item}</SubMenuListItem>;
      })
    : null;
  return (
    <li
      className={`${classes["side__bar__item"]} ${darkTheme ? classes['dark']:''}`}
      onClick={() => setShowSubmenu(prevState => !prevState)}
    >
      <a
        href="#"
        className={`side__bar__item__link ${props.active && classes["active"]}`}
      >
        {props.icon}

        <p className={darkTheme ? classes['dark']:''}>{props.content}</p>
        {statusElement}
        {subMenuItemsCountElement}
        {arrow}
      </a>
      <SubMenu show={showSubmenu}>{subMenuItems}</SubMenu>
    </li>
  );
};

export default SideBarItem;
