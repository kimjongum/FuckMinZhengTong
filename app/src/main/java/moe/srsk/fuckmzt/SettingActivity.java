package moe.srsk.fuckmzt;


import android.os.Bundle;
import android.preference.PreferenceActivity;
import android.widget.Toast;

import androidx.preference.PreferenceManager;

public class SettingActivity extends PreferenceActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        addPreferencesFromResource(R.xml.preference_setting);
    }

    @Override
    public void onBackPressed() {
        Toast.makeText(this, "设置已保存，请重新加载健康码。", Toast.LENGTH_LONG).show();
        super.onBackPressed();
    }
}
