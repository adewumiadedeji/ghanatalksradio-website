<?php

namespace App\Http\Controllers;

use App\Services\Portal\PortalApiClient;
use App\Services\Portal\PortalApiException;
use App\Support\PageMeta;
use Inertia\Inertia;
use Inertia\Response;

class PredictionsController extends Controller
{
    public function __invoke(PortalApiClient $portal): Response
    {
        PageMeta::set(
            title: 'Predictions | GhanaTalksRadio',
            description: 'Predict match outcomes and win points on GhanaTalksRadio Predictions.',
        );

        try {
            $predictions = $portal->fetchPredictionList();
            $isError = false;
        } catch (PortalApiException) {
            $predictions = [];
            $isError = true;
        }

        return Inertia::render('Predictions', [
            'predictions' => $predictions,
            'isError' => $isError,
        ]);
    }
}
