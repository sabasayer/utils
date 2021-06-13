### Utilities For Typescript Web Projects

### Table of contents

- [UniqueList](#uniquelist)

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
