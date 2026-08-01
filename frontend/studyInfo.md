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

