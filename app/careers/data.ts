export interface JobPosition {
  title: string;
  department: string;
  location: string;
  description: string;
  requirements: string[];
}

export const jobPositions: JobPosition[] = [
  {
    title: "Technical Support Specialist",
    department: "Support",
    location: "Remote / Hybrid",
    description: "Provide expert technical support and maintenance services for our printing solutions.",
    requirements: [
      "2+ years of technical support experience",
      "Strong problem-solving skills",
      "Excellent communication abilities",
      "Knowledge of printing systems"
    ]
  },
  {
    title: "Sales Representative",
    department: "Sales",
    location: "Remote / Hybrid",
    description: "Drive sales growth by identifying and developing new business opportunities.",
    requirements: [
      "3+ years of sales experience",
      "Proven track record of meeting targets",
      "Strong negotiation skills",
      "Business development expertise"
    ]
  }
]; 