// assets
import {
  DashboardOutlined,
  UserOutlined,
  MedicineBoxOutlined,
  CaretRightOutlined,
  CaretDownOutlined,
  QuestionCircleOutlined,
  SettingOutlined,
  LockOutlined,
  FileDoneOutlined,
  BellOutlined
} from '@ant-design/icons';
import LocalDiningOutlinedIcon from '@mui/icons-material/LocalDiningOutlined';
import FastfoodOutlinedIcon from '@mui/icons-material/FastfoodOutlined';
import EmojiFoodBeverageOutlinedIcon from '@mui/icons-material/EmojiFoodBeverageOutlined';
// icons
const icons = {
  DashboardOutlined,
  UserOutlined,
  MedicineBoxOutlined,
  QuestionCircleOutlined,
  LockOutlined,
  FileDoneOutlined,
  LocalDiningOutlinedIcon,
  FastfoodOutlinedIcon,
  EmojiFoodBeverageOutlinedIcon,
  BellOutlined,
  CollapseIcon: {
    collapsed: CaretRightOutlined, // Icon when collapsed
    expanded: CaretDownOutlined // Icon when expanded
  },
  SettingOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const settings = {
  id: 'group-dashboard',
  title: 'settings',
  type: 'collapse',
  titleStyle: {
    fontWeight: 'bold', // Add your custom styles here
    fontSize: '1.2rem', // Add your custom styles here
    color: '#007bff' // Add your custom styles here
  },
  icon: icons.SettingOutlined,
  children: [
    {
      id: 'medicalCondition',
      title: 'Medical Conditions',
      type: 'item',
      url: 'settings/medicalCondition',
      icon: icons.MedicineBoxOutlined,
      breadcrumbs: false
    },
    {
      id: 'recipeUnits',
      title: 'Recipe Units',
      type: 'item',
      url: 'settings/recipeUnits',
      icon: icons.EmojiFoodBeverageOutlinedIcon,
      breadcrumbs: false
    },
    {
      id: 'nutrition_settings',
      title: 'Nutrition Settings',
      type: 'item',
      url: 'settings/nutritionSettings/manage',
      icon: icons.LocalDiningOutlinedIcon,
      breadcrumbs: false
    },
    {
      id: 'meal_settings',
      title: 'Meal Settings',
      type: 'item',
      url: 'settings/mealSettings/manage',
      icon: icons.FastfoodOutlinedIcon,
      breadcrumbs: false
    },
    {
      id: 'notification',
      title: 'Manage Notification',
      type: 'item',
      url: 'settings/notifications',
      icon: icons.BellOutlined,
      breadcrumbs: false
    },
    {
      id: 'terms_conditions',
      title: 'Terms & Conditions',
      type: 'item',
      url: 'settings/tc/manage',
      icon: icons.FileDoneOutlined,
      breadcrumbs: false
    },
    {
      id: 'privacy_policy',
      title: 'Privacy Policy',
      type: 'item',
      url: 'settings/privacyPolicy/manage',
      icon: icons.LockOutlined,
      breadcrumbs: false
    },
    {
      id: 'faq',
      title: 'FAQs',
      type: 'item',
      url: 'settings/faq',
      icon: icons.QuestionCircleOutlined,
      breadcrumbs: false
    },
    {
      id: 'helpcenter',
      title: 'Help Center',
      type: 'item',
      url: 'settings/helpcenter',
      icon: icons.QuestionCircleOutlined,
      breadcrumbs: false
    }
    // {
    //   id: 'generalsettings',
    //   title: 'General Settings',
    //   type: 'item',
    //   url: 'settings/generalSettings/manage',
    //   icon: icons.SettingOutlined,
    //   breadcrumbs: false
    // }
  ]
};

export default settings;
