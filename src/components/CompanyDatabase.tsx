
import { useState } from 'react';
import { ArrowLeft, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Employee {
  id: string;
  name: string;
  title: string;
  department: string;
  email: string;
  experience: string;
  expertise: string[];
  availableForMentorship: boolean;
  avatar: string;
}

const mockEmployees: Employee[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    title: 'Sales Manager',
    department: 'Sales',
    email: 'sarah.chen@company.com',
    experience: '8 years',
    expertise: ['Deal closing', 'Enterprise sales', 'Contract negotiation'],
    availableForMentorship: true,
    avatar: '/placeholder.svg'
  },
  {
    id: '2',
    name: 'Michael Rodriguez',
    title: 'Legal Counsel',
    department: 'Legal',
    email: 'michael.rodriguez@company.com',
    experience: '12 years',
    expertise: ['Contract law', 'Compliance', 'Risk assessment'],
    availableForMentorship: true,
    avatar: '/placeholder.svg'
  },
  {
    id: '3',
    name: 'Lisa Thompson',
    title: 'Product Manager',
    department: 'Product',
    email: 'lisa.thompson@company.com',
    experience: '6 years',
    expertise: ['Product roadmap', 'Feature specifications', 'Customer requirements'],
    availableForMentorship: true,
    avatar: '/placeholder.svg'
  },
  {
    id: '4',
    name: 'David Park',
    title: 'Finance Director',
    department: 'Finance',
    email: 'david.park@company.com',
    experience: '10 years',
    expertise: ['Pricing strategy', 'Budget approval', 'Financial planning'],
    availableForMentorship: false,
    avatar: '/placeholder.svg'
  },
  {
    id: '5',
    name: 'Emma Watson',
    title: 'Sales Representative',
    department: 'Sales',
    email: 'emma.watson@company.com',
    experience: '0 years',
    expertise: ['B2B sales', 'Client relations'],
    availableForMentorship: false,
    avatar: '/placeholder.svg'
  }
];

interface CompanyDatabaseProps {
  onBack: () => void;
}

const CompanyDatabase = ({ onBack }: CompanyDatabaseProps) => {
  const [activeTab, setActiveTab] = useState('employees');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button
              onClick={onBack}
              variant="ghost"
              className="bg-white/10 backdrop-blur-md text-gray-700 border border-gray-200 hover:bg-white/20"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <h1 className="text-3xl font-bold text-gray-800" style={{ fontFamily: 'Helvetica Neue, sans-serif' }}>
              Company Database
            </h1>
          </div>
        </div>

        {/* Company Info */}
        <Card className="mb-8 bg-white/80 backdrop-blur-sm border border-gray-200">
          <CardHeader>
            <CardTitle className="text-xl text-gray-800" style={{ fontFamily: 'Helvetica Neue, sans-serif' }}>
              Interactive Solutions Inc.
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-600">
              <div>
                <p><strong>Founded:</strong> 2018</p>
                <p><strong>Employees:</strong> 127</p>
                <p><strong>Industry:</strong> Technology & AI</p>
              </div>
              <div>
                <p><strong>Location:</strong> San Francisco, CA</p>
                <p><strong>Revenue:</strong> $15.2M ARR</p>
                <p><strong>Growth:</strong> 45% YoY</p>
              </div>
              <div>
                <p><strong>Mission:</strong> Embedding learning in daily workflows</p>
                <p><strong>Values:</strong> Innovation, Growth, Collaboration</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-white/80 backdrop-blur-sm border border-gray-200">
            <TabsTrigger value="employees" className="text-gray-700" style={{ fontFamily: 'Helvetica Neue, sans-serif' }}>
              Employees
            </TabsTrigger>
            <TabsTrigger value="protocols" className="text-gray-700" style={{ fontFamily: 'Helvetica Neue, sans-serif' }}>
              Protocols
            </TabsTrigger>
            <TabsTrigger value="projects" className="text-gray-700" style={{ fontFamily: 'Helvetica Neue, sans-serif' }}>
              Projects
            </TabsTrigger>
            <TabsTrigger value="resources" className="text-gray-700" style={{ fontFamily: 'Helvetica Neue, sans-serif' }}>
              Resources
            </TabsTrigger>
          </TabsList>

          <TabsContent value="employees" className="mt-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-800" style={{ fontFamily: 'Helvetica Neue, sans-serif' }}>
                Employees
              </h2>
              <Button className="bg-emerald-500 hover:bg-emerald-600 text-white" style={{ fontFamily: 'Helvetica Neue, sans-serif' }}>
                <Plus className="w-4 h-4 mr-2" />
                Add Employee
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockEmployees.map((employee) => (
                <Card key={employee.id} className="bg-white/90 backdrop-blur-sm border border-gray-200 hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center text-gray-600 font-semibold">
                          {employee.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800" style={{ fontFamily: 'Helvetica Neue, sans-serif' }}>
                            {employee.name}
                          </h3>
                          <p className="text-sm text-gray-600">{employee.title}</p>
                          <p className="text-xs text-gray-500">{employee.department}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-blue-500 hover:text-blue-600 hover:bg-blue-50">
                        Edit
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2 text-sm">
                      <p><strong>Email:</strong> {employee.email}</p>
                      <p><strong>Experience:</strong> {employee.experience}</p>
                      <div>
                        <p><strong>Expertise:</strong></p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {employee.expertise.map((skill, index) => (
                            <Badge key={index} variant="secondary" className="text-xs bg-gray-100 text-gray-700">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      {employee.availableForMentorship && (
                        <div className="flex items-center space-x-1 text-emerald-600 mt-2">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                          <span className="text-xs">Available for mentorship</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="protocols" className="mt-6">
            <Card className="bg-white/90 backdrop-blur-sm border border-gray-200">
              <CardHeader>
                <CardTitle className="text-gray-800" style={{ fontFamily: 'Helvetica Neue, sans-serif' }}>
                  Company Protocols
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Protocol management coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects" className="mt-6">
            <Card className="bg-white/90 backdrop-blur-sm border border-gray-200">
              <CardHeader>
                <CardTitle className="text-gray-800" style={{ fontFamily: 'Helvetica Neue, sans-serif' }}>
                  Active Projects
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Project management coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resources" className="mt-6">
            <Card className="bg-white/90 backdrop-blur-sm border border-gray-200">
              <CardHeader>
                <CardTitle className="text-gray-800" style={{ fontFamily: 'Helvetica Neue, sans-serif' }}>
                  Company Resources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Resource library coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CompanyDatabase;
