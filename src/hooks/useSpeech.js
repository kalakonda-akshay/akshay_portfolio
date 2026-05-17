import { useCallback, useEffect, useRef, useState } from "react";

export function useSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const voicesRef = useRef([]);

  const loadVoices = useCallback(() => {
    if (!("speechSynthesis" in window)) return Promise.resolve([]);

    const existing = window.speechSynthesis.getVoices();
    if (existing.length) {
      voicesRef.current = existing;
      return Promise.resolve(existing);
    }

    return new Promise((resolve) => {
      const timeout = window.setTimeout(() => {
        const voices = window.speechSynthesis.getVoices();
        voicesRef.current = voices;
        resolve(voices);
      }, 1200);

      window.speechSynthesis.onvoiceschanged = () => {
        window.clearTimeout(timeout);
        const voices = window.speechSynthesis.getVoices();
        voicesRef.current = voices;
        resolve(voices);
      };
    });
  }, []);

  useEffect(() => {
    setIsSupported(typeof window !== "undefined" && "speechSynthesis" in window);
    loadVoices();
    return () => {
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    };
  }, [loadVoices]);

  const stop = useCallback(() => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, []);

  const speak = useCallback(
    async (text) => {
      if (!("speechSynthesis" in window) || !text) return;

      if (isSpeaking) {
        stop();
        return;
      }

      const voices = voicesRef.current.length ? voicesRef.current : await loadVoices();
      const voice =
        voices.find((item) => /^en/i.test(item.lang) && /female|zira|samantha|google|english/i.test(item.name)) ||
        voices.find((item) => /^en/i.test(item.lang)) ||
        voices[0];

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = voice || null;
      utterance.rate = 0.92;
      utterance.pitch = 1;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    },
    [isSpeaking, loadVoices, stop]
  );

  return { isSupported, isSpeaking, speak, stop };
}
