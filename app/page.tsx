"use client";
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import SelectVoice from "@/components/ui/select/select-voice";
import PlayAudio from "@/components/button/play-audio";

const maxLength = 20;

export default function Home() {
  const [text, setText] = React.useState("");
  const [voiceId, setVoiceId] = React.useState("Xb7hH8MSUJpSbSDYk0k2");
  const [showWarning, setShowWarning] = React.useState(false);

  return (
    <div className="container max-w-2xl mx-auto py-3 px-2">
      <h1 className="mb-6 mt-3 text-center font-bold text-2xl">
        AI voice Elevenlabs
      </h1>

      <div className="w-full flex gap-3 items-center flex-col">
        <div className="flex gap-3">
            <SelectVoice voiceId={voiceId} setVoiceId={setVoiceId} />
            <PlayAudio text={text} voiceId={voiceId} />
        </div>

        <Textarea placeholder="Enter a prompt text to speech" onChange={(e) => {
          setText(e.target.value);
          if (e.target.value.length >= maxLength) setShowWarning(true);
          else setShowWarning(false);
        }} value={text} className="h-[200px] text-base" maxLength={maxLength} />
      </div>
      {showWarning &&
        <div className="text-sm text-blue-500 italic">
          Do xài free nên giới hạn{" "}{maxLength}{" "}kí tự =))
        </div>
      }
    </div>
  );
}
