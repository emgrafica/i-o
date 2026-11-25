#  Global State Management

This article documents our solution to the problem of global state management.
We decided to go with a simple custom solution to address our needs rather than
relying on a third party library.

The main reasons behind this decision are:
1. More control flexibility over the solution.
2. Simplicity of implementation, the solution takes less than 50 lines.
3. Simplicity of use. There is pretty much no boilerplate
4. Familiarity with the API, we mimic the `useState` API
5. Small bundle size.

## General Idea

Our API to manage global state is based on the `useState` hook's API.

For each global state, we create a custom hook that returns a tuple with two values:
  1. The current value for the global state
  2. A function to update the global state

This values are updated every time the global state changes, this in turn will cause the container
component to re-render to update its content accordingly.

## Initialize Global State

The process to initialize global state is very simple. Let's say we need to add a new global
state to maintain the user name. In this example we just need to add the following line to
the `src/store/index.ts` file:

``` TS
src/store/index.ts:

export const useUserName = initGlobalState<string>('userName');
```

We can then use the `useUserName` hook to access and update the `userName` global state.

The `initGlobalState` function receive a second optional value to set the initial value, if no initial
value is provided, the global state will be initialized with the value `undefined`. If an initial value
is provided, we won't need to pass the generic type argument in the cases where the type can be infered
from the initial value. See the following example, where the type `number` is inferred from
the initial value `0`:

``` TS
src/store/index.ts:

export const useCounter = initGlobalState('counter', 0);
```

## Access and Update Global State

In order to access and update a global state, we just need to use the hook defined for that state, in our user name
example this would be `useUserName`.

``` TS
src/.../FooComponent/index.ts:

const [userName, setUserName] = useUserName();
```

In this example, `userName` contains the current value of the global state and `setUserName` is a function that we
can use to update the global state by passing as an argument the new value. All the component using the hook will
update accordingly when the state is updated by calling the `setUserName` function

## Managing Global State Objects

The following example shows how to use global state objects:

```TS
src/store/index.ts:

// initialization
interface User {
  name: string;
  age: number;
  favoriteColor: string;
}
export const useUser = initGlobalState<User>('user');
```

```TS
src/.../FooComponent/index.ts:

// access and update
const [user, setUser] = useUser();
setUser({...user, name: "Bill Jobs"});
```

There are a couple of caveats to keep in mind when dealing with global state objects.

1. Objects are compared by reference, passing a reference to a different object will always trigger an update,
even if the new reference happens to point to an object with the same values.
2. Changing any field of the object will trigger an update, even if the consumer component is not interested in that
particular field. If this becomes a problem, consider decomposing the object into multiple states.
3. When updating a field, you need to clone the object as shown in the previous example.

In general we recommend keeping the global state as flatten as possible, avoiding deeply nested objects.
