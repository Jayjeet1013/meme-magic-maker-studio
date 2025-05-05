
import { Image } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="w-full p-4 border-b bg-white shadow-sm">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image className="h-6 w-6 text-meme-primary" />
          <h1 className="text-2xl font-bold text-meme-primary">
            Meme Magic <span className="text-meme-dark">Maker</span>
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline">About</Button>
          <Button size="sm" variant="default" className="bg-meme-primary hover:bg-meme-dark">
            Create a Meme
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
