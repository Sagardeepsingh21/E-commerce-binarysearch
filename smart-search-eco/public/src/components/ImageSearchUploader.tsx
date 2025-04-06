
import React, { useRef, useState } from 'react';
import { Upload, Loader2, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface ImageSearchUploaderProps {
  onUpload: (imageDataUrl: string) => void;
  isProcessing: boolean;
  uploadedImage: string | null;
  onReset: () => void;
}

const ImageSearchUploader: React.FC<ImageSearchUploaderProps> = ({
  onUpload,
  isProcessing,
  uploadedImage,
  onReset
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.includes('image/')) {
        toast({
          title: "Invalid file type",
          description: "Please upload an image file (JPEG, PNG, etc.)",
          variant: "destructive"
        });
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageDataUrl = event.target?.result as string;
        onUpload(imageDataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex-1 flex items-center">
      {!uploadedImage ? (
        <div className="w-full">
          <Button 
            onClick={() => fileInputRef.current?.click()}
            className="w-full flex items-center justify-center py-3 rounded-xl bg-secondary/50 hover:bg-secondary/70 border-none focus:ring-2 focus:ring-primary/30"
          >
            <Upload className="h-5 w-5 mr-2" />
            Upload an image to search similar products
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>
      ) : (
        <div className="flex-1 flex items-center gap-3">
          <div className="h-16 w-16 rounded-lg overflow-hidden bg-secondary/50">
            <img 
              src={uploadedImage} 
              alt="Uploaded" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            {isProcessing ? (
              <div className="flex items-center text-sm">
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Analyzing image...
              </div>
            ) : (
              <div className="space-y-2">
                <div className="text-sm font-medium">Uploaded image</div>
                <Button 
                  onClick={onReset}
                  variant="outline"
                  size="sm"
                >
                  Clear image
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageSearchUploader;
