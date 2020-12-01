package moe.srsk.fuckmzt;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.preference.PreferenceManager;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

import java.io.File;

public class MainActivity extends AppCompatActivity {


    public static final String EXIT_BROADCAST = "exitfuckmzt";

    ExitReceiver exitReceiver = new ExitReceiver();

    private static SharedPreferences conf = null;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        //清理v1.3.0及之前版本数据
        File f = new File(this.getFilesDir(), "data.txt");
        if (f.exists()) {
            f.delete();
        }

        //加载配置
        conf = PreferenceManager.getDefaultSharedPreferences(this);

        IntentFilter filter = new IntentFilter();
        filter.addAction(EXIT_BROADCAST);
        registerReceiver(exitReceiver, filter);

        //注册按钮监听
        findViewById(R.id.btn_click2gen).setOnClickListener(v -> {
            startQrCodeActivity();
        });
        findViewById(R.id.btn_setting).setOnClickListener(v -> {
            startActivity(new Intent(this, SettingActivity.class));
        });


    }

    private void startQrCodeActivity() {
        Intent it = new Intent(this, WebViewActivity.class);
        it.putExtra("name", conf.getString("name_preference", ""));
        it.putExtra("id", conf.getString("idcard_preference", ""));
        startActivity(it);
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
    protected void onResume() {
        super.onResume();

        //引导用户设置个人信息
        Button click2gen = (Button) findViewById(R.id.btn_click2gen);
        //未设置姓名和身份证
        if (conf.getString("name_preference", "").isEmpty()
                || conf.getString("idcard_preference", "").isEmpty()) {
            Toast.makeText(this, "请先设置您的个人信息！", Toast.LENGTH_LONG).show();

            click2gen.setEnabled(false);
        } else {
            click2gen.setEnabled(true);
            //跳过主页
            if (conf.getBoolean("skip_mainpage_switch_preference", false)) {
                startQrCodeActivity();
            }
        }
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        unregisterReceiver(this.exitReceiver);
    }

    class ExitReceiver extends BroadcastReceiver {
        @Override
        public void onReceive(Context context, Intent intent) {
            finish();
        }
    }
}