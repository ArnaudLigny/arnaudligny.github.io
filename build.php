#!/usr/local/bin/php
<?php
if (php_sapi_name() !== 'cli') {
    return;
}
date_default_timezone_set('Europe/Paris');
require_once 'vendor/autoload.php';
use PHPoole\PHPoole;
use Symfony\Component\Yaml\Yaml;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\Finder\Finder;

$getopt = getopt('e::p::');

$options = Yaml::parse(file_get_contents('.phpoole'));
$options_dev = [
    'site' => [
        'baseurl' => 'http://localhost:8000',
    ],
];

$prod = (isset($getopt['e']) && $getopt['e'] == 'prod') ? true : false;
$options = (!$prod) ? array_replace_recursive($options, $options_dev) : $options;

$phpoole = new PHPoole('./', null, $options);
$phpoole->build();

// run server
if (!$prod) {
    echo "Start server http://localhost:8000\n";
    echo "Ctrl-C to stop it\n";
    exec('php -S localhost:8000 -t _site');

} else {
// publish?
    if (isset($getopt['p'])) {
        echo "Publishing...\n";
        // @todo implement git push to the gh-pages branch
        function run($command) {
            exec($command.' 2>&1', $output, $returnValue);
            $output = implode(PHP_EOL, $output);
            return "$output\n";
        }
        $filesystem = new Filesystem();
        $branch = 'master';
        $tmpDirectory = tempnam(sys_get_temp_dir(), 'phpoole_publish_');
        //
        $filesystem->remove($tmpDirectory);
        $filesystem->mkdir($tmpDirectory);
        //
        echo run("git clone git@github.com:Narno/narno.github.com.git $tmpDirectory");
        //
        echo run("cd \"$tmpDirectory\" && git checkout $branch");
        //
        $finder = new Finder();
        $finder->files()
            ->in($tmpDirectory)
            ->ignoreVCS(true);
        $filesystem->remove($finder);
        $filesystem->mirror('_site', $tmpDirectory);
        echo run("cd \"$tmpDirectory\" && git add --all . && git commit -m \"Website generated with PHPoole\"");
        //
        echo run("cd \"$tmpDirectory\" && git push origin $branch");
        //
        $filesystem->remove($tmpDirectory);
    }
}