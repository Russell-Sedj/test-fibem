var d=require("./src/db");var r=d.read().actualites;process.stdout.write(r[1].categorie.charCodeAt(0)+" "+r[2].titre.charCodeAt(0)+"\n");
