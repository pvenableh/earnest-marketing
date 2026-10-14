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

const lastUpdated = 'October 14, 2026';
const contactEmail = 'hello@earnest.guru';
const businessName = 'Hue';
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
					You can delete your data at any time. The instructions below cover what you can do inside Earnest and what
					we do for you when you email us.
				</p>
			</section>

			<!-- Option 1: Close an organization. There is no self-service delete for a
			     personal account (app, 2026-10-14): an owner archives the organization,
			     which the app keeps 90 days (shared/org-retention.ts) and then purges
			     (server/utils/purge-org.ts). What the purge leaves is listed honestly. -->
			<section class="mb-10">
				<h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">1. Close Your Organization</h2>
				<p>
					Your workspace belongs to an organization. Its owner closes it by archiving it, and it is permanently
					deleted 90 days later:
				</p>
				<ol class="list-decimal pl-6 space-y-2">
					<li>Sign in to Earnest as the organization's owner.</li>
					<li>
						Go to
						<strong>Organization &rarr; Settings</strong>
						and, under
						<strong>Danger zone</strong>
						, choose
						<strong>Archive organization</strong>
						.
					</li>
					<li>Confirm.</li>
				</ol>
				<p class="mt-4">What happens next:</p>
				<ul class="list-disc pl-6 space-y-2">
					<li>
						<strong>Right away,</strong> your subscription is set to end with the current billing period and the
						workspace becomes read-only.
					</li>
					<li>
						<strong>For 90 days,</strong> everything is kept so you can change your mind. The owner can restore the
						organization from the same screen.
					</li>
					<li>
						<strong>After 90 days,</strong> the organization's workspace data is permanently deleted: clients,
						contacts, leads, projects, tasks, tickets, invoices, payments, proposals, messages, campaigns and mailing
						lists, and its members' access.
					</li>
					<li>
						<strong>Recordings</strong> of calls, voicemails and meetings are deleted sooner; see Section 18 of our
						<nuxt-link to="/privacy-policy#voice" class="text-primary hover:underline">Privacy Policy</nuxt-link>.
					</li>
				</ul>
				<p class="mt-4">Some things are not deleted with the organization. Email us (Section 5) and we will delete them:</p>
				<ul class="list-disc pl-6 space-y-2">
					<li>Your personal account: your sign-in and profile. Earnest does not yet have a button for this.</li>
					<li>Uploaded files, call and meeting logs, and the log of what Earnest did. These are detached from the organization rather than deleted.</li>
					<li>Business phone numbers, if you have the Communications add-on. Ask us to release them.</li>
				</ul>
				<p class="mt-4">
					Billing records held by our payment processor, Stripe, are kept as tax and accounting law requires. If you
					unsubscribed from our emails, your address stays on our email provider's suppression list, so it is never
					emailed again.
				</p>
				<p class="mt-4">
					If you are a member of an organization you do not own, ask its owner to remove you, or email us to delete
					your personal account. The organization's shared data stays with its owner.
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

			<!-- Option 3: Disconnect an integration. There is no single "Connected
			     Accounts" screen (app, 2026-10-14): each connection is removed where it
			     was made. Social: Marketing → Accounts → Settings (SettingsSurface.vue,
			     DELETE server/api/social/accounts/[id].ts, no provider revoke). Calendars:
			     Scheduler → Settings → Calendar Sync (server/utils/calendar-disconnect.ts,
			     Google revoked, Outlook not). Stripe: Money → Deposits
			     (server/api/stripe/connect/disconnect.post.ts, deauthorized). All
			     synchronous; no choice of what to delete is offered. -->
			<section class="mb-10">
				<h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">3. Disconnect an Integration</h2>
				<p>
					Each connection is disconnected in the part of Earnest where you made it. It takes effect at once: Earnest
					deletes its stored access to that account straight away and collects nothing more from it.
				</p>
				<ul class="list-disc pl-6 space-y-2">
					<li>
						<strong>Social accounts</strong> (Instagram, Facebook, Threads, LinkedIn, TikTok): go to
						<strong>Marketing &rarr; Accounts &rarr; Settings</strong>, open the account's menu (&#8942;), choose
						<strong>Disconnect</strong>, and confirm.
					</li>
					<li>
						<strong>Calendars</strong> (Google, Outlook): go to
						<strong>Scheduler &rarr; Settings &rarr; Calendar Sync</strong>. Under
						<strong>Connected calendars</strong>, choose <strong>Disconnect</strong> and confirm.
					</li>
					<li>
						<strong>Stripe</strong> (how your clients pay you): go to <strong>Money &rarr; Deposits</strong>, choose
						<strong>Disconnect &amp; switch</strong>, then <strong>Yes, disconnect</strong>.
					</li>
				</ul>
				<p class="mt-4">What disconnecting removes:</p>
				<ul class="list-disc pl-6 space-y-2">
					<li>
						<strong>A social account:</strong> the connection and its access tokens, and the inbox threads, messages
						and activity synced from it, are deleted at once. Posts you created in Earnest stay in your workspace, and
						anything already published stays on the platform. Earnest no longer holds any access to the account. To
						also take Earnest off the platform's own list of connected apps, remove it there as well (Section 4).
					</li>
					<li>
						<strong>A calendar:</strong> the connection and the busy times synced from it are deleted at once. For
						Google, Earnest also asks Google to revoke its access, unless another of your Earnest calendar connections
						uses the same Google account. For Outlook, also remove Earnest from your Microsoft account's app
						permissions.
					</li>
					<li>
						<strong>Stripe:</strong> Earnest asks Stripe to disconnect the account and removes it from your
						organization. Your Stripe account and its records stay with Stripe.
					</li>
				</ul>
				<p class="mt-4">
					Earnest does not offer a choice of what to keep when you disconnect. To have anything else removed, email us
					(Section 5).
				</p>
			</section>

			<!-- Option 4: Revoke from the platform. Meta (Facebook, Instagram) and
			     Threads call our deauthorize endpoints, which blank the tokens and mark
			     the account revoked but keep the row (server/api/social/oauth/facebook/
			     deauthorize.post.ts, threads/deauthorize.post.ts). TikTok and LinkedIn
			     call nothing. No timed purge exists, so none is promised. -->
			<section class="mb-10">
				<h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
					4. Revoke Access Directly From a Connected Platform
				</h2>
				<p>
					You can also remove Earnest from the connected service itself. This is useful if you no longer have access
					to your Earnest account.
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

				<h3 class="text-lg font-medium text-gray-900 dark:text-white mt-6 mb-3">4.3 What happens on our side</h3>
				<ul class="list-disc pl-6 space-y-2">
					<li>
						<strong>Instagram, Facebook and Threads</strong> tell us when you remove Earnest, and we erase that
						account's access tokens immediately. The account then shows in Earnest as disconnected, and what was
						synced from it stays until you disconnect it in Earnest (Section 3) or ask us by email (Section 5).
					</li>
					<li>
						<strong>TikTok and LinkedIn</strong> do not tell us. Our access stops working, but the connection and
						what was synced from it stay in Earnest until you disconnect it there or ask us by email.
					</li>
				</ul>
			</section>

			<!-- Option 5: Email Request -->
			<section class="mb-10">
				<h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">5. Request Deletion by Email</h2>
				<p>
					To delete your personal account, anything left after an organization is closed, or anything else we hold
					about you (including if you cannot sign in), email us and we will do it for you.
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
						inbox messages, social analytics and calendar busy times).
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
