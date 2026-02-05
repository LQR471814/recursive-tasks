update task set
  optimistic = optimistic * 100,
  expected = expected * 100,
  pessimistic = pessimistic * 100
where implementation = 'children';