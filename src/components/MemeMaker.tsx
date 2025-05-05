
import { useState } from "react";
import TemplateGallery from "./TemplateGallery";
import MemeEditor from "./MemeEditor";

const MemeMaker = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<{
    id: number;
    name: string;
    image: string;
  } | null>(null);

  return (
    <div className="container py-8">
      {selectedTemplate ? (
        <MemeEditor 
          template={selectedTemplate} 
          onBack={() => setSelectedTemplate(null)} 
        />
      ) : (
        <TemplateGallery onSelectTemplate={setSelectedTemplate} />
      )}
    </div>
  );
};

export default MemeMaker;
