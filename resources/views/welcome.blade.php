<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <!-- Styles / Scripts -->

        @viteReactRefresh
        @vite('resources/js/app.jsx')
    </head>
    <body class="font-sans antialiased dark:text-black/50">

                    <main class="mt-6">
                        
                        <div id="app"></div>
                        
                    </main>
                </div>
            </div>
        </div>
    </body>
</html>
