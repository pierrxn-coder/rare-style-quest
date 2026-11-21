<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

## Project rules

- Quiz logic (questions, progress, result) lives as pure functions in `src/lib/quiz.ts`, covered by `src/test/quiz.test.ts`; UI components only call them — keeps the rules testable.
- Promotion details (store name, dates, prizes, steps) live only in `src/lib/promo.ts` — one place to edit campaign info.
- The page collects no personal data and never states the user won; results show a style profile plus draw rules.
- Store items, prices and checkout links live in `src/lib/shop.ts` (pure rules covered by `src/test/shop.test.ts`); checkout links must sell the piece itself with any shipping in the same payment, and shipping-only links are rejected by `isValidCheckout` — keeps buying honest and separate from the draw.
