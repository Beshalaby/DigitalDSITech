"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

export default function RequestQuotePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
    issueType: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const getFormAction = () => {
    if (!formData.issueType) return ""
    return formData.issueType === "copiers-printers" 
      ? "https://formsubmit.co/service@digitaldsi.com"
      : "https://formsubmit.co/help@techteammail.com"
  }

  return (
    <div className="min-h-screen bg-[#090A11]">
      {/* Hero Section */}
      <section className="relative -mt-14 pt-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-transparent z-0"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15)_0%,transparent_70%)] z-0"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(9,10,17,0.8)_100%)] z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-8">
              <span className="text-[#e1e1e1]">Request a </span>
              <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 text-transparent bg-clip-text drop-shadow-[0_0_8px_rgba(37,99,235,0.5)]">
                Quote
              </span>
            </h1>
            <p className="text-[#e9eae3] text-xl">
              Get in touch with us to receive a personalized quote for your printing needs. We'll help you find the perfect solution for your business.
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <form 
              action={getFormAction()}
              method="POST"
              className="space-y-8"
            >
              <input type="hidden" name="_subject" value="New Quote Request" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_autoresponse" value="Thank you for your quote request. We will get back to you shortly!" />
              <input type="text" name="_honey" style={{display: 'none'}} />
              <input type="hidden" name="_captcha" value="true" />
              <input type="hidden" name="_next" value="https://digitaldsi.com/thank-you" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-[#e9eae3] block text-sm font-medium">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-[#1A1B23] border-gray-800 text-[#e9eae3] focus:border-blue-500"
                    placeholder="Your name"
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-[#e9eae3] block text-sm font-medium">
                    Phone
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
                  <label htmlFor="company" className="text-[#e9eae3] block text-sm font-medium">
                    Company
                  </label>
                  <Input
                    id="company"
                    name="company"
                    type="text"
                    required
                    value={formData.company}
                    onChange={handleChange}
                    className="bg-[#1A1B23] border-gray-800 text-[#e9eae3] focus:border-blue-500"
                    placeholder="Your company name"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-[#e9eae3] block text-sm font-medium">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="bg-[#1A1B23] border-gray-800 text-[#e9eae3] focus:border-blue-500 min-h-[150px]"
                  placeholder="Tell us about your printing needs..."
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="issueType" className="text-[#e9eae3] block text-sm font-medium">
                  Issue Type
                </label>
                <select
                  id="issueType"
                  name="issueType"
                  value={formData.issueType}
                  onChange={handleChange}
                  className="w-full bg-[#1A1B23] border border-gray-800 rounded-md px-3 py-2 text-[#e9eae3] focus:outline-none focus:border-blue-500"
                  required
                >
                  <option value="" disabled>Select</option>
                  <option value="copiers-printers">Copiers/Printers</option>
                  <option value="it-issue">IT Issue</option>
                </select>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-blue-600 text-white hover:bg-blue-700 px-8 py-6 text-lg"
              >
                Submit Request
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
} 