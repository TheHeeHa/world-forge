import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import * as IconSet from "lucide-react";
import {
  COLS, ROWS, YEAR_TICKS, TERRAIN, ROLE_INFO, FACTION_TYPES, CREATURE_TYPES, VEHICLE_TYPES, TRAIT_OPTIONS, ANIMAL_TRAITS, EQUIPMENT_CATALOG, TOOLS, TOOL_GROUPS,
  applyTool, assignVehicle, buildingName, clamp, createWorld, effectiveLaw, entityAt, getEntity, normalizeWorld,
  controlPossessed, declareWar, makePeace, personStatuses, simulateWorld, tileAt, worldStats,
} from "./engine";
import { drawWorld } from "./renderer";
import "./world-forge.css";

const SAVE_KEY = "world-forge-save-slots-v2";
const UPDATE_RESUME_KEY = "world-forge-update-resume-v1";
const PANEL_WIDTH_KEY = "world-forge-panel-width-v1";
const SAVE_COUNT = 6;
const SCENARIOS = {
  balanced: { name: "Normal World", text: "The complete standard simulation. More world experiments are coming soon." },
};
const MAPS = {
  earth: { name: "World Map", text: "A recognizable map of Earth with all major continents." },
  pangaea: { name: "Great Continent", text: "One large connected continent." },
  archipelago: { name: "Archipelago", text: "Five island groups separated by ocean." },
  twin: { name: "Twin Continents", text: "Two rival landmasses with a central sea." },
  ring: { name: "Ring Island", text: "A circular continent around an inland ocean." },
  riverlands: { name: "Riverlands", text: "A broad continent divided by a winding river." },
  empty: { name: "Blank Ocean", text: "Start from scratch and paint every piece of land." },
};
const GROUP_ICONS = { Observe: "Eye", Land: "Mountain", People: "Users", Kingdoms: "Crown", Animals: "PawPrint", Build: "Hammer", Bestow: "Sparkles", Wonders: "Sun", Calamities: "Flame" };

function icon(name, size = 16) {
  const Icon = IconSet[name] || IconSet.Circle;
  return <Icon size={size} strokeWidth={1.8} />;
}

function readSlots() {
  try { const slots = JSON.parse(localStorage.getItem(SAVE_KEY) || "[]"); return Array.from({ length: SAVE_COUNT }, (_, i) => slots[i] || null); }
  catch { return Array.from({ length: SAVE_COUNT }, () => null); }
}

function readUpdateResume() {
  try { const raw = sessionStorage.getItem(UPDATE_RESUME_KEY); if (!raw) return null; sessionStorage.removeItem(UPDATE_RESUME_KEY); const data = JSON.parse(raw); return { world: normalizeWorld(data.world), camera: data.camera }; }
  catch { return null; }
}

function readPanelWidth() {
  const value = Number(localStorage.getItem(PANEL_WIDTH_KEY));
  return clamp(value || 290, 220, 440);
}

function StatBar({ label, value, color = "#d8eb86", editable = false, onChange }) {
  return (
    <label className={`dossier-stat ${editable ? "editable" : ""}`}>
      <span>{label}</span><strong>{Math.round(value)}</strong>
      <input type="range" min="0" max="150" value={clamp(Math.round(value), 0, 150)} disabled={!editable} onChange={(e) => onChange?.(Number(e.target.value))} style={{ "--stat-color": color }} />
    </label>
  );
}

function Meter({ label, value, max = 100, color = "#d8eb86" }) {
  return <div className="mini-meter"><span>{label}<b>{Math.round(value)}/{Math.round(max)}</b></span><i><em style={{ width: `${clamp(value / max * 100, 0, 100)}%`, background: color }} /></i></div>;
}

function EquipmentPanel({ equipment }) {
  return <div className="equipment-panel">{["tool", "weapon", "armor"].map((slot) => { const item = EQUIPMENT_CATALOG[equipment?.[slot]]; return <div key={slot} className={item ? "equipped" : "empty"}><span>{item?.icon || "—"}</span><div><small>{slot}</small><strong>{item?.name || `No ${slot}`}</strong><em>{item ? item.power ? `Work power +${item.power}` : item.damage ? `Damage ${item.damage}` : `Defense ${item.defense}` : "Empty slot"}</em></div></div>; })}</div>;
}

function ScopedLaws({ world, entity, onChange }) {
  const overrides = entity.lawOverrides || {};
  const labelFor = (key) => key.replace(/([A-Z])/g, " $1").replace(/^./, (letter) => letter.toUpperCase());
  const update = (key, value) => { entity.lawOverrides ||= {}; if (value === "world") delete entity.lawOverrides[key]; else entity.lawOverrides[key] = value === "allow"; onChange(); };
  return <div className="scoped-laws">{Object.keys(world.laws).map((key) => { const value = Object.prototype.hasOwnProperty.call(overrides, key) ? overrides[key] ? "allow" : "ban" : "world", faction = entity.factionId ? world.factions.find((item) => item.id === entity.factionId) : null, inheritedSource = key === "aging" && entity.immortal ? "Immortal default" : faction?.lawOverrides && Object.prototype.hasOwnProperty.call(faction.lawOverrides, key) ? "Following kingdom" : "Following world", inheritedValue = effectiveLaw(world, key, entity); return <label key={key}><span><strong>{labelFor(key)}</strong><small>{value === "world" ? `${inheritedSource}: ${inheritedValue ? "Allowed" : "Banned"}` : value === "allow" ? "Override: Allowed" : "Override: Banned"}</small></span><select value={value} onChange={(event) => update(key, event.target.value)}><option value="world">World</option><option value="allow">Allow</option><option value="ban">Ban</option></select></label>; })}</div>;
}

function MapPreview({ type }) {
  const ref = useRef(null);
  useEffect(() => {
    const preview = createWorld(41, "balanced", type), canvas = ref.current, ctx = canvas?.getContext("2d"); if (!ctx) return;
    const bounds = preview.bounds; canvas.width = bounds.width; canvas.height = bounds.height; ctx.imageSmoothingEnabled = false;
    for (let y = 0; y < bounds.height; y += 1) for (let x = 0; x < bounds.width; x += 1) { const tile = preview.tiles[(y + bounds.y) * COLS + x + bounds.x]; ctx.fillStyle = TERRAIN[tile.type].color; ctx.fillRect(x, y, 1, 1); }
  }, [type]);
  return <canvas ref={ref} aria-label={`${MAPS[type].name} world map preview`} />;
}

function WorldMinimap({ world, camera, revision, onNavigate }) {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current, ctx = canvas?.getContext("2d"); if (!ctx) return; canvas.width = 192; canvas.height = 126; ctx.imageSmoothingEnabled = false;
    const sx = canvas.width / COLS, sy = canvas.height / ROWS, factions = Object.fromEntries(world.factions.map((f) => [f.id, f]));
    for (let y = 0; y < ROWS; y += 1) for (let x = 0; x < COLS; x += 1) { const tile = world.tiles[y * COLS + x]; ctx.fillStyle = tile.owner && factions[tile.owner] ? factions[tile.owner].color : TERRAIN[tile.type].color; ctx.globalAlpha = tile.owner ? .88 : 1; ctx.fillRect(x * sx, y * sy, Math.ceil(sx), Math.ceil(sy)); }
    ctx.globalAlpha = 1; const visibleW = COLS / camera.zoom, visibleH = ROWS / camera.zoom; ctx.strokeStyle = "#fff5a8"; ctx.lineWidth = 2; ctx.strokeRect((camera.x - visibleW / 2) * sx, (camera.y - visibleH / 2) * sy, visibleW * sx, visibleH * sy);
  }, [world, camera, revision]);
  return <div className="world-minimap"><header><span>World Map</span><b>{Math.round(camera.zoom * 100)}%</b></header><canvas ref={ref} onClick={(e) => { const rect = e.currentTarget.getBoundingClientRect(); onNavigate((e.clientX - rect.left) / rect.width * COLS, (e.clientY - rect.top) / rect.height * ROWS); }} /></div>;
}

function WorldHistory({ events }) {
  const scrollRef = useRef(null), atTopRef = useRef(true), heightRef = useRef(0), [readingPast, setReadingPast] = useState(false), latestId = events[0]?.id;
  useLayoutEffect(() => {
    const element = scrollRef.current; if (!element) return;
    const previousHeight = heightRef.current, addedHeight = element.scrollHeight - previousHeight;
    if (atTopRef.current) element.scrollTop = 0;
    else if (previousHeight && addedHeight > 0) element.scrollTop += addedHeight;
    heightRef.current = element.scrollHeight;
  }, [latestId]);
  return <section className="wf-history"><header><h2>World History</h2><small>{readingPast ? "Reading past events" : "Live · newest first"}</small></header><div className="history-scroll" ref={scrollRef} onScroll={(event) => { const atTop = event.currentTarget.scrollTop <= 3; atTopRef.current = atTop; setReadingPast(!atTop); }}>{events.map((event) => <article key={event.id} className={event.tone}><span>{event.year}</span><p>{event.text}</p></article>)}</div></section>;
}

function UpdateScreen() {
  return <div className="wf-update-screen" role="status" aria-live="assertive"><section className="wf-update-card"><span className="wf-update-icon">{icon("RefreshCw", 29)}</span><h2>Updating World Forge</h2><p>Your current world is being held safely. Please wait until the new version is ready.</p><span className="wf-update-progress"><i /></span></section></div>;
}

function DiplomacyLedger({ world, onChange, onInspect }) {
  const factions = world.factions, diplomacy = world.diplomacy || { wars: [], alliances: [], history: [] };
  const [attackerId, setAttackerId] = useState(factions[0]?.id || ""), [defenderId, setDefenderId] = useState(factions[1]?.id || "");
  useEffect(() => { if (!factions.some((item) => item.id === attackerId)) setAttackerId(factions[0]?.id || ""); if (!factions.some((item) => item.id === defenderId) || defenderId === attackerId) setDefenderId(factions.find((item) => item.id !== attackerId)?.id || ""); }, [factions.length, attackerId, defenderId]);
  const kingdom = (id) => factions.find((item) => item.id === id), activeWars = diplomacy.wars.filter((war) => war.status === "active"), pastWars = diplomacy.wars.filter((war) => war.status !== "active"), activeAlliances = diplomacy.alliances.filter((alliance) => alliance.status === "active"), formerAlliances = diplomacy.alliances.filter((alliance) => alliance.status !== "active");
  const kingdomButton = (id) => { const item = kingdom(id); return item ? <button className="diplomacy-kingdom" onClick={() => onInspect({ type: "faction", id })}><i style={{ background: item.color }} />{item.name}</button> : <span>Unknown kingdom</span>; };
  return <section className="wf-diplomacy"><header><h2>Diplomacy</h2><small>{activeWars.length} active war{activeWars.length === 1 ? "" : "s"}</small></header>
    <div className="war-control"><strong>Start a war</strong><small>Choose who declares war and who they attack.</small><label><span>Attacker</span><select value={attackerId} onChange={(event) => { const id = event.target.value; setAttackerId(id); if (id === defenderId) setDefenderId(factions.find((item) => item.id !== id)?.id || ""); }}>{factions.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label><label><span>Defender</span><select value={defenderId} onChange={(event) => setDefenderId(event.target.value)}>{factions.filter((item) => item.id !== attackerId).map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label><button disabled={!attackerId || !defenderId || activeWars.some((war) => [war.attackerId, war.defenderId].includes(attackerId) && [war.attackerId, war.defenderId].includes(defenderId))} onClick={() => { if (declareWar(world, attackerId, defenderId)) onChange(); }}>{icon("Swords", 13)} Declare War</button></div>
    <h3>Active wars</h3><div className="diplomacy-cards">{activeWars.length ? activeWars.map((war) => <article className="war-card" key={war.id}><div>{kingdomButton(war.attackerId)}<b>attacks</b>{kingdomButton(war.defenderId)}</div><small>Declared by {kingdom(war.attackerId)?.name || "an unknown kingdom"} · Year {war.startedYear}</small><button onClick={() => { makePeace(world, war.attackerId, war.defenderId); onChange(); }}>Make Peace</button></article>) : <p className="diplomacy-empty">No kingdoms are at war.</p>}</div>
    <h3>Alliances</h3><div className="diplomacy-cards">{activeAlliances.length ? activeAlliances.map((alliance) => <article className="alliance-card" key={alliance.id}><strong>{alliance.name}</strong><div>{alliance.memberIds.map((id) => kingdomButton(id))}</div><small>Formed in year {alliance.formedYear}</small></article>) : <p className="diplomacy-empty">No active alliances.</p>}</div>
    <details className="past-diplomacy"><summary>Past wars and alliances ({pastWars.length + formerAlliances.length})</summary>{pastWars.map((war) => <article key={war.id}><strong>{kingdom(war.attackerId)?.name || "Unknown"} vs. {kingdom(war.defenderId)?.name || "Unknown"}</strong><small>Started year {war.startedYear} · Ended year {war.endedYear ?? "unknown"} · {war.outcome || "ended"}</small></article>)}{formerAlliances.map((alliance) => <article key={alliance.id}><strong>{alliance.name}</strong><small>Formed year {alliance.formedYear} · Dissolved year {alliance.endedYear ?? "unknown"}</small></article>)}</details>
    <details className="diplomacy-log"><summary>Diplomatic history ({diplomacy.history.length})</summary><div>{diplomacy.history.map((entry) => <article className={entry.type} key={entry.id}><span>{entry.year}</span><p>{entry.text}</p></article>)}</div></details>
  </section>;
}

function Dossier({ world, entityRef, onClose, onChange, onInspect, onFollow, followed }) {
  const entity = getEntity(world, entityRef);
  if (!entity) return null;
  const faction = entity.factionId ? world.factions.find((f) => f.id === entity.factionId) : null;
  const city = entity.homeId ? world.cities.find((c) => c.id === entity.homeId) : entity.cityId ? world.cities.find((c) => c.id === entity.cityId) : null;
  const setValue = (key, value) => { entity[key] = value; onChange(); };
  const toggleTrait = (trait) => { const has = entity.traits.includes(trait), bonuses = { Genius: ["intelligence", 20], Strong: ["strength", 20], Fast: ["speed", 20], Lucky: ["luck", 20] }; entity.traits = has ? entity.traits.filter((item) => item !== trait) : [...entity.traits, trait]; if (bonuses[trait]) { const [key, amount] = bonuses[trait]; entity[key] = clamp(entity[key] + (has ? -amount : amount), 0, 150); } if (trait === "Immortal") entity.immortal = !has; if (trait === "Regeneration") entity.regeneration = !has; if (trait === "Giant") entity.isGiant = !has; onChange(); };
  const rename = () => { const current = entity.name || entity.customName || title, next = prompt("Rename this:", current)?.trim(); if (!next) return; if (entityRef.type === "tile") entity.customName = next.slice(0, 40); else entity.name = next.slice(0, 40); onChange(); };
  const toggleAnimalTrait = (trait) => { entity.traits ||= []; entity.traits = entity.traits.includes(trait) ? entity.traits.filter((item) => item !== trait) : [...entity.traits, trait]; onChange(); };

  let title = "World Object", eyebrow = entityRef.type, content = null;
  if (entityRef.type === "person") {
    title = entity.name; eyebrow = `${ROLE_INFO[entity.role]?.name || entity.role} · ${faction?.name || "No kingdom"}`;
    const personLinks = (ids, emptyText) => ids?.length ? <span className="relationship-people">{ids.map((id) => { const person = world.people.find((item) => item.id === id); return person ? <button key={id} onClick={() => onFollow({ type: "person", id })} title={`Follow ${person.name}`}>{icon("Crosshair", 10)} {person.name}</button> : <em key={id}>Unknown</em>; })}</span> : <span className="relationship-empty">{emptyText}</span>;
    const statuses = personStatuses(world, entity);
    content = <>
      <div className="identity-strip"><span>{icon(entity.role === "ruler" ? "Crown" : entity.role === "guard" ? "Shield" : entity.role === "scholar" ? "BookOpen" : entity.role === "miner" ? "Pickaxe" : "User", 25)}</span><div><strong>{Math.floor(entity.ageYears)} years old</strong><small>{city?.name || "No home"} · {entity.sick ? "Sick" : "Healthy"}</small></div></div>
      <div className="dossier-meters"><Meter label="Health" value={entity.health} max={entity.maxHealth} color="#e88164" /><Meter label="Hunger" value={entity.hunger} color="#e4bd65" /><Meter label="Mood" value={entity.mood} color="#72cba3" /></div>
      <h3>Editable abilities</h3>
      <div className="dossier-stats">
        <StatBar label="Intelligence" value={entity.intelligence} color="#73c7e3" editable onChange={(v) => setValue("intelligence", v)} />
        <StatBar label="Magic" value={entity.magic} color="#b48be0" editable onChange={(v) => setValue("magic", v)} />
        <StatBar label="Strength" value={entity.strength} color="#e47d61" editable onChange={(v) => setValue("strength", v)} />
        <StatBar label="Speed" value={entity.speed} color="#80d3aa" editable onChange={(v) => setValue("speed", v)} />
        <StatBar label="Luck" value={entity.luck} color="#e7cb69" editable onChange={(v) => setValue("luck", v)} />
      </div>
      <h3>Personal laws</h3><ScopedLaws world={world} entity={entity} onChange={onChange} />
      <div className="fact-grid"><div><span>Gender</span><strong>{entity.gender}</strong></div><div><span>Experience</span><strong>{Math.floor(entity.experience)}</strong></div><div><span>Kills</span><strong>{entity.kills}</strong></div><div><span>Job</span><strong>{ROLE_INFO[entity.role]?.name}</strong></div><div><span>Expression</span><strong>{entity.expression || "Neutral"}</strong></div><div className="status-cell"><span>Status</span><strong>{statuses.map((status) => <em key={status}>{status}</em>)}</strong></div><div><span>Born</span><strong>Year {Math.max(0, Math.floor(world.year - entity.ageYears))}</strong></div><div><span>Divine state</span><strong>{world.possessedId === entity.id ? "Possessed" : entity.immortal ? "Immortal" : "Mortal"}</strong></div></div>
      <h3>Traits — click to add or remove</h3><div className="trait-controls">{[...TRAIT_OPTIONS, "Immortal", "Regeneration", "Giant"].map((trait) => <button key={trait} className={entity.traits.includes(trait) ? "active" : ""} onClick={() => toggleTrait(trait)}>{entity.traits.includes(trait) ? "✓ " : "+ "}{trait}</button>)}</div>
      <div className="tag-list">{entity.traits.map((trait) => <span key={trait}>{trait}</span>)}</div>
      <h3>Equipment — always visible</h3><EquipmentPanel equipment={entity.equipment} />
      <h3>Inventory</h3><div className="fact-grid compact"><div><span>Food</span><strong>{Math.floor(entity.inventory.food)}</strong></div><div><span>Wood</span><strong>{Math.floor(entity.inventory.wood)}</strong></div><div><span>Stone</span><strong>{Math.floor(entity.inventory.stone)}</strong></div><div><span>Coins</span><strong>{Math.floor(entity.inventory.coin)}</strong></div></div>
      <h3>Family and relationships</h3>
      <div className="relationship-list"><p className="lovers"><span>Lovers</span>{personLinks(entity.loverIds, "None")}</p><p><span>Parents</span>{personLinks(entity.parents, "None recorded")}</p><p><span>Children</span>{personLinks(entity.children, "None")}</p><p><span>Friends</span>{personLinks(entity.friendIds, "None recorded")}</p><p><span>Enemies</span>{personLinks(entity.enemyIds, "None")}</p></div>
      <h3>Life history</h3><ol className="history-list">{entity.history.slice(0, 8).map((item, i) => <li key={`${item}-${i}`}>{item}</li>)}</ol>
    </>;
  } else if (entityRef.type === "faction") {
    title = entity.name; eyebrow = `${FACTION_TYPES[entity.type]?.name || "Kingdom"} · Kingdom`;
    const cities = world.cities.filter((c) => c.factionId === entity.id), people = world.people.filter((p) => p.factionId === entity.id), leader = world.people.find((p) => p.id === entity.leaderId);
    content = <><div className="identity-strip"><span>{icon("Crown", 25)}</span><div><strong>{leader ? <button className="person-inline-link" onClick={() => onFollow({ type: "person", id: leader.id })} title={`Follow ${leader.name}`}>{icon("Crosshair", 10)} {leader.name}</button> : "No ruler"}</strong><small>{FACTION_TYPES[entity.type]?.gift || "No special ability"} · Founded year {entity.founded}</small></div></div><h3>Editable kingdom abilities</h3><div className="dossier-stats"><StatBar label="Intelligence" value={entity.intelligence} color="#73c7e3" editable onChange={(v) => setValue("intelligence", v)} /><StatBar label="Magic" value={entity.magic} color="#b48be0" editable onChange={(v) => setValue("magic", v)} /><StatBar label="Technology" value={entity.technology} color="#e4ad64" editable onChange={(v) => setValue("technology", v)} /><StatBar label="Culture" value={entity.culture} color="#7fcf9f" editable onChange={(v) => setValue("culture", v)} /></div><h3>Kingdom laws</h3><ScopedLaws world={world} entity={entity} onChange={onChange} /><div className="fact-grid"><div><span>Population</span><strong>{people.length}</strong></div><div><span>Cities</span><strong>{cities.length}</strong></div><div><span>Treasury</span><strong>{Math.floor(entity.treasury)}</strong></div><div><span>Ruler</span><strong>{leader ? <button className="person-inline-link" onClick={() => onFollow({ type: "person", id: leader.id })}>{leader.name}</button> : "None"}</strong></div><div><span>Guns</span><strong>{entity.arsenal?.guns || 0}</strong></div><div><span>Vehicles</span><strong>{Object.entries(entity.arsenal || {}).filter(([key]) => key !== "guns").reduce((sum, [, count]) => sum + count, 0)}</strong></div></div><h3>Diplomacy and war</h3><div className="diplomacy-list">{world.factions.filter((f) => f.id !== entity.id).map((other) => { const relation = entity.relations[other.id] || 0, atWar = relation < -35; return <div key={other.id}><span><strong>{other.name}</strong><small>{Math.round(relation)} · {atWar ? "At war" : relation > 40 ? "Alliance" : "Neutral"}</small></span><button className={atWar ? "peace" : "war"} onClick={() => { atWar ? makePeace(world, entity.id, other.id) : declareWar(world, entity.id, other.id); onChange(); }}>{atWar ? "Make Peace" : "Declare War"}</button></div>; })}</div><h3>Cities</h3><div className="entity-links">{cities.map((c) => <button key={c.id} onClick={() => onInspect({ type: "city", id: c.id })}>{c.name} · Tier {c.level}</button>)}</div></>;
  } else if (entityRef.type === "city") {
    const residents = world.people.filter((p) => p.homeId === entity.id), buildings = world.buildings.filter((b) => b.cityId === entity.id);
    title = entity.name; eyebrow = `${faction?.name || "Independent"} · City`;
    content = <><div className="identity-strip"><span>{icon("Castle", 25)}</span><div><strong>Tier {entity.level} settlement</strong><small>Founded in year {entity.founded}</small></div></div><div className="fact-grid"><div><span>Population</span><strong>{residents.length}</strong></div><div><span>Buildings</span><strong>{buildings.length}</strong></div><div><span>Defense</span><strong>{Math.round(entity.wall * 100)}</strong></div><div><span>Age</span><strong>{world.year - entity.founded} yr</strong></div></div><h3>Resources</h3><div className="fact-grid compact"><div><span>Food</span><strong>{Math.floor(entity.food)}</strong></div><div><span>Wood</span><strong>{Math.floor(entity.wood)}</strong></div><div><span>Stone</span><strong>{Math.floor(entity.stone)}</strong></div><div><span>Ore</span><strong>{Math.floor(entity.ore)}</strong></div></div><h3>Residents by job</h3><div className="tag-list">{Object.keys(ROLE_INFO).map((role) => { const count = residents.filter((p) => p.role === role).length; return count ? <span key={role}>{ROLE_INFO[role].name}: {count}</span> : null; })}</div><h3>Buildings</h3><div className="entity-links">{buildings.map((b) => <button key={b.id} onClick={() => onInspect({ type: "building", id: b.id })}>{buildingName(b.type)} · Lv {b.level}</button>)}</div></>;
  } else if (entityRef.type === "building") {
    title = entity.name || buildingName(entity.type); eyebrow = `${city?.name || "Unclaimed"} · Building`;
    content = <><div className="identity-strip"><span>{icon(entity.type === "farm" ? "Wheat" : entity.type === "mine" ? "Pickaxe" : entity.type === "academy" ? "BookOpen" : entity.type === "tower" ? "Shield" : "House", 25)}</span><div><strong>Level {entity.level}</strong><small>Built in year {entity.builtYear}</small></div></div><Meter label="Condition" value={entity.health} color="#75c89c" /><div className="fact-grid"><div><span>Production</span><strong>{entity.production.toFixed(1)}</strong></div><div><span>Workers</span><strong>{entity.workers.length}</strong></div><div><span>Position</span><strong>{entity.x}, {entity.y}</strong></div><div><span>Owner</span><strong>{faction?.name || "None"}</strong></div></div></>;
  } else if (entityRef.type === "creature") {
    title = entity.name; eyebrow = "Wild creature";
    content = <><div className="identity-strip"><span>{icon(entity.type === "fish" ? "Fish" : entity.type === "wolf" ? "Dog" : entity.type === "bear" ? "PawPrint" : entity.type === "moth" ? "Bird" : entity.type === "raider" ? "Rocket" : "Rabbit", 25)}</span><div><strong>{CREATURE_TYPES[entity.type]?.predator || entity.type === "raider" ? "Predator" : "Wild animal"}</strong><small>Age {Math.floor(entity.age / YEAR_TICKS)} · {world.possessedId === entity.id ? "Possessed" : "Wild"}</small></div></div><Meter label="Health" value={entity.health} max={entity.maxHealth || CREATURE_TYPES[entity.type]?.health || 110} color="#e4856a" /><div className="fact-grid"><div><span>Species</span><strong>{CREATURE_TYPES[entity.type]?.name || entity.type}</strong></div><div><span>Position</span><strong>{entity.x}, {entity.y}</strong></div></div><h3>Animal traits — click to add or remove</h3><div className="trait-controls">{ANIMAL_TRAITS.map((trait) => <button key={trait} className={entity.traits?.includes(trait) ? "active" : ""} onClick={() => toggleAnimalTrait(trait)}>{entity.traits?.includes(trait) ? "✓ " : "+ "}{trait}</button>)}</div><div className="tag-list">{entity.traits?.map((trait) => <span key={trait}>{trait}</span>)}</div></>;
  } else if (entityRef.type === "vehicle") {
    const data = VEHICLE_TYPES[entity.type]; title = entity.name; eyebrow = `${faction?.name || "Unclaimed"} · Vehicle`;
    content = <><div className="identity-strip"><span>{icon(entity.type === "plane" ? "Plane" : ["boat", "warship", "carrier"].includes(entity.type) ? "Ship" : "Truck", 25)}</span><div><strong>{data?.name}</strong><small>Under {faction?.name || "independent command"}</small></div></div><Meter label="Condition" value={entity.health} max={data?.health || 100} color="#7dbbd0" /><div className="fact-grid"><div><span>Damage</span><strong>{data?.damage || 0}</strong></div><div><span>Attack range</span><strong>{data?.range || 0} tiles</strong></div><div><span>Position</span><strong>{entity.x}, {entity.y}</strong></div><div><span>Combat role</span><strong>{entity.type === "carrier" ? "Carrier air strikes" : data?.habitat === "water" ? "Sea + coastal" : "Land + sea"}</strong></div></div><h3>Vehicle assignment</h3><label className="vehicle-assignment"><span><strong>Commanded by</strong><small>Change which kingdom owns this vehicle.</small></span><select value={entity.factionId || "independent"} onChange={(event) => { assignVehicle(world, entity.id, event.target.value === "independent" ? null : event.target.value); onChange(); }}><option value="independent">Independent</option>{world.factions.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label></>;
  } else if (entityRef.type === "tile") {
    title = entity.customName || TERRAIN[entity.type]?.name || entity.type; eyebrow = `Terrain · ${entityRef.x}, ${entityRef.y}`;
    const owner = world.factions.find((f) => f.id === entity.owner);
    content = <><div className="identity-strip"><span>{icon(entity.type === "water" ? "Waves" : entity.type === "ridge" ? "Mountain" : entity.type === "forest" ? "Trees" : "Map", 25)}</span><div><strong>{owner?.name || "Unclaimed land"}</strong><small>{entity.barrier ? "Impassable barrier" : entity.fire > 0 ? "Burning" : entity.plague > .2 ? "Plague contamination" : "Stable"}</small></div></div><div className="dossier-stats"><StatBar label="Fertility" value={entity.fertility * 100} /><StatBar label="Moisture" value={entity.moisture * 100} /><StatBar label="Barrier" value={entity.barrier * 100} color="#b8c0c2" /><StatBar label="Fire" value={entity.fire * 100} color="#e56845" /><StatBar label="Plague" value={entity.plague * 100} color="#7fa64d" /><StatBar label="Frost" value={entity.frost * 100} color="#8bcad3" /></div></>;
  }

  const trackable = entityRef.type === "faction" || Number.isFinite(entity.x) && Number.isFinite(entity.y);
  const renameLabel = entityRef.type === "faction" ? "Rename kingdom" : entityRef.type === "city" ? "Rename village" : "Rename";
  return <aside className="dossier" aria-label={`${title} dossier`}><header><div><span>{eyebrow}</span><h2>{title}</h2></div><div className="dossier-actions"><button className="rename-action" onClick={rename} title={renameLabel} aria-label={renameLabel}>{icon("Pencil", 13)}<span>{renameLabel}</span></button>{["person", "creature"].includes(entityRef.type) && <button className={world.possessedId === entity.id ? "active" : ""} onClick={() => { world.possessedId = world.possessedId === entity.id ? null : entity.id; onChange(); }} title="Possess with WASD">{icon("Gamepad2", 13)}</button>}{entityRef.type === "person" && <button className={entity.favorite ? "active" : ""} onClick={() => { entity.favorite = !entity.favorite; onChange(); }} title="Favorite">{icon("Star", 13)}</button>}{trackable && <button className={followed ? "active" : ""} onClick={() => onFollow(entityRef)} title="Follow">{icon("Crosshair", 13)}</button>}<button onClick={onClose} aria-label="Close dossier">×</button></div></header><div className="dossier-scroll">{content}</div></aside>;
}

function WorldForge() {
  const bootResume = useMemo(readUpdateResume, []);
  const canvasRef = useRef(null), frameRef = useRef(0), pointerRef = useRef({ down: false, last: "" }), panRef = useRef(null), panelResizeRef = useRef(false), menuAfterSaveRef = useRef(false), keysRef = useRef(new Set()), installPromptRef = useRef(null), followedRef = useRef(null);
  const worldRef = useRef(bootResume?.world || createWorld(28)), cameraRef = useRef(bootResume?.camera || { x: COLS / 2, y: ROWS / 2, zoom: 1.8 });
  const [screen, setScreen] = useState(bootResume ? "game" : "menu"), [scenario, setScenario] = useState("balanced"), [mapType, setMapType] = useState(bootResume?.world?.mapType || "pangaea"), [activeGroup, setActiveGroup] = useState("Observe"), [selectedTool, setSelectedTool] = useState("inspect"), [brush, setBrush] = useState(2);
  const [paused, setPaused] = useState(false), [speed, setSpeed] = useState(1), [revision, setRevision] = useState(0), [hovered, setHovered] = useState(null), [inspected, setInspected] = useState(null), [followed, setFollowed] = useState(null), [cameraUi, setCameraUi] = useState(cameraRef.current);
  const [slots, setSlots] = useState(readSlots), [currentSlot, setCurrentSlot] = useState(null), [saveOpen, setSaveOpen] = useState(false), [menuConfirmOpen, setMenuConfirmOpen] = useState(false), [installOpen, setInstallOpen] = useState(false), [installReady, setInstallReady] = useState(false), [updating, setUpdating] = useState(false);
  const [lawOpen, setLawOpen] = useState(false), [kingdomId, setKingdomId] = useState(null), [panelWidth, setPanelWidth] = useState(readPanelWidth);
  const world = worldRef.current, stats = useMemo(() => worldStats(worldRef.current), [revision]), selected = TOOLS.find((t) => t.id === selectedTool), seasons = ["Spring", "Summer", "Autumn", "Winter"];
  useEffect(() => { localStorage.setItem(PANEL_WIDTH_KEY, String(panelWidth)); }, [panelWidth]);
  useEffect(() => {
    if (!import.meta.hot) return undefined;
    let readyTimer = null; const before = () => setUpdating(true), after = () => { clearTimeout(readyTimer); readyTimer = setTimeout(() => setUpdating(false), 350); }, failed = () => setUpdating(true);
    import.meta.hot.on("vite:beforeUpdate", before); import.meta.hot.on("vite:afterUpdate", after); import.meta.hot.on("vite:error", failed);
    return () => { clearTimeout(readyTimer); import.meta.hot.off("vite:beforeUpdate", before); import.meta.hot.off("vite:afterUpdate", after); import.meta.hot.off("vite:error", failed); };
  }, []);

  const moveCamera = useCallback((next) => {
    const rect = canvasRef.current?.getBoundingClientRect(), zoom = clamp(next.zoom, .28, 7);
    let x = next.x, y = next.y;
    if (rect?.width && rect?.height) {
      const tile = Math.min(rect.width / COLS, rect.height / ROWS) * zoom, halfX = rect.width / tile / 2, halfY = rect.height / tile / 2;
      const marginX = Math.max(COLS * .25, halfX - COLS / 2 + COLS * .2), marginY = Math.max(ROWS * .25, halfY - ROWS / 2 + ROWS * .2);
      x = clamp(x, -marginX, COLS + marginX); y = clamp(y, -marginY, ROWS + marginY);
    } else { x = clamp(x, -COLS, COLS * 2); y = clamp(y, -ROWS, ROWS * 2); }
    const camera = { x, y, zoom }; cameraRef.current = camera; setCameraUi(camera);
  }, []);

  const draw = useCallback(() => drawWorld(canvasRef.current, worldRef.current, hovered, brush, inspected, cameraRef.current, selectedTool), [hovered, brush, inspected, selectedTool]);
  useEffect(() => {
    let last = performance.now(), acc = 0;
    const animate = (now) => { const delta = Math.min(80, now - last); last = now; if (!paused && screen === "game") { acc += delta * speed; while (acc >= 220) { simulateWorld(worldRef.current); acc -= 220; } } const ref = followedRef.current; if (ref) { let target = getEntity(worldRef.current, ref); if (ref.type === "faction") target = worldRef.current.people.find((person) => person.id === target?.leaderId) || worldRef.current.cities.find((city) => city.factionId === ref.id); if (Number.isFinite(target?.x) && Number.isFinite(target?.y)) cameraRef.current = { ...cameraRef.current, x: target.x + .5, y: target.y + .5 }; } draw(); frameRef.current = requestAnimationFrame(animate); };
    frameRef.current = requestAnimationFrame(animate); const timer = setInterval(() => { setCameraUi({ ...cameraRef.current }); setRevision((r) => r + 1); }, 420);
    return () => { cancelAnimationFrame(frameRef.current); clearInterval(timer); };
  }, [draw, paused, speed, screen]);
  useEffect(() => { const resize = () => { moveCamera(cameraRef.current); draw(); }; addEventListener("resize", resize); return () => removeEventListener("resize", resize); }, [draw, moveCamera]);
  useEffect(() => {
    const ready = (e) => { e.preventDefault(); installPromptRef.current = e; setInstallReady(true); }, installed = () => { installPromptRef.current = null; setInstallReady(false); setInstallOpen(true); };
    addEventListener("beforeinstallprompt", ready); addEventListener("appinstalled", installed); return () => { removeEventListener("beforeinstallprompt", ready); removeEventListener("appinstalled", installed); };
  }, []);
  useEffect(() => {
    if (screen !== "game") return undefined;
    const controlled = new Set(["w", "a", "s", "d", "arrowup", "arrowdown", "arrowleft", "arrowright", " "]);
    const down = (e) => { if (["INPUT", "SELECT", "TEXTAREA"].includes(e.target.tagName)) return; const key = e.key.toLowerCase(); if (key === "escape" && worldRef.current.possessedId) { worldRef.current.possessedId = null; setRevision((r) => r + 1); return; } if (controlled.has(key)) { keysRef.current.add(key); e.preventDefault(); } };
    const up = (e) => keysRef.current.delete(e.key.toLowerCase());
    addEventListener("keydown", down); addEventListener("keyup", up);
    let possessionRepeat = 0;
    const timer = setInterval(() => { const keys = keysRef.current; let dx = 0, dy = 0; if (keys.has("a") || keys.has("arrowleft")) dx -= 1; if (keys.has("d") || keys.has("arrowright")) dx += 1; if (keys.has("w") || keys.has("arrowup")) dy -= 1; if (keys.has("s") || keys.has("arrowdown")) dy += 1; if (dx || dy) { if (worldRef.current.possessedId) { possessionRepeat += 1; if (possessionRepeat % 4 === 0) { const person = controlPossessed(worldRef.current, dx, dy); if (person) { moveCamera({ ...cameraRef.current, x: person.x, y: person.y, zoom: Math.max(2.25, cameraRef.current.zoom) }); setRevision((r) => r + 1); } } } else moveCamera({ ...cameraRef.current, x: cameraRef.current.x + dx * .42 / cameraRef.current.zoom, y: cameraRef.current.y + dy * .42 / cameraRef.current.zoom }); } else possessionRepeat = 0; }, 24);
    return () => { removeEventListener("keydown", down); removeEventListener("keyup", up); clearInterval(timer); keysRef.current.clear(); };
  }, [screen, moveCamera]);

  const point = (event) => { const rect = canvasRef.current.getBoundingClientRect(), base = Math.min(rect.width / COLS, rect.height / ROWS), tile = base * cameraRef.current.zoom, x = Math.floor(cameraRef.current.x + (event.clientX - rect.left - rect.width / 2) / tile), y = Math.floor(cameraRef.current.y + (event.clientY - rect.top - rect.height / 2) / tile); return x < 0 || y < 0 || x >= COLS || y >= ROWS ? null : { x, y }; };
  const act = (event, force = false) => { const pos = point(event); setHovered(pos); if (!pos) return; const key = `${pos.x}:${pos.y}`; if (!force && pointerRef.current.last === key) return; pointerRef.current.last = key; if (selectedTool === "inspect") setInspected(entityAt(worldRef.current, pos.x, pos.y)); else { applyTool(worldRef.current, selectedTool, pos.x, pos.y, brush); if (selectedTool === "possess") setInspected(null); } setRevision((r) => r + 1); };
  const zoomAt = (factor, clientX = null, clientY = null) => { const rect = canvasRef.current?.getBoundingClientRect(); if (!rect) return; const old = cameraRef.current, nextZoom = clamp(old.zoom * factor, .28, 7), base = Math.min(rect.width / COLS, rect.height / ROWS), px = clientX ?? rect.left + rect.width / 2, py = clientY ?? rect.top + rect.height / 2, worldX = old.x + (px - rect.left - rect.width / 2) / (base * old.zoom), worldY = old.y + (py - rect.top - rect.height / 2) / (base * old.zoom); moveCamera({ zoom: nextZoom, x: worldX - (px - rect.left - rect.width / 2) / (base * nextZoom), y: worldY - (py - rect.top - rect.height / 2) / (base * nextZoom) }); };
  const startWorld = () => {
    const next = createWorld(Math.random() * 999, scenario, mapType);
    worldRef.current = next; followedRef.current = null; setFollowed(null); moveCamera({ x: COLS / 2, y: ROWS / 2, zoom: 1.8 }); setScreen("game"); setSelectedTool("inspect"); setInspected(null); setPaused(false); setCurrentSlot(null); setKingdomId(null); setRevision((r) => r + 1);
  };
  const saveTo = (index) => { const snapshot = JSON.parse(JSON.stringify(worldRef.current)), next = [...slots], summary = worldStats(snapshot); next[index] = { savedAt: Date.now(), title: `World — Year ${snapshot.year}`, year: snapshot.year, scenario: snapshot.scenario, mapType: snapshot.mapType, population: summary.population, kingdoms: summary.kingdoms, world: snapshot }; localStorage.setItem(SAVE_KEY, JSON.stringify(next)); setSlots(next); setCurrentSlot(index); setSaveOpen(false); if (menuAfterSaveRef.current) { menuAfterSaveRef.current = false; setScreen("menu"); } };
  const loadFrom = (index) => { if (!slots[index]?.world) return; const next = normalizeWorld(JSON.parse(JSON.stringify(slots[index].world))); worldRef.current = next; followedRef.current = null; setFollowed(null); setMapType(next.mapType || "pangaea"); moveCamera({ x: COLS / 2, y: ROWS / 2, zoom: 1.8 }); setScreen("game"); setCurrentSlot(index); setInspected(null); setPaused(false); setKingdomId(null); setRevision((r) => r + 1); };
  const deleteSlot = (index) => { if (!confirm(`Delete World Slot ${index + 1}?`)) return; const next = [...slots]; next[index] = null; localStorage.setItem(SAVE_KEY, JSON.stringify(next)); setSlots(next); };
  const quickSave = () => { const target = currentSlot ?? slots.findIndex((s) => !s); target >= 0 ? saveTo(target) : setSaveOpen(true); };
  const saveAndReturnToMenu = () => { setMenuConfirmOpen(false); const target = currentSlot ?? slots.findIndex((slot) => !slot); menuAfterSaveRef.current = true; if (target >= 0) saveTo(target); else setSaveOpen(true); };
  const requestInstall = async () => { if (installPromptRef.current) { installPromptRef.current.prompt(); const result = await installPromptRef.current.userChoice; if (result.outcome === "accepted") { installPromptRef.current = null; setInstallReady(false); return; } } setInstallOpen(true); };
  const refreshGame = async () => {
    if (updating) return; setUpdating(true);
    try {
      if (screen === "game") sessionStorage.setItem(UPDATE_RESUME_KEY, JSON.stringify({ world: worldRef.current, camera: cameraRef.current }));
      if ("caches" in window) { const names = await caches.keys(); await Promise.all(names.filter((name) => name.startsWith("world-forge-")).map((name) => caches.delete(name))); }
      const registrations = await navigator.serviceWorker?.getRegistrations?.() || [], controllerChanged = new Promise((resolve) => navigator.serviceWorker?.addEventListener("controllerchange", resolve, { once: true })); let activating = false;
      for (const registration of registrations) { await registration.update(); const worker = registration.waiting || registration.installing; if (worker) { activating = true; worker.postMessage({ type: "SKIP_WAITING" }); } }
      if (activating) await Promise.race([controllerChanged, new Promise((resolve) => setTimeout(resolve, 4000))]);
    } catch { /* A reload still refreshes the local build when cache APIs are unavailable. */ }
    const next = new URL(location.href); next.searchParams.set("update", Date.now()); location.replace(next.href);
  };
  const toggleLaw = (key) => { worldRef.current.laws[key] = !worldRef.current.laws[key]; setRevision((r) => r + 1); };
  const updateFaction = (faction, key, value) => { faction[key] = Number(value); setRevision((r) => r + 1); };
  const toggleFollow = (ref) => { const same = followedRef.current?.type === ref.type && followedRef.current?.id === ref.id && followedRef.current?.x === ref.x && followedRef.current?.y === ref.y; const next = same ? null : { ...ref }; followedRef.current = next; setFollowed(next); if (next) moveCamera({ ...cameraRef.current, zoom: Math.max(2.1, cameraRef.current.zoom) }); };
  const latest = slots.map((slot, index) => ({ slot, index })).filter(({ slot }) => slot).sort((a, b) => b.slot.savedAt - a.slot.savedAt)[0];

  if (screen === "menu") return <main className="wf-menu"><div className="wf-grid" /><section className="wf-menu-card">
    <div className="wf-title"><span>{icon("Globe2", 34)}</span><small>PIXEL WORLD SIMULATOR</small><h1>World Forge</h1><p>Create kingdoms, inspect individual people, control world laws, and watch civilizations grow by themselves.</p></div>
    <section className="map-picker"><header><strong>Choose a world map</strong><small>Or begin with a blank ocean</small></header><div className="map-grid">{Object.entries(MAPS).map(([id, item]) => <button key={id} className={mapType === id ? "active" : ""} onClick={() => setMapType(id)}><MapPreview type={id} /><span><strong>{item.name}</strong><small>{item.text}</small></span></button>)}</div></section>
    <div className="scenario-picker"><label htmlFor="scenario">World mode</label><select id="scenario" value={scenario} onChange={(e) => setScenario(e.target.value)}><option value="balanced">Normal World</option><option value="coming-soon" disabled>More experiments — coming soon</option></select><p>{SCENARIOS.balanced.text}</p></div>
    <div className="wf-menu-actions"><button className="wf-primary" onClick={startWorld}>{icon("Plus", 18)} Create {MAPS[mapType].name}</button>{latest && <button onClick={() => loadFrom(latest.index)}>{icon("Play", 17)} Continue Slot {latest.index + 1}</button>}<button onClick={refreshGame} disabled={updating}>{icon("RefreshCw", 17)} {updating ? "Updating…" : "Reload Update"}</button><button onClick={requestInstall}>{icon("Download", 17)} {installReady ? "Install World Forge" : "Install Game"}</button></div>
    <section className="wf-saves"><header><div><strong>World Saves</strong><small>Stored on this device</small></div><b>{slots.filter(Boolean).length}/{SAVE_COUNT}</b></header>{slots.map((slot, i) => <article key={i} className={slot ? "filled" : ""}><span>{String(i + 1).padStart(2, "0")}</span><div><strong>{slot?.title || "Empty Slot"}</strong><small>{slot ? `${slot.kingdoms} kingdoms · ${slot.population} people · ${MAPS[slot.mapType]?.name || "Classic Map"}` : "Save a world here"}</small></div>{slot && <><button onClick={() => loadFrom(i)}>Load</button><button onClick={() => deleteSlot(i)} aria-label={`Delete slot ${i + 1}`}>{icon("Trash2", 14)}</button></>}</article>)}</section>
    <footer><span>v0.14 · Living Pixel Worlds</span><span>Local · Offline · No account</span></footer>
  </section>{installOpen && <div className="modal-backdrop" onMouseDown={() => setInstallOpen(false)}><section className="modal-card install-card" onMouseDown={(e) => e.stopPropagation()}><span className="modal-icon">{icon("Download", 24)}</span><h2>Install World Forge</h2><p>Open this local game in Chrome or Edge, open the browser menu, and choose “Install World Forge” or “Apps → Install this site as an app.”</p><small>World saves stay on this device. The installed game works offline after its first load.</small><button className="wf-primary" onClick={() => setInstallOpen(false)}>Done</button></section></div>}{updating && <UpdateScreen />}</main>;

  const selectedKingdom = world.factions.find((f) => f.id === (kingdomId || world.factions[0]?.id));
  const possessed = world.people.find((person) => person.id === world.possessedId) || world.creatures.find((creature) => creature.id === world.possessedId);
  const dragTools = TERRAIN[selectedTool] || ["fire", "frost", "plague", "barrier", "erasebarrier", "erase"].includes(selectedTool), squareBrush = Boolean(TERRAIN[selectedTool]) || ["barrier", "erasebarrier", "erase"].includes(selectedTool);
  return <main className="wf-app">
    <header className="wf-top"><div className="wf-brand"><span>{icon("Globe2", 20)}</span><div><h1>World Forge</h1><small>Year {world.year} · {seasons[world.season]} · {world.weather.type}</small></div></div><div className="wf-summary"><span>People <b>{stats.population}</b></span><span>Kingdoms <b>{stats.kingdoms}</b></span><span>Wars <b>{stats.wars}</b></span></div><div className="wf-actions"><button onClick={quickSave}>{icon("Save", 15)} Save</button><button onClick={() => setSaveOpen(true)}>{icon("Archive", 15)} Slots</button><button onClick={refreshGame} disabled={updating}>{icon("RefreshCw", 15)} {updating ? "Updating…" : "Update"}</button><button onClick={() => setLawOpen((v) => !v)}>{icon("SlidersHorizontal", 15)} Laws</button><button onClick={() => setMenuConfirmOpen(true)}>{icon("Menu", 15)} Menu</button></div></header>
    <section className="wf-workspace" style={{ "--info-width": `${panelWidth}px` }}>
      <section className="wf-stage">
        <canvas ref={canvasRef} onContextMenu={(e) => e.preventDefault()} onWheel={(e) => { e.preventDefault(); zoomAt(e.deltaY < 0 ? 1.18 : .85, e.clientX, e.clientY); }} onPointerDown={(e) => { e.currentTarget.setPointerCapture(e.pointerId); if (e.button === 1 || e.button === 2 || keysRef.current.has(" ")) { panRef.current = { x: e.clientX, y: e.clientY, camera: { ...cameraRef.current } }; return; } pointerRef.current.down = true; pointerRef.current.last = ""; act(e, true); }} onPointerMove={(e) => { if (panRef.current) { const rect = e.currentTarget.getBoundingClientRect(), tile = Math.min(rect.width / COLS, rect.height / ROWS) * panRef.current.camera.zoom; moveCamera({ ...panRef.current.camera, x: panRef.current.camera.x - (e.clientX - panRef.current.x) / tile, y: panRef.current.camera.y - (e.clientY - panRef.current.y) / tile }); return; } setHovered(point(e)); if (pointerRef.current.down && dragTools) act(e); }} onPointerUp={() => { pointerRef.current.down = false; pointerRef.current.last = ""; panRef.current = null; }} onPointerLeave={() => { pointerRef.current.down = false; panRef.current = null; setHovered(null); }} />
        <div className="wf-selected">{icon(selected?.icon || "Circle", 15)}<strong>{selected?.label}</strong><span>{selected?.hint}</span></div>
        <WorldMinimap world={world} camera={cameraUi} revision={revision} onNavigate={(x, y) => moveCamera({ ...cameraRef.current, x, y })} />
        <div className="wf-camera"><button onClick={() => zoomAt(.8)} aria-label="Zoom out">−</button><span>{Math.round(cameraUi.zoom * 100)}%</span><button onClick={() => zoomAt(1.25)} aria-label="Zoom in">+</button><small>Wheel · WASD · right-drag</small></div>
        {followed && <div className="wf-following"><span>{icon("Crosshair", 16)}</span><div><strong>Following {getEntity(world, followed)?.name || "kingdom leader"}</strong><small>The camera stays centered as they move.</small></div><button onClick={() => toggleFollow(followed)}>Stop</button></div>}
        {possessed && <div className="wf-possession"><span>{icon("Gamepad2", 17)}</span><div><strong>Controlling {possessed.name}</strong><small>Move with WASD or arrows · Esc to release</small></div><button onClick={() => { worldRef.current.possessedId = null; setRevision((r) => r + 1); }}>Release</button></div>}
        <div className="wf-time"><button onClick={() => setPaused((v) => !v)}>{icon(paused ? "Play" : "Pause", 18)}</button>{[1,2,4,8].map((v) => <button key={v} className={speed === v ? "active" : ""} onClick={() => { setSpeed(v); setPaused(false); }}>{v}×</button>)}<span>{paused ? "Paused" : "Running"}</span></div>
        <section className="wf-power-dock"><nav>{TOOL_GROUPS.map((group) => <button key={group} className={activeGroup === group ? "active" : ""} onClick={() => setActiveGroup(group)}>{icon(GROUP_ICONS[group], 16)}<span>{group}</span></button>)}</nav><div className="wf-dock-row"><div className="wf-dock-tools">{TOOLS.filter((tool) => tool.group === activeGroup).map((tool) => <button key={tool.id} className={selectedTool === tool.id ? "active" : ""} onClick={() => setSelectedTool(tool.id)} title={tool.hint}>{icon(tool.icon, 18)}<span>{tool.label}</span></button>)}</div><label className="wf-dock-brush"><span>{squareBrush ? `Square ${brush}×${brush}` : CREATURE_TYPES[selectedTool] ? `Count ${brush}` : `Target size ${brush}`}</span><input type="range" min="1" max="10" step="1" value={brush} onChange={(e) => setBrush(Number(e.target.value))} /></label></div></section>
        {inspected && <Dossier world={world} entityRef={inspected} onClose={() => setInspected(null)} onChange={() => setRevision((r) => r + 1)} onInspect={setInspected} onFollow={toggleFollow} followed={followed?.type === inspected.type && followed?.id === inspected.id && followed?.x === inspected.x && followed?.y === inspected.y} />}
      </section>
      <div className="panel-resize-handle" role="separator" aria-label="Resize world information panel" aria-orientation="vertical" aria-valuemin="220" aria-valuemax="440" aria-valuenow={panelWidth} aria-valuetext={`${panelWidth} pixels`} tabIndex="0" onPointerDown={(event) => { if (matchMedia("(max-width:780px)").matches) return; event.preventDefault(); panelResizeRef.current = true; event.currentTarget.setPointerCapture?.(event.pointerId); document.body.classList.add("resizing-info-panel"); }} onPointerMove={(event) => { if (!panelResizeRef.current) return; setPanelWidth(clamp(Math.round((window.innerWidth - event.clientX) / 5) * 5, 220, 440)); }} onPointerUp={() => { panelResizeRef.current = false; document.body.classList.remove("resizing-info-panel"); }} onPointerCancel={() => { panelResizeRef.current = false; document.body.classList.remove("resizing-info-panel"); }} onKeyDown={(event) => { if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return; event.preventDefault(); setPanelWidth((width) => event.key === "Home" ? 220 : event.key === "End" ? 440 : clamp(width + (event.key === "ArrowLeft" ? 10 : -10), 220, 440)); }}><span /></div>
      <aside className="wf-info"><header><strong>World Information</strong><small>Drag edge to resize</small></header><section className="wf-harmony"><div><span>World Stability</span><strong>{stats.harmony}%</strong></div><i><em style={{ width: `${stats.harmony}%` }} /></i></section><div className="wf-stat-grid"><div><span>People</span><b>{stats.population}</b></div><div><span>Cities</span><b>{stats.cities}</b></div><div><span>Buildings</span><b>{stats.buildings}</b></div><div><span>Wildlife</span><b>{stats.wildlife}</b></div><div><span>Vehicles</span><b>{stats.vehicles}</b></div><div><span>Wars</span><b>{stats.wars}</b></div></div><section className="wf-kingdom"><h2>Kingdom Control</h2>{world.factions.length ? <><select value={selectedKingdom?.id} onChange={(e) => setKingdomId(e.target.value)}>{world.factions.map((f) => <option value={f.id} key={f.id}>{f.name}</option>)}</select>{selectedKingdom && <div className="realm-controls"><button className="realm-name" onClick={() => setInspected({ type: "faction", id: selectedKingdom.id })}><i style={{ background: selectedKingdom.color }} /><span><strong>{selectedKingdom.name}</strong><small>King: {world.people.find((p) => p.id === selectedKingdom.leaderId)?.name || "No ruler"} · {FACTION_TYPES[selectedKingdom.type]?.gift}</small></span></button><StatBar label="Intelligence" value={selectedKingdom.intelligence} color="#73c7e3" editable onChange={(v) => updateFaction(selectedKingdom, "intelligence", v)} /><StatBar label="Magic" value={selectedKingdom.magic} color="#b48be0" editable onChange={(v) => updateFaction(selectedKingdom, "magic", v)} /><StatBar label="Technology" value={selectedKingdom.technology} color="#e4ad64" editable onChange={(v) => updateFaction(selectedKingdom, "technology", v)} /><StatBar label="Culture" value={selectedKingdom.culture} color="#7fcf9f" editable onChange={(v) => updateFaction(selectedKingdom, "culture", v)} /></div>}</> : <p className="wf-empty">Spawn people and they will found a kingdom, or place one directly with a Kingdom tool.</p>}</section><DiplomacyLedger world={world} onChange={() => setRevision((r) => r + 1)} onInspect={setInspected} /><WorldHistory events={world.events} /></aside>
    </section>
    {lawOpen && <aside className="law-panel"><header><div><span>Simulation Rules</span><h2>World Laws</h2></div><button onClick={() => setLawOpen(false)}>×</button></header>{Object.entries(world.laws).map(([key, value]) => <label key={key}><span><strong>{key.replace(/([A-Z])/g, " $1")}</strong><small>{value ? "Enabled" : "Disabled"}</small></span><input type="checkbox" checked={value} onChange={() => toggleLaw(key)} /></label>)}<label className="claim-time"><span><strong>Territory claim time</strong><small>{world.claimTime} ticks · {(world.claimTime * .22).toFixed(1)} seconds at 1×</small></span><input type="range" min="4" max="96" step="2" value={world.claimTime} onChange={(event) => { world.claimTime = Number(event.target.value); setRevision((r) => r + 1); }} /></label><p className="law-note">A resident must stand on unclaimed land beside its kingdom for this long. The flag and bar show progress.</p></aside>}
    {saveOpen && <div className="modal-backdrop" onMouseDown={() => { menuAfterSaveRef.current = false; setSaveOpen(false); }}><section className="modal-card save-modal" onMouseDown={(e) => e.stopPropagation()}><div className="modal-heading"><div><span>World Saves</span><h2>Choose a slot</h2></div><button onClick={() => { menuAfterSaveRef.current = false; setSaveOpen(false); }}>×</button></div><div className="modal-slots">{slots.map((slot, i) => <button key={i} onClick={() => saveTo(i)}><span>{String(i + 1).padStart(2,"0")}</span><div><strong>{slot?.title || "Empty Slot"}</strong><small>{slot ? `${slot.population} people · ${slot.kingdoms} kingdoms` : "Save this world here"}</small></div>{icon("Save", 15)}</button>)}</div></section></div>}
    {menuConfirmOpen && <div className="modal-backdrop" onMouseDown={() => setMenuConfirmOpen(false)}><section className="modal-card" onMouseDown={(event) => event.stopPropagation()}><span className="modal-icon">{icon("Save", 24)}</span><h2>Save before returning?</h2><p>Your world keeps running until you choose. Saving stores it in the current slot or the next empty slot.</p><div className="menu-confirm-actions"><button onClick={saveAndReturnToMenu}>{icon("Save", 15)} Save & Return to Menu</button><button className="danger" onClick={() => { setMenuConfirmOpen(false); setScreen("menu"); }}>{icon("Menu", 15)} Return Without Saving</button><button onClick={() => setMenuConfirmOpen(false)}>Cancel</button></div></section></div>}
    {updating && <UpdateScreen />}
  </main>;
}

export default WorldForge;
