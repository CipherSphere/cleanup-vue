#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// List of items to delete (relative to the project root)
const itemsToDelete = [
  '/src/assets/logo.svg',
  '/src/icons/', // Directory to delete
  '/src/components/HelloWorld.vue',
  '/src/components/TheWelcome.vue',
  '/src/components/WelcomeItem.vue',
  '/src/views/AboutView.vue',
  '/src/views/HomeView.vue',
];

// File to clear (relative to the project root)
const fileToClear = '/src/assets/main.css';

// Base path of your Vue project (current working directory)
const basePath = process.cwd();

// Function to delete files and directories
function cleanVueProject() {
  itemsToDelete.forEach((item) => {
    const fullPath = path.join(basePath, item);
    try {
      if (fs.existsSync(fullPath)) {
        const stats = fs.statSync(fullPath);
        if (stats.isDirectory()) {
          // Use fs.rmSync for directories
          fs.rmSync(fullPath, { recursive: true, force: true });
          console.log(`Deleted directory: ${item}`);
        } else {
          // Use fs.unlinkSync for files
          fs.unlinkSync(fullPath);
          console.log(`Deleted file: ${item}`);
        }
      } else {
        console.warn(`Path does not exist: ${item}`);
      }
    } catch (err) {
      console.error(`Error deleting ${item}: ${err.message}`);
    }
  });

  // Clear the contents of the CSS file
  const cssFilePath = path.join(basePath, fileToClear);
  try {
    if (fs.existsSync(cssFilePath)) {
      fs.writeFileSync(cssFilePath, '');
      console.log(`Cleared contents of file: ${fileToClear}`);
    } else {
      console.warn(`CSS file does not exist: ${fileToClear}`);
    }
  } catch (err) {
    console.error(`Error clearing CSS file: ${err.message}`);
  }
}

// Run the cleanup function
cleanVueProject();
