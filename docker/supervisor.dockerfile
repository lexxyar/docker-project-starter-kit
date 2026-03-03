FROM php:8.5.2-fpm

RUN apt-get update && apt-get install -y supervisor cron

RUN docker-php-ext-install pdo pdo_mysql


# Create log directory and set permissions
RUN mkdir -p /var/log/supervisor /var/www/storage/logs && chown -R www-data:www-data /var/www/storage

# RUN mkdir -p /var/log/supervisor

COPY ./docker/laravel-worker.crontab /etc/cron.d/laravel-cron
RUN chmod 0644 /etc/cron.d/laravel-cron \
    && crontab /etc/cron.d/laravel-cron


# RUN crontab /etc/cron.d/laravel-cron

COPY ./docker/supervisord.conf /etc/supervisor/supervisord.conf

WORKDIR /var/www

# CMD ["/usr/bin/supervisord"]
CMD ["/usr/bin/supervisord", "-n", "-c",  "/etc/supervisor/supervisord.conf"]