<?php

include '../vendor/autoload.php';

$templatesDir = realpath(__DIR__ . '/../resources/views/');
$pagePath = 'pages/home/home.twig';

$loader = new \Twig\Loader\FilesystemLoader($templatesDir);
$twig = new \Twig\Environment($loader);

echo $twig->render($pagePath, ['title' => 'hello world']);
