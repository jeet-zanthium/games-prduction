# Select using pivot table

```ts
// Fetch a user with their parents and children
const userWithParentsAndChildren = await db
  .select()
  .from(usersTable)
  .where(usersTable.id.eq(1))  // Adjust for the user you want to query
  .leftJoin(userChildrenTable, userChildrenTable.userId.eq(usersTable.id))  // Joining on parent relationship
  .leftJoin(usersTable.as('children'), userChildrenTable.childId.eq(usersTable.as('children').id))  // Joining on child relationship
  .select(usersTable.id, 'children.id as childId', 'userChildrenTable.level');
```

