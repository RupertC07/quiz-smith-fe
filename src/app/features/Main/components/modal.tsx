"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, ExternalLink, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useModalStore } from "@/app/store/modalStore";

interface QuizLinkModalProps {
  quizId: string | null;
}

export function QuizLinkModal({ quizId }: QuizLinkModalProps) {
  const { isOpen, toggleModal } = useModalStore();
  
  const [copied, setCopied] = useState(false);
  const [quizUrl, setQuizUrl] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (quizId && typeof window !== "undefined") {
      setQuizUrl(`${window.location.origin}/quiz/${quizId}`);
    }
  }, [quizId])

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(quizUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const openQuiz = () => {
    router.push(`/quiz/${quizId}`);
  };

  if (!quizId) return null;

  return (
    <Dialog open={isOpen} onOpenChange={toggleModal}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            Quiz Generated Successfully!
          </DialogTitle>
          <DialogDescription>
            Your AI-generated quiz is ready. Share the link below or take the
            quiz yourself.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Input id="link" value={quizUrl} readOnly />
          </div>
          <Button
            type="button"
            size="sm"
            className="px-3 bg-violet-500 cursor-pointer hover:bg-violet-400 "
            onClick={copyToClipboard}
          >
            <span className="sr-only">Copy</span>
            {copied ? (
              <CheckCircle className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>
        <div className="flex gap-2 mt-4">
          <Button
            onClick={openQuiz}
            className="flex-1 bg-violet-500 cursor-pointer hover:bg-violet-400"
          >
            <ExternalLink className="mr-2 h-4 w-4 " />
            Take Quiz
          </Button>
          <Button
            variant="outline"
            onClick={toggleModal}
            className="flex-1 bg-transparent cursor-pointer"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
