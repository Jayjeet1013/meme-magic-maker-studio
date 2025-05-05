
import { FileImage, Text, Share } from "lucide-react";

const features = [
  {
    title: "Choose from Popular Templates",
    description: "Access a library of the internet's most popular meme templates, ready to customize.",
    icon: FileImage,
  },
  {
    title: "Add Your Text",
    description: "Easily add the perfect captions to make your meme stand out.",
    icon: Text,
  },
  {
    title: "Download & Share",
    description: "Save your creation or share it directly on social media.",
    icon: Share,
  },
];

const FeaturesSection = () => {
  return (
    <div className="py-16 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">How It Works</h2>
          <p className="text-muted-foreground mt-2">Create the perfect meme in three simple steps</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-sm"
            >
              <div className="h-12 w-12 flex items-center justify-center rounded-full bg-meme-light text-meme-primary mb-4">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
