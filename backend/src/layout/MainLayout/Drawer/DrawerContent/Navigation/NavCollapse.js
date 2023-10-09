import React, { useState } from 'react';
import { List, Typography, ListItemIcon } from '@mui/material';
import { CaretRightOutlined, CaretDownOutlined } from '@ant-design/icons';
import NavItem from './NavItem';
import {  useSelector } from 'react-redux';

const CollapseComponent = ({ item }) => {
  const [isCollapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed(!isCollapsed);
  };

  const toggleIcon = isCollapsed ? <CaretRightOutlined /> : <CaretDownOutlined />;
  
  const { drawerOpen, openItem } = useSelector((state) => state.menu);
  const Icon = item.icon;
  const itemIcon = item.icon ? <Icon style={{ fontSize: drawerOpen ? '1rem' : '1.25rem' }} /> : false;
  const isSelected = openItem.findIndex((id) => id === item.id) > -1;

  
  const handleKeyDown = (event) => {
    // Check if the Enter key (key code 13) or Spacebar (key code 32) is pressed
    if (event.keyCode === 13 || event.keyCode === 32) {
      toggleCollapse();
    }
  };

  const navCollapse = isCollapsed
    ? null // Render nothing when collapsed
    : item.children?.map((menuItem) => <NavItem key={menuItem.id} item={menuItem} level={1} />);

    const textColor = 'text.primary';
  const iconSelectedColor = 'primary.main';

  return (
    <div
      role="button" // Add a role to make it accessible
      tabIndex={0} // Make it focusable
      onClick={toggleCollapse}
      onKeyDown={handleKeyDown} // Listen for keyboard events
    >
      <div style={{ display: 'flex',paddingLeft: '24px',marginBottom: '12px',cursor:'pointer' }}>
      {itemIcon && (
        <ListItemIcon
          sx={{
            minWidth: 28,
            color: isSelected ? iconSelectedColor : textColor,
            ...(!drawerOpen && {
              borderRadius: 1.5,
              width: 36,
              height: 36,
              alignItems: 'center',
              justifyContent: 'center',
              '&:hover': {
                bgcolor: 'secondary.lighter'
              }
            }),
            ...(!drawerOpen &&
              isSelected && {
                bgcolor: 'primary.lighter',
                '&:hover': {
                  bgcolor: 'primary.lighter'
                }
              })
          }}
        >
          {itemIcon}
        </ListItemIcon>
      )}
        <Typography variant="subtitle2" color="textSecondary" style={{ marginTop:'-5px',fontWeight: '400', fontSize: '0.875rem', color: '#262626' ,fontFamily: 'Public Sans,sans-serif', minWidth:'180px'}}>
          {item.title}
        </Typography>
        {toggleIcon}
      </div>
      <List sx={{ py: 0, zIndex: 0 }}>{navCollapse}</List>
    </div>
  );
};

export default CollapseComponent;
