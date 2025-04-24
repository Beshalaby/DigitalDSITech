// Keep only server-side imports and data imports
import { jobPositions, type JobPosition } from "../data"; 
// Import the new client component
import JobApplicationClient from "./JobApplicationClient";

// Function to generate static paths for each job position
export async function generateStaticParams() {
  return jobPositions.map((job: JobPosition) => ({
    position: job.title.toLowerCase().replace(/\s+/g, '-'), // Convert title to slug format
  }));
}

// Define props for the Page component
interface JobApplicationPageProps {
  params: {
    position: string; // This is the slug, e.g., 'technical-support-specialist'
  };
}

// Page component is now a Server Component
export default function JobApplicationPage({ params }: JobApplicationPageProps) {
  const positionSlug = params.position;

  // Keep the overall structure, but delegate client-side parts
  return (
    <div className="min-h-screen bg-[#090A11]">
      {/* Hero Section Wrapper */}
      <section className="relative -mt-14 pt-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-transparent z-0"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15)_0%,transparent_70%)] z-0"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(9,10,17,0.8)_100%)] z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          {/* Render the client component, passing the slug */}
          <JobApplicationClient positionSlug={positionSlug} />
        </div>
      </section>
    </div>
  );
} 