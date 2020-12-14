<?php

include '../vendor/autoload.php';

$templatesDir = realpath(__DIR__ . '/../resources/views/');

$pug = new \Pug([
    'basedir' => $templatesDir,
]);

/* Change page */
$pagePath = 'pages/home/home.pug';

$html = $pug->renderFile($pagePath,  [
  /* Pass data to page here */
  'title' => 'Hello World from', 
]);

print($html);

// php -S localhost:2020