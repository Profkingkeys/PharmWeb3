plugins {
    id("com.android.application")
    kotlin("android")
}

android {
    namespace="com.pharmweb3.hybrid"
    compileSdk=35
    defaultConfig {
        applicationId="com.pharmweb3.hybrid"
        minSdk=24
        targetSdk=35
        versionCode=1
        versionName="1.0"
    }
}

dependencies {
    implementation("androidx.activity:activity-ktx:1.10.1")
}
