# TypeScript Todo Type Utilities

A collection of TypeScript type utilities for handling Todo operations with compile-time type safety.

## Base Types

```typescript
type TodoID = number;
type Todo = {
    id: TodoID;
    title: string;
    checked: boolean;
};
```

## Core Operations

### Add
Adds a new Todo item to the list with an auto-generated ID.

```typescript
type Add<List extends Todo[], Text extends string>
```

### Remove
Removes a Todo item from the list by ID.

```typescript
type Remove<List extends Todo[], id extends TodoID>
```

## Helper Operations

### GenerateId
Generates a new unique ID for a Todo item.
```typescript
type GenerateId<List extends Todo[]>
```

### CreateTodo
Creates a new Todo object with the specified text and ID.
```typescript
type CreateTodo<Text extends string, Id extends TodoID>
```

### Compare
Compares two numbers at the type level.
```typescript
type Compare<A extends number, B extends number>
```

### GetMax
Gets the maximum of two numbers at the type level.
```typescript
type GetMax<A extends number, B extends number>
```

## Usage Example

```typescript
type TodoList = [];
type Step1 = Add<TodoList, "Buy groceries">; // [{ id: 1, title: "Buy groceries", checked: false }]
type Step2 = Add<Step1, "Walk the dog">; // [{ id: 1, title: "Buy groceries", checked: false }, { id: 2, title: "Walk the dog", checked: false }]
type Step3 = ToggleTodo<Step2, 1>; // [{ id: 1, title: "Buy groceries", checked: true }, { id: 2, title: "Walk the dog", checked: false }]
```

## Notes
- All operations are performed at the type level
- The library provides compile-time type safety
- No runtime overhead as everything is handled by TypeScript's type system

## Future Plans

### Core Features
1. **Multi-select Actions**
   - Batch operations on multiple Todos
   - Type-safe selection handling
   - Bulk status updates

2. **Status Columns (Jira-like)**
   - Custom status definitions
   - Todo movement between columns
   - Column-specific validation rules
   - Status transition constraints

3. **Drag and Drop with Ordering**
   - Type-safe reordering operations
   - Maintain order integrity
   - Cross-column movement tracking

### Extended Features
- **User Entities**
  - User type definitions
  - Role-based permissions
  - User-specific Todo views

- **Assignments**
  - Todo assignment to users
  - Multiple assignee support
  - Assignment history tracking

- **History Operations**
  - User action logging
  - Operation timestamps
  - Change history tracking
  - Audit trail support