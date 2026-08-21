/**
 * Knowledge Base for ask-arya.sh Terminal AI Assistant
 * Local offline Q&A dataset with intent keywords & action links
 */
window.aryaKnowledgeBase = [
  {
    intent: "greeting",
    keywords: ["hi", "hello", "hey", "who are you", "who is arya", "about", "bio", "intro"],
    reply: "Hello! I'm ask-arya.sh, Arya's terminal assistant. Arya A. Sutar is a final-year B.Tech CS Engineering student at DYP College of Engineering & Technology, Kolhapur (CGPA 8.1). He specializes in Software Development, Web Platforms, and AI/Computer Vision.",
    actionText: "View About Section",
    actionTarget: "#about"
  },
  {
    intent: "skills",
    keywords: ["skill", "skills", "tech stack", "languages", "c++", "python", "javascript", "figma", "blender", "ocr", "computer vision", "mysql"],
    reply: "Arya's core technical skills include:\n• Languages: C, C++, Python, JavaScript\n• Web Dev: HTML, CSS, JavaScript\n• Database: MySQL\n• AI/CV: Python, OCR, Computer Vision\n• UI/UX: Figma, Blender\n• Coursework: Data Structures & Algorithms, OOP",
    actionText: "Explore Skills",
    actionTarget: "#skills"
  },
  {
    intent: "projects",
    keywords: ["project", "projects", "study buddy", "socialforge", "gst doctor", "portfolio", "built", "apps"],
    reply: "Arya has built 3 flagship projects:\n1. Study Buddy: Student notes & study materials sharing platform with secure login.\n2. SocialForge: AI Instagram content intelligence & scheduling dashboard.\n3. GST Doctor AI Pro: AI invoice validation system using OCR & error detection.",
    actionText: "View Projects Grid",
    actionTarget: "#projects"
  },
  {
    intent: "experience",
    keywords: ["experience", "internship", "deloitte", "malaysia", "cctv", "media coordinator", "work", "job", "capstone leader"],
    reply: "Arya's experience includes:\n• Deloitte: Data Analytics Virtual Internship (July 2025)\n• Malaysia International Internship: AI CCTV & Behavior Analysis Intern (Human detection & intelligent alerts)\n• Media Coordinator: DYP College of Engineering (Jan 2023–Present)\n• Capstone Team Leader (Apr 2023)\n• Technical Event Organizer: MLSA Club",
    actionText: "Check Experience Timeline",
    actionTarget: "#experience"
  },
  {
    intent: "positions",
    keywords: ["position", "positions", "responsibility", "leader", "deputy chief", "t&p", "placement", "mlsa", "head", "coding club", "silicon"],
    reply: "Arya holds key leadership roles:\n• Deputy Chief — Training & Placement Cell, DYPCET\n• Media Coordinator — Training & Placement Cell, DYPCET\n• Media Head — MLSA (Microsoft Learn Student Ambassadors)\n• Media Coordinator — Coding Club\n• Media Coordinator — Silicon",
    actionText: "View Positions Log",
    actionTarget: "#positions"
  },
  {
    intent: "education",
    keywords: ["education", "college", "degree", "cgpa", "dypcet", "kolhapur", "university", "marks", "btech", "cse"],
    reply: "Arya is pursuing B.Tech in Computer Science & Engineering (2023–2027) at D.Y. Patil College of Engineering and Technology, Kolhapur, maintaining a strong CGPA of 8.1 / 10.0.",
    actionText: "View Education Details",
    actionTarget: "#education"
  },
  {
    intent: "achievements",
    keywords: ["achievement", "achievements", "prize", "winner", "hackathon", "adcet", "kbpcoe", "awards", "wins", "capstone prize"],
    reply: "Arya's major wins include:\n🥇 1st Prize — Capstone Project (DYPCET Kolhapur)\n🥇 1st Prize — Product Shoot Competition (Bharati Vidyapeeth)\n🥈 2nd Prize (Second Runner-Up) — ADCET National Level Hackathon 2026\n🥇 1st Prize — Hackathon (KBPCOE Satara)",
    actionText: "See Achievements",
    actionTarget: "#achievements"
  },
  {
    intent: "contact",
    keywords: ["contact", "email", "phone", "number", "github", "linkedin", "instagram", "reach", "hire", "resume", "pdf"],
    reply: "You can reach Arya via:\n• Email: sutararya.6336@gmail.com\n• GitHub: github.com/Arya99-as\n• LinkedIn: linkedin.com/in/arya-sutar-6244942b1\n• Instagram: instagram.com/aryasutar_\n• Resume: assets/resume/Arya_Sutar_Resume.pdf",
    actionText: "Jump to Contact Form",
    actionTarget: "#contact"
  }
];

window.defaultFallbackReply = {
  reply: "I'm not completely sure about that query, but Arya would love to discuss it directly! You can drop him a message using the contact form or send an email.",
  actionText: "Go to Contact Form",
  actionTarget: "#contact"
};
