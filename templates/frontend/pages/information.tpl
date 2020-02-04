{**
 * templates/frontend/pages/information.tpl
 *
 * Copyright (c) 2018 Vitaliy Bezsheiko
 *}
{if !$contentOnly}
	{include file="frontend/components/header.tpl" pageTitle=$pageTitle}
{/if}

<div class="page page_information">
	<div class="description container">
		{$content}
	</div>
</div>

{if !$contentOnly}
	{include file="frontend/components/footer.tpl"}
{/if}
