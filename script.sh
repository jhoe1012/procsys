#/bin/sh

composer install -q --no-ansi --no-interaction --no-scripts --no-progress --prefer-dist &&
npm ci &&
npx vite build && 
php artisan migrate --force &&
php artisan optimize:clear &&
php artisan optimize &&
chmod -Rf 755 * &&
chown -Rf  www-data:www-data *