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
	description: 'How to request deletion of your data and disconnect social media accounts from Earnest.',
	ogTitle: 'Data Deletion Instructions | Earnest',
	ogDescription: 'How to request deletion of your data and disconnect social media accounts from Earnest.',
	ogUrl: 'https://earnest.guru/data-deletion',
	ogSiteName: 'Earnest',
});

const lastUpdated = 'May 2, 2026';
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
					{{ businessName }} ("we," "our," or "us") operates Earnest, a social media management platform that connects
					to third-party services including Instagram (Meta) and TikTok. This page explains how to disconnect your
					accounts, delete your data, and request permanent removal of any information we hold about you.
				</p>
				<p>
					You can revoke our access at any time. The instructions below cover both self-service options inside Earnest
					and direct deletion requests.
				</p>
			</section>

			<!-- Option 1: Disconnect in App -->
			<section class="mb-10">
				<h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
					1. Disconnect a Social Media Account
				</h2>
				<p>
					Disconnecting an account immediately revokes Earnest's access tokens and stops any further data collection
					from that platform.
				</p>
				<ol class="list-decimal pl-6 space-y-2">
					<li>Sign in to your Earnest account.</li>
					<li>
						Navigate to
						<strong>Settings &rarr; Connected Accounts</strong>
						.
					</li>
					<li>Locate the social media account you want to disconnect (Instagram or TikTok).</li>
					<li>
						Click
						<strong>Disconnect</strong>
						next to the account.
					</li>
					<li>Confirm the action when prompted.</li>
				</ol>
				<p class="mt-4">
					Once disconnected, the OAuth tokens for that account are revoked and removed from our systems within 24
					hours. Analytics snapshots tied to that account are deleted according to your selection on the confirmation
					screen.
				</p>
			</section>

			<!-- Option 2: Revoke from Platform -->
			<section class="mb-10">
				<h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
					2. Revoke Access Directly from the Social Platform
				</h2>
				<p>
					You can also revoke Earnest's access directly through Instagram or TikTok. This is useful if you no longer
					have access to your Earnest account.
				</p>

				<h3 class="text-lg font-medium text-gray-900 dark:text-white mt-6 mb-3">2.1 Instagram / Meta</h3>
				<ol class="list-decimal pl-6 space-y-2">
					<li>
						Go to your
						<a
							href="https://accountscenter.instagram.com/apps_websites/"
							target="_blank"
							rel="noopener"
							class="text-primary hover:underline"
						>
							Instagram Apps and Websites settings
						</a>
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

				<h3 class="text-lg font-medium text-gray-900 dark:text-white mt-6 mb-3">2.2 TikTok</h3>
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
					Revoking access through the platform invalidates our tokens immediately. Any cached data on our side will be
					purged within 30 days as part of our standard retention process.
				</p>
			</section>

			<!-- Option 3: Delete Account -->
			<section class="mb-10">
				<h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">3. Delete Your Earnest Account</h2>
				<p>To permanently delete your Earnest account and all associated data:</p>
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
					<li>Revoke all OAuth tokens for connected social media accounts.</li>
					<li>Delete your profile, account information, and stored credentials.</li>
					<li>Delete content, drafts, and scheduled posts that have not yet been published.</li>
					<li>Delete analytics snapshots and engagement history tied to your account.</li>
					<li>Anonymize or delete activity logs within 30 days, except where retention is required by law.</li>
				</ul>
				<p class="mt-4">
					Content you have already published to Instagram or TikTok remains on those platforms. To remove it there, use
					the platform's own deletion tools.
				</p>
			</section>

			<!-- Option 4: Email Request -->
			<section class="mb-10">
				<h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">4. Request Deletion by Email</h2>
				<p>
					If you cannot access your account or prefer to request deletion manually, email us and we will process the
					request on your behalf.
				</p>
				<ol class="list-decimal pl-6 space-y-2">
					<li>
						Send an email to
						<a :href="`mailto:${contactEmail}?subject=Data Deletion Request`" class="text-primary hover:underline">
							{{ contactEmail }}
						</a>
						with the subject line
						<strong>"Data Deletion Request"</strong>
						.
					</li>
					<li>
						Include the email address associated with your Earnest account and, if known, the username of the connected
						Instagram or TikTok account.
					</li>
					<li>
						Specify whether you want to delete your entire account or only data tied to a specific connected social
						media account.
					</li>
				</ol>
				<p class="mt-4">
					We will verify your identity, process the request, and confirm completion by email within 30 days. There is no
					charge for deletion requests.
				</p>
			</section>

			<!-- What Gets Deleted -->
			<section class="mb-10">
				<h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">5. What Data Is Deleted</h2>
				<p>A successful deletion request removes the following from our systems:</p>
				<ul class="list-disc pl-6 space-y-2">
					<li>
						<strong>OAuth Tokens:</strong>
						Encrypted access and refresh tokens for connected accounts.
					</li>
					<li>
						<strong>Profile Information:</strong>
						Username, display name, profile picture, and account identifiers from connected platforms.
					</li>
					<li>
						<strong>Analytics Data:</strong>
						Follower counts, reach, impressions, engagement metrics, and historical snapshots.
					</li>
					<li>
						<strong>Content:</strong>
						Drafts, scheduled posts, and uploaded media that have not yet been published.
					</li>
					<li>
						<strong>Comments and Engagement:</strong>
						Comments retrieved from your posts for management within Earnest.
					</li>
					<li>
						<strong>Account Metadata:</strong>
						Your Earnest profile, preferences, and settings.
					</li>
				</ul>
				<p class="mt-4">
					Data that has already been published to a third-party social media platform is controlled by that platform
					and must be deleted there directly.
				</p>
			</section>

			<!-- Retention Exceptions -->
			<section class="mb-10">
				<h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">6. Retention Exceptions</h2>
				<p>
					In limited circumstances, we may retain certain information after a deletion request to comply with legal
					obligations, resolve disputes, prevent fraud, or enforce our Terms of Service. Any such retained information
					is access-restricted and held only for as long as the legal or operational requirement applies.
				</p>
			</section>

			<!-- Contact Us -->
			<section class="mb-10">
				<h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">7. Contact Us</h2>
				<p>If you have questions about deleting your data or need help with a request, contact us:</p>
				<div class="mt-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
					<p class="font-medium text-gray-900 dark:text-white">{{ businessName }}</p>
					<p class="text-gray-600 dark:text-gray-400">{{ businessAddress }}</p>
					<p class="mt-2">
						<a :href="`mailto:${contactEmail}`" class="text-primary hover:underline">
							{{ contactEmail }}
						</a>
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
