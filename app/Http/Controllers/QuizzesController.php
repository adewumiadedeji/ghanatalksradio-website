<?php

namespace App\Http\Controllers;

use App\Services\Portal\PortalApiClient;
use App\Services\Portal\PortalApiException;
use App\Support\PageMeta;
use Inertia\Inertia;
use Inertia\Response;

class QuizzesController extends Controller
{
    public function __invoke(PortalApiClient $portal): Response
    {
        PageMeta::set(
            title: 'Quizzes | GhanaTalksRadio',
            description: 'Test your knowledge with GhanaTalksRadio quizzes and win points.',
        );

        try {
            $quizzes = $portal->fetchQuizList();
            $isError = false;
        } catch (PortalApiException) {
            $quizzes = [];
            $isError = true;
        }

        return Inertia::render('Quizzes', [
            'quizzes' => $quizzes,
            'isError' => $isError,
        ]);
    }
}
