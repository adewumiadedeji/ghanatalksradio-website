<?php

namespace App\Http\Controllers;

use App\Services\Portal\PortalApiClient;
use App\Services\Portal\PortalApiException;
use App\Support\PageMeta;
use Inertia\Inertia;
use Inertia\Response;

class RaffleController extends Controller
{
    public function __invoke(PortalApiClient $portal): Response
    {
        PageMeta::set(
            title: 'Raffle | GhanaTalksRadio',
            description: "Enter GhanaTalksRadio's live raffles and giveaways for a chance to win cash and prizes.",
        );

        try {
            $raffles = $portal->fetchActiveRaffles();
            $isError = false;
        } catch (PortalApiException) {
            $raffles = [];
            $isError = true;
        }

        return Inertia::render('Raffle', [
            'raffles' => $raffles,
            'isError' => $isError,
        ]);
    }
}
