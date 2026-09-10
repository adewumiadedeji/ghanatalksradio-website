<?php

namespace App\Http\Controllers;

use App\Services\Portal\PortalApiClient;
use App\Services\Portal\PortalApiException;
use App\Support\PageMeta;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class LeaderboardController extends Controller
{
    public function __invoke(PortalApiClient $portal, Request $request): Response
    {
        $period = $request->query('period', 'all-time');

        // Same duplicate-content concern as pagination: /leaderboard?period=weekly
        // etc. are real, differently-crawlable URLs whose content barely
        // differs from the default - noindex everything but the default view.
        PageMeta::set(
            title: $period !== 'all-time'
                ? 'Leaderboard ('.ucfirst($period).') | GhanaTalksRadio'
                : 'Leaderboard | GhanaTalksRadio',
            description: "See who's topping the GhanaTalksRadio Predictions & Quizzes leaderboard.",
            noindex: $period !== 'all-time',
        );

        try {
            $entries = $portal->fetchLeaderboard($period);
            $isError = false;
        } catch (PortalApiException) {
            $entries = [];
            $isError = true;
        }

        return Inertia::render('Leaderboard', [
            'entries' => $entries,
            'period' => $period,
            'isError' => $isError,
        ]);
    }
}
