package moe.srsk.fuckmzt;

import android.content.Context;
import android.util.Log;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.UnsupportedEncodingException;

public class DataUtils {


    public static void save(Context context, String name, String id) {
        try {
            write(new File(context.getFilesDir(), "data.txt"), name + "," + id);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }


    private static void write(File f, String content) throws IOException {
        FileWriter fw = new FileWriter(f);
        fw.write(content);
        fw.flush();
        fw.close();
    }

    private static String read(File f) {
        return readToString(f);
    }

    public static boolean isDataExist(Context c) {
        return new File(c.getFilesDir(), "data.txt").exists();
    }

    public static String[] getData(Context context) {
        if (isDataExist(context)) {
            File f = new File(context.getFilesDir(), "data.txt");
            return read(f).split(",");
        }
        throw new IllegalStateException("错误状态，文件不存在");
    }

    private static String readToString(File file) {
        String encoding = "utf-8";
        long filelength = file.length();
        byte[] filecontent = new byte[(int) filelength];
        try {
            FileInputStream in = new FileInputStream(file);
            in.read(filecontent);
            in.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        try {
            return new String(filecontent, encoding);
        } catch (UnsupportedEncodingException e) {
            System.err.println("The OS does not support " + encoding);
            e.printStackTrace();
            return null;
        }
    }
}
