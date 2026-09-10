<?php

namespace App\Providers;

use App\Services\WordPress\Contracts\WordPressRepository;
use App\Services\WordPress\WordPressApiClient;
use App\Services\WordPress\WordPressDbClient;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        // Explicit switch rather than "DB creds are present => use them":
        // db5000105138.hosting-data.io only resolves inside IONOS's own
        // network (confirmed - it's NXDOMAIN publicly, and that account's
        // sshd has TCP forwarding disabled so a tunnel isn't an option
        // either). So WP_DB_* can be fully configured in .env yet still be
        // unreachable from wherever this app happens to be running right
        // now. WP_DATA_SOURCE=db should only be set once this app is
        // actually deployed on IONOS hosting itself, on that same network.
        $this->app->bind(WordPressRepository::class, function () {
            return config('services.wordpress.data_source') === 'db'
                ? $this->app->make(WordPressDbClient::class)
                : $this->app->make(WordPressApiClient::class);
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
