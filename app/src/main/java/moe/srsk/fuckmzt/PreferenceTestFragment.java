package moe.srsk.fuckmzt;

import android.os.Bundle;
import android.preference.PreferenceFragment;

public class PreferenceTestFragment extends PreferenceFragment {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        addPreferencesFromResource(R.xml.preference_setting);//加载xml文件
    }
}