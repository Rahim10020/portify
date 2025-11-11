#!/bin/bash

# Script de déploiement Firebase

echo "🚀 Déploiement Firebase..."

# Build Next.js
echo "📦 Build Next.js..."
npm run build
npm run export

# Deploy Firestore rules and indexes
echo "🔥 Déploiement des règles et index Firestore..."
firebase deploy --only firestore

# Deploy Storage rules
echo "📦 Déploiement des règles Storage..."
firebase deploy --only storage

# Deploy hosting (optionnel)
# echo "🌐 Déploiement hosting..."
# firebase deploy --only hosting

echo "✅ Déploiement terminé!"
