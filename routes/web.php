<?php

use App\Http\Controllers\AccountDeletionController;
use App\Http\Controllers\AppLinksController;
use App\Http\Controllers\CareersController;
use App\Http\Controllers\CareersJobDetailController;
use App\Http\Controllers\CareersLandingController;
use App\Http\Controllers\CategoryArchiveController;
use App\Http\Controllers\CategoryIndexController;
use App\Http\Controllers\ContactUsController;
use App\Http\Controllers\AboutUsController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\LeaderboardController;
use App\Http\Controllers\LegacyPostRedirectController;
use App\Http\Controllers\PlaylistController;
use App\Http\Controllers\PodcastController;
use App\Http\Controllers\PodcastEpisodeDetailController;
use App\Http\Controllers\PodcastShowController;
use App\Http\Controllers\PrivacyPolicyController;
use App\Http\Controllers\PredictionDetailController;
use App\Http\Controllers\PredictionsController;
use App\Http\Controllers\QuizDetailController;
use App\Http\Controllers\QuizzesController;
use App\Http\Controllers\RaffleController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\SinglePostController;
use App\Http\Controllers\VideosController;
use App\Http\Controllers\EditorialPolicyController;
use App\Http\Controllers\CorrectionsPolicyController;
use App\Http\Controllers\AuthorsController;
use Illuminate\Support\Facades\Route;

// Universal Links (iOS) / App Links (Android) verification files - see
// AppLinksController. Must resolve with no redirect, which is why these are
// declared before the trailing-slash-stripping catch-alls below.
Route::get('/.well-known/apple-app-site-association', [AppLinksController::class, 'appleAppSiteAssociation']);
Route::get('/.well-known/assetlinks.json', [AppLinksController::class, 'assetLinks']);

Route::get('/', HomeController::class)->name('home');
Route::get('/category', CategoryIndexController::class)->name('category.index');
Route::get('/category/{slug}', CategoryArchiveController::class)->name('category.archive');
Route::get('/post/{slug}', SinglePostController::class)->name('post.show');
Route::get('/search', SearchController::class)->name('search');
Route::get('/podcast', PodcastController::class)->name('podcast.index');
Route::get('/podcast/{showSlug}', PodcastShowController::class)->name('podcast.show');
Route::get('/podcast/{showSlug}/{episodeSlug}', PodcastEpisodeDetailController::class)->name('podcast.episode');
Route::get('/playlist', PlaylistController::class)->name('playlist');
Route::get('/videos', VideosController::class)->name('videos');
Route::get('/jobs', CareersController::class)->name('careers.index');
Route::get('/jobs/{slug}', CareersLandingController::class)->name('careers.landing')->where('slug', '[a-z-]+');
Route::get('/jobs/{provider}/{reference}', CareersJobDetailController::class)->name('careers.show');
Route::get('/raffle', RaffleController::class)->name('raffle');
Route::get('/predictions', PredictionsController::class)->name('predictions.index');
Route::get('/predictions/{slug}', PredictionDetailController::class)->name('predictions.show');
Route::get('/quizzes', QuizzesController::class)->name('quizzes.index');
Route::get('/quizzes/{slug}', QuizDetailController::class)->name('quizzes.show');
Route::get('/leaderboard', LeaderboardController::class)->name('leaderboard');
Route::get('/privacy-policy', PrivacyPolicyController::class)->name('privacy-policy');
Route::get('/contact-us', ContactUsController::class)->name('contact-us');
Route::get('/about-us', AboutUsController::class)->name('about-us');
Route::get('/authors', AuthorsController::class)->name('authors');
Route::get('/account-deletion', AccountDeletionController::class)->name('account-deletion');
Route::get('/editorial-policy', EditorialPolicyController::class)->name('editorial-policy');
Route::get('/corrections-policy', CorrectionsPolicyController::class)->name('corrections-policy');

// Must stay last - only fires when nothing above matched. See
// LegacyPostRedirectController's own docblock for why this exists.
Route::fallback(LegacyPostRedirectController::class);
