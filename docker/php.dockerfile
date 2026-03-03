FROM php:8.5.2-fpm

# RUN apt-get update
# RUN apt-get install -y libpq-dev && \
    # docker-php-ext-install pdo pdo_pgsql pgsql pcntl

RUN docker-php-ext-install pdo pdo_mysql pcntl

ADD ./docker/custom-php.ini /usr/local/etc/php/conf.d/custom-php.ini

RUN mkdir -p /var/www

WORKDIR /var/www

RUN docker-php-ext-configure pcntl --enable-pcntl

EXPOSE 9000

