
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="w-full bg-gradient-to-b from-meme-light to-white py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Create & Share <span className="text-meme-primary">Memes</span> in Seconds
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-[700px]">
            The easiest way to make, customize, and share memes online.
            No signup required!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="bg-meme-primary hover:bg-meme-dark text-white"
              asChild
            >
              <Link to="/create">Start Creating</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
            >
              Browse Templates
            </Button>
          </div>
          
          <div className="relative w-full max-w-[800px] h-[300px] overflow-hidden rounded-xl shadow-xl mt-8">
            <div className="absolute inset-0 grid grid-cols-3 grid-rows-2 gap-2 p-3 transform rotate-[-5deg] scale-110">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-md p-2 animate-scale-in" style={{ animationDelay: `${i * 0.1}s` }}>
                  <img 
                    src={`https://i.imgflip.com/${["30b1gx", "1g8my4", "1ur9b0", "261o3j", "43a45p", "24y43o"][i % 6]}.jpg`} 
                    alt="Meme example" 
                    className="w-full h-full object-cover rounded"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
