INSERT INTO  users (first_name, last_name, username, password, email) VALUES ($1, $2, $3, crypt($4, gen_salt('bf')), $5);
