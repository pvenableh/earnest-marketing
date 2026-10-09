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

const lastUpdated = 'October 9, 2026';
const contactEmail = 'hello@earnest.guru';
const businessName = 'Hue';
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
					{{ businessName }} (doing business as Hue Studios; "we," "our," or "us") operates Earnest, a business management platform that helps
					agencies, firms, practices, shops and other small businesses run their operations in one place — including
					customer relationships (CRM), projects and tasks, invoicing and payments, proposals and contracts, marketing,
					and an AI assistant ("Earnest") that reads across your workspace to draft and automate work. This
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

			<!-- Email lists — where the "Privacy policy" link in a marketing email lands (#email-lists).
			     Keep it true to the code (earnest repo: server/utils/contact-unsubscribes.ts,
			     server/utils/list-membership.ts, server/utils/sendgrid-event-store.ts, app/pages/unsubscribe.vue). -->
			<section id="email-lists" class="mb-10">
				<h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">2. Email Lists and Newsletters</h2>
				<p>
					This section is for anyone who receives marketing email sent through Earnest, such as a newsletter or a
					campaign, whether or not you have an Earnest account.
				</p>

				<h3 class="text-lg font-medium text-gray-900 dark:text-white mt-6 mb-3">Who is sending</h3>
				<ul class="list-disc pl-6 space-y-2">
					<li>
						<strong>A business that uses Earnest.</strong> Its email comes from that business (or from one of its
						clients, when it runs that client's email). The sender decides who is on its lists and is responsible
						for having your permission to email you. Earnest sends the email and keeps the list on the sender's
						behalf, as described in Section 1.
					</li>
					<li>
						<strong>Hue.</strong> Email from us about Earnest or Hue Studios is our own, and we are responsible for
						it.
					</li>
				</ul>

				<h3 class="text-lg font-medium text-gray-900 dark:text-white mt-6 mb-3">What is kept about you</h3>
				<ul class="list-disc pl-6 space-y-2">
					<li>Your email address, and your name if you gave it.</li>
					<li>
						Which of the sender's lists you are on, when you joined and when you left, and how you joined (a sign-up
						form, added by the sender, or a list moved from another email service, with the sender's note on where
						you signed up).
					</li>
					<li>Which emails were sent to you.</li>
					<li>
						What happened to each email, as reported by our email provider, SendGrid: delivered, delayed, bounced,
						not sent, opened, clicked, or reported as spam. Open and click reports include the time, the link that
						was clicked, and the IP address and browser or mail app that SendGrid saw.
					</li>
				</ul>

				<h3 class="text-lg font-medium text-gray-900 dark:text-white mt-6 mb-3">Opens and clicks</h3>
				<p>
					Marketing email sent through Earnest records when it is opened and which links are clicked, so the sender
					can see what was read. Opens are counted with a small image in the email, and links pass through SendGrid
					on the way to their destination. Open counts are approximate: if your mail app blocks images, an open is
					not recorded, and some mail apps load images on their own, which can record an open you never made.
				</p>

				<h3 class="text-lg font-medium text-gray-900 dark:text-white mt-6 mb-3">Unsubscribing</h3>
				<ul class="list-disc pl-6 space-y-2">
					<li>
						Every marketing email has an <strong>Unsubscribe</strong> link at the bottom. One click takes you off that
						sender's lists. You do not need to sign in or confirm anything. If the email was sent for one of a
						business's clients, you leave that client's lists only. The unsubscribe button that Gmail, Yahoo and
						Apple Mail show does the same.
					</li>
					<li>
						For a business's own email, the page you land on also offers to stop all email sent through that
						business, including the email it sends for its clients.
					</li>
					<li>
						Reporting an email as spam takes you off that sender's lists too. If an email bounces because your address
						no longer exists, that sender's email to it stops.
					</li>
					<li>
						We keep a record that you left, so that the sender cannot add you back, by hand or by importing a list.
						Only you can rejoin, by signing up again and confirming from the email that follows.
					</li>
				</ul>

				<h3 class="text-lg font-medium text-gray-900 dark:text-white mt-6 mb-3">Questions and requests about a list</h3>
				<p>
					For a copy of what a business holds about you, a correction, or deletion, please contact the business that
					sent the email first: it decides what happens to its list. If you write to us at
					<a :href="`mailto:${contactEmail}`" class="text-primary hover:underline">{{ contactEmail }}</a>
					about a list that belongs to one of our customers, we will pass your request to that customer (see Section
					10). For email from Hue itself, write to us directly.
				</p>
			</section>

			<!-- Information We Collect -->
			<section class="mb-10">
				<h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">3. Information We Collect</h2>

				<h3 class="text-lg font-medium text-gray-900 dark:text-white mt-6 mb-3">3.1 Information You Provide</h3>
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

				<h3 class="text-lg font-medium text-gray-900 dark:text-white mt-6 mb-3">3.2 Information From Integrations</h3>
				<p>
					When you connect a third-party account (for example, a calendar, bank, payment, or social media
					service):
				</p>
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
						Data returned by the connected service that is needed to power the feature you enabled, and nothing
						beyond it — for example, calendar events and availability from Google or Outlook, and payment and
						payout records from Stripe.
					</li>
					<li>
						<strong>Social media metrics:</strong>
						Earnest is built to read follower, reach, impression and engagement figures for social accounts you
						connect, but that collection is <strong>currently switched off</strong> and no such figures are being
						gathered. If we turn it on, it will apply only to accounts you have connected yourself, and only for
						as long as they stay connected.
					</li>
				</ul>

				<h3 class="text-lg font-medium text-gray-900 dark:text-white mt-6 mb-3">3.3 Automatically Collected Information</h3>
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
				<h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">4. How We Use Your Information</h2>
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
				<h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">5. AI Features and How Your Data Is Processed</h2>
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
				<h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">6. Data Storage and Security</h2>
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
				<h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">7. Third-Party Services and Sub-processors</h2>
				<p>
					We rely on trusted third parties to operate Earnest. They process data only as needed to provide their
					service to us and are bound by confidentiality and data-protection obligations. These include categories such
					as:
				</p>
				<ul class="list-disc pl-6 space-y-2">
					<li><strong>Cloud hosting and infrastructure</strong> (Vercel and DigitalOcean) — to run the platform and store your data (United States).</li>
					<li><strong>AI / large language model provider</strong> (Anthropic) — to generate AI output, under no-training business terms.</li>
					<li><strong>Payment processing and bank sync</strong> (Stripe) — to process subscription and other payments and, if you enable it, retrieve bank transaction data. We do not store full card numbers.</li>
					<li><strong>Email delivery</strong> (SendGrid) — to send transactional, notification and marketing emails, including marketing email our customers send to their own lists, and to report delivery, opens and clicks.</li>
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
				<h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">8. How We Share Your Information</h2>
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
				<h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">9. Data Retention</h2>
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
				<h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">10. Your Rights and Choices</h2>
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
				<h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">11. California Privacy Rights (CCPA)</h2>
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
				<h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">12. International Data Transfers</h2>
				<p>
					Our servers are located in the United States. If you access Earnest from outside the United States, your
					information may be transferred to, stored, and processed in the United States. By using Earnest, you consent
					to this transfer.
				</p>
			</section>

			<!-- Children's Privacy -->
			<section class="mb-10">
				<h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">13. Children's Privacy</h2>
				<p>
					Earnest is a business tool intended for use by individuals aged 18 and over. We do not knowingly collect
					personal information from children. If we learn that we have collected personal information from a child under
					18, we will delete it promptly.
				</p>
			</section>

			<!-- Changes -->
			<section class="mb-10">
				<h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">14. Changes to This Privacy Policy</h2>
				<p>
					We may update this Privacy Policy from time to time. We will post the updated policy on this page and revise
					the "Last updated" date. For material changes, we will provide additional notice, such as an email
					notification. Your continued use of Earnest after changes take effect constitutes acceptance of the updated
					policy.
				</p>
			</section>

			<!-- Contact -->
			<section class="mb-10">
				<h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">15. Contact Us</h2>
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
				<h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">16. Social Media Integration Disclosures</h2>
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

			<!-- Google API disclosure — what Google's OAuth verification reads. Keep it true to the code
			     (earnest repo: server/utils/calendar/*, docs/calendar-sync-plan.md). Since calendar sync CS7
			     (2026-10-03) Earnest keeps a copy of busy times and receives change notifications; the assistant's
			     find-a-time tool sees open times that already exclude Google busy time, never events. -->
			<section id="google-user-data" class="mb-10">
				<h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">17. Google User Data</h2>
				<p>
					When you connect a Google account to Earnest's Scheduler, Earnest asks Google for permission to use your
					Google Calendar. This section explains exactly what we access and what we do with it.
				</p>

				<h3 class="text-lg font-medium text-gray-900 dark:text-white mt-6 mb-3">What we access</h3>
				<ul class="list-disc pl-6 space-y-2">
					<li>
						<strong>Your Google account email address,</strong> to label the connection so you can tell several
						connected accounts apart.
					</li>
					<li>
						<strong>Your calendars and their events and free/busy times,</strong> to work out when you are free so
						people can only book open times, and to show your Google events alongside your Earnest schedule.
					</li>
					<li>
						<strong>Notices that a calendar changed.</strong> Google tells Earnest when something changes on a
						calendar you connected, so a new event blocks its time within a minute instead of waiting for the next
						check.
					</li>
					<li>
						<strong>Events Earnest creates,</strong> to add each booking to the calendar you choose and to update or
						remove it when the booking is rescheduled or cancelled. If you move or delete one of these events in
						Google Calendar, Earnest notices and asks you whether to move or cancel the booking too. It never changes
						a booking on its own.
					</li>
				</ul>

				<h3 class="text-lg font-medium text-gray-900 dark:text-white mt-6 mb-3">What we store, and for how long</h3>
				<ul class="list-disc pl-6 space-y-2">
					<li>
						<strong>Access tokens,</strong> encrypted, for as long as the account stays connected.
					</li>
					<li>
						<strong>Your calendar list</strong> (each calendar's name and color, and your settings for it), so you
						can choose which calendars block your availability and which one receives bookings.
					</li>
					<li>
						<strong>Busy times:</strong> the start and end of the busy events on the calendars you chose, with the
						event's identifier — never its title, description, location or guests. We keep these so booking pages
						load without asking Google each time. Past busy times are removed within a few days after the event
						ends.
					</li>
					<li>
						<strong>Identifiers of the events Earnest created,</strong> and the times Earnest wrote, so it can update
						or remove them later and tell your own changes apart from its own.
					</li>
				</ul>

				<h3 class="text-lg font-medium text-gray-900 dark:text-white mt-6 mb-3">How we use and protect it</h3>
				<ul class="list-disc pl-6 space-y-2">
					<li>We use Google user data only to provide the scheduling features you turned on.</li>
					<li>
						We do not sell Google user data and do not use it for advertising, including personalized or retargeted
						advertising.
					</li>
					<li>
						We do not share Google user data with third parties, except as needed to run the feature (our hosting and
						database providers, listed in Section 7), to comply with law, or as part of a merger or acquisition with
						notice to you.
					</li>
					<li>
						When you ask Earnest's assistant to find a time, it sees the open times on your booking calendar, which
						already account for your Google busy times. It never sees your Google events, their titles or their
						details. We do not use Google user data to develop, improve, or train generalized artificial
						intelligence or machine learning models, ours or anyone else's, and our AI provider does not train on it
						(see Section 5).
					</li>
					<li>
						Our staff do not read your Google user data unless you ask us to for support, it is needed for security
						purposes such as investigating abuse, or the law requires it.
					</li>
				</ul>

				<p class="mt-4">
					Earnest's use and transfer to any other app of information received from Google APIs will adhere to the
					<a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="noopener" class="text-primary hover:underline">Google API Services User Data Policy</a>,
					including the Limited Use requirements.
				</p>

				<h3 class="text-lg font-medium text-gray-900 dark:text-white mt-6 mb-3">Disconnecting and deletion</h3>
				<p>
					You can disconnect Google at any time in Earnest under Scheduler → Settings → Connected calendars, or from
					your Google Account at
					<a href="https://myaccount.google.com/permissions" target="_blank" rel="noopener" class="text-primary hover:underline">myaccount.google.com/permissions</a>.
					When you disconnect, we stop Google's change notices, delete the stored tokens, your calendar list and the
					busy times we kept, and stop reading your calendar. Events Earnest already added to your calendar stay there
					unless you delete them. To have all of your data deleted, follow our
					<nuxt-link to="/data-deletion" class="text-primary hover:underline">Data Deletion Instructions</nuxt-link>
					or email <a :href="`mailto:${contactEmail}`" class="text-primary hover:underline">{{ contactEmail }}</a>.
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
