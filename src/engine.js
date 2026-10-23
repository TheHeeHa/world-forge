export const COLS = 192;
export const ROWS = 144;
export const YEAR_TICKS = 16;
export const PREGNANCY_TICKS = 12;

export const TERRAIN = {
  void: { name: "Void", color: "#05070d", alt: "#080b15", fertility: 0 },
  water: { name: "Water", color: "#245267", alt: "#2d6575", fertility: 0.05 },
  meadow: { name: "Grass", color: "#6f984f", alt: "#82aa5c", fertility: 0.78 },
  forest: { name: "Forest", color: "#2f6643", alt: "#39764c", fertility: 0.92 },
  ridge: { name: "Mountains", color: "#766f68", alt: "#8b837a", fertility: 0.12 },
  sand: { name: "Desert", color: "#c29a58", alt: "#d0aa67", fertility: 0.26 },
  snow: { name: "Snow", color: "#b9d5d3", alt: "#d3e4df", fertility: 0.2 },
  aether: { name: "Enchanted Biome", color: "#725b91", alt: "#896ca4", fertility: 0.86 },
};
export const MAP_DIMENSIONS = {
  earth: [192, 120], pangaea: [156, 108], archipelago: [177, 123], twin: [180, 105], ring: [132, 132], riverlands: [192, 96], empty: [144, 96],
};

export const ROLE_INFO = {
  ruler: { name: "King", color: "#f4d36d", target: "city" },
  farmer: { name: "Farmer", color: "#d6b85f", target: "meadow" },
  woodcutter: { name: "Woodcutter", color: "#7fac63", target: "forest" },
  miner: { name: "Miner", color: "#9aa9ae", target: "ridge" },
  builder: { name: "Builder", color: "#dd945d", target: "city" },
  scholar: { name: "Scholar", color: "#7fc9d4", target: "city" },
  mystic: { name: "Mystic", color: "#bd91e3", target: "aether" },
  healer: { name: "Healer", color: "#a5db9a", target: "forest" },
  guard: { name: "Guard", color: "#df7f67", target: "enemy" },
  scout: { name: "Scout", color: "#8bc19d", target: "frontier" },
  merchant: { name: "Merchant", color: "#e8b875", target: "foreign" },
  child: { name: "Child", color: "#f0d7a2", target: "city" },
  settler: { name: "Settler", color: "#d7d0b5", target: "frontier" },
};

export const FACTION_TYPES = {
  bramble: { name: "Humans", color: "#e8d58a", dark: "#8f7941", preference: ["meadow", "forest"], gift: "Adaptability" },
  cinder: { name: "Dwarves", color: "#ff9862", dark: "#a64f34", preference: ["ridge", "sand"], gift: "Smithing" },
  tide: { name: "Elves", color: "#70d7a4", dark: "#318c67", preference: ["forest", "meadow"], gift: "Long Life" },
  aether: { name: "Orcs", color: "#a7c96c", dark: "#58783c", preference: ["meadow", "ridge"], gift: "Strength" },
};

export const TOOL_GROUPS = ["Observe", "Land", "People", "Kingdoms", "Animals", "Build", "Bestow", "Wonders", "Calamities"];
export const TOOLS = [
  { id: "inspect", group: "Observe", label: "Inspect", hint: "Open a complete dossier", icon: "Eye" },
  { id: "possess", group: "Observe", label: "Possess", hint: "Control a person with WASD", icon: "Gamepad2" },
  ...Object.entries(TERRAIN).filter(([id]) => id !== "void").map(([id, data]) => ({ id, group: "Land", label: data.name, hint: `Paint ${data.name.toLowerCase()}`, icon: id === "water" ? "Waves" : id === "forest" ? "Trees" : id === "ridge" ? "Mountain" : id === "snow" ? "Snowflake" : id === "aether" ? "Sparkles" : "Leaf" })),
  { id: "bramble", group: "People", label: "Humans", hint: "Spawn independent human settlers", icon: "Users" },
  { id: "cinder", group: "People", label: "Dwarves", hint: "Spawn independent dwarf settlers", icon: "Pickaxe" },
  { id: "tide", group: "People", label: "Elves", hint: "Spawn independent elf settlers", icon: "Leaf" },
  { id: "aetherfolk", group: "People", label: "Orcs", hint: "Spawn independent orc settlers", icon: "Shield" },
  { id: "moth", group: "Animals", label: "Butterflies", hint: "Pollinating wildlife", icon: "Bird" },
  { id: "boar", group: "Animals", label: "Boars", hint: "Wild forest animals", icon: "Rabbit" },
  { id: "rabbit", group: "Animals", label: "Rabbits", hint: "Small fast animals", icon: "Rabbit" },
  { id: "deer", group: "Animals", label: "Deer", hint: "Gentle woodland animals", icon: "Trees" },
  { id: "sheep", group: "Animals", label: "Sheep", hint: "Peaceful grazing animals", icon: "Cloud" },
  { id: "chicken", group: "Animals", label: "Chickens", hint: "Small farm birds", icon: "Bird" },
  { id: "wolf", group: "Animals", label: "Wolves", hint: "Pack hunters", icon: "Dog" },
  { id: "bear", group: "Animals", label: "Bears", hint: "Large powerful animals", icon: "PawPrint" },
  { id: "fish", group: "Animals", label: "Fish", hint: "Aquatic wildlife", icon: "Fish" },
  { id: "kingdom_bramble", group: "Kingdoms", label: "Human Kingdom", hint: "Create a human kingdom immediately", icon: "Crown" },
  { id: "kingdom_cinder", group: "Kingdoms", label: "Dwarf Kingdom", hint: "Create a dwarf kingdom immediately", icon: "Crown" },
  { id: "kingdom_tide", group: "Kingdoms", label: "Elf Kingdom", hint: "Create an elf kingdom immediately", icon: "Crown" },
  { id: "kingdom_aether", group: "Kingdoms", label: "Orc Kingdom", hint: "Create an orc kingdom immediately", icon: "Crown" },
  { id: "barrier", group: "Build", label: "Barrier", hint: "Draw an indestructible wall", icon: "BrickWall" },
  { id: "erasebarrier", group: "Build", label: "Remove Barrier", hint: "Remove a barrier you placed", icon: "Eraser" },
  { id: "erase", group: "Build", label: "Erase", hint: "Remove people, creatures, buildings, fire, and barriers", icon: "Trash2" },
  { id: "house", group: "Build", label: "House", hint: "Adds shelter and births", icon: "House" },
  { id: "farm", group: "Build", label: "Farm", hint: "Produces food", icon: "Wheat" },
  { id: "mine", group: "Build", label: "Mine", hint: "Produces stone and ore", icon: "Pickaxe" },
  { id: "tower", group: "Build", label: "Watchtower", hint: "Defends a kingdom", icon: "Castle" },
  { id: "academy", group: "Build", label: "Academy", hint: "Develops intelligence and technology", icon: "BookOpen" },
  { id: "shrine", group: "Build", label: "Temple", hint: "Develops magic", icon: "Gem" },
  { id: "factory", group: "Build", label: "Factory", hint: "Produces guns, tanks, boats, and planes", icon: "Factory" },
  { id: "vehicle_tank", group: "Build", label: "Tank", hint: "Place a tank for the nearest kingdom", icon: "Truck" },
  { id: "vehicle_plane", group: "Build", label: "Plane", hint: "Place a plane for the nearest kingdom", icon: "Plane" },
  { id: "vehicle_boat", group: "Build", label: "Boat", hint: "Place a patrol boat for the nearest kingdom", icon: "Ship" },
  { id: "vehicle_warship", group: "Build", label: "Warship", hint: "Heavy sea combat and coastal bombardment", icon: "ShipWheel" },
  { id: "vehicle_carrier", group: "Build", label: "Aircraft Carrier", hint: "Long-range carrier air strikes", icon: "PlaneTakeoff" },
  { id: "mind", group: "Bestow", label: "Intelligence", hint: "+20 intelligence to a person", icon: "Brain" },
  { id: "magic", group: "Bestow", label: "Magic", hint: "+20 magic to a person", icon: "Sparkles" },
  { id: "might", group: "Bestow", label: "Strength", hint: "+20 strength and health", icon: "Dumbbell" },
  { id: "haste", group: "Bestow", label: "Speed", hint: "+20 speed to a person", icon: "Wind" },
  { id: "luck", group: "Bestow", label: "Luck", hint: "+20 luck to a person", icon: "Clover" },
  { id: "flight", group: "Bestow", label: "Flight", hint: "Let a person fly over barriers", icon: "Feather" },
  { id: "teleport", group: "Bestow", label: "Teleportation", hint: "Let a person teleport through barriers", icon: "Orbit" },
  { id: "trait", group: "Bestow", label: "Give Trait", hint: "Give a person a new personality trait", icon: "Tags" },
  { id: "immortal", group: "Bestow", label: "Immortality", hint: "Make a person unable to die", icon: "Infinity" },
  { id: "regeneration", group: "Bestow", label: "Regeneration", hint: "Make a person rapidly heal", icon: "Activity" },
  { id: "giant", group: "Bestow", label: "Giant", hint: "Make a person larger and stronger", icon: "Expand" },
  { id: "bloom", group: "Wonders", label: "Blessing", hint: "Heal land and living things", icon: "Heart" },
  { id: "rain", group: "Wonders", label: "Rain", hint: "Rain, fertility, and fire relief", icon: "CloudRain" },
  { id: "peace", group: "Wonders", label: "Peace", hint: "Improve kingdom relations", icon: "Handshake" },
  { id: "fire", group: "Calamities", label: "Fire", hint: "Start a spreading wildfire", icon: "Flame" },
  { id: "lightning", group: "Calamities", label: "Lightning", hint: "Strike with divine lightning", icon: "CloudLightning" },
  { id: "bomb", group: "Calamities", label: "Bomb", hint: "Create a powerful local explosion", icon: "Bomb" },
  { id: "megabomb", group: "Calamities", label: "Mega Bomb", hint: "Create a massive explosion", icon: "CircleDot" },
  { id: "quake", group: "Calamities", label: "Earthquake", hint: "Break and raise mountains", icon: "Zap" },
  { id: "plague", group: "Calamities", label: "Plague", hint: "Release a contagious sickness", icon: "Skull" },
  { id: "frost", group: "Calamities", label: "Freeze", hint: "Freeze land and slow life", icon: "Snowflake" },
  { id: "star", group: "Calamities", label: "Meteor", hint: "Create a burning crater", icon: "Gem" },
];

export const CREATURE_TYPES = {
  moth: { name: "Butterfly", health: 20, count: 8, habitat: "air" }, boar: { name: "Wild Boar", health: 75, count: 3, habitat: "land" },
  rabbit: { name: "Rabbit", health: 24, count: 6, habitat: "land" }, deer: { name: "Deer", health: 58, count: 4, habitat: "land" },
  sheep: { name: "Sheep", health: 45, count: 5, habitat: "land" }, chicken: { name: "Chicken", health: 18, count: 7, habitat: "land" },
  wolf: { name: "Wolf", health: 70, count: 4, habitat: "land", predator: true }, bear: { name: "Bear", health: 135, count: 2, habitat: "land", predator: true },
  fish: { name: "Fish", health: 16, count: 9, habitat: "water" },
};
export const VEHICLE_TYPES = {
  tank: { name: "Tank", health: 240, habitat: "land", damage: 18, range: 2.8 }, boat: { name: "Patrol Boat", health: 180, habitat: "water", damage: 12, range: 3.2 }, plane: { name: "Plane", health: 130, habitat: "air", damage: 14, range: 4.5 },
  warship: { name: "Warship", health: 340, habitat: "water", damage: 25, range: 6.5 }, carrier: { name: "Aircraft Carrier", health: 460, habitat: "water", damage: 20, range: 9 },
};

const MALE_FIRST = ["Aiden", "Arthur", "Benjamin", "Caleb", "Damon", "Daniel", "Elias", "Felix", "Gabriel", "Henry", "Hugo", "Isaac", "Jasper", "Jonah", "Leo", "Marcus", "Milo", "Owen", "Rafael", "Silas", "Theo", "Victor", "Xavier", "Zane"];
const FEMALE_FIRST = ["Alina", "Amara", "Beatrice", "Camila", "Celia", "Clara", "Diana", "Elise", "Eva", "Freya", "Grace", "Hana", "Iris", "Isla", "Julia", "Kira", "Lila", "Lucia", "Maya", "Nadia", "Nora", "Rhea", "Samira", "Sofia", "Talia", "Valerie", "Willow", "Yara"];
const NEUTRAL_FIRST = ["Alex", "Avery", "Emery", "Harper", "Jamie", "Jordan", "Kai", "Morgan", "Quinn", "Robin", "Rowan", "Sage", "Taylor"];
const FIRST = [...MALE_FIRST, ...FEMALE_FIRST, ...NEUTRAL_FIRST];
const LAST = ["Adler", "Bennett", "Brooks", "Campbell", "Carter", "Chen", "Clark", "Cooper", "Cruz", "Davis", "Diaz", "Ellis", "Fisher", "Flores", "Foster", "Garcia", "Gray", "Green", "Hall", "Hayes", "Hill", "Howard", "Hughes", "James", "Kim", "King", "Lee", "Lewis", "Lopez", "Martin", "Miller", "Moore", "Morgan", "Nguyen", "Ortiz", "Patel", "Price", "Reed", "Rivera", "Ross", "Scott", "Shaw", "Singh", "Smith", "Stone", "Taylor", "Thomas", "Turner", "Walker", "Ward", "Wright", "Young"];
export const TRAIT_OPTIONS = ["Curious", "Brave", "Kind", "Stubborn", "Patient", "Restless", "Greedy", "Generous", "Solitary", "Joyful", "Cautious", "Ambitious", "Peaceful", "Aggressive", "Fertile", "Genius", "Strong", "Fast", "Lucky"];
const TRAITS = TRAIT_OPTIONS.slice(0, 12);
export const ANIMAL_TRAITS = ["Swift", "Strong", "Curious", "Aggressive", "Gentle", "Hardy", "Lucky", "Nocturnal", "Albino", "Clever", "Skittish", "Loyal"];
export const SHARED_LIFE_TRAITS = [...TRAIT_OPTIONS, "Immortal", "Regeneration", "Giant"];
export const ANIMAL_TRAIT_OPTIONS = [...new Set([...SHARED_LIFE_TRAITS, ...ANIMAL_TRAITS])];
const PLACE_A = ["Alder", "Ash", "Black", "Bright", "Cedar", "Clear", "Cold", "Dawn", "Deep", "East", "Fair", "Fox", "Gold", "Grand", "High", "Iron", "Lake", "Long", "Moon", "North", "Oak", "Old", "Pine", "Red", "River", "Silver", "South", "Spring", "Stone", "Storm", "Sun", "West", "White", "Wild", "Wolf"];
const PLACE_B = ["bay", "bridge", "brook", "burg", "cliff", "cross", "dale", "fall", "field", "ford", "gate", "haven", "heim", "hill", "hold", "keep", "mere", "mont", "moor", "port", "reach", "rest", "rock", "stead", "ton", "vale", "view", "watch", "wick", "wood"];
const KINGDOM_ENDINGS = ["Realm", "Kingdom", "Dominion", "Union", "Crown", "Empire", "Confederacy", "Highlands", "Republic"];
const ANIMAL_NAMES = ["Acorn", "Ash", "Bandit", "Bean", "Birch", "Bolt", "Boots", "Bramble", "Breeze", "Bruno", "Cedar", "Chip", "Clover", "Copper", "Dapple", "Dash", "Dot", "Echo", "Fern", "Finn", "Flint", "Hazel", "Juniper", "Lucky", "Luna", "Maple", "Milo", "Misty", "Moss", "Nibbles", "Nova", "Olive", "Onyx", "Patches", "Pebble", "Pepper", "Pip", "Raven", "River", "Rusty", "Scout", "Shadow", "Sky", "Snow", "Socks", "Spark", "Spot", "Storm", "Sunny", "Willow"];
const VEHICLE_CALLSIGNS = ["Arrow", "Badger", "Comet", "Falcon", "Hammer", "Lancer", "Mammoth", "Ranger", "Sentinel", "Spear", "Tempest", "Thunder", "Vanguard", "Voyager"];
const ALLIANCE_PREFIXES = ["Northern", "Southern", "Free", "United", "Golden", "Iron", "Silver", "Coastal", "Highland", "Grand", "Common", "Sovereign"];
const ALLIANCE_ENDINGS = ["Accord", "Alliance", "Compact", "Coalition", "League", "Pact", "Entente", "Union"];
const KINGDOM_COLORS = ["#e8d58a", "#e97a62", "#66c9e8", "#75d497", "#bd8fe3", "#f0a657", "#dd73ad", "#91a9e5", "#bed45e", "#67d5c2", "#e3df69", "#9d7de5", "#ef8f9c", "#79b7f2", "#d7a36b", "#83c978"];

export const EQUIPMENT_CATALOG = {
  hoe: { name: "Iron Hoe", slot: "tool", icon: "🌾", power: 8 }, axe: { name: "Woodcutter's Axe", slot: "tool", icon: "🪓", power: 10 }, pickaxe: { name: "Iron Pickaxe", slot: "tool", icon: "⛏️", power: 11 }, hammer: { name: "Builder's Hammer", slot: "tool", icon: "🔨", power: 9 }, book: { name: "Scholar's Book", slot: "tool", icon: "📖", power: 7 }, staff: { name: "Arcane Staff", slot: "tool", icon: "🪄", power: 12 }, satchel: { name: "Healer's Satchel", slot: "tool", icon: "🧰", power: 8 }, ledger: { name: "Trade Ledger", slot: "tool", icon: "📜", power: 5 }, pack: { name: "Settler's Pack", slot: "tool", icon: "🎒", power: 6 },
  sword: { name: "Steel Sword", slot: "weapon", icon: "⚔️", damage: 12 }, spear: { name: "Guard Spear", slot: "weapon", icon: "🔱", damage: 11 }, bow: { name: "Hunting Bow", slot: "weapon", icon: "🏹", damage: 9 }, rifle: { name: "Kingdom Rifle", slot: "weapon", icon: "💥", damage: 20 },
  leather: { name: "Leather Armor", slot: "armor", icon: "🛡️", defense: 6 }, chain: { name: "Chain Armor", slot: "armor", icon: "🛡️", defense: 12 }, plate: { name: "Plate Armor", slot: "armor", icon: "🛡️", defense: 19 }, royal: { name: "Royal Armor", slot: "armor", icon: "👑", defense: 15 },
};

export const hash = (x, y, seed = 0) => {
  const n = Math.sin(x * 12.9898 + y * 78.233 + seed * 37.719) * 43758.5453;
  return n - Math.floor(n);
};
export const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
export const distance = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
export const indexAt = (x, y) => y * COLS + x;
export const tileAt = (world, x, y) => x < 0 || y < 0 || x >= COLS || y >= ROWS ? null : world.tiles[indexAt(x, y)];

function allNamed(world) {
  return [...(world.factions || []), ...(world.cities || []), ...(world.people || []), ...(world.creatures || []), ...(world.buildings || []), ...(world.vehicles || [])];
}

function uniqueName(world, makeName) {
  const used = new Set(allNamed(world).map((item) => item.name?.toLowerCase()).filter(Boolean));
  for (let attempt = 0; attempt < 250; attempt += 1) {
    const candidate = makeName(world.nextId + attempt, attempt);
    if (!used.has(candidate.toLowerCase())) return candidate;
  }
  return `${makeName(world.nextId, 0)} ${world.nextId}`;
}

function placeName(world) {
  const seedOffset = Math.abs(Math.floor(world.seed * 997));
  return uniqueName(world, (n) => `${PLACE_A[(n + seedOffset) % PLACE_A.length]}${PLACE_B[(n * 11 + seedOffset * 3 + Math.floor(n / PLACE_A.length)) % PLACE_B.length]}`);
}

function kingdomName(world) {
  const seedOffset = Math.abs(Math.floor(world.seed * 613));
  return uniqueName(world, (n) => `${PLACE_A[(n * 7 + seedOffset) % PLACE_A.length]} ${KINGDOM_ENDINGS[(n * 13 + seedOffset) % KINGDOM_ENDINGS.length]}`);
}

function kingdomColor(world) {
  const used = new Set((world.factions || []).map((item) => item.color?.toLowerCase()));
  return KINGDOM_COLORS.find((color) => !used.has(color.toLowerCase())) || KINGDOM_COLORS[world.factions.length % KINGDOM_COLORS.length];
}

function allianceName(world) {
  const seedOffset = Math.abs(Math.floor(world.seed * 347));
  const used = new Set((world.diplomacy?.alliances || []).map((item) => item.name.toLowerCase()));
  for (let attempt = 0; attempt < 100; attempt += 1) {
    const n = world.nextId + attempt, candidate = `${ALLIANCE_PREFIXES[(n * 5 + seedOffset) % ALLIANCE_PREFIXES.length]} ${ALLIANCE_ENDINGS[(n * 11 + seedOffset) % ALLIANCE_ENDINGS.length]}`;
    if (!used.has(candidate.toLowerCase())) return candidate;
  }
  return `World Alliance ${world.nextId}`;
}

function creatureName(world, type) {
  const species = CREATURE_TYPES[type]?.name || (type === "raider" ? "Starling Raider" : "Creature"), seedOffset = Math.abs(Math.floor(world.seed * 431));
  return uniqueName(world, (n, attempt) => `${ANIMAL_NAMES[(n * 17 + attempt + seedOffset) % ANIMAL_NAMES.length]} the ${species}`);
}

function vehicleName(world, faction, type) {
  const kind = VEHICLE_TYPES[type]?.name || "Vehicle", seedOffset = Math.abs(Math.floor(world.seed * 277));
  return uniqueName(world, (n) => `${faction?.name || "Independent"} ${kind} “${VEHICLE_CALLSIGNS[(n * 5 + seedOffset) % VEHICLE_CALLSIGNS.length]}”`);
}

function equipmentForRole(role) {
  const loadouts = {
    ruler: { tool: null, weapon: "sword", armor: "royal" }, farmer: { tool: "hoe", weapon: null, armor: null }, woodcutter: { tool: "axe", weapon: null, armor: "leather" }, miner: { tool: "pickaxe", weapon: null, armor: "leather" }, builder: { tool: "hammer", weapon: null, armor: null }, scholar: { tool: "book", weapon: null, armor: null }, mystic: { tool: "staff", weapon: null, armor: null }, healer: { tool: "satchel", weapon: null, armor: null }, guard: { tool: null, weapon: "spear", armor: "chain" }, scout: { tool: null, weapon: "bow", armor: "leather" }, merchant: { tool: "ledger", weapon: null, armor: "leather" }, settler: { tool: "pack", weapon: null, armor: "leather" }, child: { tool: null, weapon: null, armor: null },
  };
  return { ...(loadouts[role] || { tool: null, weapon: null, armor: null }) };
}

function hydrateCreature(world, creature) {
  creature.kind = "creature";
  creature.name ||= creatureName(world, creature.type);
  creature.traits ||= [ANIMAL_TRAITS[(Number(String(creature.id || "").replace(/\D/g, "")) * 7) % ANIMAL_TRAITS.length]];
  creature.maxHealth ??= CREATURE_TYPES[creature.type]?.health || creature.health || 100;
  creature.health ??= creature.maxHealth;
  creature.intelligence ??= creature.traits.includes("Clever") ? 30 : 8;
  creature.magic ??= 0; creature.strength ??= Math.round(creature.maxHealth / 3);
  creature.speed ??= creature.traits.includes("Swift") ? 55 : 30; creature.luck ??= 20;
  creature.immortal ??= creature.traits.includes("Immortal"); creature.regeneration ??= creature.traits.includes("Regeneration"); creature.isGiant ??= creature.traits.includes("Giant");
  creature.age ??= 0; creature.dx ??= 0; creature.dy ??= 0; creature.animTick ??= 0;
  creature.emote ??= null; creature.emoteUntil ??= 0;
  return creature;
}

export function pushEvent(world, text, tone = "calm", subject = null) {
  world.events.unshift({ id: world.nextId++, year: world.year, text, tone, subject });
  world.events = world.events.slice(0, 200);
}

function blankLaws() {
  return { births: true, aging: true, expansion: true, diplomacy: true, wars: true, hunger: true, fireSpread: true, randomEvents: true };
}

function blankDiplomacy() {
  return { wars: [], alliances: [], history: [] };
}

function diplomacyRecord(world, type, text, details = {}) {
  world.diplomacy ||= blankDiplomacy();
  world.diplomacy.history.unshift({ id: `d${world.nextId++}`, type, year: world.year, text, ...details });
  world.diplomacy.history = world.diplomacy.history.slice(0, 120);
}

function samePair(record, firstId, secondId) {
  return record && ((record.attackerId === firstId && record.defenderId === secondId) || (record.attackerId === secondId && record.defenderId === firstId));
}

function activeAllianceForPair(world, firstId, secondId) {
  return world.diplomacy?.alliances?.find((alliance) => alliance.status === "active" && alliance.memberIds.includes(firstId) && alliance.memberIds.includes(secondId));
}

function leaveAlliance(world, alliance, factionId, betrayal = false, targetId = null) {
  if (!alliance || alliance.status !== "active" || !alliance.memberIds.includes(factionId)) return false;
  const faction = world.factions.find((item) => item.id === factionId), target = world.factions.find((item) => item.id === targetId);
  alliance.memberIds = alliance.memberIds.filter((id) => id !== factionId);
  alliance.departures ||= [];
  alliance.departures.push({ factionId, year: world.year, reason: betrayal ? "betrayal" : "withdrew" });
  const text = betrayal ? `${faction?.name || "A kingdom"} betrays ${alliance.name}${target ? ` by attacking ${target.name}` : ""}.` : `${faction?.name || "A kingdom"} leaves ${alliance.name}.`;
  diplomacyRecord(world, betrayal ? "betrayal" : "departure", text, { allianceId: alliance.id, factionId, targetId });
  pushEvent(world, text, betrayal ? "danger" : "calm", factionId);
  if (alliance.memberIds.length < 2) { alliance.status = "dissolved"; alliance.endedYear = world.year; diplomacyRecord(world, "alliance-ended", `${alliance.name} dissolves.`, { allianceId: alliance.id }); }
  return true;
}

function formAlliance(world, firstId, secondId) {
  if (activeAllianceForPair(world, firstId, secondId)) return false;
  const first = world.factions.find((item) => item.id === firstId), second = world.factions.find((item) => item.id === secondId);
  if (!first || !second) return false;
  const alliance = { id: `a${world.nextId++}`, name: allianceName(world), memberIds: [first.id, second.id], formedYear: world.year, endedYear: null, status: "active", departures: [] };
  world.diplomacy.alliances.unshift(alliance);
  const text = `${first.name} and ${second.name} form the ${alliance.name}.`;
  diplomacyRecord(world, "alliance-formed", text, { allianceId: alliance.id, memberIds: [...alliance.memberIds] });
  pushEvent(world, text, "wonder", alliance.id);
  return true;
}

export function effectiveLaw(world, key, subject = null) {
  if (subject?.lawOverrides && Object.prototype.hasOwnProperty.call(subject.lawOverrides, key)) return subject.lawOverrides[key];
  if (key === "aging" && subject?.immortal) return false;
  const faction = subject?.relations ? subject : subject?.factionId ? world.factions.find((item) => item.id === subject.factionId) : null;
  if (faction?.lawOverrides && Object.prototype.hasOwnProperty.call(faction.lawOverrides, key)) return faction.lawOverrides[key];
  return world.laws[key];
}

export function personStatuses(world, person) {
  const statuses = [], tile = tileAt(world, person.x, person.y), faction = world.factions.find((item) => item.id === person.factionId);
  if (person.pregnancy) { const remaining = Math.max(0, person.pregnancy.dueTick - world.ticks), months = Math.max(1, Math.ceil(remaining / PREGNANCY_TICKS * 9)); statuses.push(`Pregnant · about ${months} month${months === 1 ? "" : "s"} remaining`); }
  if (person.recentBirthUntil > world.ticks) statuses.push("Recovering after birth");
  if (person.claimProgress > 0) statuses.push(`Claiming territory · ${Math.round(person.claimProgress / (world.claimTime || 20) * 100)}%`);
  const actionByEmote = { "🔨": "Building", "🌾": "Farming", "🪓": "Woodcutting", "⛏️": "Mining", "📖": "Studying", "➕": "Healing", "🪙": "Trading", "⚔️": "Fighting" };
  if (actionByEmote[person.emote]) statuses.push(actionByEmote[person.emote]);
  else if (person.role === "miner" && tile?.type === "ridge") statuses.push("Mining");
  else if (person.role === "farmer" && ["meadow", "sand"].includes(tile?.type)) statuses.push("Farming");
  else if (person.role === "woodcutter" && tile?.type === "forest") statuses.push("Woodcutting");
  else if (person.role === "scholar") statuses.push("Studying");
  else if (person.role === "mystic") statuses.push("Practicing magic");
  if (world.possessedId === person.id) statuses.push("Possessed");
  if (person.moving) statuses.push("Traveling");
  if (person.sick) statuses.push("Sick");
  if (person.hunger < 25) statuses.push("Starving");
  if (faction && Object.values(faction.relations).some((relation) => relation < -35)) statuses.push("Kingdom at war");
  if (!statuses.length) statuses.push("Idle");
  return [...new Set(statuses)];
}

// Hand-drawn, low-resolution equirectangular geography for the Earth preset.
// It deliberately uses original geometry rather than a traced or imported map asset.
const EARTH_LAND = [
  // North America, including Alaska and Central America.
  [[.015,.20],[.055,.15],[.12,.14],[.17,.18],[.22,.20],[.26,.24],[.30,.25],[.33,.31],[.30,.36],[.29,.42],[.27,.45],[.25,.42],[.22,.42],[.20,.47],[.23,.50],[.21,.52],[.18,.47],[.16,.42],[.12,.40],[.10,.35],[.06,.32],[.03,.27]],
  // South America.
  [[.275,.45],[.33,.44],[.38,.48],[.405,.55],[.39,.63],[.36,.70],[.35,.78],[.325,.87],[.30,.81],[.295,.71],[.27,.63],[.25,.55],[.255,.49]],
  // Europe.
  [[.44,.29],[.46,.25],[.49,.25],[.505,.20],[.54,.18],[.57,.23],[.61,.25],[.62,.31],[.59,.35],[.565,.36],[.55,.40],[.51,.39],[.49,.36],[.46,.38],[.44,.34]],
  // Africa.
  [[.455,.40],[.51,.38],[.57,.40],[.615,.44],[.64,.52],[.615,.61],[.60,.70],[.56,.80],[.525,.75],[.50,.66],[.47,.58],[.445,.49]],
  // Asia, Arabia, India and Southeast Asia.
  [[.555,.23],[.61,.19],[.69,.17],[.78,.17],[.87,.18],[.96,.23],[.975,.30],[.95,.36],[.91,.38],[.88,.43],[.84,.45],[.82,.51],[.79,.49],[.77,.55],[.745,.52],[.735,.46],[.70,.44],[.68,.50],[.65,.55],[.63,.49],[.61,.43],[.57,.40],[.58,.35],[.55,.31]],
  // Australia.
  [[.795,.68],[.835,.64],[.90,.65],[.945,.70],[.95,.78],[.91,.84],[.85,.85],[.795,.79],[.78,.73]],
  // Greenland.
  [[.315,.09],[.355,.055],[.39,.075],[.405,.14],[.385,.22],[.35,.24],[.32,.19]],
  // Antarctica.
  [[0,.91],[.08,.89],[.17,.92],[.27,.90],[.38,.93],[.49,.90],[.60,.92],[.72,.89],[.84,.92],[.94,.89],[1,.92],[1,1],[0,1]],
];
const EARTH_ISLANDS = [
  [.455,.265,.014,.025], // Iceland
  [.465,.325,.011,.035], [.48,.35,.009,.025], // Britain and Ireland
  [.625,.52,.012,.038], // Sri Lanka
  [.955,.39,.008,.034], [.945,.43,.007,.027], // Japan
  [.755,.57,.012,.025], [.78,.59,.012,.03], [.81,.61,.012,.035], // Philippines and Indonesia
  [.985,.52,.008,.026], // New Guinea edge
  [.96,.88,.01,.035], [.935,.84,.008,.025], // New Zealand
  [.625,.73,.014,.065], // Madagascar
  [.235,.51,.008,.018], [.245,.53,.007,.015], // Caribbean
];

function inPolygon(x, y, polygon) {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [xi, yi] = polygon[i], [xj, yj] = polygon[j];
    if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / ((yj - yi) || .00001) + xi) inside = !inside;
  }
  return inside;
}

function earthLandAt(x, y, coastNoise = 0) {
  if (EARTH_LAND.some((polygon) => inPolygon(x, y, polygon))) return true;
  return EARTH_ISLANDS.some(([ix, iy, rx, ry]) => Math.hypot((x - ix) / rx, (y - iy) / ry) < 1 + coastNoise * .22);
}

function distanceToSegment(px, py, ax, ay, bx, by) {
  const dx = bx - ax, dy = by - ay, length = dx * dx + dy * dy;
  const t = length ? clamp(((px - ax) * dx + (py - ay) * dy) / length, 0, 1) : 0;
  return Math.hypot(px - (ax + t * dx), py - (ay + t * dy));
}

function nearEarthLine(x, y, points, width = .009) {
  for (let i = 1; i < points.length; i += 1) if (distanceToSegment(x, y, ...points[i - 1], ...points[i]) < width) return true;
  return false;
}

export function createWorld(seed = Math.random() * 1000, scenario = "balanced", mapType = "pangaea") {
  const tiles = [], [mapWidth, mapHeight] = MAP_DIMENSIONS[mapType] || MAP_DIMENSIONS.pangaea, offsetX = Math.floor((COLS - mapWidth) / 2), offsetY = Math.floor((ROWS - mapHeight) / 2);
  for (let y = 0; y < ROWS; y += 1) {
    for (let x = 0; x < COLS; x += 1) {
      const inside = x >= offsetX && y >= offsetY && x < offsetX + mapWidth && y < offsetY + mapHeight;
      if (!inside) { tiles.push({ type: "void", moisture: 0, fertility: 0, fire: 0, frost: 0, plague: 0, barrier: 0, owner: null, flash: 0 }); continue; }
      const localX = x - offsetX, localY = y - offsetY, ux = localX / mapWidth, uy = localY / mapHeight;
      const nx = ux - 0.5;
      const ny = uy - 0.5;
      const edge = Math.sqrt(nx * nx * 0.7 + ny * ny) * 1.72;
      const wave = Math.sin((x + seed) * .17) * .12 + Math.cos((y - seed) * .21) * .1 + Math.sin((x + y) * .08) * .08 + hash(x >> 1, y >> 1, seed) * .2;
      let h = .72 - edge + wave;
      if (mapType === "earth") {
        h = earthLandAt(ux, uy, wave) ? .24 + wave * .08 : -.34;
      } else if (mapType === "archipelago") {
        const islands = [[.24,.3,.22],[.48,.22,.17],[.72,.34,.2],[.34,.7,.18],[.66,.72,.22]];
        h = Math.max(...islands.map(([ix, iy, size]) => .48 - Math.hypot(ux - ix, uy - iy) / size)) + wave * .6;
      } else if (mapType === "twin") {
        const left = .58 - Math.hypot((ux - .28) * 1.15, (uy - .5) * .82) * 1.7;
        const right = .58 - Math.hypot((ux - .72) * 1.15, (uy - .5) * .82) * 1.7;
        h = Math.max(left, right) + wave * .65;
      } else if (mapType === "ring") {
        const d = Math.hypot((ux - .5) * .86, uy - .5);
        h = .42 - Math.abs(d - .29) * 2.5 + wave * .45;
      } else if (mapType === "riverlands") {
        const river = Math.abs(uy - .5 - Math.sin(localX * .15) * .12);
        h = .64 - edge * .62 + wave * .55;
        if (river < .045) h = -.2;
      } else if (mapType === "empty") h = -1;
      let type = "water";
      if (h > .1) type = "meadow";
      if (h > .3 && hash(x, y, seed) > .4) type = "forest";
      if (h > .52) type = "ridge";
      if (type === "meadow" && ux > .72 && hash(x, y, seed + 4) > .48) type = "sand";
      if (type !== "water" && uy < .18 && hash(x, y, seed + 6) > .32) type = "snow";
      if (type === "forest" && hash(x, y, seed + 11) > .94) type = "aether";
      if (mapType === "earth" && type !== "water") {
        type = hash(x, y, seed + 31) > .58 ? "forest" : "meadow";
        const ellipse = (ix, iy, rx, ry) => Math.hypot((ux - ix) / rx, (uy - iy) / ry) < 1;
        const rainforest = ellipse(.325,.56,.065,.11) || ellipse(.555,.59,.055,.10) || ellipse(.78,.51,.11,.09) || ellipse(.17,.29,.075,.09);
        const woodland = ellipse(.255,.31,.07,.12) || ellipse(.52,.31,.075,.09) || ellipse(.73,.28,.20,.08) || ellipse(.88,.34,.075,.08);
        if ((rainforest && hash(x, y, seed + 21) > .08) || (woodland && hash(x, y, seed + 24) > .26)) type = "forest";

        const desert = ellipse(.535,.48,.105,.075) || ellipse(.605,.47,.055,.06) || ellipse(.565,.69,.04,.07) || ellipse(.865,.74,.09,.075) || ellipse(.175,.36,.042,.055) || ellipse(.315,.67,.026,.10) || ellipse(.75,.36,.085,.045);
        if (desert && hash(x, y, seed + 20) > .12) type = "sand";

        const mountain = nearEarthLine(ux, uy, [[.18,.19],[.205,.27],[.22,.36],[.235,.44]], .014)
          || nearEarthLine(ux, uy, [[.285,.48],[.305,.59],[.315,.72],[.325,.84]], .012)
          || nearEarthLine(ux, uy, [[.49,.36],[.54,.355],[.57,.37]], .011)
          || nearEarthLine(ux, uy, [[.61,.23],[.625,.32],[.635,.40]], .010)
          || nearEarthLine(ux, uy, [[.65,.41],[.72,.405],[.79,.43]], .014)
          || nearEarthLine(ux, uy, [[.90,.68],[.92,.77],[.91,.82]], .012)
          || nearEarthLine(ux, uy, [[.535,.20],[.525,.28]], .009)
          || nearEarthLine(ux, uy, [[.585,.52],[.595,.65],[.58,.72]], .009);
        if (mountain && hash(x, y, seed + 22) > .12) type = "ridge";

        if (uy > .90 || (ellipse(.36,.13,.045,.09)) || (uy < .15 && (ux < .32 || ux > .55))) type = "snow";

        const river = nearEarthLine(ux, uy, [[.255,.27],[.255,.34],[.265,.42]], .006)
          || nearEarthLine(ux, uy, [[.285,.56],[.335,.575],[.39,.56]], .006)
          || nearEarthLine(ux, uy, [[.57,.48],[.565,.56],[.575,.66]], .006)
          || nearEarthLine(ux, uy, [[.55,.55],[.575,.58],[.59,.62]], .005)
          || nearEarthLine(ux, uy, [[.51,.35],[.55,.37],[.59,.36]], .0045)
          || nearEarthLine(ux, uy, [[.685,.45],[.72,.46],[.76,.45]], .005)
          || nearEarthLine(ux, uy, [[.73,.39],[.79,.41],[.86,.40]], .005)
          || nearEarthLine(ux, uy, [[.79,.43],[.80,.49],[.81,.54]], .0045);
        const lake = ellipse(.245,.285,.012,.010) || ellipse(.258,.292,.010,.008) || ellipse(.272,.303,.011,.008)
          || ellipse(.606,.365,.012,.032) || ellipse(.765,.30,.006,.022) || ellipse(.575,.585,.010,.009)
          || ellipse(.596,.62,.006,.018) || ellipse(.535,.34,.006,.006);
        if (river || lake) type = "water";
      }
      tiles.push({ type, moisture: type === "water" ? 1 : .35 + hash(x, y, seed + 9) * .5, fertility: TERRAIN[type].fertility, fire: 0, frost: 0, plague: 0, barrier: 0, owner: null, flash: 0 });
    }
  }
  return {
    version: 5, cols: COLS, rows: ROWS, bounds: { x: offsetX, y: offsetY, width: mapWidth, height: mapHeight }, seed, scenario, mapType, tiles, factions: [], cities: [], people: [], buildings: [], creatures: [], vehicles: [], effects: [], possessedId: null, claimTime: 20, year: 1, season: 0, ticks: 0, nextId: 1,
    weather: { type: "clear", until: 0 }, laws: blankLaws(), diplomacy: blankDiplomacy(),
    events: [{ id: 0, year: 1, text: "A new world begins.", tone: "calm" }],
  };
}

export function normalizeWorld(input) {
  const world = input;
  const oldCols = world.cols || (world.tiles?.length === 64 * 42 ? 64 : COLS), oldRows = world.rows || (world.tiles?.length === 64 * 42 ? 42 : ROWS);
  if (world.tiles?.length && (oldCols !== COLS || oldRows !== ROWS)) {
    const oldTiles = world.tiles;
    world.tiles = Array.from({ length: COLS * ROWS }, (_, index) => {
      const x = index % COLS, y = Math.floor(index / COLS), ox = Math.min(oldCols - 1, Math.floor(x / COLS * oldCols)), oy = Math.min(oldRows - 1, Math.floor(y / ROWS * oldRows));
      return { ...oldTiles[oy * oldCols + ox] };
    });
    const sx = COLS / oldCols, sy = ROWS / oldRows;
    for (const list of [world.people || [], world.creatures || [], world.cities || [], world.buildings || [], world.vehicles || []]) for (const item of list) { item.x = Math.round(item.x * sx); item.y = Math.round(item.y * sy); }
    if (world.bounds) world.bounds = { x: Math.round(world.bounds.x * sx), y: Math.round(world.bounds.y * sy), width: Math.round(world.bounds.width * sx), height: Math.round(world.bounds.height * sy) };
  }
  world.version = 5; world.cols = COLS; world.rows = ROWS;
  world.mapType ||= "pangaea";
  world.bounds ||= { x: 0, y: 0, width: COLS, height: ROWS };
  world.people ||= world.units?.filter((u) => u.type !== "moth") || [];
  world.creatures ||= world.units?.filter((u) => u.type === "moth") || [];
  world.buildings ||= [];
  world.vehicles ||= [];
  world.laws = { ...blankLaws(), ...(world.laws || {}) };
  world.weather ||= { type: "clear", until: 0 };
  world.events ||= [];
  world.diplomacy = { ...blankDiplomacy(), ...(world.diplomacy || {}) };
  world.diplomacy.wars ||= []; world.diplomacy.alliances ||= []; world.diplomacy.history ||= [];
  world.factions ||= [];
  world.cities ||= [];
  world.effects ||= [];
  world.possessedId ??= null;
  world.claimTime = clamp(Number(world.claimTime) || 20, 4, 96);
  for (const faction of world.factions) {
    faction.intelligence ??= 30; faction.magic ??= 15; faction.technology ??= 10; faction.culture ??= 10; faction.relations ||= {}; faction.arsenal = { guns: 0, tanks: 0, boats: 0, planes: 0, warships: 0, carriers: 0, ...(faction.arsenal || {}) }; faction.lawOverrides ||= {};
  }
  const seenFactionColors = new Set(); for (const faction of world.factions) { if (!faction.color || seenFactionColors.has(faction.color.toLowerCase())) faction.color = kingdomColor({ ...world, factions: world.factions.filter((item) => item !== faction && seenFactionColors.has(item.color?.toLowerCase())) }); seenFactionColors.add(faction.color.toLowerCase()); }
  for (const person of world.people) { hydratePerson(world, person); repairGeneratedPersonName(world, person); }
  for (const creature of world.creatures) hydrateCreature(world, creature);
  for (const building of world.buildings) { building.name ||= uniqueBuildingName(world, building.type, building.cityId); building.productionProgress ??= 0; }
  for (const vehicle of world.vehicles) vehicle.name ||= `${VEHICLE_TYPES[vehicle.type]?.name || "Vehicle"} ${vehicle.id}`;
  for (const tile of world.tiles) { tile.barrier ??= 0; tile.cityId ??= null; }
  const seenNames = new Set(), keepOrReplace = (item, replacement) => { const key = item.name?.toLowerCase(); if (!key || seenNames.has(key)) item.name = replacement(); seenNames.add(item.name.toLowerCase()); };
  for (const faction of world.factions) keepOrReplace(faction, () => kingdomName(world));
  for (const city of world.cities) keepOrReplace(city, () => placeName(world));
  for (const person of world.people) keepOrReplace(person, () => personName(world, person.gender, inheritedSurname(world, person.parents)));
  for (const creature of world.creatures) keepOrReplace(creature, () => creatureName(world, creature.type));
  for (const building of world.buildings) keepOrReplace(building, () => uniqueBuildingName(world, building.type, building.cityId));
  for (const vehicle of world.vehicles) keepOrReplace(vehicle, () => vehicleName(world, world.factions.find((item) => item.id === vehicle.factionId), vehicle.type));
  for (let i = 0; i < world.factions.length; i += 1) for (let j = i + 1; j < world.factions.length; j += 1) {
    const first = world.factions[i], second = world.factions[j], relation = first.relations[second.id] || 0;
    if (relation < -35 && !world.diplomacy.wars.some((war) => war.status === "active" && samePair(war, first.id, second.id))) world.diplomacy.wars.push({ id: `legacy-war-${first.id}-${second.id}`, attackerId: first.id, defenderId: second.id, startedYear: world.year, endedYear: null, status: "active", legacy: true });
    if (relation > 40 && !activeAllianceForPair(world, first.id, second.id)) world.diplomacy.alliances.push({ id: `legacy-alliance-${first.id}-${second.id}`, name: `${first.name}–${second.name} Alliance`, memberIds: [first.id, second.id], formedYear: world.year, endedYear: null, status: "active", departures: [], legacy: true });
  }
  return world;
}

function findLandNear(world, x, y, maxRadius = 10, preferred = []) {
  let best = null, score = -Infinity;
  for (let r = 0; r <= maxRadius; r += 1) {
    for (let dy = -r; dy <= r; dy += 1) for (let dx = -r; dx <= r; dx += 1) {
      if (Math.abs(dx) !== r && Math.abs(dy) !== r) continue;
      const tile = tileAt(world, x + dx, y + dy);
      if (!tile || tile.type === "water" || tile.type === "void" || tile.fire > .3) continue;
      const nextScore = (preferred.includes(tile.type) ? 5 : 0) + tile.fertility * 2 - Math.hypot(dx, dy) * .05;
      if (nextScore > score) { score = nextScore; best = { x: x + dx, y: y + dy }; }
    }
    if (best && r > 2) break;
  }
  return best;
}

function findWaterNear(world, x, y, maxRadius = 12) {
  for (let r = 0; r <= maxRadius; r += 1) for (let dy = -r; dy <= r; dy += 1) for (let dx = -r; dx <= r; dx += 1) { if (Math.abs(dx) !== r && Math.abs(dy) !== r) continue; const tile = tileAt(world, x + dx, y + dy); if (tile?.type === "water") return { x: x + dx, y: y + dy }; }
  return null;
}

function genderFor(world, id = world.nextId) {
  const idNumber = Number(String(id || "").replace(/\D/g, "")) || world.nextId, roll = hash(idNumber, 17, world.seed);
  return roll < .49 ? "Female" : roll < .98 ? "Male" : "Nonbinary";
}

function namesForGender(gender) {
  return gender === "Female" ? FEMALE_FIRST : gender === "Male" ? MALE_FIRST : NEUTRAL_FIRST;
}

function surnameOf(person) {
  const parts = person?.name?.trim().split(/\s+/) || [];
  return parts.length > 1 ? parts.at(-1) : null;
}

function inheritedSurname(world, parentIds = []) {
  const parents = parentIds.map((id) => world.people?.find((person) => person.id === id)).filter(Boolean);
  if (!parents.length) return null;
  const father = parents.find((person) => person.gender === "Male"), other = parents.find((person) => person !== father) || parents[0];
  const roll = hash(world.nextId, parents.length * 31, world.seed);
  if (father && roll < .86) return surnameOf(father);
  if (other && roll < .96) return surnameOf(other);
  return null;
}

function personName(world, gender = "Nonbinary", inherited = null) {
  const seedOffset = Math.abs(Math.floor(world.seed * 811));
  const firstNames = namesForGender(gender);
  return uniqueName(world, (n, attempt) => `${firstNames[(n * 7 + attempt + seedOffset) % firstNames.length]} ${inherited || LAST[(n * 13 + Math.floor(n / firstNames.length) + attempt + seedOffset * 3) % LAST.length]}`);
}

function repairGeneratedPersonName(world, person) {
  const first = person.name?.trim().split(/\s+/)[0], allowed = namesForGender(person.gender);
  if (!FIRST.includes(first) || allowed.includes(first)) return;
  const surname = surnameOf(person);
  person.name = personName(world, person.gender, surname);
}

function stat(world, base = 30) {
  return clamp(Math.round(base + (hash(world.nextId, world.year, world.seed) - .5) * 34), 3, 96);
}

function hydratePerson(world, person) {
  person.kind = "person";
  person.gender ||= genderFor(world, person.id);
  person.name ||= personName(world, person.gender, inheritedSurname(world, person.parents));
  person.role ||= "farmer";
  person.ageYears ??= 20 + Math.floor(Math.random() * 25);
  person.lawOverrides ||= {};
  person.health ??= person.hp ?? 100;
  person.maxHealth ??= 100;
  person.intelligence ??= stat(world);
  person.magic ??= stat(world, 16);
  person.strength ??= stat(world, 35);
  person.speed ??= stat(world, 35);
  person.luck ??= stat(world, 30);
  person.mood ??= 70;
  person.hunger ??= 90;
  person.experience ??= 0;
  person.kills ??= 0;
  person.traits ||= [TRAITS[world.nextId % TRAITS.length]];
  person.inventory ||= { food: 2, wood: 0, stone: 0, coin: 0 };
  person.equipment ||= equipmentForRole(person.role);
  person.equipment = { tool: null, weapon: null, armor: null, ...person.equipment };
  person.parents ||= [];
  person.children ||= [];
  person.loverIds ||= [];
  person.friendIds ||= [];
  person.enemyIds ||= [];
  person.history ||= [`Born before the first recorded census.`];
  person.canFly ??= false; person.canTeleport ??= false;
  person.expression ||= "neutral";
  person.immortal ??= person.traits.includes("Immortal"); person.regeneration ??= person.traits.includes("Regeneration"); person.isGiant ??= person.traits.includes("Giant");
  person.emote ??= null; person.emoteUntil ??= 0; person.moving ??= false; person.animTick ??= 0;
  person.claimProgress ??= 0; person.claimTileKey ??= null;
  person.pregnancy ??= null; person.recentBirthUntil ??= 0;
  person.dx ??= 0; person.dy ??= 0;
  return person;
}

function addPerson(world, faction, city, role, age = null, parentIds = []) {
  const person = hydratePerson(world, {
    id: `p${world.nextId++}`, species: faction.type, factionId: faction.id, homeId: city.id, x: city.x + Math.floor(Math.random() * 3) - 1, y: city.y + Math.floor(Math.random() * 3) - 1,
    role, ageYears: age ?? (role === "child" ? Math.floor(Math.random() * 12) + 2 : Math.floor(Math.random() * 38) + 18), parents: parentIds,
  });
  if (role === "ruler") { person.traits.push("Founder", "Crowned"); person.intelligence += 12; person.maxHealth = 120; person.health = 120; }
  if (faction.type === "cinder") { person.strength += 8; person.traits.push("Dwarven Endurance"); }
  if (faction.type === "tide") { person.speed += 7; person.maxHealth += 8; person.health += 8; person.traits.push("Elven Longevity"); }
  if (faction.type === "aether") { person.strength += 18; person.maxHealth += 18; person.health += 18; person.traits.push("Orc Strength"); }
  world.people.push(person);
  return person;
}

function uniqueBuildingName(world, type, cityId = null) {
  const base = buildingName(type), city = world.cities?.find((item) => item.id === cityId);
  return uniqueName(world, (n, attempt) => `${city?.name ? `${city.name} ` : ""}${base}${attempt ? ` ${n}` : ""}`);
}

function addBuilding(world, type, x, y, factionId = null, cityId = null) {
  const tile = tileAt(world, x, y);
  if (!tile || tile.type === "water" || tile.type === "void" || world.buildings.some((b) => b.x === x && b.y === y)) return null;
  const building = { id: `b${world.nextId++}`, type, name: uniqueBuildingName(world, type, cityId), x, y, factionId, cityId, level: 1, health: type === "factory" ? 180 : 100, builtYear: world.year, workers: [], production: 0, productionProgress: 0 };
  world.buildings.push(building);
  return building;
}

export function createKingdom(world, type, x, y, settlers = null) {
  const data = FACTION_TYPES[type];
  if (!data) return null;
  const spot = findLandNear(world, x, y, 12, data.preference);
  if (!spot) return null;
  const faction = {
    id: `f${world.nextId++}`, type, name: kingdomName(world), color: kingdomColor(world), founded: world.year,
    intelligence: type === "aether" ? 44 : type === "tide" ? 38 : 30, magic: type === "aether" ? 58 : type === "bramble" ? 28 : 12,
    technology: type === "cinder" ? 46 : type === "tide" ? 32 : 18, culture: 22, relations: {}, treasury: 12, arsenal: { guns: 0, tanks: 0, boats: 0, planes: 0, warships: 0, carriers: 0 }, lawOverrides: {}, leaderId: null,
  };
  for (const other of world.factions) { const relation = Math.round((hash(world.nextId, Number(other.id.replace(/\D/g, "")) || 1, world.seed) - .5) * 36); faction.relations[other.id] = relation; other.relations[faction.id] = relation; }
  world.factions.push(faction);
  const city = { id: `c${world.nextId++}`, factionId: faction.id, x: spot.x, y: spot.y, name: placeName(world), food: 32, wood: 22, stone: 12, ore: 0, level: 1, founded: world.year, age: 0, wall: 0 };
  world.cities.push(city);
  const capitalTile = tileAt(world, spot.x, spot.y); if (capitalTile) { capitalTile.owner = faction.id; capitalTile.cityId = city.id; }
  addBuilding(world, "hall", spot.x, spot.y, faction.id, city.id);
  addBuilding(world, "house", spot.x + 2, spot.y, faction.id, city.id);
  addBuilding(world, "farm", spot.x - 2, spot.y + 1, faction.id, city.id);
  const roles = ["ruler", "farmer", "scout", "woodcutter", "miner", "builder", "scholar", "guard", "healer", "child"];
  const founders = [];
  if (settlers?.length) {
    settlers.forEach((person, index) => {
      person.factionId = faction.id; person.homeId = city.id; person.x = spot.x + (index % 3) - 1; person.y = spot.y + Math.floor(index / 3); person.role = roles[index] || chooseRole(city, world); person.equipment = equipmentForRole(person.role);
      person.history.unshift(`Helped found ${faction.name} in year ${world.year}.`); founders.push(person);
      if (index === 0) { person.role = "ruler"; person.traits.push("Founder", "Crowned"); faction.leaderId = person.id; }
    });
  } else {
    for (const role of roles) {
      const person = addPerson(world, faction, city, role);
      founders.push(person);
      if (role === "ruler") faction.leaderId = person.id;
    }
  }
  for (let i = 0; i < founders.length; i += 1) {
    const friend = founders[(i + 1) % founders.length];
    founders[i].friendIds.push(friend.id);
  }
  const adultFounders = founders.filter((person) => person.ageYears >= 16);
  for (let i = 0; i + 1 < adultFounders.length; i += 2) { const a = adultFounders[i], b = adultFounders[i + 1]; a.loverIds = [...new Set([...a.loverIds, b.id])]; b.loverIds = [...new Set([...b.loverIds, a.id])]; }
  pushEvent(world, `${faction.name} is founded at ${city.name}.`, "birth", faction.id);
  applyScenario(world);
  return faction;
}

function spawnSettlers(world, type, x, y) {
  const spot = findLandNear(world, x, y, 18, FACTION_TYPES[type]?.preference || []); if (!spot) return;
  for (let i = 0; i < 4; i += 1) {
    const person = hydratePerson(world, { id: `p${world.nextId++}`, species: type, factionId: null, homeId: null, x: spot.x + (i % 2), y: spot.y + Math.floor(i / 2), role: "settler", ageYears: 18 + Math.floor(Math.random() * 30), history: [`Entered the world as an independent settler in year ${world.year}.`] });
    world.people.push(person);
  }
  pushEvent(world, `A group of ${FACTION_TYPES[type].name.toLowerCase()} begins searching for a home.`, "birth");
}

function applyScenario(world) {
  if (world.factions.length < 2) return;
  const [a, b] = world.factions;
  if (world.scenario === "mind-vs-might") { a.intelligence = 92; b.intelligence = 8; b.technology += 18; }
  if (world.scenario === "magic-vs-tech") { a.magic = 92; b.magic = 3; b.technology = 92; }
  if (world.scenario === "plenty-vs-scarcity") {
    const ca = world.cities.find((c) => c.factionId === a.id), cb = world.cities.find((c) => c.factionId === b.id);
    if (ca) { ca.food = 180; ca.wood = 130; ca.stone = 100; }
    if (cb) { cb.food = 4; cb.wood = 2; cb.stone = 0; }
  }
}

export function paintCircle(world, cx, cy, radius, callback) {
  for (let y = Math.floor(cy - radius); y <= Math.ceil(cy + radius); y += 1) for (let x = Math.floor(cx - radius); x <= Math.ceil(cx + radius); x += 1) {
    if (Math.hypot(x - cx, y - cy) <= radius + .3) { const tile = tileAt(world, x, y); if (tile) callback(tile, x, y); }
  }
}

export function brushBounds(cx, cy, size = 1) {
  const width = clamp(Math.round(size), 1, 10), left = cx - Math.floor(width / 2), top = cy - Math.floor(width / 2);
  return { left, top, width, right: left + width - 1, bottom: top + width - 1 };
}

export function paintSquare(world, cx, cy, size, callback) {
  const bounds = brushBounds(cx, cy, size);
  for (let y = bounds.top; y <= bounds.bottom; y += 1) for (let x = bounds.left; x <= bounds.right; x += 1) { const tile = tileAt(world, x, y); if (tile) callback(tile, x, y); }
}

export function nearestPerson(world, x, y, radius = 3) {
  return world.people.map((person) => ({ person, d: distance(person, { x, y }) })).filter((item) => item.d <= radius).sort((a, b) => a.d - b.d)[0]?.person || null;
}

function nearestCreature(world, x, y, radius = 3) {
  return world.creatures.map((creature) => ({ creature, d: distance(creature, { x, y }) })).filter((item) => item.d <= radius).sort((a, b) => a.d - b.d)[0]?.creature || null;
}

export function applyTool(world, tool, x, y, brush = 2) {
  if (TERRAIN[tool]) {
    paintSquare(world, x, y, brush, (tile) => { if (tile.type === "void") return; tile.type = tool; tile.fire = 0; tile.frost = 0; tile.plague = 0; tile.fertility = TERRAIN[tool].fertility; tile.moisture = tool === "water" ? 1 : .5; });
    return;
  }
  const factionType = tool === "aetherfolk" ? "aether" : tool;
  if (FACTION_TYPES[factionType]) { spawnSettlers(world, factionType, x, y); return; }
  if (tool.startsWith("kingdom_")) { createKingdom(world, tool.replace("kingdom_", ""), x, y); return; }
  if (CREATURE_TYPES[tool]) {
    const data = CREATURE_TYPES[tool], spot = data.habitat === "water" ? findWaterNear(world, x, y) : findLandNear(world, x, y, 8); if (!spot) return;
    const spawnCount = clamp(Math.round(brush), 1, 10);
    for (let i = 0; i < spawnCount; i += 1) { const sx = spot.x + (i % 3), sy = spot.y + Math.floor(i / 3), placed = data.habitat === "water" ? findWaterNear(world, sx, sy, 3) : findLandNear(world, sx, sy, 3); if (placed) { const id = `w${world.nextId++}`; world.creatures.push(hydrateCreature(world, { id, type: tool, name: creatureName(world, tool), x: placed.x, y: placed.y, health: data.health, maxHealth: data.health, age: 0, dx: 0, dy: 0 })); } }
    pushEvent(world, `${spawnCount} ${data.name}${spawnCount > 1 ? "s" : ""} appear in the world.`, "birth"); return;
  }
  if (tool.startsWith("vehicle_")) {
    const type = tool.replace("vehicle_", ""), data = VEHICLE_TYPES[type]; if (!data) return;
    const spot = data.habitat === "water" ? findWaterNear(world, x, y, 12) : findLandNear(world, x, y, 8); if (!spot) return;
    const city = world.cities.slice().sort((a, b) => distance(a, spot) - distance(b, spot))[0], faction = city && distance(city, spot) <= 14 ? world.factions.find((item) => item.id === city.factionId) : null;
    const vehicle = { id: `v${world.nextId++}`, type, name: vehicleName(world, faction, type), factionId: faction?.id || null, cityId: faction ? city.id : null, x: spot.x, y: spot.y, health: data.health, age: 0, dx: 0, dy: 0 };
    world.vehicles.push(vehicle); if (faction) faction.arsenal[`${type}s`] = (faction.arsenal[`${type}s`] || 0) + 1;
    pushEvent(world, `${vehicle.name} is placed${faction ? ` under ${faction.name}'s command` : " as an independent vehicle"}.`, "birth", vehicle.id); return;
  }
  if (["house", "farm", "mine", "tower", "academy", "shrine", "factory"].includes(tool)) {
    const nearbyCity = world.cities.slice().sort((a, b) => distance(a, { x, y }) - distance(b, { x, y }))[0];
    const factionId = nearbyCity && distance(nearbyCity, { x, y }) < 10 ? nearbyCity.factionId : null;
    const cityId = factionId ? nearbyCity.id : null;
    const building = addBuilding(world, tool, x, y, factionId, cityId);
    if (building) pushEvent(world, `A ${buildingName(tool)} is raised.`, "birth", building.id);
    return;
  }
  if (tool === "barrier" || tool === "erasebarrier") { paintSquare(world, x, y, brush, (tile) => { tile.barrier = tool === "barrier" ? 1 : 0; tile.fire = 0; }); return; }
  if (tool === "erase") {
    const bounds = brushBounds(x, y, brush), outside = (item) => item.x < bounds.left || item.x > bounds.right || item.y < bounds.top || item.y > bounds.bottom;
    world.people = world.people.filter(outside);
    world.creatures = world.creatures.filter(outside);
    world.vehicles = world.vehicles.filter(outside);
    world.buildings = world.buildings.filter(outside);
    world.cities = world.cities.filter(outside);
    const activeFactions = new Set([...world.cities.map((city) => city.factionId), ...world.people.map((person) => person.factionId)].filter(Boolean));
    world.factions = world.factions.filter((faction) => activeFactions.has(faction.id));
    if (![...world.people, ...world.creatures].some((item) => item.id === world.possessedId)) world.possessedId = null;
    paintSquare(world, x, y, brush, (tile) => { tile.fire = 0; tile.frost = 0; tile.plague = 0; tile.flash = 0; tile.barrier = 0; tile.owner = null; });
    return;
  }
  if (tool === "possess") {
    const person = nearestPerson(world, x, y, 3.5), creature = nearestCreature(world, x, y, 3.5);
    const target = !person ? creature : !creature ? person : distance(person, { x, y }) <= distance(creature, { x, y }) ? person : creature;
    world.possessedId = target?.id || null;
    if (target) { if (target.kind === "person") { target.mood = Math.min(100, target.mood + 8); target.expression = "amazed"; target.history.unshift(`Was possessed by a god in year ${world.year}.`); } target.emote = "✨"; target.emoteUntil = world.ticks + 12; pushEvent(world, `A god takes control of ${target.name}.`, "wonder", target.id); }
    return;
  }
  if (["mind", "magic", "might", "haste", "luck"].includes(tool)) {
    const person = nearestPerson(world, x, y, 4); if (!person) return;
    const map = { mind: "intelligence", magic: "magic", might: "strength", haste: "speed", luck: "luck" };
    const key = map[tool]; person[key] = clamp(person[key] + 20, 0, 150);
    if (tool === "might") { person.maxHealth += 20; person.health += 20; }
    const trait = { mind: "Brilliant", magic: "Arcane-touched", might: "Titan-blooded", haste: "Wind-footed", luck: "Fortune-favored" }[tool];
    if (!person.traits.includes(trait)) person.traits.push(trait);
    person.history.unshift(`Received ${TOOLS.find((t) => t.id === tool)?.label} in year ${world.year}.`);
    pushEvent(world, `${person.name} receives ${trait.toLowerCase()} power.`, "wonder", person.id); return;
  }
  if (tool === "flight" || tool === "teleport") {
    const person = nearestPerson(world, x, y, 4); if (!person) return;
    if (tool === "flight") { person.canFly = true; if (!person.traits.includes("Flying")) person.traits.push("Flying"); }
    else { person.canTeleport = true; if (!person.traits.includes("Teleporter")) person.traits.push("Teleporter"); }
    person.history.unshift(`Received ${tool === "flight" ? "flight" : "teleportation"} in year ${world.year}.`); pushEvent(world, `${person.name} can now ${tool === "flight" ? "fly" : "teleport"}.`, "wonder", person.id); return;
  }
  if (["trait", "immortal", "regeneration", "giant"].includes(tool)) {
    const person = nearestPerson(world, x, y, 4); if (!person) return;
    if (tool === "trait") { const available = TRAIT_OPTIONS.filter((trait) => !person.traits.includes(trait)); if (available.length) { const trait = available[Math.floor(Math.random() * available.length)]; person.traits.push(trait); const bonuses = { Genius: ["intelligence", 20], Strong: ["strength", 20], Fast: ["speed", 20], Lucky: ["luck", 20] }; if (bonuses[trait]) { const [key, amount] = bonuses[trait]; person[key] = clamp(person[key] + amount, 0, 150); } } }
    if (tool === "immortal") { person.immortal = true; person.traits = [...new Set([...person.traits, "Immortal"])]; person.health = person.maxHealth; }
    if (tool === "regeneration") { person.regeneration = true; person.traits = [...new Set([...person.traits, "Regeneration"])]; }
    if (tool === "giant") { person.isGiant = true; person.traits = [...new Set([...person.traits, "Giant"])]; person.strength = Math.min(150, person.strength + 35); person.maxHealth += 80; person.health = person.maxHealth; }
    person.emote = tool === "immortal" ? "✨" : tool === "giant" ? "💪" : "⭐"; person.emoteUntil = world.ticks + 14;
    person.history.unshift(`Received ${TOOLS.find((item) => item.id === tool)?.label} in year ${world.year}.`); pushEvent(world, `${person.name} receives a new divine gift.`, "wonder", person.id); return;
  }
  if (tool === "bloom") {
    paintCircle(world, x, y, 6, (tile) => { tile.fire = 0; tile.plague = 0; tile.fertility = 1; tile.flash = 1; if (tile.type === "meadow" && Math.random() < .3) tile.type = "forest"; });
    for (const person of world.people) if (distance(person, { x, y }) < 7) { person.health = person.maxHealth; person.hunger = 100; person.mood = 100; }
    pushEvent(world, "A blessing restores land and life.", "wonder"); return;
  }
  if (tool === "rain") { world.weather = { type: "rain", until: world.ticks + 80 }; paintCircle(world, x, y, 8, (tile) => { tile.fire = 0; tile.moisture = 1; tile.fertility = Math.min(1, tile.fertility + .2); }); pushEvent(world, "Rain begins to fall.", "wonder"); return; }
  if (tool === "peace") { for (const a of world.factions) for (const b of world.factions) if (a !== b) a.relations[b.id] = clamp((a.relations[b.id] || 0) + 35, -100, 100); pushEvent(world, "The kingdoms move toward peace.", "wonder"); return; }
  if (tool === "fire") { paintCircle(world, x, y, 2.5, (tile) => { if (tile.type !== "water" && tile.type !== "snow") tile.fire = 1; }); pushEvent(world, "A wildfire starts.", "danger"); return; }
  if (tool === "lightning") {
    world.effects.push({ id: `fx${world.nextId++}`, type: "lightning", x, y, until: world.ticks + 5 });
    paintCircle(world, x, y, 1.5, (tile) => { tile.flash = 1; if (tile.type !== "water" && !tile.barrier) tile.fire = Math.max(tile.fire, .8); });
    for (const person of world.people) if (distance(person, { x, y }) < 1.9) { person.health -= 85; person.expression = "shocked"; if (person.health <= 0) person.deathCause = "divine lightning"; }
    for (const creature of world.creatures) if (distance(creature, { x, y }) < 1.9) creature.health -= 100;
    for (const vehicle of world.vehicles) if (distance(vehicle, { x, y }) < 1.9) vehicle.health -= 90;
    for (const building of world.buildings) if (distance(building, { x, y }) < 1.9) building.health -= 55;
    pushEvent(world, "Divine lightning strikes the world.", "danger"); return;
  }
  if (tool === "bomb" || tool === "megabomb") {
    const radius = tool === "megabomb" ? 7 : 3.5, inner = tool === "megabomb" ? 3.2 : 1.35;
    world.effects.push({ id: `fx${world.nextId++}`, type: "explosion", x, y, radius, until: world.ticks + 6 });
    paintCircle(world, x, y, radius, (tile, tx, ty) => { const d = Math.hypot(tx - x, ty - y); tile.flash = 1; if (!tile.barrier) { tile.fire = d > inner ? 1 : .35; if (d < inner) { tile.type = d < inner * .55 ? "water" : "ridge"; tile.owner = null; } } });
    for (const person of world.people) if (distance(person, { x, y }) < radius) { person.health -= Math.max(20, (radius - distance(person, { x, y })) * (tool === "megabomb" ? 32 : 42)); person.expression = "shocked"; if (person.health <= 0) person.deathCause = tool === "megabomb" ? "a mega bomb" : "a bomb explosion"; }
    for (const creature of world.creatures) if (distance(creature, { x, y }) < radius) creature.health -= 200;
    for (const vehicle of world.vehicles) if (distance(vehicle, { x, y }) < radius) vehicle.health -= tool === "megabomb" ? 350 : 160;
    for (const building of world.buildings) if (distance(building, { x, y }) < radius) building.health -= tool === "megabomb" ? 220 : 115;
    pushEvent(world, tool === "megabomb" ? "A mega bomb devastates the region." : "A bomb explodes.", "danger"); return;
  }
  if (tool === "frost") { paintCircle(world, x, y, 6, (tile) => { if (tile.type !== "water") tile.type = "snow"; tile.frost = 1; tile.fire = 0; }); pushEvent(world, "The land freezes.", "danger"); return; }
  if (tool === "plague") { paintCircle(world, x, y, 5, (tile) => { tile.plague = 1; }); for (const person of world.people) if (distance(person, { x, y }) < 5) person.sick = true; pushEvent(world, "A plague begins to spread.", "danger"); return; }
  if (tool === "quake") { for (let i = -8; i <= 8; i += 1) paintCircle(world, x + i, Math.round(y + Math.sin(i * .8) * 2), 1.2, (tile) => { tile.type = "ridge"; tile.flash = 1; }); for (const building of world.buildings) if (distance(building, { x, y }) < 8) building.health -= 45; pushEvent(world, "An earthquake splits the land.", "danger"); return; }
  if (tool === "star") { world.effects.push({ id: `fx${world.nextId++}`, type: "meteor", x, y, radius: 6, until: world.ticks + 12 }); paintCircle(world, x, y, 4.5, (tile, tx, ty) => { if (tile.type === "void") return; const d = Math.hypot(tx - x, ty - y); tile.type = d < 2.2 ? "water" : "ridge"; tile.fire = d > 2 ? 1 : 0; tile.owner = null; tile.flash = 1; }); for (const person of world.people) if (distance(person, { x, y }) < 6) { person.health = 0; person.deathCause = "a meteor strike"; } for (const vehicle of world.vehicles) if (distance(vehicle, { x, y }) < 7) vehicle.health = 0; for (const building of world.buildings) if (distance(building, { x, y }) < 6) building.health = 0; pushEvent(world, "A meteor strikes the world.", "danger"); }
}

export function buildingName(type) {
  return ({ hall: "Town Hall", house: "House", farm: "Farm", mine: "Mine", tower: "Watchtower", academy: "Academy", shrine: "Temple", factory: "Factory" })[type] || type;
}

function chooseRole(city, world) {
  const counts = Object.fromEntries(Object.keys(ROLE_INFO).map((r) => [r, 0]));
  for (const p of world.people) if (p.homeId === city.id) counts[p.role] = (counts[p.role] || 0) + 1;
  if (counts.farmer < 2) return "farmer";
  if (counts.builder < 1) return "builder";
  if (counts.guard < 2) return "guard";
  if (counts.scholar < 1) return "scholar";
  return ["farmer", "woodcutter", "miner", "merchant", "scout", "healer"][Math.floor(Math.random() * 6)];
}

function isClaimableFrontier(world, x, y, factionId) {
  const tile = tileAt(world, x, y);
  if (!tile || tile.owner || ["water", "void"].includes(tile.type) || tile.barrier || tile.fire > .3) return false;
  for (let dy = -1; dy <= 1; dy += 1) for (let dx = -1; dx <= 1; dx += 1) {
    if (!dx && !dy) continue;
    if (tileAt(world, x + dx, y + dy)?.owner === factionId) return true;
  }
  return false;
}

function findFrontierTarget(world, person, radius = 11) {
  let best = null, bestScore = Infinity;
  for (let dy = -radius; dy <= radius; dy += 1) for (let dx = -radius; dx <= radius; dx += 1) {
    const x = person.x + dx, y = person.y + dy;
    if (!isClaimableFrontier(world, x, y, person.factionId)) continue;
    const score = Math.hypot(dx, dy) + hash(x, y, world.seed + world.ticks) * 2.2;
    if (score < bestScore) { bestScore = score; best = { x, y }; }
  }
  return best;
}

function foundFrontierVillage(world, person, tile) {
  const oldCity = world.cities.find((item) => item.id === person.homeId);
  if (!oldCity || !["scout", "settler"].includes(person.role) || oldCity.level < 2 || distance(person, oldCity) < 9) return;
  const residents = world.people.filter((item) => item.homeId === oldCity.id);
  if (residents.length < 20 || world.cities.some((item) => distance(item, person) < 7)) return;
  const city = { id: `c${world.nextId++}`, factionId: person.factionId, x: person.x, y: person.y, name: placeName(world), food: 16, wood: 8, stone: 4, ore: 0, level: 1, founded: world.year, age: 0, wall: 0 };
  world.cities.push(city); tile.cityId = city.id; person.homeId = city.id; person.role = "settler"; person.equipment = equipmentForRole("settler");
  addBuilding(world, "hall", city.x, city.y, city.factionId, city.id);
  const companions = residents.filter((item) => item !== person && distance(item, person) < 5).slice(0, 3);
  for (const companion of companions) companion.homeId = city.id;
  pushEvent(world, `${person.name} founds ${city.name} after securing frontier land.`, "birth", city.id);
}

function claimTerritory(world, person) {
  if (!person.factionId || !effectiveLaw(world, "expansion", person)) { person.claimProgress = 0; person.claimTileKey = null; return; }
  const tile = tileAt(world, person.x, person.y), key = `${person.x}:${person.y}`;
  if (!isClaimableFrontier(world, person.x, person.y, person.factionId)) { person.claimProgress = 0; person.claimTileKey = null; return; }
  if (person.claimTileKey !== key) { person.claimTileKey = key; person.claimProgress = 0; }
  person.claimProgress += 1;
  person.emote = "🚩"; person.emoteUntil = world.ticks + 2;
  if (person.claimProgress < world.claimTime) return;
  tile.owner = person.factionId; tile.cityId = person.homeId || null; person.claimProgress = 0; person.claimTileKey = null; person.emote = "🏳️"; person.emoteUntil = world.ticks + 9;
  const faction = world.factions.find((item) => item.id === person.factionId);
  const territory = world.tiles.filter((item) => item.owner === person.factionId).length;
  if (territory % 8 === 0) pushEvent(world, `${faction?.name || "A kingdom"} secures new frontier territory.`, "birth", faction?.id);
  foundFrontierVillage(world, person, tile);
}

function movePerson(world, person) {
  if (world.possessedId === person.id) return;
  const current = tileAt(world, person.x, person.y);
  if (isClaimableFrontier(world, person.x, person.y, person.factionId)) { person.claimTileKey = `${person.x}:${person.y}`; return; }
  const city = world.cities.find((c) => c.id === person.homeId);
  const role = ROLE_INFO[person.role];
  let target = city || person;
  if (role?.target && TERRAIN[role.target]) {
    let best = null, bestD = 99;
    for (let dy = -7; dy <= 7; dy += 1) for (let dx = -7; dx <= 7; dx += 1) {
      const tile = tileAt(world, person.x + dx, person.y + dy);
      if (tile?.type === role.target && Math.hypot(dx, dy) < bestD) { bestD = Math.hypot(dx, dy); best = { x: person.x + dx, y: person.y + dy }; }
    }
    if (best) target = best;
  }
  if (["scout", "settler"].includes(person.role) && person.factionId && effectiveLaw(world, "expansion", person)) {
    const frontier = findFrontierTarget(world, person);
    if (frontier) target = frontier;
  }
  if (person.role === "guard" && effectiveLaw(world, "wars", person)) {
    const enemy = world.people.find((other) => other.factionId !== person.factionId && (world.factions.find((f) => f.id === person.factionId)?.relations[other.factionId] || 0) < -35);
    if (enemy) target = enemy;
  }
  if (person.role === "merchant") {
    const foreign = world.cities.find((c) => c.factionId !== person.factionId);
    if (foreign) target = foreign;
  }
  if (person.ageTick % Math.max(2, 7 - Math.floor(person.speed / 25)) !== 0) return;
  let dx = Math.sign(target.x - person.x), dy = Math.sign(target.y - person.y);
  if (dx === 0 && dy === 0) { dx = Math.floor(Math.random() * 3) - 1; dy = Math.floor(Math.random() * 3) - 1; }
  if (Math.random() < .25) [dx, dy] = [dy, dx];
  let next = tileAt(world, person.x + dx, person.y + dy);
  if (!next || next.type === "void") { person.x += dx; person.y += dy; person.health = 0; person.voidDeath = true; person.deathCause = "the void"; return; }
  if (next?.barrier && person.canTeleport) {
    const landing = tileAt(world, person.x + dx * 2, person.y + dy * 2);
    if (landing && !landing.barrier && landing.type !== "water" && landing.fire < .4) { person.x += dx * 2; person.y += dy * 2; return; }
  }
  if (next && (!next.barrier || person.canFly) && (next.type !== "water" || person.canFly) && next.fire < .4) { person.x += dx; person.y += dy; }
}

export function controlPossessed(world, dx, dy) {
  const entity = world.people.find((item) => item.id === world.possessedId) || world.creatures.find((item) => item.id === world.possessedId); if (!entity) { world.possessedId = null; return null; }
  dx = Math.sign(dx); dy = Math.sign(dy); if (!dx && !dy) return entity;
  const creatureData = entity.kind === "creature" ? (CREATURE_TYPES[entity.type] || { habitat: entity.type === "raider" ? "air" : "land" }) : null;
  const flies = entity.canFly || creatureData?.habitat === "air", swims = creatureData?.habitat === "water";
  let next = tileAt(world, entity.x + dx, entity.y + dy);
  if (!next || next.type === "void") { entity.x += dx; entity.y += dy; entity.health = 0; entity.voidDeath = true; entity.deathCause = "the void"; entity.moving = true; return entity; }
  if (next?.barrier && entity.canTeleport) {
    const landing = tileAt(world, entity.x + dx * 2, entity.y + dy * 2);
    if (landing && !landing.barrier && (flies || swims ? swims ? landing.type === "water" : true : landing.type !== "water") && landing.fire < .4) { entity.x += dx * 2; entity.y += dy * 2; entity.moving = true; entity.animTick += 1; return entity; }
  }
  const habitatOkay = flies || (swims ? next.type === "water" : next.type !== "water");
  if ((!next.barrier || flies) && habitatOkay && next.fire < .4) { entity.x += dx; entity.y += dy; entity.moving = true; entity.animTick += 1; }
  return entity;
}

function work(world, person) {
  const city = world.cities.find((c) => c.id === person.homeId); if (!city) return;
  const tile = tileAt(world, person.x, person.y); if (!tile) return;
  const toolPower = EQUIPMENT_CATALOG[person.equipment?.tool]?.power || 0, quality = (.03 + person.intelligence / 1800 + person.luck / 3000) * (1 + toolPower / 30);
  const action = (emoji) => { if (world.ticks % 3 === 0) { person.emote = emoji; person.emoteUntil = world.ticks + 3; } };
  if (person.role === "farmer" && ["meadow", "sand"].includes(tile.type)) { city.food += quality * 2.5; action("🌾"); }
  if (person.role === "woodcutter" && tile.type === "forest") { city.wood += quality * 2; action("🪓"); }
  if (person.role === "miner" && tile.type === "ridge") { city.stone += quality * 1.6; city.ore += quality * .35; action("⛏️"); }
  if (person.role === "builder" && world.buildings.some((item) => item.cityId === city.id && distance(item, person) < 3)) action("🔨");
  if (person.role === "scholar") { const faction = world.factions.find((f) => f.id === person.factionId); faction.technology += quality * .18; faction.intelligence += quality * .1; action("📖"); }
  if (person.role === "mystic") { const faction = world.factions.find((f) => f.id === person.factionId); faction.magic += quality * .2; action("✨"); }
  if (person.role === "healer") { const patient = world.people.find((p) => p.factionId === person.factionId && p.health < p.maxHealth && distance(p, person) < 3); if (patient) { patient.health = Math.min(patient.maxHealth, patient.health + 1 + person.magic * .01); action("➕"); } }
  if (person.role === "merchant" && effectiveLaw(world, "diplomacy", person)) { const foreign = world.cities.find((c) => c.factionId !== person.factionId && distance(c, person) < 3); if (foreign) { city.food += .08; foreign.food += .08; person.inventory.coin += .04; const faction = world.factions.find((f) => f.id === person.factionId); faction.relations[foreign.factionId] = clamp((faction.relations[foreign.factionId] || 0) + .03, -100, 100); action("🪙"); } }
}

export function declareWar(world, attackerId, defenderId) {
  const attacker = world.factions.find((item) => item.id === attackerId), defender = world.factions.find((item) => item.id === defenderId);
  if (!attacker || !defender || attacker === defender || !effectiveLaw(world, "wars", attacker) || !effectiveLaw(world, "wars", defender)) return false;
  world.diplomacy ||= blankDiplomacy();
  if (world.diplomacy.wars.some((war) => war.status === "active" && samePair(war, attacker.id, defender.id))) return false;
  const sharedAlliance = activeAllianceForPair(world, attacker.id, defender.id);
  if (sharedAlliance) leaveAlliance(world, sharedAlliance, attacker.id, true, defender.id);
  attacker.relations[defender.id] = -100; defender.relations[attacker.id] = -100;
  const war = { id: `war${world.nextId++}`, attackerId: attacker.id, defenderId: defender.id, startedYear: world.year, endedYear: null, status: "active", outcome: null };
  world.diplomacy.wars.unshift(war);
  for (const person of world.people.filter((item) => item.factionId === attacker.id || item.factionId === defender.id)) if (["guard", "ruler"].includes(person.role)) { person.emote = "⚔️"; person.emoteUntil = world.ticks + 16; }
  const text = `${attacker.name} declares war on ${defender.name}.`;
  diplomacyRecord(world, "war-declared", text, { warId: war.id, attackerId: attacker.id, defenderId: defender.id });
  pushEvent(world, text, "danger", attacker.id);
  return true;
}

export function makePeace(world, factionId, otherId) {
  const faction = world.factions.find((item) => item.id === factionId), other = world.factions.find((item) => item.id === otherId);
  if (!faction || !other || faction === other) return false;
  faction.relations[other.id] = 10; other.relations[faction.id] = 10;
  const war = world.diplomacy?.wars?.find((item) => item.status === "active" && samePair(item, faction.id, other.id));
  if (war) { war.status = "ended"; war.endedYear = world.year; war.outcome = "peace treaty"; }
  const text = `${faction.name} and ${other.name} sign a peace treaty.`;
  diplomacyRecord(world, "war-ended", text, { warId: war?.id || null, factionIds: [faction.id, other.id] });
  pushEvent(world, text, "wonder", faction.id); return true;
}

export function assignVehicle(world, vehicleId, factionId = null) {
  const vehicle = world.vehicles.find((item) => item.id === vehicleId); if (!vehicle) return false;
  const oldFaction = world.factions.find((item) => item.id === vehicle.factionId), newFaction = world.factions.find((item) => item.id === factionId), arsenalKey = `${vehicle.type}s`;
  if (oldFaction?.id === newFaction?.id) return true;
  if (oldFaction) oldFaction.arsenal[arsenalKey] = Math.max(0, (oldFaction.arsenal[arsenalKey] || 0) - 1);
  if (newFaction) newFaction.arsenal[arsenalKey] = (newFaction.arsenal[arsenalKey] || 0) + 1;
  vehicle.factionId = newFaction?.id || null;
  vehicle.cityId = newFaction ? world.cities.filter((city) => city.factionId === newFaction.id).sort((a, b) => distance(a, vehicle) - distance(b, vehicle))[0]?.id || null : null;
  vehicle.name = vehicleName(world, newFaction, vehicle.type);
  pushEvent(world, `${vehicle.name} is reassigned to ${newFaction?.name || "independent command"}.`, "calm", vehicle.id);
  return true;
}

function kingdomsShareBorder(world, firstId, secondId) {
  for (let y = 1; y < ROWS - 1; y += 1) for (let x = 1; x < COLS - 1; x += 1) {
    if (tileAt(world, x, y)?.owner !== firstId) continue;
    if (tileAt(world, x + 1, y)?.owner === secondId || tileAt(world, x - 1, y)?.owner === secondId || tileAt(world, x, y + 1)?.owner === secondId || tileAt(world, x, y - 1)?.owner === secondId) return true;
  }
  return false;
}

export function simulateWorld(world) {
  world.ticks += 1;
  world.effects = (world.effects || []).filter((effect) => effect.until > world.ticks);
  if (world.ticks % YEAR_TICKS === 0) world.year += 1;
  world.season = Math.floor((world.ticks % YEAR_TICKS) / 4);
  if (world.weather.until <= world.ticks) world.weather.type = "clear";

  if (world.ticks % 3 === 0) {
    const burning = [];
    for (let y = 0; y < ROWS; y += 1) for (let x = 0; x < COLS; x += 1) {
      const tile = tileAt(world, x, y); tile.flash = Math.max(0, tile.flash - .14); tile.frost = Math.max(0, tile.frost - .004); tile.plague = Math.max(0, tile.plague - .002);
      if (world.weather.type === "rain") { tile.fire = Math.max(0, tile.fire - .15); tile.moisture = Math.min(1, tile.moisture + .04); }
      if (tile.fire > 0) { tile.fire -= .06 + tile.moisture * .04; tile.fertility = Math.max(.04, tile.fertility - .02); if (tile.fire <= 0) { tile.fire = 0; if (tile.type === "forest") tile.type = "meadow"; } else burning.push({ x, y, owner: tile.owner }); }
    }
      for (const spot of burning) { const faction = spot.owner ? world.factions.find((item) => item.id === spot.owner) : null; if (effectiveLaw(world, "fireSpread", faction) && Math.random() < .14) { const next = tileAt(world, spot.x + Math.floor(Math.random() * 3) - 1, spot.y + Math.floor(Math.random() * 3) - 1); if (next && !next.barrier && !["water", "snow", "void"].includes(next.type)) next.fire = Math.max(next.fire, .8); } }
  }

  for (const person of world.people) {
    person.loverIds ||= []; person.lawOverrides ||= {};
    person.gender ||= genderFor(world, person.id);
    if (person.emoteUntil <= world.ticks) person.emote = null;
    person.ageTick = (person.ageTick || 0) + 1;
    if (effectiveLaw(world, "aging", person)) person.ageYears += 1 / YEAR_TICKS;
    if (effectiveLaw(world, "hunger", person)) person.hunger -= .06 + person.strength * .0002;
    const home = world.cities.find((c) => c.id === person.homeId);
    if (person.hunger < 40 && home?.food > .4) { home.food -= .4; person.hunger = Math.min(100, person.hunger + 20); }
    if (person.hunger <= 0) { person.health -= .45; person.mood = Math.max(0, person.mood - .3); if (person.health <= 0) person.deathCause = "starvation"; }
    const tile = tileAt(world, person.x, person.y);
    if (tile?.fire > .2) { person.health -= 2; if (person.health <= 0) person.deathCause = "fire"; }
    if (tile?.plague > .2 && Math.random() < .012) person.sick = true;
    if (person.sick) { person.health -= .08; if (person.health <= 0) person.deathCause = "Grey Blight"; if (Math.random() < .001 + person.magic / 200000) { person.sick = false; person.history.unshift(`Recovered from Grey Blight in year ${world.year}.`); } }
    if (!person.immortal && person.ageYears > 72 + person.luck * .18) { person.health -= .06; if (person.health <= 0) person.deathCause = "old age"; }
    if (person.regeneration) person.health = Math.min(person.maxHealth, person.health + 1.2);
    const beforeX = person.x, beforeY = person.y; person.moving = false; movePerson(world, person); person.moving = person.x !== beforeX || person.y !== beforeY; person.animTick += 1; claimTerritory(world, person); work(world, person);
    if (person.immortal && person.health <= 0 && !person.voidDeath) { person.health = Math.max(1, person.maxHealth * .25); person.deathCause = null; }
    if (person.sick) person.expression = "sick"; else if (tile?.fire > .2) person.expression = "shocked"; else if (person.hunger < 25) person.expression = "hungry"; else if (person.health < person.maxHealth * .35) person.expression = "hurt"; else if (person.mood > 78) person.expression = "happy"; else if (person.mood < 35) person.expression = "sad"; else person.expression = "neutral";
    if (Math.random() < .0025) {
      const friend = world.people.find((other) => other !== person && distance(other, person) < 2.5 && (person.loverIds.includes(other.id) || person.friendIds.includes(other.id) || other.homeId === person.homeId));
      if (friend) { person.emote = "❤️"; person.emoteUntil = world.ticks + 10; friend.emote = "❤️"; friend.emoteUntil = world.ticks + 10; person.mood = Math.min(100, person.mood + 2); }
    }
    if (person.ageYears >= 16 && !person.loverIds.length && Math.random() < .0009) {
      const lover = world.people.find((other) => other !== person && other.ageYears >= 16 && other.factionId === person.factionId && other.homeId === person.homeId && !other.loverIds.length && !person.parents.includes(other.id) && !person.children.includes(other.id) && distance(other, person) < 2.8);
      if (lover) { person.loverIds.push(lover.id); lover.loverIds.push(person.id); person.emote = "❤️"; lover.emote = "❤️"; person.emoteUntil = lover.emoteUntil = world.ticks + 16; person.history.unshift(`Became lovers with ${lover.name} in year ${world.year}.`); lover.history.unshift(`Became lovers with ${person.name} in year ${world.year}.`); pushEvent(world, `${person.name} and ${lover.name} become lovers.`, "wonder", person.id); }
    }
    const enemy = world.people.find((other) => other !== person && other.factionId !== person.factionId && distance(other, person) < 1.3);
    if (enemy && effectiveLaw(world, "wars", person)) {
      const relation = world.factions.find((f) => f.id === person.factionId)?.relations[enemy.factionId] ?? 0;
      if (relation < -35 && ["guard", "ruler"].includes(person.role)) { const weapon = EQUIPMENT_CATALOG[person.equipment?.weapon], armor = EQUIPMENT_CATALOG[enemy.equipment?.armor]; const damage = Math.max(1, 1.5 + person.strength * .045 + person.magic * .02 + (weapon?.damage || 0) * .18 - enemy.strength * .01 - (armor?.defense || 0) * .07); enemy.health -= damage; person.emote = "⚔️"; person.emoteUntil = world.ticks + 3; if (enemy.health <= 0) { enemy.deathCause = `combat with ${person.name}`; person.kills += 1; person.experience += 12; person.history.unshift(`Defeated ${enemy.name} in year ${world.year}.`); } }
    }
  }

  const dead = world.people.filter((p) => p.health <= 0);
  for (const person of dead) { world.effects.push({ id: `fx${world.nextId++}`, type: "death", x: person.x, y: person.y, voidDeath: Boolean(person.voidDeath), until: world.ticks + 9 }); const cause = person.deathCause || (person.voidDeath ? "the void" : "their injuries"); pushEvent(world, `${person.name}, ${ROLE_INFO[person.role]?.name || person.role}, died from ${cause}.`, "danger", person.id); }
  world.people = world.people.filter((p) => p.health > 0);
  if (dead.length) { const deadIds = new Set(dead.map((person) => person.id)); for (const person of world.people) person.loverIds = person.loverIds.filter((id) => !deadIds.has(id)); }
  for (const faction of world.factions) if (!world.people.some((person) => person.id === faction.leaderId)) { const successor = world.people.filter((person) => person.factionId === faction.id && person.ageYears >= 16).sort((a, b) => (b.intelligence + b.strength + b.experience) - (a.intelligence + a.strength + a.experience))[0]; if (successor) { successor.role = "ruler"; successor.equipment = equipmentForRole("ruler"); successor.traits = [...new Set([...successor.traits, "Crowned"])]; successor.emote = "👑"; successor.emoteUntil = world.ticks + 18; faction.leaderId = successor.id; pushEvent(world, `${successor.name} is crowned king of ${faction.name}.`, "wonder", successor.id); } }

  for (const city of world.cities) {
    city.age += 1;
    const residents = world.people.filter((p) => p.homeId === city.id);
    for (const building of world.buildings.filter((b) => b.cityId === city.id)) {
      if (building.type === "farm") city.food += .045 * building.level;
      if (building.type === "mine") { city.stone += .025 * building.level; city.ore += .008 * building.level; }
      if (building.type === "academy") { const faction = world.factions.find((f) => f.id === city.factionId); faction.technology += .012 * building.level; faction.intelligence += .006; }
      if (building.type === "shrine") world.factions.find((f) => f.id === city.factionId).magic += .012 * building.level;
      if (building.type === "factory") {
        const faction = world.factions.find((f) => f.id === city.factionId); if (!faction) continue; building.productionProgress += .18 + faction.technology * .0025; building.production = building.productionProgress;
        if (building.productionProgress >= 100) {
          building.productionProgress = 0; faction.arsenal.guns += 12; let type = null;
          for (const guard of world.people.filter((person) => person.factionId === faction.id && person.role === "guard" && person.equipment?.weapon !== "rifle").slice(0, 3)) guard.equipment.weapon = "rifle";
          if (faction.technology >= 92) type = ["carrier", "warship", "plane", "tank"][world.nextId % 4]; else if (faction.technology >= 78) type = ["warship", "tank", "plane", "boat"][world.nextId % 4]; else if (faction.technology >= 58) type = ["tank", "boat"][world.nextId % 2];
          if (type) { const data = VEHICLE_TYPES[type], spawn = data.habitat === "water" ? findWaterNear(world, building.x, building.y, 12) : { x: building.x + 1, y: building.y }; if (spawn) { const vehicle = { id: `v${world.nextId++}`, type, name: vehicleName(world, faction, type), factionId: faction.id, cityId: city.id, x: spawn.x, y: spawn.y, health: data.health, age: 0, dx: 0, dy: 0 }; world.vehicles.push(vehicle); faction.arsenal[`${type}s`] += 1; pushEvent(world, `${building.name} completes ${vehicle.name}.`, "birth", vehicle.id); } }
          else pushEvent(world, `${building.name} delivers new guns to ${faction.name}.`, "birth", building.id);
        }
      }
    }
    const birthCycle = residents.some((person) => person.traits.includes("Fertile")) ? 36 : 54;
    const cityFaction = world.factions.find((f) => f.id === city.factionId);
    for (const parent of residents.filter((person) => person.pregnancy && person.pregnancy.dueTick <= world.ticks && effectiveLaw(world, "births", person))) {
      const partner = world.people.find((person) => person.id === parent.pregnancy.partnerId), parentIds = [parent.id, partner?.id].filter(Boolean), faction = world.factions.find((item) => item.id === city.factionId);
      const child = addPerson(world, faction, city, "child", 0, parentIds); parent.children.push(child.id); if (partner) partner.children.push(child.id);
      child.history = [`Born in ${city.name} in year ${world.year}.`]; parent.history.unshift(`Gave birth to ${child.name} in year ${world.year}.`); if (partner) partner.history.unshift(`Welcomed ${child.name} in year ${world.year}.`);
      parent.pregnancy = null; parent.recentBirthUntil = world.ticks + 10; parent.emote = "👶"; parent.emoteUntil = world.ticks + 12; city.food = Math.max(0, city.food - 6); pushEvent(world, `${child.name} is born in ${city.name}.`, "birth", child.id);
    }
    if (effectiveLaw(world, "births", cityFaction) && city.food > 18 && residents.length < 55 && city.age % birthCycle === 0) {
      const adults = residents.filter((person) => person.ageYears >= 18 && effectiveLaw(world, "births", person)), possibleParents = adults.filter((person) => ["Female", "Nonbinary"].includes(person.gender) && person.ageYears <= 48 && !person.pregnancy);
      if (adults.length >= 2 && possibleParents.length) {
        const parent = possibleParents[Math.floor(Math.random() * possibleParents.length)], knownLover = adults.find((person) => parent.loverIds.includes(person.id)), others = adults.filter((person) => person !== parent), partner = knownLover || others[Math.floor(Math.random() * others.length)];
        if (partner) { if (!parent.loverIds.length && !partner.loverIds.length) { parent.loverIds.push(partner.id); partner.loverIds.push(parent.id); } parent.pregnancy = { partnerId: partner.id, conceivedTick: world.ticks, dueTick: world.ticks + PREGNANCY_TICKS }; parent.history.unshift(`Became pregnant in year ${world.year}.`); parent.emote = "💞"; parent.emoteUntil = world.ticks + 8; }
      }
    }
    for (const child of residents.filter((p) => p.role === "child" && p.ageYears >= 16)) { child.role = chooseRole(city, world); child.equipment = equipmentForRole(child.role); child.history.unshift(`Became a ${ROLE_INFO[child.role].name} in year ${world.year}.`); }
    if (city.level < 5 && residents.length > city.level * 9 && city.wood > 15 * city.level && city.stone > 10 * city.level) { city.wood -= 15 * city.level; city.stone -= 10 * city.level; city.level += 1; city.wall += .2; pushEvent(world, `${city.name} grows into a tier ${city.level} settlement.`, "birth", city.id); }
    const builders = residents.filter((p) => p.role === "builder");
    if (builders.length && city.age % 76 === 0 && city.wood > 10 && city.stone > 5) {
      const faction = world.factions.find((f) => f.id === city.factionId);
      const owned = world.buildings.filter((b) => b.cityId === city.id);
      let type = owned.filter((b) => b.type === "house").length < Math.ceil(residents.length / 8) ? "house" : owned.filter((b) => b.type === "farm").length < Math.ceil(residents.length / 12) ? "farm" : null;
      if (!type && faction.technology > 35 && !owned.some((b) => b.type === "academy")) type = "academy";
      if (!type && faction.magic > 35 && !owned.some((b) => b.type === "shrine")) type = "shrine";
      if (!type && faction.technology > 52 && !owned.some((b) => b.type === "factory")) type = "factory";
      if (!type && city.level >= 2 && !owned.some((b) => b.type === "tower")) type = "tower";
      if (!type && !owned.some((b) => b.type === "mine")) type = "mine";
      if (type) {
        for (let attempt = 0; attempt < 18; attempt += 1) {
          const bx = city.x + Math.floor(Math.random() * 9) - 4, by = city.y + Math.floor(Math.random() * 9) - 4;
          if (tileAt(world, bx, by)?.owner === city.factionId && addBuilding(world, type, bx, by, city.factionId, city.id)) { city.wood -= 10; city.stone -= 5; for (const builder of builders) { builder.emote = "🔨"; builder.emoteUntil = world.ticks + 10; } pushEvent(world, `${city.name} builds a ${buildingName(type)}.`, "birth", city.id); break; }
        }
      }
    }
  }

  world.buildings = world.buildings.filter((b) => b.health > 0);
  for (const creature of world.creatures) {
    if (!creature.immortal) creature.age += 1; creature.animTick = (creature.animTick || 0) + 1; if (creature.emoteUntil <= world.ticks) creature.emote = null;
    const data = CREATURE_TYPES[creature.type] || { habitat: creature.type === "raider" ? "air" : "land", predator: creature.type === "raider" };
    if (world.possessedId !== creature.id) {
      const pace = creature.traits?.includes("Swift") || creature.traits?.includes("Fast") ? 2 : creature.type === "rabbit" ? 3 : 5;
      if (creature.age % pace === 0) { creature.dx = Math.floor(Math.random() * 3) - 1; creature.dy = Math.floor(Math.random() * 3) - 1; }
      const next = tileAt(world, creature.x + creature.dx, creature.y + creature.dy), flies = data.habitat === "air", swims = data.habitat === "water";
      if (!next || next.type === "void") { creature.x += creature.dx; creature.y += creature.dy; creature.health = 0; creature.voidDeath = true; creature.deathCause = "the void"; }
      else if ((!next.barrier || flies) && (swims ? next.type === "water" : flies || next.type !== "water") && next.fire < .2) { creature.x += creature.dx; creature.y += creature.dy; }
    }
    if (creature.type === "moth") { const tile = tileAt(world, creature.x, creature.y); if (tile) tile.fertility = Math.min(1, tile.fertility + .002); }
    if ((data.predator || creature.traits?.includes("Aggressive")) && creature.age % 4 === 0) { const prey = world.people.map((person) => ({ person, d: distance(person, creature) })).filter((item) => item.d < 1.5).sort((a, b) => a.d - b.d)[0]?.person; if (prey) { prey.health -= (creature.type === "bear" ? 9 : creature.type === "wolf" ? 5 : 4) + (creature.traits?.includes("Strong") ? 3 : 0); prey.expression = "shocked"; if (prey.health <= 0) prey.deathCause = `an attack by ${creature.name}`; creature.emote = "💢"; creature.emoteUntil = world.ticks + 4; } }
    if (creature.regeneration) creature.health = Math.min(creature.maxHealth, creature.health + 1.2);
    if (creature.immortal && creature.health <= 0 && !creature.voidDeath) { creature.health = Math.max(1, creature.maxHealth * .25); creature.deathCause = null; }
  }
  for (const creature of world.creatures.filter((item) => item.health <= 0)) world.effects.push({ id: `fx${world.nextId++}`, type: "death", x: creature.x, y: creature.y, voidDeath: Boolean(creature.voidDeath), until: world.ticks + 8 });
  world.creatures = world.creatures.filter((c) => c.health > 0 && (c.immortal || c.age < 1200));
  if (![...world.people, ...world.creatures].some((item) => item.id === world.possessedId)) world.possessedId = null;
  for (const vehicle of world.vehicles) {
    vehicle.age += 1; const data = VEHICLE_TYPES[vehicle.type], faction = world.factions.find((item) => item.id === vehicle.factionId), isEnemy = (factionId) => factionId && factionId !== vehicle.factionId && (faction?.relations[factionId] || 0) < -35;
    const enemyVehicle = world.vehicles.filter((item) => item !== vehicle && isEnemy(item.factionId)).sort((a, b) => distance(a, vehicle) - distance(b, vehicle))[0], enemyCity = world.cities.filter((city) => isEnemy(city.factionId)).sort((a, b) => distance(a, vehicle) - distance(b, vehicle))[0];
    let destination = enemyVehicle || enemyCity;
    if (destination && data.habitat === "water" && tileAt(world, destination.x, destination.y)?.type !== "water") destination = findWaterNear(world, destination.x, destination.y, 11) || destination;
    if (vehicle.age % 3 === 0) {
      if (destination && distance(vehicle, destination) > data.range * .7) { vehicle.dx = Math.sign(destination.x - vehicle.x); vehicle.dy = Math.sign(destination.y - vehicle.y); }
      else if (!destination) { vehicle.dx = Math.floor(Math.random() * 3) - 1; vehicle.dy = Math.floor(Math.random() * 3) - 1; } else { vehicle.dx = 0; vehicle.dy = 0; }
      const next = tileAt(world, vehicle.x + vehicle.dx, vehicle.y + vehicle.dy); if (!next || next.type === "void") { vehicle.x += vehicle.dx; vehicle.y += vehicle.dy; vehicle.health = 0; vehicle.voidDeath = true; vehicle.deathCause = "the void"; } else if ((!next.barrier || data.habitat === "air") && (data.habitat === "air" || (data.habitat === "water" ? next.type === "water" : next.type !== "water"))) { vehicle.x += vehicle.dx; vehicle.y += vehicle.dy; }
    }
    const cooldown = vehicle.type === "carrier" ? 7 : vehicle.type === "warship" ? 5 : 4;
    if (faction && effectiveLaw(world, "wars", faction) && vehicle.age % cooldown === 0) {
      const targets = [...world.vehicles.filter((item) => item !== vehicle && isEnemy(item.factionId)), ...world.people.filter((item) => isEnemy(item.factionId)), ...world.buildings.filter((item) => isEnemy(item.factionId))].filter((item) => distance(item, vehicle) <= data.range).sort((a, b) => distance(a, vehicle) - distance(b, vehicle));
      const target = targets[0]; if (target) { target.health -= data.damage; if (target.kind === "person") { target.expression = "shocked"; if (target.health <= 0) target.deathCause = `an attack by ${vehicle.name}`; } world.effects.push({ id: `fx${world.nextId++}`, type: vehicle.type === "carrier" ? "airstrike" : "shell", x: target.x, y: target.y, fromX: vehicle.x, fromY: vehicle.y, until: world.ticks + 5 }); }
    }
  }
  for (const vehicle of world.vehicles.filter((item) => item.health <= 0)) world.effects.push({ id: `fx${world.nextId++}`, type: "death", x: vehicle.x, y: vehicle.y, voidDeath: Boolean(vehicle.voidDeath), until: world.ticks + 9 });
  world.vehicles = world.vehicles.filter((vehicle) => vehicle.health > 0);

  if (world.ticks % 24 === 0) for (const type of Object.keys(FACTION_TYPES)) {
    const independent = world.people.filter((person) => !person.factionId && person.species === type && person.ageYears >= 16 && effectiveLaw(world, "expansion", person));
    for (const founder of independent) {
      const group = independent.filter((person) => distance(person, founder) <= 6).slice(0, 8);
      if (group.length >= 4) { const x = Math.round(group.reduce((sum, p) => sum + p.x, 0) / group.length), y = Math.round(group.reduce((sum, p) => sum + p.y, 0) / group.length); createKingdom(world, type, x, y, group); break; }
    }
  }

  if (world.ticks % 48 === 0) for (let i = 0; i < world.factions.length; i += 1) for (let j = i + 1; j < world.factions.length; j += 1) {
    const a = world.factions[i], b = world.factions[j]; if (!effectiveLaw(world, "diplomacy", a) || !effectiveLaw(world, "diplomacy", b)) continue;
    const before = a.relations[b.id] || 0, atWar = before < -35, borders = kingdomsShareBorder(world, a.id, b.id) || world.cities.some((ca) => ca.factionId === a.id && world.cities.some((cb) => cb.factionId === b.id && distance(ca, cb) < 15));
    const leaderA = world.people.find((person) => person.id === a.leaderId), leaderB = world.people.find((person) => person.id === b.leaderId), aggressive = leaderA?.traits.includes("Aggressive") || leaderB?.traits.includes("Aggressive"), peaceful = leaderA?.traits.includes("Peaceful") || leaderB?.traits.includes("Peaceful");
    const foodA = world.cities.filter((city) => city.factionId === a.id).reduce((sum, city) => sum + city.food, 0), foodB = world.cities.filter((city) => city.factionId === b.id).reduce((sum, city) => sum + city.food, 0), scarcity = foodA < 12 || foodB < 12;
    const tension = .47 + (borders ? .16 : 0) + (aggressive ? .1 : 0) + (scarcity ? .07 : 0) - (peaceful ? .12 : 0);
    const after = clamp(before + (Math.random() - tension) * (atWar ? 5 : 11), -100, 100); a.relations[b.id] = after; b.relations[a.id] = after;
    if (!atWar && effectiveLaw(world, "wars", a) && effectiveLaw(world, "wars", b) && (after < -35 || (borders && after < -15 && Math.random() < .1))) declareWar(world, a.id, b.id);
    else if (atWar && Math.random() < .035 && after > -78) makePeace(world, a.id, b.id);
    else if (before <= 40 && after > 40) formAlliance(world, a.id, b.id);
    else if (before >= 25 && after < 25) { const alliance = activeAllianceForPair(world, a.id, b.id); if (alliance) leaveAlliance(world, alliance, after < 0 ? (Math.random() < .5 ? a.id : b.id) : (a.culture < b.culture ? a.id : b.id)); }
  }

  if (world.scenario === "memory-fog" && world.year > 1 && world.year % 100 === 0 && world.ticks % YEAR_TICKS === 0) { for (const faction of world.factions) { faction.intelligence = Math.max(5, faction.intelligence * .45); faction.technology = Math.max(3, faction.technology * .5); } pushEvent(world, "The Century Fog erases half of recorded knowledge.", "danger"); }
  if (world.scenario === "sky-cycle" && world.year > 1 && world.year % 75 === 0 && world.ticks % YEAR_TICKS === 0) { const edge = findLandNear(world, 2, Math.floor(Math.random() * ROWS), 8); if (edge) for (let i = 0; i < 6; i += 1) { const id = `w${world.nextId++}`; world.creatures.push(hydrateCreature(world, { id, type: "raider", name: creatureName(world, "raider"), x: edge.x, y: edge.y, health: 110, maxHealth: 110, age: 0, dx: 1, dy: 0, traits: ["Aggressive", "Swift"] })); } pushEvent(world, "Starling Raiders descend for their cyclical trial.", "danger"); }
  if (world.ticks % 360 === 0 && (effectiveLaw(world, "randomEvents") || world.factions.some((faction) => effectiveLaw(world, "randomEvents", faction)))) {
    const roll = Math.random();
    if (roll < .33) { world.weather = { type: "rain", until: world.ticks + 90 }; pushEvent(world, "A long season of rain begins.", "calm"); }
    else if (roll < .66) { const affected = world.cities.filter((city) => effectiveLaw(world, "randomEvents", world.factions.find((faction) => faction.id === city.factionId))); for (const city of affected) city.food = Math.max(0, city.food - 8); if (affected.length) pushEvent(world, "A drought reduces food stores across the world.", "danger"); }
    else { const eligible = world.cities.filter((city) => effectiveLaw(world, "randomEvents", world.factions.find((faction) => faction.id === city.factionId))), city = eligible[Math.floor(Math.random() * eligible.length)]; if (city) { city.food += 24; city.wood += 12; pushEvent(world, `${city.name} discovers a rich resource deposit.`, "wonder", city.id); } }
  }
}

export function worldStats(world) {
  const burning = world.tiles.filter((t) => t.fire > 0).length;
  const fertile = world.tiles.filter((t) => !["water", "void"].includes(t.type) && t.fertility > .6).length;
  const land = world.tiles.filter((t) => !["water", "void"].includes(t.type)).length || 1;
  const trackedWars = world.diplomacy?.wars?.filter((war) => war.status === "active").length, wars = Number.isFinite(trackedWars) ? trackedWars : world.factions.reduce((sum, f) => sum + Object.values(f.relations).filter((r) => r < -35).length, 0) / 2;
  return { population: world.people.length, wildlife: world.creatures.length, vehicles: world.vehicles.length, cities: world.cities.length, kingdoms: world.factions.length, buildings: world.buildings.length, burning, wars, harmony: clamp(Math.round((fertile / land) * 70 + 32 - burning * .4 - wars * 8), 0, 100) };
}

export function entityAt(world, x, y) {
  const person = nearestPerson(world, x, y, 1.7); if (person) return { type: "person", id: person.id };
  const creature = world.creatures.map((item) => ({ item, d: distance(item, { x, y }) })).filter((i) => i.d < 1.8).sort((a, b) => a.d - b.d)[0]?.item; if (creature) return { type: "creature", id: creature.id };
  const vehicle = world.vehicles.map((item) => ({ item, d: distance(item, { x, y }) })).filter((i) => i.d < 1.8).sort((a, b) => a.d - b.d)[0]?.item; if (vehicle) return { type: "vehicle", id: vehicle.id };
  const building = world.buildings.find((b) => distance(b, { x, y }) < 1.5); if (building) return { type: "building", id: building.id };
  const city = world.cities.find((c) => distance(c, { x, y }) < 2); if (city) return { type: "city", id: city.id };
  const tile = tileAt(world, x, y); return tile ? { type: "tile", x, y } : null;
}

export function getEntity(world, ref) {
  if (!ref) return null;
  if (ref.type === "person") return world.people.find((p) => p.id === ref.id);
  if (ref.type === "creature") return world.creatures.find((p) => p.id === ref.id);
  if (ref.type === "vehicle") return world.vehicles.find((p) => p.id === ref.id);
  if (ref.type === "building") return world.buildings.find((p) => p.id === ref.id);
  if (ref.type === "city") return world.cities.find((p) => p.id === ref.id);
  if (ref.type === "faction") return world.factions.find((p) => p.id === ref.id);
  if (ref.type === "tile") return tileAt(world, ref.x, ref.y);
  return null;
}
