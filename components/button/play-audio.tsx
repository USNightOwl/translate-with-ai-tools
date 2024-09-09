"use client";
import React from 'react'
import { Button } from "@/components/ui/button";
import { Loader2, Volume2, VolumeOff } from 'lucide-react';
import { getTextToSpeech } from '@/services/apiPlayAudio';

interface Props {
  text: string;
  voiceId: string;
}

const PlayAudio = ({ text, voiceId }: Props) => {
  const [disabled, setDisabled] = React.useState(false);
  const [playing, setPlaying] = React.useState(false);
  const [audio, setAudio] = React.useState<HTMLAudioElement | null>(null);

  React.useEffect(() => {
    if (audio) {
      audio.play();
      setPlaying(true);
      setDisabled(false);
      audio.onended = () => {
        setPlaying(false);
      }
    }
  },[audio])
  const handlePlay = async () => {
    try {
      setDisabled(true);
      const response = await getTextToSpeech(voiceId, text);
      const newAudio = new Audio(URL.createObjectURL(response))
      setAudio(newAudio);
    } catch (error) {
      setDisabled(false);
      console.log(error);
    }
  };
  
  const handleClick = async () => {
    if (audio != null) {
      setPlaying(false);
      audio.pause();
      audio.currentTime = 0;
      setAudio(null);
    }else{
      await handlePlay();
    }
  }

  if (text.trim().length <= 0) return<span></span>;

  return (
    <Button onClick={handleClick} disabled={disabled}>
      { disabled ? <Loader2 className="h-5 w-5 animate-spin"/> : playing ? <Volume2 className="h-5 w-5" />: <VolumeOff className="h-5 w-5"/> }
    </Button>
  )
}

export default PlayAudio