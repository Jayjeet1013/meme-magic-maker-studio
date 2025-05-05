
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HexColorPicker } from "react-colorful";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Download, Share, Text, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";

interface MemeEditorProps {
  template: {
    id: number;
    name: string;
    image: string;
  } | null;
  onBack: () => void;
}

const MemeEditor = ({ template, onBack }: MemeEditorProps) => {
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const [fontSize, setFontSize] = useState(36);
  const [textColor, setTextColor] = useState("#ffffff");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (!template) return;
    
    imageRef.current = new Image();
    imageRef.current.crossOrigin = "anonymous";
    imageRef.current.src = template.image;
    imageRef.current.onload = renderMeme;
  }, [template]);

  useEffect(() => {
    renderMeme();
  }, [topText, bottomText, fontSize, textColor]);

  const renderMeme = () => {
    if (!canvasRef.current || !imageRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions to match image
    const imgWidth = imageRef.current.width;
    const imgHeight = imageRef.current.height;
    
    // Maintain aspect ratio but cap the size
    const maxWidth = 600;
    const maxHeight = 600;
    
    let width = imgWidth;
    let height = imgHeight;
    
    if (width > maxWidth) {
      height = (height * maxWidth) / width;
      width = maxWidth;
    }
    
    if (height > maxHeight) {
      width = (width * maxHeight) / height;
      height = maxHeight;
    }
    
    canvas.width = width;
    canvas.height = height;
    
    // Clear canvas and draw image
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(imageRef.current, 0, 0, width, height);
    
    // Set text properties
    ctx.font = `bold ${fontSize}px Impact`;
    ctx.fillStyle = textColor;
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = fontSize / 15;
    ctx.textAlign = "center";
    
    // Add top text
    if (topText) {
      ctx.textBaseline = "top";
      ctx.fillText(topText.toUpperCase(), canvas.width / 2, 10, canvas.width - 20);
      ctx.strokeText(topText.toUpperCase(), canvas.width / 2, 10, canvas.width - 20);
    }
    
    // Add bottom text
    if (bottomText) {
      ctx.textBaseline = "bottom";
      ctx.fillText(bottomText.toUpperCase(), canvas.width / 2, canvas.height - 10, canvas.width - 20);
      ctx.strokeText(bottomText.toUpperCase(), canvas.width / 2, canvas.height - 10, canvas.width - 20);
    }
  };

  const downloadMeme = () => {
    if (!canvasRef.current) return;
    
    const link = document.createElement("a");
    link.download = `meme-${template?.name.toLowerCase().replace(/ /g, "-") || "custom"}.png`;
    link.href = canvasRef.current.toDataURL("image/png");
    link.click();
    toast.success("Meme downloaded successfully!");
  };

  const shareMeme = () => {
    if (!canvasRef.current) return;

    // In a real app, we would implement sharing to social media
    // For now, we'll just copy to clipboard
    canvasRef.current.toBlob(async (blob) => {
      if (!blob) return;
      
      try {
        // Try to use the Web Share API if available
        if (navigator.share) {
          const file = new File([blob], "meme.png", { type: "image/png" });
          await navigator.share({
            title: "Check out my meme!",
            files: [file]
          });
          toast.success("Shared successfully!");
        } else {
          // Fallback to clipboard
          await navigator.clipboard.write([
            new ClipboardItem({
              [blob.type]: blob
            })
          ]);
          toast.success("Copied to clipboard! You can now paste it elsewhere.");
        }
      } catch (error) {
        console.error("Error sharing:", error);
        toast.error("Failed to share. Try downloading instead.");
      }
    });
  };

  if (!template) {
    return null;
  }

  return (
    <div className="w-full flex flex-col md:flex-row gap-6">
      <div className="flex-1 flex flex-col items-center justify-start">
        <div className="relative bg-white p-4 rounded-lg shadow-md w-full max-w-[600px]">
          <canvas 
            ref={canvasRef} 
            className="max-w-full mx-auto border rounded-lg shadow"
          />
        </div>
      </div>
      
      <div className="w-full md:w-80 space-y-6 bg-white p-6 rounded-lg shadow-md">
        <div>
          <Button variant="outline" size="sm" onClick={onBack} className="mb-4">
            ← Back to templates
          </Button>
          <h2 className="text-xl font-bold mb-2">{template.name}</h2>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="top-text">Top Text</Label>
            <div className="flex items-center gap-2">
              <Text size={16} className="text-muted-foreground" />
              <Input
                id="top-text"
                value={topText}
                onChange={(e) => setTopText(e.target.value)}
                placeholder="TOP TEXT HERE"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="bottom-text">Bottom Text</Label>
            <div className="flex items-center gap-2">
              <Text size={16} className="text-muted-foreground" />
              <Input
                id="bottom-text"
                value={bottomText}
                onChange={(e) => setBottomText(e.target.value)}
                placeholder="BOTTOM TEXT HERE"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="font-size">Font Size: {fontSize}px</Label>
            <Slider
              id="font-size"
              min={20}
              max={72}
              step={1}
              value={[fontSize]}
              onValueChange={(value) => setFontSize(value[0])}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Text Color</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                >
                  <div 
                    className="w-4 h-4 rounded-full mr-2 border" 
                    style={{ backgroundColor: textColor }}
                  />
                  {textColor}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-3">
                <HexColorPicker color={textColor} onChange={setTextColor} />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        
        <div className="pt-4 flex flex-col gap-2">
          <Button onClick={downloadMeme} className="w-full bg-meme-primary hover:bg-meme-dark">
            <Download className="mr-2 h-4 w-4" />
            Download Meme
          </Button>
          <Button variant="outline" onClick={shareMeme} className="w-full">
            <Share className="mr-2 h-4 w-4" />
            Share Meme
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MemeEditor;
