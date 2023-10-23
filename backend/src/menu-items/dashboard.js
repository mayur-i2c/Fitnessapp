// assets
import {
  DashboardOutlined,
  UserOutlined,
  MedicineBoxOutlined,
  AppstoreAddOutlined,
  VideoCameraOutlined,
  FileDoneOutlined
} from '@ant-design/icons';
import AccessibilityNewOutlinedIcon from '@mui/icons-material/AccessibilityNewOutlined';
// icons
const icons = {
  DashboardOutlined,
  UserOutlined,
  MedicineBoxOutlined,
  AppstoreAddOutlined,
  VideoCameraOutlined,
  FileDoneOutlined,
  AccessibilityNewOutlinedIcon
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: 'group-dashboard',
  title: '',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard',
      icon: icons.DashboardOutlined,
      breadcrumbs: false
    },
    {
      id: 'users',
      title: 'Users',
      type: 'item',
      url: '/users',
      icon: icons.UserOutlined,
      breadcrumbs: false
    },
    {
      id: 'essentials',
      title: 'Essentials',
      type: 'item',
      url: '/essentials',
      icon: icons.AppstoreAddOutlined,
      breadcrumbs: false
    },
    {
      id: 'reel',
      title: 'Reels',
      type: 'item',
      url: '/reels',
      icon: icons.VideoCameraOutlined,
      breadcrumbs: false
    },
    {
      id: 'workoutCollection',
      title: 'Workout Collections',
      type: 'item',
      url: '/workoutCollection',
      icon: icons.AccessibilityNewOutlinedIcon,
      breadcrumbs: false
    },
    {
      id: 'exeLibrary',
      title: 'Exercise Library',
      type: 'item',
      url: '/exeLibrary',
      icon: icons.FileDoneOutlined,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
