import { COLS, ROWS, TERRAIN, ROLE_INFO, FACTION_TYPES, brushBounds, clamp, entityAt, getEntity, hash, indexAt } from "./engine";

function pixel(ctx, x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(Math.round(x), Math.round(y), Math.max(1, Math.round(w)), Math.max(1, Math.round(h)));
}

function drawTerrainDetail(ctx, type, x, y, w, h, noise) {
  if (noise < .48) return;
  if (type === "water") {
    pixel(ctx, x + w * .18, y + h * .55, w * .42, 1, "#63a6b0");
    pixel(ctx, x + w * .52, y + h * .35, w * .28, 1, "#39798b");
  } else if (type === "forest") {
    pixel(ctx, x + w * .43, y + h * .45, Math.max(1, w * .14), h * .5, "#5b452d");
    pixel(ctx, x + w * .12, y - h * .12, w * .76, h * .68, "#194d31");
    pixel(ctx, x + w * .24, y - h * .3, w * .52, h * .56, "#44864f");
    pixel(ctx, x + w * .34, y - h * .19, w * .21, h * .16, "#69a958");
  } else if (type === "ridge") {
    pixel(ctx, x + w * .18, y + h * .62, w * .66, h * .24, "#595653");
    pixel(ctx, x + w * .35, y + h * .3, w * .38, h * .42, "#a59d94");
    pixel(ctx, x + w * .45, y + h * .25, w * .15, h * .16, "#d0c9c1");
  } else if (type === "meadow") {
    pixel(ctx, x + w * .3, y + h * .55, 1, h * .25, "#b4cb6c");
    pixel(ctx, x + w * .52, y + h * .46, 1, h * .3, "#496f37");
  } else if (type === "sand") {
    pixel(ctx, x + w * .25, y + h * .65, w * .14, 1, "#e2c37b");
    pixel(ctx, x + w * .58, y + h * .38, w * .18, 1, "#9f7842");
  } else if (type === "snow") {
    pixel(ctx, x + w * .25, y + h * .35, 1, 1, "#ffffff");
    pixel(ctx, x + w * .68, y + h * .68, 1, 1, "#7aa8ad");
  } else if (type === "aether") {
    pixel(ctx, x + w * .44, y + h * .27, w * .18, h * .42, "#d1a7ff");
    pixel(ctx, x + w * .49, y + h * .15, w * .08, h * .18, "#f0dcff");
  }
}

function drawBarrier(ctx, world, gx, gy, tileW, tileH) {
  const x = gx * tileW, y = gy * tileH, cx = x + tileW / 2, cy = y + tileH / 2;
  const has = (nx, ny) => nx >= 0 && ny >= 0 && nx < COLS && ny < ROWS && world.tiles[indexAt(nx, ny)]?.barrier;
  const left = has(gx - 1, gy), right = has(gx + 1, gy), up = has(gx, gy - 1), down = has(gx, gy + 1);
  const beam = Math.max(2, tileH * .34), post = Math.max(3, Math.min(tileW, tileH) * .58);
  const shadow = "#11161a", iron = "#3e4b51", face = "#77878d", shine = "#c1cbcb", core = "#6bd7e5";
  if (left || right || (!up && !down)) {
    const start = left ? x : cx - post / 2, end = right ? x + tileW + 1 : cx + post / 2;
    pixel(ctx, start, cy - beam * .25, end - start, beam, shadow);
    pixel(ctx, start, cy - beam * .48, end - start, beam * .66, iron);
    pixel(ctx, start, cy - beam * .48, end - start, Math.max(1, beam * .16), shine);
    pixel(ctx, start, cy - beam * .05, end - start, Math.max(1, beam * .12), core);
  }
  if (up || down) {
    const start = up ? y : cy - post / 2, end = down ? y + tileH + 1 : cy + post / 2;
    pixel(ctx, cx - beam * .25, start, beam, end - start, shadow);
    pixel(ctx, cx - beam * .48, start, beam * .66, end - start, iron);
    pixel(ctx, cx - beam * .48, start, Math.max(1, beam * .16), end - start, shine);
    pixel(ctx, cx - beam * .05, start, Math.max(1, beam * .12), end - start, core);
  }
  pixel(ctx, cx - post * .5, cy - post * .5, post, post, shadow);
  pixel(ctx, cx - post * .43, cy - post * .57, post * .86, post * .86, face);
  pixel(ctx, cx - post * .31, cy - post * .45, post * .62, Math.max(1, post * .13), shine);
  pixel(ctx, cx - post * .10, cy - post * .18, post * .20, post * .20, core);
}

function drawBuilding(ctx, building, faction, tileW, tileH) {
  const x = building.x * tileW;
  const y = building.y * tileH;
  const w = Math.max(7, tileW * 1.15);
  const h = Math.max(7, tileH * 1.15);
  const cx = x + tileW / 2;
  const cy = y + tileH / 2;
  const wall = faction?.color || "#d9c99b";
  pixel(ctx, cx - w * .42, cy - h * .18, w * .84, h * .55, "#5b4333");
  if (building.type === "farm") {
    pixel(ctx, cx - w * .5, cy - h * .4, w, h * .82, "#7d6336");
    for (let i = 0; i < 3; i += 1) pixel(ctx, cx - w * .38 + i * w * .3, cy - h * .3, 1, h * .55, "#e0bf54");
  } else if (building.type === "mine") {
    pixel(ctx, cx - w * .5, cy - h * .35, w, h * .75, "#56504d");
    pixel(ctx, cx - w * .25, cy - h * .05, w * .5, h * .45, "#181817");
    pixel(ctx, cx - w * .42, cy - h * .45, w * .84, 2, "#a58250");
  } else if (building.type === "tower") {
    pixel(ctx, cx - w * .28, cy - h * .55, w * .56, h, wall);
    pixel(ctx, cx - w * .4, cy - h * .62, w * .22, h * .2, wall);
    pixel(ctx, cx + w * .18, cy - h * .62, w * .22, h * .2, wall);
    pixel(ctx, cx - 1, cy - h * .2, 2, h * .25, "#292a28");
  } else if (building.type === "academy") {
    pixel(ctx, cx - w * .46, cy - h * .26, w * .92, h * .62, "#e3dcc0");
    pixel(ctx, cx - w * .52, cy - h * .48, w, h * .24, "#417183");
    pixel(ctx, cx - w * .18, cy - h * .08, w * .36, 2, "#4e83a0");
  } else if (building.type === "shrine") {
    pixel(ctx, cx - w * .42, cy - h * .2, w * .84, h * .58, "#5b4a71");
    pixel(ctx, cx - w * .22, cy - h * .6, w * .44, h * .42, "#b994de");
    pixel(ctx, cx - w * .06, cy - h * .72, w * .12, h * .22, "#ead3ff");
  } else if (building.type === "factory") {
    pixel(ctx, cx - w * .52, cy - h * .28, w * 1.04, h * .7, "#555b5d");
    pixel(ctx, cx - w * .38, cy - h * .47, w * .24, h * .22, "#3c4143");
    pixel(ctx, cx + w * .14, cy - h * .66, w * .18, h * .43, "#34383a");
    pixel(ctx, cx - w * .36, cy - h * .04, w * .2, h * .18, "#e4aa45");
    pixel(ctx, cx + w * .02, cy - h * .04, w * .2, h * .18, "#e4aa45");
    const smoke = ((building.productionProgress || 0) % 24) / 24;
    ctx.globalAlpha = .55 - smoke * .35; pixel(ctx, cx + w * .17 + smoke * w * .25, cy - h * (.72 + smoke * .6), w * .2, h * .16, "#b7b8b1"); ctx.globalAlpha = 1;
  } else {
    pixel(ctx, cx - w * .46, cy - h * .23, w * .92, h * .62, wall);
    pixel(ctx, cx - w * .54, cy - h * .48, w * 1.08, h * .3, building.type === "hall" ? "#d78a4d" : "#85563c");
    pixel(ctx, cx - w * .1, cy + h * .05, w * .2, h * .34, "#392d26");
    if (building.type === "hall") pixel(ctx, cx - 1, cy - h * .85, 2, h * .38, faction?.color || "#fff");
  }
  if (building.health < 55) pixel(ctx, cx - w * .35, cy - h * .5, 2, h * .22, "#252525");
}

function drawPerson(ctx, person, faction, tileW, tileH, selected, claimTime = 20) {
  const scale = Math.max(.75, Math.min(tileW, tileH) / 11) * (person.isGiant ? 1.4 : 1);
  const x = Math.round((person.x + .5) * tileW);
  const phase = (person.animTick || 0) % 4, walking = Boolean(person.moving), bob = walking ? (phase % 2 ? -scale * .45 : 0) : phase === 0 ? -scale * .18 : 0;
  const y = Math.round((person.y + .72) * tileH + bob), step = walking && phase % 2 ? scale : 0;
  const species = person.species || faction?.type;
  const skin = species === "aether" ? "#83a858" : species === "cinder" ? "#c8895f" : species === "tide" ? "#efd0a5" : "#d8a16f";
  const outfit = faction?.color || "#ded6b5";
  const dark = faction ? (FACTION_TYPES[faction.type]?.dark || "#35473a") : "#2d382f";
  if (selected) {
    ctx.strokeStyle = "#fff3a3"; ctx.lineWidth = 1;
    ctx.strokeRect(x - scale * 4 - .5, y - scale * 8 - .5, scale * 8 + 1, scale * 10 + 1);
  }
  pixel(ctx, x - 2 * scale, y - 7 * scale, 4 * scale, 3 * scale, skin);
  pixel(ctx, x - 2 * scale, y - 8 * scale, 4 * scale, 2 * scale, dark);
  pixel(ctx, x - 3 * scale, y - 4 * scale, 6 * scale, 4 * scale, outfit);
  pixel(ctx, x - 3 * scale, y + step, 2 * scale, 2 * scale, dark);
  pixel(ctx, x + 1 * scale, y + (walking ? scale - step : 0), 2 * scale, 2 * scale, dark);
  pixel(ctx, x - 3 * scale, y - 3 * scale + (walking ? scale - step : 0), scale, 3 * scale, skin);
  pixel(ctx, x + 2 * scale, y - 3 * scale + step, scale, 3 * scale, skin);
  const blink = !walking && (person.animTick || 0) % 18 === 0;
  pixel(ctx, x - scale, y - 6 * scale, scale, blink ? Math.max(1, scale * .35) : scale, "#2a211b");
  pixel(ctx, x + scale, y - 6 * scale, scale, blink ? Math.max(1, scale * .35) : scale, "#2a211b");
  if (person.expression === "happy") { pixel(ctx, x - scale, y - 5 * scale, scale, scale * .45, "#5b2f29"); pixel(ctx, x, y - 4.7 * scale, scale, scale * .45, "#5b2f29"); }
  else if (["sad", "hurt", "sick"].includes(person.expression)) { pixel(ctx, x - scale, y - 4.7 * scale, 2 * scale, scale * .45, "#5b2f29"); pixel(ctx, x - scale * .5, y - 5.1 * scale, scale, scale * .35, "#5b2f29"); }
  else if (["shocked", "amazed"].includes(person.expression)) pixel(ctx, x - scale * .5, y - 5.1 * scale, scale, scale, "#5b2f29");
  else pixel(ctx, x - scale * .6, y - 4.9 * scale, scale * 1.2, scale * .35, "#5b2f29");
  if (species === "tide") { pixel(ctx, x - 3 * scale, y - 7 * scale, scale, 2 * scale, skin); pixel(ctx, x + 2 * scale, y - 7 * scale, scale, 2 * scale, skin); }
  if (species === "cinder") pixel(ctx, x - 2 * scale, y - 5 * scale, 4 * scale, 2 * scale, "#815034");

  const role = person.role;
  if (role === "farmer") { pixel(ctx, x - 3 * scale, y - 9 * scale, 6 * scale, scale, "#d9b95e"); pixel(ctx, x - 2 * scale, y - 10 * scale, 4 * scale, scale, "#c79c42"); }
  if (role === "woodcutter") { pixel(ctx, x + 3 * scale, y - 5 * scale, scale, 5 * scale, "#71442d"); pixel(ctx, x + 2 * scale, y - 6 * scale, 3 * scale, 2 * scale, "#b4bdc0"); }
  if (role === "miner") { pixel(ctx, x - 3 * scale, y - 9 * scale, 6 * scale, 2 * scale, "#65666a"); pixel(ctx, x - scale, y - 10 * scale, 2 * scale, 2 * scale, "#ffd85b"); }
  if (role === "builder") { pixel(ctx, x + 3 * scale, y - 4 * scale, scale, 4 * scale, "#765032"); pixel(ctx, x + 2 * scale, y - 5 * scale, 3 * scale, 2 * scale, "#b5804e"); }
  if (role === "scholar") { pixel(ctx, x - 4 * scale, y - 4 * scale, 2 * scale, 3 * scale, "#efe1a8"); pixel(ctx, x - 4 * scale, y - 3 * scale, 2 * scale, scale, "#65a0b9"); }
  if (role === "mystic") { pixel(ctx, x - 3 * scale, y - 9 * scale, 6 * scale, scale, "#b386db"); pixel(ctx, x + 3 * scale, y - 5 * scale, 2 * scale, 2 * scale, "#e6d0ff"); }
  if (role === "healer") { pixel(ctx, x + 3 * scale, y - 4 * scale, 2 * scale, 2 * scale, "#8acb72"); pixel(ctx, x + 4 * scale, y - 6 * scale, scale, 3 * scale, "#caef9b"); }
  if (role === "guard") { pixel(ctx, x - 5 * scale, y - 5 * scale, 2 * scale, 5 * scale, "#a6adb0"); pixel(ctx, x + 3 * scale, y - 5 * scale, scale, 6 * scale, "#77553a"); pixel(ctx, x + 2 * scale, y - 7 * scale, 3 * scale, 2 * scale, "#c8ced0"); }
  if (role === "scout") { pixel(ctx, x - 3 * scale, y - 9 * scale, 6 * scale, 2 * scale, "#3d5b42"); }
  if (role === "ruler") { pixel(ctx, x - 4 * scale, y - 11 * scale, 8 * scale, 2 * scale, "#d59e2c"); pixel(ctx, x - 4 * scale, y - 13 * scale, 2 * scale, 3 * scale, "#ffe263"); pixel(ctx, x - scale, y - 14 * scale, 2 * scale, 4 * scale, "#fff08a"); pixel(ctx, x + 2 * scale, y - 13 * scale, 2 * scale, 3 * scale, "#ffe263"); pixel(ctx, x - 2 * scale, y - 11 * scale, scale, scale, "#d84f4f"); pixel(ctx, x + scale, y - 11 * scale, scale, scale, "#4d87da"); }
  if (role === "child") { pixel(ctx, x - 2 * scale, y - 3 * scale, 4 * scale, 3 * scale, outfit); }
  if (role === "merchant") { pixel(ctx, x + 3 * scale, y - 4 * scale, 3 * scale, 4 * scale, "#9a7347"); }
  if (role === "settler") { pixel(ctx, x + 3 * scale, y - 5 * scale, 3 * scale, 5 * scale, "#79553a"); pixel(ctx, x - 4 * scale, y - 2 * scale, scale, 4 * scale, "#b9a267"); }
  const armor = person.equipment?.armor, weapon = person.equipment?.weapon, tool = person.equipment?.tool;
  if (armor === "leather") { pixel(ctx, x - 2 * scale, y - 4 * scale, 4 * scale, scale, "#78533b"); pixel(ctx, x - scale, y - 3 * scale, 2 * scale, 3 * scale, "#9a704c"); }
  if (armor === "chain") { pixel(ctx, x - 3 * scale, y - 4 * scale, 6 * scale, 4 * scale, "#8d999b"); for (let i = -2; i <= 2; i += 2) pixel(ctx, x + i * scale, y - 3 * scale, scale, scale, "#c0c9ca"); }
  if (armor === "plate" || armor === "royal") { pixel(ctx, x - 3 * scale, y - 4 * scale, 6 * scale, 4 * scale, armor === "royal" ? "#c99a38" : "#aeb9bc"); pixel(ctx, x - 4 * scale, y - 4 * scale, scale, 2 * scale, "#e2e8e7"); pixel(ctx, x + 3 * scale, y - 4 * scale, scale, 2 * scale, "#e2e8e7"); }
  if (weapon === "sword") { pixel(ctx, x + 4 * scale, y - 7 * scale, scale, 7 * scale, "#dfe8e8"); pixel(ctx, x + 3 * scale, y - 2 * scale, 3 * scale, scale, "#d6ad4b"); }
  if (weapon === "spear") { pixel(ctx, x + 4 * scale, y - 8 * scale, scale, 9 * scale, "#765338"); pixel(ctx, x + 3 * scale, y - 9 * scale, 3 * scale, 2 * scale, "#d8e1e2"); }
  if (weapon === "bow") { ctx.strokeStyle = "#8b5b35"; ctx.lineWidth = Math.max(1, scale); ctx.beginPath(); ctx.arc(x + 4 * scale, y - 3 * scale, 3 * scale, -Math.PI / 2, Math.PI / 2); ctx.stroke(); pixel(ctx, x + 4 * scale, y - 6 * scale, Math.max(1, scale * .4), 6 * scale, "#ded7bd"); }
  if (weapon === "rifle") { pixel(ctx, x + 2 * scale, y - 5 * scale, 7 * scale, scale, "#293033"); pixel(ctx, x + 2 * scale, y - 4 * scale, 3 * scale, 2 * scale, "#76513a"); }
  if (tool === "axe") { pixel(ctx, x + 4 * scale, y - 5 * scale, scale, 6 * scale, "#70482e"); pixel(ctx, x + 3 * scale, y - 7 * scale, 3 * scale, 3 * scale, "#c3cdcf"); }
  if (tool === "pickaxe") { pixel(ctx, x + 4 * scale, y - 5 * scale, scale, 6 * scale, "#70482e"); pixel(ctx, x + 2 * scale, y - 7 * scale, 5 * scale, scale, "#c3cdcf"); }
  if (tool === "hammer") { pixel(ctx, x + 4 * scale, y - 4 * scale, scale, 5 * scale, "#70482e"); pixel(ctx, x + 2 * scale, y - 6 * scale, 4 * scale, 2 * scale, "#aeb8ba"); }
  if (tool === "hoe") { pixel(ctx, x + 4 * scale, y - 5 * scale, scale, 6 * scale, "#765238"); pixel(ctx, x + 4 * scale, y - 6 * scale, 3 * scale, scale, "#bfc7c8"); }
  if (tool === "book") { pixel(ctx, x - 5 * scale, y - 3 * scale, 3 * scale, 3 * scale, "#e9dca4"); pixel(ctx, x - 4 * scale, y - 3 * scale, scale, 3 * scale, "#467d9a"); }
  if (tool === "staff") { pixel(ctx, x + 4 * scale, y - 7 * scale, scale, 8 * scale, "#71503a"); pixel(ctx, x + 3 * scale, y - 9 * scale, 3 * scale, 3 * scale, "#c69aef"); }
  if (tool === "satchel" || tool === "pack" || tool === "ledger") pixel(ctx, x - 5 * scale, y - 3 * scale, 3 * scale, 4 * scale, tool === "satchel" ? "#87a860" : "#8d6444");
  if (person.claimProgress > 0) { const progress = clamp(person.claimProgress / claimTime, 0, 1); pixel(ctx, x - 4 * scale, y + 3 * scale, 8 * scale, scale, "#182024"); pixel(ctx, x - 4 * scale, y + 3 * scale, 8 * scale * progress, scale, faction?.color || "#f0d668"); }
  if (person.sick) pixel(ctx, x - scale, y - 12 * scale, 2 * scale, 2 * scale, "#9cc36a");
  if (person.favorite) {
    const pulse = 1 + ((person.animTick || 0) % 8 < 4 ? .08 : 0); ctx.save(); ctx.translate(x, y - scale * (role === "ruler" ? 17 : 13)); ctx.scale(pulse, pulse); ctx.fillStyle = "#ffe76b"; ctx.strokeStyle = "#503d12"; ctx.lineWidth = Math.max(1, scale * .45); ctx.font = `bold ${Math.max(11, Math.round(scale * 7))}px serif`; ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.strokeText("★", 0, 0); ctx.fillText("★", 0, 0); ctx.restore();
  }
  if (person.emote) { ctx.font = `${Math.max(9, Math.round(tileW * .72))}px "Segoe UI Emoji",sans-serif`; ctx.textAlign = "center"; ctx.textBaseline = "bottom"; ctx.fillStyle = "#fff"; ctx.fillText(person.emote, x, y - scale * 10); }
}

function drawCreature(ctx, creature, tileW, tileH, selected) {
  const x = (creature.x + .5) * tileW, phase = (creature.animTick || creature.age || 0) % 4;
  const s = Math.max(1, Math.floor(Math.min(tileW, tileH) / 6)), y = (creature.y + .65) * tileH - (phase === 1 ? s : 0);
  if (selected) { ctx.strokeStyle = "#fff3a3"; ctx.lineWidth = 1; ctx.strokeRect(x - 5 * s, y - 7 * s, 10 * s, 9 * s); }
  const body = (color, dark, long = false) => { pixel(ctx, x - 4 * s, y - 3 * s, (long ? 7 : 6) * s, 4 * s, color); pixel(ctx, x + 2 * s, y - 5 * s, 3 * s, 4 * s, color); pixel(ctx, x + 4 * s, y - 4 * s, s, s, dark); pixel(ctx, x - 3 * s, y + (phase % 2 ? 0 : s), s, 2 * s, dark); pixel(ctx, x + s, y + (phase % 2 ? s : 0), s, 2 * s, dark); };
  if (creature.type === "moth") { pixel(ctx, x - 3 * s, y - 3 * s - phase * .3 * s, 3 * s, 3 * s, "#f2d97b"); pixel(ctx, x, y - 3 * s + phase * .3 * s, 3 * s, 3 * s, "#d4a9ef"); pixel(ctx, x - .5 * s, y - 2 * s, s, 4 * s, "#493e35"); }
  else if (creature.type === "raider") { pixel(ctx, x - 3 * s, y - 5 * s, 6 * s, 6 * s, "#6db2c8"); pixel(ctx, x - 2 * s, y - 7 * s, 4 * s, 3 * s, "#bcebf3"); pixel(ctx, x - s, y - 6 * s, s, s, "#172832"); pixel(ctx, x + s, y - 6 * s, s, s, "#172832"); }
  else if (creature.type === "fish") { pixel(ctx, x - 3 * s, y - 2 * s, 6 * s, 4 * s, "#5db7c8"); pixel(ctx, x - 5 * s, y - 3 * s, 2 * s, 6 * s, "#428aa6"); pixel(ctx, x + 2 * s, y - s, s, s, "#172b36"); }
  else if (creature.type === "rabbit") { body("#c9c2ad", "#5c5549"); pixel(ctx, x + 2 * s, y - 8 * s, s, 4 * s, "#c9c2ad"); pixel(ctx, x + 4 * s, y - 8 * s, s, 4 * s, "#c9c2ad"); pixel(ctx, x - 5 * s, y - 3 * s, 2 * s, 2 * s, "#eee8d9"); }
  else if (creature.type === "deer") { body("#a87448", "#473326", true); pixel(ctx, x + 3 * s, y - 8 * s, s, 3 * s, "#d9bd88"); pixel(ctx, x + 5 * s, y - 8 * s, s, 3 * s, "#d9bd88"); }
  else if (creature.type === "sheep") { body("#ddd7c6", "#45413a"); pixel(ctx, x - 4 * s, y - 4 * s, 2 * s, 2 * s, "#f4efe1"); }
  else if (creature.type === "chicken") { pixel(ctx, x - 2 * s, y - 4 * s, 4 * s, 5 * s, "#e6d8b8"); pixel(ctx, x + s, y - 5 * s, 2 * s, 2 * s, "#e34b3e"); pixel(ctx, x + 3 * s, y - 3 * s, 2 * s, s, "#e6b94e"); pixel(ctx, x - s, y + s, s, 2 * s, "#8a643c"); }
  else if (creature.type === "wolf") { body("#6d7474", "#252a2b", true); pixel(ctx, x + 2 * s, y - 7 * s, s, 3 * s, "#6d7474"); pixel(ctx, x + 4 * s, y - 7 * s, s, 3 * s, "#6d7474"); pixel(ctx, x - 6 * s, y - 4 * s, 3 * s, s, "#495052"); }
  else if (creature.type === "bear") { body("#674936", "#2d211b", true); pixel(ctx, x + 2 * s, y - 6 * s, 2 * s, 2 * s, "#3d2c22"); pixel(ctx, x + 4 * s, y - 6 * s, 2 * s, 2 * s, "#3d2c22"); }
  else if (creature.type === "boar") { body("#5e503e", "#2e2822", true); pixel(ctx, x + 4 * s, y - 3 * s, 2 * s, s, "#e5dbc0"); }
  else body("#8c7656", "#332d25");
  if (creature.traits?.includes("Albino")) { ctx.strokeStyle = "#fff7e8"; ctx.lineWidth = Math.max(1, s); ctx.strokeRect(x - 4 * s, y - 5 * s, 9 * s, 6 * s); pixel(ctx, x + 4 * s, y - 4 * s, s, s, "#d66b79"); }
  if (creature.traits?.includes("Strong")) pixel(ctx, x - 3 * s, y - 4 * s, 2 * s, s, "#e1ba66");
  if (creature.emote) { ctx.font = `${Math.max(9, Math.round(tileW * .72))}px "Segoe UI Emoji",sans-serif`; ctx.textAlign = "center"; ctx.textBaseline = "bottom"; ctx.fillStyle = "#fff"; ctx.fillText(creature.emote, x, y - 7 * s); }
}

function drawVehicle(ctx, vehicle, faction, tileW, tileH, selected) {
  const x = (vehicle.x + .5) * tileW, y = (vehicle.y + .62) * tileH, s = Math.max(1, Math.floor(Math.min(tileW, tileH) / 7)), color = faction?.color || "#87928d", dark = faction?.dark || "#27302d";
  if (selected) { ctx.strokeStyle = "#fff3a3"; ctx.lineWidth = 1; ctx.strokeRect(x - 6 * s, y - 6 * s, 12 * s, 8 * s); }
  if (vehicle.type === "tank") { pixel(ctx, x - 5 * s, y - 2 * s, 10 * s, 4 * s, dark); pixel(ctx, x - 4 * s, y - 4 * s, 7 * s, 3 * s, color); pixel(ctx, x, y - 5 * s, 3 * s, 2 * s, color); pixel(ctx, x + 2 * s, y - 5 * s, 6 * s, s, "#2c3531"); pixel(ctx, x - 4 * s, y + s, 2 * s, 2 * s, "#111"); pixel(ctx, x + 2 * s, y + s, 2 * s, 2 * s, "#111"); }
  else if (vehicle.type === "boat") { pixel(ctx, x - 6 * s, y - s, 12 * s, 3 * s, "#59402e"); pixel(ctx, x - 4 * s, y - 3 * s, 7 * s, 3 * s, color); pixel(ctx, x - s, y - 7 * s, s, 5 * s, "#e8e0c8"); pixel(ctx, x, y - 7 * s, 4 * s, 3 * s, faction?.color || "#eee"); }
  else if (vehicle.type === "warship") { pixel(ctx, x - 8 * s, y - s, 16 * s, 4 * s, "#303a40"); pixel(ctx, x - 6 * s, y - 4 * s, 11 * s, 4 * s, color); pixel(ctx, x - 2 * s, y - 7 * s, 5 * s, 4 * s, "#78878d"); pixel(ctx, x - 6 * s, y - 5 * s, 3 * s, 2 * s, "#a9b5b7"); pixel(ctx, x + 4 * s, y - 5 * s, 6 * s, s, "#20272b"); pixel(ctx, x + 3 * s, y - 4 * s, 3 * s, 2 * s, "#758288"); }
  else if (vehicle.type === "carrier") { pixel(ctx, x - 10 * s, y - s, 20 * s, 4 * s, "#273238"); pixel(ctx, x - 9 * s, y - 4 * s, 18 * s, 4 * s, "#69787d"); pixel(ctx, x - 7 * s, y - 3 * s, 13 * s, s, "#d7d9cf"); pixel(ctx, x + 3 * s, y - 7 * s, 4 * s, 4 * s, color); pixel(ctx, x + 5 * s, y - 9 * s, s, 3 * s, "#dce5e4"); pixel(ctx, x - 5 * s, y - 6 * s, 6 * s, 2 * s, faction?.color || "#d4b65b"); pixel(ctx, x - 3 * s, y - 7 * s, 2 * s, 4 * s, "#263238"); }
  else { pixel(ctx, x - 7 * s, y - 2 * s, 14 * s, 3 * s, color); pixel(ctx, x - 2 * s, y - 5 * s, 5 * s, 7 * s, dark); pixel(ctx, x - 8 * s, y - s, 3 * s, s, "#d8e4e4"); pixel(ctx, x + 6 * s, y - s, 3 * s, s, "#d8e4e4"); }
}

export function drawWorld(canvas, world, hovered, brush, selectedRef, camera = { x: COLS / 2, y: ROWS / 2, zoom: 1 }, selectedTool = "inspect") {
  if (!canvas) return;
  const rect = canvas.getBoundingClientRect();
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  const width = Math.max(1, rect.width), height = Math.max(1, rect.height);
  if (canvas.width !== Math.round(width * ratio) || canvas.height !== Math.round(height * ratio)) { canvas.width = Math.round(width * ratio); canvas.height = Math.round(height * ratio); }
  const ctx = canvas.getContext("2d"); ctx.setTransform(ratio, 0, 0, ratio, 0, 0); ctx.imageSmoothingEnabled = false; ctx.fillStyle = "#03050b"; ctx.fillRect(0, 0, width, height);
  for (let i = 0; i < 110; i += 1) { const sx = hash(i, 11, world.seed + 81) * width, sy = hash(i, 29, world.seed + 93) * height, size = hash(i, 47, world.seed) > .88 ? 2 : 1; ctx.globalAlpha = .18 + hash(i, 7, world.seed) * .55; pixel(ctx, sx, sy, size, size, i % 9 === 0 ? "#8ab4dc" : "#d8e1e8"); } ctx.globalAlpha = 1;
  const baseTile = Math.min(width / COLS, height / ROWS);
  const tileW = baseTile * camera.zoom, tileH = tileW;
  const originX = width / 2 - camera.x * tileW, originY = height / 2 - camera.y * tileH;
  ctx.translate(originX, originY);
  const factionMap = Object.fromEntries(world.factions.map((f) => [f.id, f]));
  for (let y = 0; y < ROWS; y += 1) for (let x = 0; x < COLS; x += 1) {
    const tile = world.tiles[indexAt(x, y)], terrain = TERRAIN[tile.type], noise = hash(x, y, world.seed);
    pixel(ctx, x * tileW, y * tileH, Math.ceil(tileW + .4), Math.ceil(tileH + .4), noise > .58 ? terrain.alt : terrain.color);
    if (tile.type === "void") { if (noise > .96 && tileW > 2) pixel(ctx, x * tileW + tileW * .5, y * tileH + tileH * .5, Math.max(1, tileW * .08), Math.max(1, tileH * .08), "#6b7899"); continue; }
    if (tile.owner && factionMap[tile.owner]) { ctx.globalAlpha = camera.zoom < .85 ? .72 : camera.zoom < 1.6 ? .46 : .1; pixel(ctx, x * tileW, y * tileH, Math.ceil(tileW + .4), Math.ceil(tileH + .4), factionMap[tile.owner].color); ctx.globalAlpha = 1; }
    if (camera.zoom >= 1.2) drawTerrainDetail(ctx, tile.type, x * tileW, y * tileH, tileW, tileH, noise);
    if (tile.plague > .2) { ctx.globalAlpha = .45; pixel(ctx, x * tileW, y * tileH, tileW, tileH, "#7aa341"); ctx.globalAlpha = 1; }
    if (tile.fire > 0) { pixel(ctx, x * tileW + tileW * .2, y * tileH + tileH * .35, tileW * .28, tileH * .55, "#ffcf46"); pixel(ctx, x * tileW + tileW * .4, y * tileH + tileH * .18, tileW * .4, tileH * .75, "#e84f32"); }
    if (tile.barrier) drawBarrier(ctx, world, x, y, tileW, tileH);
    if (tile.flash > 0) { ctx.globalAlpha = tile.flash * .5; pixel(ctx, x * tileW, y * tileH, tileW + 1, tileH + 1, "#fff6b0"); ctx.globalAlpha = 1; }
  }
  if (camera.zoom >= .62) {
    ctx.strokeStyle = "rgba(225,205,151,.72)"; ctx.lineWidth = Math.max(1, tileW * .08); ctx.beginPath();
    for (let y = 0; y < ROWS; y += 1) for (let x = 0; x < COLS; x += 1) {
      const tile = world.tiles[indexAt(x, y)]; if (tile.type === "water" || tile.type === "void") continue;
      const right = x < COLS - 1 ? world.tiles[indexAt(x + 1, y)].type : "void", below = y < ROWS - 1 ? world.tiles[indexAt(x, y + 1)].type : "void";
      if (right === "water") { ctx.moveTo((x + 1) * tileW, y * tileH); ctx.lineTo((x + 1) * tileW, (y + 1) * tileH); }
      if (below === "water") { ctx.moveTo(x * tileW, (y + 1) * tileH); ctx.lineTo((x + 1) * tileW, (y + 1) * tileH); }
    }
    ctx.stroke();
  }
  if (camera.zoom >= .72) for (let y = 0; y < ROWS; y += 1) for (let x = 0; x < COLS; x += 1) {
    const owner = world.tiles[indexAt(x, y)].owner; if (!owner || !factionMap[owner]) continue; const left = x ? world.tiles[indexAt(x - 1, y)].owner : null, right = x < COLS - 1 ? world.tiles[indexAt(x + 1, y)].owner : null, up = y ? world.tiles[indexAt(x, y - 1)].owner : null, down = y < ROWS - 1 ? world.tiles[indexAt(x, y + 1)].owner : null;
    ctx.strokeStyle = factionMap[owner].color; ctx.globalAlpha = .82; ctx.lineWidth = Math.max(1.2, tileW * .12); ctx.beginPath(); if (left !== owner) { ctx.moveTo(x * tileW, y * tileH); ctx.lineTo(x * tileW, (y + 1) * tileH); } if (right !== owner) { ctx.moveTo((x + 1) * tileW, y * tileH); ctx.lineTo((x + 1) * tileW, (y + 1) * tileH); } if (up !== owner) { ctx.moveTo(x * tileW, y * tileH); ctx.lineTo((x + 1) * tileW, y * tileH); } if (down !== owner) { ctx.moveTo(x * tileW, (y + 1) * tileH); ctx.lineTo((x + 1) * tileW, (y + 1) * tileH); } ctx.stroke(); ctx.globalAlpha = 1;
  }
  if (world.bounds) { ctx.strokeStyle = "rgba(104,125,162,.7)"; ctx.lineWidth = Math.max(1, tileW * .12); ctx.strokeRect(world.bounds.x * tileW, world.bounds.y * tileH, world.bounds.width * tileW, world.bounds.height * tileH); }
  if (world.mapType === "earth" && camera.zoom >= .46 && camera.zoom <= 1.7 && world.bounds) {
    const landLabels = [
      ["NORTH AMERICA",.19,.29],["SOUTH AMERICA",.33,.65],["EUROPE",.515,.31],["AFRICA",.545,.57],
      ["ASIA",.76,.30],["AUSTRALIA",.87,.75],["ANTARCTICA",.50,.955],
    ];
    const oceanLabels = [["PACIFIC",.075,.57],["ATLANTIC",.44,.55],["INDIAN",.71,.68],["ARCTIC",.66,.09]];
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.font = `bold ${Math.max(6, Math.min(11, tileW * 1.32))}px ui-monospace,monospace`;
    for (const [label, lx, ly] of landLabels) { const px = (world.bounds.x + lx * world.bounds.width) * tileW, py = (world.bounds.y + ly * world.bounds.height) * tileH; ctx.fillStyle = "rgba(9,13,12,.68)"; ctx.fillText(label, px + 1, py + 1); ctx.fillStyle = "rgba(255,244,190,.72)"; ctx.fillText(label, px, py); }
    ctx.font = `${Math.max(5, Math.min(9, tileW * 1.05))}px ui-monospace,monospace`;
    for (const [label, lx, ly] of oceanLabels) { const px = (world.bounds.x + lx * world.bounds.width) * tileW, py = (world.bounds.y + ly * world.bounds.height) * tileH; ctx.fillStyle = "rgba(146,207,224,.5)"; ctx.fillText(label, px, py); }
  }
  if (camera.zoom >= 1.05) for (const building of world.buildings) drawBuilding(ctx, building, factionMap[building.factionId], tileW, tileH);
  if (camera.zoom >= 1.02) for (const vehicle of world.vehicles || []) drawVehicle(ctx, vehicle, factionMap[vehicle.factionId], tileW, tileH, selectedRef?.type === "vehicle" && selectedRef.id === vehicle.id);
  if (camera.zoom >= 1.15) for (const creature of world.creatures) drawCreature(ctx, creature, tileW, tileH, selectedRef?.type === "creature" && selectedRef.id === creature.id);
  if (camera.zoom >= 1.12) for (const person of world.people) drawPerson(ctx, person, factionMap[person.factionId], tileW, tileH, selectedRef?.type === "person" && selectedRef.id === person.id, world.claimTime || 20);
  if (camera.zoom >= 1.25 && tileW > 9) for (const city of world.cities) {
    ctx.font = `bold ${Math.max(7, Math.floor(tileW * .72))}px ui-monospace, monospace`; ctx.textAlign = "center"; ctx.textBaseline = "bottom";
    const label = city.name.toUpperCase(); const tx = (city.x + .5) * tileW, ty = (city.y - 1) * tileH;
    ctx.fillStyle = "rgba(10,14,12,.8)"; ctx.fillText(label, tx + 1, ty + 1); ctx.fillStyle = "#f5efcf"; ctx.fillText(label, tx, ty);
  }
  if (camera.zoom < 1.6) for (const faction of world.factions) {
    const cities = world.cities.filter((city) => city.factionId === faction.id); if (!cities.length) continue;
    const fx = cities.reduce((sum, city) => sum + city.x, 0) / cities.length, fy = cities.reduce((sum, city) => sum + city.y, 0) / cities.length;
    const population = world.people.filter((person) => person.factionId === faction.id).length;
    const px = (fx + .5) * tileW, py = (fy + .5) * tileH;
    ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.font = `bold ${Math.max(8, Math.floor(tileW * 1.3))}px ui-monospace,monospace`;
    ctx.fillStyle = "rgba(7,10,11,.82)"; ctx.fillText(faction.name.toUpperCase(), px + 1, py + 1); ctx.fillStyle = "#fff5bf"; ctx.fillText(faction.name.toUpperCase(), px, py);
    ctx.font = `${Math.max(7, Math.floor(tileW * .9))}px ui-monospace,monospace`; ctx.fillStyle = "rgba(7,10,11,.82)"; ctx.fillText(`POP ${population}`, px + 1, py + tileW * 1.35 + 1); ctx.fillStyle = faction.color; ctx.fillText(`POP ${population}`, px, py + tileW * 1.35);
  }
  for (const effect of world.effects || []) {
    const cx = (effect.x + .5) * tileW, cy = (effect.y + .5) * tileH, life = Math.max(.1, (effect.until - world.ticks) / 6);
    if (effect.type === "lightning") {
      ctx.globalAlpha = Math.min(1, life * 1.5); ctx.strokeStyle = "#fffbd0"; ctx.lineWidth = Math.max(2, tileW * .22); ctx.beginPath(); ctx.moveTo(cx + tileW * 1.2, cy - tileH * 10); ctx.lineTo(cx - tileW * .7, cy - tileH * 5); ctx.lineTo(cx + tileW * .45, cy - tileH * 3); ctx.lineTo(cx - tileW * .3, cy); ctx.stroke(); ctx.strokeStyle = "#75d8ff"; ctx.lineWidth = Math.max(1, tileW * .08); ctx.stroke(); ctx.globalAlpha = 1;
    } else if (effect.type === "explosion") {
      const radius = effect.radius * tileW * (1.15 - life * .25), block = Math.max(2, tileW * .38); ctx.globalAlpha = Math.min(1, life * 1.8); for (let i = 0; i < 24; i += 1) { const angle = i * 2.4, dist = radius * (.2 + hash(i, effect.x, effect.y) * .8), size = block * (1 + hash(i, 2, effect.y) * 1.5); pixel(ctx, cx + Math.cos(angle) * dist - size / 2, cy + Math.sin(angle) * dist - size / 2, size, size, i % 3 === 0 ? "#fff4a3" : i % 2 ? "#ffad2f" : "#e9422e"); } pixel(ctx, cx - radius * .35, cy - radius * .35, radius * .7, radius * .7, "#fff0a0"); ctx.globalAlpha = 1;
    } else if (effect.type === "meteor") {
      const progress = 1 - clamp((effect.until - world.ticks) / 12, 0, 1), mx = cx + (1 - progress) * tileW * 9, my = cy - (1 - progress) * tileH * 12, s = Math.max(3, tileW * .75); ctx.globalAlpha = .4 + progress * .6; for (let i = 5; i > 0; i -= 1) pixel(ctx, mx + i * tileW * .55, my - i * tileH * .72, s * (i / 6), s * (i / 6), i > 3 ? "#7c2733" : "#ff7b32"); pixel(ctx, mx - s, my - s, s * 2, s * 2, "#422d2d"); pixel(ctx, mx - s * .35, my - s * .35, s * .7, s * .7, "#ffbd4a"); ctx.globalAlpha = 1;
    } else if (effect.type === "shell" || effect.type === "airstrike") {
      const progress = 1 - clamp((effect.until - world.ticks) / 5, 0, 1), sx = (effect.fromX + .5) * tileW, sy = (effect.fromY + .5) * tileH, px = sx + (cx - sx) * progress, py = sy + (cy - sy) * progress;
      if (effect.type === "shell") { ctx.strokeStyle = "rgba(255,221,132,.8)"; ctx.lineWidth = Math.max(1, tileW * .09); ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(px, py); ctx.stroke(); pixel(ctx, px - tileW * .16, py - tileH * .16, tileW * .32, tileH * .32, progress > .8 ? "#ff693e" : "#ffe18a"); }
      else { const planeY = py - tileH * 3 * (1 - progress); pixel(ctx, px - tileW, planeY - tileH * .18, tileW * 2, tileH * .36, "#c4ced0"); pixel(ctx, px - tileW * .25, planeY - tileH * .65, tileW * .5, tileH * 1.3, "#58676c"); if (progress > .72) { ctx.globalAlpha = 1 - progress * .45; pixel(ctx, cx - tileW * .6, cy - tileH * .6, tileW * 1.2, tileH * 1.2, "#ff9a3d"); ctx.globalAlpha = 1; } }
    } else if (effect.type === "death") {
      const progress = 1 - clamp((effect.until - world.ticks) / 9, 0, 1), s = Math.max(2, tileW * .32); ctx.globalAlpha = 1 - progress; for (let i = 0; i < 9; i += 1) { const spread = progress * tileW * (1.5 + hash(i, effect.x, effect.y)); pixel(ctx, cx + (hash(i, 3, effect.x) - .5) * spread, cy - progress * tileH * 2 + (hash(i, 5, effect.y) - .5) * spread, s, s, effect.voidDeath ? (i % 2 ? "#784ca5" : "#12162a") : (i % 2 ? "#c8b48e" : "#754c3b")); } ctx.globalAlpha = 1;
    }
  }
  if (hovered && selectedTool === "inspect") {
    const ref = entityAt(world, hovered.x, hovered.y), entity = getEntity(world, ref);
    if (entity) {
      const label = entity.name || entity.customName || TERRAIN[entity.type]?.name || "Unknown";
      const lx = ((Number.isFinite(entity.x) ? entity.x : hovered.x) + .5) * tileW, ly = (Number.isFinite(entity.y) ? entity.y : hovered.y) * tileH - Math.max(7, tileH * .45);
      ctx.font = `bold ${Math.max(7, Math.min(11, tileW * .82))}px ui-monospace,monospace`; ctx.textAlign = "center"; ctx.textBaseline = "bottom";
      const labelWidth = ctx.measureText(label).width + 8; pixel(ctx, lx - labelWidth / 2, ly - Math.max(12, tileH), labelWidth, Math.max(12, tileH), "rgba(8,12,14,.92)");
      ctx.fillStyle = "#fff3ad"; ctx.fillText(label, lx, ly - 2);
    }
  } else if (hovered) { const squareTool = Boolean(TERRAIN[selectedTool]) || ["barrier", "erasebarrier", "erase"].includes(selectedTool), bounds = brushBounds(hovered.x, hovered.y, squareTool ? brush : 1); ctx.strokeStyle = "rgba(255,248,191,.95)"; ctx.lineWidth = 1; ctx.strokeRect(bounds.left * tileW, bounds.top * tileH, bounds.width * tileW, bounds.width * tileH); }
}
