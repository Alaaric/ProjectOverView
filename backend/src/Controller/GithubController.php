<?php

namespace App\Controller;

use App\Service\GithubApi;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class GithubController extends AbstractController
{
    private GithubApi $githubApi;

    public function __construct(GithubApi $githubApi)
    {
        $this->githubApi = $githubApi;
    }

    #[Route('/api/github/repos/{owner}/{repo}/issues/{state}', methods: ['GET'])]
    public function getProjectIssues(string $owner, string $repo, string $state): JsonResponse
    {
        try {
            $data = $this->githubApi->fetchProjectIssues($owner, $repo, $state);
            return $this->json($data);
        } catch (\Exception $e) {
            return $this->json(['error' => $e->getMessage()], 500);
        }
    }
}
