/* Change this file to get your personal Portfolio */

// To change portfolio colors globally go to the  _globalColor.scss file

// Asset Imports
import dalLogo from "../images/dalLogo.png";
import charusatLogo from "../images/charusatLogo.png";
import opasLogo from "../images/opas_mobile.png";
import cdsLogo from "../images/cds.png";
import mockpiImg from "../images/mockpi.png";
import quizcraftImg from "../images/quizcraft.png";
import rebounderImg from "../images/rebounder.png";
import awsBadge from "../images/aws-badge.png";

// Splash Screen

const splashScreen = {
  enabled: false, // set false to disable splash screen
  duration: 2000 // Set animation duration as per your animation
};

// Summary And Greeting Section

const illustration = {
  animated: true // Set to false to use static SVG
};

const greeting = {
  username: "Naqeebali Shamsi",
  title: "Hi, I'm",
  subTitle:
    "Full Stack Engineer with 5+ years of experience building production-grade APIs and data workflows. Specialized in Go, Node.js, and AWS with a focus on security and privacy.",
  resumeLink:
    "https://www.dropbox.com/scl/fi/8bqjawyqh8vdkfz3nbyyn/Naqeebali_Shamsi_Resume.pdf?rlkey=h9dbrtmc3cf8q4030s9zyoz46&dl=0", // Set to empty to hide the button
  displayGreeting: true // Set false to hide this section, defaults to true
};

// Social Media Links

const socialMediaLinks = {
  github: "https://github.com/naqeebali-shamsi",
  linkedin: "https://www.linkedin.com/in/naqeebali-shamsi/",
  gmail: "naqeebali.shamsi@gmail.com",
  gitlab: "https://gitlab.com/Skywalk3R-NNS",
  instagram: "https://www.instagram.com/naqeebali_shamsi/",
  medium: "https://medium.com/@naqeebali-shamsi",
  figma: "https://www.figma.com/@naqeebalishamsi",
  // Instagram, Twitter and Kaggle are also supported in the links!
  // To customize icons and social links, tweak src/components/SocialMedia
  display: true // Set true to display this section, defaults to false
};

// Skills Section

const skillsSection = {
  title: "My Skills",
  subTitle: "Full Stack Engineer specializing in secure, scalable backend architectures.",
  skills: [
    "Design and implement secure, versioned REST APIs using Node.js/TypeScript and Go.",
    "Architect cloud-native solutions on AWS utilizing Lambda, SQS, and RDS with Terraform.",
    "Expertise in data privacy (GDPR) and security (JWT, RBAC, encryption, secret handling).",
    "Build high-performance, interactive frontends using React, Next.js, and modern state management."
  ],

  /* Make Sure to include correct Font Awesome Classname to view your icon
https://fontawesome.com/icons?d=gallery */

  softwareSkills: [
    {
      skillName: "TypeScript",
      fontAwesomeClassname: "fab fa-js"
    },
    {
      skillName: "Go",
      fontAwesomeClassname: "fa-brands fa-golang"
    },
    {
      skillName: "python",
      fontAwesomeClassname: "fab fa-python"
    },
    {
      skillName: "reactjs",
      fontAwesomeClassname: "fab fa-react"
    },
    {
      skillName: "nodejs",
      fontAwesomeClassname: "fab fa-node"
    },
    {
      skillName: "PostgreSQL",
      fontAwesomeClassname: "fas fa-database"
    },
    {
      skillName: "aws",
      fontAwesomeClassname: "fab fa-aws"
    },
    {
      skillName: "docker",
      fontAwesomeClassname: "fab fa-docker"
    },
    {
      skillName: "Terraform",
      fontAwesomeClassname: "fas fa-code-branch"
    }
  ],
  display: true // Set false to hide this section, defaults to true
};

// Education Section

const educationInfo = {
  display: true, // Set false to hide this section, defaults to true
  schools: [
    {
      schoolName: "Dalhousie University",
      logo: dalLogo,
      subHeader: "Master of Applied Computer Science",
      duration: "September 2022 - December 2023",
      desc: "Specialized in Web and Mobile Computing.",
      descBullets: [
        "Advanced course-work in software architecture, cloud-managed services, and UI/UX design.",
        "Dean's List for academic excellence during several semesters."
      ]
    },
    {
      schoolName: "Charotar University of Science and Technology",
      logo: charusatLogo,
      subHeader: "Bachelor of Technology in Information Technology",
      duration: "July 2015 - April 2019",
      desc: "Foundation in Computer Science and Engineering principles.",
      descBullets: ["Strong focus on Data Structures, Algorithms, and System Design."]
    }
  ]
};

// Your top 3 proficient stacks/tech experience

const techStack = {
  viewSkillBars: true, //Set it to true to show Proficiency Section
  experience: [
    {
      Stack: "Backend Engineering",
      progressPercentage: "95%"
    },
    {
      Stack: "Security & Privacy",
      progressPercentage: "90%"
    },
    {
      Stack: "Cloud Infrastructure",
      progressPercentage: "90%"
    },
    {
      Stack: "Go / Node.js",
      progressPercentage: "95%"
    },
    {
      Stack: "PostgreSQL / Data Modeling",
      progressPercentage: "90%"
    },
    {
      Stack: "React / Frontend",
      progressPercentage: "85%"
    }
  ],
  displayCodersrank: true // Set true to display codersrank badges section need to changes your username in src/containers/skillProgress/skillProgress.js:17:62, defaults to false
};

// Work experience section

const workExperiences = {
  display: true, //Set it to true to show workExperiences Section
  experience: [
    {
      "role": "Full Stack Engineer",
      "company": "Propwise",
      "companylogo": null, // Icon can be added later
      "date": "June 2025 – Present",
      "desc": "Remote role focused on designing secure, versioned REST APIs for financial reporting systems.",
      "descBullets": [
        "Architecting relational PostgreSQL models with detailed audit fields and soft-delete patterns.",
        "Implementing RBAC and server-side permission checks to ensure strict data privacy and security.",
        "Developing event-driven report generation workflows using AWS Lambda, SQS, and signed S3 URLs.",
        "Managing complex payment integrations with Stripe, including idempotent webhook handling."
      ]
    },
    {
      "role": "Machine Learning Developer (Contract)",
      "company": "Outlier AI",
      "companylogo": null,
      "date": "March 2024 – May 2025",
      "desc": "Technical evaluation and training for LLM code-generation models.",
      "descBullets": [
        "Conducted deep-dive code reviews on Python and JavaScript code snippets produced by large language models.",
        "Provided structured feedback on logic, performance, and security of generated code to improve model accuracy."
      ]
    },
    {
      "role": "DevOps Developer",
      "company": "OPAS Mobile",
      "companylogo": opasLogo,
      "date": "September 2023 – January 2024",
      "desc": "Focused on improving CI/CD efficiency and cloud infrastructure reliability.",
      "descBullets": [
        "Reduced release cycles by 60% by implementing robust GitHub Actions CI/CD pipelines.",
        "Provisioned scalable AWS infrastructure with Terraform, adhering to the principle of least-privilege IAM roles.",
        "Containerized core microservices resulting in a 40% reduction in local development environment setup time."
      ]
    },
    {
      "role": "Software Engineer",
      "company": "Crest Data Systems",
      "companylogo": cdsLogo,
      "date": "December 2018 – July 2022",
      "desc": "Full-stack engineer building high-throughput APIs and data-driven dashboards.",
      "descBullets": [
        "Developed high-throughput REST APIs (~1,300 rps) with strong request validation and error handling.",
        "Migrated legacy monolithic workloads to AWS Lambda-based microservices, improving scalability.",
        "Optimized database queries and indexing strategies, achieving a 30% reduction in search latency.",
        "Partnered with cross-functional teams to deliver enterprise-grade Splunk applications for Fortune 500 clients."
      ]
    }
  ]
};

/* Your Open Source Section to View Your Github Pinned Projects
To know how to get github key look at readme.md */

const openSource = {
  showGithubProfile: "true", // Set true or false to show Contact profile using Github, defaults to true
  display: true // Set false to hide this section, defaults to true
};

// Some big projects you have worked on

const bigProjects = {
  title: "Projects",
  subtitle: "Featured work showcasing system design, security, and full-stack architecture.",
  projects: [
    {
      image: null, // Image for NomadCrew
      projectName: "NomadCrew",
      projectDesc: "A collaborative trip-coordination platform built with Go, PostgreSQL, and React Native. Features include real-time chat (WebSockets) and a matrix-based authorization system.",
      footerLink: [
        {
          name: "View Repository",
          url: "https://github.com/naqeebali-shamsi/nomadcrew"
        }
      ],
      techStack: ["Go", "React Native", "PostgreSQL", "WebSockets"],
      iconName: "Map"
    },
    {
      image: null, // Image for IntelliFill
      projectName: "IntelliFill",
      projectDesc: "An AI-powered form-filling platform using OCR (Tesseract.js). Implemented a multi-tenant Node.js architecture with Row-Level Security (RLS).",
      footerLink: [
        {
          name: "View Repository",
          url: "https://github.com/naqeebali-shamsi/intellifill"
        }
      ],
      techStack: ["Node.js", "Tesseract.js", "PostgreSQL"],
      iconName: "FileText"
    },
    {
      image: quizcraftImg,
      projectName: "QuizCraft",
      projectDesc: "A scalable online trivia game built on a serverless architecture, facilitating real-time competition for thousands of concurrent users.",
      footerLink: [
        {
          name: "Visit Website",
          url: "https://trivia-ui-c37ej7l5xa-uc.a.run.app/profile"
        }
      ],
      techStack: ["React", "GCP", "Serverless", "Firebase"],
      iconName: "Gamepad2"
    },
  ],
  display: true // Set false to hide this section, defaults to true
};

// Achievement Section
// Include certificates, talks etc

const achievementSection = {
  title: "Achievements And Certifications",
  subtitle:
    "Achievements, Certifications, Award Letters and Some Cool Stuff that I have done !",

  achievementsCards: [
    {
      title: "AWS Cloud Practitioner",
      subtitle:
        "I'm a certified AWS Cloud Practitioner",
      image: awsBadge,
      imageAlt: "AWS Badge",
      footerLink: [
        {
          name: "Certification",
          url: "https://www.dropbox.com/s/xsqpzstz8di4vqi/AWS%20Certified%20Cloud%20Practitioner.pdf?dl=0"
        },
      ]
    },
  ],
  display: true // Set false to hide this section, defaults to true
};

// Blogs Section

const blogSection = {
  title: "Blogs",
  subtitle:
    "With Love for Developing cool stuff, I love to write and share with others what I have learnt.",
  displayMediumBlogs: "true", // Set true to display fetched medium blogs instead of hardcoded ones
  mediumUserName: "naqeebali-shamsi",
  blogs: [
    {
      url: "https://medium.com/@naqeebali-shamsi/a-guide-to-setting-up-aws-ec2-and-rds-instances-inside-a-secure-vpc-4153656153a5",
      title: "A Guide to Setting Up AWS EC2 and RDS Instances Inside a Secure VPC",
      description:
        "Step-by-step guide to architecting a secure cloud environment."
    },
    {
      url: "https://medium.com/@naqeebali-shamsi/why-react-is-the-best-5a97563f423e",
      title: "Clean API Design with Go and Node.js",
      description:
        "Best practices for building versioned, secure, and performant REST APIs."
    }
  ],
  display: true // Set false to hide this section, defaults to true
};

// Talks Sections

const talkSection = {
  title: "TALKS",
  subtitle: "I LOVE TO SHARE MY LIMITED KNOWLEDGE AND GET A SPEAKER BADGE",

  talks: [
    {
      title: "Build Actions For Google Assistant",
      subtitle: "Codelab at GDG DevFest Karachi 2019",
      slides_url: "https://bit.ly/saadpasta-slides",
      event_url: "https://www.facebook.com/events/2339906106275053/"
    }
  ],
  display: false // Set false to hide this section, defaults to true
};

// Podcast Section

const podcastSection = {
  title: "Podcast",
  subtitle: "I LOVE TO TALK ABOUT MYSELF AND TECHNOLOGY",

  // Please Provide with Your Podcast embeded Link
  podcast: [
    "https://anchor.fm/codevcast/embed/episodes/DevStory---Saad-Pasta-from-Karachi--Pakistan-e9givv/a-a15itvo"
  ],
  display: false // Set false to hide this section, defaults to true
};

const figmaSection = {
  title: "Figma",
  subtitle: "I LOVE TO DESIGN UI/UX",
  prototypes: [
    {
      title: "TrailScout",
      subtitle: "a hiking and biking trail companion application for a smartwatch",
      url: "https://www.figma.com/proto/Y9hChiL1VgI69y2D2LHiJS/TrailScout?type=design&node-id=66-1167&scaling=scale-down&page-id=66%3A1166&starting-point-node-id=66%3A1167"
    },
    {
      title: "Museum Application",
      subtitle: "A museum application enhanced with AR",
      url: "https://www.figma.com/proto/pPyTuHccnkO3zhrwdWT5WF/MuseumAPP?type=design&node-id=35-67&scaling=scale-down&page-id=0%3A1&starting-point-node-id=35%3A67",
    },
  ],
  display: true // Set false to hide this section, defaults to true
};

const contactInfo = {
  title: "Contact Me",
  subtitle:
    "Discuss a project or just want to say hi? My Inbox is open for all.",
  email_address: "naqeebali.shamsi@gmail.com"
};

// Twitter Section

const twitterDetails = {
  userName: "twitter", //Replace "twitter" with your twitter username without @
  display: false // Set true to display this section, defaults to false
};

const isHireable = true; // Set false if you are not looking for a job. Also isHireable will be display as Open for opportunities: Yes/No in the GitHub footer

export {
  illustration,
  greeting,
  socialMediaLinks,
  splashScreen,
  skillsSection,
  educationInfo,
  techStack,
  workExperiences,
  figmaSection,
  openSource,
  bigProjects,
  achievementSection,
  blogSection,
  talkSection,
  podcastSection,
  contactInfo,
  twitterDetails,
  isHireable
};
