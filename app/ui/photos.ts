// Fotos de ejemplo (Unsplash) para las páginas de marketing. Sustitúyelas por
// fotos propias en /public cuando las tengas.
function unsplash(id: string) {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=80`;
}

export const photos = {
  bouquet: {
    src: unsplash("photo-1519741497674-611481863552"),
    alt: "Ramo de novia a contraluz",
  },
  wedding: {
    src: unsplash("photo-1511285560929-80b456fea0bc"),
    alt: "Pareja de recién casados soltando globos junto a la piscina",
  },
  mountains: {
    src: unsplash("photo-1469474968028-56623f02e42e"),
    alt: "Valle de montaña con niebla al amanecer",
  },
  lake: {
    src: unsplash("photo-1503220317375-aaad61436b1b"),
    alt: "Viajero con mochila frente a un lago entre montañas",
  },
  sunsetGroup: {
    src: unsplash("photo-1511895426328-dc8714191300"),
    alt: "Familia de la mano en la playa al atardecer",
  },
  friends: {
    src: unsplash("photo-1529156069898-49953e39b3ac"),
    alt: "Grupo de amigos abrazados mirando el paisaje",
  },
  prints: {
    src: unsplash("photo-1452587925148-ce544e77e70d"),
    alt: "Cámara analógica junto a fotos impresas sobre un mapa",
  },
  street: {
    src: unsplash("photo-1527631746610-bca00a040d60"),
    alt: "Viajera caminando por una calle estrecha",
  },
  road: {
    src: unsplash("photo-1500530855697-b586d89ba3ee"),
    alt: "Carretera entre rocas rojas del desierto",
  },
  camera: {
    src: unsplash("photo-1516035069371-29a1b244cc32"),
    alt: "Cámara y objetivos sobre fondo oscuro",
  },
  // Login
  hands: {
    src: unsplash("photo-1520854221256-17451cc331bf"),
    alt: "Novios cogidos de la mano",
  },
  boat: {
    src: unsplash("photo-1476514525535-07fb3b4ae5f1"),
    alt: "Barca de madera en un lago entre montañas",
  },
  laughing: {
    src: unsplash("photo-1491438590914-bc09fcaaf77a"),
    alt: "Amigas riéndose juntas",
  },
  // Registro
  familyBeach: {
    src: unsplash("photo-1475503572774-15a45e5d60b9"),
    alt: "Familia de la mano en la orilla del mar",
  },
  balloons: {
    src: unsplash("photo-1530103862676-de8c9debad1d"),
    alt: "Globos de colores en una fiesta de cumpleaños",
  },
  beach: {
    src: unsplash("photo-1507525428034-b723cf961d3e"),
    alt: "Playa de aguas turquesa al atardecer",
  },
} as const;

export type PhotoKey = keyof typeof photos;
