<?php

namespace App\Service;

use Symfony\Contracts\HttpClient\HttpClientInterface;

class GithubApi
{
    private HttpClientInterface $client;

    public function __construct(HttpClientInterface $client)
    {
        $this->client = $client;
    }

    public function fetchProjectIssues(string $owner, string $repo): array
    {
        $response = $this->client->request('GET', 'https://api.github.com/repos/' . $owner . "/" . $repo . "/issues", [
            'headers' => [
                'Accept' => 'application/vnd.github+json',
                'Authorization' => 'Bearer ' . $_ENV['GITHUB_API_TOKEN'],
            ],
        ]);

        if ($response->getStatusCode() !== 200) {
            throw new \Exception('GitHub API request failed with status: ' . $response->getStatusCode() . "and message:" . $response->getContent());
        }

        return $response->toArray();
    }
}
