<!-- @format -->

<?php require('./components/head.php'); ?>

<body>
    <?php require('./components/home_header.php'); ?>
    <div class='flex-container'>
        <main class='three-4th'>
            <section class="home__header">
                <div class="home__side bg-red-l--900">
                    <h2 class=" header--margin-bottom header__font">
                        <span class="">Fundamental Css</span>,<br /> come build a library
                        with us.
                    </h2>
                    <p class="font-d-black--200">
                        Fundamental.css is a customizable sass driven project. As a free
                        free open source library. It is always in progress, and can always
                        be contributed too if asked how. Fundamental Css builds off of
                        <a href="http://necolas.github.io/normalize.css/">
                            Normalize.css
                        </a>
                        to get a flat surface no matter which browser your working on
                        gives
                        you the same start. At the moment this project is not ready for
                        any
                        coding projects without a lot of customization. Hopefully by
                        version
                        0.5.0 or so it it will be useable but till then it will just be a
                        project in progress.
                    </p>
                    <p class="font-d-black--200">
                        This project has a lot of inspiration from many other frameworks
                        and
                        libraries. To help create ideas on what direction to go in,
                        learning
                        more advanced skills from, and to help create user stories. Any
                        works that this is a derivative of knowingly are MIT Licensed. If
                        any works are used there name and what work they built that is
                        included in the MIT license with their work and email.
                    </p>
                </div>
                <div class="home__side bg-red-l--900">
                    <h2 class="font-d-red--700 header__font header--margin-bottom">
                        Why Fundamental Css...
                    </h2>
                    <p class="font-d-black--200">The PVD goal is to provide</p>
                    <ol>

                        <li>a low level utility library</li>
                        <li>the ability to be turned into a custom framework</li>
                        <li>turn it into a framework</li>
                        <li>it is easy to create documentation for it</li>
                        <li>it has enough documentation to use it</li>
                        <li>it has enough documentation to customize it</li>
                    </ol>

                    <p class="font-d-black--200">
                        With this project, I am exploring new sass functions, build tools,
                        exploring css styles I have not thought about for a long while,
                        and
                        much more. I wanted a fun side project so I thought this would be
                        an
                        interesting one to have running. Many opportunities to explore css
                        and sass functions and modularizing it and learning more dry
                        programming skills. As my skills grow in CSS and SCSS I hope to
                        add
                        some interesting things to this project.
                    </p>
                </div>
            </section>
            <section class="homepage bg-red-l--900 mx--a homepage__top">
                <div>
                    <h2 class="text--2xl px--2" id="hp-utility-first">
                        Most CSS Frameworks work too hard
                    </h2>
                    <p>
                        They arrive with every component prebuilt just how they want it
                        which makes your site look very cookie cutter. So you move fast,
                        but
                        look the same, then when it comes time to do custom work brings
                        headaches to the table how to name things.
                    </p>
                    <p>Fundamental Css tries to keep this to a minimum.</p>
                    <p>
                        Instead of giving you a bunch of prebuilt components, we supply
                        you
                        the low level utility classes that you build your own custom
                        designs
                        with. You do what your good at, we do our best to supply the css
                        to
                        make the magic happen with.
                    </p>
                    <p>
                        For those who want to customize and build out classes, we try to
                        provide all the needed placeholder styles or mixin styles to get
                        the
                        job done. While we do provide these, if not used they do not
                        increase your css build.
                    </p>
                    <p>
                        <b>Note, we are a work in progress</b> continually building more
                        utilities, trying to give a large selection of helper classes. So
                        you do not have to override unwanted styles, or battle specificity
                        wars, we just want to provide an easily customizable, sass
                        developer
                        friendly utility class.
                    </p>
                </div>
                <div>
                    <h2 class="text--xxl" id="hp-built-for-customization">
                        Built for your customization pleasure
                    </h2>
                    <p>
                        Being built in SCSS, Fundamental Css is highly customizable.
                        Fundamental aims to let you truly customize just about anything to
                        make it
                        yours. Whether this is fonts, colors, or more to come. Even up to
                        going into the sass files and changing the naming conventions if
                        that is what you wish to do.
                    </p>
                    <p>
                        Fundamental Css is more than a library, it is built to help create
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

                                <p class='font-l-gray--200'>variables.scss; </p><br />

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
                                <p class='font-green'> $color-green: $bright-green; </p>
                                <br />
                                <p class='font-blue'> $color-blue: $robins-egg-blue; </p>
                                <br />
                                <p class='font-yellow'> $color-yellow $corn;</p>
                                <br />
                                <p class='font-orange'> $color-orange: $trinidad;</p>
                                <br />
                                <p class='font-red'>$color-red: $milano-red;</p>
                                <br />
                                <p class='font-black bg--white'>$color-black: $swamp;</p>
                                <br />
                                <p class='font-gray'>$color-gray: $bali-hai;</p>
                                <br />
                                <p class='font-white'> $color-white: $sugar-cane;</p>
                            </div>
                        </section>
                    </div>
                </div>
                <p>
                    By changing the color to your preference and running the sass
                    compiler you can fully customize your own swatches to be your own
                    colors. More on how to customize is discussed in the customization
                    page for that module. {/* link to customization page */}
                </p>
    </div>
    </main>
    <aside class="sidebar one-4th">
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

    </div>
    <?php include('./components/script.php'); ?>
</body>


</html>