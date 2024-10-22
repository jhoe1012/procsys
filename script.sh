#/bin/sh

php artisan optimize:clear &&
php artisan optimize &&
chmod -Rf 755 * &&
chown -Rf  www-data:www-data *