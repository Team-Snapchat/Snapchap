INSERT INTO pending_messages (sender, recipient, message) VALUES ($1, $2, $3)
RETURNING id;