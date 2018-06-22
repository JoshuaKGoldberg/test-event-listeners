# `test-event-listeners`
[![Build Status](https://travis-ci.org/JoshuaKGoldberg/test-event-listeners.svg?branch=master)](https://travis-ci.org/JoshuaKGoldberg/test-event-listeners)
[![npm version](https://badge.fury.io/js/test-event-listeners.svg)](https://www.npmjs.com/package/test-event-listeners)
[![Downloads](https://img.shields.io/npm/dm/test-event-listeners.svg)](https://www.npmjs.com/package/test-event-listeners)

Test-friendly object creator to simulate adding listeners for events.
Allows you to add event listeners on an object and fire them at will.
Great for simulating `window` or `document` events during tests!

_No_ dependencies. _Tiny_ size. _Blazingly_ fast. _Easy_ breezy.

## Usage

```javascript
import { createRegister } from "test-event-listeners";

const register = createRegister();

register.addEventListener("foo", (data) => console.log(`Got ${data}!`));

// Got bar!
register.fireEvent("foo", "bar");
```

This can be useful if, for example, you're manipulating a window's `"click"` and `"keydown"` events with Jest spies:

```typescript
import { createRegister } from "test-event-listeners";

// Arrange
const register = createRegister();
const keyDownSpy = jest.fn();

register.addEventListener("keydown", keyDownSpy)

// Act
register.fireEvent("keydown");

// Assert
expect(keyDownSpy).toHaveBeenCalledTimes(1);
```

### Usage with TypeScript

Good news: test-event-listeners is written in TypeScript!
You'll never have to worry about `@types` mismatches here!

`createRegister` takes two templated types:

1. `TEventName extends string`: Event names that may be fired.
2. `TListener extends Function`: Type of functions stored as listeners.

```typescript
const register = createRegister<"keydown", jasmine.Spy>();
```
