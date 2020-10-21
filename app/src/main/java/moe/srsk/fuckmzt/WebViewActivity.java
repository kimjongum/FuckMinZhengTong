package moe.srsk.fuckmzt;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;

import android.content.Intent;
import android.os.Bundle;
import android.view.Window;
import android.webkit.WebResourceRequest;
import android.webkit.WebView;
import android.webkit.WebViewClient;

public class WebViewActivity extends AppCompatActivity {

    String webURL = "file:///android_asset/mzt.html";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_web_view);

        Toolbar tb = findViewById(R.id.fake_mzttoolbar);
        tb.setTitle("<          八闽健康码");
        setSupportActionBar(tb);


        WebView wv = findViewById(R.id.webview);
        wv.getSettings().setAllowFileAccess(true);
        wv.getSettings().setAllowFileAccessFromFileURLs(true);
        wv.getSettings().setAllowContentAccess(true);
        wv.getSettings().setJavaScriptEnabled(true);

        Intent it = getIntent();
        Bundle ex = it.getExtras();
        String name = ex.getString("name");
        String id = ex.getString("id");

        webURL = webURL + "?name=" + name + "&idcard=" + id;

        wv.loadUrl(webURL);
        wv.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                view.loadUrl(webURL);
                return true;
            }
        });


    }

    @Override
    public void onBackPressed() {
        startActivity(new Intent(this, MainActivity.class));
        sendBroadcast(new Intent(MainActivity.EXIT_BROADCAST));
    }

}