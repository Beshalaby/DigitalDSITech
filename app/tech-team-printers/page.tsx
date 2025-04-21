"use client"

import { Button } from "@/components/ui/button"

export default function TechTeamPrinters() {
  return (
    <div className="min-h-screen bg-[#090A11]">
      {/* Main Content */}
      <main className="pt-24">
        {/* Printer Catalog Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <iframe 
                src="https://www-techteamsolutionsmd-com.filesusr.com/html/0c4b7b_1ef57a68c1a11512a04d9c81d857a71e.html"
                className="w-full h-[800px] border-0"
                title="TechTeam Solutions Printer Catalog"
              />
            </div>
          </div>
        </section>
      </main>

      {/* Back to IT Solutions Button */}
      <div className="fixed bottom-8 right-8">
        <Button
          onClick={() => window.location.href = '/tech-team-solutions'}
          className="bg-red-600 text-white hover:bg-red-700 px-6 py-2 rounded-md shadow-lg"
        >
          Back to IT Solutions
        </Button>
      </div>
    </div>
  )
} 