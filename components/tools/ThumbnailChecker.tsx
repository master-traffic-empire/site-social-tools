'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Image as ImageIcon, Type, Upload, Download } from 'lucide-react';

const previewSizes = [
  { label: 'Large (Homepage)', width: 336, height: 188 },
  { label: 'Medium (Sidebar)', width: 246, height: 138 },
  { label: 'Small (Mobile Search)', width: 168, height: 94 },
];

const s = {
  container: { maxWidth: 800, margin: '0 auto' },
  upload: {
    padding: 48, border: '2px dashed var(--border)', borderRadius: 'var(--radius)', textAlign: 'center' as const,
    cursor: 'pointer', background: 'var(--bg-secondary)', transition: 'all 0.2s', marginBottom: 24,
  },
  uploadText: { fontSize: 16, color: 'var(--text-secondary)', marginTop: 12 },
  uploadHint: { fontSize: 13, color: 'var(--text-muted)', marginTop: 4 },
  canvas: { width: '100%', maxWidth: 640, borderRadius: 'var(--radius)', display: 'block', margin: '0 auto 24px', background: '#000' },
  controls: { display: 'flex', flexWrap: 'wrap' as const, gap: 16, marginBottom: 24 },
  field: { flex: '1 1 200px' },
  label: { display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 6 } as React.CSSProperties,
  input: {
    width: '100%', padding: '10px 14px', background: 'var(--bg-secondary)', border: '1px solid var(--border)',
    borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', fontSize: 14, outline: 'none',
  },
  range: { width: '100%', accentColor: 'var(--accent)' },
  colorRow: { display: 'flex', gap: 8, alignItems: 'center' },
  colorInput: { width: 40, height: 36, border: 'none', borderRadius: 4, cursor: 'pointer', background: 'transparent' },
  previews: { display: 'flex', flexWrap: 'wrap' as const, gap: 20, justifyContent: 'center', marginTop: 32 },
  previewCard: { textAlign: 'center' as const },
  previewLabel: { fontSize: 12, color: 'var(--text-muted)', marginTop: 8, marginBottom: 4 },
  previewSize: { fontSize: 11, color: 'var(--text-muted)' },
  previewImg: { borderRadius: 8, border: '1px solid var(--border)', display: 'block' },
  btn: {
    display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px', borderRadius: 'var(--radius-sm)',
    border: 'none', background: 'var(--accent)', color: 'white', fontWeight: 600, fontSize: 14, cursor: 'pointer',
  },
};

export default function ThumbnailChecker() {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [text, setText] = useState('YOUR TEXT');
  const [fontSize, setFontSize] = useState(64);
  const [textColor, setTextColor] = useState('#FFFFFF');
  const [strokeColor, setStrokeColor] = useState('#000000');
  const [textY, setTextY] = useState(50);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !image) return;
    canvas.width = 1280;
    canvas.height = 720;
    const ctx = canvas.getContext('2d')!;

    // Draw image scaled to cover
    const scale = Math.max(1280 / image.width, 720 / image.height);
    const w = image.width * scale;
    const h = image.height * scale;
    ctx.drawImage(image, (1280 - w) / 2, (720 - h) / 2, w, h);

    // Draw text
    if (text) {
      ctx.font = `900 ${fontSize}px "Arial Black", Arial, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const y = (textY / 100) * 720;

      // Stroke
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = fontSize / 8;
      ctx.lineJoin = 'round';
      ctx.strokeText(text, 640, y);

      // Fill
      ctx.fillStyle = textColor;
      ctx.fillText(text, 640, y);
    }
  }, [image, text, fontSize, textColor, strokeColor, textY]);

  useEffect(() => {
    draw();
  }, [draw]);

  const handleFile = (file: File) => {
    const img = new window.Image();
    img.onload = () => {
      setImage(img);
    };
    img.src = URL.createObjectURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) handleFile(file);
  };

  const download = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = 'thumbnail.png';
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
          onDrop={handleDrop}
        >
          <Upload size={40} color="var(--text-muted)" />
          <div style={s.uploadText}>Click to upload or drag an image</div>
          <div style={s.uploadHint}>Recommended: 1280x720 (16:9)</div>
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
          <canvas ref={canvasRef} style={s.canvas} />

          <div style={s.controls}>
            <div style={{ ...s.field, flex: '2 1 300px' }}>
              <label style={s.label}>Overlay Text</label>
              <input style={s.input} value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter thumbnail text..." />
            </div>
            <div style={s.field}>
              <label style={s.label}>Font Size: {fontSize}px</label>
              <input type="range" min={20} max={120} value={fontSize} onChange={(e) => setFontSize(Number(e.target.value))} style={s.range} />
            </div>
            <div style={s.field}>
              <label style={s.label}>Vertical Position: {textY}%</label>
              <input type="range" min={10} max={90} value={textY} onChange={(e) => setTextY(Number(e.target.value))} style={s.range} />
            </div>
            <div style={s.field}>
              <label style={s.label}>Colors</label>
              <div style={s.colorRow}>
                <input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} style={s.colorInput} title="Text color" />
                <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Text</span>
                <input type="color" value={strokeColor} onChange={(e) => setStrokeColor(e.target.value)} style={s.colorInput} title="Outline color" />
                <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Outline</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12, marginBottom: 32, flexWrap: 'wrap' }}>
            <button style={s.btn} onClick={download}>
              <Download size={16} /> Download Thumbnail
            </button>
            <button style={{ ...s.btn, background: 'var(--bg-tertiary)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }} onClick={() => fileRef.current?.click()}>
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

          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>Preview at YouTube Sizes</h3>
          <div style={s.previews}>
            {previewSizes.map((size) => (
              <div key={size.label} style={s.previewCard}>
                <canvas
                  ref={(el) => {
                    if (el && canvasRef.current) {
                      el.width = size.width;
                      el.height = size.height;
                      const ctx = el.getContext('2d')!;
                      ctx.drawImage(canvasRef.current, 0, 0, size.width, size.height);
                    }
                  }}
                  style={{ ...s.previewImg, width: size.width, height: size.height }}
                />
                <div style={s.previewLabel}>{size.label}</div>
                <div style={s.previewSize}>{size.width}x{size.height}</div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
