"use client";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import QuizTab from "./quizTab";
import { useGenarateQuizStore } from "@/app/store/generateQuizStore";
import { useActiveStore } from "@/app/store/activeTabStore";
import { useLoadingStore } from "@/app/store/loadingStore";
import { WandSparkles } from "lucide-react";
import { QuizLinkModal } from "./modal";
import { useModalStore } from "@/app/store/modalStore";
import { useState } from "react";

const MainSectionComponent = () => {
  const { textInput, clearInputs, selectedFile } = useGenarateQuizStore();
  const { activeTab } = useActiveStore();
  const { isLoading, toggleLoading } = useLoadingStore();
  const [linkId, setLinkId] = useState<string | null>(null);
  const { toggleModal } = useModalStore();

  const handleGenerate = () => {
    toggleLoading();
    alert(`Generating quiz with input: ${textInput}`);
    clearInputs();

    setLinkId("12345");
    toggleModal(); 

  };

 



  return (
    <div className="w-full p-6">
      <div className="flex flex-col items-center justify-center mb-6 gap-4">
        <div className="flex items-center justify-center gap-2">
            <img src="prof-logo.png" className="h-12 w-12" alt="" />
          <h1 className="text-3xl font-bold text-gray-600">Quiz Smith</h1>
        </div>
        <div>
          <p className="text-center  text-gray-500">
          Transform your content into interactive quizzes powered by AI
          </p>
        </div>
      </div>
      <div className="w-full flex items-center justify-center">
        <Card className="xl:w-8/12 bg-white/95 backdrop-blur-xl border-0 shadow-2xl shadow-violet-500/30 rounded-md overflow-hidden">
          <CardHeader>
            <CardTitle>Create Your Quiz</CardTitle>
            <CardDescription>
              Choose to input text directly or upload a PDF document to generate
              your quiz
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full">
              <QuizTab />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              onClick={() => handleGenerate()}
              disabled={
                isLoading
                  ? true
                  : selectedFile == null && textInput == ""
                  ? true
                  : false
              }
              className={`w-full h-8 cursor-pointer bg-violet-500 hover:bg-violet-400 ${
                textInput == "" ? "cursor-not-allowed" : ""
              }`}
            >
              Generate Quiz <WandSparkles />
            </Button>
          </CardFooter>
        </Card>
      </div>
      <QuizLinkModal quizId={linkId}  />
    </div>
  );
};

export default MainSectionComponent;
