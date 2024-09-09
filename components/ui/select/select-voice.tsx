"use client";
import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { voice_options } from '@/constants/voice';

interface Props {
  voiceId: string;
  setVoiceId: React.Dispatch<React.SetStateAction<string>>;
}

const SelectVoice = ({ voiceId, setVoiceId }: Props) => {
  return (
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
  )
}

export default SelectVoice