
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface MemeTemplateCardProps {
  image: string;
  name: string;
  onSelect: () => void;
}

const MemeTemplateCard = ({ image, name, onSelect }: MemeTemplateCardProps) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md hover:scale-105 cursor-pointer group"
      onClick={onSelect}>
      <CardContent className="p-0 relative">
        <img src={image} alt={name} className="w-full h-48 object-cover" />
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Button variant="secondary" className="bg-meme-primary text-white hover:bg-meme-dark">
            Use Template
          </Button>
        </div>
        <div className="p-3 border-t">
          <h3 className="font-medium truncate">{name}</h3>
        </div>
      </CardContent>
    </Card>
  );
};

export default MemeTemplateCard;
