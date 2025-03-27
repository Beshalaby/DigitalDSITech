"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export default function PayNowPage() {
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
    amount: "",
    email: "",
    description: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle payment submission here
    console.log(formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
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
              <span className="text-[#e1e1e1]">Secure </span>
              <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 text-transparent bg-clip-text drop-shadow-[0_0_8px_rgba(37,99,235,0.5)]">
                Payment
              </span>
            </h1>
            <p className="text-[#e9eae3] text-xl">
              Process your payment securely using our encrypted payment system.
            </p>
          </div>
        </div>
      </section>

      {/* Payment Form Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-[#1A1B23] rounded-lg p-8 border border-gray-800">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-2">
                  <label htmlFor="amount" className="text-[#e9eae3] block text-sm font-medium">
                    Amount ($)
                  </label>
                  <Input
                    id="amount"
                    name="amount"
                    type="number"
                    required
                    value={formData.amount}
                    onChange={handleChange}
                    className="bg-[#1A1B23] border-gray-800 text-[#e9eae3] focus:border-blue-500"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="description" className="text-[#e9eae3] block text-sm font-medium">
                    Payment Description
                  </label>
                  <Input
                    id="description"
                    name="description"
                    type="text"
                    required
                    value={formData.description}
                    onChange={handleChange}
                    className="bg-[#1A1B23] border-gray-800 text-[#e9eae3] focus:border-blue-500"
                    placeholder="Enter payment description"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-[#e9eae3] block text-sm font-medium">
                    Email for Receipt
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

                <div className="space-y-2">
                  <label htmlFor="cardNumber" className="text-[#e9eae3] block text-sm font-medium">
                    Card Number
                  </label>
                  <Input
                    id="cardNumber"
                    name="cardNumber"
                    type="text"
                    required
                    value={formData.cardNumber}
                    onChange={handleChange}
                    className="bg-[#1A1B23] border-gray-800 text-[#e9eae3] focus:border-blue-500"
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="expiryDate" className="text-[#e9eae3] block text-sm font-medium">
                      Expiry Date
                    </label>
                    <Input
                      id="expiryDate"
                      name="expiryDate"
                      type="text"
                      required
                      value={formData.expiryDate}
                      onChange={handleChange}
                      className="bg-[#1A1B23] border-gray-800 text-[#e9eae3] focus:border-blue-500"
                      placeholder="MM/YY"
                      maxLength={5}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="cvv" className="text-[#e9eae3] block text-sm font-medium">
                      CVV
                    </label>
                    <Input
                      id="cvv"
                      name="cvv"
                      type="text"
                      required
                      value={formData.cvv}
                      onChange={handleChange}
                      className="bg-[#1A1B23] border-gray-800 text-[#e9eae3] focus:border-blue-500"
                      placeholder="123"
                      maxLength={4}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="cardName" className="text-[#e9eae3] block text-sm font-medium">
                    Cardholder Name
                  </label>
                  <Input
                    id="cardName"
                    name="cardName"
                    type="text"
                    required
                    value={formData.cardName}
                    onChange={handleChange}
                    className="bg-[#1A1B23] border-gray-800 text-[#e9eae3] focus:border-blue-500"
                    placeholder="Name as it appears on card"
                  />
                </div>

                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span>Your payment information is encrypted and secure</span>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 text-white hover:bg-blue-700 px-8 py-6 text-lg"
                >
                  Pay Now
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 