# Gradle wrapper

The official Gradle 8.10.2 wrapper scripts and JAR are committed. CI runs `./gradlew` from this directory. The distribution SHA-256 is pinned in the properties file.

Wrapper JAR SHA-256: `2db75c40782f5e8ba1fc278a5574bab070adccb2d21ca5a6e5ed840888448046`. Verified against https://services.gradle.org/distributions/gradle-8.10.2-wrapper.jar.sha256.

Run `./gradlew testDebugUnitTest assembleDebug`. Instrumented tests require an emulator or attached Android device: `./gradlew connectedDebugAndroidTest`.
