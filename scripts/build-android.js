const buildAndroid = async () => {
  try {
    // 1. Build the Next.js app
    console.log('Building Next.js app...');
    await execCommand('npm run build');

    // 2. Copy the build to Android
    console.log('Copying build to Android...');
    await execCommand('npx cap copy');

    // 3. Update Android native project
    console.log('Updating Android project...');
    await execCommand('npx cap update android');

    // 4. Open Android Studio
    console.log('Opening Android Studio...');
    await execCommand('npx cap open android');

    console.log('Setup complete! You can now build and run the app in Android Studio');
  } catch (error) {
    console.error('Error:', error);
  }
};

const execCommand = (command) => {
  return new Promise((resolve, reject) => {
    const { exec } = require('child_process');
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing command: ${error}`);
        reject(error);
        return;
      }
      console.log(stdout);
      resolve();
    });
  });
};

buildAndroid();
