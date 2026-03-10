const fs = require("fs");
const path = require("path");

const dataDir = path.join(__dirname, "../../data");
const dbPath = path.join(dataDir, "db.json");

const SEED = {
  actualites: [
    {
      id: 1,
      titre: "RÃ©novation de la place centrale â€“ Phase 2 lancÃ©e",
      description:
        "Les travaux de rÃ©novation de la place centrale de Mbaling entrent dans leur deuxiÃ¨me phase avec la crÃ©ation d'espaces verts et de zones piÃ©tonnes modernes. Cette phase sera terminÃ©e d'ici septembre 2026.",
      categorie: "Travaux",
      date: "5 mars 2026",
      badge_class: "bg-orange-100 text-orange-700",
      bg_class: "bg-gradient-to-br from-orange-400 to-orange-600",
      created_at: "2026-03-05T00:00:00.000Z",
    },
    {
      id: 2,
      titre: "Inscriptions scolaires 2026-2027 ouvertes",
      description:
        "Les inscriptions pour l'annÃ©e scolaire 2026-2027 sont dÃ©sormais ouvertes. Rendez-vous en mairie muni des documents nÃ©cessaires ou inscrivez-vous en ligne sur notre portail.",
      categorie: "Ã‰ducation",
      date: "28 fÃ©vrier 2026",
      badge_class: "bg-green-100 text-green-700",
      bg_class: "bg-gradient-to-br from-green-400 to-green-600",
      created_at: "2026-02-28T00:00:00.000Z",
    },
    {
      id: 3,
      titre: "FÃªte de printemps â€“ 20 & 21 avril 2026",
      description:
        "La traditionnelle fÃªte de printemps de Mbaling aura lieu les 20 et 21 avril 2026. Concerts, animations et expositions pour toute la famille sont au programme.",
      categorie: "Ã‰vÃ©nement",
      date: "15 fÃ©vrier 2026",
      badge_class: "bg-purple-100 text-purple-700",
      bg_class: "bg-gradient-to-br from-purple-400 to-purple-600",
      created_at: "2026-02-15T00:00:00.000Z",
    },
    {
      id: 4,
      titre: "Conseil municipal du 10 mars 2026",
      description:
        "Le prochain conseil municipal se tiendra le 10 mars 2026 Ã  18h30 en mairie. Les citoyens sont invitÃ©s Ã  assister Ã  cette sÃ©ance publique.",
      categorie: "Institution",
      date: "1 fÃ©vrier 2026",
      badge_class: "bg-blue-100 text-blue-700",
      bg_class: "bg-gradient-to-br from-blue-500 to-blue-700",
      created_at: "2026-02-01T00:00:00.000Z",
    },
    {
      id: 5,
      titre: "Plantation de 200 arbres dans la commune",
      description:
        "Dans le cadre de son plan vert, la mairie de Mbaling plante 200 arbres sur l'ensemble du territoire communal ce mois-ci. Un geste fort pour l'environnement.",
      categorie: "Environnement",
      date: "20 janvier 2026",
      badge_class: "bg-teal-100 text-teal-700",
      bg_class: "bg-gradient-to-br from-teal-400 to-teal-600",
      created_at: "2026-01-20T00:00:00.000Z",
    },
    {
      id: 6,
      titre: "Ouverture de la nouvelle mÃ©diathÃ¨que",
      description:
        "La nouvelle mÃ©diathÃ¨que municipale ouvrira ses portes le 1er avril 2026. Un espace moderne de 800 mÂ² avec plus de 25 000 ouvrages, espace numÃ©rique et salle de confÃ©rence.",
      categorie: "Ã‰vÃ©nement",
      date: "10 janvier 2026",
      badge_class: "bg-purple-100 text-purple-700",
      bg_class: "bg-gradient-to-br from-indigo-400 to-indigo-600",
      created_at: "2026-01-10T00:00:00.000Z",
    },
  ],
  documents: [],
};

function read() {
  if (!fs.existsSync(dbPath)) return JSON.parse(JSON.stringify(SEED));
  try {
    return JSON.parse(fs.readFileSync(dbPath, "utf8"));
  } catch {
    return JSON.parse(JSON.stringify(SEED));
  }
}

function write(data) {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), "utf8");
}

function nextId(arr) {
  return arr.length > 0 ? Math.max(...arr.map((x) => x.id)) + 1 : 1;
}

// Auto-initialize
if (!fs.existsSync(dbPath)) write(JSON.parse(JSON.stringify(SEED)));

module.exports = { read, write, nextId };
