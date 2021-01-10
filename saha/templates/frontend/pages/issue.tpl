{**
 * templates/frontend/pages/issue.tpl
 *
 * Copyright (c) 2018 Vitaliy Bezsheiko, MD
 *
 * Distributed under the GNU GPL v3.
 *
 *
 *}
{include file="frontend/components/header.tpl" pageTitleTranslated=$issueIdentification}

<div class="page-issue">
    <h2>Current issue</h2>
	{* Display a message if no current issue exists *}
	{if !$issue}
		{include file="frontend/components/notification.tpl" type="warning" messageKey="current.noCurrentIssueDesc"}

	{* Display an issue with the Table of Contents *}
	{else}
		{include file="frontend/objects/issue_toc.tpl"}
	{/if}
</div>

{include file="frontend/components/footer.tpl"}
