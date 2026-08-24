/**
 * SINGLE SOURCE OF TRUTH PROFILE CONFIGURATION
 * 
 * Edit this file to update any information across the entire digital card profile.
 * NO DATABASE IS USED. 100% Static & Client-Side Hosting Ready.
 */

export const profileConfig = {
  // Personal Details
  name: "Mr. Makrand Sambhajirao Kaingade",
  designation: "Training & Placement Officer (TPO)",
  organization: "D Y Patil College of Engineering & Technology",
  location: "Kasaba Bawada, Kolhapur",
  experience: "8 years",
  
  // Professional Description
  bio: "Currently I am working as a Training & Placement Officer at D Y Patil College of Engineering and Technology, Kasaba Bawada, Kolhapur from past 8 years.",

  // DYPCET College Details
  dypcet: {
    fullName: "D Y Patil College of Engineering & Technology (An Autonomous Institute)",
    estInfo: "Est- 1984, First College of D Y Patil Group.",
    shortName: "DYPCET",
    location: "Kasaba Bawada, Kolhapur",
    website: "" // Official website URL if available
  },

  // Contact Information (Leave empty "" to automatically hide the corresponding contact button)
  contact: {
    phone: "",      // e.g. "+919876543210" or ""
    whatsapp: "",   // e.g. "919876543210" or ""
    email: ""       // e.g. "tpo@dypgroup.edu.in" or ""
  },

  // Social Media Platforms
  socials: {
    linkedin: "https://www.linkedin.com/in/makrand-kaingade/",
    instagram: "https://www.instagram.com/dypcet_official/",
    facebook: "https://www.facebook.com/dypcetkolhapur/"
  },

  // Visual Assets
  assets: {
    profileImage: "/assets/images/profile/makrand_kaingade.jpg",
    dypcetLogo: "/assets/images/logo/dypcet_official_logo.png",
    vcardFilename: "Makrand_Kaingade.vcf",
    qrFilename: "makrand-kaingade-qr.png"
  }
};
