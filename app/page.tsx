"use client";
import React, { FormEvent } from "react";
import axios from "axios";
import { cn } from "@/lib/utils";

const options = [
  {name: "Alice (F)",     voice_id: "Xb7hH8MSUJpSbSDYk0k2"},
  {name: "Bill (M)",      voice_id: "pqHfZKP75CvOlQylNhV4"},
  {name: "Brian (M)",     voice_id: "nPczCjzI2devNBz1zQrb"},
  {name: "Callum (M)",    voice_id: "N2lVS1w4EtoT3dr4eOWO"},
  {name: "Charlie (M)",   voice_id: "IKne3meq5aSn9XLyUdCD"},
  {name: "Charlotte (F)", voice_id: "XB0fDUnXU5powFXDhCwa"},
  {name: "Chris (M)",     voice_id: "iP95p4xoKVk53GoZ742B"},
  {name: "Daniel (M)",    voice_id: "onwK4e9ZLuTAKqWW03F9"},
  {name: "Eric (M)",      voice_id: "cjVigY5qzO86Huf0OWal"},
  {name: "George (M)",    voice_id: "JBFqnCBsd6RMkjVDRZzb"},
  {name: "Jessica (F)",   voice_id: "cgSgspJ2msm6clMCkdW9"},
  {name: "Laura (F)",     voice_id: "FGY2WhTYpPnrIDTdsKH5"},
  {name: "Liam (M)",      voice_id: "TX3LPaxmHKxFdv7VOQHJ"},
  {name: "Lily (F)",      voice_id: "pFZP5JQG7iQjIQuC4Bku"},
  {name: "Matilda (F)",   voice_id: "XrExE9yKIg1WjnnlVkGX"},
  {name: "Sarah (F)",     voice_id: "EXAVITQu4vr4xnSDxMaL"},
  {name: "Will (M)",      voice_id: "bIHbv24MWmeRgasZH58o"},
];

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
        setError("Error: Unable to stream audio.");
      }
    } catch (error) {
      setError("Error: Unable to stream audio.");
    }
  };

  return (
    <div className="container max-w-2xl mx-auto p-4">
      <h1 className="py-6 text-center font-bold text-2xl">
        AI voice Elevenlabs
      </h1>

      <div className="w-full flex gap-3 items-center flex-col">
        <textarea
          className="flex-grow border p-2 rounded-lg h-[250px] w-full"
          name="prompt"
          placeholder="Enter a prompt text to speech"
          onChange={(e) => setText(e.target.value)}
          value={text}
          disabled={loading}
        />
        
        <div className="flex gap-3">
          <select className="border p-2 rounded" onChange={(e) => setVoiceId(e.target.value)} value={voiceId}>
            {options.map((option) => (
                <option key={option.voice_id} value={option.voice_id}>
                  {option.name}
                </option>
              )
            )}
          </select>

          <button className={cn("border px-3 rounded-md text-white bg-black", loading?"bg-slate-500 text-slate-200 cursor-not-allowed":"")} disabled={loading} onClick={handlePlay}>
            Play
          </button>
        </div>
      </div>
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
}
