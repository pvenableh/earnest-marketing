<script setup lang="ts">
/**
 * User Data Deletion Instructions
 * /data-deletion
 */

definePageMeta({
	layout: 'default',
});

useHead({
	title: 'Data Deletion Instructions | Earnest',
	link: [{ rel: 'canonical', href: 'https://earnest.guru/data-deletion' }],
});
useSeoMeta({
	title: 'Data Deletion Instructions | Earnest',
	description: 'How to delete your Earnest account, disconnect integrations, and request removal of your data.',
	ogTitle: 'Data Deletion Instructions | Earnest',
	ogDescription: 'How to delete your Earnest account, disconnect integrations, and request removal of your data.',
	ogUrl: 'https://earnest.guru/data-deletion',
	ogSiteName: 'Earnest',
});

const lastUpdated = 'July 15, 2026';
const contactEmail = 'contact@huestudios.com';
const businessName = 'Hue Studios LLC';
const businessAddress = '605 Lincoln Road Suite 200, Miami Beach, FL';
</script>

<template>
	<div class="max-w-4xl mx-auto px-6 py-12 lg:py-16">
		<header class="mb-12">
			<h1 class="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
				User Data Deletion Instructions
			</h1>
			<p class="text-gray-500 dark:text-gray-400">Last updated: {{ lastUpdated }}</p>
		</header>

		<div class="prose prose-gray dark:prose-invert max-w-none">
			<!-- Introduction -->
			<section class="mb-10">
				<p>
					{{ businessName }} ("we," "our," or "us") operates Earnest, a business management platform for managing
					customers, projects, invoicing, and marketing, with an AI assistant that works across your workspace. This
					page explains how to delete your account, disconnect integrations, and request permanent removal of the
					information we hold about you.
				</p>
				<p>
					You can delete your data at any time. The instructions below cover self-service options inside Earnest and
					direct deletion requests by email.
				</p>
			</section>

			<!-- Option 1: Delete Account -->
			<section class="mb-10">
				<h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">1. Delete Your Earnest Account</h2>
				<p>To permanently delete your Earnest account and its associated workspace data:</p>
				<ol class="list-decimal pl-6 space-y-2">
					<li>Sign in to your Earnest account.</li>
					<li>
						Go to
						<strong>Settings &rarr; Account &rarr; Delete Account</strong>
						.
					</li>
					<li>Read the deletion notice, then confirm by entering your password.</li>
					<li>
						Click
						<strong>Permanently Delete Account</strong>
						.
					</li>
				</ol>
				<p class="mt-4">When you delete your account, we will:</p>
				<ul class="list-disc pl-6 space-y-2">
					<li>Delete your profile, account information, and stored credentials.</li>
					<li>Delete your workspace data — contacts, projects, invoices, proposals, messages, notes, and uploaded files.</li>
					<li>Revoke and remove authentication tokens for any connected integrations.</li>
					<li>Delete or anonymize activity logs within 30 days, except where retention is required by law.</li>
				</ul>
				<p class="mt-4">
					If you are a member of an organization you do not own, deleting your personal account removes you from that
					organization; the organization's shared data remains with its owner. If you own an organization with other
					members, you may need to transfer or remove them before deletion.
				</p>
			</section>

			<!-- Option 2: Delete Specific Data -->
			<section class="mb-10">
				<h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">2. Delete Specific Records</h2>
				<p>
					You do not have to delete your whole account to remove data. Inside Earnest you can delete individual records
					— such as a contact, client, project, invoice, or file — from the relevant section of the app. Deleted
					records are removed from your active workspace; residual copies in backups are purged on our standard backup
					cycle.
				</p>
			</section>

			<!-- Option 3: Disconnect Integrations -->
			<section class="mb-10">
				<h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">3. Disconnect an Integration</h2>
				<p>
					Disconnecting an integration immediately revokes Earnest's access and stops any further data collection from
					that service.
				</p>
				<ol class="list-decimal pl-6 space-y-2">
					<li>Sign in to your Earnest account.</li>
					<li>
						Navigate to
						<strong>Settings &rarr; Connected Accounts</strong>
						.
					</li>
					<li>Locate the integration you want to remove (for example, Instagram, TikTok, a calendar, or a bank/payment connection).</li>
					<li>
						Click
						<strong>Disconnect</strong>
						and confirm when prompted.
					</li>
				</ol>
				<p class="mt-4">
					Once disconnected, the tokens for that account are revoked and removed from our systems within 24 hours, and
					data synced from that account is deleted according to your selection on the confirmation screen.
				</p>
			</section>

			<!-- Option 4: Revoke from Platform -->
			<section class="mb-10">
				<h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
					4. Revoke Access Directly From a Connected Platform
				</h2>
				<p>
					You can also revoke Earnest's access from the connected service itself. This is useful if you no longer have
					access to your Earnest account.
				</p>

				<h3 class="text-lg font-medium text-gray-900 dark:text-white mt-6 mb-3">4.1 Instagram / Meta</h3>
				<ol class="list-decimal pl-6 space-y-2">
					<li>
						Go to your
						<a href="https://accountscenter.instagram.com/apps_websites/" target="_blank" rel="noopener" class="text-primary hover:underline">Instagram Apps and Websites settings</a>
						(or open Instagram &rarr; Settings &rarr; Apps and Websites).
					</li>
					<li>
						Find
						<strong>Earnest</strong>
						in the list of active apps.
					</li>
					<li>
						Click
						<strong>Remove</strong>
						to revoke access.
					</li>
				</ol>

				<h3 class="text-lg font-medium text-gray-900 dark:text-white mt-6 mb-3">4.2 TikTok</h3>
				<ol class="list-decimal pl-6 space-y-2">
					<li>Open the TikTok app and go to your profile.</li>
					<li>
						Tap the menu icon, then
						<strong>Settings and privacy &rarr; Security &rarr; Manage app permissions</strong>
						.
					</li>
					<li>
						Select
						<strong>Earnest</strong>
						from the list of authorized apps.
					</li>
					<li>
						Tap
						<strong>Remove access</strong>
						.
					</li>
				</ol>
				<p class="mt-4">
					Revoking access through the platform invalidates our tokens immediately. Any cached data on our side is purged
					within 30 days as part of our standard retention process.
				</p>
			</section>

			<!-- Option 5: Email Request -->
			<section class="mb-10">
				<h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">5. Request Deletion by Email</h2>
				<p>
					If you cannot access your account or prefer to request deletion manually, email us and we will process the
					request on your behalf.
				</p>
				<ol class="list-decimal pl-6 space-y-2">
					<li>
						Send an email to
						<a :href="`mailto:${contactEmail}?subject=Data Deletion Request`" class="text-primary hover:underline">{{ contactEmail }}</a>
						with the subject line
						<strong>"Data Deletion Request"</strong>
						.
					</li>
					<li>Include the email address associated with your Earnest account.</li>
					<li>Specify whether you want to delete your entire account or only specific data (for example, a single connected integration).</li>
				</ol>
				<p class="mt-4">
					We will verify your identity, process the request, and confirm completion by email within 30 days. There is no
					charge for deletion requests.
				</p>
			</section>

			<!-- What Gets Deleted -->
			<section class="mb-10">
				<h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">6. What Data Is Deleted</h2>
				<p>A successful account-deletion request removes the following from our systems:</p>
				<ul class="list-disc pl-6 space-y-2">
					<li>
						<strong>Profile &amp; Credentials:</strong>
						Your Earnest profile, preferences, settings, and stored credentials.
					</li>
					<li>
						<strong>Workspace Data:</strong>
						Contacts, clients, leads, projects, tasks, invoices, expenses, proposals, contracts, notes, messages, and
						uploaded files.
					</li>
					<li>
						<strong>Integration Tokens &amp; Synced Data:</strong>
						Encrypted access and refresh tokens for connected accounts, and data synced from them (such as social
						analytics or financial transactions).
					</li>
					<li>
						<strong>Account Metadata:</strong>
						Organization membership and related account records.
					</li>
				</ul>
				<p class="mt-4">
					Data that has already been published or sent to a third party (for example, a post published to a social
					platform, or an invoice emailed to a client) is controlled by that platform or recipient and must be handled
					there directly.
				</p>
			</section>

			<!-- Retention Exceptions -->
			<section class="mb-10">
				<h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">7. Retention Exceptions</h2>
				<p>
					In limited circumstances, we may retain certain information after a deletion request to comply with legal
					obligations (such as tax and accounting requirements for financial records), resolve disputes, prevent fraud,
					or enforce our Terms of Service. Any such retained information is access-restricted and held only for as long
					as the legal or operational requirement applies.
				</p>
			</section>

			<!-- Contact Us -->
			<section class="mb-10">
				<h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">8. Contact Us</h2>
				<p>If you have questions about deleting your data or need help with a request, contact us:</p>
				<div class="mt-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
					<p class="font-medium text-gray-900 dark:text-white">{{ businessName }}</p>
					<p class="text-gray-600 dark:text-gray-400">{{ businessAddress }}</p>
					<p class="mt-2">
						<a :href="`mailto:${contactEmail}`" class="text-primary hover:underline">{{ contactEmail }}</a>
					</p>
				</div>
			</section>
		</div>

		<!-- Back to Home -->
		<div class="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
			<nuxt-link to="/" class="text-primary hover:underline inline-flex items-center gap-1">
				&larr; Back to Home
			</nuxt-link>
		</div>
	</div>
</template>

<style scoped>
@reference "~/assets/css/main.css";

.prose h2 {
	@apply border-b border-gray-200 dark:border-gray-700 pb-2;
}

.prose a {
	@apply text-primary;
}

.prose ul,
.prose ol {
	@apply text-gray-600 dark:text-gray-400;
}

.prose p {
	@apply text-gray-600 dark:text-gray-400;
}
</style>
