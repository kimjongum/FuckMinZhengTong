package moe.srsk.fuckmzt;

import android.content.Intent;
import android.view.MenuItem;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

public class OptionsMenu {

    public static boolean onOptionsItemMenuSelected(AppCompatActivity context, MenuItem item) {

        int itemId = item.getItemId();
        if (itemId == R.id.menu_setting_page) {
            Toast.makeText(context, "menui!", Toast.LENGTH_SHORT).show();
            Intent settingPage = new Intent(context, SettingActivity.class);
            context.startActivity(settingPage);
        } else if (itemId == R.id.menu_about_page) {
            Toast.makeText(context, "about!", Toast.LENGTH_SHORT).show();
        }

        return true;
    }
}
