# World Forge

World Forge is an original pixel-art world sandbox simulator. Create terrain, people, kingdoms, buildings, animals, powers, and disasters, then inspect or directly change every simulated person.

## Play locally

Double-click **Run World Forge.cmd**. The game opens at `http://127.0.0.1:5173/`.

For development:

```powershell
pnpm install
pnpm dev
```

Create a production build with `pnpm build`.

## Current features

- Pixel-art people with visible jobs: rulers, farmers, woodcutters, miners, builders, scholars, mages, healers, guards, scouts, merchants, and children
- Full person dossiers with editable intelligence, magic, strength, speed, and luck
- Age, health, hunger, mood, experience, kills, traits, inventory, parents, children, friends, enemies, and life history
- Independent humans, dwarves, elves, and orcs that autonomously found kingdoms, choose jobs, build farms, and expand cities
- Kingdom intelligence, magic, technology, culture, diplomacy, alliances, autonomous conflict, and prominent Declare War / Make Peace controls
- Houses, farms, mines, town halls, watchtowers, academies, temples, and factories that produce guns, tanks, boats, and planes
- Water, grass, forest, mountains, desert, snow, and enchanted terrain
- Exact square terrain brushes from 1×1 through 10×10 map pixels, with a matching square cursor preview
- Blessing, rain, peace, fire, earthquake, plague, freeze, and meteor powers
- World laws for birth, aging, expansion, diplomacy, war, hunger, fire spread, and random events
- A focused Normal World mode, with the experiment selector clearly marked as coming soon
- Seven selectable map styles, including a detailed Earth world map with shaped coastlines, real-world biome regions, major ranges, rivers, lakes, islands, and geographic labels
- Smooth mouse-wheel zoom, right/middle-drag panning, WASD/arrow-key movement, and a clickable world minimap
- Zoom-dependent detail: close views show individual pixel-art people, roles, buildings, and borders; far views strongly color each kingdom's territory and show nation names and population
- Indestructible drawable barriers rendered as continuous connected walls, with flight and teleportation as exceptions
- Fine-resolution variable-sized worlds up to 192×144, a detailed Earth map, and a surrounding void that can be explored by zooming far out
- Distinct named rabbits, deer, sheep, chickens, wolves, bears, fish, boars, moths, and raiders
- Animal brush count controls the exact number of creatures placed in each group, from 1 through 10
- Idle, blinking, walking, arm, leg, facial-expression, pixel explosion, lightning, meteor, factory-smoke, and death animations
- Contextual emoji reactions for love, building, farming, mining, research, healing, trade, frontier claiming, and combat
- Delayed pregnancy and birth simulation: conception begins a nine-month in-world countdown before a child is born
- Multi-status person dossiers that can simultaneously show pregnancy, work, travel, possession, illness, hunger, frontier claiming, and wartime state beside the current expression
- Direct person or animal possession with WASD or arrow-key control
- Editable personality and divine traits, including immortality, regeneration, giant size, fertility, genius, strength, speed, and luck
- Lightning, bombs, mega bombs, and a universal eraser for living things, buildings, hazards, barriers, and settlements
- Renaming and camera-following for people, animals, vehicles, cities, kingdoms, buildings, and terrain
- Inspect-hover name labels, visible genders, recorded lovers, and autonomous romance
- Per-kingdom and per-person law overrides with World, Allow, and Ban settings
- Immortal people stop aging by default unless given a personal aging override
- Favorite people with permanent gold stars; kings wear unmistakable crowns and kingdoms choose successors
- Visible colored territory borders and instant void death for walkers, wildlife, and vehicles that leave the world
- Organic resident-driven territory: people must stand on adjacent unclaimed land until the adjustable claim timer completes, and frontier settlers can found new villages
- Large collision-checked name pools with gender-appropriate first names; most children inherit their father's surname while some inherit another family name or receive a new surname
- Editable animal traits, plus visibly rendered tools, weapons, and armor with an always-present equipment panel in every person dossier
- Direct tank, plane, and patrol-boat placement, with vehicle dossiers that can reassign command to any kingdom or leave the vehicle independent
- Distinct warships and aircraft carriers that fight enemy vessels, bombard coastal land, and show shell or carrier-air-strike animations
- Clickable lovers, parents, children, friends, enemies, and rulers that immediately start camera following
- A 200-entry scrollable World History that preserves your reading position while new events arrive and records specific causes of death
- A right-side diplomacy ledger with active aggressors and defenders, past wars, named alliances, betrayals, peaceful departures, and a direct war launcher
- Six device-local save slots and offline installation support
- A right-side information panel with a Verdant Guard-style draggable width control, keyboard resizing, and text that scales up as the panel widens
- A save-before-menu prompt with save-and-return, return-without-saving, and cancel choices
- An in-game Reload Update button that preserves the current world behind a full updating screen while the new build loads

All names, code, graphics, systems, and assets are original. No account or online service is connected.
