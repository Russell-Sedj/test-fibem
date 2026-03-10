const fs = require("fs");
const path = require("path");

const dataDir = path.join(__dirname, "../../data");
const dbPath = path.join(dataDir, "db.json");

const SEED = {
  actualites: [
    { id:1, titre:"R\u00e9novation de la place centrale \u2013 Phase\u00a02 lanc\u00e9e", description:"Les travaux de r\u00e9novation de la place centrale de Mbaling entrent dans leur deuxi\u00e8me phase avec la cr\u00e9ation d'espaces verts et de zones pi\u00e9tonnes modernes. Cette phase sera termin\u00e9e d'ici septembre 2026.", categorie:"Travaux", date:"5 mars 2026", badge_class:"bg-orange-100 text-orange-700", bg_class:"bg-gradient-to-br from-orange-400 to-orange-600", created_at:"2026-03-05T00:00:00.000Z" },
    { id:2, titre:"Inscriptions scolaires 2026-2027 ouvertes", description:"Les inscriptions pour l'ann\u00e9e scolaire 2026-2027 sont d\u00e9sormais ouvertes. Rendez-vous en mairie muni des documents n\u00e9cessaires.", categorie:"\u00c9ducation", date:"28 f\u00e9vrier 2026", badge_class:"bg-green-100 text-green-700", bg_class:"bg-gradient-to-br from-green-400 to-green-600", created_at:"2026-02-28T00:00:00.000Z" },
    { id:3, titre:"F\u00eate de printemps \u2013 20 & 21 avril 2026", description:"La traditionnelle f\u00eate de printemps de Mbaling aura lieu les 20 et 21 avril 2026. Concerts, animations et expositions pour toute la famille.", categorie:"\u00c9v\u00e9nement", date:"15 f\u00e9vrier 2026", badge_class:"bg-purple-100 text-purple-700", bg_class:"bg-gradient-to-br from-purple-400 to-purple-600", created_at:"2026-02-15T00:00:00.000Z" },
    { id:4, titre:"Conseil municipal du 10 mars 2026", description:"Le prochain conseil municipal se tiendra le 10 mars 2026 \u00e0 18h30 en mairie. Les citoyens sont invit\u00e9s \u00e0 assister \u00e0 cette s\u00e9ance publique.", categorie:"Institution", date:"1 f\u00e9vrier 2026", badge_class:"bg-blue-100 text-blue-700", bg_class:"bg-gradient-to-br from-blue-500 to-blue-700", created_at:"2026-02-01T00:00:00.000Z" },
    { id:5, titre:"Plantation de 200 arbres dans la commune", description:"Dans le cadre de son plan vert, la mairie de Mbaling plante 200 arbres sur l'ensemble du territoire communal ce mois-ci. Un geste fort pour l'environnement.", categorie:"Environnement", date:"20 janvier 2026", badge_class:"bg-teal-100 text-teal-700", bg_class:"bg-gradient-to-br from-teal-400 to-teal-600", created_at:"2026-01-20T00:00:00.000Z" },
    { id:6, titre:"Ouverture de la nouvelle m\u00e9diath\u00e8que", description:"La nouvelle m\u00e9diath\u00e8que municipale ouvrira ses portes le 1er avril 2026. Un espace moderne de 800\u00a0m\u00b2 avec plus de 25\u00a0000 ouvrages, espace num\u00e9rique et salle de conf\u00e9rence.", categorie:"\u00c9v\u00e9nement", date:"10 janvier 2026", badge_class:"bg-purple-100 text-purple-700", bg_class:"bg-gradient-to-br from-indigo-400 to-indigo-600", created_at:"2026-01-10T00:00:00.000Z" },
  ],
  documents: [],
};

function read() {
  if (!fs.existsSync(dbPath)) return JSON.parse(JSON.stringify(SEED));
  try { return JSON.parse(fs.readFileSync(dbPath, "utf8")); }
  catch { return JSON.parse(JSON.stringify(SEED)); }
}

function write(data) {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), "utf8");
}

function nextId(arr) {
  return arr.length > 0 ? Math.max(...arr.map((x) => x.id)) + 1 : 1;
}

if (!fs.existsSync(dbPath)) write(JSON.parse(JSON.stringify(SEED)));

module.exports = { read, write, nextId };