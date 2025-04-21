"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { X } from "lucide-react"

interface JobApplicationModalProps {
  position: string
  isOpen: boolean
  onClose: () => void
}

export function JobApplicationModal({ position, isOpen, onClose }: JobApplicationModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    coverLetter: "",
    position: position
  })

  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [resumeFileName, setResumeFileName] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setResumeFile(file)
      setResumeFileName(file.name)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (!resumeFile) {
      alert("Please upload your resume")
      return
    }

    // Determine the recipient email based on position type
    const recipientEmail = position.toLowerCase().includes('sales') 
      ? 'dtaylor@digitaldsi.com'
      : 'jasonh@digitaldsi.com'

    const formDataToSend = new FormData()
    formDataToSend.append("name", formData.name)
    formDataToSend.append("email", formData.email)
    formDataToSend.append("phone", formData.phone)
    formDataToSend.append("coverLetter", formData.coverLetter)
    formDataToSend.append("position", formData.position)
    formDataToSend.append("resume", resumeFile)
    formDataToSend.append("_subject", `New Job Application - ${position}`)
    formDataToSend.append("_template", "table")
    formDataToSend.append("_autoresponse", "Thank you for your application. We will review it and get back to you shortly!")
    formDataToSend.append("_captcha", "true")
    formDataToSend.append("_next", "https://digitaldsi.com/thank-you")

    try {
      const response = await fetch(`https://formsubmit.co/${recipientEmail}`, {
        method: "POST",
        body: formDataToSend
      })

      if (response.ok) {
        window.location.href = "https://digitaldsi.com/thank-you"
      } else {
        alert("There was an error submitting your application. Please try again.")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("There was an error submitting your application. Please try again.")
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-[#090A11] rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>
        
        <div className="p-8">
          <h2 className="text-3xl font-bold mb-6">
            <span className="text-[#e1e1e1]">Apply for </span>
            <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 text-transparent bg-clip-text drop-shadow-[0_0_8px_rgba(37,99,235,0.5)]">
              {position}
            </span>
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
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
                className="bg-[#1A1B23] border-gray-800 text-[#e9eae3] focus:border-blue-500 min-h-[150px]"
                placeholder="Tell us why you're interested in this position and why you'd be a great fit..."
              />
            </div>

            <div className="flex gap-4">
              <Button 
                type="submit" 
                className="flex-1 bg-blue-600 text-white hover:bg-blue-700 px-8 py-6 text-lg"
              >
                Submit Application
              </Button>
              <Button
                type="button"
                onClick={onClose}
                className="flex-1 bg-gray-800 text-white hover:bg-gray-700 px-8 py-6 text-lg"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
} 