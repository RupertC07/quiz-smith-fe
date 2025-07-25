"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Upload, FileText, Loader2, Brain } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useGenarateQuizStore } from "@/app/store/generateQuizStore";
import { useLoadingStore } from "@/app/store/loadingStore";
import { useActiveStore } from "@/app/store/activeTabStore";
import { LetterText } from "lucide-react";

const QuizTab = () => {
  const { textInput, setTextInput, selectedFile, setSelectedFile, clearInputs } =
    useGenarateQuizStore();
  const { isLoading } = useLoadingStore();
  const { activeTab, setActiveTab } = useActiveStore();
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
    }
  };

  return (
    <div>
      <Tabs defaultValue="text" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger
            disabled={isLoading}
            value="text"
            onClick={() => {
              setActiveTab("text");
              clearInputs();
            }}
            className="cursor-pointer"
          >
            <LetterText /> Text
          </TabsTrigger>
          <TabsTrigger
            disabled={isLoading}
            value="pdf"
            onClick={() => {
              setActiveTab("file");
              clearInputs();
            }}
            className="cursor-pointer"
          >
            <Upload /> File Upload
            </TabsTrigger>
        </TabsList>

        <TabsContent value="text" className="w-full">
          <div className="w-full space-y-2">
            <Label htmlFor="text-input">Enter your content</Label>
            <Textarea
              id="text-input"
              placeholder="Paste your text content here. This could be lecture notes, articles, study materials, or any educational content you'd like to turn into a quiz..."
              value={textInput}
              onChange={(e: any) => setTextInput(e.target.value)}
              className="w-full min-h-[200px] resize-none focus:outline-none focus:ring-0 focus:border-transparent "
            />
            <p className="text-sm text-muted-foreground">
              {textInput.length} characters
            </p>
          </div>
        </TabsContent>

        <TabsContent value="pdf" className="w-full">
          <div className="w-full space-y-2">
            <Label htmlFor="pdf-input">Upload PDF document</Label>
            <div className="w-full border-2 border-dashed rounded-lg p-8 text-center hover:bg-accent/50 transition-colors">
              <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <Input
                id="pdf-input"
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
              />
              <Label htmlFor="pdf-input" className="cursor-pointer ">
                <span className="text-lg font-medium">Click to upload PDF</span>
                <p className="text-sm text-muted-foreground mt-2">
                  Maximum file size: 10MB
                </p>
              </Label>
              {selectedFile && (
                <div className="mt-4 p-3 bg-accent rounded-lg">
                  <p className="font-medium">Selected: {selectedFile.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default QuizTab;
