import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";
import { Input } from "./components/ui/input";

import Confetti from "react-confetti";
import * as htmlToImage from "html-to-image";

export default function LoveCalculator() {
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const cardRef = useRef(null);

  const computeScore = (a, b) => {
    const v = (str) =>
      (str || "")
        .toUpperCase()
        .split("")
        .filter((ch) => /[A-Z]/.test(ch))
        .reduce((sum, ch) => sum + (ch.charCodeAt(0) - 64), 0);
    return (v(a) + v(b)) % 101;
  };

  // Initialize from URL if present
  useEffect(() => {
    const url = new URL(window.location.href);
    const q1 = url.searchParams.get("a") || "";
    const q2 = url.searchParams.get("b") || "";
    if (q1) setName1(q1);
    if (q2) setName2(q2);
    if (q1 && q2) {
      // instantly show the shared result (no loading delay)
      const total = computeScore(q1, q2);
      setResult(total);
      setLoading(false);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2500);
    }
  }, []);

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

  const shareUrl = useMemo(() => {
    const url = new URL(window.location.origin + window.location.pathname);
    if (name1) url.searchParams.set("a", name1);
    if (name2) url.searchParams.set("b", name2);
    return url.toString();
  }, [name1, name2]);

  const shareImageAndLink = async () => {
    if (!cardRef.current) return;
    const title = "Our Love Result";
    const text = result !== null ? `${name1} ❤ ${name2} = ${result}%` : "Check our love result!";
    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)")?.matches;
    const bg = prefersDark ? "#0a0a0b" : "#ffffff";

    // Helper: try native share without files first (widest support)
    const tryUrlShare = async () => {
      if (navigator.share) {
        try {
          await navigator.share({ title, text, url: shareUrl });
          return true;
        } catch (err) {
          // user cancel or unsupported payload
          return false;
        }
      }
      return false;
    };

    // Try URL share first to open apps immediately where possible
    const urlShared = await tryUrlShare();
    if (urlShared) return;

    try {
      // Create a clean snapshot of the card area
      const dataUrl = await htmlToImage.toPng(cardRef.current, {
        cacheBust: true,
        quality: 1,
        pixelRatio: 2,
        backgroundColor: bg,
      });

      const fileName = `love-${(name1 || "you").replace(/\s+/g, "_")}-${(name2 || "crush").replace(/\s+/g, "_")}.png`;

      // Share with file if supported
      if (navigator.canShare && navigator.canShare({ files: [new File([new Blob()], "x.png", { type: "image/png" })] })) {
        const res = await fetch(dataUrl);
        const blob = await res.blob();
        const file = new File([blob], fileName, { type: "image/png" });
        try {
          await navigator.share({ title, text, url: shareUrl, files: [file] });
          return;
        } catch (_) {
          // fall through to download/clipboard
        }
      }

      // Fallback: download image + copy link
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      try {
        await navigator.clipboard?.writeText?.(shareUrl);
        alert("Image downloaded. Link copied to clipboard! ✨");
      } catch {
        alert("Image downloaded. Copy this link to share: " + shareUrl);
      }
    } catch (e) {
      console.error("Share failed", e);
      // As a last attempt, try to share URL only
      if (!(await tryUrlShare())) {
        alert("Couldn't share automatically. Share this link: " + shareUrl);
      }
    }
  };

  return (
  <div className="flex items-center justify-center min-h-screen p-6 relative overflow-hidden bg-smoke dark:bg-[#0a0a0b]">
      {/* soft gradient blobs background in palette */}
  <div className="absolute -top-32 -left-32 h-80 w-80 rounded-full bg-sage/25 dark:bg-pink-500/25 blur-3xl" />
  <div className="absolute -bottom-40 -right-20 h-96 w-96 rounded-full bg-beige/40 dark:bg-rose-500/20 blur-3xl" />
  <div className="absolute top-1/3 -right-24 h-72 w-72 rounded-full bg-terra/20 dark:bg-pink-400/20 blur-3xl" />
      {showConfetti && (
        <div className="pointer-events-none">
          <Confetti recycle={false} numberOfPieces={300} />
        </div>
      )}

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
        <CardContent className="p-8 text-center space-y-6 dark:text-white" ref={cardRef}>
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

          {result !== null && !loading && (
            <div className="pt-2">
              <Button
                onClick={shareImageAndLink}
                className="w-full text-base py-3 mt-2 bg-gradient-to-r from-emerald-400 via-sage to-terra text-charcoal hover:opacity-95 dark:from-pink-600 dark:via-fuchsia-600 dark:to-rose-600 dark:text-white"
                aria-label="Share result"
              >
                ✨ Share this moment (image + link)
              </Button>
            </div>
          )}

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
