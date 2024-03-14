<!--.vitepress/theme/CustomFooterTemplateLayout.vue-->
<script setup>
import DefaultTheme from "vitepress/theme";

const { Layout } = DefaultTheme;
</script>

<template>
  <Layout>
    <template #layout-bottom>
      <div class="footerInformationContainer">
        <div class="footerInformationBox">
          <p class="footerInformationHeading">Community Links</p>
          <ul>
            <li>
              <a class="footerInformation" href="https://www.sakshat.ac.in/">
                Sakshat Portal</a
              >
            </li>
            <li>
              <a class="footerInformation" href="http://outreach.vlabs.ac.in/"
                >Outreach Portal</a
              >
            </li>
            <li>
              <a class="footerInformation" href="https://vlab.co.in/faq"
                >FAQ: Virtual Labs</a
              >
            </li>
          </ul>
        </div>
        <div class="footerInformationBox">
          <p class="footerInformationHeading">Contact Us</p>
          <ul>
            <li class="footerInformation">Phone: 011-26582050</li>
            <li class="footerInformation">Email: support@vlabs.ac.in</li>
          </ul>
        </div>
      </div>
    </template>
  </Layout>
</template>
