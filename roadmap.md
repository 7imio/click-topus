# 🐙 Eldritch Clicker - Roadmap

> Un idle game tentaculaire à la Universal Paperclips. Le joueur incarne un œil cosmique contrôlant des pieuvres pour envahir le monde.

---

## 🎯 Objectifs principaux

- Créer un idle game réactif, scalable et évolutif.
- Mettre en place une progression narrative et mécanique inspirée de Universal Paperclips.
- Utiliser des concepts modernes : Redux, POO (modérée), animations CSS, hooks personnalisés.

---

## 🧱 Architecture du projet

```
src/
├── components/        # Composants UI pures (Tentacle, Eye, Sucker...)
├── features/          # Domaines fonctionnels (clicker, tentacle, invasion...)
├── hooks/             # Hooks personnalisés (useInterval, etc.)
├── store/             # Redux Toolkit (score, game state...)
├── utils/             # Fonctions utilitaires (save, gradient...)
├── data/              # JSON de configuration des upgrades, stages...
├── styles/            # Fichiers CSS globaux et spécifiques
└── App.tsx / main.tsx
```

---

## 🧭 Roadmap par étapes

### ✅ Phase 1 - Prototype de base

- [x] Score qui augmente au clic sur l'œil
- [x] Tentacules disposées autour de l'œil
- [x] Ventouses réparties automatiquement
- [x] Animation de clignement aléatoire
- [x] Paupière animée avec couleur des tentacules
- [x] Sauvegarde du score dans le `localStorage`

### 🔄 Phase 2 - Refonte scalable

- [ ] Intégrer Redux Toolkit (`scoreSlice`, `tentacleSlice`, etc.)
- [ ] Déplacer la logique métier dans `features/`
- [ ] Refonte des composants pour meilleure isolation
- [ ] Gestion des pieuvres complètes (800 points = nouvelle pieuvre)
- [ ] Affichage d’une pieuvre cosmique en fond

### 🧠 Phase 3 - Progression et autoclickers

- [ ] Ajout d’autoclickers (avec upgrades)
- [ ] Système d’améliorations (ventouses automatiques, +points par clic...)
- [ ] Stockage des données d’upgrade dans `/data`
- [ ] Progression narrative : invasion de villes, nations, monde, espace...

### ✨ Phase 4 - Polish et FX

- [ ] Ajout de bulles animées en fond (effet abyssal)
- [ ] Ajout de sons sur les clics (wet blop 💧)
- [ ] Transitions visuelles pour les changements de pieuvre
- [ ] Effets de particules ou d’encre
- [ ] Couleurs à débloquer

---

## 🧬 Inspirations

- Universal Paperclips
- Cookie Clicker
- Amarillo's Butt slapper
- L’univers de Lovecraft, Subnautica, et un peu de Rick & Morty (visuellement)

---

## 🗃️ À venir

- Écran d'accueil
- Système de prestige (avec amélioration permanente)
- Galaxie de pieuvres ? Génération de race ? On verra...

---
