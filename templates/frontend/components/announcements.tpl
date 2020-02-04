{**
 * templates/frontend/components/announcements.tpl
 *
 * Copyright (c) 2018 Vitaliy Bezsheiko
 *
 * @brief Announcements' list
 *}
{if !$heading}
    {assign var="heading" value="h2"}
{/if}

{foreach from=$announcements item=announcement}
    <div class="card announcement-card">
        <div class="card-body">
	    <h5 class="card-title">
                <a href="{url router=$smarty.const.ROUTE_PAGE page="announcement" op="view" path=$announcement->getId()}" class="announcementtitle">
                    {$announcement->getLocalizedTitle()|escape}
                </a>
	    </h5>
	    <h6 class="card-subtitle mb-2 text-muted">
	        {$announcement->getDatePosted()|date_format:$dateFormatLong}
	    </h6>
            <div class="summary">
                {$announcement->getLocalizedDescriptionShort()|strip_unsafe_html}
                <a href="{url router=$smarty.const.ROUTE_PAGE page="announcement" op="view" path=$announcement->getId()}" class="btn btn-sm btn-secondary">
                    <span aria-hidden="true" role="presentation">
                        {translate key="common.readMore"}
                    </span>
                </a>
            </div>
        </div>
    </div>
{/foreach}