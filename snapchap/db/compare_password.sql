SELECT password = crypt($1, password) from users where id = $2;
