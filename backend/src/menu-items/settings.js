// assets
import { DashboardOutlined, UserOutlined, MedicineBoxOutlined, CaretRightOutlined, CaretDownOutlined } from '@ant-design/icons';

// icons
const icons = {
  DashboardOutlined,
  UserOutlined,
  MedicineBoxOutlined,
  CollapseIcon: {
    collapsed: CaretRightOutlined, // Icon when collapsed
    expanded: CaretDownOutlined // Icon when expanded
  }
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
  icon: icons.CollapseIcon,
  children: [
    {
      id: 'medical_condition',
      title: 'Medical Conditions',
      type: 'item',
      url: 'settings/medicalCondition',
      icon: icons.MedicineBoxOutlined,
      breadcrumbs: false
    }
  ]
};

export default settings;
