/* Change this file to get your personal Portfolio */

// To change portfolio colors globally go to the  _globalColor.scss file

import emoji from "react-easy-emoji";
import splashAnimation from "./assets/lottie/splashAnimation"; // Rename to your file name for custom animation

// Splash Screen

const splashScreen = {
  enabled: true, // set false to disable splash screen
  animation: splashAnimation,
  duration: 2000 // Set animation duration as per your animation
};

// Summary And Greeting Section

const illustration = {
  animated: true // Set to false to use static SVG
};

const greeting = {
  username: "Naqeebali Shamsi",
  title: "Hi all, I'm Naqeebali",
  subTitle: emoji(
    "Welcome to my world as a passionate Full Stack Software Developer 🚀. I specialize in crafting user-friendly applications, leveraging modern tech stacks to bring ideas to life. Let's collaborate to create innovative solutions that make a meaningful impact."
  ),
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
  subTitle: "Versatile Full Stack Developer Committed to Mastering Diverse Tech Stacks",
  skills: [
    emoji(
      "⚡ Develop highly scalable full-stack applications"
    ),
    emoji("⚡ Currently a student at Dalhousie University"),
    emoji(
      "⚡ Actively looking for full-time opportunities in Software Development"
    )
  ],

  /* Make Sure to include correct Font Awesome Classname to view your icon
https://fontawesome.com/icons?d=gallery */

  softwareSkills: [
    {
      skillName: "java",
      fontAwesomeClassname: "fa-brands fa-java"
    },
    {
      skillName: "JavaScript",
      fontAwesomeClassname: "fab fa-js"
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
      skillName: "html-5",
      fontAwesomeClassname: "fab fa-html5"
    },
    {
      skillName: "css3",
      fontAwesomeClassname: "fab fa-css3-alt"
    },
    {
      skillName: "npm",
      fontAwesomeClassname: "fab fa-npm"
    },
    {
      skillName: "sql-database",
      fontAwesomeClassname: "fas fa-database"
    },
    {
      skillName: "aws",
      fontAwesomeClassname: "fab fa-aws"
    },
    {
      skillName: "firebase",
      fontAwesomeClassname: "fas fa-fire"
    },
    {
      skillName: "git",
      fontAwesomeClassname: "fa-brands fa-git"
    },
    {
      skillName: "docker",
      fontAwesomeClassname: "fab fa-docker"
    },
    {
      skillName: "Figma",
      fontAwesomeClassname: "fa-brands fa-figma"
    },
    {
      skillName: "Terraform"
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
      logo: require("./assets/images/dalLogo.png"),
      subHeader: "Master of Applied Computer Science",
      duration: "September 2022 - Current",
      desc: "Mastering the craft in progress...",
      descBullets: [
        "Built projects using React, Node, MongoDB, AWS, ...",
        "Conducted research on Tangible User Interfaces"
      ]
    },
    {
      schoolName: "Charotar University of Science and Technology",
      logo: require("./assets/images/charusatLogo.png"),
      subHeader: "Bachelor of Technology in Information Technology",
      duration: "July 2015 - April 2019",
      desc: "Learned core concepts of Computer Science and Information Technology",
      descBullets: ["Took courses in Data Structures, Algorithms, DBMS, Operating Systems, Java, Computer Networks", "Built projects using C, C++, Java, Python, HTML, CSS, JavaScript, MongoDB", "Participated in various Hackathons and Coding Competitions"]
    }
  ]
};

// Your top 3 proficient stacks/tech experience

const techStack = {
  viewSkillBars: true, //Set it to true to show Proficiency Section
  experience: [
    {
      Stack: "AWS Cloud Services",
      progressPercentage: "90%"
    },
    {
      Stack: "Terraform",
      progressPercentage: "90%"
    },
    {
      Stack: "MERN", //Insert stack or technology you have experience in
      progressPercentage: "95%" //Insert relative proficiency in percentage
    },
    {
      Stack: "Backend",
      progressPercentage: "90%"
    },
    {
      Stack: "ReactJS",
      progressPercentage: "80%"
    },
    {
      Stack: "Java",
      progressPercentage: "80%"
    },
    {
      Stack: "Agile Methodologies",
      progressPercentage: "90%"
    }
  ],
  displayCodersrank: true // Set true to display codersrank badges section need to changes your username in src/containers/skillProgress/skillProgress.js:17:62, defaults to false
};

// Work experience section

const workExperiences = {
  display: true, //Set it to true to show workExperiences Section
  experience: [
    {
      "role": "DevOps Developer",
      "company": "OPAS Mobile Canada",
      "companylogo": require("./assets/images/opas_mobile.png"),
      "date": "September 2022 – Present",
      "desc": "Co-op role focused on DevOps methodologies and cloud solutions",
      "descBullets": [
        "🚀 Spearheaded the adoption of Terraform at OPAS Mobile, enhancing operational efficiency and scalability through automated infrastructure provisioning.",
        "🌐 Actively involved in designing scalable and cost-effective cloud solutions, contributing to multi-cloud architecture plans aligned with business objectives.",
        "🔧 Revamped CI/CD processes for JavaScript applications, integrating containerization for improved deployment speed and reliability.",
        "🐳 Led Dockerization of critical applications and established automated nightly build processes, improving build stability.",
        "💼 Pursuing AWS Cloud Architect and Terraform certifications, demonstrating commitment to professional growth and expertise in cloud solutions."
      ]
    },
    {
      "role": "Software Engineer",
      "company": "Crest Data Systems",
      "companylogo": require("./assets/images/cds.png"),
      "date": "December 2018 – July 2022",
      "desc": "Software Engineer specializing in full-stack Splunk App development",
      "descBullets": [
        "🚀 Led a team of 3 in system architecture refinement and Python 2 to 3 migration for Splunk apps, enhancing collaborative success.",
        "💡 Pioneered Splunk KV Store usage for in-app caching, achieving 15x improvement in data search performance.",
        "🎨 Conceptualized and developed data-driven dashboards for 6+ Splunk apps using JavaScript and Bootstrap, enhancing user experience.",
        "🌐 Developed Splunk apps serving 200,000+ daily users, enabling search of 10M+ records within 2 seconds.",
        "🔗 Crafted 100+ robust REST APIs for 15 Splunk Apps, ensuring scalability and efficient integration.",
        "🔧 Streamlined software development lifecycle with automated workflows, cutting lead time by 60%.",
        "🔍 Integrated SonarQube in CI/CD pipeline, driving a 23% reduction in technical debt and elevating code quality.",
        "🤝 Translated complex business requirements into technical solutions, closely collaborating with stakeholders.",
        "🔬 Championed software reliability with thorough unit testing and peer code reviews, maintaining high-quality standards.",
        "📢 Effectively communicated project milestones and technical details to stakeholders, promoting transparency.",
        "👨‍💻 Initiated professional journey with a 6-month internship, building a Splunk app for visualizing PUBG player data on Microsoft cloud."
      ]
    },
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
  title: "Big Projects",
  subtitle: "SOME STARTUPS AND COMPANIES THAT I HELPED TO CREATE THEIR TECH",
  projects: [
    {
      image: require("./assets/images/mockpi.png"),
      projectName: "MockPI",
      projectDesc: "An AI Powered Mock Interview Platform to enhance interview skills and boost success rates in job and college admission interviews.",
      footerLink: [
        {
          name: "Visit Website",
          url: "http://mockpi.com/"
        }
        //  you can add extra buttons here.
      ]
    },
  ],
  display: true // Set false to hide this section, defaults to true
};

// Achievement Section
// Include certificates, talks etc

const achievementSection = {
  title: emoji("Achievements And Certifications 🏆 "),
  subtitle:
    "Achievements, Certifications, Award Letters and Some Cool Stuff that I have done !",

  achievementsCards: [
    {
      title: "AWS Cloud Practitioner",
      subtitle:
        "I'm a cetified AWS Cloud Practitioner",
      image: require("./assets/images/aws-badge.png"),
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
    "With Love for Developing cool stuff, I love to write and teach others what I have learnt.",
  displayMediumBlogs: "true", // Set true to display fetched medium blogs instead of hardcoded ones
  blogs: [
    {
      url: "https://blog.usejournal.com/create-a-google-assistant-action-and-win-a-google-t-shirt-and-cloud-credits-4a8d86d76eae",
      title: "Win a Google Assistant Tshirt and $200 in Google Cloud Credits",
      description:
        "Do you want to win $200 and Google Assistant Tshirt by creating a Google Assistant Action in less then 30 min?"
    },
    {
      url: "https://medium.com/@saadpasta/why-react-is-the-best-5a97563f423e",
      title: "Why REACT is The Best?",
      description:
        "React is a JavaScript library for building User Interface. It is maintained by Facebook and a community of individual developers and companies."
    }
  ],
  display: true // Set false to hide this section, defaults to true
};

// Talks Sections

const talkSection = {
  title: "TALKS",
  subtitle: emoji(
    "I LOVE TO SHARE MY LIMITED KNOWLEDGE AND GET A SPEAKER BADGE 😅"
  ),

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
  title: emoji("Podcast 🎙️"),
  subtitle: "I LOVE TO TALK ABOUT MYSELF AND TECHNOLOGY",

  // Please Provide with Your Podcast embeded Link
  podcast: [
    "https://anchor.fm/codevcast/embed/episodes/DevStory---Saad-Pasta-from-Karachi--Pakistan-e9givv/a-a15itvo"
  ],
  display: false // Set false to hide this section, defaults to true
};

const figmaSection = {
  title: emoji("Figma 🎨"),
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
  title: emoji("Contact Me ☎️"),
  subtitle:
    "Discuss a project or just want to say hi? My Inbox is open for all.",
  number: "+92-0000000000",
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
