import AxiosClient from "@/config/elevenlabs";

export const getTextToSpeech = async(voiceId: string, text: string) => {
  const voiceSettings = {
    stability: 0,
    similarity_boost: 0,
  };

  const requestBody = {
    text,
    voice_settings: voiceSettings,
    model_id: "eleven_turbo_v2_5"
  };

  const res = await AxiosClient.post(`/${voiceId}`, requestBody);
  return res.data;
}
