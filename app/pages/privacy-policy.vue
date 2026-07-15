<script setup lang="ts">
/**
 * Privacy Policy
 * /privacy-policy
 */

definePageMeta({
	layout: 'default',
});

useHead({
	title: 'Privacy Policy | Earnest',
	link: [{ rel: 'canonical', href: 'https://earnest.guru/privacy-policy' }],
});
useSeoMeta({
	title: 'Privacy Policy | Earnest',
	description: 'How Earnest collects, uses, and protects your data as a business management platform.',
	ogTitle: 'Privacy Policy | Earnest',
	ogDescription: 'How Earnest collects, uses, and protects your data as a business management platform.',
	ogUrl: 'https://earnest.guru/privacy-policy',
	ogSiteName: 'Earnest',
});

const lastUpdated = 'July 15, 2026';
const contactEmail = 'contact@huestudios.com';
const businessName = 'Hue Studios LLC';
const businessAddress = '605 Lincoln Road Suite 200, Miami Beach, FL';
const websiteUrl = 'https://huestudios.com';
</script>

<template>
	<div class="max-w-4xl mx-auto px-6 py-12 lg:py-16">
		<header class="mb-12">
			<h1 class="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">Privacy Policy</h1>
			<p class="text-gray-500 dark:text-gray-400">Last updated: {{ lastUpdated }}</p>
		</header>

		<div class="prose prose-gray dark:prose-invert max-w-none">
			<!-- Introduction -->
			<section class="mb-10">
				<p>
					{{ businessName }} ("we," "our," or "us") operates Earnest, a business management platform that helps
					agencies, studios, freelancers, and small businesses run their operations in one place — including customer
					relationships (CRM), projects and tasks, invoicing and payments, proposals and contracts, marketing, and an
					AI assistant (the "Director's Office") that reads across your workspace to draft and automate work. This
					Privacy Policy explains how we collect, use, disclose, and safeguard information when you use Earnest.
				</p>
				<p>
					By accessing or using Earnest, you agree to this Privacy Policy. If you do not agree with its terms, please do
					not use the platform.
				</p>
			</section>

			<!-- Roles: controller / processor -->
			<section class="mb-10">
				<h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">1. Your Data and Your Customers' Data</h2>
				<p>
					Earnest is a workspace where you manage your own business, which often includes information about your
					clients, contacts, and team. For the information about <em>your</em> account, we act as the data controller.
					For the business and client data you add to your workspace, we act as a service provider (processor) that
					handles that data on your behalf and under your instructions. You are responsible for having an appropriate
					basis to collect and store information about the people you add to Earnest.
				</p>
			</section>

			<!-- Information We Collect -->
			<section class="mb-10">
				<h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">2. Information We Collect</h2>

				<h3 class="text-lg font-medium text-gray-900 dark:text-white mt-6 mb-3">2.1 Information You Provide</h3>
				<ul class="list-disc pl-6 space-y-2">
					<li>
						<strong>Account &amp; Organization Information:</strong>
						Your name, email address, password (stored only as a secure hash), role, and workspace/organization
						details when you create or join an account.
					</li>
					<li>
						<strong>Business &amp; Client Data:</strong>
						The records you create in Earnest — contacts, clients, leads, organizations, projects, tasks, notes,
						proposals, contracts, and related documents — which may include personal information about third parties
						you do business with.
					</li>
					<li>
						<strong>Financial Data:</strong>
						Invoices, expenses, payments, and billing records you manage in Earnest, and, if you enable bank sync,
						transaction data retrieved through our payment processor (Stripe).
					</li>
					<li>
						<strong>Content &amp; Communications:</strong>
						Messages, meeting notes, files, marketing content, and anything you upload or create, plus information you
						provide when you contact us for support.
					</li>
				</ul>

				<h3 class="text-lg font-medium text-gray-900 dark:text-white mt-6 mb-3">2.2 Information From Integrations</h3>
				<p>When you connect a third-party account (for example, a social media, calendar, bank, or payment service):</p>
				<ul class="list-disc pl-6 space-y-2">
					<li>
						<strong>Profile &amp; Account Identifiers:</strong>
						Usernames, display names, profile pictures, and account IDs from the connected service.
					</li>
					<li>
						<strong>Authentication Tokens:</strong>
						OAuth access and refresh tokens that let Earnest act on your behalf. These tokens are encrypted using
						AES-256-GCM before storage. We never receive or store your passwords for connected services.
					</li>
					<li>
						<strong>Service Data:</strong>
						Data returned by the connected service that is needed to power the feature you enabled — for example,
						social analytics (followers, reach, engagement) or financial transactions.
					</li>
				</ul>

				<h3 class="text-lg font-medium text-gray-900 dark:text-white mt-6 mb-3">2.3 Automatically Collected Information</h3>
				<ul class="list-disc pl-6 space-y-2">
					<li>
						<strong>Log Data:</strong>
						IP address, browser type, operating system, referring URLs, pages viewed, and access times.
					</li>
					<li>
						<strong>Device Information:</strong>
						Device type, unique device identifiers, and network information.
					</li>
					<li>
						<strong>Cookies:</strong>
						We use essential cookies for authentication and session management. We do not use advertising cookies.
					</li>
				</ul>
			</section>

			<!-- How We Use Your Information -->
			<section class="mb-10">
				<h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">3. How We Use Your Information</h2>
				<p>We use the information we collect to:</p>
				<ul class="list-disc pl-6 space-y-2">
					<li>Provide, maintain, and improve the Earnest platform and its features</li>
					<li>Power AI features that read your workspace to draft, suggest, and (with your approval) automate work</li>
					<li>Process invoices, payments, and other transactions you initiate</li>
					<li>Sync with services you connect and act on your behalf where you authorize it</li>
					<li>Send you service-related notifications and respond to support requests</li>
					<li>Detect, prevent, and address fraud, abuse, security, and technical issues</li>
					<li>Comply with legal obligations</li>
				</ul>
				<p class="mt-4">We do not sell your personal information, and we do not use it for third-party advertising.</p>
			</section>

			<!-- AI Features -->
			<section class="mb-10">
				<h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">4. AI Features and How Your Data Is Processed</h2>
				<p>
					Earnest uses artificial intelligence to read across your workspace and draft suggestions, decisions, and
					content for you. Here is how that works and what it means for your data:
				</p>
				<ul class="list-disc pl-6 space-y-2">
					<li>
						<strong>Grounding:</strong>
						To generate relevant output, Earnest processes the data in your workspace — such as contacts, projects,
						financial records, messages, and content you have added.
					</li>
					<li>
						<strong>Isolation between customers:</strong>
						Your workspace data is logically separated by organization. We do not use one customer's data to generate
						results for, or expose it to, another customer.
					</li>
					<li>
						<strong>Third-party AI provider:</strong>
						To produce AI output, we send the relevant context to our third-party large language model provider
						(Anthropic). We use Anthropic under business terms that prohibit it from using your data to train its models,
						and under which your data is retained only transiently to process each request.
					</li>
					<li>
						<strong>No model training on your data:</strong>
						We do not use your business or client data to train our own AI models.
					</li>
					<li>
						<strong>You stay in control:</strong>
						AI-generated actions that reach a client or move money are drafted for your review and require your
						approval before they take effect.
					</li>
				</ul>
			</section>

			<!-- Data Storage and Security -->
			<section class="mb-10">
				<h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">5. Data Storage and Security</h2>
				<p>We implement industry-standard security measures to protect your data:</p>
				<ul class="list-disc pl-6 space-y-2">
					<li>
						<strong>Encryption:</strong>
						OAuth tokens and sensitive credentials are encrypted using AES-256-GCM at rest; all data is transmitted
						over HTTPS/TLS.
					</li>
					<li>
						<strong>Access Controls:</strong>
						Access to production data is restricted to authorized personnel who need it to operate and support the
						service.
					</li>
					<li>
						<strong>Tenant Separation:</strong>
						Each organization's workspace is access-controlled so that only members you invite can see your data.
					</li>
					<li>
						<strong>Regular Review:</strong>
						We review our security practices and update them as needed.
					</li>
				</ul>
				<p class="mt-4">
					While we strive to protect your information, no method of transmission over the Internet or electronic storage
					is 100% secure, and we cannot guarantee absolute security.
				</p>
			</section>

			<!-- Third-Party Services -->
			<section class="mb-10">
				<h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">6. Third-Party Services and Sub-processors</h2>
				<p>
					We rely on trusted third parties to operate Earnest. They process data only as needed to provide their
					service to us and are bound by confidentiality and data-protection obligations. These include categories such
					as:
				</p>
				<ul class="list-disc pl-6 space-y-2">
					<li><strong>Cloud hosting and infrastructure</strong> (Vercel and DigitalOcean) — to run the platform and store your data (United States).</li>
					<li><strong>AI / large language model provider</strong> (Anthropic) — to generate AI output, under no-training business terms.</li>
					<li><strong>Payment processing and bank sync</strong> (Stripe) — to process subscription and other payments and, if you enable it, retrieve bank transaction data. We do not store full card numbers.</li>
					<li><strong>Email delivery</strong> (SendGrid) — to send transactional and notification emails.</li>
					<li><strong>Social and calendar integrations</strong> you choose to connect (such as Instagram/Meta, TikTok, Google) — to power those specific features.</li>
				</ul>
				<p class="mt-4">
					We only request the minimum access necessary to provide a feature, and you can disconnect an integration at
					any time. See our
					<nuxt-link to="/data-deletion" class="text-primary hover:underline">Data Deletion Instructions</nuxt-link>
					for how to disconnect accounts and delete data.
				</p>
			</section>

			<!-- Data Sharing -->
			<section class="mb-10">
				<h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">7. How We Share Your Information</h2>
				<p>We do not sell your personal information. We may share information only in these circumstances:</p>
				<ul class="list-disc pl-6 space-y-2">
					<li>
						<strong>Within Your Workspace:</strong>
						With other members of your organization and with people you explicitly share items with (such as clients
						you send a proposal, invoice, or portal access to).
					</li>
					<li>
						<strong>With Your Consent:</strong>
						When you authorize us to share information with a third party.
					</li>
					<li>
						<strong>Service Providers:</strong>
						With the sub-processors described above, subject to confidentiality obligations.
					</li>
					<li>
						<strong>Legal Requirements:</strong>
						When required by law, legal process, or a valid government request.
					</li>
					<li>
						<strong>Protection of Rights:</strong>
						To protect the rights, property, or safety of Earnest, our users, or others.
					</li>
					<li>
						<strong>Business Transfers:</strong>
						In connection with a merger, acquisition, or sale of assets, with notice to affected users.
					</li>
				</ul>
			</section>

			<!-- Data Retention -->
			<section class="mb-10">
				<h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">8. Data Retention</h2>
				<p>
					We retain your information for as long as your account is active or as needed to provide the service.
					Specifically:
				</p>
				<ul class="list-disc pl-6 space-y-2">
					<li>
						<strong>Workspace &amp; Account Data:</strong>
						Retained until you delete the item, or until you delete your account.
					</li>
					<li>
						<strong>Integration Tokens:</strong>
						Retained until you disconnect the integration or the tokens expire or are revoked.
					</li>
					<li>
						<strong>Financial Records:</strong>
						May be retained as needed to meet tax, accounting, and legal obligations.
					</li>
					<li>
						<strong>Activity &amp; Security Logs:</strong>
						Retained for a limited period for security and audit purposes.
					</li>
				</ul>
				<p class="mt-4">
					Upon account deletion, we will delete or anonymize your personal information within 30 days, except where
					retention is required by law.
				</p>
			</section>

			<!-- Your Rights -->
			<section class="mb-10">
				<h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">9. Your Rights and Choices</h2>
				<p>Depending on your location, you may have the right to:</p>
				<ul class="list-disc pl-6 space-y-2">
					<li><strong>Access</strong> a copy of the personal information we hold about you</li>
					<li><strong>Correct</strong> inaccurate personal information</li>
					<li><strong>Delete</strong> your personal information</li>
					<li><strong>Export</strong> your data in a portable format</li>
					<li><strong>Withdraw consent</strong> or disconnect integrations at any time</li>
					<li><strong>Opt out</strong> of non-essential communications</li>
				</ul>
				<p class="mt-4">
					To exercise these rights, contact us at
					<a :href="`mailto:${contactEmail}`" class="text-primary hover:underline">{{ contactEmail }}</a>
					. If your request concerns data we process on behalf of one of our customers, we will direct the request to
					that customer.
				</p>
			</section>

			<!-- California Privacy Rights -->
			<section class="mb-10">
				<h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">10. California Privacy Rights (CCPA)</h2>
				<p>If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA):</p>
				<ul class="list-disc pl-6 space-y-2">
					<li>The right to know what personal information we collect, use, and disclose</li>
					<li>The right to request deletion of your personal information</li>
					<li>The right to opt out of the sale of personal information (we do not sell personal information)</li>
					<li>The right to non-discrimination for exercising your privacy rights</li>
				</ul>
				<p class="mt-4">
					To make a request, contact us at
					<a :href="`mailto:${contactEmail}`" class="text-primary hover:underline">{{ contactEmail }}</a>
					. We will verify your identity before processing your request.
				</p>
			</section>

			<!-- International Transfers -->
			<section class="mb-10">
				<h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">11. International Data Transfers</h2>
				<p>
					Our servers are located in the United States. If you access Earnest from outside the United States, your
					information may be transferred to, stored, and processed in the United States. By using Earnest, you consent
					to this transfer.
				</p>
			</section>

			<!-- Children's Privacy -->
			<section class="mb-10">
				<h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">12. Children's Privacy</h2>
				<p>
					Earnest is a business tool intended for use by individuals aged 18 and over. We do not knowingly collect
					personal information from children. If we learn that we have collected personal information from a child under
					18, we will delete it promptly.
				</p>
			</section>

			<!-- Changes -->
			<section class="mb-10">
				<h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">13. Changes to This Privacy Policy</h2>
				<p>
					We may update this Privacy Policy from time to time. We will post the updated policy on this page and revise
					the "Last updated" date. For material changes, we will provide additional notice, such as an email
					notification. Your continued use of Earnest after changes take effect constitutes acceptance of the updated
					policy.
				</p>
			</section>

			<!-- Contact -->
			<section class="mb-10">
				<h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">14. Contact Us</h2>
				<p>If you have questions about this Privacy Policy or our data practices, please contact us:</p>
				<div class="mt-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
					<p class="font-medium text-gray-900 dark:text-white">{{ businessName }}</p>
					<p class="text-gray-600 dark:text-gray-400">{{ businessAddress }}</p>
					<p class="mt-2">
						<a :href="`mailto:${contactEmail}`" class="text-primary hover:underline">{{ contactEmail }}</a>
					</p>
					<p>
						<a :href="websiteUrl" target="_blank" class="text-primary hover:underline">{{ websiteUrl }}</a>
					</p>
				</div>
			</section>

			<!-- Platform-Specific Disclosures -->
			<section class="mb-10">
				<h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">15. Social Media Integration Disclosures</h2>
				<p>
					Earnest's Marketing features let you connect social media accounts to schedule and publish content and view
					analytics. When you connect these accounts, your use is also subject to the connected platform's own terms
					and privacy policy.
				</p>

				<h3 class="text-lg font-medium text-gray-900 dark:text-white mt-6 mb-3">Instagram / Meta</h3>
				<p>
					We use the Instagram Graph API to publish content and retrieve analytics. Your use of Instagram through
					Earnest is also subject to
					<a href="https://www.facebook.com/privacy/policy/" target="_blank" rel="noopener" class="text-primary hover:underline">Meta's Privacy Policy</a>
					and
					<a href="https://developers.facebook.com/terms/" target="_blank" rel="noopener" class="text-primary hover:underline">Meta Platform Terms</a>
					. We access only the data necessary to provide these features and do not store your Instagram password.
				</p>

				<h3 class="text-lg font-medium text-gray-900 dark:text-white mt-6 mb-3">TikTok</h3>
				<p>
					We use the TikTok Content Posting API to publish content and view basic analytics. Your use of TikTok through
					Earnest is also subject to
					<a href="https://www.tiktok.com/legal/privacy-policy" target="_blank" rel="noopener" class="text-primary hover:underline">TikTok's Privacy Policy</a>
					and
					<a href="https://www.tiktok.com/legal/terms-of-service" target="_blank" rel="noopener" class="text-primary hover:underline">Terms of Service</a>
					. We access only the data necessary to provide these features.
				</p>

				<p class="mt-4">
					You can revoke a connected account's access at any time from within Earnest or directly through the platform.
					See our
					<nuxt-link to="/data-deletion" class="text-primary hover:underline">Data Deletion Instructions</nuxt-link>
					for step-by-step guidance.
				</p>
			</section>
		</div>

		<!-- Back to Home -->
		<div class="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
			<nuxt-link to="/" class="text-primary hover:underline inline-flex items-center gap-1">&larr; Back to Home</nuxt-link>
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

.prose ul {
	@apply text-gray-600 dark:text-gray-400;
}

.prose p {
	@apply text-gray-600 dark:text-gray-400;
}
</style>
