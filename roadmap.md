# 📜 Roadmap - Eldritch Clicker

## 🧱 Structure technique

```
src/
├── components/          # Eye, Tentacle, MiniCreature, etc.
├── hooks/               # Hooks personnalisés (useEssenceIncrement, useAutoClickers…)
├── store/               # Redux Toolkit (slices modulaires)
├── Helpers/             # Fonctions utilitaires (color shift, save, debug)
├── constants/           # Constantes : segment count, essence, skins…
├── data/                # Skins (skins.json), upgrades futurs
└── styles/              # CSS / Tailwind utils
```

---

## ✅ Phase 1 - Core loop (Terminé)

- [x] Click manuel sur l'œil
- [x] Tentacules segmentées par clics
- [x] Ventouses liées aux segments
- [x] Apparition d’une créature cosmique après 1600 essence
- [x] Mini créatures animées dans le fond
- [x] Skins assignés à chaque créature
- [x] Hook custom pour `useEssenceIncrement`
- [x] Autoclickers débloqués à coût croissant
- [x] Animations CSS (floaty, dance, wiggle, eye-pop)
- [x] Debug panel toggle (DEBUG mode)

---

## 🔄 Phase 2 - Architecture & Scalabilité

- [x] Passage complet à Redux Toolkit
- [x] `essenceSlice`, `creatureSlice`, `tentacleSlice`, `autoClickerSlice`
- [x] Gestion de l’animation via `animationSlice`
- [x] Gestion des créatures générées et reset des tentacules
- [x] Externalisation des skins (`skins.json`)
- [x] Optimisations : memoisation, rendu contrôlé

---

## 🧠 Phase 3 - Gameplay étendu

- [ ] Refonte du système d’achat (feedback UI, effet de dépense)
- [x] Persistance complète (save/load Redux state)
- [ ] Ajout de **bonus passifs** (ex : +1 essence par clic, auto-suckers)
- [x] Équilibrage du scaling (prix autoClickers, progression exponentielle)
- [ ] Système de **prestige** : relancer le jeu avec bonus (à la Paperclip)
- [ ] **Succès** et galerie de créatures générées

---

## 🌍 Phase 4 - Narration & World Map

- [x] Ajout d’un écran d’accueil (nom du jeu, start, credits)
- [x] Menu latéral (burger) : total essence, skins, lore, changements de scène
- [x] Map de conquête (Terre → Espace → Multivers)
- [ ] Création de divinités cosmiques tous les 100 rejetons
- [ ] Rythme d’apparition des autoClickers / unités / divinités
- [ ] Système de Wargame : cultistes, villes à conquérir, ennemis humains

---

## 🔮 Inspirations futures

- [ ] Système de météo cosmique (nuages, particules)
- [ ] Défis journaliers ou aléatoires
- [ ] Fusion de créatures / mutation
- [x] Générateur aléatoire de noms lovecraftiens (ex: Yog-D’thuun-S’lorr)

---

## 🤝 Auteur

**Seteemio**

> Développeur, metalhead, architecte de tentacules.
