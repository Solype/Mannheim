# Utiliser une image Debian comme base
FROM ubuntu:20.04

# Installer les dépendances système nécessaires
RUN apt-get update && apt-get install -y \
    wget \
    curl \
    unzip \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Installer OpenJDK 17
RUN apt-get update && apt-get install -y openjdk-17-jdk && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs && \
    apt-get clean

ENV ANDROID_HOME /opt/android-sdk
ENV PATH ${PATH}:${ANDROID_HOME}/tools/bin:${ANDROID_HOME}/platform-tools


RUN mkdir -p $ANDROID_HOME && \
    cd $ANDROID_HOME && \
    wget https://dl.google.com/android/repository/commandlinetools-linux-6609375_latest.zip && \
    unzip commandlinetools-linux-6609375_latest.zip && \
    rm commandlinetools-linux-6609375_latest.zip

RUN ls -la /opt/android-sdk/tools/bin

RUN echo $ANDROID_HOME

RUN yes | sdkmanager --licenses --sdk_root=$ANDROID_HOME

RUN yes | sdkmanager "platform-tools" "platforms;android-30" "build-tools;30.0.3" --sdk_root=$ANDROID_HOME

RUN yes | sdkmanager --sdk_root=$ANDROID_HOME --list

RUN yes | sdkmanager --sdk_root=$ANDROID_HOME "ndk;26.1.10909125"

WORKDIR /app

COPY . .

RUN npm install --force

RUN mkdir -p android/app/src/main/assets

RUN touch android/app/src/main/assets/index.android.bundle

RUN npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res

WORKDIR /app/android

RUN mkdir -p /shared

CMD ./gradlew assembleRelease && cp /app/android/app/build/outputs/apk/release/app-release.apk /shared
