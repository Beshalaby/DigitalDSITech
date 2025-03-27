import { Button } from "@/components/ui/button"

export default function ITSolutionsPage() {
  return (
    <div className="min-h-screen bg-[#090A11]">
      {/* Hero Section */}
      <section className="relative -mt-14 pt-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent"></div>
        <div className="container relative">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-8">
              <span className="text-[#e1e1e1]">Comprehensive </span>
              <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 text-transparent bg-clip-text drop-shadow-[0_0_8px_rgba(37,99,235,0.5)]">
                IT Solutions
              </span>
            </h1>
            <p className="text-[#e9eae3] text-xl mb-8">
              Professional IT services to support and enhance your business operations.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container">
          <h1 className="text-5xl font-bold text-white mb-6">IT Solutions</h1>
          <p className="text-xl text-gray-300 mb-8">
            Comprehensive IT services to support and enhance your business operations.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="border border-blue-500 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-white mb-4">Managed IT Services</h2>
              <ul className="space-y-2 text-gray-300 mb-6">
                <li>24/7 Monitoring and Support</li>
                <li>Network Security</li>
                <li>Cloud Services</li>
                <li>Data Backup and Recovery</li>
              </ul>
              <Button className="bg-blue-500 hover:bg-blue-600 text-white">Learn More</Button>
            </div>
            <div className="border border-blue-500 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-white mb-4">VOIP Solutions</h2>
              <ul className="space-y-2 text-gray-300 mb-6">
                <li>Cloud-based Phone Systems</li>
                <li>Unified Communications</li>
                <li>Video Conferencing</li>
                <li>Mobile Integration</li>
              </ul>
              <Button className="bg-blue-500 hover:bg-blue-600 text-white">Explore Options</Button>
            </div>
            <div className="border border-blue-500 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-white mb-4">IT Projects</h2>
              <ul className="space-y-2 text-gray-300 mb-6">
                <li>Infrastructure Upgrades</li>
                <li>Cybersecurity Implementations</li>
                <li>Cloud Migrations</li>
                <li>Software Deployments</li>
              </ul>
              <Button className="bg-blue-500 hover:bg-blue-600 text-white">Start a Project</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

