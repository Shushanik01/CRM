# My Study Notes 📝

<!-- SECTION: React Query 🔍 -->

React Query-ում կան երկու հիմնական հուկեր՝ useQuery և useMutation։ Նրանց դերերը տարբեր են.

👉 useQuery — տվյալներ ստանալու (GET/read) համար
👉 useMutation — տվյալները փոփոխելու համար՝ ստեղծել (POST), թարմացնել (PUT/PATCH) կամ ջնջել (DELETE);


const { register, handleSubmit, formState: { errors } } = useForm();


## 1. `useForm()` 

- Սա React Hook Form-ի գլխավոր հուկն է
- Վերադարձնում է օբյեկտ, որը պարունակում է ֆորմայի կառավարման բոլոր մեթոդներն ու state-ները
- Այն աշխատեցնում է ֆորմայի վալիդացիան, track է անում input-ների արժեքները և կառավարում submit-ը


## 2. `register` - input-ների գրանցում

- Սա ֆունկցիա է, որը գրանցում է յուրաքանչյուր input-ը ֆորմայի համակարգում
- Օգտագործվում է այսպես՝
`
<input {...register("firstName")} />
`
- Այն կապում է input-ը ֆորմայի state-ի հետ
- Ընդունում է field name-ը որպես առաջին արգումենտ
- Կարող է ընդունել նաև վալիդացիայի կանոններ (required, minLength, pattern և այլն)՝
`
<input {...register("email", { required: true, pattern: /^\S+@\S+$/i })} />
`

## 3. `handleSubmit` - submit-ի կառավարում

- Սա ֆունկցիա է, որը կառավարում է ֆորմայի submit-ը
- Այն ավտոմատ կերպով կանխում է default browser-ի submit-ը (preventDefault)
- Ընդունում է երկու callback ֆունկցիա՝
  1. **onSubmit** - աշխատում է, երբ վալիդացիան հաջող է
  2. **onError** - աշխատում է, երբ վալիդացիան ձախողվում է (օպցիոնալ)
- Օգտագործվում է այսպես՝
`
<form onSubmit={handleSubmit(onSubmit)}>
`
- Այն ավտոմատ հավաքում է բոլոր գրանցված field-ների արժեքները և փոխանցում onSubmit ֆունկցիային որպես օբյեկտ


## 4. `formState` - ֆորմայի state-ը

- Սա օբյեկտ է, որը պարունակում է ֆորմայի ամբողջ state-ը
- Ներառում է՝
  - `isValid` - ֆորման վալիդ է, թե ոչ
  - `isDirty` - փոփոխվել են արդյոք field-ները
  - `isSubmitting` - submit է արվում, թե ոչ
  - `errors` - վալիդացիայի սխալները
  - `touchedFields` - որ field-ներին են touch արել
  - և այլն


## 5. `errors` - սխալների օբյեկտ


- Սա formState-ից դեստրուկտուրիզացված օբյեկտ է
- Պարունակում է բոլոր field-երի վալիդացիայի սխալները

Օրինակ՝

```javascript
{
  firstName: { type: 'required', message: 'Անունը պարտադիր է' },
  email: { type: 'pattern', message: 'Սխալ email ֆորմատ' }
}
```
- Օգտագործվում է սխալների ցուցադրման համար՝
```jsx
{errors.firstName && <span>{errors.firstName.message}</span>}
```

- Սա համարժեք է՝

```javascript
const form = useForm();
const register = form.register;
const handleSubmit = form.handleSubmit;
const errors = form.formState.errors;
```

⭐⭐⭐⭐⭐

 `useQuery`, `useMutation` և `useQueryClient`-ը,  React Query (այժմ՝ TanStack Query) գրադարանի հիմնական հուքերն են (hooks)՝ սերվերային տվյալների կառավարման համար։

---

### 1. `useQuery` - Տվյալներ ստանալու (կարդալու) հուք

**Նպատակը՝** Սերվերից տվյալներ ստանալ (GET հարցումներ), քեշավորել, ավտոմատ թարմացնել և կառավարել բեռնման/սխալի վիճակները։

**Ինչպես է աշխատում.**
- Այն ասինխրոն ֆունկցիա է կանչում (օր․՝ fetch, axios) և վերադարձնում է օբյեկտ՝ տվյալներով, բեռնման վիճակով, սխալով և այլն։
- Այն ունի **յունիք բանալի (queryKey)**, որով քեշում է տվյալները և հետևում դրանց։

**Օրինակ՝**

```javascript
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

function Posts() {
  // useQuery-ի կառուցվածքը՝ useQuery({ queryKey, queryFn })
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['posts'], // Ունիկ բանալի (կարող է լինել զանգված)
    queryFn: () => axios.get('/api/posts').then(res => res.data), // Տվյալներ բերող ֆունկցիա
  });

  if (isLoading) return <div>Բեռնում...</div>;
  if (isError) return <div>Սխալ՝ {error.message}</div>;

  return (
    <ul>
      {data.map(post => <li key={post.id}>{post.title}</li>)}
    </ul>
  );
}
```

**Առանձնահատկություններ՝**
- **Քեշավորում** – նույն queryKey-ով տվյալները պահվում են հիշողության մեջ։
- **Ավտոմատ թարմացում** – կարող եք սահմանել `refetchInterval` կամ `staleTime`։
- **Վերաբեռնում** – կարող եք կանչել `refetch()` ֆունկցիան՝ տվյալները ձեռքով թարմացնելու համար։

---

### 2. `useMutation` - Տվյալներ փոփոխող (գրող) հուք

**Նպատակը՝** Սերվերում տվյալներ ստեղծել, թարմացնել կամ ջնջել (POST, PUT, DELETE հարցումներ)։

**Ինչպես է աշխատում.**
- Վերադարձնում է **mutate** կամ **mutateAsync** ֆունկցիա, որը կանչում եք ձեր գործողության ժամանակ (օր․՝ ֆորմայի submit-ի ժամանակ)։
- Այն նաև վերադարձնում է վիճակներ՝ `isPending`, `isError`, `isSuccess` և այլն։

**Օրինակ՝**

```javascript
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

function AddPost() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newPost) => axios.post('/api/posts', newPost).then(res => res.data),
    onSuccess: () => {
      // Հաջողության դեպքում թարմացնում ենք posts-ի քեշը
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newPost = { title: formData.get('title') };
    mutation.mutate(newPost);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" />
      <button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? 'Ավելացվում է...' : 'Ավելացնել'}
      </button>
      {mutation.isError && <div>Սխալ՝ {mutation.error.message}</div>}
      {mutation.isSuccess && <div>Հաջողությամբ ավելացվեց!</div>}
    </form>
  );
}
```

**Առանձնահատկություններ՝**
- **Կողմնակի էֆեկտներ** – կարող եք օգտագործել `onSuccess`, `onError`, `onSettled`՝ քեշը թարմացնելու կամ այլ գործողություններ անելու համար։
- **Վերակայում** – `reset()` ֆունկցիան վերականգնում է մուտացիայի վիճակը։

---

### 3. `useQueryClient` - Քեշի կառավարման հուք

**Նպատակը՝** Մուտք գործել **QueryClient**-ի ինստանսին, որը պարունակում է ամբողջ քեշը և դրա հետ աշխատելու մեթոդները։

**Ինչի համար է օգտագործվում.**
- Քեշից տվյալներ կարդալու կամ գրելու համար (`getQueryData`, `setQueryData`)։
- Քեշը թարմացնելու համար (`invalidateQueries`)՝ ստիպելով useQuery-ին նորից տվյալներ բերել։
- Քեշը մաքրելու համար (`clear`, `removeQueries`)։

**Ամենատարածված օգտագործումը՝ `invalidateQueries`**

Երբ մուտացիայից հետո ցանկանում եք, որ որոշակի query-ներ նորից բեռնվեն սերվերից (որ արտացոլվեն փոփոխությունները), կանչում եք.

```javascript
queryClient.invalidateQueries({ queryKey: ['posts'] });
```

Սա նշանակում է՝ «posts» բանալիով բոլոր active query-ները նշվում են որպես հնացած (stale) և կվերաբեռնվեն հաջորդ հնարավորության դեպքում։

**Այլ օգտակար մեթոդներ՝**

```javascript
const queryClient = useQueryClient();

// Քեշից տվյալներ կարդալ (առանց սերվեր հարցում անելու)
const cachedPosts = queryClient.getQueryData(['posts']);

// Քեշում տվյալներ թարմացնել (օպտիմիստիկ թարմացման համար)
queryClient.setQueryData(['posts'], (oldData) => [...oldData, newPost]);

// Կոնկրետ query-ի հեռացում քեշից
queryClient.removeQueries({ queryKey: ['posts'] });
```

---

### Համեմատության աղյուսակ

| Հուք | Նպատակ | Երբ օգտագործել | Հիմնական վերադարձվող արժեքներ |
|------|---------|----------------|-------------------------------|
| **useQuery** | Տվյալներ **կարդալ** | Կոմպոնենտի բեռնման ժամանակ, ավտոմատ կերպով | `data`, `isLoading`, `isError`, `refetch` |
| **useMutation** | Տվյալներ **գրել/փոփոխել** | Օգտատիրոջ գործողությունից հետո (կտտոց, ֆորմայի submit) | `mutate`, `isPending`, `isSuccess`, `reset` |
| **useQueryClient** | Քեշի **կառավարում** | Երբ պետք է մանիպուլացնել քեշը (թարմացնել, կարդալ, ջնջել) | `invalidateQueries`, `getQueryData`, `setQueryData` |

---

### Կարևոր նշումներ

1. **useQuery-ն ինքնաբերաբար է կանչվում** կոմպոնենտի մոնտաժման ժամանակ, իսկ useMutation-ը պետք է ձեռքով կանչել (օր․՝ mutate-ի միջոցով)։
2. **useQuery-ն քեշավորում է տվյալները**, այնպես որ եթե նույն queryKey-ն օգտագործեք մի քանի կոմպոնենտներում, նրանք կկիսեն նույն քեշը (առանց կրկնակի հարցումների)։
3. **useMutation-ը քեշ չի պահում**, բայց կարող եք օգտագործել onSuccess-ում queryClient.invalidateQueries՝ քեշը թարմացնելու համար։
4. **Օպտիմիստիկ թարմացում** – setQueryData-ի միջոցով կարող եք անմիջապես թարմացնել UI-ն, մինչ սերվերի պատասխանը սպասում եք (հետո onSuccess-ում կամ onError-ում հետ եք բերում)։

😊

