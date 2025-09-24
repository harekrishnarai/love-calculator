import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";
import { Input } from "./components/ui/input";

import Confetti from "react-confetti";

export default function LoveCalculator() {
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // Fun Love % Logic (numerology style)
  const calculateLove = () => {
    if (!name1 || !name2) return;
    setLoading(true);
    setResult(null);
    setShowConfetti(false);

    setTimeout(() => {
      const total = (getNameValue(name1) + getNameValue(name2)) % 101;
      setResult(total);
      setLoading(false);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 4000);
    }, 2500);
  };

  const getNameValue = (str) => {
    return str
      .toUpperCase()
      .split("")
      .filter((ch) => /[A-Z]/.test(ch))
      .reduce((sum, ch) => sum + (ch.charCodeAt(0) - 64), 0);
  };

  const getMessage = (val) => {
    if (val > 85) return "💘 Soulmates for life! Back-to-school vibes 💖";
    if (val > 65) return "✨ Crush level: High! That classroom spark ✨";
    if (val > 40) return "😅 Cute connection, those notebook doodles!";
    if (val > 20) return "🤔 Mixed feelings, but still sweet notes in class.";
    return "😂 Just friends — like sharing homework answers!";
  };

  return (
  <div className="flex items-center justify-center min-h-screen p-6 relative overflow-hidden bg-smoke dark:bg-[#0a0a0b]">
      {/* soft gradient blobs background in palette */}
  <div className="absolute -top-32 -left-32 h-80 w-80 rounded-full bg-sage/25 dark:bg-pink-500/25 blur-3xl" />
  <div className="absolute -bottom-40 -right-20 h-96 w-96 rounded-full bg-beige/40 dark:bg-rose-500/20 blur-3xl" />
  <div className="absolute top-1/3 -right-24 h-72 w-72 rounded-full bg-terra/20 dark:bg-pink-400/20 blur-3xl" />
      {showConfetti && <Confetti recycle={false} numberOfPieces={300} />}

      {/* Floating emojis for fun */}
      <motion.div
  className="absolute text-sage dark:text-pink-400 text-4xl"
        animate={{ y: [0, -600], opacity: [1, 0] }}
        transition={{ duration: 6, repeat: Infinity, repeatType: "loop" }}
        style={{ left: "10%", top: "85%" }}
      >
        💕
      </motion.div>
      <motion.div
  className="absolute text-terra dark:text-rose-400 text-5xl"
        animate={{ y: [0, -700], opacity: [1, 0] }}
        transition={{ duration: 7, repeat: Infinity, repeatType: "loop", delay: 1 }}
        style={{ left: "75%", top: "90%" }}
      >
        ❤️
      </motion.div>
      <motion.div
  className="absolute text-sage/70 dark:text-pink-300/70 text-3xl"
        animate={{ y: [0, -500], opacity: [1, 0] }}
        transition={{ duration: 5, repeat: Infinity, repeatType: "loop", delay: 2 }}
        style={{ left: "50%", top: "95%" }}
      >
        ✨
      </motion.div>

      <Card className="w-full max-w-lg shadow-2xl rounded-3xl dark:bg-white/5">
        <CardContent className="p-8 text-center space-y-6 dark:text-white">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sage to-terra drop-shadow dark:from-pink-400 dark:to-rose-500"
          >
            💞 Love Calculator 💞
          </motion.h1>
          <p className="text-charcoal/70 dark:text-white/80 italic text-md">
            ✏️ Back to School Days – Relive those secret classroom crush vibes!
          </p>

          <div className="space-y-4">
            <Input
              placeholder="Your Name"
              value={name1}
              onChange={(e) => setName1(e.target.value)}
              className="rounded-2xl"
            />
            <Input
              placeholder="Crush's Name"
              value={name2}
              onChange={(e) => setName2(e.target.value)}
              className="rounded-2xl"
            />
          </div>

          <Button
            onClick={calculateLove}
            className="w-full text-xl py-5 bg-gradient-to-r from-sage via-beige to-terra text-charcoal hover:opacity-95 dark:from-pink-500 dark:via-fuchsia-500 dark:to-rose-500 dark:text-white"
          >
            Calculate ❤️
          </Button>

          {loading && (
            <motion.div
              className="text-2xl text-sage dark:text-pink-300 mt-4 drop-shadow"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
            >
              💓 Calculating your vibes...
            </motion.div>
          )}

          {result !== null && !loading && (
            <motion.div
              className="mt-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-6xl font-extrabold text-sage dark:text-pink-300 drop-shadow-md">
                {result}%
              </h2>
              <p className="text-lg mt-3 text-charcoal/80 dark:text-white/85 font-semibold">
                {getMessage(result)}
              </p>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
