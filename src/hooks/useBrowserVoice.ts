import { useCallback } from 'react';
// Native builds retain the text conversation without pretending to record audio.
export function useBrowserVoice(_active: boolean, _onText: (text: string) => void, _onEnd?: () => void, _onError?: () => void, _onPreview?: (text: string) => void, _onReady?: () => void) {
  return { supported: false, canSpeak: false, listening: false, starting: false, voiceError: '', start: () => {}, stop: () => {}, cancel: () => {}, speak: (_text: string, _onDone?: () => void, onFailure?: () => void) => { onFailure?.(); }, stopSpeaking: useCallback(() => {}, []) };
}
