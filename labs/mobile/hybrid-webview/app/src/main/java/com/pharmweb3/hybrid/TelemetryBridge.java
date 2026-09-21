package com.pharmweb3.hybrid;

import android.content.Context;
import android.webkit.JavascriptInterface;
import android.widget.Toast;

public final class TelemetryBridge {
    private final Context context;
    public TelemetryBridge(Context context) { this.context=context.getApplicationContext(); }
    @JavascriptInterface
    public void event(String name) {
        Toast.makeText(context, "telemetry: " + name, Toast.LENGTH_SHORT).show();
    }
}
