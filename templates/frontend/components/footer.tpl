{**
 * templates/frontend/components/footer.tpl
 *
 * Copyright (c) 2018 Vitaliy Bezsheiko, MD
 * - modified by Andrew Ollett in 2020
 *
 * @uses $basePath
 *}
</div> {* end of the site-content wraper *}
{if $requestedPage|escape != "article"}
    <div class="site-footer">
        <div class="container">
            <div class="row">
                <div class="col footer-left col-5">
		   {$pageFooter}
                </div>
                <div class="col footer-right col-7 d-flex align-items-center">
                    <a href="{$pkpLink}">
                        <img src="{$baseUrl}/plugins/themes/saha/images/ojs-open-journal-systems-icon.png" alt="Open Journals Systems"></img>
                    </a>
                    <a href="https://www.lib.uchicago.edu/">
		        <img src="{$baseUrl}/plugins/themes/saha/images/uc-logo.png" alt="University of Chicago Libraries"></img>
                    </a>
                </div>
            </div>
        </div>
    </div><!-- pkp_structure_footer_wrapper -->
{/if}
{load_script context="frontend" scripts=$scripts}
{call_hook name="Templates::Common::Footer::PageFooter"}
</body>
</html>
