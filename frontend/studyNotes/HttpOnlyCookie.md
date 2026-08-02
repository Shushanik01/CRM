🍪 HttpOnly-ն cookie 🍪 անվտանգության ֆլագ է, որը արգելում է JavaScript-ին մուտք գործել cookie-ին։

Երբ 🍪 cookie-ն ստեղծվում է HttpOnly ֆլագով՝

✅ Բրաուզերը ավտոմատ կերպով ուղարկում է այն սերվերին ամեն HTTP հարցման հետ

❌ JavaScript կոդը չի կարող կարդալ կամ փոփոխել այն document.cookie-ի միջոցով
❌ Third-party scripts-ները նույնպես չեն կարող մուտք գործել

Եթե 🍪 cookie-ն HttpOnly ՉԷ՝
Հաքերը ստանում է օգտագործողի session cookie-ն 🍪
Կարող է օգտագործել այն՝ օգտագործողի հաշիվ մտնելու համար
Վտանգում է ամբողջ օգտագործողի տվյալները

Եթե 🍪 cookie-ն HttpOnly Է՝
document.cookie-ն ցույց է տալիս միայն ոչ-HttpOnly cookie-ները 🍪
Session cookie-ն 🍪 մնում է անհասանելի JavaScript-ի համար
Հաքերը չի կարող գողանալ այն

✅ ՊԵՏՔ Է օգտագործել՝ 🎯
Session tokens (օգտագործողի նույնականացման համար)
Refresh tokens
Authorization tokens (JWT)
CSRF tokens (եթե պահվում են cookie-ում)

---

## Migration-ը՝ localStorage-ից HttpOnly cookie

### Ինչու հրաժարվեցինք localStorage-ից

Սկզբում JWT token-ը պահվում էր localStorage-ում, և frontend-ը ամեն request-ի հետ ինքն էր ավելացնում `Authorization: Bearer <token>` header-ը axios interceptor-ի միջոցով։ Խնդիրը՝ ցանկացած JavaScript կոդ (ներառյալ XSS attack-ի միջոցով ներարկված կոդը) կարող է կարդալ `localStorage.getItem("token")`-ը և գողանալ token-ը։ HttpOnly cookie-ի դեպքում token-ը ամբողջովին անտեսանելի է JavaScript-ի համար։

### Ինչպես է cookie-ն ստեղծվում backend-ում

`authController.js`-ում, հաջող login/register-ից հետո՝

```javascript
const { user, token } = await loginUserService(email, password);
res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 18 * 60 * 60 * 1000
});
res.status(200).json({ user });
```

- `httpOnly: true` — cookie-ն անհասանելի է դարձնում `document.cookie`-ի համար, հենց այս flag-ն է ամբողջ պաշտպանության հիմքը
- `secure: false` — dev-ում աշխատում ենք http-ով, ուստի false; production-ում պետք է լինի `true`, որ cookie-ն ուղարկվի միայն https-ով
- `sameSite: "lax"` — պաշտպանում է CSRF-ից՝ cookie-ն չի ուղարկվում cross-site POST request-երի հետ, բայց թույլ է տալիս normal navigation-ը
- `maxAge` — միլիվայրկյաններով է, ոչ թե string, և ոչ թե "18" (որը կնշանակեր ընդամենը 18 միլիվայրկյան)
- Կարևոր է՝ `res.json({ user })`-ում token-ը այլևս **չի** վերադարձվում body-ում, քանի որ ամբողջ նպատակը այն է, որ JS-ը երբեք չտեսնի token-ի արժեքը

### Ինչպես է cookie-ն կարդացվում backend-ում

Պետք է `cookie-parser` middleware `app.js`-ում, մինչև route-երը՝

```javascript
import cookieParser from "cookie-parser";
app.use(cookieParser());
```

Առանց սրա՝ `req.cookies` undefined կլինի։ Հետո `authMiddleware.js`-ի `protectAuth`-ում՝

```javascript
export const protectAuth = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ success: false, message: 'You do not have access' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};
```

Browser-ը ինքն է ավտոմատ ուղարկում cookie-ն ամեն request-ի հետ (ի տարբերություն localStorage-ի, որտեղ մենք ինքներս պետք է ձեռքով ավելացնեինք header)։

### Ինչպես է cookie-ն ջնջվում (logout)

Քանի որ JavaScript-ը չի կարող կարդալ HttpOnly cookie, նույն կերպ էլ **չի կարող ջնջել** այն `document.cookie`-ի միջոցով։ Ջնջումը պետք է անի backend-ը՝

```javascript
export const logoutUser = (req, res) => {
    res.clearCookie("token", { httpOnly: true, secure: false, sameSite: "lax" });
    res.status(200).json({ message: "Logged out successfully" });
};
```

`clearCookie`-ի options-ները պետք է **ճիշտ նույնը լինեն**, ինչ `res.cookie`-ով cookie-ն ստեղծելիս օգտագործվածները (հատկապես `sameSite`/`secure`/`path`), այլապես browser-ը կարող է չճանաչել՝ որ cookie-ն ջնջել։

### Frontend-ի կողմից պահանջվող փոփոխությունները

1. `axiosClient.js`-ում՝ `withCredentials: true`, որ browser-ը իրավունք ունենա cross-origin cookie ուղարկել/ստանալ
2. Հանվեց `localStorage.getItem("token")` interceptor-ը ամբողջությամբ՝ այլևս ոչինչ չկա local-ում կարդալու
3. Backend-ի CORS-ը պետք է `credentials: true` ունենա, և `origin`-ը պետք է լինի **կոնկրետ** frontend URL-ը (`http://localhost:5173`), ոչ թե `*` — cookie-ով request-երը չեն աշխատում wildcard origin-ի հետ
4. `Redux`-ի `authSlice`-ից հանվեց `token` state-ը ամբողջությամբ, քանի որ token-ի արժեքն այլևս երբեք հասանելի չէ JS-ին