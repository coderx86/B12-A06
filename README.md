
# 🌿 GREEN EARTH: JavaScript Concepts

This documentation provides a comprehensive overview of key JavaScript ES6 concepts used in modern development, specifically addressing variable declarations, array methods, functions, destructuring, and string handling.

---

## 1. What is the difference between `var`, `let`, and `const`?

In JavaScript, these keywords are used to declare variables, but they differ significantly in terms of scope, hoisting, and reassignability.

| Feature | `var` | `let` | `const` |
| :--- | :--- | :--- | :--- |
| **Scope** | **Function Scoped:** It is available anywhere inside the function where it is declared. If declared outside a function, it is global. | **Block Scoped:** It is only available inside the block `{}` where it is defined (e.g., inside an `if` statement or `for` loop). | **Block Scoped:** Like `let`, it is confined to the block `{}` in which it is defined. |
| **Reassignable** | **Yes:** You can update the value later. | **Yes:** You can update the value later. | **No:** The identifier cannot be reassigned. (Note: If it holds an object/array, the contents *can* be modified). |
| **Redeclaration** | **Yes:** You can declare `var x` multiple times in the same scope. | **No:** Redeclaring the same variable in the same scope throws an error. | **No:** Cannot be redeclared. |
| **Hoisting** | Hoisted to the top and initialized with `undefined`. | Hoisted but **not initialized**. Accessing it before declaration causes a `ReferenceError` (Temporal Dead Zone). | Same as `let`. Hoisted but accessing before declaration causes a `ReferenceError`. |

---

## 2. What is the difference between `map()`, `forEach()`, and `filter()`?

These are all higher-order array methods, but they serve different purposes regarding return values and side effects.

### **1. `.map()`**
* **Purpose:** Used to **transform** elements in an array.
* **Return Value:** Returns a **new array** containing the results of applying a function to every element in the original array.
* **Usage:** Use this when you want to create a list of the same length but with modified data (e.g., converting a list of prices to a list of HTML strings).

### **2. `.forEach()`**
* **Purpose:** Used to execute a function for each element (side effects).
* **Return Value:** Returns `undefined`. It does not create a new array.
* **Usage:** Use this when you just want to loop through data to log items, save to a database, or modify the DOM directly without needing a resulting list.

### **3. `.filter()`**
* **Purpose:** Used to **select** a subset of elements based on a condition.
* **Return Value:** Returns a **new array** containing only the elements that passed the test (returned `true`).
* **Usage:** Use this to remove unwanted items (e.g., keeping only "Indoor" plants from a list).

---

## 3. What are arrow functions in ES6?

Arrow functions provide a more concise syntax for writing function expressions in JavaScript. They were introduced in ES6 (ECMAScript 2015).

**Key Characteristics:**
1.  **Concise Syntax:** They allow implicit returns for one-line statements, removing the need for the `function` keyword and curly braces `{}`.
2.  **Lexical `this`:** Unlike regular functions, arrow functions do not have their own `this`. They inherit `this` from the parent scope (where they were defined). This makes them ideal for callbacks and preserving context.

**Syntax Comparison:**
```javascript
// ES5 Regular Function
const add = function(a, b) {
    return a + b;
};

// ES6 Arrow Function
const add = (a, b) => a + b;
