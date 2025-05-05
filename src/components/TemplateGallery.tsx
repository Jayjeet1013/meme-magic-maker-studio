
import { useState } from "react";
import MemeTemplateCard from "./MemeTemplateCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

// Sample meme templates data
const MEME_TEMPLATES = [
  { id: 1, name: "Drake Hotline Bling", image: "https://i.imgflip.com/30b1gx.jpg" },
  { id: 2, name: "Two Buttons", image: "https://i.imgflip.com/1g8my4.jpg" },
  { id: 3, name: "Distracted Boyfriend", image: "https://i.imgflip.com/1ur9b0.jpg" },
  { id: 4, name: "Running Away Balloon", image: "https://i.imgflip.com/261o3j.jpg" },
  { id: 5, name: "Buff Doge vs. Cheems", image: "https://i.imgflip.com/43a45p.jpg" },
  { id: 6, name: "Change My Mind", image: "https://i.imgflip.com/24y43o.jpg" },
  { id: 7, name: "Left Exit 12 Off Ramp", image: "https://i.imgflip.com/22bdq6.jpg" },
  { id: 8, name: "UNO Draw 25 Cards", image: "https://i.imgflip.com/3lmzyx.jpg" },
];

interface TemplateGalleryProps {
  onSelectTemplate: (template: any) => void;
}

const TemplateGallery = ({ onSelectTemplate }: TemplateGalleryProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredTemplates = MEME_TEMPLATES.filter(template => 
    template.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Choose a Template</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          <Input
            type="text"
            placeholder="Search templates..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredTemplates.map((template) => (
          <MemeTemplateCard
            key={template.id}
            image={template.image}
            name={template.name}
            onSelect={() => onSelectTemplate(template)}
          />
        ))}
      </div>
    </div>
  );
};

export default TemplateGallery;
