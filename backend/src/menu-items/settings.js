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
  FileDoneOutlined
} from '@ant-design/icons';
import LocalDiningOutlinedIcon from '@mui/icons-material/LocalDiningOutlined';
import FastfoodOutlinedIcon from '@mui/icons-material/FastfoodOutlined';
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
      id: 'medical_condition',
      title: 'Medical Conditions',
      type: 'item',
      url: 'settings/medicalCondition',
      icon: icons.MedicineBoxOutlined,
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
    }
  ]
};

export default settings;
