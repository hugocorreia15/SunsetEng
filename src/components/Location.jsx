import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from "react-leaflet";
import L from "leaflet";
import SectionHead from "./SectionHead.jsx";

const VENUE_COORDS = [40.63166, -8.660354];

const pinIcon = L.divIcon({
  className: "sunset-pin",
  html: `<div class="sunset-pin__ring"></div><div class="sunset-pin__dot"></div><div class="sunset-pin__label">EMOTION STAGE</div>`,
  iconSize: [120, 120],
  iconAnchor: [60, 60],
});

const infoBlock = "pb-6 border-b border-[color:var(--line)]";
const infoValue = "font-display text-[clamp(1.4rem,2.5vw,2rem)] leading-[1.05] mt-2";
const infoSub = "block font-mono text-[0.75rem] tracking-[0.15em] uppercase opacity-60 mt-2";

export default function Location({ t, lang }) {
  return (
    <section className="py-4for relative" id="location" data-screen-label="Location">
      <div className="container-x">
        <SectionHead num={t.location.num} title={t.location.title} meta={t.location.meta} />

        <div className="reveal grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 mb-16">
          <div className="flex flex-col gap-8">
            <div className={infoBlock}>
              <span className="eyebrow opacity-60">{t.location.address_label}</span>
              <p className={infoValue}>{t.location.address}<span className={infoSub}>{t.location.address_sub}</span></p>
            </div>
            <div className={infoBlock}>
              <span className="eyebrow opacity-60">{t.location.date_label}</span>
              <p className={infoValue}>{t.location.date}<span className={infoSub}>{t.location.date_sub}</span></p>
            </div>
            <div className={infoBlock}>
              <span className="eyebrow opacity-60">{t.location.access_label}</span>
              <p className={infoValue}>{t.location.access}<span className={infoSub}>{t.location.access_sub}</span></p>
            </div>
            <div className={infoBlock}>
              <span className="eyebrow opacity-60">{t.location.entrance_label}</span>
              <p className={infoValue}>{t.location.entrance}<span className={infoSub}>{t.location.entrance_sub}</span></p>
            </div>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden border border-[color:var(--line-strong)] aspect-[4/3] w-full">
              <MapContainer
                center={VENUE_COORDS}
                zoom={16}
                scrollWheelZoom={false}
                className="map-leaflet h-full w-full"
                attributionControl={false}
              >
                <TileLayer
                  url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                  subdomains={["a", "b", "c", "d"]}
                  maxZoom={20}
                />
                <CircleMarker
                  center={VENUE_COORDS}
                  radius={60}
                  pathOptions={{ color: "#ff6a1a", fillColor: "#ff6a1a", fillOpacity: 0.12, weight: 1.5 }}
                />
                <Marker position={VENUE_COORDS} icon={pinIcon}>
                  <Popup>
                    <strong>Palco Emotion</strong><br/>
                    Campus de Santiago · UA<br/>
                    40.6317° N, 8.6604° W
                  </Popup>
                </Marker>
              </MapContainer>
              <div className="absolute bottom-0 left-0 right-0 z-[400] flex justify-between items-center px-4 py-3 bg-[color:var(--bg)] border-t border-[color:var(--line-strong)]">
                <div className="font-mono text-[0.7rem] tracking-[0.15em] uppercase opacity-70">40.6317° N · 8.6604° W</div>
                <a href="https://maps.app.goo.gl/nLxLLaXMcupUop4J8" target="_blank" rel="noreferrer" className="font-mono text-[0.7rem] tracking-[0.15em] uppercase hover:text-[color:var(--accent)] transition-colors">
                  Google Maps →
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
