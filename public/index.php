<!-- @format -->

<?php require('./components/head.php'); ?>


<body>
    <?php require('./components/home_header.php'); ?>
    <div class='main-container'>
        <?php include('./components/main_nav.php'); ?>
        <div class='main-section mt--10'>
            <main>
                <section class="home__header">
                    <div class="home__side box-red">
                        <h2 class="text--3xl header font-red">
                            <span>Fundamental Css</span>,<br /> come build a library
                            with us.
                        </h2>
                        <div class='display-box'>
                            <p class="font-black--200">
                                Fundamental.css is a customizable sass driven project. As
                                a
                                free
                                free open source library. It is always in progress, and
                                can
                                always
                                be contributed too if asked how. Fundamental Css builds
                                off of
                                <a href="http://necolas.github.io/normalize.css/">
                                    Normalize.css
                                </a>
                                to get a flat surface no matter which browser your working
                                on
                                gives
                                you the same start. At the moment this project is not
                                ready
                                for
                                any
                                coding projects without a lot of customization. Hopefully
                                by
                                version
                                0.5.0 or so it it will be useable but till then it will
                                just
                                be a
                                project in progress.
                            </p>
                            <p class="font-black--200">
                                This project has a lot of inspiration from many other
                                frameworks
                                and
                                libraries. To help create ideas on what direction to go
                                in,
                                learning
                                more advanced skills from, and to help create user
                                stories.
                                Any
                                works that this is a derivative of knowingly are MIT
                                Licensed.An MIT license is attached to this work in its
                                github
                                repository.
                            </p>
                        </div>
                    </div>
                    <div class="home__side box-red">
                        <h2 class="text--3xl font-red--100 header">
                            Why Fundamental Css...
                        </h2>
                        <div class='display-box'>
                            <p class="font-black--200">The PVD goal is to provide</p>
                            <ol>

                                <li>a low level utility library</li>
                                <li>the ability to be turned into a custom framework</li>
                                <li>turn it into a framework</li>
                                <li>it has enough documentation to use it</li>
                                <li>it has enough documentation to customize it</li>
                            </ol>

                            <p class="font-black--200">
                                Although the PVD goals inside this bubble aim towards
                                that.
                                They are in a bubble of the true PVD goals which are:
                            </p>
                            <ol>
                                <li>agile development practice</li>
                                <li>user stories</li>
                                <li>creating build systems</li>
                                <li>researching tooling for build system</li>
                                <li>clean, neat, DRY code</li>
                                <li>code has had time to sit some weeks</li>
                                <li>after time then checked over again for refactoring
                                    purposes</li>
                                <li>Able to explain code</li>
                                <li>able to customize code easily</li>
                                <li>able to explain how to customize easily</li>
                            </ol>
                        </div>
                    </div>
                </section>
                <section class="homepage mx--a homepage__top">
                    <div class='mb--6'>
                        <h2 class="text--2xl px--2" id="hp-utility-first">
                            Sometimes it is about the destination this time the ride
                        </h2>
                        <p>
                            Some things occur complete when you get to the end goal line,
                            this
                            is not one of them.
                            It is not truly about the project, nor is it truly about
                            finishing
                            the project even
                            though it would be cool to use this in a project. It has a
                            larger
                            goal and use case,
                            practicing some of the harder things to focus on. Really
                            thinking
                            <aside class="one-4th">
                                <h3 class="text--lg font-gray--200 sidebar__title">ON PAGE
                                </h3>
                                <ul>
                                    <li>
                                        <a href="#hp-utility-first">Utility First</a>
                                    </li>
                                    <li>
                                        <a href="#hp-built-for-customization">Custom
                                            Builds</a>
                                    </li>
                                    <li>
                                        <a href="#hp-example-block">Example</a>
                                    </li>
                                </ul>
                            </aside> about when everything
                            else is getting thrown at you. Agile development, user
                            stories,
                            refactoring code,
                            explaining the whys of certain things. So I am mocking a
                            project
                            of building a tailwindcss
                            clone. With it I will be creating user stories and running it
                            off
                            those user stories.
                        </p>
                    </div>
                    <div>
                        <h2 class="text--xxl" id="hp-built-for-customization">
                            Built for your customization pleasure
                        </h2>
                        <p>
                            Being built in SCSS, Fundamental Css is highly customizable.
                            Fundamental aims to let you truly customize just about
                            anything to
                            make it
                            yours. Whether this is fonts, colors, or more to come. Even up
                            to
                            going into the sass files and changing the naming conventions
                            if
                            that is what you wish to do.
                        </p>
                        <p class='mb--4'>
                            Fundamental Css is more than a library, it is built to help
                            create
                            design systems.
                        </p>
                        <div class="display">
                            <header class="example-top bg-white">
                                <h3 class="text--3xl">Font color class examples</h3>
                            </header>
                            <pre id="hp-example-block" class="mb--3">

      <code class='language-html'>&lt;p class='font-l-gray--200'&gt;variables.scss; &lt;/p&gt;<br/>

&lt;p class='color-green'&gt;$bright-green: #5be206;&lt;/p&gt;
<br/>
&lt;p class='color-blue'&gt; $robins-egg-blue: #04c4d9;&lt;/p&gt;
<br />
&lt;p class='color-yellow'&gt;$corn: #f2b705;&lt;/p&gt;
<br/>
&lt;p class='color-orange'&gt;$trinidad: #f25c05;&lt;/p&gt;
<br/>
&lt;p class='color-red' &gt;$milano-red: #bf0a0a;&lt;/p&gt;
<br/>
&lt;p class='color-white'&gt;$sugar-cane: #fdfffc;&lt;/p&gt;
<br/>
&lt;p class='color-black'&gt;$swamp: #00171f;&lt;/p&gt;
<br/>
&lt;p class='color-gray'&gt;$bali-hai: #8d99ae;&lt;/p&gt;
<br/>
<br/>
&lt;p class='font-l-gray--200'&gt; colors made go into $color-name variables &lt;/p&gt;
<br/>
&lt;p class='font-green'&gt; $color-green: $bright-green; &lt;/p&gt;
<br/>
&lt;p class='font-blue'&gt; $color-blue: $robins-egg-blue; &lt;/p&gt;
<br/>
&lt;p class='font-yellow'&gt; $color-yellow $corn;&lt;/p&gt;
<br/>
&lt;p class='font-orange'&gt; $color-orange: $trinidad;&lt;/p&gt;
<br/>
&lt;p class='font-red'&gt;$color-red: $milano-red;&lt;/p&gt;
<br/>
&lt;p class='font-black'&gt;$color-black: $swamp;&lt;/p&gt;
<br/>
&lt;p class='font-gray'&gt;$color-gray: $bali-hai;&lt;/p&gt;
<br/>
&lt;p class='font-white'&gt; $color-white: $sugar-cane;&lt;/p&gt;
</code>
    </pre>
                            <section class="box-black">
                                <header class="built-code-top bg-white">
                                    <h3 class='text--3xl text--justify'>
                                        Font color display examples
                                    </h3>
                                </header>
                                <div class='example-show-code'>

                                    <p class='font-gray--200'>variables.scss; </p><br />

                                    <p class='font-green'>$bright-green: #5be206;</p>
                                    <br />
                                    <p class='font-blue'> $robins-egg-blue: #04c4d9;</p>
                                    <br />
                                    <p class='font-yellow'>$corn: #f2b705;</p>
                                    <br />
                                    <p class='font-orange'>$trinidad: #f25c05;</p>
                                    <br />
                                    <p class='font-red'>$milano-red: #bf0a0a;</p>
                                    <br />
                                    <p class='font-white'>$sugar-cane: #fdfffc;</p>
                                    <br />
                                    <p class='font-black bg--white'>$swamp: #00171f;</p>
                                    <br />
                                    <p class='font-gray'>$bali-hai: #8d99ae;</p>
                                    <br />
                                    <br />
                                    <span class='font-green'>// colors made go into
                                        $color-name variables</span>
                                    <br />
                                    <br />
                                    <p class='font-green'> $color-green: $bright-green;
                                    </p>
                                    <br />
                                    <p class='font-blue'> $color-blue: $robins-egg-blue;
                                    </p>
                                    <br />
                                    <p class='font-yellow'> $color-yellow $corn;</p>
                                    <br />
                                    <p class='font-orange'> $color-orange: $trinidad;</p>
                                    <br />
                                    <p class='font-red'>$color-red: $milano-red;</p>
                                    <br />
                                    <p class='font-black bg--white'>$color-black: $swamp;
                                    </p>
                                    <br />
                                    <p class='font-gray'>$color-gray: $bali-hai;</p>
                                    <br />
                                    <p class='font-white'> $color-white: $sugar-cane;</p>
                                </div>
                            </section>
                        </div>
                    </div>
                    <<<<<<< HEAD:public/index.php </div>
                        <p>
                            By changing the color to your preference and running the sass
                            compiler you can fully customize your own swatches to be your own
                            colors. More on how to customize is discussed in the customization
                            page for that module. {/* link to customization page */}
                        </p>

            </main>
            <aside class="one-4th">
                <h3 class="text--lg font-gray-l--200 sidebar__title">ON PAGE</h3>
                <ul>
                    <li>
                        <a href="#hp-utility-first">Utility First</a>
                    </li>
                    <li>
                        <a href="#hp-built-for-customization">Custom Builds</a>
                    </li>
                    <li>
                        <a href="#hp-example-block">Example</a>
                    </li>
                </ul>
            </aside>
            =======
            <p>
                By changing the color to your preference and running the sass
                compiler you can fully customize your own swatches to be your own
                colors. More on how to customize is discussed in the customization
                page for that module. {/* link to customization page */}
            </p>
            >>>>>>> 628234eb36ae423656e8abc8bf1cb70c60287fe9:index.php

            </main>
            <aside class="one-4th">
                <h3 class="text--lg font-gray--200 sidebar__title">ON PAGE</h3>
                <ul>
                    <li>
                        <a href="#hp-utility-first">Utility First</a>
                    </li>
                    <li>
                        <a href="#hp-built-for-customization">Custom Builds</a>
                    </li>
                    <li>
                        <a href="#hp-example-block">Example</a>
                    </li>
                </ul>
            </aside>
        </div>
    </div>
    <!-- <?php include('./components/script.php'); ?> -->
</body>


</html>