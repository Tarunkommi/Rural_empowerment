const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Scheme = require('../models/Scheme');

// Load env vars
dotenv.config({ path: './.env' });

const schemes = [
  {
    title: 'PMGDISHA',
    slug: 'pmgdisha',
    shortDescription: 'Making rural households digitally literate across India.',
    description: 'Pradhan Mantri Gramin Digital Saksharta Abhiyaan (PMGDISHA) is the scheme to make six crore persons in rural areas, across States/UTs, digitally literate, reaching to around 40% of rural households by covering one member from every eligible household.',
    category: 'Digital Literacy',
    status: 'Active',
    ministry: 'Ministry of Electronics and Information Technology (MeitY)',
    motto: 'Empowering every rural citizen through digital knowledge.',
    officialWebsite: 'https://www.pmgdisha.in',
    applyLink: 'https://www.pmgdisha.in/register',
    overview: 'The scheme aims to empower citizens in rural areas by training them to operate computers or digital access devices (like tablets, smart phones etc.), send and receive e-mails, browse Internet, access Government services, search for information, undertake digital payment etc. and hence enable them to use the Information Technology and related applications especially Digital Payments to actively participate in the process of nation-building.',
    eligibility: [
      'Nominated from the eligible households in rural areas',
      'Age between 14 to 60 years',
      'Non-smartphone user / Digitally illiterate',
      'Only one person per household'
    ],
    documentsRequired: [
      'Aadhaar Card',
      'Passport size photograph',
      'Mobile Number'
    ],
    benefits: [
      {
        title: 'Free Digital Training',
        description: '20 hours of free basic digital literacy training.',
        icon: 'Monitor'
      },
      {
        title: 'Digital Empowerment',
        description: 'Learn to use smartphones, emails, and internet browsing.',
        icon: 'Smartphone'
      },
      {
        title: 'Online Services',
        description: 'Learn to access online government services and booking.',
        icon: 'Globe'
      },
      {
        title: 'Cashless Transactions',
        description: 'Learn digital payments and cashless economy practices.',
        icon: 'CreditCard'
      }
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: 'Visit Nearest CSC',
        description: 'Find the nearest Common Service Centre (CSC) in your village.',
        icon: 'MapPin'
      },
      {
        stepNumber: 2,
        title: 'Provide Aadhaar',
        description: 'Provide your Aadhaar number and perform biometric authentication.',
        icon: 'Fingerprint'
      },
      {
        stepNumber: 3,
        title: 'Enrollment',
        description: 'The VLE (Village Level Entrepreneur) will enroll you in the PMGDISHA portal.',
        icon: 'UserPlus'
      },
      {
        stepNumber: 4,
        title: 'Undergo Training',
        description: 'Complete the 20 hours training module.',
        icon: 'BookOpen'
      },
      {
        stepNumber: 5,
        title: 'Take Exam',
        description: 'Clear the online examination to get certified.',
        icon: 'CheckCircle'
      }
    ],
    features: [
      'Government Certified',
      'Completely Free',
      'Available in Local Languages',
      'Nationwide Network'
    ],
    faq: [
      {
        question: 'Is the training completely free?',
        answer: 'Yes, the training is completely free of cost for all eligible beneficiaries.'
      },
      {
        question: 'Do I need a smartphone to enroll?',
        answer: 'No, the training center will provide the devices required for learning.'
      },
      {
        question: 'Is Aadhaar mandatory?',
        answer: 'Yes, Aadhaar is mandatory for enrollment and biometric authentication.'
      }
    ],
    statistics: {
      beneficiaries: '60M+',
      villagesCovered: '250K+',
      statesCovered: '28',
      trainingCenters: '350K+'
    }
  },
  {
    title: 'BharatNet',
    slug: 'bharatnet',
    shortDescription: 'Connecting all Gram Panchayats with high-speed broadband.',
    description: 'BharatNet is a flagship mission implemented by Bharat Broadband Network Ltd. (BBNL). The objective is to facilitate the delivery of e-governance, e-health, e-education, e-banking, Internet and other services to the rural India.',
    category: 'Internet Access',
    status: 'Active',
    ministry: 'Department of Telecommunications (DoT)',
    motto: 'High-speed digital connectivity for every village in India.',
    officialWebsite: 'https://bbnl.nic.in/',
    overview: 'BharatNet aims to connect all 2.5 lakh Gram Panchayats (GPs) in the country to provide broadband connectivity. It is a highly scalable network infrastructure accessible on a non-discriminatory basis, to provide on demand, affordable broadband connectivity of 2 Mbps to 20 Mbps for all households and on demand capacity to all institutions.',
    eligibility: [
      'Available to all Gram Panchayats in India',
      'Citizens of connected villages',
      'Local businesses and institutions'
    ],
    documentsRequired: [
      'Aadhaar Card (for local connection)',
      'Address Proof'
    ],
    benefits: [
      {
        title: 'High-Speed Broadband',
        description: 'Reliable and fast internet connectivity for rural areas.',
        icon: 'Wifi'
      },
      {
        title: 'E-Governance',
        description: 'Seamless delivery of online government services.',
        icon: 'Laptop'
      },
      {
        title: 'Telemedicine & Education',
        description: 'Enables e-health and e-education in remote villages.',
        icon: 'Stethoscope'
      }
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: 'Check Availability',
        description: 'Check if your Gram Panchayat is connected to BharatNet.',
        icon: 'Search'
      },
      {
        stepNumber: 2,
        title: 'Contact Local ISP',
        description: 'Contact a local Internet Service Provider offering BharatNet connections.',
        icon: 'Phone'
      },
      {
        stepNumber: 3,
        title: 'Apply for Connection',
        description: 'Submit required documents to get the connection at your home or business.',
        icon: 'FileText'
      }
    ],
    features: [
      'Fiber Optic Network',
      'Affordable Pricing',
      'Non-discriminatory Access',
      'High Reliability'
    ],
    faq: [
      {
        question: 'Who can use BharatNet?',
        answer: 'Any citizen, business, or institution in a connected Gram Panchayat can avail the services through ISPs.'
      },
      {
        question: 'What is the minimum speed?',
        answer: 'The network is designed to provide 2 Mbps to 20 Mbps speed.'
      }
    ],
    statistics: {
      villagesCovered: '180K+',
      statesCovered: '28',
      beneficiaries: '2M+',
      trainingCenters: '0'
    }
  },
  {
    title: 'PM-WANI',
    slug: 'pm-wani',
    shortDescription: 'Proliferation of Public Wi-Fi Networks across the country.',
    description: 'Prime Minister Wi-Fi Access Network Interface (PM-WANI) aims to elevate wireless internet connectivity in the country. It allows small shopkeepers and individuals to provide public Wi-Fi hotspots.',
    category: 'Internet Access',
    status: 'Active',
    ministry: 'Department of Telecommunications (DoT)',
    motto: 'Empowering India through public Wi-Fi hotspots.',
    officialWebsite: 'https://pmwani.dot.gov.in/',
    overview: 'The PM-WANI framework facilitates ease of doing business and encourages local shops and small establishments to become Wi-Fi providers. This accelerates the proliferation of broadband internet services through public Wi-Fi networks in the country without any license fee.',
    eligibility: [
      'Any individual with a compatible smartphone can connect',
      'Any entity can become a Public Data Office (PDO) to provide Wi-Fi'
    ],
    documentsRequired: [
      'Mobile Number for OTP verification (to connect)'
    ],
    benefits: [
      {
        title: 'Affordable Internet',
        description: 'Access cheap internet without long-term commitments.',
        icon: 'Wifi'
      },
      {
        title: 'Ease of Access',
        description: 'Connect to Wi-Fi seamlessly using a single app.',
        icon: 'Smartphone'
      },
      {
        title: 'Income Generation',
        description: 'Shopkeepers can earn extra by becoming PDOs.',
        icon: 'TrendingUp'
      }
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: 'Download App',
        description: 'Download any PM-WANI compliant app from the app store.',
        icon: 'Download'
      },
      {
        stepNumber: 2,
        title: 'Register & KYC',
        description: 'Register using your mobile number and verify via OTP.',
        icon: 'UserCheck'
      },
      {
        stepNumber: 3,
        title: 'Find Hotspot',
        description: 'Locate a nearby PM-WANI hotspot using the app.',
        icon: 'MapPin'
      },
      {
        stepNumber: 4,
        title: 'Connect & Browse',
        description: 'Connect to the network and start using the internet.',
        icon: 'Globe'
      }
    ],
    features: [
      'No License Fee for Providers',
      'Interoperable Network',
      'Secure Connection',
      'Micro-payments'
    ],
    faq: [
      {
        question: 'Is PM-WANI free?',
        answer: 'The cost depends on the provider (PDO). Many offer very affordable sachet-sized data packs.'
      },
      {
        question: 'How do I become a PDO?',
        answer: 'You can buy a PM-WANI compliant router and partner with a PDO Aggregator (PDOA) without any license.'
      }
    ],
    statistics: {
      beneficiaries: '1M+',
      villagesCovered: '50K+',
      statesCovered: '28',
      trainingCenters: '150K+ (Hotspots)'
    }
  },
  {
    title: 'DigiLocker',
    slug: 'digilocker',
    shortDescription: 'Targeted at paperless governance, it provides a secure cloud-based platform.',
    description: 'DigiLocker is a flagship initiative of Ministry of Electronics & IT (MeitY) under Digital India programme. DigiLocker aims at digital empowerment of citizens by providing access to authentic digital documents to citizens digital document wallet.',
    category: 'Digital Services',
    status: 'Active',
    ministry: 'Ministry of Electronics and Information Technology (MeitY)',
    motto: 'A secure cloud based platform for storage, sharing and verification of documents & certificates.',
    officialWebsite: 'https://www.digilocker.gov.in/',
    applyLink: 'https://www.digilocker.gov.in/signup',
    overview: 'DigiLocker is a secure cloud based platform for storage, sharing and verification of documents & certificates. Issued documents in DigiLocker system are deemed to be at par with original physical documents as per Rule 9A of the Information Technology Rules, 2016.',
    eligibility: [
      'Any Indian citizen with an Aadhaar card',
      'Valid mobile number linked to Aadhaar'
    ],
    documentsRequired: [
      'Aadhaar Card Number',
      'Mobile Number (Aadhaar linked)'
    ],
    benefits: [
      {
        title: 'Paperless Governance',
        description: 'Eliminates the use of physical documents.',
        icon: 'FileCheck'
      },
      {
        title: 'Secure Access',
        description: '256-bit SSL encryption and Aadhaar based authentication.',
        icon: 'ShieldCheck'
      },
      {
        title: 'Easy Sharing',
        description: 'Easily share e-documents with organizations.',
        icon: 'Share2'
      }
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: 'Visit Website/App',
        description: 'Go to DigiLocker website or download the mobile app.',
        icon: 'Smartphone'
      },
      {
        stepNumber: 2,
        title: 'Sign Up',
        description: 'Enter your Aadhaar number and verify with OTP.',
        icon: 'Key'
      },
      {
        stepNumber: 3,
        title: 'Set Security PIN',
        description: 'Set a 6-digit security PIN for future logins.',
        icon: 'Lock'
      },
      {
        stepNumber: 4,
        title: 'Fetch Documents',
        description: 'Start fetching your documents from various issuers.',
        icon: 'DownloadCloud'
      }
    ],
    features: [
      'Legally Valid Documents',
      'Cloud Storage',
      'E-Sign Facility',
      'Available on Mobile'
    ],
    faq: [
      {
        question: 'Are DigiLocker documents valid everywhere?',
        answer: 'Yes, documents issued in DigiLocker are considered legally at par with physical documents.'
      },
      {
        question: 'Is DigiLocker safe?',
        answer: 'Yes, it uses advanced encryption and requires Aadhaar authentication to access.'
      }
    ],
    statistics: {
      beneficiaries: '150M+',
      villagesCovered: 'All',
      statesCovered: '28',
      trainingCenters: '5B+ (Docs Issued)'
    }
  },
  {
    title: 'UMANG',
    slug: 'umang',
    shortDescription: 'Unified Mobile Application for New-age Governance.',
    description: 'UMANG (Unified Mobile Application for New-age Governance) is developed by Ministry of Electronics and Information Technology (MeitY) and National e-Governance Division (NeGD) to drive Mobile Governance in India.',
    category: 'Digital Services',
    status: 'Active',
    ministry: 'Ministry of Electronics and Information Technology (MeitY)',
    motto: 'One App for All Government Services.',
    officialWebsite: 'https://web.umang.gov.in/',
    applyLink: 'https://web.umang.gov.in/landing/register',
    overview: 'UMANG provides a single platform for all Indian Citizens to access pan India e-Gov services ranging from Central to Local Government bodies. It intends to provide major services offered by Central and State Government departments on a single mobile app.',
    eligibility: [
      'Any Indian citizen with a mobile number'
    ],
    documentsRequired: [
      'Mobile Number',
      'Aadhaar Card (Optional for advanced services)'
    ],
    benefits: [
      {
        title: 'Unified Platform',
        description: 'Access hundreds of government services in one place.',
        icon: 'Layers'
      },
      {
        title: 'Multilingual Support',
        description: 'Available in 13 Indian languages.',
        icon: 'Globe'
      },
      {
        title: 'Time & Cost Saving',
        description: 'Avoid physical visits to government offices.',
        icon: 'Clock'
      }
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: 'Download App',
        description: 'Download UMANG from Google Play or App Store.',
        icon: 'Download'
      },
      {
        stepNumber: 2,
        title: 'Register',
        description: 'Register using your mobile number and OTP.',
        icon: 'UserPlus'
      },
      {
        stepNumber: 3,
        title: 'Link Aadhaar (Optional)',
        description: 'Link Aadhaar for seamless access to more services.',
        icon: 'Link'
      },
      {
        stepNumber: 4,
        title: 'Access Services',
        description: 'Search and use any government service.',
        icon: 'Search'
      }
    ],
    features: [
      '2000+ Services Available',
      'Secure & Verified',
      'Customer Support',
      'Integration with DigiLocker'
    ],
    faq: [
      {
        question: 'Is UMANG free to use?',
        answer: 'Yes, downloading and using the UMANG app is completely free.'
      },
      {
        question: 'Do I need a smartphone?',
        answer: 'You can also access UMANG via web browser, IVR, or SMS.'
      }
    ],
    statistics: {
      beneficiaries: '50M+',
      villagesCovered: 'All',
      statesCovered: '28',
      trainingCenters: '2000+ (Services)'
    }
  }
];

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

const importData = async () => {
  try {
    await Scheme.deleteMany(); // Clear existing
    
    // Create schemes
    const createdSchemes = await Scheme.insertMany(schemes);
    
    // Add some random related schemes
    for (let i = 0; i < createdSchemes.length; i++) {
      const related = createdSchemes.filter((_, index) => index !== i).map(s => s._id);
      createdSchemes[i].relatedSchemes = related.slice(0, 2); // link to 2 random others
      await createdSchemes[i].save();
    }
    
    console.log('Schemes Data Imported Successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error importing schemes data: ${error.message}`);
    process.exit(1);
  }
};

connectDB().then(() => {
  importData();
});
