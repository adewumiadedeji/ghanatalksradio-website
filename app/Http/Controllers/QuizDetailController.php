<?php

namespace App\Http\Controllers;

use App\Services\Portal\PortalApiClient;
use App\Support\PageMeta;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\Response as HttpResponse;

class QuizDetailController extends Controller
{
    /** No guest-specific state before submission, so this SSRs cleanly - real questions/choices for crawlers. */
    public function __invoke(PortalApiClient $portal, Request $request, string $slug): Response|HttpResponse
    {
        $quiz = $portal->fetchQuizDetail($slug);

        if ($quiz === null) {
            return Inertia::render('QuizDetail', ['quiz' => null])
                ->toResponse($request)->setStatusCode(404);
        }

        PageMeta::set(
            title: $quiz['name'].' | GhanaTalksRadio',
            description: $quiz['description'] ?: "Take the {$quiz['name']} quiz and win points on GhanaTalksRadio.",
        );

        return Inertia::render('QuizDetail', [
            'quiz' => $quiz,
        ]);
    }
}
