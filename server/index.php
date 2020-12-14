<?php

// use Pug\Facade as PugFacade;

include '../vendor/autoload.php';

$templatesDir = realpath(__DIR__ . '/../resources/views/');

$pug = new \Pug([
    'basedir' => $templatesDir,
]);

$html = $pug->renderFile('pages/home/home.pug',  [
  'title' => 'Hello World',
]);

print($html);

// php -S localhost:2020