{**
 * templates/frontend/pages/announcements.tpl
 *
 * Copyright (c) 2014-2018 Vitaliy Bezsheiko
 * Distributed under the GNU GPL v3.
 *
 * @brief announcements wrapper
 *}
{include file="frontend/components/header.tpl" pageTitle="announcement.announcements"}

<div class="page page_announcements">
    <div class="container">
        <h2>Announcements</h2>
	{if $announcementsIntroduction}
	    <div class="announcements-introduction">
                {$announcementsIntroduction}
            </div>
        {/if}

        {include file="frontend/components/announcements.tpl"}
    </div>
</div><!-- .page -->

{include file="frontend/components/footer.tpl"}