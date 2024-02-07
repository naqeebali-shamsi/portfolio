import React from 'react';
import { iconData } from './iconData';

const CustomIcon = ({ iconName, className, ...props }) => {
    const icon = iconData[iconName];
  return (
    <i className={className} {...props}>
      {icon || <span>Icon not found</span>}
    </i>
  );
};

export default CustomIcon;
