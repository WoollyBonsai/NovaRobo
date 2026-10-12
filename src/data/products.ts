export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: 'manipulators' | 'mobile_robots' | 'grippers' | 'research_kits';
  categoryLabel: string;
  price: number;
  inStock: boolean;
  leadTime: string;
  badge?: string;
  image: string;
  description: string;
  longDescription: string;
  specs: {
    degreesOfFreedom?: string;
    payload?: string;
    reach?: string;
    repeatability?: string;
    weight?: string;
    power?: string;
    communication?: string;
    maxSpeed?: string;
    ipRating?: string;
    batteryLife?: string;
    operatingTemp?: string;
  };
  highlights: string[];
  billOfMaterials: {
    part: string;
    spec: string;
    tolerance: string;
    origin: string;
  }[];
  cadDownloads: {
    format: string;
    filename: string;
    size: string;
  }[];
  ros2Package: string;
}

export interface ComponentItem {
  id: string;
  name: string;
  category: 'actuators' | 'gearboxes' | 'sensors' | 'compute' | 'power';
  categoryLabel: string;
  price: number;
  inStock: boolean;
  stockCount: number;
  voltage: string;
  protocol: 'CAN-FD' | 'EtherCAT' | 'UART' | 'I2C' | 'SPI';
  description: string;
  specs: Record<string, string>;
  image: string;
}

export interface Order {
  id: string;
  createdAt: string;
  items: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    warranty: string;
  }[];
  total: number;
  status: 'Fabrication' | 'SMT Assembly' | 'CNC Milling' | 'QA & Calibration' | 'Dispatched' | 'Delivered';
  statusProgress: number; // 0 to 100
  shippingAddress: string;
  trackingNumber: string;
  carrier: string;
}

export interface CustomEnquiry {
  id: string;
  clientName: string;
  organization: string;
  email: string;
  projectType: string;
  payloadRequirement: string;
  reachRequirement: string;
  environment: string;
  budgetRange: string;
  timeline: string;
  notes: string;
  status: 'Under Review' | 'Engineering Analysis' | 'Quotation Ready' | 'Approved';
  createdAt: string;
  estimatedQuote?: number;
}

export interface SupportTicket {
  id: string;
  subject: string;
  category: 'Kinematics' | 'Firmware' | 'Electrical' | 'Mechanical' | 'Calibration';
  status: 'Open' | 'Engineering Assigned' | 'Resolved';
  lastUpdated: string;
  messages: {
    sender: 'customer' | 'engineer';
    authorName: string;
    timestamp: string;
    text: string;
  }[];
}

export interface LabDoc {
  id: string;
  title: string;
  category: 'ROS2 SDK' | 'Hardware Wiring' | 'Kinematics' | 'Firmware';
  readingTime: string;
  summary: string;
  content: string;
  codeSnippet?: string;
  downloads?: { title: string; filename: string }[];
}

export const PRODUCTS: Product[] = [
  {
    id: 'nr-k6-pro',
    name: 'Nova Kinematic-6 Pro',
    tagline: '6-DOF Precision Collaborative Robotic Arm with Sub-0.02mm Kinematic Accuracy',
    category: 'manipulators',
    categoryLabel: 'Robotic Manipulators',
    price: 4850,
    inStock: true,
    leadTime: '3-5 Business Days',
    badge: 'FLAGSHIP ROBOT',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
    description: 'Industrial-grade 6-degree-of-freedom robotic manipulator designed for high-precision laboratory automation, assembly, and autonomous testing.',
    longDescription: 'The Nova Kinematic-6 Pro represents the pinnacle of compact hardware engineering. Milled entirely from aircraft-grade 7075-T6 aluminum, each joint integrates custom frameless BLDC motors paired with zero-backlash strain wave gearboxes. An embedded dual-core STM32H7 real-time kinematics processor calculates forward and inverse kinematics at 1,000 Hz with native EtherCAT and CAN-FD communication.',
    specs: {
      degreesOfFreedom: '6 Rotary Joints',
      payload: '5.0 kg (Rated) / 6.5 kg (Peak)',
      reach: '850 mm Radial Spherical Envelope',
      repeatability: '±0.02 mm (ISO 9283 Certified)',
      weight: '14.2 kg (Aluminum 7075-T6 Monocoque)',
      power: '48V DC, 350W Nominal (850W Peak)',
      communication: 'EtherCAT @ 1kHz / CAN-FD / USB 3.0',
      maxSpeed: '180°/sec per Joint',
      ipRating: 'IP54 Standard (IP65 Wrist Option)',
      operatingTemp: '-10°C to +50°C',
    },
    highlights: [
      'Sub-0.02mm ISO certified repeatable accuracy',
      'Dual absolute 19-bit magnetic optical encoders per joint',
      'Native ROS2 Jazzy / Humble driver with MoveIt2 configuration',
      'Integrated torque sensing on all 6 axes for collaborative safety',
    ],
    billOfMaterials: [
      { part: 'J1-J3 Actuation Units', spec: 'Harmonic Drive CSF-20-100 + Custom 250W BLDC', tolerance: '< 0.005 mm', origin: 'Nova Robo In-House CNC' },
      { part: 'J4-J6 Wrist Assembly', spec: 'Harmonic Drive CSF-14-80 + Custom 90W BLDC', tolerance: '< 0.008 mm', origin: 'Nova Robo In-House CNC' },
      { part: 'Kinematics Core Board', spec: 'Dual-Core STM32H743VIT6 480MHz Real-Time PCB', tolerance: 'IPC Class 3', origin: 'Nova Robo SMT Line' },
      { part: 'Structural Chassis', spec: 'Billet 7075-T6 Aerospace Aluminum (Hard Anodized)', tolerance: '±0.01 mm', origin: 'Nova Robo 5-Axis Milling' },
      { part: 'Tool Mounting Flange', spec: 'ISO 9409-1-50-4-M6 Quick-Disconnect Standard', tolerance: '±0.005 mm', origin: 'Nova Robo Precision Turning' },
    ],
    cadDownloads: [
      { format: 'STEP 3D Solid Model', filename: 'nova_kinematic_6_pro_assembly.step', size: '42.8 MB' },
      { format: 'URDF Package (ROS2/Gazebo)', filename: 'nova_k6_pro_description.zip', size: '14.2 MB' },
      { format: 'Kinematics DH Parameters Spec', filename: 'nova_k6_dh_kinematics_table.pdf', size: '1.8 MB' },
    ],
    ros2Package: 'ros2 launch nova_k6_moveit_config demo.launch.py',
  },
  {
    id: 'nr-amr-100',
    name: 'Nova Rover AMR-100',
    tagline: 'Autonomous Mobile Robot with 3D SLAM Navigation & 100kg Heavy Payload Capacity',
    category: 'mobile_robots',
    categoryLabel: 'Autonomous Mobile Robots',
    price: 6200,
    inStock: true,
    leadTime: '5-7 Business Days',
    badge: 'HEAVY PAYLOAD',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    description: 'Industrial autonomous transport robot featuring 360° LiDAR, dual stereoscopic depth cameras, and Nav2 multi-robot fleet management.',
    longDescription: 'Engineered for smart factory logistics, cleanroom transfers, and autonomous research, the Nova Rover AMR-100 combines differential drive kinematics with magnetic trackless navigation. Equipped with high-energy LiFePO4 batteries offering 12 hours of continuous operation and automatic docking capability.',
    specs: {
      degreesOfFreedom: 'Differential Drive (3-DOF Planar)',
      payload: '100 kg Distributed Top Deck',
      reach: 'Flat Floor / 15mm Incline Clearance',
      repeatability: '±5.0 mm Waypoint Stopping Precision',
      weight: '38.5 kg',
      power: '24V 40Ah LiFePO4 (12h Runtime)',
      communication: 'Dual-Band Wi-Fi 6, 5G Industrial Gateway, CAN-FD',
      maxSpeed: '1.5 m/s (5.4 km/h)',
      ipRating: 'IP54 Industrial Seal',
      batteryLife: '12 Hours Autonomous (Auto-Docking 2h Fast Charge)',
    },
    highlights: [
      'Dual 360° LiDAR safety zones with emergency hardware interlock',
      'Nav2 ready out of the box with dynamic obstacle avoidance',
      'Top-deck mounting array for Nova Kinematic arms (Mobile Manipulator)',
      'Web-based fleet monitoring telemetry dashboard included',
    ],
    billOfMaterials: [
      { part: 'Drive Actuators', spec: '2x 400W Brushless Hub Motors with Planetary Reduction', tolerance: '±0.02 mm', origin: 'Custom Machined' },
      { part: 'SLAM Perception', spec: 'NovaScan 360 Solid State LiDAR + Front Depth Vision', tolerance: '0.1° Angular', origin: 'Nova Optics Lab' },
      { part: 'Chassis Frame', spec: 'Welded Structural Steel Tubing + Aluminum Body Panels', tolerance: '±0.05 mm', origin: 'Nova Metal Fab' },
      { part: 'BMS Unit', spec: 'Integrated 40Ah Smart Battery Controller with CAN telemetry', tolerance: 'ISO 26262', origin: 'Nova SMT' },
    ],
    cadDownloads: [
      { format: 'STEP Complete Chassis', filename: 'nova_amr_100_full_assembly.step', size: '68.4 MB' },
      { format: 'Nav2 Configuration Files', filename: 'nova_amr_nav2_stack.tar.gz', size: '28.1 MB' },
    ],
    ros2Package: 'ros2 launch nova_rover_bringup amr_100_navigation.launch.py',
  },
  {
    id: 'nr-grip-g2',
    name: 'Nova Gripper G2-Adaptive',
    tagline: 'High-Torque Programmable Electric Parallel Gripper with Tactile Force Feedback',
    category: 'grippers',
    categoryLabel: 'End-Effectors & Grippers',
    price: 890,
    inStock: true,
    leadTime: 'Immediate Dispatch',
    badge: 'TACTILE SENSING',
    image: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=800&q=80',
    description: 'Precision electric robotic gripper with programmable grip force from 20N to 235N and interchangeable fingertips.',
    longDescription: 'Designed to mount directly onto the Nova Kinematic-6 Pro and other standard ISO 9409-1 robotic wrists. The G2-Adaptive utilizes an internal brushless DC servo with integrated linear encoder and strain-gauge finger sensors to grasp fragile optical lenses as effortlessly as solid steel billets without deformation.',
    specs: {
      degreesOfFreedom: '1 Parallel Linear Actuation',
      payload: '3.5 kg Friction Grip / 7.0 kg Form-Fit',
      reach: '85 mm Total Stroke (Adjustable)',
      repeatability: '±0.01 mm Position Control',
      weight: '720 grams',
      power: '24V DC, 45W Peak',
      communication: 'Modbus RTU over RS-485 / CAN 2.0B / IO-Link',
      maxSpeed: '120 mm/s Closing Speed',
      ipRating: 'IP65 Water & Dust Tight',
    },
    highlights: [
      'Grip force resolution adjustable from 20N to 235N in 1N increments',
      'Drop detection and part verification telemetry',
      'Direct ISO 9409-1-50 flange bolt pattern',
      'Includes silicone soft-touch and knurled hardened steel finger tips',
    ],
    billOfMaterials: [
      { part: 'Linear Drive', spec: 'Precision Ground Ball Screw with 2mm Lead', tolerance: '±0.002 mm', origin: 'Precision Ground' },
      { part: 'Motor & Encoder', spec: 'Slotless BLDC + 14-Bit Absolute Linear Sensor', tolerance: 'Class H', origin: 'Nova Actuation' },
      { part: 'Gripper Body', spec: 'Hard-Coat Anodized 6061-T6 Aluminum', tolerance: '±0.01 mm', origin: 'Nova CNC' },
    ],
    cadDownloads: [
      { format: 'STEP Gripper Assembly', filename: 'nova_g2_adaptive_gripper.step', size: '12.5 MB' },
      { format: 'Fingertip 3D Print CAD (.STL)', filename: 'nova_g2_custom_fingertips.stl', size: '4.1 MB' },
    ],
    ros2Package: 'ros2 run nova_gripper_driver g2_service_node',
  },
  {
    id: 'nr-quad-mini',
    name: 'Nova Quad-Mini Research Kit',
    tagline: '12-DOF High-Dynamic Biomimetic Quadruped Robot for Locomotion Research',
    category: 'research_kits',
    categoryLabel: 'Research Robotics Kits',
    price: 3400,
    inStock: true,
    leadTime: '3-4 Business Days',
    badge: 'BIOMIMETIC RESEARCH',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    description: 'Open-architecture 12-DOF quadruped robot powered by quasi-direct drive actuators for reinforcement learning and terrain traversal experiments.',
    longDescription: 'Created for university labs, robotics researchers, and advanced developers, the Quad-Mini features quasi-direct drive brushless motors providing ultra-high backdrivability and terrain compliance. Shipped with pre-tuned MIT Cheetah-style convex MPC and reinforcement learning locomotion controllers in Isaac Sim and PyBullet.',
    specs: {
      degreesOfFreedom: '12 Quasi-Direct Drive Joints (3 per Leg)',
      payload: '3.0 kg Exploration Payload Top Deck',
      reach: 'Can navigate stairs up to 12cm height',
      repeatability: 'High-Bandwidth Torque Control (1 kHz)',
      weight: '8.8 kg (Including Battery)',
      power: '24V 10Ah High-C Li-Ion Pack (90 min Runtime)',
      communication: 'Wi-Fi 6, Ethernet, CAN-FD Bus to all 12 Motors',
      maxSpeed: '2.2 m/s (Gait Trotting)',
      operatingTemp: '-5°C to +45°C',
    },
    highlights: [
      '12x QDD high-torque planetary actuators with transparent backdrivability',
      'Onboard NVIDIA Jetson Orin Nano + STM32H7 low-level gait engine',
      'Simulation models for Gazebo, Webots, and NVIDIA Isaac Lab',
      'Fully modular legs: unbolt and replace in under 3 minutes',
    ],
    billOfMaterials: [
      { part: '12x Leg Actuators', spec: 'Custom QDD-60 Motors with 6:1 Planetary Gearbox', tolerance: '< 0.01 mm', origin: 'Nova Robo Actuation' },
      { part: 'Carbon Chassis', spec: 'Multi-Layer 3K Carbon Fiber Plate Monocoque', tolerance: '±0.05 mm', origin: 'Nova Composite Lab' },
      { part: 'Power Distribution', spec: '12-Channel High-Current FOC Power Bus with Shunt Telemetry', tolerance: 'IPC Class 3', origin: 'Nova SMT' },
    ],
    cadDownloads: [
      { format: 'STEP Complete Robot', filename: 'nova_quad_mini_complete.step', size: '36.9 MB' },
      { format: 'Isaac Sim USD Asset', filename: 'nova_quad_mini_isaac.usd', size: '52.1 MB' },
    ],
    ros2Package: 'ros2 launch nova_quad_control quadruped_gait.launch.py',
  },
  {
    id: 'nr-delta-300',
    name: 'Nova Delta-Pick 300',
    tagline: 'Ultra-Fast 3-DOF Parallel Delta Robot for High-Speed Pick and Place (150 Cycles/min)',
    category: 'manipulators',
    categoryLabel: 'Robotic Manipulators',
    price: 5100,
    inStock: false,
    leadTime: 'Pre-Order (Ships in 14 Days)',
    badge: 'ULTRA HIGH SPEED',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    description: 'Parallel kinematic mechanism built with carbon-fiber arms delivering 150 picks per minute for packaging, PCB sorting, and sorting lines.',
    longDescription: 'The Nova Delta-Pick 300 delivers exceptional dynamic acceleration up to 10G. Powered by 3 direct-drive AC servo actuators and carbon fiber link tubes, it offers continuous 24/7 reliability for industrial pick-and-place lines.',
    specs: {
      degreesOfFreedom: '3-DOF Parallel (Optional 4th Rotary Axis)',
      payload: '2.0 kg (Rated) / 3.0 kg (Max)',
      reach: '600 mm Diameter Cylindrical Workspace',
      repeatability: '±0.05 mm',
      weight: '28 kg (Rigid Ceiling Mounting Frame)',
      power: '220V AC Single Phase, 1.2 kW',
      communication: 'EtherCAT / Modbus TCP / Digital I/O High Speed',
      maxSpeed: '150 Standard Cycles/minute',
    },
    highlights: [
      'Carbon-fiber hollow arms with zero backlash spherical joints',
      'Direct EtherCAT servo synchronization',
      'Vacuum gripper package included',
    ],
    billOfMaterials: [
      { part: 'Parallel Servo Motors', spec: '3x 400W AC Direct Drive Servos with Brake', tolerance: 'Grade A', origin: 'Precision Servo' },
      { part: 'Carbon Linkages', spec: 'Pultruded High-Modulus Carbon Tubes with Titanium Ends', tolerance: '±0.01 mm', origin: 'Nova Composites' },
    ],
    cadDownloads: [
      { format: 'STEP Delta Robot', filename: 'nova_delta_pick_300.step', size: '22.0 MB' },
    ],
    ros2Package: 'ros2 launch nova_delta_driver delta_controller.launch.py',
  },
];

export const COMPONENTS: ComponentItem[] = [
  {
    id: 'comp-drv-7510',
    name: 'NR-DRV-7510 High-Power FOC Driver',
    category: 'compute',
    categoryLabel: 'Motor Drivers & Controllers',
    price: 145,
    inStock: true,
    stockCount: 120,
    voltage: '12V - 75V DC',
    protocol: 'CAN-FD',
    description: 'Field Oriented Control (FOC) brushless motor driver handling up to 100A peak current with onboard 18-bit magnetic encoder reader and CAN-FD interface.',
    specs: {
      'Continuous Current': '45A RMS (100A Peak)',
      'Control Modes': 'Torque (Current), Velocity, Position',
      'Feedback': 'SPI/ABZ Encoder, BiSS-C, Hall Sensors',
      'Switching Frequency': '20 kHz - 40 kHz PWM',
      'Dimensions': '52 x 48 x 14 mm',
    },
    image: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'comp-gear-csf17',
    name: 'Strain Wave Harmonic Drive 17-100',
    category: 'gearboxes',
    categoryLabel: 'Precision Gearboxes',
    price: 320,
    inStock: true,
    stockCount: 42,
    voltage: 'Mechanical',
    protocol: 'UART',
    description: 'Zero-backlash cup-type harmonic reduction gear for robotic joints with 100:1 reduction ratio and 54 Nm repeatable peak torque.',
    specs: {
      'Reduction Ratio': '100:1',
      'Backlash': '< 10 Arcsec (Zero Backlash)',
      'Rated Output Torque': '34 Nm',
      'Peak Torque': '54 Nm',
      'Weight': '420 grams',
    },
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'comp-lidar-360',
    name: 'NovaScan 360 Solid-State LiDAR',
    category: 'sensors',
    categoryLabel: 'Sensors & Perception',
    price: 490,
    inStock: true,
    stockCount: 28,
    voltage: '12V - 24V DC',
    protocol: 'EtherCAT',
    description: 'Compact 360-degree automotive-grade solid-state laser scanner with 25-meter range and 0.1° angular resolution for autonomous mobile robotics.',
    specs: {
      'Detection Range': '0.05m to 25.0m @ 90% Reflectivity',
      'Scan Frequency': '10 Hz - 25 Hz Configurable',
      'Sample Rate': '36,000 points/second',
      'Interface': '100BASE-TX Ethernet / ROS2 Driver',
      'Enclosure': 'IP67 Waterproof Cast Aluminum',
    },
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'comp-cam-depth',
    name: 'StereoSense Depth Camera Pro',
    category: 'sensors',
    categoryLabel: 'Sensors & Perception',
    price: 280,
    inStock: true,
    stockCount: 65,
    voltage: '5V USB 3.0',
    protocol: 'UART',
    description: 'Active stereoscopic global-shutter depth camera with onboard hardware depth engine and integrated 6-axis IMU for visual odometry.',
    specs: {
      'Depth Resolution': 'Up to 1280 x 720 @ 90 fps',
      'RGB Resolution': '1920 x 1080 @ 30 fps',
      'Depth Range': '0.2m to 6.5m',
      'Field of View': '87° x 58° (Diagonal 95°)',
      'IMU': '6-DOF 400Hz Hardware Synchronized',
    },
    image: 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'comp-h7-carrier',
    name: 'NovaCore-H7 Robotics Motherboard',
    category: 'compute',
    categoryLabel: 'Compute & Embedded Boards',
    price: 195,
    inStock: true,
    stockCount: 88,
    voltage: '12V - 48V DC',
    protocol: 'CAN-FD',
    description: 'High-density multi-axis robotics compute motherboard equipped with dual STM32H743 + ESP32-S3 processors, 4x isolated CAN-FD channels, and 8x PWM channels.',
    specs: {
      'Processors': 'STM32H743 (480MHz Cortex-M7) + ESP32-S3 (Wi-Fi/BLE)',
      'CAN Channels': '4x Galvanically Isolated CAN-FD with 120Ω Term.',
      'Serial': '2x RS485, 3x UART, 2x I2C, 1x MicroSD',
      'Power Input': 'Wide 9V-58V with Dual Reverse-Polarity Protection',
      'Firmware': 'Micro-ROS / FreeRTOS Native Support',
    },
    image: 'https://images.unsplash.com/photo-1517055729445-fa7d27394b48?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'comp-imu-rtk',
    name: 'Precision 9-Axis Industrial IMU + RTK',
    category: 'sensors',
    categoryLabel: 'Sensors & Perception',
    price: 160,
    inStock: true,
    stockCount: 54,
    voltage: '3.3V - 5V DC',
    protocol: 'CAN-FD',
    description: 'Sub-degree drift tactical-grade 9-axis inertial measurement unit with integrated multiband RTK GNSS receiver module for centimeter positioning.',
    specs: {
      'Gyro In-Run Bias': '0.01° / hour stability',
      'Accelerometer Noise': '15 µg/√Hz',
      'GNSS Bands': 'GPS L1/L2, GLONASS, Galileo, BeiDou',
      'Update Rate': '1000 Hz IMU / 20 Hz RTK Positioning',
    },
    image: 'https://images.unsplash.com/photo-1581092162384-8987c1d64718?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'comp-act-cm80',
    name: 'Cycloidal Actuator Module CM-80',
    category: 'actuators',
    categoryLabel: 'Integrated Actuator Modules',
    price: 410,
    inStock: true,
    stockCount: 30,
    voltage: '24V - 48V DC',
    protocol: 'CAN-FD',
    description: 'All-in-one integrated robotic actuator module containing high-torque frameless BLDC motor, 36:1 cycloidal gearbox, dual encoders, and driver in one sealed unit.',
    specs: {
      'Peak Output Torque': '80 Nm',
      'Rated Output Torque': '42 Nm',
      'Max Speed': '150 RPM',
      'Backlash': '< 1 Arcmin',
      'Weight': '1.35 kg',
    },
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80',
  },
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'NR-ORD-9842',
    createdAt: '2026-10-09',
    items: [
      { id: 'nr-k6-pro', name: 'Nova Kinematic-6 Pro', price: 4850, quantity: 1, warranty: 'Enterprise 3-Year Protection' },
      { id: 'nr-grip-g2', name: 'Nova Gripper G2-Adaptive', price: 890, quantity: 1, warranty: 'Standard 1-Year' },
    ],
    total: 6140,
    status: 'QA & Calibration',
    statusProgress: 75,
    shippingAddress: 'Robotics Autonomous Systems Lab, Dept of Mechanical Engineering, IIT Delhi, New Delhi 110016',
    trackingNumber: 'DHL-EX-99201488',
    carrier: 'DHL Express Heavy Cargo',
  },
  {
    id: 'NR-ORD-8419',
    createdAt: '2026-09-28',
    items: [
      { id: 'comp-h7-carrier', name: 'NovaCore-H7 Robotics Motherboard', price: 195, quantity: 4, warranty: 'Standard 1-Year' },
      { id: 'comp-drv-7510', name: 'NR-DRV-7510 High-Power FOC Driver', price: 145, quantity: 4, warranty: 'Standard 1-Year' },
    ],
    total: 1360,
    status: 'Delivered',
    statusProgress: 100,
    shippingAddress: 'DeepTech Ventures Incubation Facility, Kalchuri LNCT Group, Bhopal 462022',
    trackingNumber: 'FDX-7740192841',
    carrier: 'FedEx Priority',
  },
];

export const INITIAL_ENQUIRIES: CustomEnquiry[] = [
  {
    id: 'NR-REQ-2026-041',
    clientName: 'Dr. Vikram Chandra',
    organization: 'Apex Aerospace Technologies',
    email: 'v.chandra@apexaero.in',
    projectType: 'High-Temperature 6-DOF Carbon Fiber Manipulator',
    payloadRequirement: '8.5 kg',
    reachRequirement: '1200 mm',
    environment: 'Cleanroom ISO 5 / Vacuum Chamber Resistant',
    budgetRange: '$15,000 - $25,000',
    timeline: '8 Weeks Prototype SLA',
    notes: 'Require specialized radiation-hardened wiring harnesses and low-outgassing lubricant for vacuum operation.',
    status: 'Quotation Ready',
    createdAt: '2026-10-08',
    estimatedQuote: 18500,
  },
  {
    id: 'NR-REQ-2026-038',
    clientName: 'Aarav Singhal',
    organization: 'Kinetix Autonomous Systems',
    email: 'aarav@kinetixsystems.com',
    projectType: 'Custom 4-Wheel Steer Heavy AMR Chassis (500kg)',
    payloadRequirement: '500 kg',
    reachRequirement: 'Omnidirectional Holonomic Mecanum',
    environment: 'Industrial Warehouse & Loading Dock',
    budgetRange: '$10,000 - $18,000',
    timeline: '6 Weeks',
    notes: 'Needs CAN-FD gateway to connect directly with Siemens S7-1500 PLC.',
    status: 'Engineering Analysis',
    createdAt: '2026-10-02',
    estimatedQuote: 13200,
  },
];

export const INITIAL_SUPPORT_TICKETS: SupportTicket[] = [
  {
    id: 'TICK-802',
    subject: 'EtherCAT Synchronization Jitter on Kinematic-6 Pro',
    category: 'Kinematics',
    status: 'Open',
    lastUpdated: '10 Mins Ago',
    messages: [
      {
        sender: 'customer',
        authorName: 'Rohan Sharma (Lab Lead)',
        timestamp: '11:15 AM',
        text: 'Hello Nova Robo team, we are running ROS2 Jazzy with our PREEMPT_RT Linux kernel, and noticing cyclic sync packet jitter exceeding 80us on Joint 4.',
      },
      {
        sender: 'engineer',
        authorName: 'Dr. Aris Thorne (Chief Kinematics Architect)',
        timestamp: '11:24 AM',
        text: 'Hi Rohan! Please verify your NIC hardware interrupt moderation settings. On Ubuntu 24.04 with RT patch, run `ethtool -C eth0 rx-usecs 0`. Also confirm your NovaCore-H7 firmware is updated to v2.4.1 which implements distributed clock (DC) offset compensation.',
      },
    ],
  },
];

export const LAB_DOCS: LabDoc[] = [
  {
    id: 'ros2-quickstart',
    title: 'Connecting Nova Kinematic-6 Pro to ROS2 Jazzy / Humble',
    category: 'ROS2 SDK',
    readingTime: '5 min read',
    summary: 'Step-by-step guide to installing the nova_k6_driver package, setting up MoveIt2 trajectory execution, and configuring hardware safety zones.',
    content: `### Prerequisites
Ensure your host workstation has Ubuntu 24.04 (Jazzy) or Ubuntu 22.04 (Humble) with a PREEMPT_RT patched kernel for sub-millisecond EtherCAT control.

### Installation
Clone the official Nova Robo hardware repository into your colcon workspace:

\`\`\`bash
cd ~/ros2_ws/src
git clone https://github.com/NovaRobo-Official/nova_robotics_stack.git
rosdep install --from-paths . --ignore-src -r -y
colcon build --symlink-install --cmake-args -DCMAKE_BUILD_TYPE=Release
source install/setup.bash
\`\`\`

### Launching Telemetry & MoveIt2
To verify hardware connectivity over CAN-FD or EtherCAT:

\`\`\`bash
ros2 launch nova_k6_moveit_config demo.launch.py use_fake_hardware:=false
\`\`\`

All 6 joint states will publish to \`/joint_states\` at 1000 Hz with torque estimation telemetry.`,
    codeSnippet: `import rclpy
from nova_msgs.msg import KinematicTelemetry

def telemetry_callback(msg):
    print(f"TCP Position: X={msg.tcp.x:.2f}, Y={msg.tcp.y:.2f}, Z={msg.tcp.z:.2f}")
    print(f"Repeatability Variance: {msg.repeatability_variance} mm")`,
  },
  {
    id: 'canfd-driver-spec',
    title: 'NR-DRV-7510 CAN-FD Protocol Specification & CRC Framing',
    category: 'Firmware',
    readingTime: '8 min read',
    summary: 'Electrical wiring schematic, 5 Mbps CAN-FD frame format, register map, and real-time FOC velocity/torque loop tuning.',
    content: `### CAN-FD Physical Layer Setup
The NR-DRV-7510 supports standard CAN 2.0B (1 Mbps) and high-speed CAN-FD (5 Mbps data bitrate). Use twisted-pair 120Ω characteristic impedance wiring with terminal resistors enabled at both ends of the bus.

### Frame Structure
- Arbitration ID: \`0x140 + NodeID\`
- Data Length: 64 Bytes
- Command Byte: \`0x01 = Torque Mode\`, \`0x02 = Velocity Mode\`, \`0x03 = Absolute Position Mode\`
- Target Value: 32-bit float (IEEE 754)
- Timestamp: 32-bit microsecond monotonic hardware counter`,
  },
  {
    id: 'mechanical-calibration',
    title: 'Zero-Backlash Joint Calibration & Optical Zeroing Procedure',
    category: 'Kinematics',
    readingTime: '6 min read',
    summary: 'Standard operating procedure for calibrating absolute 19-bit magnetic encoders with optical homing jigs after maintenance.',
    content: `Every Nova Robo arm undergoes laser interferometry calibration before shipment. If a motor joint is replaced in the field:
1. Fix the joint to the mechanical calibration stop jig.
2. Connect USB-C diagnostic cable to the service port on Joint 1.
3. Execute \`nova-calibrate --joint <index> --write-eeprom\`.
4. Verify repeatability across 100 cycles in the Nova Robo Studio utility.`,
  },
];
