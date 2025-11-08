#!/bin/bash

# Script de correction automatique pour Portify
# Execute ce script à la racine du projet

set -e

echo "🔧 Début des corrections automatiques Portify..."

# Couleurs pour les messages
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 1. Créer les fichiers Firebase manquants
echo -e "${BLUE}📁 Création des fichiers Firebase...${NC}"

# firestore.rules
cat > firestore.rules << 'EOF'
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Helper functions
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function isOwner(userId) {
      return isAuthenticated() && request.auth.uid == userId;
    }
    
    function isAdmin() {
      return isAuthenticated() && 
             get(/databases/$(database)/documents/users/$(request.auth.uid)).data.isAdmin == true;
    }
    
    // Users collection
    match /users/{userId} {
      allow read: if isAuthenticated();
      allow create: if isAuthenticated() && request.auth.uid == userId;
      allow update: if isOwner(userId) || isAdmin();
      allow delete: if isAdmin();
    }
    
    // Portfolios collection
    match /portfolios/{portfolioId} {
      allow read: if resource.data.isPublished == true || isOwner(resource.data.userId) || isAdmin();
      allow create: if isAuthenticated() && request.auth.uid == request.resource.data.userId;
      allow update: if isOwner(resource.data.userId) || isAdmin();
      allow delete: if isOwner(resource.data.userId) || isAdmin();
    }
    
    // Newsletter collection
    match /newsletter/{subscriberId} {
      allow read: if isAdmin();
      allow create: if true; // Public can subscribe
      allow update, delete: if isAdmin();
    }
    
    // App settings
    match /appSettings/{settingId} {
      allow read: if true;
      allow write: if isAdmin();
    }
  }
}
EOF

echo -e "${GREEN}✓ firestore.rules créé${NC}"

# storage.rules
cat > storage.rules << 'EOF'
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    
    // Helper function
    function isAuthenticated() {
      return request.auth != null;
    }
    
    // Profile photos
    match /portify/profiles/{userId}/{fileName} {
      allow read: if true;
      allow write: if isAuthenticated() && request.auth.uid == userId
                   && request.resource.size < 5 * 1024 * 1024
                   && request.resource.contentType.matches('image/.*');
    }
    
    // Project images
    match /portify/projects/{userId}/{fileName} {
      allow read: if true;
      allow write: if isAuthenticated() && request.auth.uid == userId
                   && request.resource.size < 5 * 1024 * 1024
                   && request.resource.contentType.matches('image/.*');
    }
    
    // CV files
    match /portify/cv/{userId}/{fileName} {
      allow read: if true;
      allow write: if isAuthenticated() && request.auth.uid == userId
                   && request.resource.size < 10 * 1024 * 1024
                   && request.resource.contentType.matches('application/pdf');
    }
  }
}
EOF

echo -e "${GREEN}✓ storage.rules créé${NC}"

# firebase.json
cat > firebase.json << 'EOF'
{
  "firestore": {
    "rules": "firestore.rules",
    "indexes": "firestore.indexes.json"
  },
  "storage": {
    "rules": "storage.rules"
  },
  "hosting": {
    "public": "out",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
EOF

echo -e "${GREEN}✓ firebase.json créé${NC}"

# firestore.indexes.json
cat > firestore.indexes.json << 'EOF'
{
  "indexes": [
    {
      "collectionGroup": "portfolios",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "userId", "order": "ASCENDING" },
        { "fieldPath": "createdAt", "order": "DESCENDING" }
      ]
    },
    {
      "collectionGroup": "portfolios",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "userId", "order": "ASCENDING" },
        { "fieldPath": "updatedAt", "order": "DESCENDING" }
      ]
    },
    {
      "collectionGroup": "portfolios",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "slug", "order": "ASCENDING" }
      ]
    }
  ],
  "fieldOverrides": []
}
EOF

echo -e "${GREEN}✓ firestore.indexes.json créé${NC}"

# 2. Créer robots.txt et sitemap
echo -e "${BLUE}📁 Création robots.txt et sitemap.xml...${NC}"

mkdir -p public

cat > public/robots.txt << 'EOF'
# Allow all crawlers
User-agent: *
Allow: /

# Sitemap
Sitemap: https://portify.app/sitemap.xml

# Disallow admin and auth pages
Disallow: /admin
Disallow: /login
Disallow: /signup
Disallow: /dashboard
Disallow: /create
Disallow: /settings
EOF

echo -e "${GREEN}✓ robots.txt créé${NC}"

cat > public/sitemap.xml << 'EOF'
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://portify.app/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://portify.app/templates</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://portify.app/pricing</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
EOF

echo -e "${GREEN}✓ sitemap.xml créé${NC}"

# 3. Créer .env.example
echo -e "${BLUE}📁 Création .env.example...${NC}"

cat > .env.example << 'EOF'
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_upload_preset

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Admin Email (for admin privileges)
NEXT_PUBLIC_ADMIN_EMAIL=admin@example.com
EOF

echo -e "${GREEN}✓ .env.example créé${NC}"

# 4. Créer .gitignore si inexistant
if [ ! -f .gitignore ]; then
  echo -e "${BLUE}📁 Création .gitignore...${NC}"
  
  cat > .gitignore << 'EOF'
# Dependencies
node_modules
/.pnp
.pnp.js

# Testing
/coverage

# Next.js
/.next/
/out/

# Production
/build

# Misc
.DS_Store
*.pem

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Local env files
.env*.local
.env

# Vercel
.vercel

# TypeScript
*.tsbuildinfo
next-env.d.ts
EOF

  echo -e "${GREEN}✓ .gitignore créé${NC}"
fi

# 5. Créer le dossier de scripts utilitaires
echo -e "${BLUE}📁 Création des scripts utilitaires...${NC}"

mkdir -p scripts

cat > scripts/deploy-firebase.sh << 'EOF'
#!/bin/bash

# Script de déploiement Firebase

echo "🚀 Déploiement Firebase..."

# Build Next.js
echo "📦 Build Next.js..."
npm run build
npm run export

# Deploy Firestore rules
echo "🔥 Déploiement des règles Firestore..."
firebase deploy --only firestore:rules

# Deploy Storage rules
echo "📦 Déploiement des règles Storage..."
firebase deploy --only storage

# Deploy hosting (optionnel)
# echo "🌐 Déploiement hosting..."
# firebase deploy --only hosting

echo "✅ Déploiement terminé!"
EOF

chmod +x scripts/deploy-firebase.sh

echo -e "${GREEN}✓ Scripts utilitaires créés${NC}"

# 6. Installer les dépendances manquantes si nécessaire
echo -e "${BLUE}📦 Vérification des dépendances...${NC}"

if ! npm list firebase-admin &> /dev/null; then
  echo -e "${YELLOW}Installation de firebase-admin pour les fonctions serverless...${NC}"
  npm install --save-dev firebase-admin
fi

echo -e "${GREEN}✓ Dépendances vérifiées${NC}"

# 7. Créer un fichier de configuration pour les types
echo -e "${BLUE}📁 Configuration TypeScript...${NC}"

cat > tsconfig.paths.json << 'EOF'
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/lib/*": ["./src/lib/*"],
      "@/types/*": ["./src/types/*"]
    }
  }
}
EOF

echo -e "${GREEN}✓ tsconfig.paths.json créé${NC}"

echo ""
echo -e "${GREEN}✅ Toutes les corrections automatiques sont terminées!${NC}"
echo ""
echo -e "${YELLOW}⚠️  Actions manuelles restantes:${NC}"
echo "1. Copier .env.local vers .env.example et remplir les valeurs"
echo "2. Déployer les règles Firebase: firebase deploy --only firestore:rules,storage"
echo "3. Appliquer les corrections de code fournies séparément"
echo "4. Tester l'application localement"
echo ""
echo -e "${BLUE}📚 Fichiers créés:${NC}"
echo "  - firestore.rules"
echo "  - storage.rules"
echo "  - firebase.json"
echo "  - firestore.indexes.json"
echo "  - public/robots.txt"
echo "  - public/sitemap.xml"
echo "  - .env.example"
echo "  - scripts/deploy-firebase.sh"
echo "  - tsconfig.paths.json"
echo ""