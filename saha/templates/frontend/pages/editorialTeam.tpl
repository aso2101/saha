{**
 * templates/frontend/pages/editorialTeam.tpl
 *
 * Copyright (c) 2018 Vitaliy Bezsheiko
 * modified by Andrew Ollett in 2020
 * 
 * Distributed under the GNU GPL v3.
 *}
{include file="frontend/components/header.tpl" pageTitle="about.editorialTeam"}

<div class="page page_editorial_team">
    <div class="container">
	<h2>{translate key="about.editorialTeam"}</h2>
        {$currentContext->getLocalizedSetting('editorialTeam')}
    </div>
</div>

{include file="frontend/components/footer.tpl"}
