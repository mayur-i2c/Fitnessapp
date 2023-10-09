import PropTypes from 'prop-types';
import { useState } from 'react'; // Import useState
import { useSelector } from 'react-redux';
import { Box, List, Typography, Collapse, ListItemIcon } from '@mui/material';
import NavItem from './NavItem';

const NavCollapse = ({ item }) => {
  const menu = useSelector((state) => state.menu);
  const { drawerOpen, openItem } = menu;

  const Icon = item.icon;
  const itemIcon = item.icon ? <Icon style={{ fontSize: drawerOpen ? '1rem' : '1.25rem' }} /> : false;
  const isSelected = openItem.findIndex((id) => id === item.id) > -1;

  // Use state to control the collapse state
  const [isCollapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed(!isCollapsed);
  };

  const navCollapse = item.children?.map((menuItem) => <NavItem key={menuItem.id} item={menuItem} level={1} />);
  const textColor = 'text.primary';
  const iconSelectedColor = 'primary.main';
  return (
    <List
      subheader={
        item.title &&
        drawerOpen && (
          <Box sx={{ pl: 3, mb: 1.5 }} style={{ display: 'flex' }} onClick={toggleCollapse}>
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
            <Typography variant="subtitle2" color="textSecondary">
              {item.title}
            </Typography>
          </Box>
        )
      }
      sx={{ mb: drawerOpen ? 1.5 : 0, py: 0, zIndex: 0 }}
    >
      <Collapse in={isCollapsed}>{navCollapse}</Collapse>
    </List>
  );
};

NavCollapse.propTypes = {
  item: PropTypes.object
};

export default NavCollapse;
