"use client";


import QRGenerator from "@/components/QRGenerator";
import QRScanner from "@/components/QRScanner";
import WiFiQRGenerator from "@/components/WiFiQRGenerator";
import { useState } from "react";

export default function QRClientWrapper() {
  const [mode, setMode] = useState<"generate" | "scan" | "wifi">("generate");

  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex gap-4 mb-8">
        <button
          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${mode === "generate" ? "bg-primary text-primary-foreground" : "bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200"}`}
          onClick={() => setMode("generate")}
        >
          Generate QR
        </button>
        <button
          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${mode === "scan" ? "bg-primary text-primary-foreground" : "bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200"}`}
          onClick={() => setMode("scan")}
        >
          Scan QR
        </button>
        <button
          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${mode === "wifi" ? "bg-primary text-primary-foreground" : "bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200"}`}
          onClick={() => setMode("wifi")}
        >
          WiFi QR
        </button>
      </div>
      {mode === "generate" && <QRGenerator />}
      {mode === "scan" && <QRScanner />}
      {mode === "wifi" && <WiFiQRGenerator />}
    </div>
  );
}
