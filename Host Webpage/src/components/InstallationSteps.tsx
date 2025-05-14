import React from 'react';

interface Step {
  title: string;
  description: string;
}

interface InstallationStepsProps {
  steps: Step[];
}

const InstallationSteps: React.FC<InstallationStepsProps> = ({ steps }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Installation Guide</h2>
      
      <div className="space-y-8">
        {steps.map((step, index) => (
          <div key={index} className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-medium">
                {index + 1}
              </div>
              {index < steps.length - 1 && (
                <div className="h-full ml-4 w-px bg-indigo-200 my-2"></div>
              )}
            </div>
            
            <div className="pt-1">
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InstallationSteps;