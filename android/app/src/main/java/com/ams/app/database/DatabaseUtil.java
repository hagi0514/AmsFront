package com.ams.app.database;

import android.content.Context;
import android.content.res.AssetManager;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

public class DatabaseUtil {

    private static final String DATABASE_NAME = "auction.db";

    public static void copyDatabase(Context context) throws IOException {
        AssetManager assetManager = context.getAssets();
        InputStream inputStream = assetManager.open(DATABASE_NAME);
        String outFileName = context.getDatabasePath(DATABASE_NAME).getPath();

        // Create directories if not exists
        java.io.File databaseDir = new java.io.File(outFileName).getParentFile();
        if (!databaseDir.exists()) {
            databaseDir.mkdirs();
        }

        OutputStream outputStream = new FileOutputStream(outFileName);

        byte[] buffer = new byte[1024];
        int length;
        while ((length = inputStream.read(buffer)) > 0) {
            outputStream.write(buffer, 0, length);
        }

        outputStream.flush();
        outputStream.close();
        inputStream.close();
    }

    public static boolean checkDatabase(Context context) {
        java.io.File file = context.getDatabasePath(DATABASE_NAME);
        return file.exists();
    }
}
