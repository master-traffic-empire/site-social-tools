'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { Crop, Upload, Download } from 'lucide-react';

interface Preset {
  label: string;
  platform: string;
  width: number;
  height: number;
}

const presets: Preset[] = [
  { label: 'Instagram Post', platform: 'Instagram', width: 1080, height: 1080 },
  { label: 'Instagram Story/Reel', platform: 'Instagram', width: 1080, height: 1920 },
  { label: 'Instagram Landscape', platform: 'Instagram', width: 1080, height: 566 },
  { label: 'Instagram Portrait', platform: 'Instagram', width: 1080, height: 1350 },
  { label: 'TikTok Video', platform: 'TikTok', width: 1080, height: 1920 },
  { label: 'YouTube Thumbnail', platform: 'YouTube', width: 1280, height: 720 },
  { label: 'YouTube Banner', platform: 'YouTube', width: 2560, height: 1440 },
  { label: 'Twitter Header', platform: 'Twitter', width: 1500, height: 500 },
  { label: 'Twitter Post', platform: 'Twitter', width: 1200, height: 675 },
  { label: 'Facebook Cover', platform: 'Facebook', width: 820, height: 312 },
  { label: 'LinkedIn Banner', platform: 'LinkedIn', width: 1584, height: 396 },
  { label: 'Pinterest Pin', platform: 'Pinterest', width: 1000, height: 1500 },
];

const s = {
  container: { maxWidth: 800, margin: '0 auto' },
  upload: {
    padding: 48, border: '2px dashed var(--border)', borderRadius: 'var(--radius)', textAlign: 'center' as const,
    cursor: 'pointer', background: 'var(--bg-secondary)', marginBottom: 24,
  },
  presets: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 8, marginBottom: 24 },
  preset: {
    padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)',
    background: 'var(--bg-secondary)', cursor: 'pointer', textAlign: 'left' as const,
  },
  presetActive: { borderColor: 'var(--accent)', background: 'var(--accent-light)' },
  presetName: { fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' },
  presetSize: { fontSize: 11, color: 'var(--text-muted)' },
  presetPlatform: { fontSize: 11, color: 'var(--accent)' },
  canvasWrap: { position: 'relative' as const, marginBottom: 24, display: 'flex', justifyContent: 'center', background: 'var(--bg-secondary)', borderRadius: 'var(--radius)', padding: 16 },
  canvas: { maxWidth: '100%', maxHeight: 400, borderRadius: 4 },
  actions: { display: 'flex', gap: 12, flexWrap: 'wrap' as const, marginBottom: 24 },
  btn: {
    display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px', borderRadius: 'var(--radius-sm)',
    border: 'none', fontWeight: 600, fontSize: 14, cursor: 'pointer',
  },
  info: { fontSize: 13, color: 'var(--text-muted)', padding: 12, background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' },
};

export default function ImageResizer() {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [selectedPreset, setSelectedPreset] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const preset = presets[selectedPreset];

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !image) return;

    canvas.width = preset.width;
    canvas.height = preset.height;
    const ctx = canvas.getContext('2d')!;

    // Fill background
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, preset.width, preset.height);

    // Scale to cover
    const scale = Math.max(preset.width / image.width, preset.height / image.height);
    const w = image.width * scale;
    const h = image.height * scale;
    ctx.drawImage(image, (preset.width - w) / 2, (preset.height - h) / 2, w, h);
  }, [image, preset]);

  useEffect(() => {
    draw();
  }, [draw]);

  const handleFile = (file: File) => {
    const img = new window.Image();
    img.onload = () => setImage(img);
    img.src = URL.createObjectURL(file);
  };

  const download = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `${preset.label.toLowerCase().replace(/\s+/g, '-')}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div style={s.container}>
      {!image ? (
        <div
          style={s.upload}
          onClick={() => fileRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const file = e.dataTransfer.files[0];
            if (file && file.type.startsWith('image/')) handleFile(file);
          }}
        >
          <Upload size={40} color="var(--text-muted)" />
          <div style={{ fontSize: 16, color: 'var(--text-secondary)', marginTop: 12 }}>Click to upload or drag an image</div>
          <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>JPG, PNG, WebP supported</div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
            }}
          />
        </div>
      ) : (
        <>
          <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 12 }}>
            Select Platform Size
          </div>
          <div style={s.presets}>
            {presets.map((p, i) => (
              <button
                key={i}
                style={{ ...s.preset, ...(selectedPreset === i ? s.presetActive : {}) }}
                onClick={() => setSelectedPreset(i)}
              >
                <div style={s.presetPlatform}>{p.platform}</div>
                <div style={s.presetName}>{p.label}</div>
                <div style={s.presetSize}>{p.width} x {p.height}</div>
              </button>
            ))}
          </div>

          <div style={s.canvasWrap}>
            <canvas ref={canvasRef} style={s.canvas} />
          </div>

          <div style={s.actions}>
            <button style={{ ...s.btn, background: 'var(--accent)', color: 'white' }} onClick={download}>
              <Download size={16} /> Download ({preset.width}x{preset.height})
            </button>
            <button
              style={{ ...s.btn, background: 'var(--bg-tertiary)', color: 'var(--text-secondary)', border: '1px solid var(--border)' }}
              onClick={() => fileRef.current?.click()}
            >
              <Upload size={16} /> Change Image
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFile(file);
              }}
            />
          </div>

          <div style={s.info}>
            <strong>Original image:</strong> {image.width} x {image.height}px | <strong>Output:</strong> {preset.width} x {preset.height}px | All processing is done in your browser. Images are never uploaded.
          </div>
        </>
      )}
    </div>
  );
}
