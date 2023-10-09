import React, { useState } from 'react';
import { List, Typography } from '@mui/material';
import { CaretRightOutlined, CaretDownOutlined } from '@ant-design/icons';
import NavItem from './NavItem';

const CollapseComponent = ({ item }) => {
  const [isCollapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed(!isCollapsed);
  };

  const toggleIcon = isCollapsed ? <CaretRightOutlined /> : <CaretDownOutlined />;

  const handleKeyDown = (event) => {
    // Check if the Enter key (key code 13) or Spacebar (key code 32) is pressed
    if (event.keyCode === 13 || event.keyCode === 32) {
      toggleCollapse();
    }
  };

  const navCollapse = isCollapsed
    ? null // Render nothing when collapsed
    : item.children?.map((menuItem) => <NavItem key={menuItem.id} item={menuItem} level={1} />);

  return (
    <div
      role="button" // Add a role to make it accessible
      tabIndex={0} // Make it focusable
      onClick={toggleCollapse}
      onKeyDown={handleKeyDown} // Listen for keyboard events
    >
      <div style={{ display: 'flex' }}>
        <Typography variant="subtitle2" color="textSecondary" style={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#007bff' }}>
          {item.title}
        </Typography>
        {toggleIcon}
      </div>
      <List sx={{ py: 0, zIndex: 0 }}>{navCollapse}</List>
    </div>
  );
};

export default CollapseComponent;
