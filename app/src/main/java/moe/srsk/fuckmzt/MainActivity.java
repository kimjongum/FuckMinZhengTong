package moe.srsk.fuckmzt;

import androidx.appcompat.app.AppCompatActivity;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.Bundle;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity {


    public static final String EXIT_BROADCAST = "exitfuckmzt";

    ExitReceiver exitReceiver = new ExitReceiver();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        IntentFilter filter = new IntentFilter();
        filter.addAction(EXIT_BROADCAST);
        registerReceiver(exitReceiver, filter);

        init();
    }

    private void init() {

        if (!DataUtils.isDataExist(this)) {
            Toast.makeText(this, "请先设置健康码信息", Toast.LENGTH_LONG).show();
            Intent intent = new Intent(this, ProfileSettingsActivity.class);
            intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
            startActivity(intent);
        } else {
            Intent it = new Intent(this, WebViewActivity.class);
            String[] arr = DataUtils.getData(this);
            it.putExtra("name", arr[0]);
            it.putExtra("id", arr[1]);
            it.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
            startActivity(it);
        }
    }

    @Override
    protected void onResume() {
        super.onResume();
        init();
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