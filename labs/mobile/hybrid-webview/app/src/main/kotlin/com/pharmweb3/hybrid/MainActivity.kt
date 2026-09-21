package com.pharmweb3.hybrid

import android.app.Activity
import android.os.Bundle
import android.webkit.WebView
import android.webkit.WebViewClient

class MainActivity : Activity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val webView = WebView(this)
        webView.webViewClient = WebViewClient()
        webView.settings.javaScriptEnabled = true
        webView.addJavascriptInterface(TelemetryBridge(this), "Telemetry")
        webView.loadData(
            "<html><body><h1>PharmWeb3 Hybrid Lab</h1><script>Telemetry.event('webview.loaded')</script></body></html>",
            "text/html", "UTF-8", null
        )
        setContentView(webView)
    }
}
