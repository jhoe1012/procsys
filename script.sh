#/bin/sh

#git reset --hard &&  git pull origin main
composer install  &&
npm ci &&
npx vite build && 
php artisan migrate --force &&
php artisan optimize:clear &&
php artisan optimize &&
chmod -Rf 755 * &&
chown -Rf  www-data:www-data *