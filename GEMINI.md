# AVIATOR Barber Shop — Documentation Projet

## 🏗 Architecture
- **Frontend** : React (Vite) + Tailwind CSS + Framer Motion.
- **Backend** : API PHP personnalisée (dossier `/api`).
- **Base de données** : MySQL (MariaDB).
- **Déploiement** : 
  - Frontend : Vercel (via GitHub).
  - Backend/DB : Hostinger (ou XAMPP en local).

## 🌍 Système i18n
Le projet utilise un système de traduction personnalisé (`src/lib/i18n/`) :
- **Langues supportées** : Français (FR), Anglais (EN), Arabe (AR).
- **Support RTL** : Automatique lors de la sélection de l'Arabe (changement de direction du DOM et des polices).
- **Persistance** : Choix sauvegardé dans le `localStorage`.

## 🛡 Administration
- **URL** : `/admin`
- **Dashboard** : Vue globale avec KPIs (Réservations, Clients, Top Barbier/Service) et graphique d'activité.
- **Gestion** : Multi-filtres (statut, date, barbier, service) et recherche instantanée.
- **Workflow** : En attente ➔ Confirmé ➔ Servi (ou Annulé).

## 🛠 Commandes Utiles
- `npm run dev` : Lancement du serveur de développement.
- `npm run build` : Génération du build de production (compatible Vercel/Hostinger).
- `git push origin main` : Déclenche le déploiement automatique sur Vercel.

## 📝 Conventions
- **API** : Toujours utiliser `API_BASE` défini dans `src/lib/store.ts` pour gérer le basculement local/prod.
- **SQL** : Le schéma de référence est `src/lib/schema_mysql.sql`.
