
import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface SettingsTabProps {
  aspectRatio: string;
  setAspectRatio: (ratio: string) => void;
}

const SettingsTab: React.FC<SettingsTabProps> = ({
  aspectRatio,
  setAspectRatio
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-2">Video Settings</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Configure the basic settings for your video
        </p>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="aspect-ratio" className="mb-2 block">
              Aspect Ratio
            </Label>
            <RadioGroup
              value={aspectRatio}
              onValueChange={setAspectRatio}
              className="grid grid-cols-3 gap-2"
            >
              <div>
                <RadioGroupItem
                  value="16:9"
                  id="16:9"
                  className="sr-only"
                />
                <Label
                  htmlFor="16:9"
                  className={`flex flex-col items-center justify-center border rounded-md p-2 cursor-pointer ${
                    aspectRatio === "16:9" ? "border-primary bg-primary/10" : "border-border"
                  }`}
                >
                  <div className="w-16 h-9 bg-accent mb-2"></div>
                  <span className="text-xs">16:9</span>
                </Label>
              </div>
              
              <div>
                <RadioGroupItem
                  value="4:3"
                  id="4:3"
                  className="sr-only"
                />
                <Label
                  htmlFor="4:3"
                  className={`flex flex-col items-center justify-center border rounded-md p-2 cursor-pointer ${
                    aspectRatio === "4:3" ? "border-primary bg-primary/10" : "border-border"
                  }`}
                >
                  <div className="w-12 h-9 bg-accent mb-2"></div>
                  <span className="text-xs">4:3</span>
                </Label>
              </div>
              
              <div>
                <RadioGroupItem
                  value="1:1"
                  id="1:1"
                  className="sr-only"
                />
                <Label
                  htmlFor="1:1"
                  className={`flex flex-col items-center justify-center border rounded-md p-2 cursor-pointer ${
                    aspectRatio === "1:1" ? "border-primary bg-primary/10" : "border-border"
                  }`}
                >
                  <div className="w-9 h-9 bg-accent mb-2"></div>
                  <span className="text-xs">1:1</span>
                </Label>
              </div>
              
              <div>
                <RadioGroupItem
                  value="9:16"
                  id="9:16"
                  className="sr-only"
                />
                <Label
                  htmlFor="9:16"
                  className={`flex flex-col items-center justify-center border rounded-md p-2 cursor-pointer ${
                    aspectRatio === "9:16" ? "border-primary bg-primary/10" : "border-border"
                  }`}
                >
                  <div className="w-7 h-12 bg-accent mb-2"></div>
                  <span className="text-xs">9:16</span>
                </Label>
              </div>
              
              <div>
                <RadioGroupItem
                  value="1:2"
                  id="1:2"
                  className="sr-only"
                />
                <Label
                  htmlFor="1:2"
                  className={`flex flex-col items-center justify-center border rounded-md p-2 cursor-pointer ${
                    aspectRatio === "1:2" ? "border-primary bg-primary/10" : "border-border"
                  }`}
                >
                  <div className="w-6 h-12 bg-accent mb-2"></div>
                  <span className="text-xs">1:2</span>
                </Label>
              </div>
              
              <div>
                <RadioGroupItem
                  value="2:1"
                  id="2:1"
                  className="sr-only"
                />
                <Label
                  htmlFor="2:1"
                  className={`flex flex-col items-center justify-center border rounded-md p-2 cursor-pointer ${
                    aspectRatio === "2:1" ? "border-primary bg-primary/10" : "border-border"
                  }`}
                >
                  <div className="w-12 h-6 bg-accent mb-2"></div>
                  <span className="text-xs">2:1</span>
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsTab;
