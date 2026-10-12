# Accessible Recipe Layout

A responsive recipe page with adjustable serving sizes, keyboard-operable controls, and screen-reader announcements. Built with plain HTML, CSS, and JavaScript; no build step or dependencies are required.

## Run it

Open `index.html` in a browser, or serve the folder locally:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Accessibility decisions

- **Semantic structure:** Uses `header`, `main`, `nav`, `section`, headings, lists, and `footer` to provide meaningful page landmarks and structure.
- **Keyboard operation:** All controls are native links, buttons, or an input, so they work with a keyboard without custom keyboard handlers. The visual order matches the DOM and keyboard order.
- **Visible focus:** `:focus-visible` provides a high-contrast outline for interactive controls. A skip link appears when focused so keyboard users can bypass the site header.
- **Accessible serving control:** The number input has a visible label. The plus and minus buttons have explicit accessible names and a minimum 44-by-44-pixel target.
- **Announced quantity updates:** The `#quantity-status` element uses `role="status"`, `aria-live="polite"`, and `aria-atomic="true"`. When the serving count changes, it announces the new serving count without moving focus. The quantity values remain real text in the ingredient list.
- **Narrow-screen layout:** At widths below 760px, ingredients and method change from two columns to a single vertical column, preventing horizontal overflow and preserving a readable order. A sticky section-navigation row with links to Ingredients and Method lets users jump between the two sections without repeatedly scrolling through the entire page. At 320px, the outer margins and panel padding shrink, long text can wrap, and the layout does not require a horizontal scrollbar.
- **Reduced motion:** Smooth scrolling is disabled when the user prefers reduced motion.

## Manual test checklist

1. Use Tab and Shift+Tab to move through the skip link, section links, and serving controls; confirm focus is always visible.
2. Use Enter or Space on buttons and Enter on links.
3. Change servings using the number input and plus/minus buttons; confirm the live status announces the updated serving count.
4. Test at a 320px-wide viewport and confirm there is no horizontal scrolling.
5. Test with a screen reader if available (for example, NVDA, VoiceOver, or Orca).
