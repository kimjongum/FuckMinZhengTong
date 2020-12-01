package moe.srsk.fuckmzt;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.webkit.WebResourceRequest;
import android.webkit.WebView;
import android.webkit.WebViewClient;

public class WebViewActivity extends AppCompatActivity {

    private String webUrl = "file:///android_asset/mzt.html";

    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_web_view);

        Toolbar tb = findViewById(R.id.fake_mzttoolbar);
        tb.setTitle("八闽健康码");

        setSupportActionBar(tb);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        getSupportActionBar().setHomeButtonEnabled(true);

        WebView wv = findViewById(R.id.webview);
        wv.getSettings().setAllowFileAccess(true);
        //wv.getSettings().setAllowFileAccessFromFileURLs(true);
        wv.getSettings().setAllowContentAccess(true);
        wv.getSettings().setJavaScriptEnabled(true);

        Intent it = getIntent();
        Bundle ex = it.getExtras();
        String name = ex.getString("name");
        String id = ex.getString("id");

        webUrl = webUrl + "?name=" + name + "&idcard=" + id;

        wv.loadUrl(webUrl);
        wv.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                view.loadUrl(webUrl);
                return true;
            }
        });


    }

    @Override
    public boolean onOptionsItemSelected(@NonNull MenuItem item) {
        return OptionsMenu.onOptionsItemMenuSelected(this, item);
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.setting_menui, menu);
        return true;
    }

    @Override
    public void onBackPressed() {
        startActivity(new Intent(this, MainActivity.class));
        sendBroadcast(new Intent(MainActivity.EXIT_BROADCAST));
    }

}