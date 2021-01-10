{**
 * templates/frontend/pages/indexJournal.tpl
 *
 * Copyright (c) 2018 Vitaliy Bezsheiko
 * Distributed under the GNU GPL v3.
 * - modified by Andrew Ollett in 2020
 * 
 * @uses $announcements array List of announcements
 * @uses $numAnnouncementsHomepage int Number of announcements to display on the
 *       homepage
 *}
{include file="frontend/components/header.tpl" pageTitleTranslated=$currentJournal->getLocalizedName()|escape}

<div class="page_index_journal">
    <div class="index-page-content">
        <div class="row">
            <div class="col-md-8">
                {if $homepageImage}
                    <div class="row">
 		        <div class="homepage-image-wrapper col-md-12">
                            <img class="img-fluid homepage_image" src="{$publicFilesDir}/{$homepageImage.uploadName|escape}" alt="{$homepageImageAltText|escape}">
                        </div>
		    </div>
                {/if}
                <div class="row">
		    {if $announcements}
 		        <div class="announcements-title col-md-12">
                            <h3>{translate key="announcement.announcements"}</h3>
			</div>
		    	<ul class="row list-announce pl-3">
		            {foreach from=$announcements item=announcement}
			        <li>
				    <span class="announcement_title">
				        <a href="{url router=$smarty.const.ROUTE_PAGE page="announcement" op="view" path=$announcement->getId()|escape}">
					    {$announcement->getLocalizedTitle()|escape}
					</a>
				    </span>
				    <span class="announcement_date">{$announcement->getDatePosted()|date_format:$dateFormatLong|escape}</span>
            			    <span class="summary">
                		        {$announcement->getLocalizedDescriptionShort()|strip_tags|truncate:120:"..."}
					<a href="{url router=$smarty.const.ROUTE_PAGE page="announcement" op="view" path=$announcement->getId()}" class="readmore">{translate key="common.readMore"}</a>
            			    </span>
			        </li>
			    {/foreach}
		        </ul>
		    {/if}
		    {if $publishedArticles}
                    <div class="recent-articles-section-title col-md-12">
                        <h3>{translate key="plugins.saha.latest"}</h3>
                    </div>
                    {foreach from=$publishedArticles item=article key=k}
                        <div class="recent-wrapper col-md-6">
                            <div class="card">
                                <a href="{url page="article" op="view" path=$article->getBestArticleId()}">
                                    <img class="card-img-top" src="{$article->getLocalizedCoverImageUrl()|escape}">
                                </a>
                                <div class="card-body">
                                    <h4 class="card-title">
                                        <a class="recent-article-title"
                                           href="{url page="article" op="view" path=$article->getBestArticleId()}">
                                            {$article->getLocalizedTitle()|escape}
                                        </a>
                                    </h4>
                                    <p class="card-text">
                                        {foreach from=$article->getAuthors() key=k item=author}
                                            <span>{$author->getLocalizedFamilyName()|escape}
                                                {if $k<($article->getAuthors()|@count - 1)}
                                                    {$author->getLocalizedGivenName()|regex_replace:"/(?<=\w)\w+/":".,"|escape}
                                                {else}
                                                    {$author->getLocalizedGivenName()|regex_replace:"/(?<=\w)\w+/":"."|escape}
                                                {/if}</span>
                                        {/foreach}
                                    </p>
                                </div>
                                <div class="card-footer">
                                    <small class="text-muted">
                                        {$article->getSectionTitle()|escape}
                                        |
                                        {$article->getDatePublished()|date_format:"%Y-%m-%d"}
                                    </small>
                                </div>
                            </div>
                        </div>
                    {/foreach}
		    {/if}
                </div>
                {call_hook name="Templates::Index::journal"}
            </div>
            <div class="col-md-4">
                {if empty($isFullWidth)}
		    {if $showSummary && $journalDescription}
		        <div class="journalDescription">
			    {$journalDescription}
		        </div>
	            {/if}
                    {capture assign="sidebarCode"}{call_hook name="Templates::Common::Sidebar"}{/capture}
                    {if $sidebarCode}
                        {if $latestIssues}
                            {include file="frontend/objects/issue_slider.tpl"}
                        {/if}
                        <div class="pkp_structure_sidebar information" role="complementary"
                             aria-label="{translate|escape key="common.navigation.sidebar"}">
                            {$sidebarCode}
                        </div>
                    {/if}
		    {if $additionalHomeContent}
		        <div class="additional_content">
			    {$additionalHomeContent}
			</div>
		    {/if}
                {/if}
            </div>
        </div>
    </div>
</div><!-- .page -->

{include file="frontend/components/footer.tpl"}
