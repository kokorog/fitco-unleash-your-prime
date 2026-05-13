# План: Разделяне на публичен и частен сайт

## Цел

- `fitcoapp.com` и `www.fitcoapp.com` → само Coming Soon страница, без парола, видима за всички и за Google.
- `private.fitcoapp.com` → реалният сайт, винаги защитен с паролата от `ACCESS_PASSWORD`.
- Един Lovable проект, една публикация — разделението става на ниво hostname в server middleware. Без два деплоймънта, без дублиране на код.

## Какво ще променя в кода

### 1. Host-aware stealth middleware (`src/start.ts`)

Текущата логика третира целия сайт като скрит. Ще я заменя с матрица по hostname:

```text
hostname                         поведение
-------------------------------- ------------------------------------------
fitcoapp.com / www.fitcoapp.com  ВИНАГИ връщай Coming Soon HTML за всеки път
                                 (без /access, без real app, дори с cookie)
private.fitcoapp.com             ако валидно cookie → пусни към real app
                                 иначе → пренасочи към /access
*.lovable.app (preview)          поведение като private (за да тестваме)
```

- `/api/public/access`, статични asset-и и `/robots.txt` остават достъпни и на двата хоста.
- Cookie-то се сетва с `Domain=.fitcoapp.com` и `Secure; HttpOnly; SameSite=Lax`, за да важи само за поддомейна (никога не отключва публичния домейн, защото публичният домейн игнорира cookie-то по дизайн).

### 2. Конфигурация на хостовете (`src/lib/site-mode.ts`)

Добавям централни константи:

- `PUBLIC_HOSTS = ["fitcoapp.com", "www.fitcoapp.com"]`
- `PRIVATE_HOSTS = ["private.fitcoapp.com"]`
- `PREVIEW_HOST_SUFFIX = ".lovable.app"` (третира се като private)
- helper `resolveHostMode(hostname)` → `"public" | "private"`

Премахвам глобалния `STEALTH_MODE` toggle — режимът вече се определя от hostname.

### 3. Coming Soon страница (`src/server/coming-soon-html.ts`)

- Премахвам долния линк `private access` — публичният домейн не трябва да подсказва, че има скрит сайт.
- Email `support@fitcoapp.com`, таймер 10:15:00 с reset при reload, текст „Специалната оферта изтича след" — вече е така, само потвърждавам.
- Добавям canonical link към `https://fitcoapp.com/` и пълна OG/Twitter мета група за по-добро споделяне.

### 4. Access поток (`src/routes/access.tsx` + `src/routes/api/public/access.ts`)

- `/access` се показва САМО когато hostname е private. Ако някой го отвори на `fitcoapp.com`, middleware-ът връща Coming Soon.
- При успешна парола cookie се издава с `Domain=.fitcoapp.com` (а в preview — без Domain атрибут, защото `lovable.app` е публичен суфикс и браузърите блокират cross-host cookies).
- След успех redirect към `/` на същия хост (private).

### 5. Logout / Изход

Добавям бутон „Изход" в Header-а (само когато има активно cookie), който чисти cookie-то през `DELETE /api/public/access` и връща `/access`.

### 6. Robots & SEO

- `public/robots.txt`: позволи индексиране на root, забрани `/access`, `/api/`. Това ще се сервира от двата хоста, но Google ще индексира само това, което вижда — а на `private.fitcoapp.com` Google няма да види нищо освен `/access`.
- На private hostname добавям `X-Robots-Tag: noindex, nofollow` header за всички отговори.

## DNS настройка (твоята част)

След като обновя кода, направи следното:

1. **В Lovable**: Project Settings → Domains → **Connect Domain** → въведи `private.fitcoapp.com`.
2. Lovable ще покаже DNS запис за добавяне. Отиди при registrar-а (където държиш `fitcoapp.com`) и добави:

   ```text
   Type: A
   Name: private
   Value: 185.158.133.1
   TTL: Auto (или 3600)
   ```

   Плюс TXT записа за верификация, който Lovable ще ти даде:

   ```text
   Type: TXT
   Name: _lovable.private  (или както Lovable посочи)
   Value: lovable_verify=...
   ```

3. Изчакай DNS propagation (обикновено 5–30 минути, до 72 часа в краен случай). Lovable автоматично ще издаде SSL сертификат.
4. `fitcoapp.com` и `www.fitcoapp.com` остават с настоящите си записи — няма промяна.

**Важно:** Сегашният домейн `fitcoapp.com` остава прикачен към същия проект. И трите хоста (root, www, private) сочат към една публикация; middleware-ът ги диференцира по `Host` header.

## Технически детайли (за справка)

- TanStack Start request middleware има достъп до `request.url`, от което вадя `hostname`. Това работи и в Cloudflare Worker runtime-а.
- Cookie domain `.fitcoapp.com` е разрешен за поддомейн на регистриран домейн (не е публичен суфикс). За `*.lovable.app` оставяме без Domain (host-only cookie).
- Coming Soon HTML остава self-contained (без JS bundle), което гарантира че публичният домейн е изключително бърз и не leak-ва никаква информация за частния app.

## Какво НЕ променям

- Дизайна на Coming Soon страницата (вече е финализиран).
- Парола / `ACCESS_PASSWORD` / `ACCESS_COOKIE_SECRET` — остават както са.
- Структурата на реалния сайт (`/`, `/features`, `/pricing`, etc.) — те просто стават достъпни само на `private.fitcoapp.com`.

## След имплементацията

1. Аз ще ти дам конкретните DNS записи отново (от Lovable UI).
2. Ти добавяш поддомейна и чакаш SSL.
3. Тествай:
   - `https://fitcoapp.com` → Coming Soon (без `/access` линк).
   - `https://private.fitcoapp.com` → пренасочва към `/access`.
   - Въвеждаш парола → отключва пълния сайт.
   - Refresh-ваш `fitcoapp.com` → пак Coming Soon (cookie няма ефект там).
