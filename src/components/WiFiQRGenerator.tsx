import { useState } from "react";
import { QRCodeSVG as QRCode } from "qrcode.react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function WiFiQRGenerator() {
  const [ssid, setSsid] = useState("");
  const [password, setPassword] = useState("");
  const [encryption, setEncryption] = useState("WPA");
  const [hidden, setHidden] = useState(false);

  const wifiString = `WIFI:T:${encryption};S:${ssid};P:${password};${hidden ? "H:true;" : ""};`;

  return (
    <Card className="flex flex-col items-center gap-6 w-full max-w-2xl mx-auto p-10">
      <h2 className="text-3xl font-bold mb-4">WiFi QR Code Generator</h2>
      <div className="w-full flex flex-col gap-4">
        <Input
          type="text"
          placeholder="WiFi SSID"
          value={ssid}
          onChange={e => setSsid(e.target.value)}
          className="w-full text-lg py-3"
        />
        <Input
          type="text"
          placeholder="WiFi Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full text-lg py-3"
        />
        <div className="flex gap-4 items-center">
          <label className="font-semibold">Encryption:</label>
          <select
            value={encryption}
            onChange={e => setEncryption(e.target.value)}
            className="border rounded px-2 py-1"
          >
            <option value="WPA">WPA/WPA2</option>
            <option value="WEP">WEP</option>
            <option value="nopass">None</option>
          </select>
        </div>
        <div className="flex gap-2 items-center">
          <input
            type="checkbox"
            checked={hidden}
            onChange={e => setHidden(e.target.checked)}
            id="hidden"
          />
          <label htmlFor="hidden">Hidden Network</label>
        </div>
      </div>
      {ssid && (
        <div className="mt-6 flex flex-col items-center gap-4">
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-lg ring-4 ring-primary/40 transition-all">
            <QRCode value={wifiString} size={300} className="drop-shadow-lg" />
          </div>
          <div className="text-xs text-zinc-500 mt-2">Scan this QR code with your device to connect to WiFi.</div>
        </div>
      )}
    </Card>
  );
}
