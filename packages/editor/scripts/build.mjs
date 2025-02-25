/*
This file is part of the Notesnook project (https://notesnook.com/)

Copyright (C) 2022 Streetwriters (Private) Limited

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

import "zx/globals";

const ROOT_DIR = path.resolve(path.join(__dirname, ".."));

const pathsToCopy = {
  "katex.min.css": "node_modules/katex/dist/katex.min.css",
  "fonts/": "node_modules/katex/dist/fonts/",
  "prism-theme.css": "node_modules/prism-themes/themes/prism-dracula.min.css"
};

for (const name in pathsToCopy) {
  const src = pathsToCopy[name];
  const fullPath = path.join(ROOT_DIR, src);
  fs.copySync(fullPath, path.join(ROOT_DIR, "styles", name), {
    overwrite: true,
    recursive: true,
    errorOnExist: false
  });
}

await $`cd ${ROOT_DIR} && npx tsc ${process.argv.slice(3)}`;
