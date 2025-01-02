#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const itemsToDelete = [
  '/src/assets/logo.svg',
  '/src/assets/base.css',
  '/src/components/icons', 
  '/src/components/HelloWorld.vue',
  '/src/components/TheWelcome.vue',
  '/src/components/WelcomeItem.vue',
  '/src/views/AboutView.vue',
  '/src/views/HomeView.vue',
];

const fileToClear = '/src/assets/main.css';
const routerFilePath = '/src/router/index.js';

const basePath = process.cwd();

function cleanVueProject() {
  itemsToDelete.forEach((item) => {
    const fullPath = path.join(basePath, item);
    try {
      if (fs.existsSync(fullPath)) {
        const stats = fs.statSync(fullPath);
        if (stats.isDirectory()) {
          fs.rmSync(fullPath, { recursive: true, force: true });
          console.log(`Deleted directory: ${item}`);
        } else {
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

  const routerPath = path.join(basePath, routerFilePath);
  try {
    if (fs.existsSync(routerPath)) {
      fs.writeFileSync(routerPath, 'import { createRouter, createWebHistory } from "vue-router";\n\nconst routes = [];\n\nconst router = createRouter({\n  history: createWebHistory(process.env.BASE_URL),\n  routes,\n});\n\nexport default router;');
      console.log(`Removed all routes from: ${routerFilePath}`);
    } else {
      console.warn(`Router file does not exist: ${routerFilePath}`);
    }
  } catch (err) {
    console.error(`Error clearing router file: ${err.message}`);
  }
}

cleanVueProject();
