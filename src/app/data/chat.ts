const CHAT_RESPONSES: Record<string, string> = {
  default:
    "Thanks for reaching out! Feel free to ask about my projects, experience, or tech stack. I'd love to connect.",
  hello:
    "Hey there! I'm Alex Rivera's portfolio bot. Ask me anything about my background, skills, or projects.",
  hi: "Hi! Great to meet you. What would you like to know about Alex?",
  projects:
    "Alex has built several major open-source projects — from a Rust-based stream processing engine (Lumen) to a Figma token pipeline (Prism). Check the Projects section for details!",
  skills:
    "Alex is proficient in Go, TypeScript, Rust, and Python on the backend, and React + WebGL on the front end. Strong infrastructure background with Kubernetes and Kafka.",
  experience:
    "Alex has 5 years of professional experience — currently a Senior Engineer at Stripe. Previously at Figma building the real-time collaboration engine, and HubSpot before that.",
  education:
    "Alex graduated from MIT with a B.Sc. in Computer Science, specializing in Distributed Systems and Machine Learning.",
  contact:
    "You can reach Alex at alex.rivera@email.com, or connect on LinkedIn and GitHub — links are in the footer!",
  hire: "Alex is selectively open to new opportunities! Send a message via the contact form and let's talk.",
};

export function getBotResponse(msg: string): string {
  const lower = msg.toLowerCase();
  for (const key of Object.keys(CHAT_RESPONSES)) {
    if (key !== "default" && lower.includes(key)) return CHAT_RESPONSES[key];
  }
  return CHAT_RESPONSES.default;
}