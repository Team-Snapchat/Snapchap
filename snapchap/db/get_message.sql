SELECT pending_messages.message, users.first_name, users.last_name
FROM pending_messages
JOIN users ON pending_messages.sender = users.id
WHERE pending_messages.id = $1;
