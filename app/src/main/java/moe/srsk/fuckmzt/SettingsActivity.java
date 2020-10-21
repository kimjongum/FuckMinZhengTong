package moe.srsk.fuckmzt;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

public class SettingsActivity extends AppCompatActivity {

    private EditText nameET;
    private EditText idET;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_settings);


        this.nameET = findViewById(R.id.Text_Name);
        this.idET = findViewById(R.id.Text_ID);

        addField();

        Button saveBtn = findViewById(R.id.savebutton);

        saveBtn.setOnClickListener(v -> {

            String name = nameET.getText().toString();
            String id = idET.getText().toString();
            DataUtils.save(this, name, id);

            Toast.makeText(this, "已保存", Toast.LENGTH_LONG).show();
            startActivity(new Intent(this, MainActivity.class));
        });

    }

    @Override
    public void onBackPressed() {
        startActivity(new Intent(this, MainActivity.class));
        sendBroadcast(new Intent(MainActivity.EXIT_BROADCAST));
    }

    private void addField() {
        if (DataUtils.isDataExist(this)) {
            Toast.makeText(this, "已成功读取记录", Toast.LENGTH_LONG).show();
            String[] data = DataUtils.getData(this);
            nameET.setText(data[0]);
            idET.setText(data[1]);
        }
    }

}