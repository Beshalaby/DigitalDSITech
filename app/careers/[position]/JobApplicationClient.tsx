"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"

// Define props for the client component
interface JobApplicationClientProps {
  positionSlug: string; 
}

export default function JobApplicationClient({ positionSlug }: JobApplicationClientProps) {
  // Calculate position display name from slug prop
  const position = positionSlug.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    coverLetter: "",
    position: position // Use the derived position name
  });

  // Update position in formData if the prop changes (though unlikely with static export)
  useEffect(() => {
    setFormData(prev => ({ ...prev, position: position }));
  }, [position]);

  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeFileName, setResumeFileName] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setResumeFile(file);
      setResumeFileName(file.name);
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!resumeFile) {
      alert("Please upload your resume");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("coverLetter", formData.coverLetter);
    formDataToSend.append("position", formData.position); // Use state position
    formDataToSend.append("resume", resumeFile);
    formDataToSend.append("_subject", `New Job Application - ${position}`); // Use derived position
    formDataToSend.append("_template", "table");
    formDataToSend.append("_autoresponse", "Thank you for your application. We will review it and get back to you shortly!");
    formDataToSend.append("_captcha", "true");
    formDataToSend.append("_next", "https://digitaldsi.com/thank-you");

    try {
      const response = await fetch("https://formsubmit.co/careers@digitaldsi.com", {
        method: "POST",
        body: formDataToSend
      });

      if (response.ok) {
        window.location.href = "https://digitaldsi.com/thank-you";
      } else {
        alert("There was an error submitting your application. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error submitting your application. Please try again.");
    }
  }

  return (
    <>
      {/* Hero Section Content (using the derived position) */}
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-8">
          <span className="text-[#e1e1e1]">Apply for </span>
          <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 text-transparent bg-clip-text drop-shadow-[0_0_8px_rgba(37,99,235,0.5)]">
            {position} 
          </span>
        </h1>
        <p className="text-[#e9eae3] text-xl">
          Join our team and help shape the future of technology. We look forward to reviewing your application.
        </p>
      </div>

      {/* Application Form Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <form 
              onSubmit={handleSubmit}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-[#e9eae3] block text-sm font-medium">
                    Full Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-[#1A1B23] border-gray-800 text-[#e9eae3] focus:border-blue-500"
                    placeholder="Your full name"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-[#e9eae3] block text-sm font-medium">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-[#1A1B23] border-gray-800 text-[#e9eae3] focus:border-blue-500"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="text-[#e9eae3] block text-sm font-medium">
                  Phone Number
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="bg-[#1A1B23] border-gray-800 text-[#e9eae3] focus:border-blue-500"
                  placeholder="Your phone number"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="resume" className="text-[#e9eae3] block text-sm font-medium">
                  Resume
                </label>
                <div className="flex items-center space-x-4 min-h-[60px]">
                  <Input
                    id="resume"
                    name="resume"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    required
                    onChange={handleFileChange}
                    className="flex h-16 w-full rounded-md border px-3 text-base ring-offset-background file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm bg-[#1A1B23] border-gray-800 text-[#e9eae3] focus:border-blue-500 file:bg-blue-600 file:text-white file:border-0 file:rounded-md file:px-4 file:py-2 file:mr-4 file:hover:bg-blue-700 py-4"
                  />
                  {resumeFileName && (
                    <span className="text-sm text-gray-400">
                      Selected: {resumeFileName}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-400 mt-1">
                  Accepted formats: PDF, DOC, DOCX (Max size: 10MB)
                </p>
              </div>

              <div className="space-y-2">
                <label htmlFor="coverLetter" className="text-[#e9eae3] block text-sm font-medium">
                  Cover Letter
                </label>
                <Textarea
                  id="coverLetter"
                  name="coverLetter"
                  required
                  value={formData.coverLetter}
                  onChange={handleChange}
                  className="bg-[#1A1B23] border-gray-800 text-[#e9eae3] focus:border-blue-500 min-h-[200px]"
                  placeholder="Tell us why you're interested in this position and why you'd be a great fit..."
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-blue-600 text-white hover:bg-blue-700 px-8 py-6 text-lg"
              >
                Submit Application
              </Button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
} 