<?php

namespace App\Http\Controllers;

use App\Support\PageMeta;
use Illuminate\Support\Facades\Config;
use Inertia\Inertia;
use Inertia\Response;

/**
 * Google Play requires a real, working account-deletion path for any app
 * that supports in-app account creation, not just instructions - the
 * form on this page calls ghanatalksradio-portal's
 * POST /api/auth/delete-account directly (see AuthController::
 * deleteAccount()'s own docblock), which re-verifies the password and
 * deletes the account immediately. portalApiUrl is passed down rather
 * than hardcoded client-side so this stays correct if that config ever
 * changes.
 */
class AccountDeletionController extends Controller
{
    public function __invoke(): Response
    {
        PageMeta::set(title: 'Delete Your Account | GhanaTalksRadio');

        return Inertia::render('AccountDeletion', [
            'portalApiUrl' => rtrim((string) Config::get('services.portal.api_url'), '/'),
        ]);
    }
}
