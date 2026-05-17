import { useSpeech } from "../hooks/useSpeech";

const introText =
  "Hi, I am Akshay. Welcome to my portfolio. I build scalable, responsive and production-ready full stack web applications using React, Node.js, MongoDB and modern web technologies.";

export default function ListenIntroButton() {
  const { isSupported, isSpeaking, speak } = useSpeech();

  if (!isSupported) return null;

  return (
    <button
      type="button"
      onClick={() => speak(introText)}
      className="rounded-xl border border-cyan-400/40 bg-cyan-400/10 px-5 py-3 text-sm font-black uppercase tracking-wide text-cyan-100 transition hover:-translate-y-1 hover:bg-cyan-400/20"
    >
      {isSpeaking ? "🔊 Speaking... (Click to Stop)" : "🔈 Listen to Intro"}
    </button>
  );
}
