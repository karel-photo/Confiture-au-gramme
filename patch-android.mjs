// Ajoute les permissions d'alarme exacte + vibration au manifeste Android,
// et l'icone de notification. Lance automatiquement par le robot de build,
// apres la generation du projet Android. Ne rien avoir a faire a la main.
import fs from 'fs';

const manifestPath = 'android/app/src/main/AndroidManifest.xml';
let m = fs.readFileSync(manifestPath, 'utf8');

const perms = [
  'SCHEDULE_EXACT_ALARM',
  'USE_EXACT_ALARM',
  'VIBRATE',
  'POST_NOTIFICATIONS',
  'WAKE_LOCK',
  'RECEIVE_BOOT_COMPLETED'
];

let add = '';
for (const p of perms) {
  if (!m.includes('android.permission.' + p)) {
    add += '    <uses-permission android:name="android.permission.' + p + '" />\n';
  }
}
if (add) {
  m = m.replace('</manifest>', add + '</manifest>');
  fs.writeFileSync(manifestPath, m);
}
console.log('Permissions ajoutees.');

const drawableDir = 'android/app/src/main/res/drawable';
fs.mkdirSync(drawableDir, { recursive: true });
fs.writeFileSync(drawableDir + '/ic_stat_icon.xml',
`<vector xmlns:android="http://schemas.android.com/apk/res/android"
    android:width="24dp" android:height="24dp"
    android:viewportWidth="24" android:viewportHeight="24">
    <path android:fillColor="#FFFFFF"
        android:pathData="M7,3 H17 V5 H7 Z M8,7 H16 A2,2 0 0 1 18,9 V19 A2,2 0 0 1 16,21 H8 A2,2 0 0 1 6,19 V9 A2,2 0 0 1 8,7 Z" />
</vector>
`);
console.log('Icone de notification creee.');
