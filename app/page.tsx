"use client";
import React from "react";
import axios from "axios";
import { Loader2 } from "lucide-react"
import { voice_options } from "@/constants/voice";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function Home() {
  const [text, setText] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [voiceId, setVoiceId] = React.useState("Xb7hH8MSUJpSbSDYk0k2");

  const handlePlay = async () => {
    setError("");

    const baseUrl = "https://api.elevenlabs.io/v1/text-to-speech";
    const headers = {
      "Content-Type": "application/json",
      "xi-api-key": process.env.NEXT_PUBLIC_ELEVENLAB_API_TOKEN,
    };

    const voiceSettings = {
      stability: 0.8,
      similarity_boost: 0,
    };

    const requestBody = {
      text,
      voice_settings: voiceSettings,
      model_id: "eleven_turbo_v2_5"
    };

    try {
      setLoading(true);
      const response = await axios.post(`${baseUrl}/${voiceId}`, requestBody, {
        headers,
        responseType: "blob",
      });

      if (response.status === 200) {
        const audio = new Audio(URL.createObjectURL(response.data));

        audio.play();
        audio.onended = ()=> {
          setLoading(false);
        }
      } else {
        throw new Error("Error: Unable to stream audio.");
      }
    } catch (error) {
      setError("Error: Unable to stream audio.");
      setLoading(false);
    }
  };

  return (
    <div className="container max-w-2xl mx-auto py-3 px-2">
      <h1 className="mb-6 mt-3 text-center font-bold text-2xl">
        AI voice Elevenlabs
      </h1>

      <div className="w-full flex gap-3 items-center flex-col">
      <div className="flex gap-3">
          <Select onValueChange={(val) => setVoiceId(val)} defaultValue={voiceId}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
            {voice_options.map((option) => (
                <SelectItem key={option.voice_id} value={option.voice_id}>{option.name}</SelectItem>
              )
            )}
            </SelectContent>
          </Select>

          <Button onClick={handlePlay} disabled={loading}>
          {loading && <Loader2 className="md:mr-1 h-4 w-4 animate-spin" />}
            Play
          </Button>
        </div>

        <Textarea placeholder="Enter a prompt text to speech" onChange={(e) => setText(e.target.value)} value={text} className="h-[200px] text-base" />
      </div>
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
}
