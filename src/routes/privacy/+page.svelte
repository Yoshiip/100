<script>
  import { ArrowLeft } from "lucide-svelte";
  import PillLink from "../../components/buttons/PillLink.svelte";
  import Background from "../../components/Background.svelte";
  import CircleButton from "../../components/buttons/CircleButton.svelte";
</script>

<svelte:head>
  <script
    src="https://matomo.aymeri.dev/index.php?module=CoreAdminHome&action=optOutJS&divId=matomo-opt-out&language=auto&showIntro=0"
  ></script>
</svelte:head>

<Background />

<main class="max-w-2xl bg-white m-auto rounded-xl shadow-xl mt-16 p-8">
  <h1 class="text-2xl font-bold h-12">
    <CircleButton
      onClick={() => {
        window.history.back();
      }}
    >
      <ArrowLeft />
    </CircleButton>
    Privacy Policy
  </h1>
  <p>
    aymeri100.fr uses <a
      href="https://matomo.org/"
      class="text-blue-700 hover:underline">Matomo</a
    > to gather user activity. This data is anonymized and stored on a server located
    in OVH, France.
  </p>
  <h2 class="text-lg font-bold mt-4 mb-2">Data Collected</h2>
  <p>While browsing the website, the following data is collected:</p>
  <ul class="list-disc ml-8">
    <li>Anonymized user IP address</li>
    <li>
      Basic user information (screen resolution, browser, operating system)
    </li>
    <li>Time spent on the website</li>
  </ul>
  <p>
    This data is <strong>NOT</strong> shared with any third parties and is used solely
    to monitor website activity. In accordance with GDPR, the data is stored for
    a maximum of 13 months.
  </p>
  <h2 class="text-lg font-bold mt-4 mb-2">Ad Blockers</h2>
  <p>
    If you have an ad blocker, such as <a
      href="https://ublockorigin.com/"
      class="text-blue-700 hover:underline"
      target="_blank">uBlock Origin</a
    >, no data will be collected. I recommend using one while browsing the web
    for enhanced privacy.
  </p>
  <h2 class="text-lg font-bold mt-4 mb-2">Opt-Out</h2>
  <div class="p-2 border border-gray-200 rounded">
    <p>
      If you wish to opt-out of all tracking on this website, please click this
      button:
    </p>
    <div id="matomo-opt-out"></div>
  </div>
  <p>If you have any questions, feel free to contact me at:</p>
  <pre>contact@aymeri100.fr</pre>
</main>
