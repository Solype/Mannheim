#!/bin/sh
# Chemin de l'APK dans le volume monté
APK_SOURCE_PATH="/shared/app-release.apk"
# Chemin de destination dans le dossier public de NGINX
APK_DEST_PATH="/usr/share/nginx/html/public/client.apk"

# Vérifier si l'APK est présent dans /shared et le copier
if [ -f "$APK_SOURCE_PATH" ]; then
    echo "APK trouvé, déplacement vers $APK_DEST_PATH"
    mv "$APK_SOURCE_PATH" "$APK_DEST_PATH"
else
    echo "APK non trouvé dans /shared"
fi
