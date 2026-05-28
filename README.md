# Pranay Sharma · Portfolio

A single-page portfolio built as a working notebook. Hand-written HTML, CSS, and JavaScript, with no frameworks and no build step. Just open `index.html` and it works.

## What's in this folder

```
portfolio/
├── index.html       ← all your content lives here (text, sections, links)
├── style.css        ← all styling: colours, type, spacing, motion
├── script.js        ← scroll reveals + the constellation hover
├── assets/
│   └── resume.pdf   ← the PDF that downloads from the colophon
└── README.md        ← you are here
```

## See it on your machine

The simplest way:

1. Open this folder in Visual Studio Code.
2. Right-click `index.html` → **Reveal in Finder** (Mac) or **Reveal in File Explorer** (Windows).
3. Double-click the file. It opens in your default browser.

That's it. No server, no build, no installs.

If you want **live reload while you edit** (recommended once you start tweaking):

1. In VS Code, open the Extensions panel (the squares icon on the left).
2. Search for **Live Server** by Ritwick Dey. Install it.
3. Right-click `index.html` in the sidebar → **Open with Live Server**.
4. Your browser opens at something like `http://127.0.0.1:5500`. Edits to any file refresh the page automatically.

## Where to edit things

| To change | Open | Find |
| --- | --- | --- |
| Your name, contact, project text | `index.html` | The section you want (each is clearly commented) |
| Colours, fonts, spacing | `style.css` | The top `:root` block has all the design tokens |
| Constellation labels / star notes | `script.js` | The `notes` object; keys are the star ids |
| Your résumé PDF | `assets/` | Replace `resume.pdf` with your latest, keep the same filename |

## A few principles, if you want to extend it

- The site uses two fonts: **EB Garamond** (the prose) and **IBM Plex Mono** (labels, dates). Both load from Google Fonts in `index.html`. If you want to try a different serif, change the `<link>` and the `--serif` variable in `style.css`.
- Spacing follows a rhythm. Most vertical gaps are multiples of `--rhythm` (1.75rem). Keep using rem-based spacing for consistency.
- The constellation lives in a single SVG inside `#inquiries`. Each star is a `<g class="star">` with a `data-id`. Adding a new star = adding a `<g>` + a matching note in `script.js`.

## What's next

Hosting and Git instructions are in the chat where this was built. Once the site is on GitHub Pages, the URL becomes your shareable portfolio link.

Built with care. Don't ship it without making it yours.
