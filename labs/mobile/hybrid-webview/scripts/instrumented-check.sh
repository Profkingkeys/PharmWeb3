#!/usr/bin/env bash
set -euo pipefail
trap 'adb logcat -d -b crash > emulator-crash.log; cat emulator-crash.log' EXIT
adb logcat -c
./gradlew connectedDebugAndroidTest --stacktrace
