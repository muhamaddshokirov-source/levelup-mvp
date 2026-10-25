import { useCallback } from 'react';
// Native builds retain the text conversation without pretending to record audio.
export function useBrowserVoice(_active: boolean, _onText: (text: string) => void) {
  return { supported: false, canSpeak: false, listening: false, voiceError: '', start: () => {}, stop: () => {}, speak: (_text: string) => {}, stopSpeaking: useCallback(() => {}, []) };
}
