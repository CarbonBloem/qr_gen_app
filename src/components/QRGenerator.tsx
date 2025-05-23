"use client";

import { useRef, useState } from "react";
import { QRCodeSVG as QRCode } from "qrcode.react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";


export default function QRGenerator() {
  const [text, setText] = useState("");
  const qrRef = useRef<SVGSVGElement | null>(null);

  const handleDownload = () => {
    if (!qrRef.current) return;
    const svg = qrRef.current;
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svg);
    const canvas = document.createElement("canvas");
    const img = new window.Image();
    const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);
    img.onload = function () {
      canvas.width = svg.width.baseVal.value;
      canvas.height = svg.height.baseVal.value;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        const pngUrl = canvas.toDataURL("image/png");
        const a = document.createElement("a");
        a.href = pngUrl;
        a.download = "qr-code.png";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
      URL.revokeObjectURL(url);
    };
    img.src = url;
  };

  return (
    <Card className="flex flex-col items-center gap-6 w-full max-w-2xl mx-auto p-10">
      <h2 className="text-3xl font-bold mb-4">QR Code Generator</h2>
      <Input
        type="text"
        placeholder="Enter text or URL"
        value={text}
        onChange={e => setText(e.target.value)}
        className="w-full text-lg py-3"
      />
      {text ? (
        <div className="mt-6 flex flex-col items-center gap-4">
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-lg ring-4 ring-primary/40 transition-all">
            <QRCode value={text} size={500} ref={qrRef} className="drop-shadow-lg" />
          </div>
          <button
            onClick={handleDownload}
            className="mt-4 px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-base font-semibold shadow"
          >
            Download as PNG
          </button>
        </div>
      ) : (
        <div className="mt-6 text-zinc-400 italic text-lg">No data to generate QR code.</div>
      )}
    </Card>
  );
}
