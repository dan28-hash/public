"use client";

import { useEffect, useRef, useState } from "react";
import { ExternalLink } from "lucide-react";

export default function ContactMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!mapRef.current || loaded) return;

    const loadMap = async () => {
      const L = (await import("leaflet")).default;
      await import("leaflet/dist/leaflet.css");

      const map = L.map(mapRef.current!, {
        center: [29.8683, 121.544],
        zoom: 13,
        zoomControl: true,
        scrollWheelZoom: false,
      });

      L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
        maxZoom: 19,
      }).addTo(map);

      const goldIcon = L.divIcon({
        className: "custom-marker",
        html: `<div style="width:24px;height:24px;background:#F4C430;border-radius:50%;border:3px solid #050505;box-shadow:0 0 10px rgba(244,196,48,0.5);"></div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });

      L.marker([29.8683, 121.544], { icon: goldIcon })
        .addTo(map)
        .bindPopup(
          `<div style="font-family:sans-serif;padding:4px 0;">
            <strong style="color:#F8FAFC;">Ningbo Siyang</strong><br/>
            <span style="color:#94A3B8;font-size:12px;">No. 88 Industrial Avenue<br/>Beilun District, Ningbo<br/>Zhejiang, China 315800</span>
          </div>`
        );

      setLoaded(true);
    };

    loadMap();
  }, [loaded]);

  return (
    <div className="overflow-hidden rounded-lg border border-border-primary">
      <div ref={mapRef} className="h-[350px] w-full bg-bg-card" />
      <div className="flex items-center justify-between border-t border-border-primary bg-bg-card px-4 py-3">
        <span className="text-xs text-text-muted">Beilun District, Ningbo, Zhejiang, China</span>
        <a
          href="https://www.google.com/maps/search/Ningbo+Beilun+District+Industrial+Avenue"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-accent transition-colors hover:text-accent-hover"
        >
          <span>Directions</span>
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </div>
  );
}
