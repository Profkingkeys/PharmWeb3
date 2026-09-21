plugins {
    id("com.android.application")
    kotlin("android")
}

android {
    namespace="com.pharmweb3.hybrid"
    compileSdk=35
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
    kotlinOptions { jvmTarget = "17" }
    defaultConfig {
        applicationId="com.pharmweb3.hybrid"
        minSdk=24
        targetSdk=35
        versionCode=1
        versionName="1.0"
        testInstrumentationRunner="androidx.test.runner.AndroidJUnitRunner"
    }
}

dependencies {
    implementation("androidx.activity:activity-ktx:1.10.1")
    androidTestImplementation("androidx.test.espresso:espresso-core:3.6.1")
    androidTestImplementation("androidx.test:runner:1.6.1")
    androidTestImplementation("androidx.test:rules:1.6.1")
    androidTestImplementation("androidx.test.ext:junit:1.2.1")
}
