update users
  set password = crypt($2, gen_salt('bf'))
  where id = $1
