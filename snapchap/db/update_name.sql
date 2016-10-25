update users
  set first_name = $2,
      last_name = $3
  where id = $1
