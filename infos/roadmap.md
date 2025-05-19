# 📜 Roadmap - Eldritch Clicker

## 🧱 Structure technique

```plaintext
src/
├── components/         # Eye, Tentacle, MiniCreature, WorldMap, CountryDetails, etc.
├── hooks/              # useEssenceIncrement, useAutoClickers, useConquestCountries, etc.
├── store/              # Redux Toolkit slices (modulaires)
├── helpers/            # Fonctions utilitaires : calculs, color, save, debug...
├── constants/          # Constantes : segments, essence, skins, ressources...
├── data/                # JSON : skins, pays, capacités, rituels...
└── styles/              # CSS / Tailwind utils
```

---

## ✅ Phase 1 - Core Loop (Terminé)

- [x] Click manuel sur l'œil
- [x] Tentacules segmentées et animées
- [x] Ventouses automatiques par segments
- [x] Créatures cosmiques générées après 1600 essence
- [x] Skins déblocables et stockés en JSON
- [x] Autoclickers avec scaling exponentiel
- [x] Animations CSS (wiggle, floaty, eye-pop, etc.)
- [x] Mode debug avec affichage des slices Redux
- [x] Architecture Redux propre et modulaire

---

## 🔄 Phase 2 - Architecture & Scalabilité (Terminé)

- [x] Passage complet à Redux Toolkit
- [x] State persistant en localStorage
- [x] Slices Redux : essence, créatures, corruption, fervor, autoClickers, animation...
- [x] Externalisation des skins et données de capacités
- [x] Optimisations des rendus et calculs (memoization)

---

## 🧠 Phase 3 - Gameplay Étendu (En cours)

- [x] Système de Prestige (type Universal Paperclips)
- [x] Persistance complète du state Redux
- [x] Refonte du système d’achat avec feedback visuel
- [x] Galerie de créatures générées
- [ ] Fusion et mutation des créatures
- [ ] Bonus passifs : +1 essence par clic, auto-suckers
- [ ] Skills des créatures façon "casino"

---

## 🌍 Phase 4 - Conquête du Monde (Prioritaire)

### ✅ Fonctionnalités de base :

- [x] Système de conquête des pays basé sur essence et population
- [x] Indoctrination progressive des pays (IndoctrinationLevel)
- [x] Gestion des compatibilités skills / pays (forces & faiblesses)

### 🛠️ En cours :

- [x] Calcul des coûts modulé par compatibilités
- [ ] Ajout du Mode "Rush" (consommation de ferveur, accélération de conquête)
- [x] Calcul dynamique des durées de conquête (réduction si plusieurs octopodes)
- [x] UI complète pour la sélection des pays et détails des attaques
- [x] Intégration de l’écran d’attaque avec feedback visuel et compatibilités
- [x] Mécanique de mort et Farewell (gain de corruption ou ferveur)
- [ ] Mécanique de level up des octopodes en cas de victoire

### 🔮 À venir :

- [ ] Divinités cosmiques créées tous les 100 rejetons
- [ ] Passage à la conquête de l’espace après la Terre
- [ ] Système de mémoire des octopodes vaincus (in memoriam)
- [ ] Système de nommage des batailles
- [ ] Lore et rituels débloquables (avec coût en essence, corruption ou ferveur)
- [ ] Version Low-config en cas d'utilisation sur un pc peu puissant
- [ ] Optimisation des time interval pour les ticks de prise de ressources
- [ ] Formattage des ressources (m, M etc...)

---

## 🚀 Phase 5 - Extension Cosmique

- [ ] Système de météo cosmique (particules, tempêtes de corruption)
- [ ] Affrontements cosmiques (Devourer of Worlds : Zhorr’Khalith)

---

## 🤝 Auteur

**Seteemio**

> Développeur, metalhead, architecte de tentacules et conquérant de mondes perdus 🌌
