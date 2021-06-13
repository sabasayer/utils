### Table of contents

- [Utilities For Web Projects](#utilities-for-web-projects)
  - [UniqueList](#uniquelist)
  - [ChainFunctions](#chainfunctions)

## Utilities For Web Projects

Some uitility classes.

### [UniqueList](#uniquelist)

Create a uniquelist with compareFunction.
push method prevents same values to be added with compareFunction
remove method finds and removes values using compareFunction

```Typescript
const list = createUniqueList(
    (a: number, b: number) => a === b, //compareFn
    [1, 2, 3] // initial values. Optional
);
list.push(2);

// list = [1,2,3]
```

```Typescript
type ListItem = { id: number };

const list = createUniqueList(
    (a: ListItem, b: ListItem) => a.id === b.id,
    [{ id: 1 }, { id: 3 }]
);

list.remove({ id: 1 });

// list = [{ id: 3 }]
```

### [ChainFunctions](#chainfunctions)

Run functions consecutive with optional conditions.
Next function uses previous functions return value.
If any required condition is not met returns 'null'

```typescript
const chain = new ChainFunctions(
  (value: number) => value + 2,
  (value: number) => value * 3
);

const result = chain.run(1); // 9

-------------
//with condition
const firstFn = (value: string) => value + "-";
const secondFn = {
    fn: (value: string) => value + ":",
    when: (value: string) => value.indexOf("true") > -1,
};

const chain = new ChainFunctions(firstFn,secondFn);

const result = chain.run("false"); // false-

-------------
//with required
const firstFn = (value: number) => value * 10;
const secondFn = {
    fn: (value: number) => value * 10,
    when: (value: number) => value < 100,
    required: true,
}
const thirdFn = (value: number) => value * 2

const chain = new ChainFunctions(firstFn,secondFn,thirdFn);

const result = chain.run(10); // null

```
