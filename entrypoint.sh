#!/bin/sh
echo "464C41477B6430636B33725F6368346C6C336E67335F6C34625F323032357D" > /var/log/flag.txt
chmod 644 /var/log/flag.txt
exec "$@"
