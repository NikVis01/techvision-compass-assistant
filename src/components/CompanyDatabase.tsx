
import { useState } from 'react';
import { ArrowLeft, Building2, Users, FileText, Folder, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface CompanyDatabaseProps {
  onBack: () => void;
}

const mockEmployees = [
  {
    id: 1,
    name: 'Sarah Chen',
    position: 'Sales Manager',
    department: 'Sales',
    email: 'sarah.chen@company.com',
    experience: '8 years',
    expertise: ['Deal closing', 'Enterprise sales', 'Contract negotiation'],
    availableForMentorship: true,
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 2,
    name: 'Michael Rodriguez',
    position: 'Legal Counsel',
    department: 'Legal',
    email: 'michael.rodriguez@company.com',
    experience: '12 years',
    expertise: ['Contract law', 'Compliance', 'Risk assessment'],
    availableForMentorship: true,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 3,
    name: 'Lisa Thompson',
    position: 'Product Manager',
    department: 'Product',
    email: 'lisa.thompson@company.com',
    experience: '6 years',
    expertise: ['Product roadmap', 'Feature specifications', 'Customer requirements'],
    availableForMentorship: true,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 4,
    name: 'David Park',
    position: 'Finance Director',
    department: 'Finance',
    email: 'david.park@company.com',
    experience: '10 years',
    expertise: ['Pricing strategy', 'Budget approval', 'Financial planning'],
    availableForMentorship: false,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 5,
    name: 'Emma Watson',
    position: 'Sales Representative',
    department: 'Sales',
    email: 'emma.watson@company.com',
    experience: '0 years',
    expertise: ['B2B sales', 'Client relations'],
    availableForMentorship: false,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face'
  }
];

const CompanyDatabase = ({ onBack }: CompanyDatabaseProps) => {
  const [activeTab, setActiveTab] = useState('employees');

  return (
    <div className="min-h-screen relative overflow-hidden" style={{
      background: 'radial-gradient(circle at center bottom, rgba(251, 146, 60, 0.3) 0%, rgba(0, 0, 0, 0.8) 40%), linear-gradient(135deg, #000000 0%, #f97316 50%, #ec4899 100%)'
    }}>
      {/* Back button */}
      <div className="fixed top-6 left-6 z-20">
        <Button
          onClick={onBack}
          className="bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20 transition-all duration-200"
          style={{ fontFamily: 'Helvetica Neue, sans-serif' }}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
      </div>

      <div className="relative z-10 p-8 pt-24">
        {/* Company Info Section */}
        <div className="max-w-7xl mx-auto mb-8">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8">
            <div className="flex items-center space-x-4 mb-6">
              <Building2 className="w-12 h-12 text-white" />
              <div>
                <h1 className="text-4xl font-bold text-white" style={{ fontFamily: 'Helvetica Neue, sans-serif' }}>
                  TechCorp Industries
                </h1>
                <p className="text-white/70 text-lg">Innovation-driven technology solutions</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">250+</div>
                <div className="text-white/70">Employees</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">15</div>
                <div className="text-white/70">Departments</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">50+</div>
                <div className="text-white/70">Active Projects</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">12</div>
                <div className="text-white/70">Years in Business</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="max-w-7xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-white/10 backdrop-blur-md border border-white/20">
              <TabsTrigger value="employees" className="text-white data-[state=active]:bg-white/20">
                <Users className="w-4 h-4 mr-2" />
                Employees
              </TabsTrigger>
              <TabsTrigger value="protocols" className="text-white data-[state=active]:bg-white/20">
                <FileText className="w-4 h-4 mr-2" />
                Protocols
              </TabsTrigger>
              <TabsTrigger value="projects" className="text-white data-[state=active]:bg-white/20">
                <Folder className="w-4 h-4 mr-2" />
                Projects
              </TabsTrigger>
              <TabsTrigger value="resources" className="text-white data-[state=active]:bg-white/20">
                <Building2 className="w-4 h-4 mr-2" />
                Resources
              </TabsTrigger>
            </TabsList>

            <TabsContent value="employees" className="mt-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white" style={{ fontFamily: 'Helvetica Neue, sans-serif' }}>
                  Employees
                </h2>
                <Button className="bg-green-500 hover:bg-green-600 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Employee
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockEmployees.map((employee) => (
                  <div key={employee.id} className="bg-white rounded-lg p-6 shadow-lg">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <img 
                          src={employee.avatar} 
                          alt={employee.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="font-bold text-lg text-gray-900">{employee.name}</h3>
                          <p className="text-gray-600">{employee.position}</p>
                          <p className="text-gray-500 text-sm">{employee.department}</p>
                        </div>
                      </div>
                      <Button variant="ghost" className="text-blue-500 hover:text-blue-600">
                        Edit
                      </Button>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-semibold text-gray-900">Email: </span>
                        <span className="text-gray-700">{employee.email}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-900">Experience: </span>
                        <span className="text-gray-700">{employee.experience}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-900">Expertise:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {employee.expertise.map((skill, index) => (
                            <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      {employee.availableForMentorship && (
                        <div className="flex items-center space-x-1 text-green-600 mt-3">
                          <span className="text-sm">✓ Available for mentorship</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="protocols" className="mt-8">
              <div className="bg-white/10 backdrop-blur-md rounded-lg border border-white/20 p-8 text-center">
                <FileText className="w-16 h-16 text-white/50 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Protocols Coming Soon</h3>
                <p className="text-white/70">Company protocols and procedures will be available here.</p>
              </div>
            </TabsContent>

            <TabsContent value="projects" className="mt-8">
              <div className="bg-white/10 backdrop-blur-md rounded-lg border border-white/20 p-8 text-center">
                <Folder className="w-16 h-16 text-white/50 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Projects Coming Soon</h3>
                <p className="text-white/70">Active projects and initiatives will be displayed here.</p>
              </div>
            </TabsContent>

            <TabsContent value="resources" className="mt-8">
              <div className="bg-white/10 backdrop-blur-md rounded-lg border border-white/20 p-8 text-center">
                <Building2 className="w-16 h-16 text-white/50 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Resources Coming Soon</h3>
                <p className="text-white/70">Company resources and tools will be available here.</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default CompanyDatabase;
